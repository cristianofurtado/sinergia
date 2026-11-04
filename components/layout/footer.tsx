import React from "react";
import Link from "next/link";
import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import { SinergiaLogo } from "@/components/ui/sinergia-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-800 bg-navy-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#inicio" className="inline-block">
              <SinergiaLogo variant="light" height={36} />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Plataforma de economia de energia e ecossistema de gestão para clientes B2B, B2C, corretores e líderes em todo o território nacional.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-solar-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-solar-400" />
              <span>Conforme a Lei Federal nº 14.300/2022 (Marco Legal da GD)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="hover:text-solar-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#energia" className="hover:text-solar-400 transition-colors">
                  Venda Energia
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-solar-400 transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-solar-400 transition-colors">
                  Simulador de Economia
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-solar-400 transition-colors">
                  Contato com a Equipe
                </a>
              </li>
            </ul>
          </div>

          {/* Consultoria Regional */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Especialistas
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <strong className="text-white block font-semibold">Renata Cereser</strong>
                <a href="tel:+5511972274060" className="hover:text-solar-400 transition-colors">
                  +55 (11) 97227-4060 (SP / Sudeste)
                </a>
              </li>
              <li>
                <strong className="text-white block font-semibold">Cristiano Furtado</strong>
                <a href="tel:+5571987822230" className="hover:text-solar-400 transition-colors">
                  +55 (71) 98782-2230 (BA / Nordeste)
                </a>
              </li>
              <li>
                <strong className="text-white block font-semibold">Dani Fritzen</strong>
                <a href="tel:+5551980584545" className="hover:text-solar-400 transition-colors">
                  +55 (51) 98058-4545 (RS / Sul)
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Canais Oficiais
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-solar-400" />
                <span>contato@sinergia.tech</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-solar-400 shrink-0 mt-0.5" />
                <span>Atendimento Nacional B2B & B2C</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} SÍNERGIA. Todos os direitos reservados.</p>
          <p className="text-[11px] text-slate-500">
            Geração Distribuída e Mercado Livre de Energia Elétrica.
          </p>
        </div>
      </div>
    </footer>
  );
}
