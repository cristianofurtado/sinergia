import React from "react";
import { TrendingUp, Quote, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Cases() {
  const caseStudies = [
    {
      sector: "Fintech & Pagamentos",
      title: "Redução de 72% na latência e disponibilidade contínua",
      challenge:
        "Gargalo severo no processamento síncrono de transações bancárias e instabilidade sob picos de volume.",
      solution:
        "Reestruturação de microsserviços orientados a eventos, desacoplamento de banco de dados e testes de estresse automatizados.",
      metrics: [
        { label: "Latência média", value: "320ms → 88ms" },
        { label: "Uptime anual", value: "99.99%" },
      ],
      quote:
        "A engenharia da Sinergia elevou nossa confiabilidade a um patamar corporativo. A estabilidade no fechamento diário é exemplar.",
      client: "Diretoria de Tecnologia, Plataforma de Crédito B2B",
    },
    {
      sector: "Logística & Supply Chain",
      title: "Modernização de legado e triplicação de capacidade",
      challenge:
        "Sistema legado monolítico com alto custo de manutenção e risco crítico de falhas em datas sazonais.",
      solution:
        "Implementação do padrão Strangler Fig, migração progressiva para contêineres na nuvem e esteira CI/CD sem paradas.",
      metrics: [
        { label: "Volume suportado", value: "3.5x maior" },
        { label: "Tempo de deploy", value: "4h → 12min" },
      ],
      quote:
        "Conseguimos aposentar o sistema antigo sem parar a operação por um único minuto. Um marco na nossa história digital.",
      client: "Head de Arquitetura, Operador Logístico Nacional",
    },
    {
      sector: "Healthtech & Diagnóstico",
      title: "Agentes autônomos com segurança e compliance LGPD",
      challenge:
        "Necessidade de automação no processamento de exames e relatórios mantendo sigilo de dados sensíveis.",
      solution:
        "Pipeline de inteligência artificial com modelos locais, mascaramento de PII e auditoria de prompts em tempo real.",
      metrics: [
        { label: "Tempo de triagem", value: "-65%" },
        { label: "Vazamento de dados", value: "0 incidentes" },
      ],
      quote:
        "Inovação com responsabilidade. A Sinergia comprovou que é possível adotar IA avançada sem abrir mão da segurança.",
      client: "VP de Inovação, Rede Hospitalar e Laboratorial",
    },
  ];

  return (
    <section id="cases" className="py-20 md:py-28 bg-white border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <Badge variant="brand">Casos de Sucesso</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Resultados mensuráveis entregues a líderes de mercado
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Mais do que linhas de código: criamos soluções que geram impacto econômico e operacional direto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((item, idx) => (
            <Card
              key={idx}
              hoverable
              className="flex flex-col justify-between p-7 border-slate-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="default">{item.sector}</Badge>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Desafio:</strong> {item.challenge}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Solução:</strong> {item.solution}
                </p>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">
                  {item.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="bg-surface-subtle p-2.5 rounded-lg">
                      <div className="text-xs text-slate-500 font-medium">
                        {metric.label}
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 space-y-2">
                <Quote className="w-4 h-4 text-slate-300" />
                <p className="text-xs italic text-slate-600 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-[11px] font-semibold text-slate-800 pt-1">
                  — {item.client}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

