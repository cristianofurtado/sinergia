import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#0e526c] bg-[#072430] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 space-y-3.5">
            <Link href="#inicio" className="inline-block p-2 rounded-xl bg-white shadow-xs">
              <Image
                src="/logo-oficial.png"
                alt="Energia Prospectar"
                width={140}
                height={36}
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-sky-100/80 leading-relaxed max-w-sm">
              Plataforma de gestão de Energia e ecossistema para clientes B2B e consultores em todo o Brasil.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 pt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Conforme a Lei Federal nº 14.300/2022 (Marco Legal da GD)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#inicio" className="text-slate-300 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="text-slate-300 hover:text-white transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#tabela-descontos" className="text-slate-300 hover:text-white transition-colors">
                  Tabela de Descontos
                </a>
              </li>
              <li>
                <a href="#assine-energia" className="text-slate-300 hover:text-white transition-colors">
                  Assine sua Energia
                </a>
              </li>
              <li>
                <a href="#contato" className="text-slate-300 hover:text-white transition-colors">
                  Contato com a Equipe
                </a>
              </li>
            </ul>
          </div>

          {/* Consultores Regionais */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Especialistas em Energia
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <strong className="text-white block font-semibold">Cristiano Furtado</strong>
                <a href="tel:+5571987822230" className="text-sky-200 hover:text-white transition-colors">
                  +55 (71) 98782-2230 (BA / Nordeste)
                </a>
              </li>
              <li>
                <strong className="text-white block font-semibold">Renata Cereser</strong>
                <a href="tel:+5511972274060" className="text-sky-200 hover:text-white transition-colors">
                  +55 (11) 97227-4060 (SP / Sudeste)
                </a>
              </li>
              <li>
                <strong className="text-white block font-semibold">Dani Fritzen</strong>
                <a href="tel:+5551980584545" className="text-sky-200 hover:text-white transition-colors">
                  +55 (51) 98058-4545 (RS / Sul)
                </a>
              </li>
              <li>
                <strong className="text-white block font-semibold">Eliene Matos</strong>
                <a href="tel:+5511966413480" className="text-sky-200 hover:text-white transition-colors">
                  +55 (11) 96641-3480 (SP / Sudeste)
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Contact */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Canais Oficiais
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>contato@sinergia.tech</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Atendimento Nacional B2B & B2C</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {currentYear} Energia Prospectar. Todos os direitos reservados.</p>
          <p className="text-[11px] text-slate-400">
            Geração Distribuída e Mercado Livre de Energia Elétrica.
          </p>
        </div>
      </div>
    </footer>
  );
}
