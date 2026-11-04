"use client";

import React, { useState } from "react";
import {
  Zap,
  Building2,
  Home,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Percent,
  Clock,
  Coins,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Ecosystem() {
  const [activeTab, setActiveTab] = useState<"gd" | "acl" | "parceiros">("gd");

  return (
    <section id="venda-energia" className="py-14 sm:py-20 bg-[#ffffff] border-b border-slate-200">
      <div id="estrutura" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf2f5] border border-[#284b63]/20 text-[#0e526c] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            MODALIDADES DE ENERGIA
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0e526c] tracking-tight">
            Venda de Energia Sinergia
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Economia garantida na conta de luz para consumidores e receita mensal recorrente para corretores.
          </p>
        </div>

        {/* Tab Switcher - Clean & Responsive */}
        <div className="flex justify-start">
          <div className="p-1 bg-[#f0f5f8] rounded-xl sm:rounded-2xl border border-slate-200 flex flex-col sm:flex-row w-full sm:w-auto gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("gd")}
              className={`py-2.5 px-3.5 sm:px-5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "gd"
                  ? "bg-[#0e526c] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#0e526c]"
              }`}
            >
              <Home className="w-4 h-4 text-amber-400" />
              Geração Distribuída (Residencial e PMEs)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("acl")}
              className={`py-2.5 px-3.5 sm:px-5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "acl"
                  ? "bg-[#0e526c] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#0e526c]"
              }`}
            >
              <Building2 className="w-4 h-4 text-sky-300" />
              Mercado Livre (Indústrias e Empresas)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("parceiros")}
              className={`py-2.5 px-3.5 sm:px-5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "parceiros"
                  ? "bg-[#0e526c] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#0e526c]"
              }`}
            >
              <Coins className="w-4 h-4 text-amber-300" />
              Para Corretores & Consultores
            </button>
          </div>
        </div>

        {/* Content for Selected Tab */}
        {activeTab === "gd" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-in fade-in duration-150">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                  Energia por Assinatura (B2C & PMEs)
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0e526c] leading-snug">
                  Desconto de até 26% na fatura sem comprar placas
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Ideal para residências, condomínios, clínicas, lojas e restaurantes. Você se conecta a uma usina parceira e recebe créditos diretos na sua fatura todo mês.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f0f5f8] border border-slate-200">
                  <Percent className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Desconto garantido todo mês</h4>
                    <p className="text-[11px] text-slate-600">Economia real aplicada diretamente sobre o consumo de energia.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f0f5f8] border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Zero custo e sem instalação física</h4>
                    <p className="text-[11px] text-slate-600">Sem obras no telhado, sem taxa de adesão e sem reformas elétricas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f0f5f8] border border-slate-200">
                  <FileCheck className="w-4 h-4 text-[#0e526c] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Contrato digital sem fidelidade B2C</h4>
                    <p className="text-[11px] text-slate-600">Assinatura em 2 minutos pelo celular com total transparência.</p>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a href="#simulador" className="block sm:inline-block">
                  <Button variant="solar" size="md" className="w-full sm:w-auto font-bold text-slate-950 py-3 text-xs sm:text-sm shadow-xs">
                    Simular Economia na Fatura
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl sm:rounded-3xl border border-[#284b63]/20 bg-[#f0f5f8] p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0e526c] flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Resumo da Geração Distribuída (GD)
                  </h4>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Adesão Gratuita
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Público-alvo</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">Residências & PMEs</strong>
                    <span className="text-[10px] text-slate-400">Contas a partir de R$ 250</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Faixa de Desconto</span>
                    <strong className="text-xs sm:text-sm text-amber-600 font-bold block mt-0.5">15% a 26% Líquido</strong>
                    <span className="text-[10px] text-slate-400">Varia por distribuidora</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Investimento</span>
                    <strong className="text-xs sm:text-sm text-emerald-600 font-bold block mt-0.5">R$ 0,00 (Zero)</strong>
                    <span className="text-[10px] text-slate-400">Sem taxa inicial</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Regulamentação</span>
                    <strong className="text-xs sm:text-sm text-[#0e526c] font-bold block mt-0.5">Lei nº 14.300/22</strong>
                    <span className="text-[10px] text-slate-400">Marco Legal Nacional</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#eaf2f5] border border-[#284b63]/20 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Como funciona:</strong> A energia das usinas parceiras é injetada na rede e convertida em créditos automáticos na sua conta de luz.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "acl" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-in fade-in duration-150">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#0e526c] uppercase tracking-wider block">
                  Mercado Livre de Energia (ACL B2B)
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0e526c] leading-snug">
                  Economia de até 30% para empresas de média e alta tensão
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Para indústrias, redes varejistas e supermercados do Grupo A. Compre energia limpa diretamente com contratos de longo prazo e preço fixo.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f0f5f8] border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#0e526c] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Proteção contra bandeiras tarifárias</h4>
                    <p className="text-[11px] text-slate-600">Não pague bandeira amarela ou vermelha com valor pré-fixado.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f0f5f8] border border-slate-200">
                  <Percent className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Redução de até 30% nos custos</h4>
                    <p className="text-[11px] text-slate-600">Impacto positivo direto no balanço financeiro da empresa.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f0f5f8] border border-slate-200">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Migração assistida sem taxas</h4>
                    <p className="text-[11px] text-slate-600">Trâmites completos junto à CCEE e concessionária local.</p>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a href="#contato" className="block sm:inline-block">
                  <Button variant="solar" size="md" className="w-full sm:w-auto font-bold text-slate-950 py-3 text-xs sm:text-sm shadow-xs">
                    Solicitar Viabilidade B2B
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl sm:rounded-3xl border border-[#284b63]/20 bg-[#f0f5f8] p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0e526c] flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#0e526c]" />
                    Resumo do Mercado Livre (ACL)
                  </h4>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0e526c] font-semibold border border-blue-200">
                    Grupo A (Média/Alta Tensão)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Público-alvo</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">Indústrias & Redes</strong>
                    <span className="text-[10px] text-slate-400">Contas a partir de R$ 5.000</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Economia Estimada</span>
                    <strong className="text-xs sm:text-sm text-[#0e526c] font-bold block mt-0.5">Até 30% na Geração</strong>
                    <span className="text-[10px] text-slate-400">Previsibilidade contratual</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Fonte Energética</span>
                    <strong className="text-xs sm:text-sm text-emerald-600 font-bold block mt-0.5">100% Renovável</strong>
                    <span className="text-[10px] text-slate-400">Certificado I-REC / ESG</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Cobertura</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">100% Nacional</strong>
                    <span className="text-[10px] text-slate-400">Todas as distribuidoras</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#eaf2f5] border border-[#284b63]/20 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Vantagem competitiva:</strong> Liberdade para negociar fornecedor, volume e prazo contratual, protegendo sua operação contra tarifas reguladas.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "parceiros" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-in fade-in duration-150">
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Para Corretores & Consultores
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0e526c] leading-snug">
                  Venda Energia e construa receita recorrente mensal
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Todo mundo paga conta de luz. Oferecer desconto sem obras e sem taxa de adesão é a venda mais rápida do mercado. Receba comissões todo mês enquanto o cliente economizar.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f0f5f8] border border-slate-200">
                  <Coins className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Comissões mensais recorrentes</h4>
                    <p className="text-[11px] text-slate-600">Receba percentual mensal sobre as faturas ativas da sua carteira.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f0f5f8] border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Alta taxa de conversão</h4>
                    <p className="text-[11px] text-slate-600">Adesão gratuita e sem riscos financeiros para o cliente.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f0f5f8] border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#0e526c] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Suporte e materiais comerciais</h4>
                    <p className="text-[11px] text-slate-600">Simulador de bolso, esteira digital de cadastro e suporte operacional.</p>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a href="#contato" className="block sm:inline-block">
                  <Button variant="solar" size="md" className="w-full sm:w-auto font-bold text-slate-950 py-3 text-xs sm:text-sm shadow-xs">
                    Quero ser Consultor Sinergia
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl sm:rounded-3xl border border-emerald-300/40 bg-[#f0f5f8] p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0e526c] flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-emerald-600" />
                    Potencial de Ganhos em Energia
                  </h4>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Comissão Mensal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Tipo de Receita</span>
                    <strong className="text-xs sm:text-sm text-emerald-700 font-bold block mt-0.5">Recorrente Mensal</strong>
                    <span className="text-[10px] text-slate-400">Ganhos contínuos</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Adesão do Cliente</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">100% Gratuita</strong>
                    <span className="text-[10px] text-slate-400">Zero barreiras de entrada</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Ferramentas</span>
                    <strong className="text-xs sm:text-sm text-[#0e526c] font-bold block mt-0.5">Esteira Digital</strong>
                    <span className="text-[10px] text-slate-400">Simulador + Assinatura</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 block">Escalabilidade</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">Nacional</strong>
                    <span className="text-[10px] text-slate-400">Atuação em múltiplos estados</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Simulação de carteira:</strong> Um consultor com 50 clientes residenciais e 5 empresas constrói receita previsível mensal contínua sem custos de estoque.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}