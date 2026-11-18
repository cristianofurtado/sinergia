export type ExternalLinkCategory = "video" | "image" | "document";

export function parseSafeExternalUrl(raw: string): URL | null {
  try {
    const parsed = new URL(raw.trim());
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Encontra a primeira URL válida dentro de uma string de texto.
 */
export function extractUrlFromText(text: string): { url: string; cleanText: string } | null {
  const match = text.match(/(https?:\/\/[^\s]+)/i);
  if (!match) return null;
  const rawUrl = match[1];
  const safe = parseSafeExternalUrl(rawUrl);
  if (!safe) return null;

  // Remove a URL do texto para deixar legenda/comentário limpo
  const cleanText = text.replace(rawUrl, "").trim();
  return {
    url: safe.toString(),
    cleanText,
  };
}

export async function detectExternalUrlMetadata(rawUrl: string): Promise<{
  category: ExternalLinkCategory;
  mimeType: string;
  suggestedTitle?: string;
}> {
  const safe = parseSafeExternalUrl(rawUrl);
  if (!safe) return { category: "document", mimeType: "document/external-url" };

  // 1. Tentar inferir imediatamente por padrões conhecidos de URL (YouTube, Vimeo, extensões)
  const inferred = inferCategoryFromUrl(safe.toString());
  if (inferred === "video") {
    return { category: "video", mimeType: "video/external-url" };
  }
  if (inferred === "image") {
    return { category: "image", mimeType: "image/external-url" };
  }

  // 2. Se a URL não tem extensão óbvia (ex: CDN, encurtador, s3/storage personalizado como midia.gamesnolinux.com.br/-xxx)
  // Faz uma requisição leve com Range bytes=0-1024 para detectar o Content-Type real e cabeçalhos
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(safe.toString(), {
      method: "GET",
      headers: {
        Range: "bytes=0-1024",
        "User-Agent": "Mozilla/5.0 (compatible; SinergiaLinkInspector/1.0)",
      },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    const ct = (res.headers.get("content-type") || "").toLowerCase().trim();
    const disp = res.headers.get("content-disposition");
    let suggestedTitle: string | undefined;

    if (disp) {
      const match = disp.match(/filename\*?=(?:UTF-8'[\w%]*')?"?([^";]+)"?/i);
      if (match?.[1]) {
        suggestedTitle = decodeURIComponent(match[1].trim());
      }
    }

    if (ct.startsWith("video/")) {
      return { category: "video", mimeType: "video/external-url", suggestedTitle };
    }
    if (ct.startsWith("image/")) {
      return { category: "image", mimeType: "image/external-url", suggestedTitle };
    }
    if (ct.includes("pdf") || ct.includes("application/")) {
      return { category: "document", mimeType: "document/external-url", suggestedTitle };
    }
  } catch {
    // Fallback silencioso para document se a requisição falhar ou der timeout
  }

  return { category: "document", mimeType: "document/external-url" };
}

export function inferCategoryFromUrl(rawUrl: string): ExternalLinkCategory {
  const lower = rawUrl.trim().toLowerCase();
  if (
    lower.includes("youtube.com/") ||
    lower.includes("youtu.be/") ||
    lower.includes("vimeo.com/") ||
    lower.includes("drive.google.com/file/d/") ||
    lower.includes("dropbox.com/") ||
    lower.includes("loom.com/share/") ||
    lower.includes("dailymotion.com/") ||
    /\.(mp4|webm|mov|avi|mkv|m4v)(\?|#|$)/.test(lower)
  ) {
    return "video";
  }
  if (/\.(png|jpe?g|webp|gif|svg|bmp)(\?|#|$)/.test(lower)) {
    return "image";
  }
  return "document";
}

export function getExternalVideoEmbed(rawUrl: string): {
  type: "iframe" | "video" | "link";
  src: string;
} {
  const url = parseSafeExternalUrl(rawUrl);
  if (!url) return { type: "link", src: rawUrl };

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  // YouTube youtu.be/<id>
  if (host === "youtu.be") {
    const id = url.pathname.replace(/^\/+/, "").split("/")[0];
    if (id) return { type: "iframe", src: `https://www.youtube.com/embed/${id}` };
  }

  // YouTube watch?v=<id> ou shorts/<id> ou embed/<id>
  if (host === "youtube.com" || host === "m.youtube.com") {
    const v = url.searchParams.get("v");
    if (v) return { type: "iframe", src: `https://www.youtube.com/embed/${v}` };
    const shortsMatch = url.pathname.match(/^\/shorts\/([^/?#]+)/);
    if (shortsMatch?.[1]) {
      return { type: "iframe", src: `https://www.youtube.com/embed/${shortsMatch[1]}` };
    }
    const embedMatch = url.pathname.match(/^\/embed\/([^/?#]+)/);
    if (embedMatch?.[1]) {
      return { type: "iframe", src: `https://www.youtube.com/embed/${embedMatch[1]}` };
    }
  }

  // Vimeo
  if (host === "vimeo.com") {
    const id = url.pathname.replace(/^\/+/, "").split("/")[0];
    if (id && /^\d+$/.test(id)) {
      return { type: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
  }

  // Google Drive preview (vídeo ou doc)
  if (host === "drive.google.com") {
    const fileMatch = url.pathname.match(/\/file\/d\/([^/?#]+)/);
    if (fileMatch?.[1]) {
      return { type: "iframe", src: `https://drive.google.com/file/d/${fileMatch[1]}/preview` };
    }
  }

  // Loom
  if (host === "loom.com") {
    const loomMatch = url.pathname.match(/\/share\/([^/?#]+)/);
    if (loomMatch?.[1]) {
      return { type: "iframe", src: `https://www.loom.com/embed/${loomMatch[1]}` };
    }
  }

  // Arquivo direto de vídeo ou stream
  if (/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(url.pathname)) {
    return { type: "video", src: url.toString() };
  }

  // Se a URL termina com formato de vídeo ou é servida diretamente por host de mídia
  if (host.startsWith("midia.") || host.includes("video") || host.includes("stream")) {
    return { type: "video", src: url.toString() };
  }

  // Fallback padrão: se foi cadastrado como vídeo externo, usar o player HTML5 com a URL direta
  return { type: "video", src: url.toString() };
}
