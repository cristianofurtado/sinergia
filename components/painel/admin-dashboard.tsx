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
  FileText,
  History,
  FolderPlus,
} from "lucide-react";
import type { PainelFileItem } from "./colaborador-browser";

interface AdminUserItem {
  id: string;
  email: string;
  name: string;
  role: "pendente" | "colaborador" | "admin" | "bloqueado";
}

interface AuditLogItem {
  id: string;
  actorId: string;
  action: string;
  targetType: string;
  createdAt: string;
}

type UploadCategory = "video" | "chat" | "document" | "image";
type AdminTab = "conteudo" | "usuarios" | "auditoria";

const CATEGORY_OPTIONS: { value: UploadCategory; label: string }[] = [
  { value: "video", label: "Vídeos" },
  { value: "chat", label: "Chats" },
  { value: "document", label: "Documentos" },
  { value: "image", label: "Imagens e GIFs" },
];

const ALL_CATEGORIES: { value: PainelFileItem["category"]; label: string }[] = [
  ...CATEGORY_OPTIONS,
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

  // Upload
  const [category, setCategory] = useState<UploadCategory>("document");
  const [customTitle, setCustomTitle] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<string>("");

  // Texto personalizado
  const [textTitle, setTextTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [textPreview, setTextPreview] = useState(false);

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

  async function uploadFiles(selectedFiles: File[]) {
    if (selectedFiles.length === 0 || isUploading) return;

    setFeedback(null);
    setIsUploading(true);
    let uploadedCount = 0;

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const titleToUse =
          selectedFiles.length === 1 && customTitle.trim() ? customTitle.trim() : file.name;

        setProgress(`[${i + 1}/${selectedFiles.length}] Preparando ${file.name}...`);

        const presignRes = await fetch("/api/files/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "put",
            category,
            title: titleToUse,
            mimeType: file.type || "application/octet-stream",
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
            text: presignData.error ?? `Erro ao gerar URL assinada para ${file.name}`,
          });
          continue;
        }

        setProgress(`[${i + 1}/${selectedFiles.length}] Enviando ${file.name} para o R2...`);
        let putRes: Response;
        try {
          putRes = await fetch(presignData.uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": presignData.contentType || "application/octet-stream" },
            body: file,
          });
        } catch {
          setFeedback({
            type: "error",
            text: `Falha de rede/CORS ao enviar ${file.name} para o R2. Verifique o CORS do bucket.`,
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

        setProgress(`[${i + 1}/${selectedFiles.length}] Salvando ${file.name}...`);
        const confirmRes = await fetch("/api/files/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "confirm",
            category,
            title: titleToUse,
            mimeType: presignData.contentType || file.type || "application/octet-stream",
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
        setCustomTitle("");
        setFeedback({
          type: "success",
          text: `${uploadedCount} arquivo(s) publicado(s) no Chat Colaboradores!`,
        });
        router.push("/painel");
        router.refresh();
      }
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Erro inesperado durante o upload.",
      });
    } finally {
      setIsUploading(false);
      setProgress("");
    }
  }

  async function handleCreateText(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    const res = await fetch("/api/admin/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: textTitle, textBody }),
    });
    if (res.ok) {
      setTextTitle("");
      setTextBody("");
      router.push("/painel");
      router.refresh();
    } else {
      const err = (await res.json().catch(() => ({}))) as { error?: string };
      setFeedback({ type: "error", text: err.error ?? "Erro ao salvar texto." });
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
          Conteúdo e Uploads ({files.length})
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Upload personalizado R2 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#0e526c]">Importar Arquivos (R2)</h2>
                <a
                  href="/painel"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0e526c] hover:underline"
                >
                  <span>Abrir Chat Colaboradores</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={isUploading}
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

              <input
                type="text"
                disabled={isUploading}
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Título personalizado (opcional para 1 arquivo)"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
              />

              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  uploadFiles(Array.from(e.dataTransfer.files));
                }}
                className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-[#0e526c] bg-sky-50"
                    : "border-slate-300 bg-slate-50/70 hover:border-[#0e526c]/60"
                }`}
              >
                <UploadCloud className="w-8 h-8 text-[#0e526c] mb-2" />
                <span className="text-sm font-semibold text-slate-800">
                  {isUploading ? progress : "Clique para escolher ou arraste arquivos aqui"}
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Destino selecionado:{" "}
                  <strong>{CATEGORY_OPTIONS.find((o) => o.value === category)?.label}</strong>
                </span>
                <input
                  type="file"
                  multiple
                  disabled={isUploading}
                  onChange={(e) => {
                    const list = Array.from(e.target.files ?? []);
                    e.target.value = "";
                    uploadFiles(list);
                  }}
                  className="sr-only"
                />
              </label>
            </section>

            {/* Editor de Texto */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#0e526c] flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Publicar Texto Interno
                </h2>
                <button
                  type="button"
                  onClick={() => setTextPreview((v) => !v)}
                  className="text-xs font-semibold text-[#0e526c] hover:underline"
                >
                  {textPreview ? "Editar" : "Pré-visualizar"}
                </button>
              </div>
              <form onSubmit={handleCreateText} className="space-y-3">
                <input
                  type="text"
                  required
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  placeholder="Título do comunicado ou roteiro"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
                />
                {textPreview ? (
                  <pre className="whitespace-pre-wrap text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3.5 min-h-[124px]">
                    {textBody || "Nada para pré-visualizar."}
                  </pre>
                ) : (
                  <textarea
                    required
                    rows={5}
                    value={textBody}
                    onChange={(e) => setTextBody(e.target.value)}
                    placeholder="Escreva o conteúdo em texto ou Markdown..."
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
                  />
                )}
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl bg-[#0e526c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0b4156]"
                >
                  Publicar texto
                </button>
              </form>
            </section>
          </div>

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
          <ul className="divide-y divide-slate-100 text-xs text-slate-600">
            {initialLogs.map((log) => (
              <li key={log.id} className="py-2.5 flex flex-wrap justify-between gap-2">
                <span>
                  <strong className="text-slate-900">{log.action}</strong> ({log.targetType})
                </span>
                <span>{new Date(log.createdAt).toLocaleString("pt-BR")}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
