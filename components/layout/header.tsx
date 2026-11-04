"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Zap, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Venda Energia", href: "#venda-energia" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Simulador", href: "#simulador" },
    { label: "Cobertura", href: "#cobertura" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100/80 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo Oficial */}
          <Link href="#inicio" className="flex items-center shrink-0">
            <Image
              src="/logo-oficial.png"
              alt="Sinergia"
              width={150}
              height={40}
              priority
              className="h-8 sm:h-9 w-auto object-contain transition-opacity hover:opacity-90"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#simulador">
              <Button
                variant="solar"
                size="md"
                className="font-bold text-slate-950 shadow-xs hover:shadow"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                Simular Economia
              </Button>
            </a>
          </div>

          {/* Mobile Right Controls: Fast Simulator Button + Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <a href="#simulador" className="sm:inline-flex hidden">
              <Button variant="solar" size="sm" className="font-bold text-slate-950 text-xs px-3">
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                Simular
              </Button>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 bg-blue-50/80 border border-blue-200/80 hover:bg-blue-100 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 active:scale-95 transition-all"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] sm:top-[80px] z-50 lg:hidden bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-b border-blue-100 px-5 pt-4 pb-8 space-y-4 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1 divide-y divide-slate-100">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 text-base font-bold text-slate-800 hover:text-blue-700 active:bg-blue-50/60 rounded-lg px-2 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 space-y-2.5">
              <a
                href="#simulador"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button variant="solar" size="lg" className="w-full text-slate-950 font-black shadow-sm py-3.5">
                  <Zap className="w-4 h-4 fill-slate-950 mr-1.5" />
                  SIMULAR ECONOMIA NA CONTA
                </Button>
              </a>

              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 text-xs font-bold text-blue-700 bg-blue-50/80 rounded-xl border border-blue-200"
              >
                <Phone className="w-3.5 h-3.5 inline mr-1.5" />
                Falar com Consultores no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
