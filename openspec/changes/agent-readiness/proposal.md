# Proposal: Prontidão para Agentes (Is Agentic)

## Contexto
O site **Energia Prospectar** (`energiaprospectar.com.br`, Next.js 16.4.5) obteve nota **62/100** no scan *Is Agentic*. Embora o conteúdo comercial esteja completo na homepage, faltam primitivas essenciais de descoberta, negociação de conteúdo, metadados estruturados, páginas institucionais de confiança e testes automatizados.

## Problemas Confirmados no Código
1. **Sem negociação de Markdown nem 404 em Markdown:** ausência de `proxy.ts` (convenção do Next 16 que substitui `middleware.ts`) e de `app/not-found.tsx`.
2. **Hierarquia de títulos quebrada:** `<h1>` em `components/sections/hero.tsx:37` seguido diretamente de `<h3>` em `components/sections/hero.tsx:132` (pula `<h2>`); `<h4>` em `components/layout/footer.tsx:35,69,108` sem `<h2>`/`<h3>` precedentes.
3. **Ausência de descoberta e confiança:** sem JSON-LD (`application/ld+json`), sem `app/sitemap.ts`, sem `app/robots.ts`, sem `/llms.txt` e sem páginas `/sobre`, `/contato`, `/privacidade`.
4. **Metadados incompletos e domínio antigo:** `app/layout.tsx:29-32` ainda define `openGraph.url: "https://sinergia.tech"`; faltam `metadataBase`, `alternates.canonical` e `og:image`.
5. **Sem testes:** `package.json` não possui runner de testes.

## Escopo (Prioridade A–L)
- **A.** Negociação de conteúdo (`Accept: text/markdown`) na homepage e páginas novas, com `Vary: Accept`.
- **B.** `404` amigável em Markdown (via `proxy.ts` / Route Handler) e em HTML (`app/not-found.tsx`).
- **C.** Correção da hierarquia de títulos na homepage e rodapé sem alterar o visual.
- **D.** Correção de `metadataBase` (`https://energiaprospectar.com.br`), `canonical`, `og:type` e `og:image` (1200×630).
- **E.** JSON-LD (`Organization`/`LocalBusiness` + `Service`) na homepage com dados reais.
- **F.** `app/sitemap.ts` e `app/robots.ts` liberando agentes (`ChatGPT-User`, `OAI-SearchBot`, `Claude-User`, `PerplexityBot`) e convivência com Cloudflare.
- **G.** `/llms.txt` no formato `llmstxt.org` com seções `## Quando usar` e `## Quando não usar`.
- **H.** Páginas institucionais em português (`/sobre`, `/contato`, `/privacidade`) com ≥ 500 caracteres no HTML do servidor, e política de redirecionamento `308` para `/about`, `/contact`, `/privacy`.
- **I.** Suporte a `?mode=agent` na homepage devolvendo Markdown estruturado.
- **J.** Fonte única de dados (`lib/site-content.ts`) consumida por HTML, Markdown, JSON-LD e `llms.txt`.
- **K.** Estratégia de cache (`Vary: Accept`, `Cache-Control`) compatível com Vercel e Cloudflare.
- **L.** Suíte de testes com `@playwright/test` (modo `request` contra `next build && next start`).

## Fora de Escopo
- Alteração visual do layout atual.
- Criação de formulários de captura de leads (o site opera via links `wa.me` e `tel:`).
- Implementação de código nesta fase (este change é exclusivamente de especificação).
