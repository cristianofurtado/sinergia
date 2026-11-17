import Link from "next/link";
import { redirect } from "next/navigation";
import { canAccessPainel, getSessionUser } from "@/lib/auth";

export default async function AguardandoAprovacaoPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (canAccessPainel(user.role)) redirect("/painel");

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#0e526c]">
          Acesso em análise
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Seu login ({user.email}) foi registrado com sucesso, mas sua conta está com papel{" "}
          <strong>pendente</strong>. Aguarde a aprovação de um administrador para acessar o painel.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-[#0e526c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0b4156]"
        >
          Voltar ao site
        </Link>
      </div>
    </main>
  );
}
