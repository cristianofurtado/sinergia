"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Simulator() {
  const [profile, setProfile] = useState<"b2c" | "b2b">("b2c");
  const [fatura, setFatura] = useState<number>(690);

  // Discount percentages
  const discountRate = profile === "b2c" ? 0.3116 : 0.25;
  const economiaMes = Math.round(fatura * discountRate);
  const novaFatura = fatura - economiaMes;
  const economiaAno = economiaMes * 12;
  const economia5Anos = economiaAno * 5;

  return (
    <section
      id="simulador"
      className="py-14 sm:py-20 bg-blue-50/60 border-b border-blue-100 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2.5 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/90 border border-blue-200 text-blue-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-blue-700" />
            SIMULADOR OFICIAL
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Descubra o valor do seu desconto real
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Simule na hora quanto você ou sua empresa vão economizar todo mês na conta de luz.
          </p>
        </div>

        {/* Simulator Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-blue-200/90 bg-white p-5 sm:p-9 shadow-card space-y-6 sm:space-y-7">
          {/* Profile Switcher */}
          <div className="flex justify-center">
            <div className="p-1 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 inline-flex w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setProfile("b2c");
                  if (fatura > 5000) setFatura(690);
                }}
                className={`flex-1 sm:flex-initial py-2 px-3 sm:px-5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  profile === "b2c"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Para Minha Casa (B2C)
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfile("b2b");
                  if (fatura < 2500) setFatura(4500);
                }}
                className={`flex-1 sm:flex-initial py-2 px-3 sm:px-5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  profile === "b2b"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Para Minha Empresa (B2B)
              </button>
            </div>
          </div>

          {/* Slider & Input */}
          <div className="space-y-3 max-w-xl mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Valor da sua conta atual:
              </span>
              <span className="text-xl sm:text-2xl font-black text-blue-900 font-mono">
                R$ {fatura.toLocaleString("pt-BR")},00
              </span>
            </div>

            <input
              type="range"
              min={profile === "b2c" ? 250 : 1500}
              max={profile === "b2c" ? 3000 : 50000}
              step={profile === "b2c" ? 50 : 500}
              value={fatura}
              onChange={(e) => setFatura(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 border border-slate-300"
            />

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{profile === "b2c" ? "R$ 250" : "R$ 1.500"}</span>
              <span>{profile === "b2c" ? "R$ 1.500" : "R$ 25.000"}</span>
              <span>{profile === "b2c" ? "R$ 3.000+" : "R$ 50.000+"}</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
            <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/90 p-3.5 sm:p-4 text-center space-y-0.5">
              <span className="text-[11px] text-slate-500 font-medium block">
                Fatura com Sinergia
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 block">
                R$ {novaFatura.toLocaleString("pt-BR")},00
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold block">
                Valor reduzido todo mês
              </span>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-amber-50/90 border border-amber-300 p-3.5 sm:p-4 text-center space-y-0.5 shadow-xs">
              <span className="text-[11px] text-amber-800 font-semibold block">
                Desconto mensal estimado
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-600 block">
                R$ {economiaMes.toLocaleString("pt-BR")},00
              </span>
              <span className="text-[10px] text-amber-800 font-bold block">
                Líquido no seu bolso
              </span>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-blue-50/90 border border-blue-200 p-3.5 sm:p-4 text-center space-y-0.5">
              <span className="text-[11px] text-blue-700 font-medium block">
                Economia em 1 ano
              </span>
              <span className="text-xl sm:text-2xl font-black text-blue-950 block">
                R$ {economiaAno.toLocaleString("pt-BR")},00
              </span>
              <span className="text-[10px] text-blue-600 font-semibold block">
                Em 5 anos: R$ {economia5Anos.toLocaleString("pt-BR")},00
              </span>
            </div>
          </div>

          {/* CTA Button to WhatsApp */}
          <div className="text-center pt-1">
            <a
              href={`https://wa.me/5571987822230?text=${encodeURIComponent(
                `Olá! Fiz uma simulação na Sinergia para fatura de R$ ${fatura},00 (${
                  profile === "b2c" ? "Residencial B2C" : "Empresarial B2B"
                }) com economia estimada de R$ ${economiaAno},00/ano. Gostaria de solicitar minha adesão gratuita.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block sm:inline-block w-full sm:w-auto"
            >
              <Button
                variant="solar"
                size="lg"
                className="w-full sm:w-auto font-black text-slate-950 text-sm sm:text-base py-3.5 px-6 shadow-sm"
              >
                QUERO GARANTIR ESTE DESCONTO AGORA
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">
              ✓ Sem custos de adesão • Sem obras • Atendimento imediato por WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
