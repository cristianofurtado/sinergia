export type ExternalLinkCategory = "video" | "image" | "document";

export function parseSafeExternalUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withProtocol);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    if (!parsed.hostname || !parsed.hostname.includes(".")) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function extractGoogleDriveFileId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host !== "drive.google.com" && host !== "docs.google.com") return null;

  const fileMatch = url.pathname.match(/\/(?:file|document|spreadsheets|presentation)\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch?.[1]) return fileMatch[1];

  const idParam = url.searchParams.get("id");
  if (idParam && /^[a-zA-Z0-9_-]+$/.test(idParam)) return idParam;

  return null;
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

  const inferred = inferCategoryFromUrl(safe.toString());
  if (inferred === "video") {
    return { category: "video", mimeType: "video/external-url" };
  }
  if (inferred === "image") {
    return { category: "image", mimeType: "image/external-url" };
  }

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
    lower.includes("midia.") ||
    /\.(mp4|webm|mov|avi|mkv|m4v)(\?|#|$)/.test(lower)
  ) {
    return "video";
  }
  if (
    /\.(png|jpe?g|webp|gif|svg|bmp|avif)(\?|#|$)/.test(lower) ||
    lower.includes("imgur.com/") ||
    lower.includes("giphy.com/")
  ) {
    return "image";
  }
  return "document";
}

export function getExternalVideoEmbed(rawUrl: string): {
  type: "iframe" | "video" | "link";
  src: string;
} {
  const trimmed = rawUrl.trim();
  if (trimmed.startsWith("/")) {
    return { type: "video", src: trimmed };
  }

  const url = parseSafeExternalUrl(trimmed);
  if (!url) return { type: "link", src: rawUrl };

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  if (host === "youtu.be") {
    const id = url.pathname.replace(/^\/+/, "").split("/")[0];
    if (id) return { type: "iframe", src: `https://www.youtube.com/embed/${id}` };
  }

  if (host === "youtube.com" || host === "m.youtube.com") {
    const v = url.searchParams.get("v");
    if (v) return { type: "iframe", src: `https://www.youtube.com/embed/${v}` };
    const shortsMatch = url.pathname.match(/^\/(?:shorts|embed|live)\/([^/?#]+)/);
    if (shortsMatch?.[1]) {
      return { type: "iframe", src: `https://www.youtube.com/embed/${shortsMatch[1]}` };
    }
  }

  if (host === "vimeo.com") {
    const id = url.pathname.replace(/^\/+/, "").split("/")[0];
    if (id && /^\d+$/.test(id)) {
      return { type: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
  }

  if (host === "drive.google.com") {
    const fileMatch = url.pathname.match(/\/file\/d\/([^/?#]+)/);
    if (fileMatch?.[1]) {
      return { type: "iframe", src: `https://drive.google.com/file/d/${fileMatch[1]}/preview` };
    }
  }

  if (host === "loom.com") {
    const loomMatch = url.pathname.match(/\/share\/([^/?#]+)/);
    if (loomMatch?.[1]) {
      return { type: "iframe", src: `https://www.loom.com/embed/${loomMatch[1]}` };
    }
  }

  return { type: "video", src: url.toString() };
}

export function getExternalDocumentEmbed(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (trimmed.startsWith("/")) return trimmed;

  const url = parseSafeExternalUrl(trimmed);
  if (!url) return null;

  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host === "docs.google.com") {
    const match = url.pathname.match(/^\/(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9_-]+)/);
    if (match?.[1] && match?.[2]) {
      return `https://docs.google.com/${match[1]}/d/${match[2]}/preview`;
    }
  }

  const driveId = extractGoogleDriveFileId(url);
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }

  return url.toString();
}

export function getExternalImageSrc(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (trimmed.startsWith("/")) return trimmed;

  const url = parseSafeExternalUrl(trimmed);
  if (!url) return rawUrl;
  const driveId = extractGoogleDriveFileId(url);
  if (driveId) {
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }
  return url.toString();
}
