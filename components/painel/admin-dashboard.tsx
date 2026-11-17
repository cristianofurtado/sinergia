"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

const CATEGORY_OPTIONS: { value: UploadCategory; label: string }[] = [
  { value: "video", label: "Vídeos" },
  { value: "chat", label: "Chats" },
  { value: "document", label: "Documentos" },
  { value: "image", label: "Imagens e GIFs" },
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
  const [files, setFiles] = useState(initialFiles);
  const [users, setUsers] = useState(initialUsers);
  const [category, setCategory] = useState<UploadCategory>("document");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [textTitle, setTextTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; text: string } | null>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const selectedFiles = Array.from(fileList);
    e.target.value = "";
    setFeedback(null);
    setIsUploading(true);

    let uploadedCount = 0;
    try {
      for (const file of selectedFiles) {
        setProgress(`Preparando ${file.name}...`);

        const presignRes = await fetch("/api/files/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "put",
            category,
            title: file.name,
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

        setProgress(`Enviando ${file.name} para o armazenamento...`);
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
            text: `Falha de rede/CORS ao enviar ${file.name} para o R2. Verifique a política CORS do bucket.`,
          });
          continue;
        }

        if (!putRes.ok) {
          setFeedback({
            type: "error",
            text: `O R2 recusou o envio de ${file.name} (status ${putRes.status}).`,
          });
          continue;
        }

        setProgress(`Confirmando ${file.name}...`);
        const confirmRes = await fetch("/api/files/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "confirm",
            category,
            title: file.name,
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
            text: confirmData.error ?? `Erro ao confirmar ${file.name} no banco.`,
          });
          continue;
        }

        uploadedCount += 1;
      }

      if (uploadedCount > 0) {
        setFeedback({
          type: "success",
          text: `${uploadedCount} arquivo(s) importado(s)! Redirecionando...`,
        });
        router.push(`/painel?categoria=${category}`);
        router.refresh();
      }
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Erro inesperado durante o envio.",
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
      router.push("/painel?categoria=text");
      router.refresh();
    } else {
      const err = (await res.json().catch(() => ({}))) as { error?: string };
      setFeedback({ type: "error", text: err.error ?? "Erro ao salvar texto" });
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
    <div className="space-y-8">
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

      {/* Upload direto ao R2 */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0e526c]">Upload de Arquivos (R2)</h2>

        {/* Botões rápidos de destino */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((opt) => {
            const active = category === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                disabled={isUploading}
                onClick={() => setCategory(opt.value)}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
                  active
                    ? "bg-[#0e526c] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            aria-label="Categoria do arquivo"
            disabled={isUploading}
            value={category}
            onChange={(e) => setCategory(e.target.value as UploadCategory)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="file"
            multiple
            disabled={isUploading}
            onChange={handleFileUpload}
            className="text-sm disabled:opacity-50"
          />
          {progress && (
            <span className="text-xs font-semibold text-[#0e526c] animate-pulse">
              {progress}
            </span>
          )}
        </div>
      </section>

      {/* Criar texto */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0e526c]">Publicar Texto Interno</h2>
        <form onSubmit={handleCreateText} className="space-y-3">
          <input
            type="text"
            required
            value={textTitle}
            onChange={(e) => setTextTitle(e.target.value)}
            placeholder="Título do texto"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <textarea
            required
            rows={4}
            value={textBody}
            onChange={(e) => setTextBody(e.target.value)}
            placeholder="Conteúdo em texto/markdown..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#0e526c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b4156]"
          >
            Salvar texto
          </button>
        </form>
      </section>

      {/* Arquivos cadastrados */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0e526c]">Arquivos e Textos ({files.length})</h2>
        <ul className="divide-y divide-slate-100 text-sm">
          {files.map((f) => (
            <li key={f.id} className="py-2.5 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{f.title}</p>
                <p className="text-xs text-slate-500">
                  {f.category} · {(f.sizeBytes / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteFile(f.id)}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Usuários */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0e526c]">Usuários ({users.length})</h2>
        <ul className="divide-y divide-slate-100 text-sm">
          {users.map((u) => (
            <li key={u.id} className="py-2.5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{u.name}</p>
                <p className="text-xs text-slate-500">{u.email}</p>
              </div>
              <select
                value={u.role}
                onChange={(e) => handleRoleChange(u.id, e.target.value as AdminUserItem["role"])}
                className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold"
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

      {/* Auditoria */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0e526c]">Logs de Auditoria Recentes</h2>
        <ul className="divide-y divide-slate-100 text-xs text-slate-600">
          {initialLogs.map((log) => (
            <li key={log.id} className="py-2 flex justify-between">
              <span>
                <strong>{log.action}</strong> ({log.targetType})
              </span>
              <span>{new Date(log.createdAt).toLocaleString("pt-BR")}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
