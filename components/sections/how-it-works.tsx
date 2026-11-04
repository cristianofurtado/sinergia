"use client";

import React from "react";
import { Zap, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Envio da fatura",
      desc: "Envie uma foto ou PDF da sua conta de luz recente em menos de 2 minutos pelo WhatsApp.",
    },
    {
      num: "02",
      title: "Assinatura digital",
      desc: "Contrato 100% online pelo celular, sem burocracia e sem necessidade de cartório.",
    },
    {
      num: "03",
      title: "Vínculo com a distribuidora",
      desc: "A Sinergia cuida de todos os trâmites regulatórios com a sua concessionária local.",
    },
    {
      num: "04",
      title: "Desconto aplicado",
      desc: "Os créditos de energia limpa são abatidos mensalmente na sua conta de luz com desconto de 10% a 30%.",
    },
    {
      num: "05",
      title: "Suporte dedicado",
      desc: "Acompanhe relatórios de economia e conte com um consultor sempre à disposição.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-14 sm:py-20 bg-white border-b border-blue-100 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            PASSO A PASSO
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Como funciona a economia Sinergia
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Sem instalar painéis solares no telhado, sem obras e sem reformas elétricas. Veja como é simples:
          </p>
        </div>

        {/* Steps Grid - Uncluttered for Mobile & Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-blue-100/90 bg-slate-50/60 p-4 sm:p-5 flex flex-col justify-between hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="space-y-2.5">
                <span className="text-2xl sm:text-3xl font-black text-amber-500 font-mono tracking-tight block">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Callout Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-blue-200/90 bg-gradient-to-r from-blue-50/70 via-sky-50/50 to-blue-50/70 p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Por que a adesão é 100% gratuita?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                As usinas parceiras da Sinergia injetam energia solar na rede da concessionária (Lei 14.300/22). A distribuidora gera créditos de compensação abatidos na sua fatura com desconto garantido.
              </p>
            </div>
          </div>

          <a href="#contato" className="w-full md:w-auto shrink-0">
            <Button variant="solar" size="md" className="w-full md:w-auto font-bold text-slate-950 py-3 text-xs sm:text-sm">
              Tirar dúvidas no WhatsApp
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
