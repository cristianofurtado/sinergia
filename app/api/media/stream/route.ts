import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { files } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { parseSafeExternalUrl } from "@/lib/external-links";

export const dynamic = "force-dynamic";

/**
 * Proxy de streaming seguro para URLs de mídia externa.
 * Oculta o endereço real do servidor de origem e protege a infraestrutura.
 */
export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user || user.role === "bloqueado" || user.role === "pendente") {
    return new NextResponse("Acesso não autorizado", { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("id");
  if (!fileId) {
    return new NextResponse("Parâmetro 'id' ausente", { status: 400 });
  }

  const db = getDb();
  const [fileRecord] = await db.select().from(files).where(eq(files.id, fileId)).limit(1);

  if (!fileRecord || !fileRecord.originalName) {
    return new NextResponse("Arquivo não encontrado", { status: 404 });
  }

  const safeUrl = parseSafeExternalUrl(fileRecord.originalName);
  if (!safeUrl) {
    return new NextResponse("URL de origem inválida", { status: 400 });
  }

  // Encaminha requisição ao servidor de origem com suporte a Range (streaming de vídeo)
  const rangeHeader = request.headers.get("range");
  const fetchHeaders: HeadersInit = {
    "User-Agent": "Mozilla/5.0 (compatible; SinergiaMediaProxy/1.0)",
  };
  if (rangeHeader) {
    fetchHeaders["Range"] = rangeHeader;
  }

  try {
    const upstreamRes = await fetch(safeUrl.toString(), {
      method: "GET",
      headers: fetchHeaders,
    });

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", upstreamRes.headers.get("content-type") || "video/mp4");
    responseHeaders.set("Accept-Ranges", "bytes");
    responseHeaders.set("Cache-Control", "private, max-age=3600");

    const contentRange = upstreamRes.headers.get("content-range");
    if (contentRange) {
      responseHeaders.set("Content-Range", contentRange);
    }
    const contentLength = upstreamRes.headers.get("content-length");
    if (contentLength) {
      responseHeaders.set("Content-Length", contentLength);
    }

    return new NextResponse(upstreamRes.body, {
      status: upstreamRes.status,
      headers: responseHeaders,
    });
  } catch (err) {
    console.error("Erro no proxy de mídia:", err);
    return new NextResponse("Erro ao carregar mídia", { status: 502 });
  }
}
