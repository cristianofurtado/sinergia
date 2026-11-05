"use client";

import React from "react";
import { Zap, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Envio da fatura",
      desc: "Envio da fatura PDF ou foto total da fatura legível pelo WhatsApp.",
    },
    {
      num: "02",
      title: "Assinatura digital",
      desc: "100% online pelo celular, sem cartório.",
    },
    {
      num: "03",
      title: "Vínculo na rede",
      desc: "Cuidamos de tudo com a concessionária.",
    },
    {
      num: "04",
      title: "Desconto aplicado",
      desc: "Créditos abatidos com até 26% de economia.",
    },
    {
      num: "05",
      title: "Suporte contínuo",
      desc: "Acompanhamento direto com especialista.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-8 sm:py-14 bg-[#ffffff] border-b border-slate-200 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
        {/* Header - Compact */}
        <div className="max-w-3xl space-y-1 sm:space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eaf2f5] border border-[#284b63]/20 text-[#0e526c] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            PASSO A PASSO
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#0e526c] tracking-tight">
            Como funciona adesão para economizar na conta de luz
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Sem placas no telhado e sem obras. Rápido, digital e transparente:
          </p>
        </div>

        {/* Steps: Mobile Compact Rows / Desktop Clean 5-Column Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex items-center sm:flex-col sm:items-start gap-3 sm:gap-2 rounded-xl sm:rounded-2xl border border-[#284b63]/15 bg-[#f0f5f8] p-2.5 sm:p-4 hover:border-[#0e526c]/30 hover:bg-white hover:shadow-xs transition-all"
            >
              <span className="w-8 h-8 sm:w-auto sm:h-auto rounded-lg bg-amber-500/10 text-amber-600 sm:bg-transparent sm:text-amber-500 text-xs sm:text-2xl font-black font-mono shrink-0 flex items-center justify-center">
                {step.num}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-[#0e526c] leading-tight">
                  {step.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-tight sm:leading-snug mt-0.5">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Free Callout */}
        <div className="rounded-xl sm:rounded-2xl border border-[#284b63]/20 bg-gradient-to-r from-[#eaf2f5] to-[#f0f5f8] p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-2xs">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0e526c] text-amber-400 flex items-center justify-center shrink-0">
              <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <p className="text-[11px] sm:text-xs text-slate-700">
              <strong className="text-[#0e526c]">Adesão 100% gratuita:</strong> Créditos de usinas parceiras abatidos diretamente na sua conta (Lei nº 14.300/22).
            </p>
          </div>

          <a href="#tabela-descontos" className="shrink-0 w-full sm:w-auto">
            <Button
              variant="solar"
              size="sm"
              className="w-full sm:w-auto font-bold text-slate-950 text-xs px-3.5 py-1.5 h-8 shadow-2xs"
            >
              Ver Tabela de Descontos
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
