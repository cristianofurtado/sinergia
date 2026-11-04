"use client";

import React, { useState } from "react";
import { Zap, Radio, Globe, Users, Megaphone, DollarSign, Headphones, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Ecosystem() {
  const [activeCategory, setActiveCategory] = useState<string>("Vendas");
  const [selectedModule, setSelectedModule] = useState<string>("Venda Energia");

  const modules = [
    {
      id: "Venda Energia",
      title: "Venda Energia",
      category: "Vendas",
      icon: Zap,
      highlight: true,
      desc: "Comissões recorrentes com assinatura de energia limpa para residências (B2C) e grandes empresas (B2B/Mercado Livre).",
    },
    {
      id: "Venda Rastreamento",
      title: "Venda Rastreamento",
      category: "Vendas",
      icon: Radio,
      desc: "Soluções de telemetria e rastreamento veicular e frotas corporativas integradas ao ecossistema.",
    },
    {
      id: "Venda SaaS",
      title: "Venda SaaS",
      category: "Vendas",
      icon: Globe,
      desc: "Softwares de gestão e automação por assinatura para PMEs e redes parceiras.",
    },
    {
      id: "CRM",
      title: "CRM",
      category: "Gestão",
      icon: Users,
      desc: "Funil completo de prospecção, distribuição automática de leads e esteira de fechamento.",
    },
    {
      id: "Marketing",
      title: "Marketing",
      category: "Marketing",
      icon: Megaphone,
      desc: "Materiais validados, páginas de captura prontas e campanhas direcionadas para captação de clientes.",
    },
    {
      id: "Financeiro",
      title: "Financeiro",
      category: "Financeiro",
      icon: DollarSign,
      desc: "Extrato transparente de comissões, split de pagamentos e previsibilidade de receita recorrente.",
    },
    {
      id: "Suporte",
      title: "Suporte",
      category: "Suporte",
      icon: Headphones,
      desc: "Central de atendimento para pós-venda, dúvidas operacionais e relacionamento com a distribuidora.",
    },
  ];

  const categories = ["Vendas", "Gestão", "Marketing", "Financeiro", "Suporte"];
  const currentModuleData = modules.find((m) => m.id === selectedModule) || modules[0];

  return (
    <section id="estrutura" className="py-20 bg-navy-950 border-b border-navy-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline and Bullets from Image 1 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-sky-400">
                ECOSSISTEMA INTEGRADO
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Seu negócio. Sua gestão. <br />
                <span className="text-solar-400">Tudo em um só lugar.</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
                Uma estrutura digital criada para que Corretores e Líderes possam vender, acompanhar, administrar e expandir seus negócios.
              </p>
            </div>

            {/* Bullet Points with highlight on Venda Energia */}
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
                        : "text-slate-300 hover:text-white hover:bg-navy-850"
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
                        Foco
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA Button from Image 1 */}
            <div className="pt-4">
              <a href="#contato">
                <Button variant="solar" size="lg" className="w-full sm:w-auto font-bold text-navy-950 shadow-glow">
                  Conheça a estrutura
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Grid from Image 1 */}
          <div className="lg:col-span-6">
            <div className="bg-navy-900 rounded-3xl border border-navy-700 p-6 sm:p-8 shadow-elevation space-y-6">
              {/* Modules Matrix Grid (2 Columns like in Image 1) */}
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

                <div className="p-4 sm:p-5 flex items-center justify-center bg-navy-900/60 text-xs font-medium text-slate-400 italic">
                  + Módulos em expansão
                </div>
              </div>

              {/* Dynamic details card for selected module */}
              <div className="bg-navy-950 rounded-2xl p-4 sm:p-5 border border-navy-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Módulo selecionado
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

              {/* Category Pills from bottom of Image 1 */}
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
