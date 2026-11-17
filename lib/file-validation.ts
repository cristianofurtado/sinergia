export type FileCategory = "video" | "chat" | "document" | "image" | "text";

const ALLOWED_MIME_BY_CATEGORY: Record<Exclude<FileCategory, "text">, Set<string>> = {
  video: new Set(["video/mp4", "video/webm", "video/quicktime"]),
  chat: new Set(["text/plain", "application/zip", "application/json", "text/csv"]),
  document: new Set([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ]),
  image: new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"]),
};

const MAX_BYTES_BY_CATEGORY: Record<Exclude<FileCategory, "text">, number> = {
  video: 500 * 1024 * 1024, // 500 MB
  chat: 50 * 1024 * 1024, // 50 MB
  document: 50 * 1024 * 1024, // 50 MB
  image: 20 * 1024 * 1024, // 20 MB
};

export function validateFileUpload(
  category: Exclude<FileCategory, "text">,
  mimeType: string,
  sizeBytes: number
): { ok: true } | { ok: false; error: string } {
  if (!ALLOWED_MIME_BY_CATEGORY[category]?.has(mimeType)) {
    return { ok: false, error: `Tipo de arquivo não permitido para ${category}: ${mimeType}` };
  }
  if (sizeBytes <= 0 || sizeBytes > MAX_BYTES_BY_CATEGORY[category]) {
    return { ok: false, error: `Tamanho inválido para ${category}` };
  }
  return { ok: true };
}

export function sanitizeFileName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 120);
}

export function mustForceAttachment(mimeType: string): boolean {
  return mimeType === "image/svg+xml" || mimeType === "text/html";
}
