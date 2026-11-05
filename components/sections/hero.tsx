"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileText,
  TrendingUp,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [faturaValue] = useState<number>(690);

  // Exact figures matching campaign phone photo (690 -> 475, desconto 215, ano 2.580)
  const descontoMes = 215;
  const comSinergia = 475;
  const economiaAno = 2580;

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-[#0e526c] via-[#1a4157] to-[#284b63] text-white py-12 sm:py-18 lg:py-24 border-b border-[#0e526c]"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-radial from-[#284b63]/60 via-[#0e526c]/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clear, uncluttered headlines */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6" id="energia">
            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Economia de energia também pode ser uma{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                  oportunidade de negócio.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed font-normal max-w-2xl">
                A <strong className="text-white font-bold">Sinergia</strong> conecta residências, empresas e corretores às maiores usinas de energia limpa do país. Reduza até 26% na sua conta de luz sem obras, sem placas solares e com suporte completo.
              </p>
            </div>

            {/* Clean Segment Badges (B2C & B2B) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 max-w-lg">
              <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-3 shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-200 block">
                  Mercado Livre (B2B)
                </span>
                <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-snug mt-0.5">
                  100% do Brasil para indústrias e empresas.
                </p>
              </div>

              <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 backdrop-blur-md p-3 shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                  Geração Distribuída
                </span>
                <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-snug mt-0.5">
                  Até 26% em residências e comércios.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a href="#tabela-descontos" className="w-full sm:w-auto">
                <Button variant="solar" size="lg" className="w-full sm:w-auto shadow-md font-bold text-slate-950 py-3.5 px-7">
                  Ver Tabela de Descontos
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>

              <a href="#contato" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 shadow-xs py-3.5 px-6 backdrop-blur-xs"
                >
                  Falar com um Consultor
                </Button>
              </a>
            </div>

            {/* Quick Proof Badges */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 text-xs font-semibold text-sky-100/90 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero obras</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Adesão gratuita</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Lei nº 14.300/22</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Phone Mockup (Optimized for Mobile & Desktop) */}
          <div className="lg:col-span-5 flex justify-center pt-2 lg:pt-0">
            <div className="relative w-full max-w-[270px] sm:max-w-[320px]">
              {/* Outer Phone Hardware Case */}
              <div className="rounded-[2.4rem] sm:rounded-[2.7rem] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-2 sm:p-2.5 shadow-2xl border border-white/20">
                {/* Inner Screen */}
                <div className="rounded-[2rem] sm:rounded-[2.2rem] bg-white text-slate-900 p-3.5 sm:p-5 overflow-hidden shadow-inner font-sans">
                  {/* Dynamic Island / Speaker */}
                  <div className="w-16 sm:w-20 h-3 sm:h-3.5 bg-slate-900 rounded-full mx-auto mb-2.5 sm:mb-3" />

                  {/* App Header: Official Logo Image from photo */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                    <Image
                      src="/sinergia-hero-logo-clean.png"
                      alt="Sinergia"
                      width={120}
                      height={30}
                      className="h-5 sm:h-6.5 w-auto object-contain"
                      priority
                    />
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                  </div>

                  {/* Screen Title */}
                  <div className="space-y-0.5 pt-1.5 pb-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                      Sua economia na fatura
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      Confira o resultado deste mês
                    </p>
                  </div>

                  {/* Top Navy Box */}
                  <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0e526c] to-[#082d3b] p-2.5 sm:p-3 text-white shadow-xs space-y-1.5">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-slate-300 block">
                        Fatura de energia
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white font-mono">
                        R$ {faturaValue.toLocaleString("pt-BR")},00
                      </span>
                    </div>

                    <div className="pt-1 border-t border-slate-700/60 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] text-slate-300">
                        Com Sinergia
                      </span>
                      <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">
                        R$ {comSinergia.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 1: Desconto no mês */}
                  <div className="mt-2 rounded-xl bg-amber-50/70 border border-amber-200 p-2 sm:p-2.5 shadow-2xs flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-slate-600 block leading-tight">
                        Desconto no mês
                      </span>
                      <span className="text-xs sm:text-sm font-black text-amber-600 font-mono block leading-tight">
                        R$ {descontoMes.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Economia no ano */}
                  <div className="mt-1.5 rounded-xl bg-slate-50 border border-slate-200 p-2 sm:p-2.5 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-3.5 h-3.5 text-[#0e526c]" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-600 block leading-tight">
                          Economia no ano
                        </span>
                        <span className="text-xs sm:text-sm font-black text-slate-900 font-mono block leading-tight">
                          R$ {economiaAno.toLocaleString("pt-BR")},00
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      Anual
                    </span>
                  </div>

                  {/* Subtext */}
                  <p className="text-[9px] sm:text-[10px] text-slate-500 text-center font-medium my-1.5">
                    Economize na sua fatura com energia por assinatura.
                  </p>

                  {/* Button */}
                  <a
                    href="#tabela-descontos"
                    className="block text-center rounded-xl bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-wider py-2 sm:py-2.5 shadow-xs hover:bg-amber-400 active:scale-98 transition-all"
                  >
                    VER DETALHES
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