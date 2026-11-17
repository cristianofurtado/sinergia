import Link from "next/link";
import { redirect } from "next/navigation";
import { canAccessPainel, getSessionUser } from "@/lib/auth";

const MENU_ITEMS = [
  { label: "Vídeos", href: "/painel?categoria=video" },
  { label: "Chats", href: "/painel?categoria=chat" },
  { label: "Documentos", href: "/painel?categoria=document" },
  { label: "Imagens e GIFs", href: "/painel?categoria=image" },
  { label: "Textos", href: "/painel?categoria=text" },
];

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (!canAccessPainel(user.role)) redirect("/aguardando-aprovacao");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#0e526c] text-white p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-sky-200 font-bold">
              Energia Prospectar
            </p>
            <p className="text-lg font-extrabold">Área Interna</p>
          </div>
          <nav className="flex md:flex-col gap-1.5 overflow-x-auto">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-sky-100 hover:bg-white/10 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {user.role === "admin" && (
              <Link
                href="/painel/admin"
                className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold text-amber-300 hover:bg-white/10 transition-colors md:mt-4"
              >
                Administração
              </Link>
            )}
          </nav>
        </div>
        <div className="pt-6 border-t border-white/15 text-xs text-sky-200 flex items-center justify-between gap-2">
          <div>
            <p className="font-semibold text-white">{user.name}</p>
            <p>{user.role}</p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
            >
              Sair
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
