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
  const [faturaValue] = useState<number>(690);

  // Exact figures matching campaign phone photo (690 -> 475, desconto 215, ano 2.580)
  const descontoMes = 215;
  const comSinergia = 475;
  const economiaAno = 2580;

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-blue-100/70 via-sky-50/50 to-blue-50/40 py-10 sm:py-16 lg:py-20 border-b border-blue-200/60"
    >
      {/* Background Soft Blue Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-radial from-blue-200/40 via-sky-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clear, uncluttered headlines */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6" id="energia">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-blue-200 text-blue-900 text-[11px] sm:text-xs font-bold shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              +1.600 usinas conectadas • Adesão 100% Gratuita
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Economia de energia também pode ser uma{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-amber-600">
                  oportunidade de negócio.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                A <strong className="text-slate-900 font-bold">Sinergia</strong> conecta residências, empresas e corretores às maiores usinas de energia limpa do país. Reduza até 26% na sua conta de luz sem obras, sem placas solares e com suporte completo.
              </p>
            </div>

            {/* Clean Segment Badges (B2C & B2B) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 max-w-lg">
              <div className="rounded-xl border border-blue-200/90 bg-white/90 p-2.5 sm:p-3 shadow-2xs">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                  Mercado Livre (B2B)
                </span>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-snug mt-0.5">
                  100% do Brasil para indústrias e empresas.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/90 bg-white/90 p-2.5 sm:p-3 shadow-2xs">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                  Geração Distribuída
                </span>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-snug mt-0.5">
                  Até 26% em residências e comércios.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a href="#simulador" className="w-full sm:w-auto">
                <Button variant="solar" size="lg" className="w-full sm:w-auto shadow-sm font-bold text-slate-950 py-3.5 px-6">
                  Simular Minha Economia
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>

              <a href="#contato" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-blue-200 bg-white text-blue-950 hover:bg-blue-50/80 shadow-2xs py-3.5 px-6"
                >
                  Falar com um Consultor
                </Button>
              </a>
            </div>

            {/* Quick Proof Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600 pt-0.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero obras</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Adesão gratuita</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Lei nº 14.300/22</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Phone Mockup (Optimized for Mobile) */}
          <div className="lg:col-span-5 flex justify-center pt-2 lg:pt-0">
            <div className="relative w-full max-w-[270px] sm:max-w-[320px]">
              {/* Outer Phone Hardware Case */}
              <div className="rounded-[2.4rem] sm:rounded-[2.7rem] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-2 sm:p-2.5 shadow-xl border border-slate-600/70">
                {/* Inner Screen */}
                <div className="rounded-[2rem] sm:rounded-[2.2rem] bg-slate-50 text-slate-900 p-3.5 sm:p-5 overflow-hidden shadow-inner font-sans">
                  {/* Dynamic Island / Speaker */}
                  <div className="w-16 sm:w-20 h-3 sm:h-3.5 bg-slate-900 rounded-full mx-auto mb-2.5 sm:mb-3" />

                  {/* App Header: Official Logo Image from photo */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
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
                  <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0C1B33] to-[#081528] p-2.5 sm:p-3 text-white shadow-xs space-y-1.5">
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
                      <span className="text-lg sm:text-xl font-black text-amber-500 font-mono">
                        R$ {comSinergia.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 1: Desconto no mês */}
                  <div className="mt-2 rounded-xl bg-white border border-slate-200 p-2 sm:p-2.5 shadow-2xs flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 block leading-tight">
                        Desconto no mês
                      </span>
                      <span className="text-xs sm:text-sm font-black text-amber-600 font-mono block leading-tight">
                        R$ {descontoMes.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Economia no ano */}
                  <div className="mt-1.5 rounded-xl bg-white border border-slate-200 p-2 sm:p-2.5 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-3.5 h-3.5 text-blue-900" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 block leading-tight">
                          Economia no ano
                        </span>
                        <span className="text-xs sm:text-sm font-black text-slate-900 font-mono block leading-tight">
                          R$ {economiaAno.toLocaleString("pt-BR")},00
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      Anual
                    </span>
                  </div>

                  {/* Subtext */}
                  <p className="text-[9px] sm:text-[10px] text-slate-500 text-center font-medium my-1.5">
                    Economize na sua fatura com energia por assinatura.
                  </p>

                  {/* Orange Button */}
                  <a
                    href="#simulador"
                    className="block text-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-wider py-2 sm:py-2.5 shadow-xs hover:brightness-105 active:scale-98 transition-all"
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