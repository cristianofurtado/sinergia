"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquareText,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import type { UserRole } from "@/lib/auth";

interface NavUser {
  name: string;
  email: string;
  role: UserRole;
}

function PainelNav({
  user,
  onNavigate,
}: {
  user: NavUser;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/painel/admin") || pathname.startsWith("/admin");

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        <div className="flex items-center justify-center py-1">
          <Image
            src="/logo-energia-prospectar.webp"
            alt="Grupo Energia Prospectar"
            width={112}
            height={112}
            className="w-28 h-28 object-contain drop-shadow-sm"
          />
        </div>

        <nav aria-label="Menu da área interna" className="space-y-1.5">
          <Link
            href="/painel"
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition-colors ${
              !isAdminPage
                ? "bg-white text-[#0e526c] shadow-xs"
                : "text-sky-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <MessageSquareText className="w-4 h-4 shrink-0" />
            <span>Chat Colaboradores</span>
          </Link>

          {user.role === "admin" && (
            <Link
              href="/painel/admin"
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition-colors ${
                isAdminPage
                  ? "bg-amber-400 text-slate-950 shadow-xs"
                  : "text-amber-300 hover:bg-white/10"
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Administração</span>
            </Link>
          )}
        </nav>
      </div>

      <div className="pt-4 border-t border-white/15 space-y-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2 text-xs text-sky-200 hover:text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Voltar ao site público
        </Link>

        <div className="flex items-center justify-between gap-2 bg-white/10 rounded-xl p-3">
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{user.name}</p>
            <p className="text-[11px] text-sky-200 uppercase tracking-wider">{user.role}</p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              title="Sair"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PainelShell({
  user,
  children,
}: {
  user: NavUser;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Barra superior mobile */}
      <header className="lg:hidden sticky top-0 z-30 bg-[#0e526c] text-white px-4 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo-horizontal-dark.png"
            alt="Grupo Energia Prospectar"
            width={130}
            height={40}
            className="h-7 w-auto object-contain"
          />
          <span className="text-xs font-bold text-sky-100 truncate">
            Chat Colaboradores
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-50 w-72 max-w-[85vw] bg-[#0e526c] text-white p-5 h-full overflow-y-auto">
            <PainelNav user={user} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Sidebar fixa desktop */}
      <aside className="hidden lg:block w-64 shrink-0 bg-[#0e526c] text-white p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <PainelNav user={user} />
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 min-w-0 flex flex-col">{children}</main>
    </div>
  );
}
