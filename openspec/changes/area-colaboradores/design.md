# Design: Área de Login e Colaboradores (Next.js 16 + OpenNext + D1 + R2)

## 1. Domínio e Ciclo de Vida
- **Papéis:** `pendente` | `colaborador` | `admin` | `bloqueado`.
- **Ciclo do Usuário:** Primeiro login Google → verifica `ADMIN_EMAILS` → se presente, nasce `admin`; caso contrário, nasce `pendente` (acessa apenas `/aguardando-aprovacao`). Admin aprova para `colaborador` ou `admin`, ou altera para `bloqueado`.
- **Ciclo do Arquivo:** Admin solicita Presigned PUT URL (servidor valida MIME, extensão, tamanho máximo e sanitiza nome) → navegador envia direto ao R2 → servidor confirma e grava metadado no D1 + evento no `audit_logs`. Download gera Presigned GET URL de curta duração (ex.: 60s), forçando `Content-Disposition: attachment` para `svg`/`html`.

## 2. Modelo de Dados (Cloudflare D1 / SQLite)
- `users`: `id` (PK), `email` (UNIQUE), `name`, `avatar_url`, `role` (`pendente` | `colaborador` | `admin` | `bloqueado`), `created_at`, `updated_at`.
- `sessions`: `id` (PK), `user_id` (FK → `users.id` ON DELETE CASCADE), `token_hash` (UNIQUE), `expires_at`, `created_at`. (Índice em `user_id` e `expires_at`).
- `files`: `id` (PK), `category` (`video` | `chat` | `document` | `image` | `text`), `title`, `original_name`, `r2_key` (UNIQUE, nullable para `text`), `mime_type`, `size_bytes`, `text_body` (nullable, usado para `text`), `uploaded_by` (FK → `users.id`), `created_at`, `updated_at`. (Índice em `category`).
- `audit_logs`: `id` (PK), `actor_id` (FK → `users.id`), `action` (`upload` | `download` | `rename` | `delete` | `role_change`), `target_type` (`file` | `user`), `target_id`, `metadata_json`, `created_at`. (Índice em `created_at` e `actor_id`).

## 3. Mapa de Rotas e Autorização
| Rota | Papel Exigido | Descrição |
|---|---|---|
| `/` `/sobre` `/contato` `/privacidade` | Público | Site institucional |
| `/login` | Público (redireciona se logado) | Login único com Google + aviso LGPD |
| `/aguardando-aprovacao` | `pendente` | Tela informativa aguardando aprovação |
| `/painel` (`/painel/[categoria]`) | `colaborador` ou `admin` | Visualização e download por categoria |
| `/painel/admin` | `admin` | Gestão de arquivos, textos e usuários |
| `/api/auth/*` | Público | Callbacks OAuth, sessão e logout |
| `/api/files/presign` | `admin` (PUT) / `colaborador`+`admin` (GET) | Geração de Presigned URLs R2 |
| `/api/admin/users` | `admin` | Aprovar, alterar papel e bloquear usuários |

## 4. Segurança e LGPD
- **Sessão:** cookies `httpOnly`, `secure`, `sameSite=lax`, proteção CSRF nativa.
- **Uploads:** validação server-side de MIME/tamanho, sanitização de `r2_key` (`uuid + extensão segura`), `SVG`/`HTML` nunca servidos inline.
- **LGPD:** Armazena apenas `name`, `email` e `avatar_url` do Google; aviso claro na tela de `/login`; exclusão de conta remove `users` + `sessions` (cascade) e anonimiza/mantém trilha de auditoria conforme necessidade legal.
