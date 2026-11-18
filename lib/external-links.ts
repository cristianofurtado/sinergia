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

export function inferCategoryFromUrl(rawUrl: string): ExternalLinkCategory {
  const lower = rawUrl.trim().toLowerCase();
  if (
    lower.includes("youtube.com/") ||
    lower.includes("youtu.be/") ||
    lower.includes("vimeo.com/") ||
    /\.(mp4|webm|mov|avi|mkv)(\?|#|$)/.test(lower)
  ) {
    return "video";
  }
  if (/\.(png|jpe?g|webp|gif|svg)(\?|#|$)/.test(lower)) {
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
  if (host === "youtu.be") {
    const id = url.pathname.replace(/^\/+/, "").split("/")[0];
    if (id) return { type: "iframe", src: `https://www.youtube.com/embed/${id}` };
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    const v = url.searchParams.get("v");
    if (v) return { type: "iframe", src: `https://www.youtube.com/embed/${v}` };
    const shortsMatch = url.pathname.match(/^\/shorts\/([^/]+)/);
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
  if (/\.(mp4|webm|mov)(\?|#|$)/i.test(url.pathname)) {
    return { type: "video", src: url.toString() };
  }
  return { type: "link", src: url.toString() };
}
