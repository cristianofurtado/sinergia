import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { files } from "@/db/schema";
import { canAccessPainel, getSessionUser, logAudit } from "@/lib/auth";
import {
  mustForceAttachment,
  resolveMimeType,
  sanitizeFileName,
  validateFileUpload,
  type FileCategory,
} from "@/lib/file-validation";
import {
  createPresignedDownloadUrl,
  createPresignedUploadUrl,
  deleteR2Object,
  headR2Object,
} from "@/lib/r2";

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    if (!canAccessPainel(user.role)) {
      return NextResponse.json({ error: "Acesso pendente ou bloqueado" }, { status: 403 });
    }

    const body = (await request.json()) as {
      action?: "put" | "confirm" | "get";
      category?: Exclude<FileCategory, "text">;
      title?: string;
      textBody?: string;
      mimeType?: string;
      sizeBytes?: number;
      fileName?: string;
      r2Key?: string;
      fileId?: string;
    };

    if (body.action === "put") {
      if (user.role !== "admin") {
        return NextResponse.json({ error: "Apenas administradores podem enviar arquivos" }, { status: 403 });
      }
      if (!body.category || typeof body.sizeBytes !== "number" || !body.fileName) {
        return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
      }
      const resolvedMime = resolveMimeType(body.fileName, body.mimeType);
      const validation = validateFileUpload(body.category, resolvedMime, body.sizeBytes);
      if (!validation.ok) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }

      const safeName = sanitizeFileName(body.fileName);
      const ext = safeName.includes(".") ? safeName.slice(safeName.lastIndexOf(".")) : "";
      const r2Key = `${body.category}/${crypto.randomUUID()}${ext}`;
      const uploadUrl = await createPresignedUploadUrl({
        key: r2Key,
        contentType: resolvedMime,
      });

      return NextResponse.json({
        uploadUrl,
        r2Key,
        safeName,
        contentType: resolvedMime,
      });
    }

    if (body.action === "confirm") {
      if (user.role !== "admin") {
        return NextResponse.json({ error: "Apenas administradores podem confirmar uploads" }, { status: 403 });
      }
      if (!body.r2Key || !body.category || typeof body.sizeBytes !== "number" || !body.fileName) {
        return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
      }

      const head = await headR2Object(body.r2Key);
      const actualSize = head.ContentLength ?? 0;
      const actualType = resolveMimeType(body.fileName, head.ContentType ?? body.mimeType);
      const validation = validateFileUpload(body.category, actualType, actualSize);
      if (!validation.ok || actualSize !== body.sizeBytes) {
        await deleteR2Object(body.r2Key);
        return NextResponse.json({ error: "Objeto divergente no R2; removido." }, { status: 400 });
      }

      const db = getDb();
      const id = crypto.randomUUID();
      const nowIso = new Date().toISOString();
      const safeName = sanitizeFileName(body.fileName);
      await db.insert(files).values({
        id,
        category: body.category,
        title: body.title?.trim() || safeName,
        originalName: safeName,
        r2Key: body.r2Key,
        mimeType: actualType,
        sizeBytes: actualSize,
        textBody: body.textBody?.trim() || null,
        uploadedBy: user.id,
        createdAt: nowIso,
        updatedAt: nowIso,
      });

      await logAudit({
        actorId: user.id,
        action: "upload",
        targetType: "file",
        targetId: id,
        metadata: { category: body.category, title: body.title?.trim() || safeName, sizeBytes: actualSize },
      });

      return NextResponse.json({ id, status: "saved", category: body.category }, { status: 201 });
    }

    if (body.action === "get") {
      if (!body.fileId) {
        return NextResponse.json({ error: "fileId obrigatório" }, { status: 400 });
      }
      const db = getDb();
      const rows = await db.select().from(files).where(eq(files.id, body.fileId)).limit(1);
      const file = rows[0];
      if (!file || !file.r2Key) {
        return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
      }

      const downloadUrl = await createPresignedDownloadUrl({
        key: file.r2Key,
        fileName: file.originalName,
        forceAttachment: mustForceAttachment(file.mimeType),
        expiresInSeconds: 120,
      });

      await logAudit({
        actorId: user.id,
        action: "download",
        targetType: "file",
        targetId: file.id,
        metadata: { title: file.title },
      });

      return NextResponse.json({ downloadUrl });
    }

    return NextResponse.json({ error: "Ação não suportada" }, { status: 400 });
  } catch (err) {
    console.error("[api/files/presign] erro:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erro interno no upload/download" },
      { status: 500 }
    );
  }
}
