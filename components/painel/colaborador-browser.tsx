"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Film,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  AlignLeft,
  Eye,
  Download,
  Search,
  ArrowUpDown,
  X,
} from "lucide-react";

export interface PainelFileItem {
  id: string;
  category: "video" | "chat" | "document" | "image" | "text";
  title: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  textBody: string | null;
  createdAt: string;
}

const CATEGORIES = [
  { key: "all", label: "Todos" },
  { key: "video", label: "Vídeos" },
  { key: "chat", label: "Chats" },
  { key: "document", label: "Documentos" },
  { key: "image", label: "Imagens e GIFs" },
  { key: "text", label: "Textos" },
] as const;

const CATEGORY_BADGES: Record<
  PainelFileItem["category"],
  { label: string; badgeClass: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  video: { label: "Vídeo", badgeClass: "bg-purple-50 text-purple-700 border-purple-200", Icon: Film },
  chat: { label: "Chat", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: MessageSquare },
  document: { label: "Documento", badgeClass: "bg-sky-50 text-sky-700 border-sky-200", Icon: FileText },
  image: { label: "Imagem / GIF", badgeClass: "bg-amber-50 text-amber-800 border-amber-200", Icon: ImageIcon },
  text: { label: "Texto", badgeClass: "bg-slate-100 text-slate-700 border-slate-200", Icon: AlignLeft },
};

export function ColaboradorBrowser({
  items,
  category,
}: {
  items: PainelFileItem[];
  category: string;
}) {
  const [query, setQuery] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [previewItem, setPreviewItem] = useState<{
    url: string;
    item: PainelFileItem;
    chatContent?: string;
  } | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: items.length, video: 0, chat: 0, document: 0, image: 0, text: 0 };
    for (const item of items) {
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => (category === "all" || i.category === category) && (!q || i.title.toLowerCase().includes(q)))
      .sort((a, b) =>
        sortDesc ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt)
      );
  }, [items, category, query, sortDesc]);

  async function openItem(item: PainelFileItem, downloadOnly = false) {
    setErrorMsg(null);
    if (item.category === "text") {
      setPreviewItem({ url: "", item });
      return;
    }
    setLoadingId(item.id);
    try {
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

      if (downloadOnly) {
        window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
        return;
      }

      if (
        item.category === "chat" &&
        (item.mimeType.startsWith("text/") || item.mimeType === "application/json")
      ) {
        const textRes = await fetch(data.downloadUrl).catch(() => null);
        const chatContent = textRes?.ok ? await textRes.text() : undefined;
        setPreviewItem({ url: data.downloadUrl, item, chatContent });
        return;
      }

      setPreviewItem({ url: data.downloadUrl, item });
    } catch {
      setErrorMsg("Erro de conexão ao buscar o arquivo.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-5">
      {/* Abas consolidadas */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = category === c.key;
          return (
            <Link
              key={c.key}
              href={`/painel?categoria=${c.key}`}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                active
                  ? "bg-[#0e526c] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{c.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {counts[c.key] ?? 0}
              </span>
            </Link>
          );
        })}
      </div>

      {errorMsg && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          {errorMsg}
        </div>
      )}

      {/* Barra de busca e ordenação */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar material por título..."
            className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
          />
        </div>
        <button
          type="button"
          onClick={() => setSortDesc((v) => !v)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shrink-0"
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>{sortDesc ? "Mais recentes" : "Mais antigos"}</span>
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-700">Nenhum material nesta seção ainda.</p>
          <p className="text-xs text-slate-500">
            Quando o administrador publicar vídeos, chats, documentos, imagens ou textos, eles aparecerão aqui.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const meta = CATEGORY_BADGES[item.category];
            const Icon = meta.Icon;
            return (
              <li
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between gap-4 shadow-xs hover:border-[#0e526c]/30 transition-colors"
              >
                <div className="space-y-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${meta.badgeClass}`}
                  >
                    <Icon className="w-3 h-3" />
                    {meta.label}
                  </span>
                  <h2 className="font-bold text-slate-900 break-words leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")} ·{" "}
                    {item.sizeBytes >= 1024 * 1024
                      ? `${(item.sizeBytes / (1024 * 1024)).toFixed(1)} MB`
                      : `${Math.max(1, Math.round(item.sizeBytes / 1024))} KB`}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={loadingId === item.id}
                    onClick={() => openItem(item, false)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0e526c] px-3 py-2 text-xs font-semibold text-white hover:bg-[#0b4156] disabled:opacity-50"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{loadingId === item.id ? "Abrindo..." : "Visualizar"}</span>
                  </button>
                  {item.category !== "text" && (
                    <button
                      type="button"
                      disabled={loadingId === item.id}
                      onClick={() => openItem(item, true)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar</span>
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Modal de visualização */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 break-words">{previewItem.item.title}</h3>
                <p className="text-xs text-slate-500">{previewItem.item.originalName}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                aria-label="Fechar visualização"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {previewItem.item.category === "text" && (
              <pre className="whitespace-pre-wrap text-sm text-slate-800 font-sans bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
                {previewItem.item.textBody}
              </pre>
            )}

            {previewItem.item.category === "video" && (
              <video controls src={previewItem.url} className="w-full rounded-xl max-h-[68vh] bg-black" />
            )}

            {previewItem.item.category === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewItem.url}
                alt={previewItem.item.title}
                className="max-h-[70vh] mx-auto rounded-xl object-contain"
              />
            )}

            {previewItem.item.category === "document" && (
              previewItem.item.mimeType === "application/pdf" ? (
                <iframe
                  src={previewItem.url}
                  title={previewItem.item.title}
                  className="w-full h-[68vh] rounded-xl border border-slate-200"
                />
              ) : (
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 text-center space-y-3">
                  <p className="text-sm text-slate-700">
                    Arquivo pronto para download ({previewItem.item.mimeType}).
                  </p>
                  <a
                    href={previewItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0e526c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b4156]"
                  >
                    <Download className="w-4 h-4" />
                    Baixar Documento
                  </a>
                </div>
              )
            )}

            {previewItem.item.category === "chat" && (
              <div className="space-y-3">
                {previewItem.chatContent ? (
                  <pre className="whitespace-pre-wrap text-xs sm:text-sm text-slate-800 font-mono bg-slate-50 border border-slate-200 p-4 rounded-xl max-h-[62vh] overflow-y-auto leading-relaxed">
                    {previewItem.chatContent}
                  </pre>
                ) : (
                  <p className="text-sm text-slate-600">
                    Use o botão abaixo para abrir ou baixar o arquivo de conversa exportada.
                  </p>
                )}
                <a
                  href={previewItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0e526c] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0b4156]"
                >
                  <Download className="w-4 h-4" />
                  Abrir / Baixar arquivo de chat
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
