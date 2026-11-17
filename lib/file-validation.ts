export type FileCategory = "video" | "chat" | "document" | "image" | "text";

const ALLOWED_MIME_BY_CATEGORY: Record<Exclude<FileCategory, "text">, Set<string>> = {
  video: new Set([
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ]),
  chat: new Set([
    "text/plain",
    "text/csv",
    "text/markdown",
    "application/json",
    "application/zip",
    "application/x-zip-compressed",
  ]),
  document: new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
  ]),
  image: new Set([
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ]),
};

const EXT_TO_MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",
  ".txt": "text/plain",
  ".log": "text/plain",
  ".md": "text/markdown",
  ".csv": "text/csv",
  ".json": "application/json",
  ".zip": "application/zip",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const MAX_BYTES_BY_CATEGORY: Record<Exclude<FileCategory, "text">, number> = {
  video: 500 * 1024 * 1024, // 500 MB
  chat: 50 * 1024 * 1024, // 50 MB
  document: 50 * 1024 * 1024, // 50 MB
  image: 20 * 1024 * 1024, // 20 MB
};

export function resolveMimeType(fileName: string, rawMimeType?: string): string {
  const clean = rawMimeType?.split(";")[0].trim().toLowerCase() ?? "";
  if (clean && clean !== "application/octet-stream") {
    return clean;
  }
  const dot = fileName.lastIndexOf(".");
  const ext = dot >= 0 ? fileName.slice(dot).toLowerCase() : "";
  return EXT_TO_MIME[ext] ?? "application/octet-stream";
}

export function validateFileUpload(
  category: Exclude<FileCategory, "text">,
  mimeType: string,
  sizeBytes: number
): { ok: true } | { ok: false; error: string } {
  const normalized = mimeType.split(";")[0].trim().toLowerCase();
  if (!ALLOWED_MIME_BY_CATEGORY[category]?.has(normalized)) {
    return { ok: false, error: `Tipo de arquivo não permitido para ${category}: ${normalized}` };
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
  const normalized = mimeType.split(";")[0].trim().toLowerCase();
  return normalized === "image/svg+xml" || normalized === "text/html";
}
