# Tasks: Prontidão para Agentes

- [x] 1. **Fonte única de dados** — Criar `lib/site-content.ts` extraindo estados/descontos, equipe e contatos de `components/sections/coverage.tsx`, `contact.tsx`, `simulator.tsx` e `components/layout/footer.tsx`.
- [x] 2. **Parser de Accept e renderizador Markdown** — Criar `lib/accept-markdown.ts` e `lib/markdown-renderer.ts`.
- [x] 3. **Proxy e Route Handler de Markdown** — Criar `proxy.ts` (raiz) e `app/api/markdown/route.ts` para negociação de conteúdo, `?mode=agent` e `404` em Markdown, com `Vary: Accept`.
- [x] 4. **Página 404 em HTML** — Criar `app/not-found.tsx` no visual do site.
- [x] 5. **Hierarquia de títulos** — Ajustar `components/sections/hero.tsx:132` (`h3` → `h2`) e `components/layout/footer.tsx:35,69,108` (`h4` → `p`) mantendo as classes visuais.
- [x] 6. **Metadata e OG Image** — Atualizar `app/layout.tsx` (`metadataBase: https://energiaprospectar.com.br`, `canonical`, remover `sinergia.tech`) e adicionar `app/opengraph-image.tsx` (1200×630).
- [x] 7. **JSON-LD na homepage** — Adicionar `<script type="application/ld+json">` em `app/page.tsx` (`Organization` + `Service`).
- [x] 8. **Sitemap, Robots e llms.txt** — Criar `app/sitemap.ts`, `app/robots.ts` e `app/llms.txt/route.ts`.
- [x] 9. **Páginas de confiança e redirects** — Criar `app/sobre/page.tsx`, `app/contato/page.tsx`, `app/privacidade/page.tsx` e adicionar redirects `308` em `next.config.ts`.
- [x] 10. **Testes com Playwright** — Instalar `@playwright/test`, criar `playwright.config.ts` e `tests/agent-readiness.spec.ts` validando todos os critérios contra `next build && next start`.
