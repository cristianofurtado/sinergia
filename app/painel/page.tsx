import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { files, users } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { mustForceAttachment } from "@/lib/file-validation";
import { createPresignedDownloadUrl } from "@/lib/r2";
import { ChatColaboradores, type ChatFeedItem } from "@/components/painel/chat-colaboradores";

export const dynamic = "force-dynamic";

export default async function PainelPage() {
  const currentUser = await getSessionUser();
  const isAdmin = currentUser?.role === "admin";

  const rows = process.env.TURSO_DATABASE_URL?.trim()
    ? await getDb()
        .select({
          id: files.id,
          category: files.category,
          title: files.title,
          originalName: files.originalName,
          r2Key: files.r2Key,
          mimeType: files.mimeType,
          sizeBytes: files.sizeBytes,
          textBody: files.textBody,
          createdAt: files.createdAt,
          authorName: users.name,
        })
        .from(files)
        .leftJoin(users, eq(files.uploadedBy, users.id))
        .orderBy(asc(files.createdAt))
    : [];

  const canSignR2 = Boolean(
    process.env.R2_ACCOUNT_ID?.trim() &&
      process.env.R2_ACCESS_KEY_ID?.trim() &&
      process.env.R2_SECRET_ACCESS_KEY?.trim() &&
      process.env.R2_BUCKET?.trim()
  );

  const items: ChatFeedItem[] = await Promise.all(
    rows.map(async (row) => {
      let mediaUrl: string | null = null;
      if (row.r2Key && canSignR2) {
        mediaUrl = await createPresignedDownloadUrl({
          key: row.r2Key,
          fileName: row.originalName,
          forceAttachment: mustForceAttachment(row.mimeType),
          expiresInSeconds: 3600,
        }).catch(() => null);
      } else if (!row.r2Key && row.mimeType.endsWith("/external-url")) {
        // Se for YouTube, Vimeo ou Google Drive, usa o link direto para o iframe embed
        const isEmbedIframe =
          row.originalName.includes("youtube.com") ||
          row.originalName.includes("youtu.be") ||
          row.originalName.includes("vimeo.com") ||
          row.originalName.includes("drive.google.com") ||
          row.originalName.includes("loom.com");

        if (isEmbedIframe) {
          mediaUrl = row.originalName;
        } else {
          // Para todo outro link externo (vídeo direto, áudio, imagem ou doc em servidor privado),
          // mascara através da rota interna /api/media/[id].
          // Assim, a URL real, o servidor, porta e subdomínio nunca são expostos ao usuário!
          mediaUrl = `/api/media/${encodeURIComponent(row.id)}`;
        }
      }
      return {
        id: row.id,
        category: row.category,
        title: row.title,
        originalName: row.title, // Mascara o originalName para não vazar a URL no client
        mimeType: row.mimeType,
        sizeBytes: row.sizeBytes,
        textBody: row.textBody,
        createdAt: row.createdAt,
        authorName: row.authorName ?? "Administração",
        mediaUrl,
      };
    })
  );

  return <ChatColaboradores initialItems={items} isAdmin={isAdmin} />;
}
