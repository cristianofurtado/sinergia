"use client";

import React, { useState } from "react";
import {
  Zap,
  Building2,
  Calculator,
  Users,
  DollarSign,
  FileCheck2,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Ecosystem() {
  const [activeCategory, setActiveCategory] = useState<string>("Venda B2C");
  const [selectedModule, setSelectedModule] = useState<string>("Venda Energia B2C");

  const modules = [
    {
      id: "Venda Energia B2C",
      title: "Venda Energia B2C",
      category: "Venda B2C",
      icon: Zap,
      highlight: true,
      desc: "Assinatura de energia limpa para residências e comércios. Cliente ganha até 26% de desconto na conta e você recebe comissões mensais recorrentes.",
    },
    {
      id: "Mercado Livre B2B",
      title: "Mercado Livre B2B",
      category: "Mercado Livre B2B",
      icon: Building2,
      desc: "Atenda indústrias, redes e empresas de médio/grande porte (Grupo A). Migração sem custos e descontos de até 30% no consumo com grandes comissões.",
    },
    {
      id: "Simulador de Faturas",
      title: "Simulador de Faturas",
      category: "Simulador",
      icon: Calculator,
      desc: "Calculadora comercial instantânea: insira o valor da fatura do cliente e gere em segundos a proposta com o valor exato da economia anual.",
    },
    {
      id: "CRM de Prospecção",
      title: "CRM de Energia",
      category: "Venda B2C",
      icon: Users,
      desc: "Organize seus contatos, envie links de adesão, acompanhe status de análise da conta de luz e receba notificações de contratos assinados.",
    },
    {
      id: "Comissões Recorrentes",
      title: "Comissões Recorrentes",
      category: "Comissões",
      icon: DollarSign,
      highlight: true,
      desc: "Previsibilidade financeira real: receba todo mês uma porcentagem recorrente sobre a economia da conta de luz de toda a sua carteira ativa.",
    },
    {
      id: "Assinatura Digital",
      title: "Assinatura Digital",
      category: "Venda B2C",
      icon: FileCheck2,
      desc: "Fechamento 100% online pelo WhatsApp ou celular. O cliente assina em poucos cliques com validade jurídica e zero papelada.",
    },
    {
      id: "Suporte Regulatório",
      title: "Suporte Regulatório",
      category: "Suporte",
      icon: ShieldCheck,
      desc: "Nossa equipe cuida de toda a interlocução com concessionárias (CEMIG, CPFL, Enel, Equatorial, Copel, etc.) e injeção de créditos.",
    },
    {
      id: "Treinamento em Energia",
      title: "Treinamento & Pitch",
      category: "Suporte",
      icon: GraduationCap,
      desc: "Capacitação completa sobre o setor elétrico, Lei Federal 14.300/22, quebra de objeções e materiais prontos para captação.",
    },
  ];

  const categories = ["Venda B2C", "Mercado Livre B2B", "Comissões", "Simulador", "Suporte"];
  const currentModuleData = modules.find((m) => m.id === selectedModule) || modules[0];

  return (
    <section id="estrutura" className="py-20 bg-navy-950 border-b border-navy-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline and Bullets */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-solar-400 bg-solar-500/10 px-3 py-1 rounded-full border border-solar-500/30">
                VENDA DE ENERGIA • GESTÃO & COMISSÕES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Venda de Energia. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-400 to-solar-orange">
                  Sua gestão. Tudo em um só lugar.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2 font-normal">
                Uma estrutura digital completa criada para que Corretores, Consultores e Líderes possam vender energia solar por assinatura e Mercado Livre, acompanhar contratos e faturar comissões mensais recorrentes.
              </p>
            </div>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {modules.map((mod) => {
                const isSelected = selectedModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setSelectedModule(mod.id);
                      setActiveCategory(mod.category);
                    }}
                    className={`flex items-center gap-2.5 text-left text-sm font-semibold p-3 rounded-xl transition-all ${
                      mod.highlight
                        ? "text-solar-300 bg-solar-500/15 border border-solar-500/50 shadow-sm"
                        : isSelected
                        ? "text-white bg-navy-800 border border-navy-600 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-navy-850 border border-navy-800"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        mod.highlight ? "bg-solar-400 ring-4 ring-solar-500/20" : "bg-sky-400"
                      }`}
                    />
                    <span>{mod.title}</span>
                    {mod.highlight && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-solar-500 text-navy-950 ml-auto">
                        Destaque
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a href="#contato">
                <Button variant="solar" size="lg" className="w-full sm:w-auto font-black text-navy-950 shadow-glow">
                  Quero Vender Energia Sinergia
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="#simulador">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-navy-700 bg-navy-900/80 text-slate-200">
                  Ver Simulador de Fatura
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Grid */}
          <div className="lg:col-span-6">
            <div className="bg-navy-900 rounded-3xl border border-navy-700 p-6 sm:p-8 shadow-elevation space-y-6">
              {/* Modules Matrix Grid (2 Columns) */}
              <div className="grid grid-cols-2 gap-px bg-navy-800 rounded-2xl overflow-hidden border border-navy-700">
                {modules.map((mod) => {
                  const Icon = mod.icon;
                  const isSelected = selectedModule === mod.id;
                  const matchesFilter =
                    activeCategory === "Todos" || mod.category === activeCategory;

                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setSelectedModule(mod.id);
                        setActiveCategory(mod.category);
                      }}
                      className={`p-4 sm:p-5 flex items-center justify-between transition-all text-left bg-navy-850 hover:bg-navy-800 ${
                        isSelected
                          ? "bg-navy-800 ring-2 ring-inset ring-solar-500 font-bold text-white"
                          : matchesFilter
                          ? "text-slate-200"
                          : "text-slate-500 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-5 h-5 ${
                            mod.highlight
                              ? "text-solar-400"
                              : isSelected
                              ? "text-sky-400"
                              : "text-slate-400"
                          }`}
                        />
                        <span className="text-sm font-semibold">{mod.title}</span>
                      </div>
                      {mod.highlight && (
                        <div className="w-2 h-2 rounded-full bg-solar-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic details card for selected module */}
              <div className="bg-navy-950 rounded-2xl p-4 sm:p-5 border border-navy-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Solução de Venda de Energia
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-navy-800 text-solar-300 font-semibold border border-navy-700">
                    {currentModuleData.category}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-solar-400" />
                  {currentModuleData.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {currentModuleData.desc}
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-navy-800">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      const first = modules.find((m) => m.category === cat);
                      if (first) setSelectedModule(first.id);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat
                        ? "bg-solar-500 text-navy-950 shadow-sm"
                        : "bg-navy-800 text-slate-300 hover:bg-navy-700 hover:text-white border border-navy-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
