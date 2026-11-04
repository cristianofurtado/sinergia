import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sinergia | Venda de Energia, Mercado Livre & Economia na Fatura",
  description:
    "Economize de 10% a 30% na conta de luz sem obras ou investimentos. Estrutura digital completa de Venda de Energia para clientes B2B, B2C, Corretores e Líderes.",
  keywords: [
    "Sinergia",
    "Venda de Energia",
    "Economia de Energia",
    "Geração Distribuída",
    "Mercado Livre de Energia",
    "Energia Solar por Assinatura",
    "Desconto na Conta de Luz",
    "Corretores de Energia",
  ],
  authors: [{ name: "Sinergia" }],
  icons: {
    icon: "/logo-oficial.png",
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://sinergia.tech",
    title: "Sinergia | Venda de Energia & Economia na Fatura",
    description:
      "Economize de 10% a 30% na fatura de energia sem obras e 100% digital.",
    siteName: "Sinergia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
