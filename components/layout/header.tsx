"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Zap, ChevronRight, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock 100% of vertical and horizontal scrolling on mobile when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.touchAction = "none";
    } else {
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Venda Energia", href: "#venda-energia" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Simulador", href: "#simulador" },
    { label: "Tabela de Descontos", href: "#tabela-descontos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-100/80 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo Oficial */}
          <Link href="#inicio" className="flex items-center shrink-0">
            <Image
              src="/logo-oficial.png"
              alt="Sinergia"
              width={140}
              height={36}
              priority
              className="h-7 sm:h-8 lg:h-9 w-auto object-contain transition-opacity hover:opacity-90"
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
            <a href="#simulador" className="inline-flex">
              <Button
                variant="solar"
                size="sm"
                className="font-bold text-slate-950 text-xs px-2.5 py-1.5 h-9"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                Simular
              </Button>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-800 bg-blue-50/80 border border-blue-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 active:scale-95 transition-all h-9 w-9 flex items-center justify-center"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5 text-slate-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Menu (Completely Fills Device Screen, Zero Scroll Leak) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 w-screen h-screen h-[100dvh] z-[9999] bg-white flex flex-col justify-between overflow-hidden touch-none animate-in fade-in zoom-in-95 duration-200"
          style={{ overscrollBehavior: "none" }}
        >
          {/* Top Bar inside Fullscreen Menu */}
          <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-blue-100 bg-white shrink-0">
            <Link
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <Image
                src="/logo-oficial.png"
                alt="Sinergia"
                width={130}
                height={34}
                priority
                className="h-7 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 active:scale-95 transition-all h-9 w-9 flex items-center justify-center"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5 text-slate-900" />
            </button>
          </div>

          {/* Navigation Links List (Evenly spaced, large touchable rows, scrollable if screen is very small) */}
          <div className="flex-1 px-5 py-4 overflow-y-auto flex flex-col justify-center space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-3.5 rounded-xl text-base font-bold text-slate-800 hover:text-blue-700 hover:bg-blue-50/70 active:bg-blue-100/80 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-amber-500" />
              </a>
            ))}
          </div>

          {/* Bottom Actions inside Fullscreen Menu */}
          <div className="p-4 sm:p-5 border-t border-blue-100 bg-slate-50/90 space-y-2.5 shrink-0">
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button
                variant="solar"
                size="lg"
                className="w-full text-slate-950 font-black shadow-sm py-3 text-sm h-11"
              >
                <Zap className="w-4 h-4 fill-slate-950 mr-1.5" />
                SIMULAR ECONOMIA NA CONTA
              </Button>
            </a>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <a
                href="https://wa.me/5571987822230"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200 active:bg-emerald-100 h-10"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </a>

              <a
                href="tel:+5571987822230"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 font-bold text-blue-700 bg-blue-50 rounded-xl border border-blue-200 active:bg-blue-100 h-10"
              >
                <Phone className="w-3.5 h-3.5" />
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}