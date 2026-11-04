import React from "react";
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const metrics = [
    { value: "99.98%", label: "Disponibilidade de Sistemas", icon: ShieldCheck },
    { value: "4x", label: "Aceleração de Ciclos de Release", icon: Zap },
    { value: "+50M", label: "Transações Diárias Processadas", icon: TrendingUp },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-surface-subtle to-slate-50 border-b border-surface-border">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center">
            <Badge variant="brand" className="py-1 px-3 text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              Engenharia de Software & Inteligência Corporativa B2B
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Transformamos complexidade tecnológica em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-sky-700">
              vantagem competitiva
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Projetamos e construímos ecossistemas digitais escaláveis, arquiteturas
            cloud resilientes e soluções de IA aplicada para empresas que exigem excelência operacional.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <a href="#solucoes" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Explorar Nossas Soluções
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
            <a href="#contato" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Falar com a Equipe
              </Button>
            </a>
          </div>

          {/* Trust points */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Arquitetura Zero-Downtime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Governança & Segurança OWASP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Squads Dedicados Sênior</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-6 text-center shadow-soft hover:shadow-card transition-all duration-200"
              >
                <div className="inline-flex p-2.5 rounded-xl bg-slate-100 text-slate-900 mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-sm font-medium text-slate-500 mt-1">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

