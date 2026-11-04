"use client";

import React from "react";
import Image from "next/image";
import {
  Phone,
  MessageSquare,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const teamMembers = [
    {
      name: "Cristiano Furtado",
      photo: "/cristiano-furtado.jpg",
      phoneRaw: "5571987822230",
      phoneDisplay: "+55 (71) 98782-2230",
      region: "Bahia & Região Nordeste",
    },
    {
      name: "Renata Cereser",
      photo: "/renata-cereser.jpg",
      phoneRaw: "5511972274060",
      phoneDisplay: "+55 (11) 97227-4060",
      region: "São Paulo & Região Sudeste",
    },
    {
      name: "Dani Fritzen",
      photo: "/dani-fritzen.jpg",
      phoneRaw: "5551980584545",
      phoneDisplay: "+55 (51) 98058-4545",
      region: "Rio Grande do Sul & Região Sul",
    },
    {
      name: "Eliene Matos",
      photo: "/eliene-matos.jpg",
      phoneRaw: "5511966413480",
      phoneDisplay: "+55 (11) 96641-3480",
      region: "São Paulo & Região Sudeste",
    },
  ];

  return (
    <section
      id="contato"
      className="py-14 sm:py-20 bg-gradient-to-b from-[#0e526c] via-[#1a4157] to-[#284b63] text-white border-b border-[#0e526c] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
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
              className="rounded-2xl sm:rounded-3xl border border-white/20 bg-[#ffffff] text-slate-900 p-5 sm:p-6 shadow-2xl hover:border-amber-400 hover:shadow-elevation transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3 text-center">
                {/* Big Photo with Status Badge */}
                <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-400 shadow-md">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 112px, 128px"
                      className="object-cover"
                    />
                  </div>

                  {/* Online Badge */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[10px] font-bold shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </div>
                </div>

                {/* Name & Region */}
                <div className="space-y-0.5 pt-1">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0e526c]">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center justify-center gap-1 pt-0.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#0e526c] shrink-0" />
                    {member.region}
                  </p>
                </div>
              </div>

              {/* Action Buttons Inside Card */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
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
                    Conversar no WhatsApp
                  </Button>
                </a>

                <a
                  href={`tel:${member.phoneDisplay.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#f0f5f8] border border-slate-200 text-xs font-bold text-[#0e526c] hover:bg-[#eaf2f5] active:scale-98 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{member.phoneDisplay}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
