"use client";

import React from "react";
import { Zap, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Envio da fatura",
      desc: "Envie uma foto da sua conta de luz recente pelo WhatsApp em menos de 2 minutos.",
    },
    {
      num: "02",
      title: "Assinatura digital",
      desc: "Contrato 100% online pelo celular, sem burocracia e sem cartório.",
    },
    {
      num: "03",
      title: "Vínculo na distribuidora",
      desc: "A Sinergia cuida de todos os trâmites regulatórios com a sua concessionária.",
    },
    {
      num: "04",
      title: "Desconto aplicado",
      desc: "Os créditos são compensados mensalmente na sua conta com desconto de até 26%.",
    },
    {
      num: "05",
      title: "Suporte dedicado",
      desc: "Acompanhe relatórios de economia e conte com consultores à disposição.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-14 sm:py-20 bg-[#ffffff] border-b border-slate-200 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf2f5] border border-[#284b63]/20 text-[#0e526c] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            PASSO A PASSO
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0e526c] tracking-tight">
            Como funciona a economia Sinergia
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Sem instalar painéis solares no telhado, sem obras e sem reformas elétricas. Veja como é simples:
          </p>
        </div>

        {/* Steps Grid - Uncluttered for Mobile & Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-[#284b63]/15 bg-[#f0f5f8] p-4 sm:p-5 flex flex-col justify-between hover:border-[#0e526c]/40 hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="space-y-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-500 font-mono tracking-tight block">
                  {step.num}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#0e526c]">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Callout Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#284b63]/25 bg-gradient-to-r from-[#eaf2f5] via-[#f0f5f8] to-[#eaf2f5] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0e526c] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Lightbulb className="w-5 h-5 text-amber-400" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm sm:text-base font-bold text-[#0e526c]">
                Por que a adesão é 100% gratuita?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                As usinas parceiras injetam energia limpa na rede da concessionária (Lei nº 14.300/22). Os créditos de compensação são abatidos diretamente na sua fatura com desconto garantido.
              </p>
            </div>
          </div>

          <a href="#contato" className="w-full md:w-auto shrink-0">
            <Button variant="solar" size="md" className="w-full md:w-auto font-bold text-slate-950 py-3 text-xs sm:text-sm shadow-xs">
              Tirar dúvidas no WhatsApp
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}