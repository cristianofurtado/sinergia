import React from "react";
import { Mail, Phone, MapPin, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Comunicação Institucional",
      detail: "contato@sinergia.tech",
      description: "Para novas parcerias, solicitações comerciais e imprensa.",
      action: "mailto:contato@sinergia.tech",
      actionText: "Enviar mensagem por e-mail",
    },
    {
      icon: Phone,
      title: "Central de Relacionamento",
      detail: "+55 (11) 3280-9000",
      description: "Atendimento corporativo e suporte a parceiros vigentes.",
      action: "tel:+551132809000",
      actionText: "Ligar para a central",
    },
    {
      icon: MapPin,
      title: "Sede Corporativa",
      detail: "Avenida Paulista, São Paulo — SP",
      description: "Centro financeiro e tecnológico da América Latina.",
      action: "https://maps.google.com/?q=Avenida+Paulista+Sao+Paulo",
      actionText: "Visualizar no mapa",
    },
  ];

  return (
    <section id="contato" className="py-20 md:py-28 bg-surface-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <Badge variant="brand">Canais Oficiais</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Entre em contato com nossa liderança técnica
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Estamos prontos para entender seus desafios de engenharia e propor o caminho de maior impacto para sua operação.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactInfo.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                hoverable
                className="p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-brand-700 mt-1">
                      {item.detail}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={item.action}
                    target={item.action.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-slate-800 hover:text-brand-600 transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Office Hours & Corporate Notice */}
        <div className="mt-12 max-w-3xl mx-auto bg-white border border-surface-border rounded-xl p-6 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Clock className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                Horário de Atendimento Corporativo
              </div>
              <div className="text-xs text-slate-500">
                Segunda a Sexta-feira, das 09h00 às 18h00 (Horário de Brasília)
              </div>
            </div>
          </div>

          <a href="mailto:contato@sinergia.tech">
            <Button variant="primary" size="md">
              Iniciar Contato Direto
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

