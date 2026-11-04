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
    <section id="venda-energia" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div id="energia" />
      <div id="estrutura" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            VENDA DE ENERGIA
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Venda de Energia Sinergia
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Economia garantida na conta de luz para consumidores e receita mensal recorrente para consultores e parceiros autorizados em todo o Brasil.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-start">
          <div className="p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300 inline-flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("gd")}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "gd"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Home className="w-4 h-4 text-amber-500" />
              Geração Distribuída (Residencial e Comercial)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("acl")}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "acl"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-700" />
              Mercado Livre (Indústrias e Empresas)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("parceiros")}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "parceiros"
                  ? "bg-white text-slate-900 shadow-sm"
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  Energia Solar por Assinatura (B2C & PMEs)
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Desconto de até 26% na conta de luz sem gastar nada com obras
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Ideal para residências, condomínios, clínicas, lojas e restaurantes. Você se conecta a uma usina solar parceira da Sinergia e recebe créditos na sua fatura da distribuidora todo mês.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <Percent className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Desconto garantido todo mês</h4>
                    <p className="text-xs text-slate-600">Economia real de 10% a 26% sobre a tarifa de energia da sua concessionária.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Zero custo de adesão e sem placas</h4>
                    <p className="text-xs text-slate-600">Você não compra placas solares e não precisa de obras nem furos no telhado.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <FileCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Sem fidelidade para pessoas físicas</h4>
                    <p className="text-xs text-slate-600">Contrato 100% digital pelo celular e liberdade para cancelar quando quiser.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a href="#simulador">
                  <Button variant="solar" size="lg" className="font-bold text-slate-950 shadow-sm">
                    Simular Economia na Fatura
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-blue-200/90 bg-white p-8 shadow-card space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    Resumo da Venda de Energia GD
                  </h4>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Adesão Gratuita
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Público-alvo</span>
                    <strong className="text-sm text-slate-900 font-bold block mt-1">Residências e Comércios</strong>
                    <span className="text-[11px] text-slate-400">Faturas a partir de R$ 250</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Faixa de Desconto</span>
                    <strong className="text-sm text-amber-600 font-bold block mt-1">10% a 26% Líquido</strong>
                    <span className="text-[11px] text-slate-400">Dependendo do estado</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Investimento</span>
                    <strong className="text-sm text-emerald-600 font-bold block mt-1">R$ 0,00 (Zero)</strong>
                    <span className="text-[11px] text-slate-400">Sem taxa inicial</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Regulamentação</span>
                    <strong className="text-sm text-blue-900 font-bold block mt-1">Lei nº 14.300/22</strong>
                    <span className="text-[11px] text-slate-400">Marco Legal Nacional</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-600 leading-relaxed">
                  <strong>Como funciona:</strong> A energia gerada pelas usinas parceiras da Sinergia é injetada na rede da sua distribuidora e convertida em créditos automáticos na sua conta de luz.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "acl" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                  Ambiente de Contratação Livre (Mercado Livre B2B)
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Economia de até 30% para empresas de alta e média tensão
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Para indústrias, redes varejistas, supermercados e empresas do Grupo A. Compre energia limpa diretamente dos geradores com contratos de longo prazo, preço fixo e previsibilidade.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Blindagem contra bandeiras tarifárias</h4>
                    <p className="text-xs text-slate-600">Não pague bandeira amarela ou vermelha. Seu preço de energia é pré-fixado em contrato.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <Percent className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Redução de até 30% nos custos de energia</h4>
                    <p className="text-xs text-slate-600">Economia substancial no demonstrativo financeiro e balanço da sua empresa.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Migração assistida sem custos</h4>
                    <p className="text-xs text-slate-600">Nossa equipe cuida de toda a documentação com a CCEE e com a concessionária local.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a href="#contato">
                  <Button variant="solar" size="lg" className="font-bold text-slate-950 shadow-sm">
                    Solicitar Estudo de Viabilidade B2B
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-blue-200/90 bg-white p-8 shadow-card space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-700" />
                    Resumo do Mercado Livre (ACL)
                  </h4>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                    Grupo A (Alta Tensão)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Público-alvo</span>
                    <strong className="text-sm text-slate-900 font-bold block mt-1">Indústrias e Empresas</strong>
                    <span className="text-[11px] text-slate-400">Contas a partir de R$ 5.000</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Economia Estimada</span>
                    <strong className="text-sm text-blue-700 font-bold block mt-1">Até 30% na Geração</strong>
                    <span className="text-[11px] text-slate-400">Previsibilidade de orçamento</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Fonte Energética</span>
                    <strong className="text-sm text-emerald-600 font-bold block mt-1">100% Renovável</strong>
                    <span className="text-[11px] text-slate-400">Certificado I-REC / ESG</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Cobertura</span>
                    <strong className="text-sm text-slate-900 font-bold block mt-1">100% Nacional</strong>
                    <span className="text-[11px] text-slate-400">Todas as distribuidoras</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-600 leading-relaxed">
                  <strong>Vantagem competitiva:</strong> Liberdade para negociar fornecedor, volume e prazo contratual, reduzindo o impacto das tarifas reguladas pela Aneel.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "parceiros" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  Oportunidade para Corretores & Consultores
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Venda Energia e construa receita mensal recorrente
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Todo mundo paga conta de luz. Oferecer desconto sem obras e sem taxa de adesão é a venda mais rápida do mercado. E você recebe comissões todo mês enquanto o cliente economizar.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <Coins className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Comissões recorrentes vitalícias</h4>
                    <p className="text-xs text-slate-600">Ganhe porcentagem mensal sobre o consumo de faturas ativas em toda a sua carteira.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Produto de fácil aceitação</h4>
                    <p className="text-xs text-slate-600">O cliente não gasta nada para entrar e começa a economizar já na fatura seguinte.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Suporte e treinamento completo</h4>
                    <p className="text-xs text-slate-600">Materiais comerciais validados, esteira digital de assinatura e retaguarda com distribuidoras.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a href="#contato">
                  <Button variant="solar" size="lg" className="font-bold text-slate-950 shadow-sm">
                    Quero me Cadastrar como Consultor
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-emerald-200/90 bg-white p-8 shadow-card space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Coins className="w-5 h-5 text-emerald-600" />
                    Potencial de Ganhos em Energia
                  </h4>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Comissão Mensal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Tipo de Receita</span>
                    <strong className="text-sm text-emerald-700 font-bold block mt-1">Recorrente Mensal</strong>
                    <span className="text-[11px] text-slate-400">Paga todo mês</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Facilidade de Venda</span>
                    <strong className="text-sm text-slate-900 font-bold block mt-1">Adesão Gratuita</strong>
                    <span className="text-[11px] text-slate-400">Cliente só economiza</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Ferramentas</span>
                    <strong className="text-sm text-blue-700 font-bold block mt-1">Esteira Digital</strong>
                    <span className="text-[11px] text-slate-400">Simulador + Contrato Online</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-500 block">Escalabilidade</span>
                    <strong className="text-sm text-slate-900 font-bold block mt-1">Nacional</strong>
                    <span className="text-[11px] text-slate-400">Venda em qualquer estado</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-600 leading-relaxed">
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
