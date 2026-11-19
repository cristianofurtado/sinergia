# Prompt — Hero em tela cheia (Antigravity 2.0)

> Cole o bloco abaixo no Antigravity, com o workspace `C:\Projetos\sinergia` aberto.
> A **Variante B** (no fim) só serve se você quiser mesmo que a passagem para a próxima seção seja **de lado** (horizontal).

---

```text
Use as skills, nesta ordem:
1. /brainstorming — só para confirmar o comportamento comigo antes de codar (no máximo 2 perguntas).
2. /next-best-practices + /react-best-practices — o projeto usa Next 16; leia o guia em node_modules/next/dist/docs/ antes de escrever código (veja AGENTS.md).
3. /impeccable + /ui-ux-pro-max — para refinar o visual sem mudar a identidade.
4. /ponytail — a menor mudança que resolve tudo; nada de dependência nova.
5. /playwright-skill + /verification-before-completion — para provar que funciona.

## Objetivo
Refinar a seção Hero de https://energiaprospectar.com.br/ para que ela ocupe EXATAMENTE a tela visível do aparelho do visitante (celular, tablet, notebook, monitor grande), descontando o header fixo. Ao carregar a página, NADA da próxima seção (HowItWorks) pode aparecer — a pessoa só vê a próxima seção depois de rolar.

## Contexto do código (já levantado, não precisa redescobrir)
- Hero: components/sections/hero.tsx — <section id="inicio"> com padding vertical (py-12 sm:py-18 lg:py-24) e grid 12 colunas: texto (col-span-7) + mockup de celular (col-span-5).
- Página: app/page.tsx — <Header /> sticky, depois <main> com Hero, HowItWorks, Simulator, Ecosystem, Contact.
- Header: components/layout/header.tsx — sticky top-0, altura h-16 (64px) até lg e lg:h-20 (80px).
  ATENÇÃO: classes como sm:h-18, sm:py-18, h-6.5, shadow-2xs, active:scale-98 NÃO existem no Tailwind 3.4 deste projeto (tailwind.config.ts não estende spacing). Elas não fazem nada hoje. Não confie nelas para calcular altura; corrija as que tocar.
- globals.css: html tem scroll-behavior: smooth; body tem overflow-x: hidden.
- Stack: Next 16, React 19, Tailwind 3.4, lucide-react. Sem framer-motion/GSAP — não adicione.

## Requisitos
1. Altura
   - A Hero deve ter altura = viewport visível − altura do header.
   - Use unidades de viewport dinâmicas: svh como base (não pula quando a barra do navegador do celular some) com fallback para vh. Ex.: min-h-[calc(100vh-4rem)] seguido de min-h-[calc(100svh-4rem)], e lg: com 5rem.
   - Prefira definir a altura do header numa CSS variable (--header-h: 4rem; em lg 5rem) em globals.css e usar calc(100svh - var(--header-h)) na Hero, para não duplicar número mágico.
   - Remova o padding vertical fixo atual que empurra a altura; centralize o conteúdo verticalmente com flex (justify-center).
2. Conteúdo sempre cabe, sem cortar e sem vazar
   - Testar e caber nestes viewports: 360x640, 375x667 (iPhone SE), 390x844, 412x915, 768x1024, 1024x768 (notebook baixo), 1366x768, 1440x900, 1920x1080, 2560x1440.
   - Tipografia fluida com clamp() no h1 e no parágrafo, para escalar com a tela.
   - Telas baixas: crie variantes por ALTURA (ex. [@media(max-height:700px)]:...) que reduzem espaçamentos, escondem a linha de "Quick Proof Badges" ou compactam o mockup.
   - Mobile (< lg): o mockup do celular não pode empurrar a página para além da tela. Escolha a solução mais simples que mantenha a mensagem: reduzir o mockup (scale) e posicioná-lo ao lado/abaixo de forma compacta, OU escondê-lo em telas com altura < ~720px. Os dois CTAs ("Ver Tabela de Descontos" e "Falar com um Consultor") precisam ficar visíveis sem rolar em QUALQUER viewport da lista.
   - Em telas grandes (≥ 1920), limite a largura do conteúdo (max-w-7xl já existe) e não deixe o texto "flutuando" pequeno: escale com clamp.
3. Próxima seção escondida até rolar
   - No carregamento, o topo de HowItWorks deve estar exatamente abaixo da dobra (nem 1px visível).
   - Adicione um indicador discreto de rolagem no rodapé da Hero (seta/chevron do lucide-react com leve animação bounce), que ao clicar rola até a próxima seção. Respeite prefers-reduced-motion (sem animação).
   - NÃO use scroll-snap obrigatório nem bloqueie a rolagem (nada de overflow:hidden no body, nada de "scroll-jacking"). A rolagem continua natural; a Hero só tem o tamanho exato da tela.
   - Garanta scroll-margin-top = altura do header nas seções com id (âncoras #tabela-descontos, #contato etc. não podem ficar escondidas atrás do header).
4. Não quebrar
   - Manter textos, números (690 → 475, desconto 215, ano 2.580), cores da marca, logo e links atuais.
   - Manter o Image do logo com priority (LCP). Não aumentar CLS: a altura deve ser estável no primeiro paint (por isso CSS, não JS medindo window.innerHeight).
   - Sem JS para altura. Se precisar de client component só para o botão de rolar, mantenha mínimo — de preferência um <a href="#como-funciona"> simples (confira o id real da seção HowItWorks).
   - Acessibilidade: indicador de rolagem com aria-label, foco visível, contraste AA.

## Entregáveis
- Diff pequeno em hero.tsx, globals.css (variável do header + scroll-margin) e, se necessário, header.tsx (só para corrigir classes inexistentes).
- Teste Playwright em tests/ que, para cada viewport da lista: (a) carrega "/", (b) verifica que hero.bottom == viewport.height (tolerância 1px), (c) verifica que o topo da próxima seção está >= viewport.height, (d) verifica que os dois CTAs estão dentro do viewport, (e) verifica que não há scroll horizontal (document.documentElement.scrollWidth <= innerWidth).
- Screenshots de 375x667, 390x844, 1366x768 e 1920x1080 antes e depois.
- Rodar `npm run build` e `npm test` e me mostrar o resultado real (não declarar pronto sem a saída).

## Fora de escopo
Não mexer nas outras seções além do scroll-margin, não trocar copy, não adicionar bibliotecas, não criar animações de entrada além do indicador de rolagem.
```

