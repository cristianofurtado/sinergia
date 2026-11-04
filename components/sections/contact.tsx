"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Send,
  MapPin,
  CheckCircle2,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const [leadType, setLeadType] = useState<"client" | "partner">("client");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "SP",
    billAmount: "R$ 690,00",
  });
  const [submitted, setSubmitted] = useState(false);

  const teamMembers = [
    {
      name: "Renata Cereser",
      phoneRaw: "5511972274060",
      phoneDisplay: "+55 (11) 97227-4060",
      region: "São Paulo & Região Sudeste",
      role: "Consultoria B2B & Residencial",
      initials: "RC",
    },
    {
      name: "Cristiano Furtado",
      phoneRaw: "5571987822230",
      phoneDisplay: "+55 (71) 98782-2230",
      region: "Bahia & Região Nordeste",
      role: "Expansão & Mercado Livre",
      initials: "CF",
    },
    {
      name: "Dani Fritzen",
      phoneRaw: "5551980584545",
      phoneDisplay: "+55 (51) 98058-4545",
      region: "Rio Grande do Sul & Região Sul",
      role: "Parcerias, Corretores & Gestão",
      initials: "DF",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const msg =
      leadType === "client"
        ? `Olá! Gostaria de receber uma proposta de economia de energia da Sinergia.\nNome: ${formData.name}\nWhatsApp: ${formData.phone}\nE-mail: ${formData.email}\nEstado: ${formData.state}\nValor aproximado da fatura: ${formData.billAmount}`
        : `Olá! Tenho interesse em atuar como parceiro/corretor da Sinergia.\nNome: ${formData.name}\nWhatsApp: ${formData.phone}\nE-mail: ${formData.email}\nEstado: ${formData.state}`;

    // Default to Renata or Cristiano
    const targetUrl = `https://wa.me/5511972274060?text=${encodeURIComponent(msg)}`;
    window.open(targetUrl, "_blank");
  };

  return (
    <section id="contato" className="py-20 bg-navy-950 border-b border-navy-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-850 border border-solar-500/30 text-solar-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Especialistas em Venda de Energia
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Fale com nossa equipe de Venda de Energia
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Atendimento direto para economizar na sua fatura ou se cadastrar como corretor parceiro de energia.
          </p>
        </div>

        {/* 3 Dedicated Team Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="rounded-3xl border border-navy-700 bg-gradient-to-b from-navy-850 to-navy-900 p-6 sm:p-7 shadow-elevation hover:border-solar-500/60 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Header with Avatar & Live Status */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-solar-500 to-solar-orange text-navy-950 font-black text-lg flex items-center justify-center shadow-md">
                    {member.initials}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online no WhatsApp
                  </div>
                </div>

                {/* Name & Region */}
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-solar-400 transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs font-medium text-solar-300 block">
                    {member.role}
                  </span>
                  <p className="text-xs text-slate-400 flex items-center gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    {member.region}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2 border-t border-navy-800">
                <a
                  href={`https://wa.me/${member.phoneRaw}?text=${encodeURIComponent(
                    `Olá, ${member.name}! Gostaria de conversar sobre economia de energia e soluções da Sinergia.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="solar"
                    size="md"
                    className="w-full font-bold text-navy-950 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5 fill-navy-950" />
                    Falar no WhatsApp
                  </Button>
                </a>

                <a
                  href={`tel:${member.phoneDisplay.replace(/[^0-9+]/g, "")}`}
                  className="block text-center py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                  {member.phoneDisplay}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Capture Form / Quick Inquiry */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-navy-700 bg-navy-850 p-8 sm:p-10 shadow-elevation space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Prefere que a nossa equipe entre em contato?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Preencha o formulário abaixo e receba uma análise gratuita da sua fatura em até 1 hora.
            </p>
          </div>

          {/* Profile Switcher */}
          <div className="flex justify-center">
            <div className="p-1 bg-navy-950 rounded-xl border border-navy-700 inline-flex max-w-sm w-full">
              <button
                type="button"
                onClick={() => setLeadType("client")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  leadType === "client"
                    ? "bg-solar-500 text-navy-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Quero Economizar na Fatura
              </button>
              <button
                type="button"
                onClick={() => setLeadType("partner")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  leadType === "partner"
                    ? "bg-solar-500 text-navy-950 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Quero Vender Energia (Parceiro)
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="bg-navy-900 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Mensagem Enviada!</h4>
              <p className="text-xs text-slate-300">
                Você foi redirecionado para o nosso WhatsApp oficial. Um consultor entrará em contato em breve.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
                className="text-xs border-navy-700 text-slate-300"
              >
                Enviar nova mensagem
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Nome / Empresa
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome ou Razão Social"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-navy-700 bg-navy-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    WhatsApp com DDD
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-navy-700 bg-navy-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-navy-700 bg-navy-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Estado (UF)
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-navy-700 bg-navy-900 text-white focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm"
                  >
                    <option value="SP">SP (15%)</option>
                    <option value="BA">BA (20%)</option>
                    <option value="RS">RS (15%)</option>
                    <option value="MG">MG (26%)</option>
                    <option value="GO">GO (25%)</option>
                    <option value="MT">MT (25%)</option>
                    <option value="CE">CE (20%)</option>
                    <option value="PR">PR (16%)</option>
                    <option value="RJ">RJ (12% a 15%)</option>
                    <option value="SC">SC (15%)</option>
                    <option value="Outro">Outro Estado</option>
                  </select>
                </div>
              </div>

              {leadType === "client" && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Valor médio da conta de luz mensal
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: R$ 690,00 ou R$ 5.000,00"
                    value={formData.billAmount}
                    onChange={(e) => setFormData({ ...formData, billAmount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-navy-700 bg-navy-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-solar-500 text-sm"
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="solar"
                size="lg"
                className="w-full font-extrabold text-navy-950 py-4 shadow-glow text-base mt-2"
              >
                <Send className="w-4 h-4 mr-2 fill-navy-950" />
                ENVIAR DADOS & FALAR COM CONSULTOR
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-solar-400" />
              Sigilo garantido pela LGPD
            </span>
            <span>•</span>
            <span>Sem taxas ocultas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
