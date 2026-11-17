# Prompts — prontidão para agentes (Is Agentic 62/100)

Adaptados às skills instaladas nesta máquina. Cole cada fase numa conversa nova.

## Equivalências usadas

| Pedido original | Skill/agent instalado |
|---|---|
| /openspec-propose, /openspec-apply-change, /openspec-archive-change | OpenSpec CLI 1.16 (global, `openspec`). O projeto ainda não tem `openspec/`: a Fase 1 roda `openspec init` primeiro, que gera os comandos `/opsx:*` no projeto. Plano em paralelo com `/superpowers:writing-plans` e execução com `/superpowers:executing-plans` |
| /source-driven-development, /next-best-practices | `/modern-web-guidance:modern-web-guidance` + guia do Next em `node_modules/next/dist/docs/` (exigido pelo AGENTS.md) |
| /test-strategy, /api-testing | `/engineering:testing-strategy` |
| /lgpd-audit | `/legal:compliance-check` + `/legal:legal-risk-assessment` |
| /playwright-skill | `/run` + navegador embutido (screenshots desktop/mobile) |
| /api-and-interface-design | `/engineering:system-design` |
| /humanizer | `/design:ux-copy` |
| /frontend-checklist | `/web-design-guidelines` + `/design:accessibility-review` + `/searchfit-seo:seo-audit` |
| /deployment-safety | `/engineering:deploy-checklist` |
| JSON-LD, sitemap/robots, llms.txt | `/searchfit-seo:schema-markup`, `/searchfit-seo:technical-seo`, `/searchfit-seo:ai-visibility` |
| agente solution-architect | subagente **Plan** |
| agente qa-engineer | subagente **general-purpose** com papel de QA + `/engineering:testing-strategy` |
| agente code-reviewer | `/code-review high` |
| agente red-team, security-auditor | `/security-review` + subagente **general-purpose** com o foco descrito |
| agente ui-visual-validator | `/design:design-critique` + `/design:accessibility-review` com screenshots |

---

## FASE 1 — Especificação e plano (não implementar)

```
/superpowers:brainstorming /superpowers:writing-plans /modern-web-guidance:modern-web-guidance /engineering:testing-strategy /legal:compliance-check /searchfit-seo:technical-seo /searchfit-seo:schema-markup /searchfit-seo:ai-visibility
```

