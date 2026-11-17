import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { getSessionUser, logAudit, type UserRole } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const db = getDb();
  const list = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users);

  return NextResponse.json({ users: list });
}

export async function PATCH(request: NextRequest) {
  const actor = await getSessionUser();
  if (!actor) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (actor.role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = (await request.json()) as { userId?: string; role?: UserRole };
  const validRoles: UserRole[] = ["pendente", "colaborador", "admin", "bloqueado"];
  if (!body.userId || !body.role || !validRoles.includes(body.role)) {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const db = getDb();
  if (body.userId === actor.id && body.role !== "admin") {
    const adminCountRows = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.role, "admin"));
    const adminCount = Number(adminCountRows[0]?.count ?? 0);
    if (adminCount <= 1) {
      return NextResponse.json(
        { error: "O último administrador não pode rebaixar a si mesmo" },
        { status: 409 }
      );
    }
  }

  await db
    .update(users)
    .set({ role: body.role, updatedAt: new Date().toISOString() })
    .where(eq(users.id, body.userId));

  await logAudit({
    actorId: actor.id,
    action: "role_change",
    targetType: "user",
    targetId: body.userId,
    metadata: { role: body.role },
  });

  return NextResponse.json({ ok: true });
}
