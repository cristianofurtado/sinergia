# Design: Prontidão para Agentes (Next.js 16)

Todas as decisões abaixo seguem a documentação local do Next.js 16 em `node_modules/next/dist/docs/`.

## 1. Negociação de Conteúdo, `?mode=agent` e `404` em Markdown
- **Referência Next 16:** `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` (em Next 16, `middleware.ts` foi depreciado e substituído por `proxy.ts` na raiz do projeto, exportando `export function proxy(request: NextRequest)`).
- **Decisão:**
  - Criar `proxy.ts` na raiz para inspecionar `Accept` e `searchParams.get("mode")`.
  - **Parser de `Accept`:** função pura em `lib/accept-markdown.ts` que extrai os quality values (`q`) de `text/markdown` e `text/html`. Retorna `true` quando `text/markdown` está presente e (`q(text/markdown) > q(text/html)` ou `text/html` ausente), ou quando `?mode=agent` está presente na homepage.
  - **Rotas válidas (`/`, `/sobre`, `/contato`, `/privacidade`):**
    - Se preferir Markdown (ou `?mode=agent` em `/`): `NextResponse.rewrite(new URL('/api/markdown?path=...', request.url))` ou resposta direta via Route Handler (`app/api/markdown/route.ts` — ref: `01-app/01-getting-started/15-route-handlers.md`), retornando `200`, `Content-Type: text/markdown; charset=utf-8` e `Vary: Accept`.
    - Se navegador (`text/html`): `NextResponse.next()` adicionando o header `Vary: Accept`.
  - **Rotas inexistentes:**
    - Para manter o status `404` sempre: se `Accept` preferir Markdown, o `proxy.ts` reescreve para `/api/markdown?notFound=1` (ou responde diretamente com status `404`, `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, explicação ≥ 20 caracteres e links para `/`, `/llms.txt` e `/sitemap.xml`).
    - Se navegador, deixa o Next.js renderizar `app/not-found.tsx` (ref: `01-app/03-api-reference/03-file-conventions/not-found.md`), que retorna status `404` em HTML com o visual do site.

## 2. Fonte Única de Conteúdo (`lib/site-content.ts`)
- Hoje os dados de estados/descontos, equipe de especialistas e telefones estão duplicados dentro de `components/sections/coverage.tsx`, `components/sections/contact.tsx`, `components/sections/simulator.tsx` e `components/layout/footer.tsx`.
- Extrair para `lib/site-content.ts` (dados tipados) e `lib/markdown-renderer.ts` (gera o Markdown de cada rota, incluindo `/llms.txt`).
- Assim, HTML, Markdown (`Accept: text/markdown` e `?mode=agent`), JSON-LD e `/llms.txt` consomem exatamente a mesma fonte.

## 3. Hierarquia de Títulos (Sem Mudança Visual)
- `components/sections/hero.tsx:37` (`<h1>`) → `components/sections/hero.tsx:132` (`<h3>` passa para `<h2>` mantendo as mesmas classes Tailwind).
- `components/layout/footer.tsx:35,69,108`: os `<h4>` de navegação/contato passam para `<p>` com as mesmas classes (`text-xs font-bold text-white uppercase tracking-wider`), pois são rótulos visuais de coluna, não seções de documento.

## 4. Metadata, OpenGraph e `og:image`
- **Referência Next 16:** `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md` e `01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md`.
- Em `app/layout.tsx`:
  - Definir `metadataBase: new URL("https://energiaprospectar.com.br")`.
  - Corrigir `openGraph.url` de `https://sinergia.tech` para `"/"` (resolvido via `metadataBase`).
  - Definir `alternates: { canonical: "./" }` por página.
  - Adicionar `app/opengraph-image.png` (1200×630 estático) ou `app/opengraph-image.tsx`, garantindo `og:image` 1200×630 automático pelo Next.js.

## 5. JSON-LD (`schema.org`)
- Injetar `<script type="application/ld+json">` em `app/page.tsx` usando dados reais de `lib/site-content.ts`:
  - `Organization` (ou `LocalBusiness` caso o cliente confirme endereço físico de atendimento): `name`, `url`, `logo`, `description`, `contactPoint` (telefone e `contactType: "customer service"`), `address` (`PostalAddress`, se confirmado), `sameAs`, `knowsAbout` (`["Energia por assinatura", "Geração distribuída", "Mercado Livre de Energia"]`).
  - `Service`: `serviceType` e `areaServed` (lista de estados atendidos).

## 6. Sitemap, Robots e `llms.txt`
- **Referência Next 16:** `01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md` e `robots.md`.
- `app/sitemap.ts`: retorna `MetadataRoute.Sitemap` com `/`, `/sobre`, `/contato`, `/privacidade` e `lastModified`.
- `app/robots.ts`: retorna `MetadataRoute.Robots` apontando `sitemap: "https://energiaprospectar.com.br/sitemap.xml"` e liberando `User-Agent: *` além de regras explícitas para `ChatGPT-User`, `OAI-SearchBot`, `Claude-User` e `PerplexityBot`.
  - *Convivência com Cloudflare:* o Cloudflare pode injetar regras no topo do `robots.txt` se o "Managed robots.txt" / "AI Crawl Control" estiver ativo. É necessário desativar o bloqueio automático de bots de IA no painel do Cloudflare ou configurar `Allow` para esses User-Agents, para não sobrescrever a política do `app/robots.ts`.
- `app/llms.txt/route.ts` (ou `public/llms.txt`): formato `llmstxt.org` (`# Energia Prospectar`, blockquote resumo, seções com links, `## Quando usar` e `## Quando não usar`).

## 7. Páginas de Confiança e Redirecionamentos
- Criar `app/sobre/page.tsx`, `app/contato/page.tsx` e `app/privacidade/page.tsx` em português, renderizadas no servidor (RSC) com ≥ 500 caracteres de conteúdo real cada.
- Configurar redirects permanentes `308` em `next.config.ts` (`redirects()`) de `/about` → `/sobre`, `/contact` → `/contato`, `/privacy` → `/privacidade`. Justificativa: evita conteúdo duplicado, preserva autoridade de URL canônica e atende scanners que testam caminhos em inglês esperando resolução válida para a página real.

## 8. Cache (Vercel e Cloudflare)
- Toda resposta HTML e Markdown negociada deve incluir `Vary: Accept`.
- Para `?mode=agent` e respostas Markdown: `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` com `Vary: Accept`.
- **Cloudflare:** por padrão, o Cloudflare não faz cache de HTML, a menos que haja Page Rule / Cache Rule ("Cache Everything"). Se houver Cache Rule para HTML, ela **deve** incluir `Accept` na Cache Key (ou fazer bypass quando `Accept` contém `text/markdown`), caso contrário o Cloudflare servirá Markdown em cache para navegadores ou HTML para agentes.

## 9. Testes (`@playwright/test`)
- Adicionar apenas `@playwright/test` como `devDependency`.
- Rodar em modo `request` (`APIRequestContext`) contra `next build && next start` (sem abrir browser), validando status HTTP, `Content-Type`, `Vary: Accept`, corpo Markdown, `404`, redirects `308`, `sitemap.xml`, `robots.txt` e `llms.txt`.
- Testes unitários opcionais apenas para `lib/accept-markdown.ts` e `lib/markdown-renderer.ts`.
