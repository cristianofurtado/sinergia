"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Sobre", href: "#sobre" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Metodologia", href: "#metodologia" },
    { label: "Casos de Sucesso", href: "#cases" },
    { label: "Contato", href: "#contato" },
    { label: "5 Logos (400x150)", href: "/logos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border/80 bg-white/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-oficial.png"
              alt="Sinergia"
              width={160}
              height={43}
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
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#contato">
              <Button variant="primary" size="md">
                Fale Conosco
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
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
        <div className="md:hidden border-b border-surface-border bg-white px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a href="#contato" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Fale Conosco
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

