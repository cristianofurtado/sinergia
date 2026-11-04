"use client";

import React, { useState } from "react";
import {
  FileText,
  TrendingUp,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Building2,
  Flame,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SinergiaLogo } from "@/components/ui/sinergia-logo";

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
      className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 py-16 sm:py-24 border-b border-navy-800/80"
    >
      {/* Background Deep Navy Matte & Solar Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-radial from-navy-700/30 via-solar-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-solar-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-navy-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Subtle Matte Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & High-Conversion Prospecting Text */}
          <div className="lg:col-span-7 space-y-7" id="energia">
            {/* Top Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1">
              <div className="rounded-2xl border border-navy-700/80 bg-navy-850/80 p-4 shadow-card backdrop-blur-sm hover:border-navy-600 transition-colors">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-sky-400 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  MERCADO LIVRE
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Cobertura em 100% do território nacional para empresas e indústrias.
                </p>
              </div>

              <div className="rounded-2xl border border-solar-500/30 bg-navy-850/80 p-4 shadow-card backdrop-blur-sm hover:border-solar-500/60 transition-colors">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-solar-400 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-solar-400" />
                  GERAÇÃO DISTRIBUÍDA
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Condições e descontos de até 26% na fatura de residências e comércios.
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solar-500/15 border border-solar-500/40 text-solar-300 text-xs font-semibold">
                <Flame className="w-4 h-4 text-solar-400" />
                +1.600 usinas de energia limpa conectadas
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                Economia de energia também pode ser uma{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-400 via-solar-500 to-solar-orange">
                  oportunidade de negócio.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                A <strong className="text-white font-bold">SÍNERGIA</strong> conecta clientes residenciais (B2C), empresas (B2B) e corretores às maiores usinas solares e geradoras do país. Reduza de 10% a 30% na conta de luz sem obras, sem placas no telhado e com adesão 100% gratuita.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <a href="#simulador">
                <Button variant="solar" size="lg" className="w-full sm:w-auto shadow-glow font-bold text-navy-950 text-base py-4">
                  Quero conhecer a energia
                  <ArrowRight className="w-5 h-5 ml-1.5" />
                </Button>
              </a>

              <a href="#contato">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-navy-700 bg-navy-800/80 text-slate-200 hover:bg-navy-700 hover:text-white"
                >
                  Falar com consultor agora
                </Button>
              </a>
            </div>

            {/* Key Advantages */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-solar-400 shrink-0" />
                <span>Zero obras e instalações</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-solar-400 shrink-0" />
                <span>Adesão 100% gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Lei Federal nº 14.300/22</span>
              </div>
            </div>
          </div>

          {/* Right Column: Recreating the Phone Mockup from Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              {/* Back Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-solar-500/20 via-navy-600/30 to-sky-500/20 rounded-[3rem] blur-2xl -z-10" />

              {/* Outer Phone Hardware Case (Graphite/Titanium Look) */}
              <div className="rounded-[2.8rem] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[10px] shadow-2xl border border-slate-600/60 ring-1 ring-white/10">
                {/* Inner Screen Bezel */}
                <div className="relative rounded-[2.3rem] bg-slate-50 text-slate-900 p-5 overflow-hidden shadow-inner font-sans">
                  {/* Dynamic Island / Speaker Notch */}
                  <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-4" />

                  {/* App Header: Exact Logo + Document Icon from Photo */}
                  <div className="flex items-center justify-between pb-3">
                    <SinergiaLogo variant="dark" height={22} />
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
                      <span className="text-2xl sm:text-3xl font-black text-solar-orange tracking-tight">
                        R$ {comSinergia.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 1: Desconto no mês from Photo */}
                  <div className="mt-3 rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-soft flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-solar-orange" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        Desconto no mês
                      </span>
                      <span className="text-lg font-extrabold text-solar-orange">
                        R$ {descontoMes.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Economia no ano from Photo with curve */}
                  <div className="mt-2.5 rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-soft flex items-center justify-between relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200/80 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-5 h-5 text-navy-800" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          Economia no ano
                        </span>
                        <span className="text-lg font-extrabold text-navy-950">
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
                    className="block text-center rounded-xl bg-gradient-to-r from-solar-orange to-solar-500 text-white font-black text-xs uppercase tracking-wider py-3 shadow-md hover:brightness-105 active:scale-98 transition-all"
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
