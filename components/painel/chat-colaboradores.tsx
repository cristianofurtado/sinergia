"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Paperclip,
  Send,
  Search,
  Download,
  FileText,
  Trash2,
  X,
  ShieldCheck,
  Users,
  Eye,
} from "lucide-react";
import { inferCategoryFromMime, resolveMimeType } from "@/lib/file-validation";

export interface ChatFeedItem {
  id: string;
  category: "video" | "chat" | "document" | "image" | "text";
  title: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  textBody: string | null;
  createdAt: string;
  authorName: string;
  mediaUrl: string | null;
}

export function ChatColaboradores({
  initialItems,
  isAdmin,
}: {
  initialItems: ChatFeedItem[];
  isAdmin: boolean;
}) {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<ChatFeedItem[]>(initialItems);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lightbox, setLightbox] = useState<{ item: ChatFeedItem; url: string } | null>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [items.length]);

  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        (i.textBody?.toLowerCase().includes(q) ?? false) ||
        i.authorName.toLowerCase().includes(q)
    );
  }, [items, query]);

  async function handleDownload(item: ChatFeedItem) {
    setErrorMsg(null);
    const res = await fetch("/api/files/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get", fileId: item.id }),
    });
    const data = (await res.json().catch(() => ({}))) as { downloadUrl?: string; error?: string };
    if (!res.ok || !data.downloadUrl) {
      setErrorMsg(data.error ?? "Não foi possível abrir o arquivo.");
      return;
    }
    window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
  }

  async function handleSendText(e: React.FormEvent) {
    e.preventDefault();
    const text = messageText.trim();
    if (!text || !isAdmin || isSending) return;
    setErrorMsg(null);
    setIsSending(true);
    try {
      const firstLine = text.split("\n")[0].slice(0, 80);
      const res = await fetch("/api/admin/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: firstLine, textBody: text }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMsg(err.error ?? "Erro ao publicar mensagem.");
        return;
      }
      setMessageText("");
      router.refresh();
    } finally {
      setIsSending(false);
    }
  }

  async function handleUploadFiles(fileList: File[]) {
    if (!isAdmin || fileList.length === 0 || isSending) return;
    setErrorMsg(null);
    setIsSending(true);
    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const mimeType = resolveMimeType(file.name, file.type);
        const category = inferCategoryFromMime(mimeType);
        setUploadStatus(`[${i + 1}/${fileList.length}] Enviando ${file.name}...`);

        const presignRes = await fetch("/api/files/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "put",
            category,
            title: file.name,
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
          setErrorMsg(presignData.error ?? `Erro ao preparar envio de ${file.name}`);
          continue;
        }

        const putRes = await fetch(presignData.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": presignData.contentType || mimeType },
          body: file,
        }).catch(() => null);

        if (!putRes || !putRes.ok) {
          setErrorMsg(`Falha ao enviar ${file.name} para o armazenamento R2.`);
          continue;
        }

        const confirmRes = await fetch("/api/files/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "confirm",
            category,
            title: file.name,
            mimeType: presignData.contentType || mimeType,
            sizeBytes: file.size,
            fileName: file.name,
            r2Key: presignData.r2Key,
          }),
        });
        if (!confirmRes.ok) {
          const err = (await confirmRes.json().catch(() => ({}))) as { error?: string };
          setErrorMsg(err.error ?? `Erro ao salvar ${file.name}.`);
        }
      }
      router.refresh();
    } finally {
      setIsSending(false);
      setUploadStatus("");
    }
  }

  async function handleDelete(id: string) {
    if (!isAdmin || !window.confirm("Remover esta mensagem/arquivo do grupo?")) return;
    const res = await fetch(`/api/admin/files?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  }

  return (
    <div
      onDragOver={(e) => {
        if (!isAdmin) return;
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        if (!isAdmin) return;
        e.preventDefault();
        setIsDragging(false);
        handleUploadFiles(Array.from(e.dataTransfer.files));
      }}
      className="flex flex-col h-[calc(100vh-56px)] lg:h-screen bg-[#e5ddd5] relative"
    >
      {/* Topo do Grupo estilo WhatsApp/Telegram */}
      <div className="bg-[#f0f2f5] border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#0e526c] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
              Chat Colaboradores
            </h1>
            <p className="text-xs text-slate-500 truncate">
              Energia Prospectar · {items.length} {items.length === 1 ? "item compartilhado" : "itens compartilhados"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {searchOpen ? (
            <div className="flex items-center bg-white rounded-xl border border-slate-300 px-3 py-1.5">
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar no chat..."
                className="text-xs sm:text-sm w-32 sm:w-48 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSearchOpen(false);
                }}
                aria-label="Fechar busca"
                className="text-slate-400 hover:text-slate-700 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar mensagens"
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-200/70 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {isAdmin && (
            <Link
              href="/painel/admin"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#0e526c] px-3 py-2 text-xs font-bold text-white hover:bg-[#0b4156]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Administrar</span>
            </Link>
          )}
        </div>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-10 py-5 space-y-3">
        {errorMsg && (
          <div role="alert" className="max-w-xl mx-auto rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs sm:text-sm text-red-900 shadow-xs">
            {errorMsg}
          </div>
        )}

        {visibleItems.length === 0 ? (
          <div className="max-w-md mx-auto mt-12 rounded-2xl bg-white/95 border border-slate-200/80 p-6 text-center shadow-xs space-y-2">
            <p className="text-sm font-bold text-slate-800">
              {query ? "Nenhum resultado encontrado." : "Bem-vindo ao Chat Colaboradores"}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isAdmin
                ? "Envie textos, vídeos, documentos, imagens ou GIFs usando a barra abaixo."
                : "Os materiais publicados pelos administradores aparecerão aqui."}
            </p>
          </div>
        ) : (
          visibleItems.map((item) => {
            const timeStr = new Date(item.createdAt).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const dateStr = new Date(item.createdAt).toLocaleDateString("pt-BR");
            const sizeLabel =
              item.sizeBytes >= 1024 * 1024
                ? `${(item.sizeBytes / (1024 * 1024)).toFixed(1)} MB`
                : `${Math.max(1, Math.round(item.sizeBytes / 1024))} KB`;

            return (
              <div key={item.id} className="flex justify-start">
                <article className="max-w-[92%] sm:max-w-[78%] lg:max-w-[65%] bg-white rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs border border-black/5 space-y-2 relative group">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-extrabold text-[#0e526c]">
                      {item.authorName}
                    </span>
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        aria-label="Excluir mensagem"
                        className="text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Conteúdo conforme mídia */}
                  {item.category === "text" && (
                    <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed break-words">
                      {item.textBody}
                    </p>
                  )}

                  {item.category === "image" && item.mediaUrl && (
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setLightbox({ item, url: item.mediaUrl! })}
                        className="block rounded-xl overflow-hidden bg-slate-100"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          className="max-h-80 w-auto rounded-xl object-contain"
                        />
                      </button>
                      <p className="text-xs text-slate-600 break-words">{item.title}</p>
                      {item.textBody && (
                        <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed break-words pt-1">
                          {item.textBody}
                        </p>
                      )}
                    </div>
                  )}

                  {item.category === "video" && item.mediaUrl && (
                    <div className="space-y-1.5">
                      <video
                        controls
                        preload="metadata"
                        src={item.mediaUrl}
                        className="w-full max-h-80 rounded-xl bg-black"
                      />
                      <p className="text-xs text-slate-600 break-words">{item.title}</p>
                      {item.textBody && (
                        <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed break-words pt-1">
                          {item.textBody}
                        </p>
                      )}
                    </div>
                  )}

                  {(item.category === "document" || item.category === "chat") && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0e526c]/10 text-[#0e526c] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500">{sizeLabel}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.mimeType === "application/pdf" && item.mediaUrl && (
                            <button
                              type="button"
                              onClick={() => setLightbox({ item, url: item.mediaUrl! })}
                              title="Visualizar"
                              className="rounded-lg bg-[#0e526c] p-2 text-white hover:bg-[#0b4156]"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDownload(item)}
                            title="Baixar"
                            className="rounded-lg border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-100"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {item.textBody && (
                        <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed break-words">
                          {item.textBody}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 text-[10px] text-slate-400">
                    <span>{dateStr}</span>
                    <span>·</span>
                    <span>{timeStr}</span>
                  </div>
                </article>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Overlay de Drag & Drop (só Admin) */}
      {isAdmin && isDragging && (
        <div className="absolute inset-0 z-40 bg-[#0e526c]/80 flex items-center justify-center p-6 pointer-events-none">
          <div className="rounded-2xl border-2 border-dashed border-white px-10 py-8 text-center text-white">
            <p className="text-lg font-extrabold">Solte os arquivos para enviar no Chat</p>
            <p className="text-xs text-sky-100 mt-1">
              Vídeos, PDFs, documentos, imagens, GIFs ou chats exportados
            </p>
          </div>
        </div>
      )}

      {/* Barra de envio estilo WhatsApp/Telegram (somente Admin) */}
      {isAdmin && (
        <form
          onSubmit={handleSendText}
          className="bg-[#f0f2f5] border-t border-slate-200 px-3 sm:px-5 py-3 flex items-end gap-2.5 shrink-0"
        >
          <label
            title="Anexar arquivo (vídeo, imagem, GIF, PDF, documento ou chat)"
            className={`rounded-full p-2.5 text-slate-600 hover:bg-slate-200/80 cursor-pointer shrink-0 transition-colors ${
              isSending ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Paperclip className="w-5 h-5" />
            <input
              type="file"
              multiple
              disabled={isSending}
              onChange={(e) => {
                const list = Array.from(e.target.files ?? []);
                e.target.value = "";
                handleUploadFiles(list);
              }}
              className="sr-only"
            />
          </label>

          <div className="flex-1 min-w-0">
            {uploadStatus && (
              <p className="text-[11px] font-semibold text-[#0e526c] mb-1 px-1">
                {uploadStatus}
              </p>
            )}
            <textarea
              rows={1}
              disabled={isSending}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSendText(e);
                }
              }}
              placeholder="Escreva uma mensagem ou anexe um arquivo no clipe..."
              className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
            />
          </div>

          <button
            type="submit"
            disabled={isSending || !messageText.trim()}
            aria-label="Enviar mensagem"
            className="rounded-full bg-[#0e526c] p-2.5 text-white hover:bg-[#0b4156] disabled:opacity-40 shrink-0 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Modal de ampliação de imagem / PDF */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-4 sm:p-5 space-y-3 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-900 truncate">{lightbox.item.title}</p>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Fechar"
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {lightbox.item.category === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lightbox.url}
                alt={lightbox.item.title}
                className="max-h-[78vh] mx-auto object-contain rounded-xl"
              />
            ) : (
              <iframe
                src={lightbox.url}
                title={lightbox.item.title}
                className="w-full h-[75vh] rounded-xl border border-slate-200"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
