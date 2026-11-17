# Proposal: Área de Login com Google e Área de Colaboradores

## Why
A Energia Prospectar precisa de um portal interno autenticado para disponibilizar materiais comerciais (vídeos, chats exportados, documentos, imagens/GIFs e textos) aos colaboradores aprovados, com gestão centralizada por administradores.

## What Changes
- **Header + Login (`/login`):** Botão "Área de Login" como último item do menu (desktop e mobile), página `/login` com logo oficial e botão único "Entrar com Google", além de aviso de privacidade (LGPD).
- **Autenticação e Papéis (D1):** Login via Google OAuth 2.0 / OIDC; novos usuários entram com papel `pendente` (sem acesso ao `/painel`) até aprovação de um `admin`; primeiros admins definidos via `ADMIN_EMAILS`.
- **Painel do Colaborador (`/painel`):** Menu lateral com seções Vídeos, Chats (consultas/exportações), Documentos, Imagens e GIFs, e Textos; permissão apenas de visualização/download.
- **Área do Admin (`/painel/admin`):** Upload, download, renomeação e exclusão de arquivos, criação/edição de textos e gestão de usuários (aprovar, alterar papel, bloquear).
- **Infraestrutura (Cloudflare Workers + OpenNext + D1 + R2):** Metadados, sessões e auditoria no D1; binários no R2 privado com Presigned URLs (upload direto do navegador e download de curta duração).
