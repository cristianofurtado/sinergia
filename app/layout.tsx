import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sinergia | Engenharia, Inovação e Soluções Digitais B2B",
  description:
    "Transformamos desafios tecnológicos complexos em vantagem competitiva durável com engenharia de software de ponta, arquitetura cloud e IA aplicada.",
  keywords: [
    "Sinergia",
    "Engenharia de Software",
    "Cloud Architecture",
    "Inteligência Artificial B2B",
    "DevOps",
    "Consultoria Tecnológica",
    "Transformação Digital",
  ],
  authors: [{ name: "Sinergia Tecnologia" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://sinergia.tech",
    title: "Sinergia | Engenharia, Inovação e Soluções Digitais B2B",
    description:
      "Transformamos desafios tecnológicos complexos em vantagem competitiva durável com engenharia de software de ponta.",
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
      <body className="min-h-screen bg-surface-subtle text-slate-900 font-sans antialiased selection:bg-brand-100 selection:text-brand-900">
        {children}
      </body>
    </html>
  );
}
