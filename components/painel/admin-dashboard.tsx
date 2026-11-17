"use client";

import React, { useState } from "react";
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

export function AdminDashboard({
  initialFiles,
  initialUsers,
  initialLogs,
}: {
  initialFiles: PainelFileItem[];
  initialUsers: AdminUserItem[];
  initialLogs: AuditLogItem[];
}) {
  const [files, setFiles] = useState(initialFiles);
  const [users, setUsers] = useState(initialUsers);
  const [category, setCategory] = useState<"video" | "chat" | "document" | "image">("document");
  const [progress, setProgress] = useState<string>("");
  const [textTitle, setTextTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [feedback, setFeedback] = useState("");

  async function handleFileUpload(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setFeedback("");
    for (const file of Array.from(fileList)) {
      setProgress(`Enviando ${file.name}...`);
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
      if (!presignRes.ok) {
        const err = (await presignRes.json()) as { error?: string };
        setFeedback(err.error ?? "Erro ao gerar URL assinada");
        continue;
      }
      const { uploadUrl, r2Key } = (await presignRes.json()) as { uploadUrl: string; r2Key: string };
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      });
      if (!putRes.ok) {
        setFeedback(`Falha no envio de ${file.name} para o R2`);
        continue;
      }
      const confirmRes = await fetch("/api/files/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "confirm",
          category,
          title: file.name,
          mimeType: file.type || "application/octet-stream",
          sizeBytes: file.size,
          fileName: file.name,
          r2Key,
        }),
      });
      if (confirmRes.ok) {
        setFeedback(`Arquivo ${file.name} salvo com sucesso.`);
      }
    }
    setProgress("");
    window.location.reload();
  }

  async function handleCreateText(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: textTitle, textBody }),
    });
    if (res.ok) {
      setTextTitle("");
      setTextBody("");
      window.location.reload();
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
      const err = (await res.json()) as { error?: string };
      setFeedback(err.error ?? "Erro ao atualizar papel");
    }
  }

  return (
    <div className="space-y-8">
      {feedback && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
          {feedback}
        </div>
      )}

      {/* Upload direto ao R2 */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0e526c]">Upload de Arquivos (R2)</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="video">Vídeos</option>
            <option value="chat">Chats</option>
            <option value="document">Documentos</option>
            <option value="image">Imagens e GIFs</option>
          </select>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            className="text-sm"
          />
          {progress && <span className="text-xs font-semibold text-[#0e526c]">{progress}</span>}
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
