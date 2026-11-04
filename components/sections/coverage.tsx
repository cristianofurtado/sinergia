"use client";

import React, { useState } from "react";
import { MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StateCoverage {
  uf: string;
  name: string;
  discount: string;
  distributor: string;
  modalities: string;
}

export function Coverage() {
  const [selectedState, setSelectedState] = useState<StateCoverage | null>(null);

  const statesData: StateCoverage[] = [
    { uf: "CE", name: "Ceará", discount: "20%", distributor: "Enel Ceará", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "RN", name: "Rio Grande do Norte", discount: "18%", distributor: "Neoenergia Cosern", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "BA", name: "Bahia", discount: "18%", distributor: "Neoenergia Coelba", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "PE", name: "Pernambuco", discount: "16%", distributor: "Neoenergia Celpe", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "AL", name: "Alagoas", discount: "18%", distributor: "Equatorial Alagoas", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "MA", name: "Maranhão", discount: "18%", distributor: "Equatorial Maranhão", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "PI", name: "Piauí", discount: "18%", distributor: "Equatorial Piauí", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "PA", name: "Pará", discount: "18%", distributor: "Equatorial Pará", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "GO", name: "Goiás", discount: "25%", distributor: "Equatorial Goiás", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "MT", name: "Mato Grosso", discount: "25%", distributor: "Energisa MT", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "MS", name: "Mato Grosso do Sul", discount: "23%", distributor: "Energisa MS", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "TO", name: "Tocantins", discount: "16%", distributor: "Energisa Tocantins", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "MG", name: "Minas Gerais", discount: "26%", distributor: "CEMIG", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "SP", name: "São Paulo", discount: "15%", distributor: "CPFL / Elektro / Piratininga", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "ES", name: "Espírito Santo", discount: "15%", distributor: "EDP Espírito Santo", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "RJ", name: "Rio de Janeiro", discount: "15%", distributor: "Light / Enel RJ", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "PR", name: "Paraná", discount: "15%", distributor: "Copel", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "SC", name: "Santa Catarina", discount: "15%", distributor: "Celesc", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "RS", name: "Rio Grande do Sul", discount: "15%", distributor: "RGE / CEEE Equatorial", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "SE", name: "Sergipe", discount: "16%", distributor: "Energisa Sergipe", modalities: "Geração Distribuída e Mercado Livre" },
  ];

  return (
    <section id="cobertura" className="py-14 sm:py-20 bg-slate-50/70 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Header */}
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex items-center gap-2 text-blue-700 font-bold tracking-widest text-[11px] sm:text-xs uppercase">
            <span className="w-5 h-0.5 bg-amber-500 inline-block" />
            COBERTURA NACIONAL
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Onde a economia já está disponível.
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Mercado Livre com cobertura nacional. Na Geração Distribuída, os percentuais variam por estado — toque no seu estado para ver a distribuidora.
          </p>
        </div>

        {/* Interactive Grid & Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* States Grid - Compact for Mobile */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-2.5">
              {statesData.map((item) => {
                const isSelected = selectedState?.uf === item.uf;
                return (
                  <button
                    key={item.uf}
                    onClick={() => setSelectedState(item)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-amber-500 bg-amber-50 text-amber-950 shadow-xs ring-2 ring-amber-400 scale-102"
                        : "border-slate-200/90 bg-white hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                  >
                    <span className="block text-sm sm:text-base font-extrabold text-slate-900">
                      {item.uf}
                    </span>
                    <span className="block text-[11px] sm:text-xs font-semibold text-blue-700">
                      {item.discount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl sm:rounded-3xl border border-blue-200/80 bg-white p-5 sm:p-6 shadow-card min-h-[240px] flex flex-col justify-between">
              {selectedState ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                      Estado Selecionado
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                      {selectedState.name} ({selectedState.uf})
                    </h3>
                  </div>

                  <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Distribuidora:</span>
                      <strong className="text-slate-900 font-bold text-xs sm:text-sm">
                        {selectedState.distributor}
                      </strong>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-slate-500">Desconto de referência:</span>
                      <span className="text-base font-black text-amber-600">
                        {selectedState.discount}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Modalidades:</span>
                      <span className="text-slate-700 font-medium">
                        {selectedState.modalities}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/5571987822230?text=${encodeURIComponent(
                      `Olá! Gostaria de solicitar proposta da Sinergia para o estado de ${selectedState.name} (${selectedState.uf}) com desconto estimado de ${selectedState.discount}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pt-1"
                  >
                    <Button variant="solar" size="md" className="w-full font-bold text-slate-950 py-3 text-xs sm:text-sm shadow-xs">
                      Simular para {selectedState.uf}
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center my-auto py-6 space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-[220px]">
                    Toque em um estado para ver a distribuidora e o percentual de desconto.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legal Frame */}
        <div className="pt-4 border-t border-slate-200/90 space-y-1">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Marco Legal da Micro e Minigeração Distribuída (Lei nº 14.300/2022)
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-4xl">
            Marco Legal do Sistema de Compensação de Energia Elétrica. Descontos dependem de distribuidora, região, modalidade e disponibilidade.
          </p>
        </div>
      </div>
    </section>
  );
}
