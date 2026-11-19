"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Distributor {
  id: string;
  name: string;
  rate: string;
  uf: string;
  region: "sudeste" | "nordeste" | "sul" | "centro-norte";
  featured?: boolean;
}

const ALL_DISTRIBUTORS: Distributor[] = [
  // Sudeste (9)
  { name: "CEMIG MG", rate: "26%", uf: "MG", region: "sudeste", id: "cemig-mg", featured: true },
  { name: "CPFL PAULISTA", rate: "15%", uf: "SP", region: "sudeste", id: "cpfl-paulista", featured: true },
  { name: "CPFL SANTA CRUZ", rate: "15%", uf: "SP", region: "sudeste", id: "cpfl-santa-cruz" },
  { name: "ELEKTRO", rate: "15%", uf: "SP", region: "sudeste", id: "elektro" },
  { name: "CPFL PIRATININGA", rate: "15%", uf: "SP", region: "sudeste", id: "cpfl-piratininga" },
  { name: "EDP ES", rate: "15%", uf: "ES", region: "sudeste", id: "edp-es" },
  { name: "ENEL RJ", rate: "15%", uf: "RJ", region: "sudeste", id: "enel-rj", featured: true },
  { name: "LIGHT RJ", rate: "12%", uf: "RJ", region: "sudeste", id: "light-rj" },
  { name: "ENERGISA SUL SUDESTE", rate: "15%", uf: "SP/PR", region: "sudeste", id: "energisa-sul-sudeste" },

  // Nordeste (7)
  { name: "ENEL CEARÁ", rate: "20%", uf: "CE", region: "nordeste", id: "enel-ce", featured: true },
  { name: "NEOENERGIA COSERN", rate: "18%", uf: "RN", region: "nordeste", id: "neoenergia-cosern" },
  { name: "NEOENERGIA COELBA", rate: "18%", uf: "BA", region: "nordeste", id: "neoenergia-coelba", featured: true },
  { name: "NEOENERGIA CELPE", rate: "16%", uf: "PE", region: "nordeste", id: "neoenergia-celpe" },
  { name: "EQUATORIAL AL", rate: "18%", uf: "AL", region: "nordeste", id: "equatorial-al" },
  { name: "EQUATORIAL MA", rate: "18%", uf: "MA", region: "nordeste", id: "equatorial-ma" },
  { name: "EQUATORIAL PI", rate: "18%", uf: "PI", region: "nordeste", id: "equatorial-pi" },

  // Centro-Oeste & Norte (4)
  { name: "EQUATORIAL GO", rate: "25%", uf: "GO", region: "centro-norte", id: "equatorial-go", featured: true },
  { name: "ENERGISA MT", rate: "25%", uf: "MT", region: "centro-norte", id: "energisa-mt", featured: true },
  { name: "ENERGISA MS", rate: "23%", uf: "MS", region: "centro-norte", id: "energisa-ms", featured: true },
  { name: "EQUATORIAL PA", rate: "18%", uf: "PA", region: "centro-norte", id: "equatorial-pa" },

  // Sul (4)
  { name: "COPEL PR", rate: "15%", uf: "PR", region: "sul", id: "copel-pr", featured: true },
  { name: "CELESC SC", rate: "12%", uf: "SC", region: "sul", id: "celesc-sc" },
  { name: "RGE RS", rate: "15%", uf: "RS", region: "sul", id: "rge-rs" },
  { name: "EQUATORIAL CEEE/RS", rate: "15%", uf: "RS", region: "sul", id: "equatorial-ceee" },
];

const FEATURED_DISTRIBUTORS = ALL_DISTRIBUTORS.filter((d) => d.featured);

const REGIONS = [
  { id: "todas", label: "Principais", count: 24 },
  { id: "sudeste", label: "Sudeste", count: 9 },
  { id: "nordeste", label: "Nordeste", count: 7 },
  { id: "sul", label: "Sul", count: 4 },
  { id: "centro-norte", label: "CO & Norte", count: 4 },
] as const;

