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
    <section id="estrutura" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline and Bullets from Image 1 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">
                ECOSSISTEMA INTEGRADO
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Seu negócio. Sua gestão. <br />
                <span className="text-brand-navy">Tudo em um só lugar.</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
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
                    className={`flex items-center gap-2.5 text-left text-sm font-semibold p-2 rounded-lg transition-all ${
                      mod.highlight
                        ? "text-solar-700 bg-solar-50 border border-solar-200/80 shadow-xs"
                        : isSelected
                        ? "text-brand-navy bg-white border border-slate-300 shadow-xs"
                        : "text-slate-700 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        mod.highlight
                          ? "bg-solar-500 ring-4 ring-solar-200"
                          : "bg-brand-blue"
                      }`}
                    />
                    <span>{mod.title}</span>
                    {mod.highlight && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-solar-400 text-slate-950 ml-auto">
                        Principal
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA Button from Image 1 */}
            <div className="pt-4">
              <a href="#prospeccao">
                <Button variant="navy" size="lg" className="w-full sm:w-auto font-bold shadow-md">
                  Conheça a estrutura
                  <ArrowRight className="w-4 h-4 ml-2 text-solar-400" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Grid from Image 1 */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-card space-y-6">
              {/* Modules Matrix Grid (2 Columns like in Image 1) */}
              <div className="grid grid-cols-2 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
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
                      className={`p-4 sm:p-5 flex items-center justify-between transition-all text-left bg-white hover:bg-slate-50 ${
                        isSelected
                          ? "bg-blue-50/60 ring-2 ring-inset ring-brand-blue font-bold text-brand-navy"
                          : matchesFilter
                          ? "text-slate-800"
                          : "text-slate-400 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-5 h-5 ${
                            mod.highlight
                              ? "text-solar-500"
                              : isSelected
                              ? "text-brand-blue"
                              : "text-slate-400"
                          }`}
                        />
                        <span className="text-sm font-semibold">{mod.title}</span>
                      </div>
                      {mod.highlight && (
                        <div className="w-2 h-2 rounded-full bg-solar-500 animate-ping" />
                      )}
                    </button>
                  );
                })}

                {/* 8th cell placeholder / active highlight */}
                <div className="p-4 sm:p-5 flex items-center justify-center bg-slate-100 text-xs font-medium text-slate-500 italic">
                  + Mais módulos em expansão
                </div>
              </div>

              {/* Dynamic details card for selected module */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Módulo selecionado
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-brand-navy font-semibold">
                    {currentModuleData.category}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {currentModuleData.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentModuleData.desc}
                </p>
              </div>

              {/* Category Pills from bottom of Image 1 */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      const first = modules.find((m) => m.category === cat);
                      if (first) setSelectedModule(first.id);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-slate-900 text-white font-semibold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
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
