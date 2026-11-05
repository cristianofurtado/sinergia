"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  FileText,
  Wrench,
  Users,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Simulator() {
  const column1 = [
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
  ];

  const column2 = [
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
  ];

  return (
    <section
      id="tabela-descontos"
      className="py-14 sm:py-20 bg-gradient-to-b from-[#284b63] via-[#1a4157] to-[#0e526c] border-b border-[#0e526c] relative overflow-hidden text-white"
    >
      {/* Anchor for backward compatibility with #simulador */}
      <div id="simulador" className="scroll-mt-24" />
      <div id="cobertura" className="scroll-mt-24" />

      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-radial from-[#0e526c]/40 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div
          className="rounded-3xl border border-white/20 bg-[#ffffff] text-slate-900 p-5 sm:p-10 shadow-2xl space-y-6 sm:space-y-8"
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
            <h3 className="text-xl sm:text-3xl font-black text-[#0e526c] tracking-tight uppercase">
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
            <div className="bg-[#f0f5f8] rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2">
              {column1.map((item) => (
                <a
                  key={item.id}
                  href={`https://wa.me/5571987822230?text=${encodeURIComponent(
                    `Olá! Gostaria de solicitar minha adesão gratuita com desconto na distribuidora ${item.name} (${item.rate} de desconto).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs sm:text-sm transition-all hover:bg-white hover:shadow-2xs text-slate-800 group"
                >
                  <span className="font-bold text-slate-900 tracking-tight text-left group-hover:text-[#0e526c]">
                    {item.name}
                  </span>
                  <div className="flex-1 mx-2 sm:mx-3 border-b border-dotted border-slate-300" />
                  <span className="font-extrabold text-[#0e526c] shrink-0 font-mono text-sm sm:text-base group-hover:text-amber-600">
                    {item.rate}
                  </span>
                </a>
              ))}
            </div>

            {/* Column 2 */}
            <div className="bg-[#f0f5f8] rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2">
              {column2.map((item) => (
                <a
                  key={item.id}
                  href={`https://wa.me/5571987822230?text=${encodeURIComponent(
                    `Olá! Gostaria de solicitar minha adesão gratuita com desconto na distribuidora ${item.name} (${item.rate} de desconto).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs sm:text-sm transition-all hover:bg-white hover:shadow-2xs text-slate-800 group"
                >
                  <span className="font-bold text-slate-900 tracking-tight text-left group-hover:text-[#0e526c]">
                    {item.name}
                  </span>
                  <div className="flex-1 mx-2 sm:mx-3 border-b border-dotted border-slate-300" />
                  <span className="font-extrabold text-[#0e526c] shrink-0 font-mono text-sm sm:text-base group-hover:text-amber-600">
                    {item.rate}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Broker Disclaimer */}
          <div className="p-4 rounded-xl bg-[#eaf2f5] border border-[#284b63]/20 text-center max-w-3xl mx-auto space-y-1">
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              A <strong>SINERGIA</strong> é uma corretora que conecta clientes e geradoras,
              conseguindo sempre o melhor desconto para você.
            </p>
            <p className="text-[11px] text-slate-500 italic">
              Os descontos apresentados nesta tabela são mínimos e podem ser maiores.
            </p>
          </div>

          {/* CTA Button to WhatsApp */}
          <div className="text-center pt-2">
            <a
              href="https://wa.me/5571987822230?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20minha%20ades%C3%A3o%20gratuita%20com%20desconto%20na%20conta%20de%20energia."
              target="_blank"
              rel="noopener noreferrer"
              className="block sm:inline-block w-full sm:w-auto"
            >
              <Button
                variant="solar"
                size="lg"
                className="w-full sm:w-auto font-black text-slate-950 text-sm sm:text-base py-3.5 px-7 shadow-md"
              >
                QUERO GARANTIR ESTE DESCONTO AGORA
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">
              ✓ Sem custos de adesão • Sem obras • Atendimento imediato por WhatsApp
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
