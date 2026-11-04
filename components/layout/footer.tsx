import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-oficial.png"
                alt="Sinergia"
                width={150}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Plataforma de economia de energia e ecossistema digital para clientes B2B, B2C, corretores e líderes em todo o Brasil.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-solar-500" />
              <span>Conforme Lei nº 14.300/2022 (Marco Legal da GD)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#energia" className="hover:text-slate-900 transition-colors">
                  Energia & Oportunidade
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-slate-900 transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-slate-900 transition-colors">
                  Simulador de Fatura
                </a>
              </li>
              <li>
                <a href="#estrutura" className="hover:text-slate-900 transition-colors">
                  Estrutura & Gestão
                </a>
              </li>
              <li>
                <a href="#cobertura" className="hover:text-slate-900 transition-colors">
                  Cobertura por Estado
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Soluções Sinergia
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1.5 font-semibold text-slate-900">
                <Zap className="w-3.5 h-3.5 text-solar-500" />
                Venda Energia (B2B/B2C)
              </li>
              <li>Venda Rastreamento</li>
              <li>Venda SaaS</li>
              <li>CRM de Prospecção</li>
              <li>Gestão & Comissões</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Atendimento
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>contato@sinergia.tech</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>+55 (11) 3280-9000</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>São Paulo — SP | Atendimento Nacional</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} SINERGIA. Todos os direitos reservados.</p>
          <p className="text-[11px] text-slate-400">
            Micro e Minigeração Distribuída e Mercado Livre de Energia.
          </p>
        </div>
      </div>
    </footer>
  );
}
