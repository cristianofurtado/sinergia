"use client";

import React, { useState } from "react";
import { Smartphone, Zap, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  const [faturaInput, setFaturaInput] = useState<number>(690);

  // Approximate 25% to 30% savings calculation
  const discountRate = 0.3116; // 690 * 0.3116 ~ 215
  const descontoMes = Math.round(faturaInput * discountRate);
  const comSinergia = faturaInput - descontoMes;
  const economiaAno = descontoMes * 12;

  const steps = [
    {
      num: "01",
      title: "Cadastro simples",
      desc: "Envie sua fatura de energia em menos de 2 minutos. Sem burocracia ou formulários complexos.",
    },
    {
      num: "02",
      title: "Assinatura digital",
      desc: "Contrato 100% digital e seguro direto pelo celular ou computador, sem necessidade de cartório.",
    },
    {
      num: "03",
      title: "Processo junto à operação/distribuidora",
      desc: "Nossa equipe técnica cuida de toda a homologação e trâmites regulatórios com a concessionária local.",
    },
    {
      num: "04",
      title: "Economia aplicada à conta de energia",
      desc: "Os créditos de energia limpa gerados são compensados mensalmente na sua fatura com desconto líquido.",
    },
    {
      num: "05",
      title: "Suporte dedicado",
      desc: "Acompanhamento contínuo dos seus créditos, relatórios de economia e canal direto com especialistas.",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="simulador" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Phone Mockup from Image 2 */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-[2.5rem] bg-slate-900 p-4 shadow-2xl border-4 border-slate-800 relative">
              {/* Phone Speaker Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-3" />

              {/* Phone Screen Container */}
              <div className="bg-slate-50 rounded-[2rem] p-5 text-slate-900 border border-slate-200 overflow-hidden space-y-4">
                {/* App Header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-brand-navy tracking-tight text-lg">SINERG</span>
                    <span className="font-black text-solar-500 tracking-tight text-lg">IA</span>
                  </div>
                  <Smartphone className="w-5 h-5 text-slate-400" />
                </div>

                {/* Simulation Header */}
                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-slate-900">
                    Sua economia na fatura
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Confira o resultado simulado deste mês
                  </p>
                </div>

                {/* Interactive Slider */}
                <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Valor da sua fatura:</span>
                    <span className="text-brand-blue font-bold text-sm">
                      R$ {faturaInput.toLocaleString("pt-BR")},00
                    </span>
                  </div>
                  <input
                    type="range"
                    min="250"
                    max="15000"
                    step="50"
                    value={faturaInput}
                    onChange={(e) => setFaturaInput(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-solar-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>R$ 250</span>
                    <span>R$ 5.000</span>
                    <span>R$ 15.000+</span>
                  </div>
                </div>

                {/* Values Card */}
                <div className="bg-brand-navy rounded-2xl p-4 text-white space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Fatura de energia atual</span>
                    <span className="line-through text-slate-400">
                      R$ {faturaInput.toLocaleString("pt-BR")},00
                    </span>
                  </div>

                  <div className="border-t border-slate-700/60 pt-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-200">Com Sinergia</span>
                    <span className="text-2xl font-black text-solar-400">
                      R$ {comSinergia.toLocaleString("pt-BR")},00
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-700/60">
                    <div className="bg-slate-800/80 rounded-xl p-2.5">
                      <span className="text-[10px] text-slate-400 block">Desconto no mês</span>
                      <span className="text-sm font-bold text-emerald-400">
                        R$ {descontoMes.toLocaleString("pt-BR")},00
                      </span>
                    </div>

                    <div className="bg-slate-800/80 rounded-xl p-2.5">
                      <span className="text-[10px] text-slate-400 block">Economia no ano</span>
                      <span className="text-sm font-bold text-solar-300">
                        R$ {economiaAno.toLocaleString("pt-BR")},00
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom App Note */}
                <p className="text-[11px] text-slate-500 text-center font-medium">
                  Economize na sua fatura com energia por assinatura
                </p>

                {/* App CTA Button */}
                <a
                  href={`https://wa.me/551132809000?text=${encodeURIComponent(
                    `Olá! Gostaria de solicitar simulação da Sinergia para fatura de R$ ${faturaInput},00 (economia estimada de R$ ${economiaAno},00/ano).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="solar" size="md" className="w-full font-bold text-slate-950 py-3 shadow-sm">
                    VER DETALHES & CONTRATAR
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: "Como funciona" list from Image 2 */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5 text-solar-500" />
                Passo a Passo Descomplicado
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Como funciona
              </h2>
              <p className="text-slate-600 mt-2 text-base">
                Sem necessidade de investir em painéis ou fazer qualquer modificação na sua rede elétrica.
              </p>
            </div>

            {/* Steps List */}
            <div className="divide-y divide-slate-100">
              {steps.map((step) => (
                <div key={step.num} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4 group">
                  <span className="text-xl sm:text-2xl font-black text-solar-500 font-mono tracking-wider shrink-0 w-10">
                    {step.num}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer from Image 2 */}
            <div className="pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-500 leading-relaxed">
                * Prazos e condições variam conforme distribuidora, região e modalidade contratada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
