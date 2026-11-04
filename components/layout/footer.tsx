import React from "react";
import Link from "next/link";
import { Cpu, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-surface-border text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                SINERGIA
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Engenharia de software de alto impacto, arquiteturas escaláveis em
              nuvem e soluções avançadas de inteligência artificial para médias e
              grandes empresas.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Governança técnica, conformidade e segurança por padrão.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-900 mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#sobre" className="hover:text-slate-900 transition-colors">
                  Sobre a Sinergia
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-slate-900 transition-colors">
                  Soluções & Pilares
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-slate-900 transition-colors">
                  Metodologia
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-slate-900 transition-colors">
                  Casos de Sucesso
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-slate-900 transition-colors">
                  Contato Institucional
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-900 mb-4">
              Padrões & Governança
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>Engenharia Ágil Baseada em Evidência</li>
              <li>Arquitetura Desacoplada & Clean Code</li>
              <li>SLA de Alta Disponibilidade (99.9%)</li>
              <li>Em conformidade com LGPD & OWASP</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {currentYear} Sinergia Tecnologia B2B. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Privacidade & Dados</span>
            <span>Termos de Uso</span>
            <span>Código de Ética</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