---

## Variante B — passagem lateral (horizontal) para a próxima seção

Use **só** se você quer literalmente que a Hero "deslize de lado" para revelar a próxima seção quando a pessoa rola. Substitua a seção **3** do prompt acima por isto:

```text
3. Transição horizontal Hero → próxima seção
   - Use a skill /sites-incriveis (construção "trilho horizontal" / seção presa). Pule a entrevista completa: a vibe e o conteúdo já estão definidos; pergunte só se devo usar o motor da skill ou CSS puro.
   - A Hero fica presa (position: sticky) enquanto a rolagem VERTICAL da pessoa move um trilho de 2 painéis para o lado: painel 1 = Hero atual, painel 2 = início de HowItWorks. Ao terminar o deslize, a página volta a rolar normal.
   - Implementação: container com altura 200svh, filho sticky top-[var(--header-h)] com h-[calc(100svh-var(--header-h))] e overflow-hidden; trilho com translateX ligado ao progresso da rolagem. Preferir CSS scroll-driven animations (animation-timeline: view()) com fallback de um listener de scroll passivo + requestAnimationFrame. Zero dependência nova.
   - Celular: o gesto continua sendo arrastar para cima (não exigir swipe lateral). Teclado (PageDown/espaço) e leitores de tela precisam funcionar.
   - prefers-reduced-motion: desligar o trilho e cair no comportamento padrão (Hero de tela cheia + rolagem vertical normal).
   - Teste Playwright extra: rolar 50% e 100% do trilho e verificar o translateX do painel; verificar que não existe scroll horizontal real na página.
```

---

## Skills disponíveis no Antigravity relevantes para este projeto

| Skill | Para que usar aqui |
|---|---|
| `/next-best-practices` | Next 16 tem mudanças de API — obrigatória antes de codar |
| `/react-best-practices` | Server vs client component, evitar JS desnecessário |
| `/impeccable` | Refino visual / acabamento |
| `/ui-ux-pro-max` | Hierarquia, espaçamento, responsividade |
| `/frontend-design` | Alternativa ao impeccable para direção visual |
| `/web-design-guidelines` | Revisão final de acessibilidade e UX |
| `/playwright-skill` | Testes por viewport e screenshots |
| `/sites-incriveis` | Só na Variante B (trilho horizontal, seção presa) |
| `/debug-optimize-lcp` | Conferir que a Hero não piorou LCP/CLS |
| `/a11y-debugging` | Checar foco e contraste do indicador |
| `/ponytail` | Manter o diff mínimo |
| `/brainstorming` / `/verification-before-completion` | Alinhar antes, provar depois |
