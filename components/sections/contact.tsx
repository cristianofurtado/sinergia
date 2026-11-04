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
      role: "Expansão & Mercado Livre",
    },
    {
      name: "Renata Cereser",
      photo: "/renata-cereser.jpg",
      phoneRaw: "5511972274060",
      phoneDisplay: "+55 (11) 97227-4060",
      region: "São Paulo & Região Sudeste",
      role: "Consultoria B2B & Residencial",
    },
    {
      name: "Dani Fritzen",
      photo: "/dani-fritzen.jpg",
      phoneRaw: "5551980584545",
      phoneDisplay: "+55 (51) 98058-4545",
      region: "Rio Grande do Sul & Região Sul",
      role: "Parcerias & Corretores",
    },
    {
      name: "Eliene Matos",
      photo: "/eliene-matos.jpg",
      phoneRaw: "5511966413480",
      phoneDisplay: "+55 (11) 96641-3480",
      region: "São Paulo & Região Sudeste",
      role: "Consultoria Comercial & B2C",
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const msg =
      leadType === "client"
        ? `Olá! Gostaria de receber uma proposta de economia de energia da Sinergia.\nNome: ${formData.name}\nWhatsApp: ${formData.phone}\nE-mail: ${formData.email}\nEstado: ${formData.state}\nValor da fatura: ${formData.billAmount}`
        : `Olá! Tenho interesse em atuar como parceiro/corretor de Venda de Energia da Sinergia.\nNome: ${formData.name}\nWhatsApp: ${formData.phone}\nE-mail: ${formData.email}\nEstado: ${formData.state}`;

    // Default contact: Cristiano Furtado
    const targetUrl = `https://wa.me/5571987822230?text=${encodeURIComponent(msg)}`;
    window.open(targetUrl, "_blank");
  };

  return (
    <section
      id="contato"
      className="py-14 sm:py-22 bg-gradient-to-b from-[#0e526c] via-[#1a4157] to-[#284b63] text-white border-b border-[#0e526c] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-2.5 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            EQUIPE DE ESPECIALISTAS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Fale com nossa equipe de Energia
          </h2>
          <p className="text-sky-100 text-xs sm:text-sm leading-relaxed">
            Atendimento direto para economizar na sua fatura ou se cadastrar como corretor parceiro de energia.
          </p>
        </div>

        {/* Dedicated Team Contact Cards - Pure White for maximum contrast & crispness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl sm:rounded-3xl border border-white/20 bg-[#ffffff] text-slate-900 p-5 sm:p-6 shadow-2xl hover:border-amber-400 hover:shadow-elevation transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                {/* Header with Photo & Live Status */}
                <div className="flex items-center justify-between">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xs shrink-0">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 56px, 64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] sm:text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online no WhatsApp
                  </div>
                </div>

                {/* Name & Region */}
                <div className="space-y-0.5">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0e526c]">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-amber-600 block">
                    {member.role}
                  </span>
                  <p className="text-xs text-slate-500 flex items-center gap-1 pt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#0e526c] shrink-0" />
                    {member.region}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
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
                    className="w-full font-bold text-slate-950 py-3 text-xs sm:text-sm shadow-xs hover:shadow"
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5 fill-slate-950" />
                    Falar no WhatsApp
                  </Button>
                </a>

                <a
                  href={`tel:${member.phoneDisplay.replace(/[^0-9+]/g, "")}`}
                  className="block text-center py-1.5 text-xs font-semibold text-slate-600 hover:text-[#0e526c] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                  {member.phoneDisplay}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Capture Form - Crisp White Card */}
        <div className="max-w-2xl mx-auto rounded-2xl sm:rounded-3xl border border-white/20 bg-[#ffffff] text-slate-900 p-5 sm:p-8 shadow-2xl space-y-5">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0e526c]">
              Prefere que a nossa equipe entre em contato?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Preencha abaixo e receba uma análise da sua fatura em até 1 hora.
            </p>
          </div>

          {/* Profile Switcher */}
          <div className="flex justify-center">
            <div className="p-1 bg-[#f0f5f8] rounded-xl border border-slate-200 inline-flex w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setLeadType("client")}
                className={`flex-1 sm:flex-initial py-2 px-3 sm:px-4 rounded-lg text-xs font-bold transition-all ${
                  leadType === "client"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-[#0e526c]"
                }`}
              >
                Quero Economizar
              </button>
              <button
                type="button"
                onClick={() => setLeadType("partner")}
                className={`flex-1 sm:flex-initial py-2 px-3 sm:px-4 rounded-lg text-xs font-bold transition-all ${
                  leadType === "partner"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-slate-600 hover:text-[#0e526c]"
                }`}
              >
                Quero Ser Parceiro
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2.5">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">Mensagem Enviada!</h4>
              <p className="text-xs text-slate-600">
                Você foi redirecionado para o nosso WhatsApp com o consultor Cristiano Furtado. Responderemos prontamente.
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
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f0f5f8] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e526c] focus:bg-white text-xs sm:text-sm"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f0f5f8] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e526c] focus:bg-white text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f0f5f8] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e526c] focus:bg-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Estado (UF)
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f0f5f8] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e526c] focus:bg-white text-xs sm:text-sm cursor-pointer"
                  >
                    <option value="MG">MG — CEMIG (26%)</option>
                    <option value="GO">GO — Equatorial GO (25%)</option>
                    <option value="MT">MT — Energisa MT (25%)</option>
                    <option value="MS">MS — Energisa MS (23%)</option>
                    <option value="CE">CE — Enel CE (20%)</option>
                    <option value="BA">BA — Neoenergia Coelba (18%)</option>
                    <option value="RN">RN — Neoenergia Cosern (18%)</option>
                    <option value="AL">AL — Equatorial AL (18%)</option>
                    <option value="MA">MA — Equatorial MA (18%)</option>
                    <option value="PI">PI — Equatorial PI (18%)</option>
                    <option value="PA">PA — Equatorial PA (18%)</option>
                    <option value="PE">PE — Neoenergia Celpe (16%)</option>
                    <option value="SP">SP — CPFL / Elektro (15%)</option>
                    <option value="RJ">RJ — Light / Enel RJ (15%)</option>
                    <option value="ES">ES — EDP ES (15%)</option>
                    <option value="PR">PR — Copel (15%)</option>
                    <option value="SC">SC — Celesc (15%)</option>
                    <option value="RS">RS — RGE / Equatorial (15%)</option>
                    <option value="Outro">Outro Estado / Mercado Livre</option>
                  </select>
                </div>
              </div>

              {leadType === "client" && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Valor médio da conta de luz (R$)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: R$ 690,00 ou R$ 5.000,00"
                    value={formData.billAmount}
                    onChange={(e) => setFormData({ ...formData, billAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f0f5f8] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e526c] focus:bg-white text-xs sm:text-sm"
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="solar"
                size="lg"
                className="w-full font-extrabold text-slate-950 py-3.5 shadow-md hover:shadow-lg text-xs sm:text-sm mt-1"
              >
                <Send className="w-4 h-4 mr-1.5 fill-slate-950" />
                ENVIAR DADOS & FALAR COM CONSULTOR
              </Button>
            </form>
          )}

          <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0e526c]" />
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