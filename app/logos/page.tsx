import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Galeria de Logos | Sinergia — 5 Propostas Oficiais (400x150px)",
  description:
    "5 opções conceituais profissionais no formato 400x150px com tema de energia e visão para o futuro.",
};

export default function LogosPage() {
  const logos = [
    {
      id: "logo-1",
      filename: "logo-1-kinetic-forward.svg",
      name: "Proposta 1: Kinetic Forward",
      tag: "Propulsão & Centelha",
      description:
        "Três chevrons aerodinâmicos convergentes que se aceleram para a direita formando uma centelha de energia contínua. Simboliza movimento ágil, entrega acelerada e visão de futuro.",
      colors: ["#0284C7 (Azul Cobalto)", "#2563EB (Azul Royal)", "#F59E0B (Âmbar Solar)"],
      focus: "Tecnologia, Inovação e Aceleração Digital",
    },
    {
      id: "logo-2",
      filename: "logo-2-solar-pulse.svg",
      name: "Proposta 2: Solar Pulse & Vision",
      tag: "Energia Solar & Horizonte",
      description:
        "Sol nascente minimalista integrado a um feixe de luz em perspectiva ascendente a 45 graus. Representa sustentabilidade limpa, visão de longo prazo e renovação contínua.",
      colors: ["#EA580C (Laranja Solar)", "#F59E0B (Âmbar)", "#0284C7 (Azul Horizonte)"],
      focus: "Energia Solar, Sustentabilidade e Transição Energética",
    },
    {
      id: "logo-3",
      filename: "logo-3-helix-synergy.svg",
      name: "Proposta 3: Helix Synergy",
      tag: "Loop Infinito & Transição",
      description:
        "Dois laços fluidos de energia renovável e tecnológica que se entrelaçam e culminam em uma seta apontada para a vanguarda. Expressa a sinergia entre forças complementares.",
      colors: ["#059669 (Verde Esmeralda)", "#10B981 (Menta)", "#0284C7 (Azul Tech)"],
      focus: "Consultoria, Sinergia B2B e ESG",
    },
    {
      id: "logo-4",
      filename: "logo-4-volt-horizon.svg",
      name: "Proposta 4: Volt Horizon",
      tag: "Alta Potência & Precisão",
      description:
        "Raio estilizado em corte de precisão geométrica chanfrada que rompe as barreiras do horizonte. Transmite força, alta tensão, segurança e capacidade de execução.",
      colors: ["#FBBF24 (Raio Dourado)", "#EA580C (Chama Laranja)", "#1E3A8A (Azul Marinho)"],
      focus: "Engenharia Pesada, Eficiência Energética e Infraestrutura",
    },
    {
      id: "logo-5",
      filename: "logo-5-apex-momentum.svg",
      name: "Proposta 5: Apex Momentum",
      tag: "Velocidade & Liderança",
      description:
        "Três lâminas angulares de propulsão com alturas progressivas que criam um vetor de avanço contínuo. Ideal para marcas que se posicionam como pioneiras na vanguarda do setor.",
      colors: ["#0284C7 (Ciano)", "#2563EB (Azul Profundo)", "#6366F1 (Índigo Tecnológico)"],
      focus: "Inovação Corporativa, Inteligência Artificial e Vanguarda",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para a Página Principal
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Galeria de Identidade Visual: 5 Logos Sinergia
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Formato exato <strong>400x150px</strong> em vetor SVG de alta precisão com tema de <em>energia</em> e <em>olhar para a frente</em>.
            </p>
          </div>
          <Badge variant="brand" className="py-1.5 px-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 mr-1" />
            Vetor SVG Nítido
          </Badge>
        </div>

        {/* Official Brand Logo */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Identidade Oficial Ativa
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">
                Logo Oficial Sinergia
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Arquivo fonte: <code>/dados/Projetos/Sinergia/logo-oficial.png</code> (1695×452px RGBA)
              </p>
            </div>
            <a
              href="/logo-oficial.png"
              download="logo-oficial.png"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-lg transition-colors font-medium self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              Baixar Logo Oficial (PNG HD)
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-2">
            <div className="bg-white p-6 rounded-xl flex items-center justify-center shadow-inner">
              <img
                src="/logo-oficial.png"
                alt="Logo Oficial Sinergia"
                className="max-h-14 w-auto object-contain"
              />
            </div>
            <div className="bg-slate-950 p-6 rounded-xl flex items-center justify-center border border-slate-800">
              <img
                src="/logo-oficial.png"
                alt="Logo Oficial Sinergia (Dark)"
                className="max-h-14 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Logos Grid */}
        <div className="space-y-12">
          {logos.map((logo, index) => (
            <div
              key={logo.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Title & Tags */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{index + 1}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900">
                      {logo.name}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{logo.focus}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="default">{logo.tag}</Badge>
                  <a
                    href={`/logos/${logo.filename}`}
                    download={logo.filename}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Baixar SVG (400x150)
                  </a>
                </div>
              </div>

              {/* Display Canvas 400x150 preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Canvas Fundo Claro */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
                    <span>Fundo Claro (Original 400x150px):</span>
                    <span className="font-mono text-[11px] text-slate-400">
                      400 × 150 px
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-center p-4 bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden shadow-inner">
                    <img
                      src={`/logos/${logo.filename}`}
                      alt={logo.name}
                      width={400}
                      height={150}
                      className="max-w-full h-auto drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Canvas Fundo Escuro / Modo Noturno */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
                    <span>Fundo Escuro / Contraste:</span>
                    <span className="font-mono text-[11px] text-slate-400">
                      Teste de Contraste
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-center p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                    <img
                      src={`/logos/${logo.filename}`}
                      alt={logo.name}
                      width={400}
                      height={150}
                      className="max-w-full h-auto filter contrast-125"
                    />
                  </div>
                </div>
              </div>

              {/* Rationale and Color Palette */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
                <div className="space-y-1 max-w-xl">
                  <strong className="text-slate-900 block font-semibold">
                    Conceito &amp; Simbologia:
                  </strong>
                  <p className="leading-relaxed">{logo.description}</p>
                </div>
                <div className="space-y-1 shrink-0">
                  <strong className="text-slate-900 block font-semibold">
                    Paleta de Cores:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {logo.colors.map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-white border border-slate-200 px-2 py-0.5 rounded font-mono text-[11px]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="text-center pt-8 border-t border-slate-200 text-xs text-slate-500">
          Arquivos salvos em:{" "}
          <code className="bg-slate-200/80 px-2 py-1 rounded text-slate-800 font-mono">
            /jogos/Antigravity/Antigravity IDE/sinergia/public/logos/
          </code>
        </div>
      </div>
    </div>
  );
}

