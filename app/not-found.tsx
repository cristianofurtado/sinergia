import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-5 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wider text-[#0e526c]">
          Erro 404
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Página não encontrada
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          O endereço que você acessou não existe ou foi movido. Você pode voltar para a página inicial ou acessar nossos canais de contato.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-[#0e526c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0b4156] transition-colors"
          >
            Ir para a página inicial
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Falar com especialista
          </Link>
        </div>
      </div>
    </main>
  );
}
