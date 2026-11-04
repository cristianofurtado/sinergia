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
    { uf: "BA", name: "Bahia", discount: "20%", distributor: "Neoenergia Coelba", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "PE", name: "Pernambuco", discount: "16%", distributor: "Neoenergia Pernambuco", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "AL", name: "Alagoas", discount: "18%", distributor: "Equatorial Alagoas", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "MA", name: "Maranhão", discount: "18%", distributor: "Equatorial Maranhão", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "PI", name: "Piauí", discount: "18%", distributor: "Equatorial Piauí", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "PA", name: "Pará", discount: "18%", distributor: "Equatorial Pará", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "GO", name: "Goiás", discount: "25%", distributor: "Equatorial Goiás", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "MT", name: "Mato Grosso", discount: "25%", distributor: "Energisa MT", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "MS", name: "Mato Grosso do Sul", discount: "20%", distributor: "Energisa MS", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "TO", name: "Tocantins", discount: "16%", distributor: "Energisa Tocantins", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "MG", name: "Minas Gerais", discount: "26%", distributor: "CEMIG", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "SP", name: "São Paulo", discount: "15%", distributor: "CPFL / Enel SP / Elektro", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "ES", name: "Espírito Santo", discount: "15%", distributor: "EDP Espírito Santo", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "RJ", name: "Rio de Janeiro", discount: "12% a 15%", distributor: "Light / Enel RJ", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "PR", name: "Paraná", discount: "16%", distributor: "Copel", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "SC", name: "Santa Catarina", discount: "15%", distributor: "Celesc", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "RS", name: "Rio Grande do Sul", discount: "15%", distributor: "RGE / CEEE Equatorial", modalities: "Geração Distribuída e Mercado Livre" },
    { uf: "SE", name: "Sergipe", discount: "16%", distributor: "Energisa Sergipe", modalities: "Geração Distribuída e Mercado Livre" },
  ];

  return (
    <section id="cobertura" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header from Image 3 */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-blue-700 font-bold tracking-widest text-xs uppercase">
            <span className="w-6 h-0.5 bg-amber-500 inline-block" />
            COBERTURA NACIONAL
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Onde a economia já está disponível.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Mercado Livre com cobertura nacional. Na Geração Distribuída, os percentuais variam por estado e distribuidora — passe o mouse ou toque em um estado para ver os detalhes.
          </p>
        </div>

        {/* Interactive Grid & Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* States Grid (Left / 8 cols) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {statesData.map((item) => {
                const isSelected = selectedState?.uf === item.uf;
                return (
                  <button
                    key={item.uf}
                    onClick={() => setSelectedState(item)}
                    onMouseEnter={() => setSelectedState(item)}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-400 scale-105"
                        : "border-slate-200/90 bg-slate-50/70 hover:border-blue-400 hover:bg-white hover:shadow-xs"
                    }`}
                  >
                    <span className="block text-base sm:text-lg font-extrabold text-slate-900">
                      {item.uf}
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-blue-700 mt-0.5">
                      {item.discount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Card (Right / 4 cols) */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-b from-blue-50/60 via-white to-blue-50/40 p-6 sm:p-7 shadow-card min-h-[300px] flex flex-col justify-between">
              {selectedState ? (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                      Estado Selecionado
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      {selectedState.name} ({selectedState.uf})
                    </h3>
                  </div>

                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                    <div>
                      <span className="text-xs text-slate-500 block">Distribuidora / Concessionária:</span>
                      <strong className="text-sm text-slate-900 font-bold">
                        {selectedState.distributor}
                      </strong>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Desconto de referência:</span>
                      <span className="text-xl font-black text-amber-600">
                        {selectedState.discount}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[11px] text-slate-500 block">Modalidades:</span>
                      <span className="text-xs font-medium text-slate-700">
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
                    <Button variant="solar" size="md" className="w-full font-bold text-slate-950 shadow-sm">
                      Simular para {selectedState.uf}
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center my-auto py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-600 max-w-[240px] leading-relaxed">
                    Passe o mouse ou toque em um estado para ver a distribuidora e o percentual de referência.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legal Frame from Image 3 */}
        <div className="pt-8 border-t border-slate-200 space-y-2">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Marco Legal da Micro e Minigeração Distribuída (Lei nº 14.300/2022)
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">
            Marco Legal da Micro e Minigeração Distribuída e do Sistema de Compensação de Energia Elétrica. Descontos dependem de distribuidora, região, modalidade e disponibilidade de geração.
          </p>
        </div>
      </div>
    </section>
  );
}
