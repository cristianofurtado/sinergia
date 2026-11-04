"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileText,
  TrendingUp,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [faturaValue, setFaturaValue] = useState<number>(690);

  // Exact 31.16% ratio from the official photo (690 - 215 = 475)
  const discountRate = 0.3116;
  const descontoMes = Math.round(faturaValue * discountRate);
  const comSinergia = faturaValue - descontoMes;
  const economiaAno = descontoMes * 12;

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-blue-100/70 via-sky-50/50 to-blue-50/40 py-12 sm:py-20 border-b border-blue-200/60"
    >
      {/* Background Soft Blue Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-radial from-blue-200/40 via-sky-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Clear, uncluttered headlines */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6" id="energia">
            {/* Top Pillars */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              <div className="rounded-xl border border-blue-200/80 bg-white/95 p-3 sm:p-3.5 shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 block">
                  Mercado Livre
                </span>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-snug mt-0.5">
                  100% do Brasil para médias e grandes empresas.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/80 bg-white/95 p-3 sm:p-3.5 shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 block">
                  Geração Distribuída
                </span>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-snug mt-0.5">
                  Até 26% de desconto em residências e comércios.
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-blue-200 text-blue-900 text-[11px] sm:text-xs font-bold shadow-xs">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                +1.600 usinas solares conectadas
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Economia de energia também pode ser uma{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-amber-600">
                  oportunidade de negócio.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                A <strong className="text-slate-900 font-bold">Sinergia</strong> conecta residências, empresas e corretores às maiores usinas de energia limpa do país. Reduza até 30% na conta de luz sem obras, sem placas solares e com adesão 100% gratuita.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a href="#simulador" className="w-full sm:w-auto">
                <Button variant="solar" size="lg" className="w-full sm:w-auto shadow-sm font-bold text-slate-950 py-3.5">
                  Quero conhecer a energia
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>

              <a href="#contato" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-blue-200 bg-white text-blue-950 hover:bg-blue-50/80 shadow-xs py-3.5"
                >
                  Falar com consultor agora
                </Button>
              </a>
            </div>

            {/* Quick Proof Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero obras</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Adesão gratuita</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Lei 14.300/22</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Phone Mockup (Optimized for Mobile) */}
          <div className="lg:col-span-5 flex justify-center pt-2 lg:pt-0">
            <div className="relative w-full max-w-[290px] sm:max-w-[330px]">
              {/* Outer Phone Hardware Case */}
              <div className="rounded-[2.4rem] sm:rounded-[2.7rem] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-2 sm:p-2.5 shadow-xl border border-slate-600/70">
                {/* Inner Screen */}
                <div className="rounded-[2rem] sm:rounded-[2.2rem] bg-slate-50 text-slate-900 p-4 sm:p-5 overflow-hidden shadow-inner font-sans">
                  {/* Dynamic Island / Speaker */}
                  <div className="w-20 h-3.5 bg-slate-900 rounded-full mx-auto mb-3" />

                  {/* App Header: Official Logo Image from photo */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/60">
                    <Image
                      src="/sinergia-hero-logo-clean.png"
                      alt="Sinergia"
                      width={125}
                      height={32}
                      className="h-6 sm:h-7 w-auto object-contain"
                      priority
                    />
                    <FileText className="w-4 h-4 text-slate-500" />
                  </div>

                  {/* Screen Title */}
                  <div className="space-y-0.5 pt-1.5 pb-2.5">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                      Sua economia na fatura
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Confira o resultado simulado deste mês
                    </p>
                  </div>

                  {/* Top Navy Box */}
                  <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0C1B33] to-[#081528] p-3 sm:p-3.5 text-white shadow-sm space-y-2">
                    <div>
                      <span className="text-[10px] text-slate-300 block">
                        Fatura de energia
                      </span>
                      <span className="text-base sm:text-lg font-bold text-white">
                        R$ {faturaValue.toLocaleString("pt-BR")},00
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-slate-700/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-300">
                        Com Sinergia
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-orange-500">
                        R$ {comSinergia.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 1: Desconto no mês */}
                  <div className="mt-2.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-2.5 sm:p-3 shadow-xs flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 block">
                        Desconto no mês
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-orange-500">
                        R$ {descontoMes.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Economia no ano */}
                  <div className="mt-2 rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-2.5 sm:p-3 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-4 h-4 text-blue-900" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block">
                          Economia no ano
                        </span>
                        <span className="text-sm sm:text-base font-extrabold text-slate-900">
                          R$ {economiaAno.toLocaleString("pt-BR")},00
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      Anual
                    </span>
                  </div>

                  {/* Subtext */}
                  <p className="text-[10px] text-slate-500 text-center font-medium my-2">
                    Economize na sua fatura com energia por assinatura.
                  </p>

                  {/* Orange Button */}
                  <a
                    href="#simulador"
                    className="block text-center rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-black text-[11px] sm:text-xs uppercase tracking-wider py-2.5 sm:py-3 shadow-sm hover:brightness-105 active:scale-98 transition-all"
                  >
                    VER DETALHES & SIMULAR
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
