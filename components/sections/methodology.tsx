import React from "react";
import { Search, Compass, GitMerge, Activity, Layers, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Methodology() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Diagnóstico & Descoberta",
      description:
        "Mapeamento detalhado dos fluxos de negócio, análise forense da arquitetura atual e identificação precisa de gargalos e riscos de segurança.",
    },
    {
      number: "02",
      icon: Compass,
      title: "Arquitetura & Especificação",
      description:
        "Definição de contratos tipados, modelagem de dados, prova de conceito (Spike) e planejamento com tarefas verificáveis antes de tocar no código.",
    },
    {
      number: "03",
      icon: GitMerge,
      title: "Desenvolvimento Guiado por Testes",
      description:
        "Ciclos curtos de entrega com TDD (Red-Green-Refactor), revisões independentes de código e automação total de integração e deploy contínuo.",
    },
    {
      number: "04",
      icon: Activity,
      title: "Observabilidade & Sustentação",
      description:
        "Telemetria em tempo real, métricas RED/USE, monitoramento de saúde dos sistemas e transferência de conhecimento para o seu time interno.",
    },
  ];

  return (
    <section id="metodologia" className="py-20 md:py-28 bg-surface-subtle border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section Header */}
        <div id="sobre" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-4">
            <Badge variant="brand">Sobre a Sinergia</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Engenharia soberana para acelerar o crescimento de negócios digitais
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              A Sinergia foi fundada com uma premissa clara: a tecnologia só tem valor real quando gera estabilidade, previsibilidade e velocidade para a operação da empresa.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Não atuamos como uma fábrica de software tradicional. Operamos como um parceiro estratégico de engenharia avançada, integrando arquitetos, especialistas em dados e desenvolvedores seniores diretamente aos objetivos centrais da sua liderança técnica.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-surface-border shadow-soft">
              <Layers className="w-8 h-8 text-brand-600 mb-3" />
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Aderência a padrões de código limpo e arquitetura desacoplada
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-surface-border shadow-soft">
              <Users2 className="w-8 h-8 text-brand-600 mb-3" />
              <div className="text-2xl font-bold text-slate-900">Seniores</div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Profissionais com vasta experiência em ecossistemas de missão crítica
              </div>
            </div>
          </div>
        </div>

        {/* Methodology Steps */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Nosso Método de Execução
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Um fluxo previsível e baseado em evidência empírica, do planejamento à operação contínua.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-surface-border p-6 shadow-soft flex flex-col justify-between hover:border-slate-300 transition-all duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                        <Icon className="w-5 h-5 text-brand-600" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        {step.number}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

