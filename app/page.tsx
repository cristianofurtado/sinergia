import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Simulator } from "@/components/sections/simulator";
import { Coverage } from "@/components/sections/coverage";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-navy-950 text-slate-100 selection:bg-solar-500 selection:text-navy-950">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Simulator />
        <Coverage />
        <Ecosystem />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
