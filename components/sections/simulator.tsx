"use client";

import React, { useState, useId } from "react";
import Image from "next/image";
import {
  Calculator,
  ArrowRight,
  Zap,
  CheckCircle2,
  FileText,
  Wrench,
  Users,
  Percent,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Distributor {
  id: string;
  name: string;
  region: string;
  rate: number;
  rateLabel: string;
  state: string;
}

export const DISTRIBUTORS: Distributor[] = [
  { id: "destaque", name: "Destaque Oficial (Exemplo Promocional App)", region: "Nacional", rate: 215 / 690, rateLabel: "até 31%", state: "BR" },
  { id: "cemig-mg", name: "CEMIG MG", region: "Sudeste", rate: 0.26, rateLabel: "26%", state: "MG" },
  { id: "equatorial-go", name: "EQUATORIAL GO", region: "Centro-Oeste", rate: 0.25, rateLabel: "25%", state: "GO" },
  { id: "energisa-mt", name: "ENERGISA MT", region: "Centro-Oeste", rate: 0.25, rateLabel: "25%", state: "MT" },
  { id: "energisa-ms", name: "ENERGISA MS", region: "Centro-Oeste", rate: 0.23, rateLabel: "23%", state: "MS" },
  { id: "enel-ce", name: "ENEL CEARÁ", region: "Nordeste", rate: 0.20, rateLabel: "20%", state: "CE" },
  { id: "neoenergia-cosern", name: "NEOENERGIA COSERN", region: "Nordeste", rate: 0.18, rateLabel: "18%", state: "RN" },
  { id: "neoenergia-coelba", name: "NEOENERGIA COELBA", region: "Nordeste", rate: 0.18, rateLabel: "18%", state: "BA" },
  { id: "equatorial-al", name: "EQUATORIAL AL", region: "Nordeste", rate: 0.18, rateLabel: "18%", state: "AL" },
  { id: "equatorial-ma", name: "EQUATORIAL MA", region: "Nordeste", rate: 0.18, rateLabel: "18%", state: "MA" },
  { id: "equatorial-pi", name: "EQUATORIAL PI", region: "Nordeste", rate: 0.18, rateLabel: "18%", state: "PI" },
  { id: "equatorial-pa", name: "EQUATORIAL PA", region: "Norte", rate: 0.18, rateLabel: "18%", state: "PA" },
  { id: "neoenergia-celpe", name: "NEOENERGIA CELPE", region: "Nordeste", rate: 0.16, rateLabel: "16%", state: "PE" },
  { id: "cpfl-paulista", name: "CPFL PAULISTA", region: "Sudeste", rate: 0.15, rateLabel: "15%", state: "SP" },
  { id: "cpfl-santa-cruz", name: "CPFL SANTA CRUZ", region: "Sudeste/Sul", rate: 0.15, rateLabel: "15%", state: "SP/PR" },
  { id: "elektro", name: "ELEKTRO", region: "Sudeste/Centro-Oeste", rate: 0.15, rateLabel: "15%", state: "SP/MS" },
  { id: "cpfl-piratininga", name: "CPFL PIRATININGA", region: "Sudeste", rate: 0.15, rateLabel: "15%", state: "SP" },
  { id: "edp-es", name: "EDP ES", region: "Sudeste", rate: 0.15, rateLabel: "15%", state: "ES" },
  { id: "enel-rj", name: "ENEL RJ", region: "Sudeste", rate: 0.15, rateLabel: "15%", state: "RJ" },
  { id: "light-rj", name: "LIGHT RJ", region: "Sudeste", rate: 0.15, rateLabel: "15%", state: "RJ" },
  { id: "copel-pr", name: "COPEL PR", region: "Sul", rate: 0.15, rateLabel: "15%", state: "PR" },
  { id: "celesc-sc", name: "CELESC SC", region: "Sul", rate: 0.15, rateLabel: "15%", state: "SC" },
  { id: "rge-rs", name: "RGE RS", region: "Sul", rate: 0.15, rateLabel: "15%", state: "RS" },
  { id: "equatorial-ceee", name: "EQUATORIAL CEEE/RS", region: "Sul", rate: 0.15, rateLabel: "15%", state: "RS" },
  { id: "energisa-sul-sudeste", name: "ENERGISA SUL SUDESTE", region: "Sudeste/Sul", rate: 0.15, rateLabel: "15%", state: "SP/PR/MG" },
];

export function Simulator() {
  const [profile, setProfile] = useState<"b2c" | "b2b">("b2c");
  const [fatura, setFatura] = useState<number>(690);
  const [distributorId, setDistributorId] = useState<string>("destaque");
  const selectId = useId();

  const selectedDistributor =
    DISTRIBUTORS.find((d) => d.id === distributorId) || DISTRIBUTORS[0];

  // Specific calculation
  const discountRate = selectedDistributor.rate;
  const isDefaultReference = distributorId === "destaque" && fatura === 690;

  // Exact figures from reference image when on default R$ 690
  const economiaMes = isDefaultReference ? 215 : Math.round(fatura * discountRate);
  const novaFatura = isDefaultReference ? 475 : fatura - economiaMes;
  const economiaAno = isDefaultReference ? 2580 : economiaMes * 12;
  const economia5Anos = isDefaultReference ? 12900 : economiaAno * 5;

  const handleSelectDistributorFromTable = (id: string) => {
    setDistributorId(id);
    const element = document.getElementById("simulador-card");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="simulador"
      className="py-14 sm:py-20 bg-gradient-to-b from-blue-50/70 via-white to-blue-50/40 border-b border-blue-100 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/90 border border-blue-200 text-blue-800 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
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
        <div
          id="simulador-card"
          className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-blue-200/90 bg-white p-5 sm:p-9 shadow-card space-y-6 sm:space-y-7 relative"
        >
          {/* Profile Switcher */}
          <div className="flex justify-center">
            <div className="p-1 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 inline-flex w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setProfile("b2c");
                  if (fatura > 5000) setFatura(690);
                }}
                className={`flex-1 sm:flex-initial py-2 px-3 sm:px-6 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
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
                className={`flex-1 sm:flex-initial py-2 px-3 sm:px-6 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  profile === "b2b"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Para Minha Empresa (B2B)
              </button>
            </div>
          </div>

          {/* Region / Distributor Selector */}
          <div className="space-y-2 max-w-xl mx-auto">
            <div className="flex items-center justify-between">
              <label
                htmlFor={selectId}
                className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Selecione sua Concessionária / Região:
              </label>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                Desconto: {selectedDistributor.rateLabel}
              </span>
            </div>

            <div className="relative">
              <select
                id={selectId}
                value={distributorId}
                onChange={(e) => setDistributorId(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl border border-blue-200 bg-white text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-xs transition-all cursor-pointer"
              >
                <option value="destaque">
                  ★ Destaque Oficial Sinergia (Desconto Promocional do App)
                </option>
                <optgroup label="Região Sudeste & Centro-Oeste">
                  <option value="cemig-mg">CEMIG MG — 26% de desconto</option>
                  <option value="equatorial-go">EQUATORIAL GO — 25% de desconto</option>
                  <option value="energisa-mt">ENERGISA MT — 25% de desconto</option>
                  <option value="energisa-ms">ENERGISA MS — 23% de desconto</option>
                  <option value="cpfl-paulista">CPFL PAULISTA — 15% de desconto</option>
                  <option value="cpfl-santa-cruz">CPFL SANTA CRUZ — 15% de desconto</option>
                  <option value="cpfl-piratininga">CPFL PIRATININGA — 15% de desconto</option>
                  <option value="elektro">ELEKTRO (SP/MS) — 15% de desconto</option>
                  <option value="edp-es">EDP ES — 15% de desconto</option>
                  <option value="enel-rj">ENEL RJ — 15% de desconto</option>
                  <option value="light-rj">LIGHT RJ — 15% de desconto</option>
                  <option value="energisa-sul-sudeste">ENERGISA SUL SUDESTE — 15% de desconto</option>
                </optgroup>
                <optgroup label="Região Nordeste & Norte">
                  <option value="enel-ce">ENEL CEARÁ — 20% de desconto</option>
                  <option value="neoenergia-coelba">NEOENERGIA COELBA (BA) — 18% de desconto</option>
                  <option value="neoenergia-cosern">NEOENERGIA COSERN (RN) — 18% de desconto</option>
                  <option value="equatorial-al">EQUATORIAL AL — 18% de desconto</option>
                  <option value="equatorial-ma">EQUATORIAL MA — 18% de desconto</option>
                  <option value="equatorial-pi">EQUATORIAL PI — 18% de desconto</option>
                  <option value="equatorial-pa">EQUATORIAL PA — 18% de desconto</option>
                  <option value="neoenergia-celpe">NEOENERGIA CELPE (PE) — 16% de desconto</option>
                </optgroup>
                <optgroup label="Região Sul">
                  <option value="copel-pr">COPEL PR — 15% de desconto</option>
                  <option value="celesc-sc">CELESC SC — 15% de desconto</option>
                  <option value="rge-rs">RGE RS — 15% de desconto</option>
                  <option value="equatorial-ceee">EQUATORIAL CEEE/RS — 15% de desconto</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Slider & Input */}
          <div className="space-y-3 max-w-xl mx-auto pt-2">
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
              step={profile === "b2c" ? 10 : 500}
              value={fatura}
              onChange={(e) => setFatura(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 border border-slate-300"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>{profile === "b2c" ? "R$ 250" : "R$ 1.500"}</span>
              <span>{profile === "b2c" ? "R$ 1.500" : "R$ 25.000"}</span>
              <span>{profile === "b2c" ? "R$ 3.000+" : "R$ 50.000+"}</span>
            </div>
          </div>

          {/* Results Grid - Official Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
            <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/90 p-3.5 sm:p-4 text-center space-y-0.5">
              <span className="text-[11px] text-slate-500 font-medium block">
                Fatura com Sinergia
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 block font-mono">
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
              <span className="text-xl sm:text-2xl font-black text-amber-600 block font-mono">
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
              <span className="text-xl sm:text-2xl font-black text-blue-950 block font-mono">
                R$ {economiaAno.toLocaleString("pt-BR")},00
              </span>
              <span className="text-[10px] text-blue-600 font-semibold block">
                Em 5 anos: R$ {economia5Anos.toLocaleString("pt-BR")},00
              </span>
            </div>
          </div>

          {/* CTA Button to WhatsApp */}
          <div className="text-center pt-2">
            <a
              href={`https://wa.me/5571987822230?text=${encodeURIComponent(
                `Olá! Fiz uma simulação na Sinergia para fatura de R$ ${fatura.toLocaleString("pt-BR")},00 (${
                  profile === "b2c" ? "Residencial B2C" : "Empresarial B2B"
                }) na distribuidora ${selectedDistributor.name} (${selectedDistributor.rateLabel} de desconto) com economia estimada de R$ ${economiaAno.toLocaleString("pt-BR")},00/ano. Gostaria de solicitar minha adesão gratuita.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block sm:inline-block w-full sm:w-auto"
            >
              <Button
                variant="solar"
                size="lg"
                className="w-full sm:w-auto font-black text-slate-950 text-sm sm:text-base py-3.5 px-7 shadow-sm"
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

        {/* ------------------------------------------------------------- */}
        {/* OFFICIAL DISCOUNT TABLE (EXACT FIDELITY FROM ATTACHED IMAGE) */}
        {/* ------------------------------------------------------------- */}
        <div id="cobertura" className="scroll-mt-24" />
        <div
          id="tabela-descontos"
          className="rounded-3xl border border-blue-200 bg-white p-5 sm:p-10 shadow-card space-y-6 sm:space-y-8 scroll-mt-24"
        >
          {/* Header of the Official Table */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="flex justify-center">
              <Image
                src="/logo-oficial.png"
                alt="Sinergia"
                width={160}
                height={42}
                className="h-9 w-auto object-contain"
              />
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              CONFIRA A TABELA ATUALIZADA DE DESCONTOS PARA{" "}
              <span className="text-amber-500">NOVOS CLIENTES</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Descontos garantidos na conta de energia por distribuidora credenciada.
            </p>
          </div>

          {/* 2-Column Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 pt-2">
            {/* Column 1 */}
            <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2.5">
              {[
                { name: "ENEL CEARÁ", rate: "20%", id: "enel-ce" },
                { name: "NEOENERGIA COSERN", rate: "18%", id: "neoenergia-cosern" },
                { name: "NEOENERGIA COELBA", rate: "18%", id: "neoenergia-coelba" },
                { name: "NEOENERGIA CELPE", rate: "16%", id: "neoenergia-celpe" },
                { name: "EQUATORIAL AL", rate: "18%", id: "equatorial-al" },
                { name: "EQUATORIAL MA", rate: "18%", id: "equatorial-ma" },
                { name: "EQUATORIAL PI", rate: "18%", id: "equatorial-pi" },
                { name: "EQUATORIAL PA", rate: "18%", id: "equatorial-pa" },
                { name: "EQUATORIAL GO", rate: "25%", id: "equatorial-go" },
                { name: "ENERGISA MT", rate: "25%", id: "energisa-mt" },
                { name: "ENERGISA MS", rate: "23%", id: "energisa-ms" },
                { name: "ENERGISA SUL SUDESTE", rate: "15%", id: "energisa-sul-sudeste" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectDistributorFromTable(item.id)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                    distributorId === item.id
                      ? "bg-amber-100 border border-amber-300 font-bold"
                      : "hover:bg-white hover:shadow-2xs text-slate-800"
                  }`}
                >
                  <span className="font-bold text-slate-900 tracking-tight text-left">
                    {item.name}
                  </span>
                  <div className="flex-1 mx-2 sm:mx-3 border-b border-dotted border-slate-300" />
                  <span className="font-extrabold text-blue-900 shrink-0 font-mono text-sm sm:text-base">
                    {item.rate}
                  </span>
                </button>
              ))}
            </div>

            {/* Column 2 */}
            <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2.5">
              {[
                { name: "CEMIG MG", rate: "26%", id: "cemig-mg" },
                { name: "CPFL PAULISTA", rate: "15%", id: "cpfl-paulista" },
                { name: "CPFL SANTA CRUZ", rate: "15%", id: "cpfl-santa-cruz" },
                { name: "ELEKTRO", rate: "15%", id: "elektro" },
                { name: "CPFL PIRATININGA", rate: "15%", id: "cpfl-piratininga" },
                { name: "EDP ES", rate: "15%", id: "edp-es" },
                { name: "ENEL RJ", rate: "15%", id: "enel-rj" },
                { name: "LIGHT RJ", rate: "15%", id: "light-rj" },
                { name: "COPEL PR", rate: "15%", id: "copel-pr" },
                { name: "CELESC SC", rate: "15%", id: "celesc-sc" },
                { name: "RGE RS", rate: "15%", id: "rge-rs" },
                { name: "EQUATORIAL CEEE/RS", rate: "15%", id: "equatorial-ceee" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectDistributorFromTable(item.id)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                    distributorId === item.id
                      ? "bg-amber-100 border border-amber-300 font-bold"
                      : "hover:bg-white hover:shadow-2xs text-slate-800"
                  }`}
                >
                  <span className="font-bold text-slate-900 tracking-tight text-left">
                    {item.name}
                  </span>
                  <div className="flex-1 mx-2 sm:mx-3 border-b border-dotted border-slate-300" />
                  <span className="font-extrabold text-blue-900 shrink-0 font-mono text-sm sm:text-base">
                    {item.rate}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Broker Disclaimer */}
          <div className="p-4 rounded-xl bg-blue-50/90 border border-blue-200 text-center max-w-3xl mx-auto space-y-1">
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              A <strong>SINERGIA</strong> é uma corretora que conecta clientes e geradoras,
              conseguindo sempre o melhor desconto para você.
            </p>
            <p className="text-[11px] text-slate-500 italic">
              Os descontos apresentados nesta tabela são mínimos e podem ser maiores.
            </p>
          </div>

          {/* 4 Pillars Grid (From Image) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center gap-3.5 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0">
                <Percent className="w-5 h-5 text-amber-600 font-black" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-semibold uppercase block leading-tight">
                  Descontos de
                </span>
                <span className="text-sm sm:text-base font-black text-slate-900 block leading-tight">
                  ATÉ 26%
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  na sua conta de energia
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center gap-3.5 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-semibold uppercase block leading-tight">
                  Adesão 100%
                </span>
                <span className="text-sm sm:text-base font-black text-amber-600 block leading-tight">
                  GRATUITA
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  para todos os clientes
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center gap-3.5 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight uppercase">
                  SEM OBRAS
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight uppercase">
                  SEM INSTALAÇÕES
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  processo 100% digital
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center gap-3.5 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-semibold uppercase block leading-tight">
                  Atendimento em
                </span>
                <span className="text-sm sm:text-base font-black text-slate-900 block leading-tight">
                  24 ESTADOS
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  com geradoras parceiras
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}