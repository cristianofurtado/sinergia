import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { getRequiredEnv } from "@/lib/env";
import {
  SESSION_COOKIE_NAME,
  createUserSession,
  isAdminEmail,
  logAudit,
  type UserRole,
} from "@/lib/auth";

const OAUTH_COOKIE = "ep_oauth_state";

interface GoogleTokenResponse {
  access_token?: string;
}

interface GoogleUserInfo {
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const oauthCookie = request.cookies.get(OAUTH_COOKIE)?.value;

  if (!code || !state || !oauthCookie) {
    return NextResponse.redirect(new URL("/login?error=oauth_state", origin));
  }

  let parsedCookie: { state: string; codeVerifier: string };
  try {
    parsedCookie = JSON.parse(oauthCookie) as { state: string; codeVerifier: string };
  } catch {
    return NextResponse.redirect(new URL("/login?error=oauth_cookie", origin));
  }

  if (parsedCookie.state !== state) {
    return NextResponse.redirect(new URL("/login?error=oauth_mismatch", origin));
  }

  try {
    const clientId = getRequiredEnv("GOOGLE_CLIENT_ID");
    const clientSecret = getRequiredEnv("GOOGLE_CLIENT_SECRET");
    const redirectUri = `${origin}/api/auth/callback/google`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        code_verifier: parsedCookie.codeVerifier,
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL("/login?error=token_exchange", origin));
    }

    const tokenData = (await tokenRes.json()) as GoogleTokenResponse;
    if (!tokenData.access_token) {
      return NextResponse.redirect(new URL("/login?error=no_access_token", origin));
    }

    const userRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (!userRes.ok) {
      return NextResponse.redirect(new URL("/login?error=userinfo", origin));
    }

    const profile = (await userRes.json()) as GoogleUserInfo;
    if (!profile.email || profile.email_verified !== true) {
      return NextResponse.redirect(new URL("/login?error=email_unverified", origin));
    }

    const email = profile.email.trim().toLowerCase();
    const db = getDb();
    const nowIso = new Date().toISOString();
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);

    let userId: string;
    let role: UserRole;

    if (existing[0]) {
      userId = existing[0].id;
      role = existing[0].role;
      await db
        .update(users)
        .set({
          name: profile.name?.trim() || existing[0].name,
          avatarUrl: profile.picture ?? existing[0].avatarUrl,
          updatedAt: nowIso,
        })
        .where(eq(users.id, userId));
    } else {
      userId = crypto.randomUUID();
      role = isAdminEmail(email) ? "admin" : "pendente";
      await db.insert(users).values({
        id: userId,
        email,
        name: profile.name?.trim() || email.split("@")[0],
        avatarUrl: profile.picture ?? null,
        role,
        createdAt: nowIso,
        updatedAt: nowIso,
      });
    }

    if (role === "bloqueado") {
      await logAudit({
        actorId: userId,
        action: "login_failed",
        targetType: "user",
        targetId: userId,
        metadata: { reason: "blocked" },
      });
      const denied = NextResponse.redirect(new URL("/login?error=blocked", origin));
      denied.cookies.delete(OAUTH_COOKIE);
      return denied;
    }

    const { token, expiresAt } = await createUserSession(userId);
    await logAudit({
      actorId: userId,
      action: "login",
      targetType: "session",
      targetId: userId,
    });

    const destination =
      role === "admin"
        ? "/painel/admin"
        : role === "colaborador"
          ? "/painel"
          : "/aguardando-aprovacao";

    const response = NextResponse.redirect(new URL(destination, origin));
    response.cookies.delete(OAUTH_COOKIE);
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });
    return response;
  } catch (err) {
    console.error("[auth/callback/google] erro:", err instanceof Error ? err.message : err);
    return NextResponse.redirect(new URL("/login?error=internal", origin));
  }
}