```
Projeto: C:\Projetos\sinergia (site energiaprospectar.com.br).
Tarefa: especificar as correções de prontidão para agentes apontadas pelo scan Is Agentic (nota 62/100). NÃO implemente nada nesta conversa.

Antes de tudo: rode `openspec init` no projeto (OpenSpec CLI 1.16 já instalado globalmente, ferramenta Claude Code) e use o fluxo de proposta que ele gerar (`/opsx:*` ou `openspec` na linha de comando). Se o init falhar, escreva o change à mão em openspec/changes/agent-readiness/ (proposal.md, design.md, specs/, tasks.md).

Leia antes: AGENTS.md, app/layout.tsx, app/page.tsx, components/sections/*.tsx, components/layout/*.tsx, next.config.ts, package.json e o guia do Next 16 em node_modules/next/dist/docs/ (proxy/middleware, metadata, sitemap, robots, not-found, route handlers).

Confirme com arquivo:linha:
1. Sem negociação de Markdown e sem 404 em Markdown (não há proxy.ts nem app/not-found.tsx).
2. Hierarquia de títulos: H1 em hero.tsx:37 seguido de H3 em hero.tsx:132; H4 no rodapé sem H2/H3 antes.
3. Sem JSON-LD, sem sitemap, sem llms.txt, sem páginas sobre/contato/privacidade.
4. openGraph.url = https://sinergia.tech; faltam canonical e og:image.
5. Sem nenhum teste.

Escreva o change do OpenSpec cobrindo, nesta ordem de prioridade:
A. Negociação de conteúdo na homepage (padrão acceptmarkdown.com): Accept com text/markdown preferido (q maior que text/html, ou text/html ausente) recebe 200, Content-Type: text/markdown; charset=utf-8, Vary: Accept e corpo Markdown não vazio com o mesmo conteúdo da página. Accept de navegador continua recebendo o HTML idêntico ao de hoje, também com Vary: Accept. Mesma regra para as páginas novas.
B. 404 amigável: rota inexistente devolve status 404 sempre; com Accept: text/markdown, corpo Markdown com explicação (≥ 20 caracteres) e links para /, /llms.txt e /sitemap.xml; sem ele, app/not-found.tsx em HTML no visual do site.
C. Títulos sequenciais na homepage sem mudar o visual (trocar a tag e manter as classes; o que é decorativo vira <p>).
D. Metadata: metadataBase https://energiaprospectar.com.br, canonical por página, og:type, og:image 1200×630 (estática em public/ ou opengraph-image), corrigir o domínio sinergia.tech.
E. JSON-LD na homepage (use /searchfit-seo:schema-markup): Organization (ou LocalBusiness, se houver endereço físico de atendimento) com name, url, logo, description, contactPoint (telefone e contactType), address (PostalAddress), sameAs, knowsAbout com os termos de produto que aparecem na página ("Energia por assinatura", "Geração distribuída", "Mercado Livre de Energia"), mais Service com serviceType e areaServed. Só dados reais: o que faltar vira pergunta para o cliente, nunca invenção.
F. app/sitemap.ts com todas as URLs indexáveis e lastModified; app/robots.ts apontando o sitemap e liberando os agentes (ChatGPT-User, OAI-SearchBot, Claude-User, PerplexityBot). Diga como isso convive com o robots gerenciado do Cloudflare.
G. /llms.txt no formato llmstxt.org (H1, resumo em blockquote, seções com links) incluindo "## Quando usar" com os casos concretos (quem economiza, em que estados, como pedir proposta, como virar consultor) e "## Quando não usar" (ex.: unidade fora da área atendida, quem quer instalar placas próprias).
H. Páginas de confiança em português, cada uma com ≥ 500 caracteres de conteúdo real no HTML do servidor: /sobre, /contato, /privacidade. Defina se /about, /contact e /privacy redirecionam (308) ou servem a mesma página; justifique pelo que o scan aceita.
I. ?mode=agent na homepage devolvendo o Markdown estruturado para agentes (serviços, área atendida, tabela de descontos, como contratar, contatos, links).
J. Fonte única: os dados que hoje vivem em arrays dentro dos componentes (estados e descontos, equipe de contato, telefones) saem para um módulo de conteúdo usado pelo HTML, pelo Markdown, pelo JSON-LD e pelo llms.txt, para não divergirem.
K. Cache: Vercel e Cloudflare não podem servir Markdown a navegador nem HTML a agente. Especifique os cabeçalhos (Vary: Accept, Cache-Control) e o que conferir no Cloudflare (regra de cache para HTML).
L. Testes (use /engineering:testing-strategy): um runner só. Proponha @playwright/test em modo request contra next build && next start (testa cabeçalhos, status e corpo como o curl do scan) e justifique pela escada do anti-bloat; testes unitários só se houver lógica pura (parser de Accept, geração de Markdown).

Entregue:
- o change do OpenSpec (proposal, design, specs, tasks) com tarefas pequenas e os arquivos de cada uma; rode `openspec validate` nele;
- a tabela item do scan → critério de aceite → comando de verificação (curl);
- a política de privacidade em rascunho a partir de /legal:compliance-check com foco em LGPD (o site coleta dados só por links de WhatsApp e telefone? confirme; liste operadores como Vercel e Cloudflare);
- os riscos;
- a lista de decisões e dados que dependem do cliente.

Revisão: dispare dois subagentes em paralelo — um "Plan" no papel de arquiteto de solução (avalia o design do proxy, fonte única e cache) e um "general-purpose" no papel de engenheiro de QA (avalia critérios de aceite e testes). Incorpore o que fizer sentido.
Espere minha aprovação antes de qualquer implementação.
```

---

