import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { files } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { parseSafeExternalUrl } from "@/lib/external-links";

export const dynamic = "force-dynamic";

/**
 * Endpoint de streaming / proxy seguro para links externos.
 * Oculta completamente a URL, domínio e infraestrutura de origem.
 * Suporta requisições HTTP Range (206 Partial Content) para permitir
 * scrub, play/pause e buffering nativo de vídeos no player HTML5.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user || user.role === "bloqueado" || user.role === "pendente") {
    return new NextResponse("Acesso não autorizado", { status: 403 });
  }

  const { id } = await params;
  if (!id) {
    return new NextResponse("Identificador ausente", { status: 400 });
  }

  const db = getDb();
  const [record] = await db.select().from(files).where(eq(files.id, id)).limit(1);

  if (!record || !record.originalName) {
    return new NextResponse("Conteúdo não encontrado", { status: 404 });
  }

  const targetUrl = parseSafeExternalUrl(record.originalName);
  if (!targetUrl) {
    return new NextResponse("URL de destino inválida", { status: 400 });
  }

  // Prepara headers repassando Range caso o navegador esteja pedindo trecho do vídeo
  const range = request.headers.get("range");
  const forwardHeaders: HeadersInit = {
    "User-Agent": "Mozilla/5.0 (compatible; SinergiaSecureProxy/1.0)",
  };
  if (range) {
    forwardHeaders["Range"] = range;
  }

  try {
    const upstream = await fetch(targetUrl.toString(), {
      method: "GET",
      headers: forwardHeaders,
    });

    const responseHeaders = new Headers();
    const contentType = upstream.headers.get("content-type") || record.mimeType || "application/octet-stream";
    responseHeaders.set("Content-Type", contentType);
    responseHeaders.set("Accept-Ranges", "bytes");
    responseHeaders.set("Cache-Control", "private, no-cache, no-store, must-revalidate");

    const contentRange = upstream.headers.get("content-range");
    if (contentRange) {
      responseHeaders.set("Content-Range", contentRange);
    }
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
      responseHeaders.set("Content-Length", contentLength);
    }

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (err) {
    console.error("Erro no proxy seguro de mídia:", err);
    return new NextResponse("Erro ao carregar mídia remota", { status: 502 });
  }
}
