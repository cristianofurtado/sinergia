import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { eq, and, gt } from "drizzle-orm";
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

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
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
  const tokenHash = hashToken(token);

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
    .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, nowIso)))
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
  await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(token)));
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
