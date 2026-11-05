import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sinergia | Assine sua Energia, Mercado Livre & Gestão Inteligente",
  description:
    "Plataforma de gestão de Energia e ecossistema para clientes B2B e consultores em todo o Brasil. Economize de 10% a 30% na conta de luz sem obras ou investimentos.",
  keywords: [
    "Sinergia",
    "Assine sua Energia",
    "Economia na Conta de Luz",
    "Receba Créditos de Energia Solar",
    "Geração Distribuída",
    "Mercado Livre de Energia",
    "Energia Solar por Assinatura",
    "Desconto na Conta de Luz",
    "Consultores de Energia",
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
    title: "Sinergia | Assinatura de Energia & Economia na Conta de Luz",
    description:
      "Plataforma de gestão de Energia e ecossistema para clientes B2B e consultores em todo o Brasil.",
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
