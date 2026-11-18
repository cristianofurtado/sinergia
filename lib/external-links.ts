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

  // Arquivo direto de vídeo
  if (/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(url.pathname)) {
    return { type: "video", src: url.toString() };
  }

  return { type: "link", src: url.toString() };
}
