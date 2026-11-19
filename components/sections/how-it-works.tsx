import React from "react";
import { Zap, ArrowRight, Lightbulb, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
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
] as const;

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="section-viewport bg-[#ffffff] border-b border-slate-200 relative overflow-hidden flex flex-col"
    >
      {/* Centered Viewport Content */}
      <div className="flex-1 flex items-center w-full">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-6 [@media(max-height:700px)]:py-2 space-y-3.5 sm:space-y-6 lg:space-y-8 [@media(max-height:780px)]:space-y-4 [@media(max-height:680px)]:space-y-2.5">
          {/* Header */}
          <div className="max-w-3xl space-y-1 sm:space-y-2 [@media(max-height:680px)]:space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eaf2f5] border border-[#284b63]/20 text-[#0e526c] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" aria-hidden="true" />
              PASSO A PASSO
            </div>
            <h2 className="text-[clamp(1.2rem,2.4vw+0.55rem,2.75rem)] [@media(max-height:780px)]:text-[clamp(1.15rem,2vw+0.5rem,2.25rem)] font-extrabold text-[#0e526c] tracking-tight leading-[1.12] [text-wrap:balance]">
              Como funciona adesão para economizar na conta de luz
            </h2>
            <p className="text-slate-600 text-[clamp(0.75rem,0.35vw+0.65rem,1.0625rem)] leading-snug [@media(max-height:660px)]:hidden">
              Sem placas no telhado e sem obras. Rápido, digital e transparente:
            </p>
          </div>

          {/* Steps: Mobile Compact Timeline / Tablet Balanced Bento (2+2+1) / Desktop 5-Column Connected Track */}
          <div className="relative">
            {/* Desktop horizontal connecting track behind step badges */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-11 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-300/60 via-[#0e526c]/20 to-emerald-400/50 pointer-events-none"
            />
            {/* Mobile vertical connecting track */}
            <div
              aria-hidden="true"
              className="sm:hidden absolute left-[1.65rem] top-5 bottom-5 w-px bg-[#284b63]/20 pointer-events-none"
            />

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1.5 sm:gap-3 lg:gap-4 [@media(max-height:680px)]:gap-1">
              {STEPS.map((step, index) => {
                const isLast = index === STEPS.length - 1;
                return (
                  <li
                    key={step.num}
                    className={`relative flex items-center sm:items-start gap-2.5 sm:gap-3 lg:gap-3.5 rounded-xl sm:rounded-2xl border border-[#284b63]/15 bg-[#f0f5f8]/90 px-2.5 py-2 sm:p-4 lg:p-5 [@media(max-height:780px)]:lg:p-4 [@media(max-height:680px)]:py-1.5 hover:border-[#0e526c]/35 hover:bg-white hover:shadow-sm transition-all ${
                      isLast
                        ? "sm:col-span-2 lg:col-span-1 sm:flex-row sm:items-center lg:flex-col lg:items-start"
                        : "sm:flex-col"
                    }`}
                  >
                    <span className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 [@media(max-height:680px)]:w-7 [@media(max-height:680px)]:h-7 rounded-lg sm:rounded-xl bg-white border border-amber-300/70 text-amber-600 text-xs sm:text-sm lg:text-base font-black font-mono shrink-0 flex items-center justify-center shadow-sm">
                      {step.num}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm lg:text-base font-bold text-[#0e526c] leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs lg:text-[13px] text-slate-600 leading-tight sm:leading-snug mt-0.5 lg:mt-1.5">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Free Callout Banner */}
          <div className="rounded-xl sm:rounded-2xl border border-[#284b63]/20 bg-gradient-to-r from-[#eaf2f5] to-[#f0f5f8] p-2.5 sm:p-4 lg:p-5 [@media(max-height:680px)]:p-2 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-left w-full sm:w-auto">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#0e526c] text-amber-400 flex items-center justify-center shrink-0">
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </div>
              <p className="text-[11px] sm:text-xs lg:text-sm text-slate-700 leading-tight sm:leading-snug">
                <strong className="text-[#0e526c]">Adesão 100% gratuita:</strong> Créditos de usinas parceiras abatidos diretamente na sua conta (Lei nº 14.300/22).
              </p>
            </div>

            <a href="#tabela-descontos" className="shrink-0 w-full sm:w-auto">
              <Button
                variant="solar"
                size="sm"
                className="w-full sm:w-auto font-bold text-slate-950 text-xs lg:text-sm px-4 lg:px-5 h-9 lg:h-10 [@media(max-height:680px)]:h-8 shadow-sm"
              >
                Ver Tabela de Descontos
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Discreet Scroll Cue to Discount Table */}
      <div className="shrink-0 flex justify-center pb-2 sm:pb-3.5 [@media(max-height:700px)]:pb-1">
        <a
          href="#tabela-descontos"
          aria-label="Rolar para Tabela de Descontos"
          className="inline-flex flex-col items-center gap-0.5 px-3 py-1 rounded-full text-[#0e526c]/75 hover:text-[#0e526c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0e526c] focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] [@media(max-height:680px)]:hidden">
            Tabela de Descontos
          </span>
          <ChevronDown
            aria-hidden="true"
            className="w-5 h-5 motion-safe:animate-bounce"
          />
        </a>
      </div>
    </section>
  );
}
