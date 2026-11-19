import React from "react";
import Image from "next/image";
import {
  FileText,
  TrendingUp,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Exact figures matching campaign phone mockup (690 -> 475, desconto 215, ano 2.580)
const FATURA_VALUE = 690;
const DESCONTO_MES = 215;
const COM_ENERGIA = 475;
const ECONOMIA_ANO = 2580;

export function Hero() {
  return (
    <section
      id="inicio"
      className="hero-viewport relative overflow-hidden bg-gradient-to-b from-[#0e526c] via-[#1a4157] to-[#284b63] text-white border-b border-[#0e526c] flex flex-col"
    >
      {/* Background Soft Glow Accents */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-radial from-[#284b63]/60 via-[#0e526c]/30 to-transparent blur-3xl pointer-events-none -z-10"
      />

      {/* Centered Viewport Content */}
      <div className="flex-1 flex items-center w-full">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 [@media(max-height:700px)]:py-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column: Headlines, Segments, CTAs, Proof */}
            <div
              className="lg:col-span-7 space-y-3.5 sm:space-y-4 lg:space-y-6 [@media(max-height:780px)]:space-y-3 [@media(max-height:680px)]:space-y-2.5"
              id="energia"
            >
              {/* Main Headline */}
              <div className="space-y-2.5 sm:space-y-3 [@media(max-height:680px)]:space-y-2">
                <h1 className="text-[clamp(1.5rem,3.4vw+0.6rem,3.75rem)] [@media(max-height:780px)]:text-[clamp(1.45rem,2.7vw+0.55rem,2.85rem)] font-black tracking-tight text-white leading-[1.08] [text-wrap:balance]">
                  Economia de energia também pode ser uma{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                    oportunidade de negócio.
                  </span>
                </h1>

                <p className="text-[clamp(0.875rem,0.55vw+0.72rem,1.1875rem)] text-sky-100/90 leading-relaxed [@media(max-height:700px)]:leading-snug font-normal max-w-2xl">
                  A <strong className="text-white font-bold">Energia Prospectar</strong> conecta residências, empresas e corretores às maiores usinas de energia limpa do país. Reduza até 26% na sua conta de luz sem obras, sem placas solares e com suporte completo.
                </p>
              </div>

              {/* Clean Segment Badges (B2C & B2B) */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 max-w-lg">
                <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-2.5 sm:p-3 [@media(max-height:700px)]:p-2 shadow-sm">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-200 block">
                    Mercado Livre (B2B)
                  </span>
                  <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-snug mt-0.5">
                    100% do Brasil para indústrias e empresas.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 backdrop-blur-md p-2.5 sm:p-3 [@media(max-height:700px)]:p-2 shadow-sm">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                    Geração Distribuída
                  </span>
                  <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-snug mt-0.5">
                    Até 26% em residências e comércios.
                  </p>
                </div>
              </div>

              {/* Action Buttons (Always visible above the fold) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-0.5">
                <a href="#tabela-descontos" className="w-full sm:w-auto">
                  <Button
                    variant="solar"
                    size="lg"
                    className="w-full sm:w-auto shadow-md font-bold text-slate-950 py-3 sm:py-3.5 px-6 sm:px-7 [@media(max-height:680px)]:py-2.5"
                  >
                    Ver Tabela de Descontos
                    <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
                  </Button>
                </a>

                <a href="#contato" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 shadow-sm py-3 sm:py-3.5 px-6 backdrop-blur-sm [@media(max-height:680px)]:py-2.5"
                  >
                    Falar com um Consultor
                  </Button>
                </a>
              </div>

              {/* Quick Proof Badges (Hidden on ultra-short viewports <= 680px to preserve CTA breathing room) */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 text-xs font-semibold text-sky-100/90 pt-0.5 [@media(max-height:680px)]:hidden">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>Zero obras</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>Adesão gratuita</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                  <span>Lei nº 14.300/22</span>
                </div>
              </div>

              {/* Compact Mobile Savings Card (Tall mobile >= 720px height only; hidden on short screens <= 719px and md+) */}
              <div className="md:hidden [@media(max-height:719px)]:hidden pt-1">
                <div className="rounded-2xl bg-[#082d3b]/85 border border-white/15 p-3 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
                    <div>
                      <span className="text-[10px] text-sky-200/80 block leading-tight">
                        Fatura de energia
                      </span>
                      <span className="text-xs font-semibold text-white/75 line-through font-mono">
                        R$ {FATURA_VALUE.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-sky-200/90 block leading-tight">
                        Com Energia Prospectar
                      </span>
                      <span className="text-lg font-black text-amber-400 font-mono leading-tight">
                        R$ {COM_ENERGIA.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                      <span className="text-sky-100/90">
                        Mês:{" "}
                        <strong className="text-amber-300 font-mono">
                          -R$ {DESCONTO_MES.toLocaleString("pt-BR")}
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                      <span className="text-sky-100/90">
                        Ano:{" "}
                        <strong className="text-emerald-300 font-mono">
                          R$ {ECONOMIA_ANO.toLocaleString("pt-BR")}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Full Phone Mockup (Tablet >= 768x900 & Desktop >= 1024px) */}
            <div className="hidden md:flex [@media(max-width:1023px)_and_(max-height:899px)]:hidden lg:col-span-5 justify-center">
              <div className="relative w-full max-w-[270px] lg:max-w-[315px] xl:max-w-[340px] 2xl:max-w-[360px] [@media(max-height:780px)]:max-w-[285px]">
                {/* Outer Phone Hardware Case */}
                <div className="rounded-[2.4rem] lg:rounded-[2.5rem] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-2 lg:p-2.5 shadow-2xl border border-white/20">
                  {/* Inner Screen */}
                  <div className="rounded-[2rem] bg-white text-slate-900 p-3.5 lg:p-5 [@media(max-height:780px)]:p-3.5 overflow-hidden shadow-inner font-sans">
                    {/* Dynamic Island / Speaker */}
                    <div className="w-16 sm:w-20 h-3 bg-slate-900 rounded-full mx-auto mb-2.5 [@media(max-height:780px)]:mb-2" />

                    {/* App Header: Official Horizontal Logo */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                      <Image
                        src="/logo-oficial.png"
                        alt="Grupo Energia Prospectar"
                        width={130}
                        height={40}
                        className="h-6 sm:h-7 w-auto object-contain"
                        priority
                      />
                      <FileText className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                    </div>

                    {/* Screen Title */}
                    <div className="space-y-0.5 pt-1.5 pb-2 [@media(max-height:780px)]:pb-1.5">
                      <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                        Sua economia na fatura
                      </h2>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Confira o resultado deste mês
                      </p>
                    </div>

                    {/* Top Navy Box */}
                    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0e526c] to-[#082d3b] p-2.5 sm:p-3 text-white shadow-sm space-y-1.5">
                      <div>
                        <span className="text-[10px] text-slate-300 block">
                          Fatura de energia
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white font-mono">
                          R$ {FATURA_VALUE.toLocaleString("pt-BR")},00
                        </span>
                      </div>

                      <div className="pt-1 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-[10px] text-slate-300">
                          Com Energia Prospectar
                        </span>
                        <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">
                          R$ {COM_ENERGIA.toLocaleString("pt-BR")},00
                        </span>
                      </div>
                    </div>

                    {/* Card 1: Desconto no mês */}
                    <div className="mt-2 rounded-xl bg-amber-50/70 border border-amber-200 p-2 sm:p-2.5 [@media(max-height:780px)]:p-2 shadow-sm flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-600 block leading-tight">
                          Desconto no mês
                        </span>
                        <span className="text-xs sm:text-sm font-black text-amber-600 font-mono block leading-tight">
                          R$ {DESCONTO_MES.toLocaleString("pt-BR")},00
                        </span>
                      </div>
                    </div>

                    {/* Card 2: Economia no ano */}
                    <div className="mt-1.5 rounded-xl bg-slate-50 border border-slate-200 p-2 sm:p-2.5 [@media(max-height:780px)]:p-2 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                          <BarChart3 className="w-3.5 h-3.5 text-[#0e526c]" aria-hidden="true" />
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-slate-600 block leading-tight">
                            Economia no ano
                          </span>
                          <span className="text-xs sm:text-sm font-black text-slate-900 font-mono block leading-tight">
                            R$ {ECONOMIA_ANO.toLocaleString("pt-BR")},00
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        Anual
                      </span>
                    </div>

                    {/* Subtext */}
                    <p className="text-[10px] text-slate-500 text-center font-medium my-1.5">
                      Economize na sua fatura com energia por assinatura.
                    </p>

                    {/* Button */}
                    <a
                      href="#tabela-descontos"
                      className="block text-center rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider py-2 sm:py-2.5 shadow-sm hover:bg-amber-400 active:scale-[0.98] transition-all"
                    >
                      VER DETALHES
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discreet Scroll Cue to Next Section */}
      <div className="shrink-0 flex justify-center pb-2.5 sm:pb-3.5 [@media(max-height:700px)]:pb-1.5">
        <a
          href="#como-funciona"
          aria-label="Rolar para Como Funciona"
          className="inline-flex flex-col items-center gap-0.5 px-3 py-1 rounded-full text-sky-100/85 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#284b63] transition-colors"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] [@media(max-height:680px)]:hidden">
            Como funciona
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
