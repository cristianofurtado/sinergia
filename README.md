# Sinergia — Página Institucional (B2B Tech)

Aplicação institucional moderna construída com **Next.js 15 (App Router)**, **React 19**, **TypeScript** e **Tailwind CSS**, seguindo as diretrizes e padrões de engenharia da **Torre de Controle Antigravity**.

---

## 🚀 Tecnologias e Padrões

- **Next.js 15 (App Router)**: Renderização otimizada, metatags nativas e SEO estruturado.
- **React 19**: Componentes desacoplados e tipagem estrita.
- **Tailwind CSS**: Design System *Light Enterprise* (paleta off-white/slate minimalista e corporativa).
- **Lucide React**: Ícones leves e semânticos.
- **Acessibilidade**: WCAG 2.1 AA em conformidade com as regras da Torre.
- **Clean Code & Anti-Bloat**: Zero dependências supérfluas, componentes modulares em `<40-50` linhas.

---

## 📁 Estrutura do Projeto

```
sinergia/
├── app/
│   ├── layout.tsx         # Layout raiz, SEO e fontes
│   ├── page.tsx           # Composição da One-Page institucional
│   └── globals.css        # Reset e tokens de design
├── components/
│   ├── layout/
│   │   ├── header.tsx     # Barra de navegação fixa responsiva
│   │   └── footer.tsx     # Rodapé institucional
│   ├── sections/
│   │   ├── hero.tsx       # Proposição de valor e métricas B2B
│   │   ├── solutions.tsx  # Os 4 pilares de engenharia e IA
│   │   ├── methodology.tsx# O método de entrega e diferenciais
│   │   ├── cases.tsx      # Casos de sucesso e impacto
│   │   └── contact.tsx    # Exibição institucional de canais oficiais
│   └── ui/
│       ├── badge.tsx      # Identificadores visuais
│       ├── button.tsx     # Botões com microinterações
│       └── card.tsx       # Superfícies e cards
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🛠️ Comandos de Execução

Na raiz da pasta `sinergia/`:

```bash
# Executar em modo de desenvolvimento local (porta 3000)
npm run dev

# Executar build de produção
npm run build

# Iniciar servidor de produção
npm run start
```

