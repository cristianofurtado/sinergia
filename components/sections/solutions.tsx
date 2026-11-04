import React from "react";
import { Code2, CloudCog, Bot, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Solutions() {
  const pillars = [
    {
      icon: Code2,
      tag: "Engenharia & Performance",
      title: "Desenvolvimento de Software Crítico",
      description:
        "Projetamos sistemas distribuídos de alta disponibilidade, APIs de baixa latência e interfaces modernas em React e TypeScript, seguindo princípios estritos de Clean Code e TDD.",
      capabilities: [
        "Microsserviços resilientes e desacoplados",
        "APIs RESTful e GraphQL estruturadas",
        "Aplicações web corporativas com React 19 / Next.js",
        "Testes automatizados com cobertura ampla",
      ],
    },
    {
      icon: CloudCog,
      tag: "Cloud & DevOps",
      title: "Arquitetura Cloud & Resiliência",
      description:
        "Infraestrutura moderna e elástica para sustentar crescimento sem gargalos operacionais. Implementamos pipelines CI/CD automatizados e observabilidade proativa.",
      capabilities: [
        "Kubernetes e orquestração de contêineres",
        "Pipelines automatizados de deploy contínuo",
        "Infraestrutura como Código (Terraform/IaC)",
        "Monitoramento em tempo real (APM e logs)",
      ],
    },
    {
      icon: Bot,
      tag: "Inteligência Artificial",
      title: "IA Aplicada & Agentes Autônomos",
      description:
        "Integração pragmática de inteligência artificial generativa, modelos de linguagem e agentes autônomos para automatizar fluxos de trabalho complexos e análise preditiva.",
      capabilities: [
        "Orquestração de agentes para processos operacionais",
        "Sistemas RAG para busca contextual inteligente",
        "Proteção contra vazamento de dados e prompt injection",
        "Modelos locais e integrações seguras via MCP",
      ],
    },
    {
      icon: RefreshCw,
      tag: "Modernização",
      title: "Modernização & Refatoração de Legados",
      description:
        "Evolução arquitetural sem paralisação da operação. Substituímos monolitos frágeis por arquiteturas modulares utilizando estratégias seguras de transição.",
      capabilities: [
        "Padrão Strangler Fig para migração incremental",
        "Eliminação sistemática de débitos técnicos",
        "Otimização de bancos de dados relacionais e NoSQL",
        "Alinhamento às exigências de conformidade e LGPD",
      ],
    },
  ];

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-white border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <Badge variant="brand">Nossos Pilares</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Soluções completas para transformar sua capacidade tecnológica
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Combinamos rigor de engenharia com velocidade de entrega para atender aos desafios mais exigentes do ecossistema B2B.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={index}
                hoverable
                className="flex flex-col justify-between p-8 space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                      <Icon className="w-6 h-6 text-brand-400" />
                    </div>
                    <Badge variant="default">{pillar.tag}</Badge>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    {pillar.capabilities.map((cap, capIdx) => (
                      <div key={capIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors">
                  <a href="#contato" className="inline-flex items-center gap-1.5">
                    Consultar viabilidade técnica
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

