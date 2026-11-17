import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  getSessionUser,
  logAudit,
  revokeSessionByToken,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await getSessionUser();

  if (token) {
    await revokeSessionByToken(token);
  }
  if (user) {
    await logAudit({
      actorId: user.id,
      action: "logout",
      targetType: "session",
      targetId: user.sessionId,
    });
  }

  const response = NextResponse.redirect(new URL("/login", request.url), { status: 303 });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