## FASE 2 — Testes, títulos, metadata, JSON-LD, sitemap e robots

```
/superpowers:executing-plans /superpowers:test-driven-development /modern-web-guidance:modern-web-guidance /searchfit-seo:schema-markup /searchfit-seo:technical-seo /ponytail:ponytail /superpowers:verification-before-completion
```

```
Projeto: C:\Projetos\sinergia.
Implemente do change aprovado (openspec/changes/…) só as tarefas dos itens L, C, D, E e F, nesta ordem. Marque cada tarefa concluída no tasks.md.

Testes primeiro (devem falhar antes da mudança):
- homepage em HTML cru: exatamente 1 H1, nenhum salto de nível, ≥ 500 caracteres de texto;
- <html lang="pt-BR">, canonical https://energiaprospectar.com.br/, og:type, og:image acessível (200, image/*), nenhum "sinergia.tech" no HTML;
- JSON-LD presente, JSON válido, @type esperado, contactPoint e address preenchidos, knowsAbout com termos que aparecem no texto da página;
- /sitemap.xml: 200, XML válido, todas as URLs com lastmod e no domínio certo;
- /robots.txt: aponta o sitemap e não bloqueia os agentes listados.

Regras:
- Visual intocado: troque só tags de título e acrescente metadados. Compare screenshots antes/depois (desktop e mobile) com /run e o navegador embutido.
- Dado do cliente ainda não confirmado fica como constante marcada com // TODO(cliente) e fora do JSON-LD, nunca inventado.
- Dependência nova só @playwright/test (já justificada na Fase 1).
- Adicione os scripts "test" e "test:e2e" ao package.json.

Rode npm run lint, npm run build e os testes e mostre a saída.
Revisão: rode /code-review high no diff e corrija o que for bloqueante.
```

---

## FASE 3 — Markdown para agentes: negociação, 404, llms.txt e ?mode=agent

```
/superpowers:executing-plans /superpowers:test-driven-development /modern-web-guidance:modern-web-guidance /engineering:system-design /engineering:testing-strategy /searchfit-seo:ai-visibility /ponytail:ponytail /superpowers:verification-before-completion
```

```
Projeto: C:\Projetos\sinergia.
Implemente do change aprovado os itens J, A, B, G, I e K, nesta ordem. Confirme no guia do Next 16 (node_modules/next/dist/docs/) como o proxy/middleware reescreve para um route handler e como definir cabeçalhos; cite o arquivo do guia que usou.

Testes primeiro, todos por HTTP contra next start:
- GET / com Accept: text/markdown → 200, Content-Type text/markdown, Vary contém Accept, corpo começa com "# " e contém o nome da marca, a tabela de descontos e os contatos;
- GET / com Accept de navegador (text/html,application/xhtml+xml,...;q=0.9,*/*;q=0.8) → HTML igual ao de antes, Vary contém Accept;
- GET / com Accept: */* → HTML;
- GET /rota-que-nao-existe com Accept: text/markdown → 404, text/markdown, ≥ 20 caracteres, links para /llms.txt e /sitemap.xml;
- GET /rota-que-nao-existe com Accept: text/html → 404 em HTML;
- GET /llms.txt → 200, text/plain ou text/markdown, contém "## Quando usar";
- GET /?mode=agent → Markdown estruturado;
- rotas internas do Next (/_next, imagens, RSC com cabeçalho rsc) não passam pela negociação.

Regras:
- Parser de Accept pequeno e puro, com teste unitário de q-values.
- O Markdown sai do mesmo módulo de conteúdo que alimenta os componentes (item J); nada de texto copiado à mão.
- Cabeçalhos de cache conforme o item K; documente em docs/agentes.md o que conferir no Cloudflare.

Rode npm run lint, npm run build e os testes e mostre a saída.
Reproduza com curl contra http://localhost:3000 os dois comandos do scan (Accept: text/markdown e Accept: text/html na homepage, e o da rota inexistente) e cole os cabeçalhos.

Revisão: rode /code-review high e /security-review no diff, e um subagente "general-purpose" no papel de red team com foco em: negociação servindo o formato errado, cache envenenado, rota inexistente devolvendo 200, proxy quebrando assets. Corrija o que for bloqueante.
```

