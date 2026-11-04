"use client";

import React from "react";
import { Zap, ShieldCheck, Check, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Cadastro simples",
      desc: "Envie uma foto ou PDF da sua conta de luz recente em menos de 2 minutos pelo WhatsApp ou formulário.",
    },
    {
      num: "02",
      title: "Assinatura digital",
      desc: "Contrato 100% digital, seguro e sem burocracia. Sem necessidade de cartório ou papelada física.",
    },
    {
      num: "03",
      title: "Processo com a distribuidora",
      desc: "Nossa equipe cuida de toda a homologação regulatória e vínculo dos créditos com a sua concessionária local.",
    },
    {
      num: "04",
      title: "Economia aplicada à conta de luz",
      desc: "Você recebe seus créditos de energia limpa todo mês e paga uma fatura menor, com desconto líquido de 10% a 30%.",
    },
    {
      num: "05",
      title: "Suporte dedicado contínuo",
      desc: "Acompanhe seus relatórios de consumo e conte com um consultor dedicado sempre que precisar.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-20 bg-white border-b border-slate-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Transparência & Simplicidade
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Como funciona a economia Sinergia
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Sem instalar painéis solares no seu telhado, sem obras e sem reformas elétricas. Veja como é simples começar:
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-card transition-all group"
            >
              <div className="space-y-4">
                <span className="text-3xl sm:text-4xl font-black text-amber-500 font-mono tracking-wider block">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Callout Card in Soft Blue */}
        <div className="rounded-3xl border border-blue-200/90 bg-gradient-to-r from-blue-50/80 via-sky-50/60 to-blue-50/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">
                Por que a adesão é 100% gratuita?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                As usinas solares parceiras da Sinergia injetam energia limpa na rede da distribuidora (conforme a Lei Federal nº 14.300/2022). Em troca, a concessionária gera créditos de compensação que são aplicados na sua fatura com desconto garantido.
              </p>
            </div>
          </div>

          <a href="#contato" className="shrink-0 w-full md:w-auto">
            <Button variant="solar" size="md" className="w-full md:w-auto font-bold text-slate-950 shadow-sm">
              Tirar dúvidas no WhatsApp
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
