"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Send,
  MapPin,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const [leadType, setLeadType] = useState<"client" | "partner">("client");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "BA",
    billAmount: "R$ 690,00",
  });
  const [submitted, setSubmitted] = useState(false);

  const teamMembers = [
    {
      name: "Cristiano Furtado",
      photo: "/cristiano-furtado.jpg",
      phoneRaw: "5571987822230",
      phoneDisplay: "+55 (71) 98782-2230",
      region: "Bahia & Região Nordeste",
      role: "Expansão & Mercado Livre de Energia",
      initials: "CF",
    },
    {
      name: "Renata Cereser",
      photo: null,
      phoneRaw: "5511972274060",
      phoneDisplay: "+55 (11) 97227-4060",
      region: "São Paulo & Região Sudeste",
      role: "Consultoria B2B & Residencial",
      initials: "RC",
    },
    {
      name: "Dani Fritzen",
      photo: null,
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
        : `Olá! Tenho interesse em atuar como parceiro/corretor de Venda de Energia da Sinergia.\nNome: ${formData.name}\nWhatsApp: ${formData.phone}\nE-mail: ${formData.email}\nEstado: ${formData.state}`;

    // Default contact: Cristiano Furtado
    const targetUrl = `https://wa.me/5571987822230?text=${encodeURIComponent(msg)}`;
    window.open(targetUrl, "_blank");
  };

  return (
    <section id="contato" className="py-20 bg-gradient-to-b from-white via-blue-50/40 to-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Especialistas em Venda de Energia
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Fale com nossa equipe de Venda de Energia
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Atendimento direto para economizar na sua fatura ou se cadastrar como corretor parceiro de energia.
          </p>
        </div>

        {/* 3 Dedicated Team Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-card hover:border-blue-400 hover:shadow-elevation transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Header with Photo/Avatar & Live Status */}
                <div className="flex items-center justify-between">
                  {member.photo ? (
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-sm shrink-0">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white font-black text-xl flex items-center justify-center shadow-sm shrink-0">
                      {member.initials}
                    </div>
                  )}

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online no WhatsApp
                  </div>
                </div>

                {/* Name & Region */}
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-amber-600 block">
                    {member.role}
                  </span>
                  <p className="text-xs text-slate-500 flex items-center gap-1 pt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    {member.region}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
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
                    className="w-full font-bold text-slate-950 shadow-xs hover:shadow"
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5 fill-slate-950" />
                    Falar no WhatsApp
                  </Button>
                </a>

                <a
                  href={`tel:${member.phoneDisplay.replace(/[^0-9+]/g, "")}`}
                  className="block text-center py-2 text-xs font-semibold text-slate-600 hover:text-blue-900 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                  {member.phoneDisplay}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Capture Form / Quick Inquiry */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-card space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">
              Prefere que a nossa equipe entre em contato?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Preencha o formulário abaixo e receba uma análise gratuita da sua fatura em até 1 hora.
            </p>
          </div>

          {/* Profile Switcher */}
          <div className="flex justify-center">
            <div className="p-1 bg-slate-100 rounded-xl border border-slate-200 inline-flex max-w-sm w-full">
              <button
                type="button"
                onClick={() => setLeadType("client")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  leadType === "client"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Quero Economizar na Fatura
              </button>
              <button
                type="button"
                onClick={() => setLeadType("partner")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  leadType === "partner"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Quero Vender Energia (Parceiro)
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">Mensagem Enviada!</h4>
              <p className="text-xs text-slate-600">
                Você foi redirecionado para o nosso WhatsApp oficial com o consultor Cristiano Furtado. Entraremos em contato em breve.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
                className="text-xs border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Enviar nova mensagem
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Nome / Empresa
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome ou Razão Social"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    WhatsApp com DDD
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(71) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Estado (UF)
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                  >
                    <option value="BA">BA (20%)</option>
                    <option value="SP">SP (15%)</option>
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
                  <label className="text-xs font-semibold text-slate-700">
                    Valor médio da conta de luz mensal
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: R$ 690,00 ou R$ 5.000,00"
                    value={formData.billAmount}
                    onChange={(e) => setFormData({ ...formData, billAmount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="solar"
                size="lg"
                className="w-full font-extrabold text-slate-950 py-4 shadow-sm hover:shadow text-base mt-2"
              >
                <Send className="w-4 h-4 mr-2 fill-slate-950" />
                ENVIAR DADOS & FALAR COM CONSULTOR
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Sigilo garantido pela LGPD
            </span>
            <span>•</span>
            <span>Sem taxas de adesão</span>
          </div>
        </div>
      </div>
    </section>
  );
}
