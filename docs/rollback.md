# Deploy e Rollback (Vercel + Turso + Cloudflare R2)

## 1. Deploy (Vercel)
1. Configure todas as variáveis de ambiente na Vercel (Preview e Production).
2. Faça deploy de Preview primeiro e valide os endpoints `/login`, `/painel`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`.
3. Promova para Production.

## 2. Rollback
- **Aplicação (Vercel):** no painel da Vercel → **Deployments**, selecione o deployment anterior estável e clique em **Promote to Production** (efeito imediato, sem redeploy).
- **Banco (Turso):** as migrações Drizzle em `drizzle/` seguem padrão aditivo (`CREATE TABLE IF NOT EXISTS`). Em caso de rollback de código, tabelas novas não afetam rotas públicas anteriores.
- **Arquivos (R2):** objetos no bucket privado `sinergia-files` possuem chave UUID imutável e só são removidos mediante confirmação de exclusão no painel administrativo.
