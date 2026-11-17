import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO, TEAM_MEMBERS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Contato | ${SITE_INFO.name}`,
  description: `Fale com os especialistas regionais da ${SITE_INFO.name} via WhatsApp ou telefone.`,
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6 shadow-sm">
        <h1 className="text-3xl font-extrabold text-[#0e526c]">
          Contato — {SITE_INFO.name}
        </h1>
        <p className="text-slate-700 leading-relaxed">
          Nosso atendimento é realizado diretamente por especialistas regionais via WhatsApp e telefone, garantindo análise rápida da sua conta de luz e proposta personalizada sem burocracia.
        </p>
        <h2 className="text-xl font-bold text-slate-900">
          Atendimento Principal
        </h2>
        <p className="text-slate-700">
          Telefone / WhatsApp:{" "}
          <a
            href={`https://wa.me/${SITE_INFO.primaryPhoneRaw}`}
            className="font-semibold text-[#0e526c] hover:underline"
          >
            {SITE_INFO.primaryPhoneDisplay}
          </a>
        </p>
        <h2 className="text-xl font-bold text-slate-900">
          Especialistas Regionais
        </h2>
        <ul className="space-y-3 text-slate-700">
          {TEAM_MEMBERS.map((member) => (
            <li key={member.phoneRaw} className="border-b border-slate-100 pb-2">
              <strong>{member.name}</strong> ({member.region}) —{" "}
              <a
                href={`https://wa.me/${member.phoneRaw}`}
                className="text-[#0e526c] hover:underline"
              >
                {member.phoneDisplay}
              </a>
            </li>
          ))}
        </ul>
        <div className="pt-4 flex gap-4 text-sm font-semibold">
          <Link href="/" className="text-[#0e526c] hover:underline">
            Voltar para a página inicial
          </Link>
          <Link href="/sobre" className="text-[#0e526c] hover:underline">
            Sobre a empresa
          </Link>
        </div>
      </div>
    </main>
  );
}
