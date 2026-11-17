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
} from "lucide-react";
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
    hint: "MP4, WEBM, MOV, AVI, MKV (até 500 MB por arquivo)",
  },
  {
    value: "document",
    label: "Documentos",
    hint: "PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV, ZIP (até 50 MB por arquivo)",
  },
  {
    value: "image",
    label: "Imagens e GIFs",
    hint: "PNG, JPG, JPEG, WEBP, GIF, SVG (até 20 MB por arquivo)",
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

  // Compositor unificado (Arquivo e/ou Texto)
  const [category, setCategory] = useState<UploadCategory>("auto");
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [textPreview, setTextPreview] = useState(false);
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [progress, setProgress] = useState<string>("");

  // Edição inline na lista
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<PainelFileItem["category"]>("document");
  const [filterCat, setFilterCat] = useState<string>("all");

  const [feedback, setFeedback] = useState<{ type: "error" | "success"; text: string } | null>(null);

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

    if (queuedFiles.length === 0 && !cleanText) {
      setFeedback({
        type: "error",
        text: "Escreva um texto ou anexe pelo menos um arquivo antes de publicar.",
      });
      return;
    }

    setFeedback(null);
    setIsPublishing(true);

    try {
      // Caso 1: apenas texto (sem anexos)
      if (queuedFiles.length === 0) {
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

      // Caso 2: 1 ou mais arquivos (com ou sem legenda/texto junto)
      let uploadedCount = 0;
      for (let i = 0; i < queuedFiles.length; i++) {
        const file = queuedFiles[i];
        const mimeType = resolveMimeType(file.name, file.type);
        const targetCat = category === "auto" ? inferCategoryFromMime(mimeType) : category;
        const titleToUse =
          queuedFiles.length === 1 && cleanTitle ? cleanTitle : file.name;
        const captionToUse = i === 0 && cleanText ? cleanText : undefined;

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

      if (uploadedCount > 0) {
        setPostTitle("");
        setPostText("");
        setQueuedFiles([]);
        setFeedback({
          type: "success",
          text: `${uploadedCount} item(ns) publicado(s) no Chat Colaboradores!`,
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
      body: JSON.stringify({ id, title: editTitle, category: editCategory }),
    });
    if (res.ok) {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, title: editTitle.trim() || f.title, category: editCategory } : f))
      );
      setEditingId(null);
      setFeedback({ type: "success", text: "Item atualizado." });
    } else {
      setFeedback({ type: "error", text: "Não foi possível atualizar o item." });
    }
  }

  async function handleDeleteFile(id: string) {
    if (!window.confirm("Confirmar exclusão definitiva do arquivo?")) return;
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
          {/* Card único: Nova Publicação (Arquivos e/ou Texto) */}
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
                  Envie só texto, só arquivo(s), ou arquivo(s) com texto/legenda juntos.
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Lado Texto / Título */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="post-title" className="text-xs font-bold text-slate-700">
                    Título (opcional)
                  </label>
                  <button
                    type="button"
                    onClick={() => setTextPreview((v) => !v)}
                    className="text-xs font-semibold text-[#0e526c] hover:underline"
                  >
                    {textPreview ? "Editar texto" : "Pré-visualizar texto"}
                  </button>
                </div>

                <input
                  id="post-title"
                  type="text"
                  disabled={isPublishing}
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Ex.: Treinamento Comercial ou Tabela Atualizada"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
                />

                {textPreview ? (
                  <pre className="whitespace-pre-wrap text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3.5 min-h-[140px]">
                    {postText || "Nada para pré-visualizar."}
                  </pre>
                ) : (
                  <textarea
                    rows={6}
                    disabled={isPublishing}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Escreva a mensagem, aviso ou legenda que acompanha os arquivos..."
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
                  />
                )}
              </div>

              {/* Lado Arquivos (R2) */}
              <div className="space-y-3">
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
                    O que pode importar em cada opção:
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
                  className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition-colors ${
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
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#0e526c]">
                {progress ||
                  (queuedFiles.length > 0 && postText.trim()
                    ? `Pronto para publicar ${queuedFiles.length} arquivo(s) com legenda.`
                    : queuedFiles.length > 0
                      ? `Pronto para publicar ${queuedFiles.length} arquivo(s).`
                      : postText.trim()
                        ? "Pronto para publicar mensagem de texto."
                        : "Anexe arquivo(s) e/ou escreva um texto para publicar.")}
              </span>

              <button
                type="submit"
                disabled={isPublishing || (queuedFiles.length === 0 && !postText.trim())}
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
                Gerenciar Arquivos e Textos ({visibleFiles.length})
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
                        <div className="flex-1 flex flex-wrap gap-2 items-center">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="flex-1 min-w-[180px] rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm"
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
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(f.id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Salvar
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 break-words">{f.title}</p>
                            <p className="text-xs text-slate-500">
                              {ALL_CATEGORIES.find((c) => c.value === f.category)?.label ?? f.category} ·{" "}
                              {(f.sizeBytes / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(f.id);
                                setEditTitle(f.title);
                                setEditCategory(f.category);
                              }}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0e526c] hover:underline"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              Editar / Mover
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
