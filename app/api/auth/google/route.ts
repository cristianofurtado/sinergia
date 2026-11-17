import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getRequiredEnv } from "@/lib/env";

const OAUTH_COOKIE = "ep_oauth_state";

export async function GET(request: NextRequest) {
  try {
    const clientId = getRequiredEnv("GOOGLE_CLIENT_ID");
    const origin = request.nextUrl.origin;
    const redirectUri = `${origin}/api/auth/google/callback`;

    const state = crypto.randomBytes(24).toString("base64url");
    const codeVerifier = crypto.randomBytes(32).toString("base64url");
    const codeChallenge = crypto
      .createHash("sha256")
      .update(codeVerifier)
      .digest("base64url");

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");
    authUrl.searchParams.set("prompt", "select_account");

    const response = NextResponse.redirect(authUrl);
    response.cookies.set(OAUTH_COOKIE, JSON.stringify({ state, codeVerifier }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });
    return response;
  } catch (err) {
    console.error("[auth/google] erro de configuracao:", err instanceof Error ? err.message : err);
    return NextResponse.redirect(new URL("/login?error=config", request.url));
  }
}
