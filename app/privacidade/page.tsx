import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${SITE_INFO.name}`,
  description: `Política de Privacidade e conformidade com a LGPD da ${SITE_INFO.name}.`,
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6 shadow-sm">
        <h1 className="text-3xl font-extrabold text-[#0e526c]">
          Política de Privacidade (LGPD)
        </h1>
        <p className="text-slate-700 leading-relaxed">
          A {SITE_INFO.name} respeita a privacidade dos visitantes e atua em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
        </p>
        <h2 className="text-xl font-bold text-slate-900">
          1. Coleta de Dados no Site
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Este site institucional não possui formulários de captura de dados e não utiliza cookies de rastreamento publicitário. O contato comercial ocorre exclusivamente por iniciativa do usuário ao clicar nos links de WhatsApp ou telefone disponibilizados nas páginas.
        </p>
        <h2 className="text-xl font-bold text-slate-900">
          2. Operadores de Infraestrutura
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Para entrega segura e estável da aplicação, utilizamos os serviços da <strong>Vercel Inc.</strong> (hospedagem) e da <strong>Cloudflare, Inc.</strong> (DNS, CDN e proteção de borda), que podem processar registros técnicos de acesso (como endereço IP e cabeçalhos HTTP) estritamente para segurança e operação.
        </p>
        <h2 className="text-xl font-bold text-slate-900">
          3. Direitos do Titular
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Você pode solicitar confirmação de tratamento, acesso, correção ou eliminação de dados pessoais entrando em contato pelo nosso canal oficial: {SITE_INFO.primaryPhoneDisplay}.
        </p>
        <div className="pt-4">
          <Link href="/" className="text-sm font-semibold text-[#0e526c] hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
