"use client";

import React from "react";
import { Check, X, Zap, ArrowRight, ShieldCheck, Building2, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="energia" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-24 border-b border-slate-200">
      {/* Background soft glow in yellow/amber and deep blue */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-solar-100/40 via-blue-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pillars: Mercado Livre & Geração Distribuída */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-soft hover:border-slate-300 transition-colors">
                <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-brand-blue mb-1">
                  MERCADO LIVRE
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cobertura em 100% do território nacional para empresas de médio e grande porte.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-soft hover:border-slate-300 transition-colors">
                <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-solar-600 mb-1">
                  GERAÇÃO DISTRIBUÍDA
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Condições e descontos de até 26% conforme distribuidora e região (B2B e B2C).
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Economia de energia também pode ser uma{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-600 to-solar-500">
                oportunidade de negócio.
              </span>
            </h1>

            {/* Subheading / Big Stat */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solar-100/80 border border-solar-300/50 text-solar-800 text-sm font-semibold">
                <Flame className="w-4 h-4 text-solar-600" />
                +1.600 usinas conectadas
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                A <strong className="text-slate-900 font-bold">SINERGIA</strong> trabalha com uma ampla rede de geradores de energia preparada para atender clientes, equipes e empresas. Reduza de 10% a 30% na conta de luz sem obras, sem placas solares e com adesão gratuita.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a href="#prospeccao">
                <Button variant="solar" size="lg" className="w-full sm:w-auto shadow-md">
                  Quero conhecer a energia
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </a>

              <a href="#simulador">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50">
                  <Zap className="w-4 h-4 text-solar-500 mr-1" />
                  Simular economia
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                Regulamentado pela Lei nº 14.300/2022
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Zero custo de instalação
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-600" />
                Atendimento B2B & B2C
              </div>
            </div>
          </div>

          {/* Right Column: Visual Billboard Card from Image 2 */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-1 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-navy shadow-elevation text-white overflow-hidden">
              {/* Card Header Top */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-solar-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-solar-400 font-bold">
                    Oportunidade Sinergia
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-700/80 text-slate-300">
                  Sem Obras
                </span>
              </div>

              {/* Billboard Inner Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    Quer saber como economizar de{" "}
                    <span className="text-solar-400 underline decoration-solar-500 decoration-wavy decoration-2">
                      10% a 30%
                    </span>{" "}
                    na sua fatura de energia?
                  </h3>
                </div>

                {/* Feature Points from image */}
                <div className="space-y-3.5 bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-solar-400/20 text-solar-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-slate-200 font-medium">
                      Descubra agora o seu desconto real por distribuidora!
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-slate-300">
                      Sem taxa de adesão, obras e instalações na sua propriedade.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-solar-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs">
                      ⚡
                    </div>
                    <p className="text-sm text-solar-300 font-bold">
                      E o melhor: 100% GRATUITO para aderir.
                    </p>
                  </div>
                </div>

                {/* Card CTA */}
                <a href="#prospeccao" className="block">
                  <Button variant="solar" size="lg" className="w-full shadow-glow font-bold text-slate-950">
                    SAIBA MAIS & SIMULAR AGORA
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
