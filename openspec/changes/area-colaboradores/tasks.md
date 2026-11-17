# Tasks: Área de Login e Colaboradores

## Fase 1: Infraestrutura (Cloudflare Workers, OpenNext, D1, R2)
- [x] 1.1 Configurar `@opennextjs/cloudflare` e `wrangler.jsonc` com bindings `DB` (D1) e `BUCKET` (R2).
- [x] 1.2 Criar migrações SQL do D1 (`users`, `sessions`, `files`, `audit_logs` e índices).

## Fase 2: Header + Login
- [ ] 2.1 Adicionar botão "Área de Login" como último item do menu em `components/layout/header.tsx` (desktop e mobile) apontando para `/login`.
- [ ] 2.2 Criar `app/login/page.tsx` com `public/logo-oficial.png`, botão único "Entrar com Google" e aviso LGPD.

## Fase 3: Autenticação e Papéis
- [ ] 3.1 Configurar biblioteca de auth com Google OAuth + adaptador D1 + `ADMIN_EMAILS`.
- [ ] 3.2 Criar `app/aguardando-aprovacao/page.tsx` e helpers server-side de verificação de sessão/papel.

## Fase 4: Painel do Colaborador
- [ ] 4.1 Criar `app/painel/layout.tsx` com menu lateral (Vídeos, Chats, Documentos, Imagens e GIFs, Textos).
- [ ] 4.2 Criar listagem/visualização e endpoint de Presigned GET URL (`/api/files/presign`) com registro em `audit_logs`.

## Fase 5: Área do Admin
- [ ] 5.1 Criar `app/painel/admin/page.tsx` para gestão de usuários (aprovar, mudar papel, bloquear).
- [ ] 5.2 Criar fluxo de upload direto ao R2 (Presigned PUT URL), renomeação, exclusão e criação de textos.

## Fase 6: Segurança, Testes e Publicação
- [ ] 6.1 Validar tipos/tamanhos de arquivo, `Content-Disposition: attachment` para SVG/HTML e exclusão de conta (LGPD).
- [ ] 6.2 Escrever testes de autorização, rotas e fluxo de presign.
- [ ] 6.3 Publicar preview no Cloudflare Workers e validar em produção.
