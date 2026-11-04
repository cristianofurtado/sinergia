"use client";

import React, { useState } from "react";
import { Zap, Users, ArrowRight, ShieldCheck, CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProspectingLead() {
  const [profileType, setProfileType] = useState<"client" | "partner">("client");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "SP",
    billAmount: "R$ 690,00",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message =
      profileType === "client"
        ? `Olá! Gostaria de receber uma proposta de economia de energia da Sinergia.\nNome: ${formData.name}\nWhatsApp: ${formData.phone}\nE-mail: ${formData.email}\nEstado: ${formData.state}\nValor aproximado da conta: ${formData.billAmount}`
        : `Olá! Tenho interesse em ser um Corretor/Parceiro Sinergia (Venda de Energia, SaaS e Rastreamento).\nNome: ${formData.name}\nWhatsApp: ${formData.phone}\nE-mail: ${formData.email}\nEstado: ${formData.state}`;

    const whatsappUrl = `https://wa.me/551132809000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="prospeccao" className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-elevation relative overflow-hidden">
          {/* Subtle accent border top */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-solar-500 via-solar-400 to-brand-blue" />

          {/* Section Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-widest uppercase text-solar-600 bg-solar-50 px-3 py-1 rounded-full border border-solar-200">
              PROSPECÇÃO B2B & B2C
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Solicite sua simulação sem compromisso
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Descubra em poucos minutos quanto você pode economizar ou como se tornar um parceiro oficial da Sinergia.
            </p>
          </div>

          {/* Type Selector Tabs */}
          <div className="flex justify-center mt-8 mb-8">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 max-w-md w-full">
              <button
                type="button"
                onClick={() => setProfileType("client")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  profileType === "client"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Zap className="w-4 h-4 text-solar-500" />
                Quero Economizar (B2B/B2C)
              </button>

              <button
                type="button"
                onClick={() => setProfileType("partner")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  profileType === "partner"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Users className="w-4 h-4 text-brand-blue" />
                Quero Ser Parceiro / Líder
              </button>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Solicitação Iniciada com Sucesso!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Você foi redirecionado para o nosso canal oficial do WhatsApp com sua simulação pré-preenchida. Nossa equipe técnica responderá prontamente.
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs"
              >
                Fazer nova solicitação
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Nome Completo / Empresa
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva ou Minha Empresa Ltda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm bg-slate-50 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    WhatsApp com DDD
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm bg-slate-50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    E-mail Corporativo ou Pessoal
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm bg-slate-50 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Estado (UF)
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm bg-slate-50 focus:bg-white transition-colors"
                  >
                    <option value="SP">SP (15%)</option>
                    <option value="MG">MG (26%)</option>
                    <option value="GO">GO (25%)</option>
                    <option value="MT">MT (25%)</option>
                    <option value="CE">CE (20%)</option>
                    <option value="BA">BA (20%)</option>
                    <option value="MS">MS (20%)</option>
                    <option value="RN">RN (18%)</option>
                    <option value="AL">AL (18%)</option>
                    <option value="MA">MA (18%)</option>
                    <option value="PI">PI (18%)</option>
                    <option value="PA">PA (18%)</option>
                    <option value="PE">PE (16%)</option>
                    <option value="PR">PR (16%)</option>
                    <option value="TO">TO (16%)</option>
                    <option value="SE">SE (16%)</option>
                    <option value="ES">ES (15%)</option>
                    <option value="SC">SC (15%)</option>
                    <option value="RS">RS (15%)</option>
                    <option value="RJ">RJ (12% a 15%)</option>
                  </select>
                </div>
              </div>

              {profileType === "client" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Valor Médio da Fatura de Energia Atual (R$)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: R$ 690,00 ou R$ 4.500,00"
                    value={formData.billAmount}
                    onChange={(e) => setFormData({ ...formData, billAmount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm bg-slate-50 focus:bg-white transition-colors"
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="solar"
                size="lg"
                className="w-full font-bold text-slate-950 py-4 shadow-md text-base mt-4"
              >
                {profileType === "client"
                  ? "SOLICITAR SIMULAÇÃO GRATUITA"
                  : "QUERO ME CADASTRAR COMO PARCEIRO"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-solar-600" />
                  Seus dados protegidos pela LGPD
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-brand-blue" />
                  Atendimento direto sem espera
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
