import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Solutions } from "@/components/sections/solutions";
import { Methodology } from "@/components/sections/methodology";
import { Cases } from "@/components/sections/cases";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle selection:bg-brand-100 selection:text-brand-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <Solutions />
        <Methodology />
        <Cases />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

