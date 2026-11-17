# Guia de Operação para Agentes e Cache (Cloudflare & Vercel)

## 1. Cache de Conteúdo Negociado (`Vary: Accept`)
Todas as rotas negociadas (`/`, `/sobre`, `/contato`, `/privacidade`) e `/api/markdown` retornam o cabeçalho `Vary: Accept`.
- **Vercel:** respeita `Vary: Accept` automaticamente para separar cache de HTML e Markdown.
- **Cloudflare:** por padrão, não faz cache de HTML. Caso exista alguma *Cache Rule* ou *Page Rule* com *"Cache Everything"*:
  1. Inclua o cabeçalho `Accept` na **Cache Key**; ou
  2. Configure **Bypass Cache** quando `http.request.headers["accept"]` contiver `text/markdown` ou quando `http.request.uri.query` contiver `mode=agent`.

## 2. `robots.txt` e Bots de IA
O arquivo `app/robots.ts` libera explicitamente:
- `ChatGPT-User`
- `OAI-SearchBot`
- `Claude-User`
- `PerplexityBot`

No painel da Cloudflare (**Security → Bots / AI Crawl Control**), verifique se o recurso *"Managed robots.txt"* ou bloqueio automático de AI Crawlers está desativado para não sobrescrever as regras do `app/robots.ts`.

## 3. Verificação Rápida (Produção)
```bash
curl -sS -L -i -H 'Accept: text/markdown' https://energiaprospectar.com.br/
curl -sS -L -i -H 'Accept: text/html' https://energiaprospectar.com.br/
curl -sS -L -i -H 'Accept: text/markdown' https://energiaprospectar.com.br/__teste-404
curl -sS -i https://energiaprospectar.com.br/sitemap.xml
curl -sS -i https://energiaprospectar.com.br/robots.txt
curl -sS -i https://energiaprospectar.com.br/llms.txt
```
