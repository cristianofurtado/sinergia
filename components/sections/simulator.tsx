"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Simulator() {
  const [profile, setProfile] = useState<"b2c" | "b2b">("b2c");
  const [fatura, setFatura] = useState<number>(690);

  // Discount percentages: B2C average ~22% to 31%; B2B average ~18% to 28%
  const discountRate = profile === "b2c" ? 0.3116 : 0.25;
  const economiaMes = Math.round(fatura * discountRate);
  const novaFatura = fatura - economiaMes;
  const economiaAno = economiaMes * 12;
  const economia5Anos = economiaAno * 5;

  return (
    <section
      id="simulador"
      className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-blue-700" />
            Simulador de Economia Oficial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Descubra o valor do seu desconto real
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Calcule na hora quanto você ou sua empresa vão poupar todo mês na fatura de luz sem investir nenhum centavo.
          </p>
        </div>

        {/* Simulator Card */}
        <div className="rounded-3xl border border-blue-200/80 bg-white p-6 sm:p-10 shadow-card space-y-8">
          {/* Profile Switcher (B2C vs B2B) */}
          <div className="flex justify-center">
            <div className="p-1 bg-slate-100 rounded-2xl border border-slate-200 inline-flex max-w-md w-full">
              <button
                type="button"
                onClick={() => {
                  setProfile("b2c");
                  if (fatura > 5000) setFatura(690);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  profile === "b2c"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
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
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  profile === "b2b"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Para Minha Empresa (B2B)
              </button>
            </div>
          </div>

          {/* Slider & Input */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Valor médio atual da sua fatura:
              </span>
              <span className="text-2xl sm:text-3xl font-black text-blue-900 font-mono">
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

            <div className="flex justify-between text-xs text-slate-500">
              <span>{profile === "b2c" ? "R$ 250" : "R$ 1.500"}</span>
              <span>{profile === "b2c" ? "R$ 1.500" : "R$ 25.000"}</span>
              <span>{profile === "b2c" ? "R$ 3.000+" : "R$ 50.000+"}</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 text-center space-y-1">
              <span className="text-xs text-slate-500 font-medium block">
                Fatura com Sinergia
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                R$ {novaFatura.toLocaleString("pt-BR")},00
              </span>
              <span className="text-[11px] text-emerald-600 block font-semibold pt-1">
                Economia todo mês
              </span>
            </div>

            <div className="rounded-2xl bg-amber-50/80 border border-amber-300 p-5 text-center space-y-1 shadow-xs">
              <span className="text-xs text-amber-800 font-medium block">
                Desconto mensal estimado
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-600">
                R$ {economiaMes.toLocaleString("pt-BR")},00
              </span>
              <span className="text-[11px] text-amber-800 block font-semibold pt-1">
                Líquido no seu bolso
              </span>
            </div>

            <div className="rounded-2xl bg-blue-50/80 border border-blue-200 p-5 text-center space-y-1">
              <span className="text-xs text-blue-700 font-medium block">
                Economia em 1 ano
              </span>
              <span className="text-2xl sm:text-3xl font-black text-blue-950">
                R$ {economiaAno.toLocaleString("pt-BR")},00
              </span>
              <span className="text-[11px] text-blue-600 block font-semibold pt-1">
                Em 5 anos: R$ {economia5Anos.toLocaleString("pt-BR")},00
              </span>
            </div>
          </div>

          {/* CTA Button to WhatsApp */}
          <div className="text-center pt-2">
            <a
              href={`https://wa.me/5571987822230?text=${encodeURIComponent(
                `Olá! Fiz uma simulação na Sinergia para fatura de R$ ${fatura},00 (perfil ${
                  profile === "b2c" ? "Residencial B2C" : "Empresarial B2B"
                }) com economia estimada de R$ ${economiaAno},00/ano. Gostaria de solicitar minha adesão gratuita.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto"
            >
              <Button
                variant="solar"
                size="lg"
                className="w-full sm:w-auto font-black text-slate-950 text-base py-4 px-8 shadow-sm hover:shadow"
              >
                QUERO GARANTIR ESTE DESCONTO AGORA
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <p className="text-xs text-slate-500 mt-3 font-medium">
              ✓ Sem custos de adesão • Sem obras • Atendimento imediato por WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
