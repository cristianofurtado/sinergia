"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  Trash2,
  Pencil,
  Check,
  X,
  ExternalLink,
  Users,
  History,
  FolderPlus,
  Send,
  Paperclip,
  Link2,
  Eye,
} from "lucide-react";
import {
  getExternalDocumentEmbed,
  getExternalImageSrc,
  getExternalVideoEmbed,
  inferCategoryFromUrl,
  parseSafeExternalUrl,
} from "@/lib/external-links";
import { inferCategoryFromMime, resolveMimeType } from "@/lib/file-validation";
import type { PainelFileItem } from "./colaborador-browser";

interface AdminUserItem {
  id: string;
  email: string;
  name: string;
  role: "pendente" | "colaborador" | "admin" | "bloqueado";
}

interface AuditLogItem {
  id: string;
  actorName: string;
  actorEmail: string;
  actionLabel: string;
  detail: string;
  createdAt: string;
}

type UploadCategory = "auto" | "video" | "document" | "image";
type AdminTab = "conteudo" | "usuarios" | "auditoria";

const CATEGORY_OPTIONS: { value: UploadCategory; label: string; hint?: string }[] = [
  { value: "auto", label: "Automático" },
  {
    value: "video",
    label: "Vídeos",
    hint: "MP4, WEBM, MOV, AVI, MKV ou links YouTube, Vimeo, Loom, Drive (até 500 MB)",
  },
  {
    value: "document",
    label: "Documentos",
    hint: "PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV, ZIP ou links Drive/Docs (até 50 MB)",
  },
  {
    value: "image",
    label: "Imagens e GIFs",
    hint: "PNG, JPG, JPEG, WEBP, GIF, SVG ou links diretos de imagem/Drive (até 20 MB)",
  },
];

const ALL_CATEGORIES: { value: PainelFileItem["category"]; label: string }[] = [
  { value: "video", label: "Vídeos" },
  { value: "document", label: "Documentos" },
  { value: "image", label: "Imagens e GIFs" },
  { value: "text", label: "Textos" },
];

