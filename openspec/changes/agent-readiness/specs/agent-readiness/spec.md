# Specification: Agent Readiness

## ADDED Requirements

### Requirement: Content Negotiation & Agent Mode
The application SHALL serve Markdown (`Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, status `200`) on `/`, `/sobre`, `/contato`, and `/privacidade` when the `Accept` header prefers `text/markdown` over `text/html` (higher `q` value or `text/html` absent), or when `?mode=agent` is passed on `/`.

#### Scenario: Agent requests homepage with Accept: text/markdown
- **WHEN** a client sends `GET /` with `Accept: text/markdown`
- **THEN** the response status is `200`, `Content-Type` is `text/markdown; charset=utf-8`, `Vary` contains `Accept`, and the body is non-empty Markdown matching the page content.

#### Scenario: Browser requests homepage
- **WHEN** a client sends `GET /` with `Accept: text/html,application/xhtml+xml`
- **THEN** the response status is `200`, `Content-Type` is `text/html; charset=utf-8`, and `Vary` contains `Accept`.

### Requirement: Friendly 404 in Markdown and HTML
The application SHALL return status `404` for unknown routes in both Markdown (when `Accept` prefers `text/markdown`, with ≥ 20 chars explanation and links to `/`, `/llms.txt`, `/sitemap.xml`) and HTML (`app/not-found.tsx`).

#### Scenario: Agent hits unknown route
- **WHEN** a client sends `GET /rota-inexistente` with `Accept: text/markdown`
- **THEN** the response status is `404`, `Content-Type` is `text/markdown; charset=utf-8`, and the body contains links to `/`, `/llms.txt`, and `/sitemap.xml`.

### Requirement: Heading Hierarchy, Metadata & JSON-LD
The homepage SHALL have sequential headings (`h1` → `h2` → `h3`), `metadataBase` set to `https://energiaprospectar.com.br`, `canonical` per page, `og:image` (1200×630), and valid `Organization`/`Service` JSON-LD using real data.

#### Scenario: Homepage metadata and headings are inspected
- **WHEN** a client fetches `/` in HTML
- **THEN** `h1` is followed by `h2` (no skipped levels), `og:url` uses `https://energiaprospectar.com.br`, `og:image` is present, and `application/ld+json` contains `Organization` and `Service`.

### Requirement: Discovery & Trust Pages
The application SHALL expose `/sitemap.xml`, `/robots.txt` (allowing `ChatGPT-User`, `OAI-SearchBot`, `Claude-User`, `PerplexityBot`), `/llms.txt`, and Portuguese trust pages `/sobre`, `/contato`, `/privacidade` (≥ 500 chars each in SSR HTML), with `308` redirects from `/about`, `/contact`, `/privacy`.

#### Scenario: Discovery endpoints return valid responses
- **WHEN** a client fetches `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/sobre`, `/contato`, `/privacidade`
- **THEN** all return `200`, trust pages contain ≥ 500 characters of server-rendered content, and `/about`, `/contact`, `/privacy` redirect with `308`.
