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
  Sparkles,
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
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50/80 py-16 sm:py-24 border-b border-slate-200/80"
    >
      {/* Background Harmonious Blue Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-blue-200/35 via-sky-100/25 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Value Proposition */}
          <div className="lg:col-span-7 space-y-7" id="energia">
            {/* Top Pillars in Harmonious Blue Tones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-1">
              <div className="rounded-2xl border border-blue-200/80 bg-white/90 p-4 shadow-xs backdrop-blur-sm hover:border-blue-400 transition-all">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-blue-700 mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  MERCADO LIVRE DE ENERGIA
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Cobertura em 100% do território nacional para empresas e indústrias.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200/80 bg-white/90 p-4 shadow-xs backdrop-blur-sm hover:border-amber-400 transition-all">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-amber-700 mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  GERAÇÃO DISTRIBUÍDA
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Condições e descontos de até 26% na fatura de residências e comércios.
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                <Flame className="w-4 h-4 text-amber-500" />
                +1.600 usinas de energia limpa conectadas
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Economia de energia também pode ser uma{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-amber-600">
                  oportunidade de negócio.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                A <strong className="text-slate-900 font-bold">Sinergia</strong> conecta clientes residenciais (B2C), empresas (B2B) e corretores às maiores usinas solares e geradoras do país. Reduza de 10% a 30% na conta de luz sem obras, sem placas no telhado e com adesão 100% gratuita.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <a href="#simulador">
                <Button variant="solar" size="lg" className="w-full sm:w-auto shadow-md font-bold text-slate-950 text-base py-4">
                  Quero conhecer a energia
                  <ArrowRight className="w-5 h-5 ml-1.5" />
                </Button>
              </a>

              <a href="#contato">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs"
                >
                  Falar com consultor agora
                </Button>
              </a>
            </div>

            {/* Key Advantages */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Zero obras e instalações</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Adesão 100% gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Lei Federal nº 14.300/22</span>
              </div>
            </div>
          </div>

          {/* Right Column: Recreating the Phone Mockup from Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              {/* Soft Ambient Shadow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-300/20 via-sky-200/30 to-amber-200/20 rounded-[3rem] blur-2xl -z-10" />

              {/* Outer Phone Hardware Case (Graphite/Titanium Look) */}
              <div className="rounded-[2.8rem] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[10px] shadow-2xl border border-slate-600/60 ring-1 ring-black/5">
                {/* Inner Screen Bezel */}
                <div className="relative rounded-[2.3rem] bg-slate-50 text-slate-900 p-5 overflow-hidden shadow-inner font-sans">
                  {/* Dynamic Island / Speaker Notch */}
                  <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-4" />

                  {/* App Header: Logo Oficial SINERGIA da foto + Document Icon */}
                  <div className="flex items-center justify-between pb-3">
                    <Image
                      src="/sinergia-hero-logo-clean.png"
                      alt="Sinergia"
                      width={140}
                      height={35}
                      className="h-8 w-auto object-contain"
                      priority
                    />
                    <div className="p-1 rounded-md text-slate-500 hover:text-slate-800">
                      <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                  </div>

                  {/* App Screen Title from Photo */}
                  <div className="space-y-0.5 pt-1 pb-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                      Sua economia <br />
                      na fatura
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Confira o resultado deste mês
                    </p>
                  </div>

                  {/* Top Navy Box from Photo */}
                  <div className="rounded-2xl bg-gradient-to-b from-[#0C1B33] to-[#081528] p-4 text-white shadow-md space-y-3">
                    <div>
                      <span className="text-[11px] text-slate-300 block font-medium">
                        Fatura de energia
                      </span>
                      <span className="text-lg font-bold text-white tracking-tight">
                        R$ {faturaValue.toLocaleString("pt-BR")},00
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-700/70">
                      <span className="text-[11px] text-slate-300 block font-medium">
                        Com Sinergia
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-orange-500 tracking-tight">
                        R$ {comSinergia.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 1: Desconto no mês from Photo */}
                  <div className="mt-3 rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        Desconto no mês
                      </span>
                      <span className="text-lg font-extrabold text-orange-500">
                        R$ {descontoMes.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Economia no ano from Photo with curve */}
                  <div className="mt-2.5 rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-xs flex items-center justify-between relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-5 h-5 text-blue-900" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          Economia no ano
                        </span>
                        <span className="text-lg font-extrabold text-slate-900">
                          R$ {economiaAno.toLocaleString("pt-BR")},00
                        </span>
                      </div>
                    </div>

                    {/* Small orange accent curve matching photo */}
                    <div className="w-12 h-6 pointer-events-none opacity-80">
                      <svg viewBox="0 0 50 25" fill="none" className="w-full h-full">
                        <path
                          d="M2 20 Q 25 22, 48 4"
                          stroke="#F97316"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Footnote text from Photo */}
                  <p className="text-[10.5px] text-slate-500 text-center font-medium mt-3 mb-3">
                    Economize na sua fatura com energia por assinatura.
                  </p>

                  {/* Orange Pill Button from Photo */}
                  <a
                    href="#simulador"
                    className="block text-center rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-black text-xs uppercase tracking-wider py-3 shadow-md hover:brightness-105 active:scale-98 transition-all"
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
