import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Coverage } from "@/components/sections/coverage";
import { ProspectingLead } from "@/components/sections/prospecting-lead";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-subtle selection:bg-solar-100 selection:text-solar-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Ecosystem />
        <Coverage />
        <ProspectingLead />
      </main>
      <Footer />
    </div>
  );
}