export function Simulator() {
  const [selectedRegion, setSelectedRegion] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);

  const isSearching = searchQuery.trim().length > 0;
  const isDefaultCompact = selectedRegion === "todas" && !isSearching && !showAll;

  const visibleDistributors = useMemo(() => {
    if (isDefaultCompact) {
      return FEATURED_DISTRIBUTORS;
    }
    const q = searchQuery.trim().toLowerCase();
    return ALL_DISTRIBUTORS.filter((item) => {
      const matchesRegion =
        selectedRegion === "todas" || item.region === selectedRegion;
      const matchesSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.uf.toLowerCase().includes(q) ||
        item.rate.toLowerCase().includes(q);
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery, isDefaultCompact]);

  return (
    <section
      id="tabela-descontos"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#284b63] via-[#1a4157] to-[#0e526c] border-b border-[#0e526c] relative overflow-hidden text-white"
    >
      {/* Anchors for backward compatibility */}
      <div id="simulador" />
      <div id="cobertura" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-white text-slate-900 p-5 sm:p-8 lg:p-10 shadow-2xl space-y-6">
          {/* Clean Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-5 border-b border-slate-100">
            <Image
              src="/logo-vertical.webp"
              alt="Grupo Energia Prospectar"
              width={64}
              height={64}
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain shrink-0 mx-auto sm:mx-0"
            />
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0e526c] tracking-tight leading-tight">
                Tabela de descontos{" "}
                <span className="text-amber-500">para novos clientes</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Toque na sua distribuidora para simular e garantir o desconto pelo WhatsApp.
              </p>
            </div>
          </div>

          {/* Filter Tabs + Instant Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Filtrar distribuidoras por região"
              className="flex flex-wrap items-center gap-1.5"
            >
              {REGIONS.map((r) => {
                const active = selectedRegion === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setSelectedRegion(r.id);
                      if (r.id !== "todas") setShowAll(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? "bg-[#0e526c] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-[#0e526c]"
                    }`}
                  >
                    {r.label}
                    <span className="ml-1 text-[10px] opacity-70 font-mono">
                      {r.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64 shrink-0">
              <Search
                aria-hidden="true"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                aria-label="Buscar estado ou distribuidora"
                placeholder="Buscar estado ou distribuidora..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e526c] focus:bg-white placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                  aria-label="Limpar busca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Clean Hairline Grid Table */}
          {visibleDistributors.length > 0 ? (
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -mt-px -ml-px">
                {visibleDistributors.map((item) => (
                  <a
                    key={item.id}
                    href={`https://wa.me/5571987822230?text=${encodeURIComponent(
                      `Olá! Gostaria de solicitar minha adesão gratuita com desconto na distribuidora ${item.name} (${item.rate} de desconto).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 px-4 py-3 bg-white border-t border-l border-slate-200/70 hover:bg-[#f2f7fa] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0e526c]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[11px] font-bold font-mono text-[#0e526c] bg-[#eaf2f5] px-2 py-0.5 rounded-md shrink-0">
                        {item.uf}
                      </span>
                      <span className="font-semibold text-xs sm:text-sm text-slate-800 truncate group-hover:text-[#0e526c]">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-black text-xs sm:text-sm text-slate-950 font-mono tabular-nums bg-amber-300/90 group-hover:bg-amber-400 px-2.5 py-0.5 rounded-lg transition-colors">
                        {item.rate}
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0e526c] group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="text-sm text-slate-600 font-medium">
                Nenhuma distribuidora encontrada para &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedRegion("todas");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-[#0e526c] underline hover:text-amber-600 cursor-pointer"
              >
                Limpar filtros e ver todas
              </button>
            </div>
          )}

          {/* Expand / Collapse all 24 distributors */}
          {selectedRegion === "todas" && !isSearching && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-[#eaf2f5] hover:border-[#0e526c]/30 text-xs font-bold text-[#0e526c] transition-colors cursor-pointer"
              >
                {showAll ? (
                  <>
                    Mostrar apenas as 9 principais
                    <ChevronUp className="w-4 h-4" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Ver todas as 24 distribuidoras
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Clean Footer Strip + Primary CTA */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left leading-relaxed max-w-md">
              <strong className="text-[#0e526c]">Adesão 100% gratuita</strong> · Sem obras · Corretora conectada às maiores usinas em 24 distribuidoras.
            </p>
            <a
              href="https://wa.me/5571987822230?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20minha%20ades%C3%A3o%20gratuita%20com%20desconto%20na%20conta%20de%20energia."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto shrink-0"
            >
              <Button
                variant="solar"
                size="lg"
                className="w-full sm:w-auto font-bold text-slate-950 text-xs sm:text-sm py-3 px-6 shadow-md"
              >
                Quero meu desconto agora
                <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
