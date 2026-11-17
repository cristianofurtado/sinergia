import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO, STATES_COVERAGE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Sobre | ${SITE_INFO.name}`,
  description: SITE_INFO.description,
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6 shadow-sm">
        <h1 className="text-3xl font-extrabold text-[#0e526c]">
          Sobre a {SITE_INFO.name}
        </h1>
        <p className="text-slate-700 leading-relaxed">
          A {SITE_INFO.name} é uma plataforma especializada em gestão inteligente de energia elétrica para empresas e consumidores em todo o Brasil. Nosso propósito é democratizar o acesso à energia renovável com economia real na fatura mensal, sem exigir obras, investimentos iniciais ou instalação de placas solares no imóvel.
        </p>
        <h2 className="text-xl font-bold text-slate-900">
          Modalidades de Economia
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Atuamos com <strong>Energia por Assinatura (Geração Distribuída)</strong>, na qual créditos de energia solar são injetados diretamente na rede da distribuidora local, e com <strong>Mercado Livre de Energia</strong>, oferecendo migração assistida e proteção contra bandeiras tarifárias para negócios com maior demanda energética.
        </p>
        <h2 className="text-xl font-bold text-slate-900">
          Cobertura Nacional
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Atualmente atendemos {STATES_COVERAGE.length} estados brasileiros com descontos que variam de 12% a 26% conforme a distribuidora local, além de contarmos com uma rede de especialistas regionais para atendimento consultivo direto.
        </p>
        <div className="pt-4 flex gap-4 text-sm font-semibold">
          <Link href="/" className="text-[#0e526c] hover:underline">
            Voltar para a página inicial
          </Link>
          <Link href="/contato" className="text-[#0e526c] hover:underline">
            Falar com um especialista
          </Link>
        </div>
      </div>
    </main>
  );
}
