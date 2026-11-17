import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { files } from "@/db/schema";
import { getSessionUser, logAudit } from "@/lib/auth";
import type { FileCategory } from "@/lib/file-validation";
import { deleteR2Object } from "@/lib/r2";

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = (await request.json()) as { title?: string; textBody?: string };
  const title = body.title?.trim();
  const textBody = body.textBody?.trim();
  if (!title || !textBody) {
    return NextResponse.json({ error: "Título e conteúdo são obrigatórios" }, { status: 400 });
  }

  const db = getDb();
  const id = crypto.randomUUID();
  const nowIso = new Date().toISOString();
  await db.insert(files).values({
    id,
    category: "text",
    title,
    originalName: `${title.slice(0, 60)}.md`,
    r2Key: null,
    mimeType: "text/markdown",
    sizeBytes: Buffer.byteLength(textBody, "utf8"),
    textBody,
    uploadedBy: user.id,
    createdAt: nowIso,
    updatedAt: nowIso,
  });

  await logAudit({
    actorId: user.id,
    action: "upload",
    targetType: "file",
    targetId: id,
    metadata: { category: "text", title },
  });
  return NextResponse.json({ id }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = (await request.json()) as {
    id?: string;
    title?: string;
    category?: FileCategory;
    textBody?: string;
  };
  if (!body.id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });

  const db = getDb();
  const rows = await db.select().from(files).where(eq(files.id, body.id)).limit(1);
  const existing = rows[0];
  if (!existing) return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });

  await db
    .update(files)
    .set({
      title: body.title?.trim() || existing.title,
      category: body.category ?? existing.category,
      textBody: body.textBody !== undefined ? body.textBody : existing.textBody,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(files.id, existing.id));

  await logAudit({
    actorId: user.id,
    action: "rename",
    targetType: "file",
    targetId: existing.id,
    metadata: { title: body.title?.trim() || existing.title, category: body.category ?? existing.category },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });

  const db = getDb();
  const rows = await db.select().from(files).where(eq(files.id, id)).limit(1);
  const existing = rows[0];
  if (!existing) return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });

  // Remove do R2 antes do Turso para evitar registro apontando para objeto inexistente
  if (existing.r2Key) {
    await deleteR2Object(existing.r2Key);
  }
  await db.delete(files).where(eq(files.id, existing.id));
  await logAudit({
    actorId: user.id,
    action: "delete",
    targetType: "file",
    targetId: existing.id,
    metadata: { title: existing.title, category: existing.category },
  });

  return NextResponse.json({ ok: true });
}