export function AdminDashboard({
  initialFiles,
  initialUsers,
  initialLogs,
}: {
  initialFiles: PainelFileItem[];
  initialUsers: AdminUserItem[];
  initialLogs: AuditLogItem[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("conteudo");
  const [files, setFiles] = useState(initialFiles);
  const [users, setUsers] = useState(initialUsers);

  // Compositor unificado (Arquivo, Link e/ou Texto com Nome e Legenda)
  const [category, setCategory] = useState<UploadCategory>("auto");
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [textPreview, setTextPreview] = useState(false);
  const [externalLinksInput, setExternalLinksInput] = useState("");
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [progress, setProgress] = useState<string>("");

  // Edição inline na lista (Nome, Legenda e Categoria)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTextBody, setEditTextBody] = useState("");
  const [editCategory, setEditCategory] = useState<PainelFileItem["category"]>("document");
  const [filterCat, setFilterCat] = useState<string>("all");

  const [feedback, setFeedback] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const parsedLinks = useMemo(() => {
    return externalLinksInput
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((raw) => {
        const url = parseSafeExternalUrl(raw);
        if (!url) return { raw, valid: false as const, detected: null };
        const detected =
          category === "auto" ? inferCategoryFromUrl(url.toString()) : category;
        return { raw: url.toString(), valid: true as const, detected };
      });
  }, [externalLinksInput, category]);

  const visibleFiles = useMemo(() => {
    if (filterCat === "all") return files;
    return files.filter((f) => f.category === filterCat);
  }, [files, filterCat]);

  function addFilesToQueue(incoming: File[]) {
    if (incoming.length === 0) return;
    setQueuedFiles((prev) => [...prev, ...incoming]);
    setFeedback(null);
  }

  function removeQueuedFile(index: number) {
    setQueuedFiles((prev) => prev.filter((_, idx) => idx !== index));
  }

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    if (isPublishing) return;

    const cleanTitle = postTitle.trim();
    const cleanText = postText.trim();
    const validLinks = parsedLinks.filter((l) => l.valid);
    const invalidLinks = parsedLinks.filter((l) => !l.valid);

    if (invalidLinks.length > 0) {
      setFeedback({
        type: "error",
        text: `Link inválido: "${invalidLinks[0].raw}". Cole um link válido (ex.: https://...).`,
      });
      return;
    }

    if (queuedFiles.length === 0 && validLinks.length === 0 && !cleanText) {
      setFeedback({
        type: "error",
        text: "Escreva uma mensagem/legenda, cole um link ou anexe pelo menos um arquivo antes de publicar.",
      });
      return;
    }

    setFeedback(null);
    setIsPublishing(true);

    try {
      // Caso 1: apenas texto (sem anexos e sem links)
      if (queuedFiles.length === 0 && validLinks.length === 0) {
        setProgress("Publicando mensagem de texto...");
        const derivedTitle = cleanTitle || cleanText.split("\n")[0].slice(0, 80);
        const res = await fetch("/api/admin/files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: derivedTitle, textBody: cleanText }),
        });
        if (!res.ok) {
          const err = (await res.json().catch(() => ({}))) as { error?: string };
          setFeedback({ type: "error", text: err.error ?? "Erro ao publicar texto." });
          return;
        }

        setPostTitle("");
        setPostText("");
        router.push("/painel");
        router.refresh();
        return;
      }

      // Caso 2: Links externos colados (vídeos, fotos ou documentos) com nome personalizado e legenda
      let publishedCount = 0;
      for (let i = 0; i < validLinks.length; i++) {
        const link = validLinks[i];
        setProgress(`[${i + 1}/${validLinks.length}] Publicando link no chat...`);
        const itemTitle = cleanTitle
          ? validLinks.length > 1
            ? `${cleanTitle} #${i + 1}`
            : cleanTitle
          : undefined;
        const res = await fetch("/api/admin/files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            linkUrl: link.raw,
            category: category === "auto" ? "auto" : category,
            title: itemTitle,
            textBody: cleanText || undefined,
          }),
        });
        if (!res.ok) {
          const err = (await res.json().catch(() => ({}))) as { error?: string };
          setFeedback({ type: "error", text: err.error ?? `Erro ao salvar link ${link.raw}` });
          continue;
        }
        publishedCount += 1;
      }

      // Caso 3: 1 ou mais arquivos no R2 (com nome personalizado e legenda)
      let uploadedCount = 0;
      for (let i = 0; i < queuedFiles.length; i++) {
        const file = queuedFiles[i];
        const mimeType = resolveMimeType(file.name, file.type);
        const targetCat = category === "auto" ? inferCategoryFromMime(mimeType) : category;
        const titleToUse = cleanTitle
          ? queuedFiles.length > 1
            ? `${cleanTitle} #${i + 1}`
            : cleanTitle
          : file.name;
        const captionToUse = cleanText || undefined;

        setProgress(`[${i + 1}/${queuedFiles.length}] Preparando ${file.name}...`);
        const presignRes = await fetch("/api/files/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "put",
            category: targetCat,
            title: titleToUse,
            mimeType,
            sizeBytes: file.size,
            fileName: file.name,
          }),
        });

        const presignData = (await presignRes.json().catch(() => ({}))) as {
          uploadUrl?: string;
          r2Key?: string;
          contentType?: string;
          error?: string;
        };

        if (!presignRes.ok || !presignData.uploadUrl || !presignData.r2Key) {
          setFeedback({
            type: "error",
            text: presignData.error ?? `Erro ao preparar envio de ${file.name}`,
          });
          continue;
        }

        setProgress(`[${i + 1}/${queuedFiles.length}] Enviando ${file.name} para o R2...`);
        let putRes: Response;
        try {
          putRes = await fetch(presignData.uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": presignData.contentType || mimeType },
            body: file,
          });
        } catch {
          setFeedback({
            type: "error",
            text: `Falha de rede/CORS ao enviar ${file.name} para o R2.`,
          });
          continue;
        }

        if (!putRes.ok) {
          setFeedback({
            type: "error",
            text: `O R2 recusou o envio de ${file.name} (HTTP ${putRes.status}).`,
          });
          continue;
        }

        setProgress(`[${i + 1}/${queuedFiles.length}] Confirmando ${file.name}...`);
        const confirmRes = await fetch("/api/files/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "confirm",
            category: targetCat,
            title: titleToUse,
            textBody: captionToUse,
            mimeType: presignData.contentType || mimeType,
            sizeBytes: file.size,
            fileName: file.name,
            r2Key: presignData.r2Key,
          }),
        });

        const confirmData = (await confirmRes.json().catch(() => ({}))) as { error?: string };
        if (!confirmRes.ok) {
          setFeedback({
            type: "error",
            text: confirmData.error ?? `Erro ao confirmar ${file.name}.`,
          });
          continue;
        }

        uploadedCount += 1;
      }

      if (uploadedCount + publishedCount > 0) {
        setPostTitle("");
        setPostText("");
        setExternalLinksInput("");
        setQueuedFiles([]);
        setFeedback({
          type: "success",
          text: `${uploadedCount + publishedCount} item(ns) publicado(s) no Chat Colaboradores!`,
        });
        router.push("/painel");
        router.refresh();
      }
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Erro inesperado ao publicar.",
      });
    } finally {
      setIsPublishing(false);
      setProgress("");
    }
  }

  async function handleSaveEdit(id: string) {
    const res = await fetch("/api/admin/files", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title: editTitle,
        category: editCategory,
        textBody: editTextBody,
      }),
    });
    if (res.ok) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                title: editTitle.trim() || f.title,
                category: editCategory,
                textBody: editTextBody.trim() || null,
              }
            : f
        )
      );
      setEditingId(null);
      setFeedback({ type: "success", text: "Nome, legenda e categoria atualizados." });
    } else {
      setFeedback({ type: "error", text: "Não foi possível atualizar o item." });
    }
  }

  async function handleDeleteFile(id: string) {
    if (!window.confirm("Confirmar exclusão definitiva do item?")) return;
    const res = await fetch(`/api/admin/files?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    }
  }

  async function handleRoleChange(userId: string, role: AdminUserItem["role"]) {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    if (res.ok) {
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    } else {
      const err = (await res.json().catch(() => ({}))) as { error?: string };
      setFeedback({ type: "error", text: err.error ?? "Erro ao atualizar papel" });
    }
  }

  const firstValidLink = parsedLinks.find((l) => l.valid);

  return (
    <div className="space-y-6">
      {/* Navegação interna do Admin */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("conteudo")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
            activeTab === "conteudo"
              ? "bg-[#0e526c] text-white"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <FolderPlus className="w-4 h-4" />
          Conteúdo e Publicação ({files.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("usuarios")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
            activeTab === "usuarios"
              ? "bg-[#0e526c] text-white"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Users className="w-4 h-4" />
          Usuários ({users.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("auditoria")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
            activeTab === "auditoria"
              ? "bg-[#0e526c] text-white"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <History className="w-4 h-4" />
          Auditoria ({initialLogs.length})
        </button>
      </div>

      {feedback && (
        <div
          role={feedback.type === "error" ? "alert" : "status"}
          className={`rounded-xl border px-4 py-3 text-sm font-medium ${
            feedback.type === "error"
              ? "bg-red-50 border-red-200 text-red-900"
              : "bg-emerald-50 border-emerald-200 text-emerald-900"
          }`}
        >
          {feedback.text}
        </div>
      )}

      {activeTab === "conteudo" && (
        <div className="space-y-6">
          {/* Card único: Nova Publicação (Arquivos, Links e/ou Texto) */}
          <form
            onSubmit={handlePublish}
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5 shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#0e526c]">
                  Nova Publicação no Chat Colaboradores
                </h2>
                <p className="text-xs text-slate-500">
                  Suba arquivos, cole links (YouTube, Vimeo, Drive, fotos, PDFs) e adicione nome personalizado e legenda.
                </p>
              </div>
              <a
                href="/painel"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0e526c] hover:underline"
              >
                <span>Abrir Chat Colaboradores</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* 1. Seleção de Categoria + Legenda de formatos */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={isPublishing}
                    onClick={() => setCategory(opt.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                      category === opt.value
                        ? "bg-[#0e526c] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">
                  O que pode importar ou colar link em cada opção:
                </p>
                {CATEGORY_OPTIONS.filter((o) => o.hint).map((opt) => (
                  <p
                    key={opt.value}
                    className={category === opt.value ? "text-[#0e526c] font-semibold" : ""}
                  >
                    <strong>{opt.label}:</strong> {opt.hint}
                  </p>
                ))}
              </div>
            </div>

            {/* 2. Anexar Arquivos e Colar Links */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Subir arquivo */}
              <div className="space-y-2">
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    addFilesToQueue(Array.from(e.dataTransfer.files));
                  }}
                  className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition-colors min-h-[132px] ${
                    isDragging
                      ? "border-[#0e526c] bg-sky-50"
                      : "border-slate-300 bg-slate-50/70 hover:border-[#0e526c]/60"
                  }`}
                >
                  <UploadCloud className="w-7 h-7 text-[#0e526c] mb-1.5" />
                  <span className="text-sm font-semibold text-slate-800">
                    Clique para anexar ou arraste arquivos aqui (opcional)
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">
                    Tipo selecionado:{" "}
                    <strong>{CATEGORY_OPTIONS.find((o) => o.value === category)?.label}</strong>
                  </span>
                  <input
                    type="file"
                    multiple
                    disabled={isPublishing}
                    onChange={(e) => {
                      const list = Array.from(e.target.files ?? []);
                      e.target.value = "";
                      addFilesToQueue(list);
                    }}
                    className="sr-only"
                  />
                </label>

                {queuedFiles.length > 0 && (
                  <ul className="space-y-1.5 max-h-32 overflow-y-auto">
                    {queuedFiles.map((file, idx) => (
                      <li
                        key={`${file.name}-${idx}`}
                        className="flex items-center justify-between gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs"
                      >
                        <span className="inline-flex items-center gap-1.5 truncate font-medium text-slate-800">
                          <Paperclip className="w-3.5 h-3.5 text-[#0e526c] shrink-0" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-slate-500 shrink-0">
                            ({(file.size / 1024).toFixed(0)} KB)
                          </span>
                        </span>
                        <button
                          type="button"
                          disabled={isPublishing}
                          onClick={() => removeQueuedFile(idx)}
                          aria-label={`Remover ${file.name}`}
                          className="text-slate-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Colar Links */}
              <div className="space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <label
                    htmlFor="external-links"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700"
                  >
                    <Link2 className="w-3.5 h-3.5 text-[#0e526c]" />
                    <span>Colar links de vídeos, fotos ou documentos (opcional, 1 por linha)</span>
                  </label>
                  <textarea
                    id="external-links"
                    rows={3}
                    disabled={isPublishing}
                    value={externalLinksInput}
                    onChange={(e) => setExternalLinksInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... ou link de foto/PDF/Google Drive"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
                  />
                </div>

                {parsedLinks.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {parsedLinks.map((l, idx) => (
                      <span
                        key={idx}
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          l.valid
                            ? "bg-sky-50 text-[#0e526c] border border-sky-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {l.valid
                          ? `Link ${idx + 1}: Visualizado no Chat como ${
                              l.detected === "video"
                                ? "Vídeo"
                                : l.detected === "image"
                                  ? "Foto / GIF"
                                  : "Documento"
                            }`
                          : `Link ${idx + 1}: URL inválida`}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3. Nome Personalizado e Legenda (sempre visíveis junto da publicação) */}
            <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-4 space-y-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="post-title" className="text-xs font-bold text-slate-800 block">
                    Nome personalizado do arquivo / link (opcional)
                  </label>
                  <input
                    id="post-title"
                    type="text"
                    disabled={isPublishing}
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Ex.: Vídeo de Treinamento Comercial ou Tabela Oficial"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="post-caption" className="text-xs font-bold text-slate-800">
                      Legenda ou Mensagem no Chat (opcional se enviar arquivo/link)
                    </label>
                    <button
                      type="button"
                      onClick={() => setTextPreview((v) => !v)}
                      className="text-xs font-semibold text-[#0e526c] hover:underline"
                    >
                      {textPreview ? "Editar" : "Pré-visualizar"}
                    </button>
                  </div>
                  {textPreview ? (
                    <pre className="whitespace-pre-wrap text-sm text-slate-800 bg-white border border-slate-200 rounded-xl p-3 min-h-[76px]">
                      {postText || "Sem legenda."}
                    </pre>
                  ) : (
                    <textarea
                      id="post-caption"
                      rows={2}
                      disabled={isPublishing}
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      placeholder="Escreva uma legenda explicativa para o link/arquivo ou publique apenas um comunicado..."
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
                    />
                  )}
                </div>
              </div>

              {/* Pré-visualização ao vivo do Link colado */}
              {firstValidLink && firstValidLink.valid && (
                <div className="pt-2 border-t border-slate-200/80 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0e526c] flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    Prévia de como aparecerá dentro do Chat Colaboradores:
                  </p>
                  <div className="max-w-md bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2">
                    <p className="text-sm font-bold text-slate-900 break-words">
                      {postTitle.trim() || "Material compartilhado"}
                    </p>
                    {firstValidLink.detected === "video" &&
                      (() => {
                        const embed = getExternalVideoEmbed(firstValidLink.raw);
                        if (embed.type === "iframe") {
                          return (
                            <iframe
                              src={embed.src}
                              title="Prévia de vídeo"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full aspect-video rounded-xl border border-slate-200 bg-black"
                            />
                          );
                        }
                        return (
                          <video
                            controls
                            preload="metadata"
                            src={embed.src}
                            className="w-full max-h-56 rounded-xl bg-black"
                          />
                        );
                      })()}
                    {firstValidLink.detected === "image" && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={getExternalImageSrc(firstValidLink.raw)}
                        alt={postTitle.trim() || "Prévia"}
                        className="max-h-52 rounded-xl object-contain bg-slate-100"
                      />
                    )}
                    {firstValidLink.detected === "document" &&
                      (() => {
                        const docEmbed = getExternalDocumentEmbed(firstValidLink.raw);
                        return docEmbed ? (
                          <iframe
                            src={docEmbed}
                            title="Prévia de documento"
                            className="w-full h-48 rounded-xl border border-slate-200 bg-slate-50"
                          />
                        ) : null;
                      })()}
                    {postText.trim() && (
                      <p className="text-xs text-slate-700 whitespace-pre-wrap break-words">
                        {postText.trim()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#0e526c]">
                {progress ||
                  (queuedFiles.length + parsedLinks.filter((l) => l.valid).length > 0
                    ? `Pronto para publicar ${queuedFiles.length} arquivo(s) e ${parsedLinks.filter((l) => l.valid).length} link(s)${postTitle.trim() ? ` com nome "${postTitle.trim()}"` : ""}.`
                    : postText.trim()
                      ? "Pronto para publicar mensagem de texto."
                      : "Escreva um texto, cole links ou anexe arquivos para publicar.")}
              </span>

              <button
                type="submit"
                disabled={
                  isPublishing ||
                  (queuedFiles.length === 0 &&
                    parsedLinks.filter((l) => l.valid).length === 0 &&
                    !postText.trim())
                }
                className="inline-flex items-center gap-2 rounded-xl bg-[#0e526c] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#0b4156] disabled:opacity-40 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{isPublishing ? "Publicando..." : "Publicar"}</span>
              </button>
            </div>
          </form>

          {/* Gerenciar Arquivos e Textos */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#0e526c]">
                Gerenciar Arquivos, Links e Textos ({visibleFiles.length})
              </h2>
              <select
                aria-label="Filtrar arquivos por seção"
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold"
              >
                <option value="all">Todas as seções</option>
                {ALL_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {visibleFiles.length === 0 ? (
              <p className="text-sm text-slate-500 py-4">Nenhum item cadastrado ainda.</p>
            ) : (
              <ul className="divide-y divide-slate-100 text-sm">
                {visibleFiles.map((f) => {
                  const isEditing = editingId === f.id;
                  return (
                    <li
                      key={f.id}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      {isEditing ? (
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap gap-2 items-center">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Nome personalizado"
                              className="flex-1 min-w-[200px] rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm"
                            />
                            <select
                              value={editCategory}
                              onChange={(e) =>
                                setEditCategory(e.target.value as PainelFileItem["category"])
                              }
                              className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold"
                            >
                              {ALL_CATEGORIES.map((c) => (
                                <option key={c.value} value={c.value}>
                                  {c.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <textarea
                            rows={2}
                            value={editTextBody}
                            onChange={(e) => setEditTextBody(e.target.value)}
                            placeholder="Legenda ou descrição..."
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs sm:text-sm"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(f.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Salvar
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600"
                            >
                              <X className="w-3.5 h-3.5" />
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="min-w-0 space-y-0.5">
                            <p className="font-semibold text-slate-900 break-words">{f.title}</p>
                            {f.textBody && (
                              <p className="text-xs text-slate-600 line-clamp-2 break-words">
                                {f.textBody}
                              </p>
                            )}
                            <p className="text-[11px] text-slate-400">
                              {ALL_CATEGORIES.find((c) => c.value === f.category)?.label ?? f.category} ·{" "}
                              {f.mimeType.endsWith("/external-url")
                                ? "Link externo"
                                : `${(f.sizeBytes / 1024).toFixed(1)} KB`}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(f.id);
                                setEditTitle(f.title);
                                setEditTextBody(f.textBody ?? "");
                                setEditCategory(f.category);
                              }}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0e526c] hover:underline"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              Editar nome / legenda
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteFile(f.id)}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Excluir
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      )}

      {activeTab === "usuarios" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-[#0e526c]">Usuários ({users.length})</h2>
          <ul className="divide-y divide-slate-100 text-sm">
            {users.map((u) => (
              <li key={u.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{u.name}</p>
                  <p className="text-xs text-slate-500 break-all">{u.email}</p>
                </div>
                <select
                  aria-label={`Papel de ${u.name}`}
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value as AdminUserItem["role"])}
                  className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-bold"
                >
                  <option value="pendente">pendente</option>
                  <option value="colaborador">colaborador</option>
                  <option value="admin">admin</option>
                  <option value="bloqueado">bloqueado</option>
                </select>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === "auditoria" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-[#0e526c]">Logs de Auditoria Recentes</h2>
          {initialLogs.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">Nenhum evento registrado ainda.</p>
          ) : (
            <ul className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
              {initialLogs.map((log) => (
                <li key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="min-w-0 space-y-0.5">
                    <p className="break-words">
                      <strong className="text-slate-900">{log.actorName}</strong>
                      {log.actorEmail ? (
                        <span className="text-slate-500 text-xs"> ({log.actorEmail})</span>
                      ) : null}{" "}
                      · <span className="font-semibold text-[#0e526c]">{log.actionLabel}</span>
                    </p>
                    {log.detail && (
                      <p className="text-xs text-slate-600 break-words">Item: {log.detail}</p>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">
                    {new Date(log.createdAt).toLocaleString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
