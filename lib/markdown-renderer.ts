import { SITE_INFO, STATES_COVERAGE, TEAM_MEMBERS } from "./site-content";

export function renderHomeMarkdown(): string {
  const statesTable = STATES_COVERAGE.map(
    (s) => `| ${s.uf} | ${s.name} | ${s.distributor} | ${s.discount} | ${s.modalities} |`
  ).join("\n");

  const teamList = TEAM_MEMBERS.map(
    (m) => `- **${m.name}** (${m.region}): ${m.phoneDisplay} — [WhatsApp](https://wa.me/${m.phoneRaw})`
  ).join("\n");

  return `# ${SITE_INFO.name}

> ${SITE_INFO.description}

## Serviços
- **Energia por assinatura (Geração Distribuída):** créditos de energia solar injetados na rede da distribuidora, sem obras, sem instalação de placas e sem investimento inicial.
- **Mercado Livre de Energia:** migração assistida para empresas com maior demanda energética, com redução de até 30% nos custos e proteção contra bandeiras tarifárias.
- **Ecossistema de Consultores:** parceria comercial com comissões mensais recorrentes, suporte e materiais comerciais.

## Área Atendida e Tabela de Descontos

| UF | Estado | Distribuidora | Desconto | Modalidades |
|---|---|---|---|---|
${statesTable}

## Como Contratar
1. Verifique se seu estado e distribuidora estão na lista acima.
2. Entre em contato pelo WhatsApp oficial (${SITE_INFO.primaryPhoneDisplay}) ou com o especialista da sua região.
3. Envie uma foto ou PDF da sua conta de luz para análise gratuita e proposta personalizada.

## Equipe de Especialistas
${teamList}

## Links Úteis
- [Página Inicial](${SITE_INFO.url}/)
- [Sobre](${SITE_INFO.url}/sobre)
- [Contato](${SITE_INFO.url}/contato)
- [Privacidade](${SITE_INFO.url}/privacidade)
- [llms.txt](${SITE_INFO.url}/llms.txt)
- [Sitemap](${SITE_INFO.url}/sitemap.xml)
`;
}

export function renderSobreMarkdown(): string {
  return `# Sobre a ${SITE_INFO.name}

> ${SITE_INFO.description}

A ${SITE_INFO.name} conecta empresas e consumidores residenciais a usinas de energia renovável por meio da Geração Distribuída (energia por assinatura) e do Mercado Livre de Energia.

## Nossa Atuação
- Atendimento em ${STATES_COVERAGE.length} estados brasileiros.
- Sem necessidade de obras, investimentos ou instalação de placas solares no imóvel.
- Rede nacional de especialistas regionais para atendimento consultivo.

## Links
- [Página Inicial](${SITE_INFO.url}/)
- [Contato](${SITE_INFO.url}/contato)
- [Privacidade](${SITE_INFO.url}/privacidade)
`;
}

export function renderContatoMarkdown(): string {
  const teamList = TEAM_MEMBERS.map(
    (m) => `- **${m.name}** — ${m.region}: ${m.phoneDisplay} ([WhatsApp](https://wa.me/${m.phoneRaw}))`
  ).join("\n");

  return `# Contato — ${SITE_INFO.name}

Atendimento direto via WhatsApp e telefone com nossos especialistas regionais.

## Canal Principal
- **Telefone / WhatsApp:** ${SITE_INFO.primaryPhoneDisplay} ([Iniciar conversa](https://wa.me/${SITE_INFO.primaryPhoneRaw}))

## Especialistas Regionais
${teamList}

## Links
- [Página Inicial](${SITE_INFO.url}/)
- [Sobre](${SITE_INFO.url}/sobre)
`;
}

export function renderPrivacidadeMarkdown(): string {
  return `# Política de Privacidade — ${SITE_INFO.name}

Esta política descreve como a ${SITE_INFO.name} trata dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).

## Coleta de Dados
O site institucional não possui formulários de captura de dados nem utiliza cookies de rastreamento publicitário. O contato ocorre exclusivamente por iniciativa do titular ao clicar nos links de WhatsApp ou telefone.

## Operadores de Infraestrutura
- **Vercel Inc.:** hospedagem e entrega da aplicação web.
- **Cloudflare, Inc.:** DNS, CDN e segurança de borda.
- **WhatsApp (Meta):** canal de atendimento escolhido pelo usuário.

## Direitos do Titular
Você pode solicitar confirmação, acesso, correção ou eliminação de dados pelo nosso canal oficial: ${SITE_INFO.primaryPhoneDisplay}.
`;
}

export function renderNotFoundMarkdown(): string {
  return `# 404 — Página não encontrada

O recurso solicitado não foi encontrado em ${SITE_INFO.name} (${SITE_INFO.url}). Verifique o endereço ou utilize os links abaixo para navegar pelo conteúdo oficial.

## Links disponíveis
- [Página Inicial](${SITE_INFO.url}/)
- [Guia para Agentes (llms.txt)](${SITE_INFO.url}/llms.txt)
- [Mapa do Site (sitemap.xml)](${SITE_INFO.url}/sitemap.xml)
`;
}

export function renderLlmsTxt(): string {
  const states = STATES_COVERAGE.map((s) => `${s.uf} (${s.discount})`).join(", ");
  return `# ${SITE_INFO.name}

> ${SITE_INFO.description}

## Páginas Principais
- [Página Inicial](${SITE_INFO.url}/): Visão geral da plataforma, modalidades de economia, tabela de descontos por estado e contatos.
- [Sobre](${SITE_INFO.url}/sobre): Quem somos, como funciona a energia por assinatura e o Mercado Livre de Energia.
- [Contato](${SITE_INFO.url}/contato): Canais oficiais de WhatsApp e telefone dos especialistas regionais.
- [Política de Privacidade](${SITE_INFO.url}/privacidade): Diretrizes de privacidade e conformidade com a LGPD.

## Quando usar
- Quando um usuário ou empresa quer economizar de 12% a 26% na conta de luz sem instalar placas solares.
- Para consultar disponibilidade e percentual de desconto nos estados atendidos: ${states}.
- Para solicitar proposta comercial via WhatsApp (${SITE_INFO.primaryPhoneDisplay}) ou falar com um especialista regional.
- Para profissionais que desejam atuar como consultores parceiros de energia.

## Quando não usar
- Quando a unidade consumidora estiver fora dos ${STATES_COVERAGE.length} estados atendidos.
- Quando o usuário busca comprar ou instalar sistema próprio de placas solares (fotovoltaico no telhado).
`;
}
