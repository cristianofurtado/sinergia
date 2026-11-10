"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ArrowRight,
  FileText,
  Wrench,
  Users,
  Percent,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Distributor {
  id: string;
  name: string;
  rate: string;
  uf: string;
  region: "sudeste" | "nordeste" | "sul" | "centro-norte";
}

export function Simulator() {
  const [selectedRegion, setSelectedRegion] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allDistributors: Distributor[] = [
    // Sudeste (9)
    { name: "CEMIG MG", rate: "26%", uf: "MG", region: "sudeste", id: "cemig-mg" },
    { name: "CPFL PAULISTA", rate: "15%", uf: "SP", region: "sudeste", id: "cpfl-paulista" },
    { name: "CPFL SANTA CRUZ", rate: "15%", uf: "SP", region: "sudeste", id: "cpfl-santa-cruz" },
    { name: "ELEKTRO", rate: "15%", uf: "SP", region: "sudeste", id: "elektro" },
    { name: "CPFL PIRATININGA", rate: "15%", uf: "SP", region: "sudeste", id: "cpfl-piratininga" },
    { name: "EDP ES", rate: "15%", uf: "ES", region: "sudeste", id: "edp-es" },
    { name: "ENEL RJ", rate: "15%", uf: "RJ", region: "sudeste", id: "enel-rj" },
    { name: "LIGHT RJ", rate: "12%", uf: "RJ", region: "sudeste", id: "light-rj" },
    { name: "ENERGISA SUL SUDESTE", rate: "15%", uf: "SP/PR", region: "sudeste", id: "energisa-sul-sudeste" },

    // Nordeste (7)
    { name: "ENEL CEARÁ", rate: "20%", uf: "CE", region: "nordeste", id: "enel-ce" },
    { name: "NEOENERGIA COSERN", rate: "18%", uf: "RN", region: "nordeste", id: "neoenergia-cosern" },
    { name: "NEOENERGIA COELBA", rate: "18%", uf: "BA", region: "nordeste", id: "neoenergia-coelba" },
    { name: "NEOENERGIA CELPE", rate: "16%", uf: "PE", region: "nordeste", id: "neoenergia-celpe" },
    { name: "EQUATORIAL AL", rate: "18%", uf: "AL", region: "nordeste", id: "equatorial-al" },
    { name: "EQUATORIAL MA", rate: "18%", uf: "MA", region: "nordeste", id: "equatorial-ma" },
    { name: "EQUATORIAL PI", rate: "18%", uf: "PI", region: "nordeste", id: "equatorial-pi" },

    // Centro-Oeste & Norte (4)
    { name: "EQUATORIAL GO", rate: "25%", uf: "GO", region: "centro-norte", id: "equatorial-go" },
    { name: "ENERGISA MT", rate: "25%", uf: "MT", region: "centro-norte", id: "energisa-mt" },
    { name: "ENERGISA MS", rate: "23%", uf: "MS", region: "centro-norte", id: "energisa-ms" },
    { name: "EQUATORIAL PA", rate: "18%", uf: "PA", region: "centro-norte", id: "equatorial-pa" },

    // Sul (4)
    { name: "COPEL PR", rate: "15%", uf: "PR", region: "sul", id: "copel-pr" },
    { name: "CELESC SC", rate: "12%", uf: "SC", region: "sul", id: "celesc-sc" },
    { name: "RGE RS", rate: "15%", uf: "RS", region: "sul", id: "rge-rs" },
    { name: "EQUATORIAL CEEE/RS", rate: "15%", uf: "RS", region: "sul", id: "equatorial-ceee" },
  ];

  const regions = [
    { id: "todas", label: "Todas", count: 24 },
    { id: "sudeste", label: "Sudeste", count: 9 },
    { id: "nordeste", label: "Nordeste", count: 7 },
    { id: "sul", label: "Sul", count: 4 },
    { id: "centro-norte", label: "CO & Norte", count: 4 },
  ];

  const filteredDistributors = useMemo(() => {
    return allDistributors.filter((item) => {
      const matchesRegion =
        selectedRegion === "todas" || item.region === selectedRegion;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.uf.toLowerCase().includes(q) ||
        item.rate.toLowerCase().includes(q);
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <section
      id="tabela-descontos"
      className="py-10 sm:py-16 bg-gradient-to-b from-[#284b63] via-[#1a4157] to-[#0e526c] border-b border-[#0e526c] relative overflow-hidden text-white"
    >
      {/* Anchor for backward compatibility with #simulador and #cobertura */}
      <div id="simulador" className="scroll-mt-24" />
      <div id="cobertura" className="scroll-mt-24" />

      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-radial from-[#0e526c]/40 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="rounded-3xl border border-white/20 bg-[#ffffff] text-slate-900 p-4 sm:p-7 lg:p-8 shadow-2xl space-y-4 sm:space-y-6">
          {/* Header of the Table */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Image
                src="/logo-oficial.png"
                alt="Energia Prospectar"
                width={140}
                height={36}
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-[#0e526c] tracking-tight uppercase">
              TABELA ATUALIZADA DE DESCONTOS PARA{" "}
              <span className="text-amber-500">NOVOS CLIENTES</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-snug">
              A energia que o sistema gera e não usa vira crédito, e esse crédito volta como desconto na sua conta de luz.
            </p>
          </div>

          {/* Quick Filters & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 w-full sm:w-auto">
              {regions.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRegion(r.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedRegion === r.id
                      ? "bg-[#0e526c] text-white shadow-xs"
                      : "bg-[#f0f5f8] text-slate-600 hover:bg-[#e0ecf2] hover:text-[#0e526c]"
                  }`}
                >
                  {r.label}
                  <span className="ml-1 text-[10px] opacity-75 font-mono">
                    ({r.count})
                  </span>
                </button>
              ))}
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full sm:w-60 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar estado ou distribuidora..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-slate-200 bg-[#f0f5f8] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e526c] focus:bg-white placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  aria-label="Limpar busca"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Compact 3-Column Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {filteredDistributors.map((item) => (
              <a
                key={item.id}
                href={`https://wa.me/5571987822230?text=${encodeURIComponent(
                  `Olá! Gostaria de solicitar minha adesão gratuita com desconto na distribuidora ${item.name} (${item.rate} de desconto).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#f0f5f8] hover:bg-white hover:border-[#0e526c]/40 border border-slate-200/90 text-slate-800 transition-all group shadow-2xs hover:shadow-xs active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 min-w-0 pr-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#0e526c]/10 text-[#0e526c] font-mono shrink-0">
                    {item.uf}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-slate-900 truncate group-hover:text-[#0e526c]">
                    {item.name}
                  </span>
                </div>
                <span className="font-black text-xs sm:text-sm text-slate-950 font-mono bg-amber-400 px-2 py-0.5 rounded-md shrink-0 shadow-2xs group-hover:bg-amber-300 transition-colors ml-2">
                  {item.rate}
                </span>
              </a>
            ))}
          </div>

          {/* Empty Search Fallback */}
          {filteredDistributors.length === 0 && (
            <div className="text-center py-6 bg-[#f0f5f8] rounded-2xl border border-slate-200 space-y-2">
              <p className="text-xs text-slate-500 font-medium">
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

          {/* Broker Disclaimer */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#eaf2f5] border border-[#284b63]/20 text-center max-w-2xl mx-auto">
            <p className="text-xs text-slate-800 font-medium leading-relaxed">
              A <strong>ENERGIA PROSPECTAR</strong> é uma corretora que conecta clientes e geradoras,
              conseguindo sempre o melhor desconto para você.
            </p>
          </div>

          {/* CTA Button to WhatsApp */}
          <div className="text-center pt-1">
            <a
              href="https://wa.me/5571987822230?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20minha%20ades%C3%A3o%20gratuita%20com%20desconto%20na%20conta%20de%20energia."
              target="_blank"
              rel="noopener noreferrer"
              className="block sm:inline-block w-full sm:w-auto"
            >
              <Button
                variant="solar"
                size="lg"
                className="w-full sm:w-auto font-black text-slate-950 text-xs sm:text-sm py-3 px-7 shadow-md"
              >
                QUERO MEU DESCONTO AGORA
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1.5 font-medium">
              ✓ Sem custos de adesão • Sem obras • Atendimento imediato por WhatsApp
            </p>
          </div>

          {/* 4 Pillars Grid (Compact 2x2 on Mobile, 4-in-a-row on Desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 pt-1 border-t border-slate-100">
            <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 flex items-center gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0">
                <Percent className="w-4 h-4 text-amber-600 font-black" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block leading-tight">
                  Descontos de
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                  ATÉ 26%
                </span>
                <span className="text-[9px] text-slate-400 block leading-tight truncate">
                  na conta de energia
                </span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 flex items-center gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-amber-600" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block leading-tight">
                  Adesão 100%
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-600 block leading-tight">
                  GRATUITA
                </span>
                <span className="text-[9px] text-slate-400 block leading-tight truncate">
                  para todos clientes
                </span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 flex items-center gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4 text-amber-600" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block leading-tight">
                  SEM OBRAS
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                  ZERO INSTALAÇÃO
                </span>
                <span className="text-[9px] text-slate-400 block leading-tight truncate">
                  processo 100% digital
                </span>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 flex items-center gap-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-amber-600" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block leading-tight">
                  Atendimento em
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                  24 ESTADOS
                </span>
                <span className="text-[9px] text-slate-400 block leading-tight truncate">
                  com usinas parceiras
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
