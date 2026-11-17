import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { eq, and, gt, inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { sessions, users, auditLogs } from "@/db/schema";

export type UserRole = "pendente" | "colaborador" | "admin" | "bloqueado";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  sessionId: string;
}

export const SESSION_COOKIE_NAME = "ep_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 dias

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET ausente ou muito curto.");
  }
  return secret;
}

export function hashToken(token: string): string {
  return crypto.createHmac("sha256", getAuthSecret()).update(token).digest("hex");
}

function legacySha256(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function signPayload(payloadJson: string): string {
  const sig = crypto
    .createHmac("sha256", getAuthSecret())
    .update(payloadJson)
    .digest("base64url");
  const data = Buffer.from(payloadJson, "utf8").toString("base64url");
  return `${data}.${sig}`;
}

export function verifySignedPayload<T>(signedValue: string): T | null {
  const parts = signedValue.split(".");
  if (parts.length !== 2) return null;
  const [dataB64, sigB64] = parts;
  try {
    const payloadJson = Buffer.from(dataB64, "base64url").toString("utf8");
    const expectedSig = crypto
      .createHmac("sha256", getAuthSecret())
      .update(payloadJson)
      .digest("base64url");
    const a = Buffer.from(sigB64);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return null;
    }
    return JSON.parse(payloadJson) as T;
  } catch {
    return null;
  }
}

export function isAdminEmail(email: string): boolean {
  const raw = process.env.ADMIN_EMAILS ?? "";
  const admins = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(email.trim().toLowerCase());
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token || !process.env.TURSO_DATABASE_URL?.trim()) return null;

  const db = getDb();
  const nowIso = new Date().toISOString();
  const hashes = process.env.AUTH_SECRET?.trim()
    ? [hashToken(token), legacySha256(token)]
    : [legacySha256(token)];

  const rows = await db
    .select({
      sessionId: sessions.id,
      id: users.id,
      email: users.email,
      name: users.name,
      avatarUrl: users.avatarUrl,
      role: users.role,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(inArray(sessions.tokenHash, hashes), gt(sessions.expiresAt, nowIso)))
    .limit(1);

  const row = rows[0];
  if (!row || row.role === "bloqueado") return null;
  return row;
}

export async function createUserSession(userId: string): Promise<{ token: string; expiresAt: Date }> {
  const db = getDb();
  const token = crypto.randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.insert(sessions).values({
    id: crypto.randomUUID(),
    userId,
    tokenHash: hashToken(token),
    expiresAt: expiresAt.toISOString(),
    createdAt: new Date().toISOString(),
  });
  return { token, expiresAt };
}

export async function revokeSessionByToken(token: string): Promise<void> {
  if (!process.env.TURSO_DATABASE_URL?.trim()) return;
  const db = getDb();
  const hashes = process.env.AUTH_SECRET?.trim()
    ? [hashToken(token), legacySha256(token)]
    : [legacySha256(token)];
  await db.delete(sessions).where(inArray(sessions.tokenHash, hashes));
}

export async function logAudit(params: {
  actorId: string;
  action: "login" | "logout" | "login_failed" | "upload" | "download" | "rename" | "delete" | "role_change";
  targetType: "file" | "user" | "session";
  targetId: string;
  metadata?: Record<string, unknown>;
}) {
  if (!process.env.TURSO_DATABASE_URL?.trim()) return;
  const db = getDb();
  await db.insert(auditLogs).values({
    id: crypto.randomUUID(),
    actorId: params.actorId,
    action: params.action,
    targetType: params.targetType,
    targetId: params.targetId,
    metadataJson: params.metadata ? JSON.stringify(params.metadata) : null,
    createdAt: new Date().toISOString(),
  });
}

export function canAccessPainel(role: UserRole): boolean {
  return role === "colaborador" || role === "admin";
}
