"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SinergiaLogo } from "@/components/ui/sinergia-logo";

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
    <header className="sticky top-0 z-50 w-full border-b border-navy-800/80 bg-navy-950/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#inicio" className="flex items-center group">
            <SinergiaLogo variant="light" height={36} className="transition-transform group-hover:scale-102" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-solar-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#simulador">
              <Button variant="solar" size="md" className="font-bold text-navy-950 shadow-glow">
                <Zap className="w-4 h-4 fill-navy-950" />
                Simular Economia
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-navy-800/80 focus:outline-none focus:ring-2 focus:ring-solar-400"
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
        <div className="md:hidden border-b border-navy-800 bg-navy-950 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-solar-400 hover:bg-navy-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a href="#simulador" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="solar" size="md" className="w-full text-navy-950 font-bold shadow-glow">
                <Zap className="w-4 h-4 fill-navy-950" />
                Simular Economia
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
