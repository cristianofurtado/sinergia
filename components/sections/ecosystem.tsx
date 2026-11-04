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
    <section id="venda-energia" className="py-14 sm:py-20 bg-white border-b border-blue-100">
      <div id="energia" />
      <div id="estrutura" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            VENDA DE ENERGIA
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Venda de Energia Sinergia
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Economia garantida na conta de luz para consumidores e receita mensal recorrente para consultores autorizados.
          </p>
        </div>

        {/* Tab Switcher - Clean & Responsive */}
        <div className="flex justify-start">
          <div className="p-1 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 flex flex-col sm:flex-row w-full sm:w-auto gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("gd")}
              className={`py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "gd"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Home className="w-4 h-4 text-amber-500" />
              Geração Distribuída (Residencial e Comercial)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("acl")}
              className={`py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "acl"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-700" />
              Mercado Livre (Indústrias e Empresas)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("parceiros")}
              className={`py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "parceiros"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Coins className="w-4 h-4 text-emerald-600" />
              Para Corretores & Consultores
            </button>
          </div>
        </div>

        {/* Content for Selected Tab */}
        {activeTab === "gd" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-in fade-in duration-200">
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                  Energia Solar por Assinatura (B2C & PMEs)
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  Desconto de até 26% na conta de luz sem gastar nada com obras
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Ideal para residências, condomínios, clínicas, lojas e restaurantes. Você se conecta a uma usina solar parceira e recebe créditos diretos na sua fatura todo mês.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <Percent className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Desconto garantido todo mês</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Economia real de 10% a 26% sobre a tarifa de energia da sua concessionária.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Zero custo de adesão e sem placas</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Você não compra placas solares e não precisa de obras nem furos no telhado.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <FileCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Sem fidelidade para pessoas físicas</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Contrato 100% digital pelo celular e liberdade para cancelar quando quiser.</p>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a href="#simulador" className="block sm:inline-block">
                  <Button variant="solar" size="md" className="w-full sm:w-auto font-bold text-slate-950 py-3 text-xs sm:text-sm">
                    Simular Economia na Fatura
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl sm:rounded-3xl border border-blue-200/90 bg-slate-50/70 p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Resumo da Venda de Energia GD
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Adesão Gratuita
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Público-alvo</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">Residências & PMEs</strong>
                    <span className="text-[10px] text-slate-400">Contas a partir de R$ 250</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Faixa de Desconto</span>
                    <strong className="text-xs sm:text-sm text-amber-600 font-bold block mt-0.5">10% a 26% Líquido</strong>
                    <span className="text-[10px] text-slate-400">Varia por estado</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Investimento</span>
                    <strong className="text-xs sm:text-sm text-emerald-600 font-bold block mt-0.5">R$ 0,00 (Zero)</strong>
                    <span className="text-[10px] text-slate-400">Sem taxa inicial</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Regulamentação</span>
                    <strong className="text-xs sm:text-sm text-blue-900 font-bold block mt-0.5">Lei nº 14.300/22</strong>
                    <span className="text-[10px] text-slate-400">Marco Legal Nacional</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Como funciona:</strong> A energia das usinas parceiras é injetada na rede da concessionária e convertida em créditos automáticos na sua conta.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "acl" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-in fade-in duration-200">
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  Ambiente de Contratação Livre (Mercado Livre B2B)
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  Economia de até 30% para empresas de alta e média tensão
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Para indústrias, redes varejistas e supermercados do Grupo A. Compre energia limpa diretamente com contratos de longo prazo, preço fixo e previsibilidade.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Proteção contra bandeiras tarifárias</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Não pague bandeira amarela ou vermelha. Seu preço é pré-fixado em contrato.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <Percent className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Redução de até 30% nos custos</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Economia substancial no demonstrativo financeiro e balanço da sua empresa.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Migração assistida sem custos</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Cuidamos de toda a documentação com a CCEE e com a concessionária local.</p>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a href="#contato" className="block sm:inline-block">
                  <Button variant="solar" size="md" className="w-full sm:w-auto font-bold text-slate-950 py-3 text-xs sm:text-sm">
                    Solicitar Estudo de Viabilidade B2B
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl sm:rounded-3xl border border-blue-200/90 bg-slate-50/70 p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    Resumo do Mercado Livre (ACL)
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                    Grupo A (Alta Tensão)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Público-alvo</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">Indústrias & Redes</strong>
                    <span className="text-[10px] text-slate-400">Contas a partir de R$ 5.000</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Economia Estimada</span>
                    <strong className="text-xs sm:text-sm text-blue-700 font-bold block mt-0.5">Até 30% na Geração</strong>
                    <span className="text-[10px] text-slate-400">Previsibilidade total</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Fonte Energética</span>
                    <strong className="text-xs sm:text-sm text-emerald-600 font-bold block mt-0.5">100% Renovável</strong>
                    <span className="text-[10px] text-slate-400">Certificado I-REC / ESG</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Cobertura</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">100% Nacional</strong>
                    <span className="text-[10px] text-slate-400">Todas as distribuidoras</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Vantagem competitiva:</strong> Liberdade para negociar fornecedor, volume e prazo contratual, reduzindo o impacto das tarifas reguladas pela Aneel.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "parceiros" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-in fade-in duration-200">
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Oportunidade para Corretores & Consultores
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  Venda Energia e construa receita mensal recorrente
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Todo mundo paga conta de luz. Oferecer desconto sem obras e sem taxa de adesão é a venda mais rápida do mercado. E você recebe comissões todo mês enquanto o cliente economizar.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <Coins className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Comissões recorrentes vitalícias</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Ganhe porcentagem mensal sobre o consumo de faturas ativas em toda a sua carteira.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Produto de fácil aceitação</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">O cliente não gasta nada para entrar e começa a economizar já na fatura seguinte.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/90">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Suporte e treinamento completo</h4>
                    <p className="text-[11px] sm:text-xs text-slate-600">Materiais comerciais validados, esteira digital de assinatura e retaguarda operacional.</p>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a href="#contato" className="block sm:inline-block">
                  <Button variant="solar" size="md" className="w-full sm:w-auto font-bold text-slate-950 py-3 text-xs sm:text-sm">
                    Quero me Cadastrar como Consultor
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl sm:rounded-3xl border border-emerald-200/90 bg-slate-50/70 p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-600" />
                    Potencial de Ganhos em Energia
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Comissão Mensal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Tipo de Receita</span>
                    <strong className="text-xs sm:text-sm text-emerald-700 font-bold block mt-0.5">Recorrente Mensal</strong>
                    <span className="text-[10px] text-slate-400">Paga todo mês</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Facilidade de Venda</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">Adesão Gratuita</strong>
                    <span className="text-[10px] text-slate-400">Cliente só economiza</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Ferramentas</span>
                    <strong className="text-xs sm:text-sm text-blue-700 font-bold block mt-0.5">Esteira Digital</strong>
                    <span className="text-[10px] text-slate-400">Simulador + Contrato Online</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Escalabilidade</span>
                    <strong className="text-xs sm:text-sm text-slate-900 font-bold block mt-0.5">Nacional</strong>
                    <span className="text-[10px] text-slate-400">Venda em qualquer estado</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Simulação de carteira:</strong> Um consultor com 50 clientes residenciais e 5 empresas em sua carteira constrói uma receita previsível mensal contínua sem custos de estoque ou logística.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
