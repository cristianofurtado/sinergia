import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { canAccessPainel, getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Área de Login | Energia Prospectar",
  description: "Acesso restrito para colaboradores e administradores da Energia Prospectar.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const user = await getSessionUser();
  if (user) {
    if (canAccessPainel(user.role)) redirect("/painel");
    if (user.role === "pendente") redirect("/aguardando-aprovacao");
  }

  const params = await searchParams;
  const hasError = Boolean(params.error);
  const isPending = params.status === "pending";

  return (
    <main className="min-h-screen bg-[#0b1322] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Coluna esquerda: marca */}
        <div className="bg-gradient-to-br from-white via-slate-50 to-sky-50 flex flex-col items-center justify-center p-10 sm:p-14 gap-6">
          <Image
            src="/logo-energia-prospectar.webp"
            alt="Grupo Energia Prospectar"
            width={240}
            height={240}
            priority
            className="w-52 h-52 sm:w-60 sm:h-60 object-contain drop-shadow-sm"
          />
          <span className="h-1 w-10 rounded-full bg-amber-500" aria-hidden="true" />
        </div>

        {/* Coluna direita: acesso */}
        <div className="bg-[#062756] text-white flex flex-col justify-center p-8 sm:p-12 space-y-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Área do Colaborador
            </h1>
            <p className="text-sm text-sky-200">
              Acesse com sua conta Google autorizada.
            </p>
          </div>

          {hasError && (
            <div
              role="alert"
              className="rounded-xl border border-red-400/40 bg-red-950/60 px-4 py-3 text-sm font-medium text-red-100"
            >
              Não foi possível entrar. Tente novamente ou fale com um administrador.
            </div>
          )}

          {isPending && (
            <div
              role="status"
              className="rounded-xl border border-amber-400/40 bg-amber-950/60 px-4 py-3 text-sm font-medium text-amber-100"
            >
              Sua conta está aguardando aprovação de um administrador.
            </div>
          )}

          <a
            href="/api/auth/google"
            className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-slate-800 hover:bg-slate-100 active:bg-slate-200 transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
              />
            </svg>
            Entrar com Google
          </a>

          <p className="text-xs text-sky-200/80 leading-relaxed">
            Ao entrar com Google, armazenamos apenas seu nome, e-mail e foto de perfil para controle de acesso, conforme nossa{" "}
            <Link href="/privacidade" className="text-white underline hover:text-amber-300">
              Política de Privacidade (LGPD)
            </Link>
            .
          </p>

          <div className="pt-1 text-center">
            <Link href="/" className="text-xs font-medium text-sky-200 hover:text-white transition-colors">
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-xs text-slate-400">
        Copyright © 2026 - Energia Prospectar
      </footer>
    </main>
  );
}
