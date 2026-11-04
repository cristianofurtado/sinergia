import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SÍNERGIA | Economia de Energia, Mercado Livre & Ecossistema de Gestão",
  description:
    "Economize de 10% a 30% na sua fatura de energia sem obras ou investimentos. Estrutura digital completa para clientes B2B, B2C, Corretores e Líderes.",
  keywords: [
    "Sinergia",
    "Economia de Energia",
    "Geração Distribuída",
    "Mercado Livre de Energia",
    "Energia Solar",
    "Redução de Conta de Luz",
    "Venda Energia",
    "Corretores de Energia",
    "Gestão B2B e B2C",
  ],
  authors: [{ name: "Sinergia" }],
  icons: {
    icon: "/sinergia-logo-vector.svg",
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://sinergia.tech",
    title: "SÍNERGIA | Economia de Energia & Oportunidade de Negócio",
    description:
      "Economize de 10% a 30% na fatura de energia. Sem obras, sem custo de adesão e 100% digital.",
    siteName: "Sinergia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth dark">
      <body className="min-h-screen bg-navy-900 text-slate-100 font-sans antialiased selection:bg-solar-500 selection:text-navy-950">
        {children}
      </body>
    </html>
  );
}
