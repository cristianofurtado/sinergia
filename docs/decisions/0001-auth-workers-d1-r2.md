# ADR 0001: Vercel + Turso (libSQL / Drizzle) + Cloudflare R2 + Google OAuth

## Status
Aprovado

## Contexto
O site institucional **Energia Prospectar** (Next.js 16 + React 19 + Tailwind 3) está hospedado na **Vercel** e precisa de área autenticada com Google OAuth 2.0 / OIDC, controle de acesso por papéis (`admin`, `colaborador`, `pendente`, `bloqueado`) e gestão de arquivos internos.

## Decisões

### 1. Hospedagem e Banco: Vercel + Turso (`@libsql/client` + Drizzle ORM)
- **Por que Turso e não Cloudflare D1:** Mantendo o app na Vercel, o Turso (`libsql://...turso.io`) oferece SQLite distribuído acessível via HTTPS/HTTP direto das Serverless Functions da Vercel (Node.js runtime), com réplica na região `aws-sa-east-1` (São Paulo).
- **ORM:** `drizzle-orm` + `drizzle-kit` garantem tipagem estrita e migrações reproduzíveis em SQLite/libSQL.

### 2. Armazenamento de Arquivos: Cloudflare R2 (API S3)
- **Por que R2 e não Vercel Blob:** R2 não cobra egresso para downloads/streaming de vídeos e suporta `Range` HTTP nativamente, além de CORS granular e URLs pré-assinadas S3-compatíveis.
- **Cliente S3:** `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner` no runtime Node.js da Vercel (evitando limite de body da função via upload direto navegador → R2).

### 3. Autenticação: Google OAuth 2.0 / OIDC + Sessão Opaca no Turso
- Fluxo OAuth 2.0 com PKCE (`S256`), `state` em cookie `httpOnly` e validação de `email_verified`.
- Sessões persistidas na tabela `sessions` do Turso (hash SHA-256 do token) com cookie `httpOnly`, `secure`, `sameSite=lax`.
- Logout invalida imediatamente a sessão no banco.
