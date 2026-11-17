"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

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
  { key: "video", label: "Vídeos" },
  { key: "chat", label: "Chats" },
  { key: "document", label: "Documentos" },
  { key: "image", label: "Imagens e GIFs" },
  { key: "text", label: "Textos" },
] as const;

export function ColaboradorBrowser({
  items,
  category,
}: {
  items: PainelFileItem[];
  category: string;
}) {
  const [query, setQuery] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<{
    url: string;
    item: PainelFileItem;
    chatContent?: string;
  } | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => i.category === category && (!q || i.title.toLowerCase().includes(q)))
      .sort((a, b) =>
        sortDesc ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt)
      );
  }, [items, category, query, sortDesc]);

  async function openItem(item: PainelFileItem, downloadOnly = false) {
    setErrorMsg(null);
    if (item.category === "text") {
      setPreviewUrl({ url: "", item });
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
        setPreviewUrl({ url: data.downloadUrl, item, chatContent });
        return;
      }

      setPreviewUrl({ url: data.downloadUrl, item });
    } catch {
      setErrorMsg("Erro de conexão ao buscar o arquivo.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = category === c.key;
          return (
            <Link
              key={c.key}
              href={`/painel?categoria=${c.key}`}
              className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
                active
                  ? "bg-[#0e526c] text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      {errorMsg && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título..."
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e526c]"
        />
        <button
          type="button"
          onClick={() => setSortDesc((v) => !v)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Data: {sortDesc ? "Mais recentes" : "Mais antigos"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          Nenhum item encontrado nesta seção.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between gap-3 shadow-xs"
            >
              <div>
                <h2 className="font-bold text-slate-900">{item.title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(item.createdAt).toLocaleDateString("pt-BR")} ·{" "}
                  {(item.sizeBytes / 1024).toFixed(1)} KB
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={loadingId === item.id}
                  onClick={() => openItem(item, false)}
                  className="rounded-lg bg-[#0e526c] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0b4156]"
                >
                  {loadingId === item.id ? "Carregando..." : "Visualizar"}
                </button>
                {item.category !== "text" && (
                  <button
                    type="button"
                    disabled={loadingId === item.id}
                    onClick={() => openItem(item, true)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Baixar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {previewUrl && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">{previewUrl.item.title}</h3>
              <button
                type="button"
                onClick={() => setPreviewUrl(null)}
                className="text-sm font-bold text-slate-600 hover:text-slate-900"
              >
                Fechar
              </button>
            </div>
            {previewUrl.item.category === "text" && (
              <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans bg-slate-50 p-4 rounded-xl">
                {previewUrl.item.textBody}
              </pre>
            )}
            {previewUrl.item.category === "video" && (
              <video controls src={previewUrl.url} className="w-full rounded-xl max-h-[65vh]" />
            )}
            {previewUrl.item.category === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl.url} alt={previewUrl.item.title} className="max-h-[70vh] mx-auto rounded-xl" />
            )}
            {previewUrl.item.category === "document" && previewUrl.item.mimeType === "application/pdf" && (
              <iframe src={previewUrl.url} title={previewUrl.item.title} className="w-full h-[65vh] rounded-xl border" />
            )}
            {previewUrl.item.category === "chat" && (
              <div className="space-y-3">
                {previewUrl.chatContent ? (
                  <pre className="whitespace-pre-wrap text-xs text-slate-700 font-mono bg-slate-50 p-4 rounded-xl max-h-[60vh] overflow-y-auto">
                    {previewUrl.chatContent}
                  </pre>
                ) : null}
                <a href={previewUrl.url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold text-[#0e526c] underline">
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
