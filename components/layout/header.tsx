"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Venda Energia", href: "#energia" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Simulador", href: "#simulador" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Antigo Oficial */}
          <Link href="#inicio" className="flex items-center group">
            <Image
              src="/logo-oficial.png"
              alt="Sinergia"
              width={165}
              height={44}
              priority
              className="h-10 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#simulador">
              <Button
                variant="solar"
                size="md"
                className="font-bold text-slate-950 shadow-sm hover:shadow"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                Simular Economia
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:text-blue-900 hover:bg-blue-50/60 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a href="#simulador" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="solar" size="md" className="w-full text-slate-950 font-bold shadow-sm">
                <Zap className="w-4 h-4 fill-slate-950" />
                Simular Economia
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