---

## FASE 4 — Páginas de confiança: /sobre, /contato, /privacidade

```
/superpowers:executing-plans /superpowers:test-driven-development /legal:compliance-check /impeccable:impeccable /web-design-guidelines /design:ux-copy /superpowers:verification-before-completion
```

```
Projeto: C:\Projetos\sinergia.
Implemente o item H do change aprovado usando os dados confirmados pelo cliente e o rascunho de privacidade da Fase 1.

Requisitos:
- Cada página com ≥ 500 caracteres de conteúdo real renderizado no servidor, H1 único, títulos sequenciais, canonical, entrada no sitemap e versão Markdown pela mesma negociação da Fase 3.
- Mesmo header, footer, tipografia e tokens da homepage; nenhum estilo novo sem necessidade. Links para as três páginas no rodapé.
- /privacidade cobre: controlador e contato do encarregado, dados tratados (inclusive o que o WhatsApp e os provedores de hospedagem recebem), finalidade e base legal, compartilhamento, retenção, direitos do titular (art. 18) e como exercê-los, cookies/analytics (se houver), data de atualização.
- Texto em português claro, sem promessa que o cliente não confirmou (descontos, prazos, cobertura). Passe o texto final por /design:ux-copy para soar natural, sem cara de texto gerado.
- Redirecionamentos /about, /contact, /privacy conforme decidido na Fase 1.

Testes: status, tamanho mínimo do texto, títulos, canonical, presença no sitemap, Markdown com Accept: text/markdown, redirecionamentos.

Rode lint, build e testes e mostre a saída. Valide o visual em desktop e mobile com screenshots (/run + navegador embutido).
Revisão: /design:design-critique e /design:accessibility-review nas screenshots; /legal:compliance-check e /security-review (LGPD) no texto e no código. Corrija o que for bloqueante.
```

---

## FASE 5 — Fechamento, deploy e reavaliação

```
/ponytail:ponytail-review /code-review /security-review /web-design-guidelines /searchfit-seo:seo-audit /engineering:deploy-checklist /superpowers:verification-before-completion /superpowers:finishing-a-development-branch
```

```
Projeto: C:\Projetos\sinergia.
1. Revisão final do diff inteiro com /ponytail:ponytail-review e /code-review high. Nenhum segredo, nenhuma PII em log, nenhum TODO(cliente) publicado como dado real.
2. /web-design-guidelines, /design:accessibility-review e /searchfit-seo:seo-audit só nos itens afetados (SEO, metadata, acessibilidade de títulos).
3. Rode lint, build e testes; mostre a saída.
4. Com /engineering:deploy-checklist, descreva o deploy (preview da Vercel primeiro) e o rollback. NÃO faça push nem deploy sem minha confirmação.
5. Depois do meu ok e do deploy, verifique em produção e cole os cabeçalhos:
   curl -sS -L -i -H 'Accept: text/markdown' https://energiaprospectar.com.br/
   curl -sS -L -i -H 'Accept: text/html' https://energiaprospectar.com.br/
   curl -sS -L -i -H 'Accept: text/markdown' https://energiaprospectar.com.br/__teste-404
   curl -sS -i https://energiaprospectar.com.br/sitemap.xml
   curl -sS -i https://energiaprospectar.com.br/robots.txt
   curl -sS -i https://energiaprospectar.com.br/llms.txt
   Repita o primeiro e o segundo duas vezes seguidas para provar que o cache (Vercel/Cloudflare) não troca os formatos.
6. Rode npx is-agentic energiaprospectar.com.br e compare com a nota 62: item por item, o que passou e o que ainda falta.
7. Arquive o change com `openspec archive <nome-do-change>` (ou /opsx:archive, se o init gerou o comando).

Entregue: resumo das mudanças, resultados da verificação marcados [VERIFICADO]/[NÃO VERIFICADO] e o que depende de decisão ou credencial.
```
