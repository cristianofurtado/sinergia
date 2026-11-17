import { test, expect } from "@playwright/test";

test.describe("Agent Readiness", () => {
  test("GET / with Accept: text/markdown returns 200 Markdown and Vary: Accept", async ({ request }) => {
    const res = await request.get("/", { headers: { Accept: "text/markdown" } });
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/markdown; charset=utf-8");
    expect(res.headers()["vary"]).toContain("Accept");
    const body = await res.text();
    expect(body.length).toBeGreaterThan(100);
    expect(body).toContain("# Energia Prospectar");
  });

  test("Homepage HTML: headings hierarchy, lang, canonical, og:image, no sinergia.tech", async ({ request }) => {
    const res = await request.get("/", { headers: { Accept: "text/html" } });
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/html");
    expect(res.headers()["vary"]).toContain("Accept");

    const html = await res.text();
    expect(html).toContain('<html lang="pt-BR"');
    expect(html).toContain('rel="canonical" href="https://energiaprospectar.com.br"');
    expect(html).toContain('property="og:type" content="website"');
    expect(html).not.toContain("sinergia.tech");

    // Extract og:image and verify it returns 200 image/*
    const ogImageMatch = html.match(/property="og:image" content="([^"]+)"/);
    expect(ogImageMatch).not.toBeNull();
    const ogImageUrl = ogImageMatch![1].replace("https://energiaprospectar.com.br", "");
    const imgRes = await request.get(ogImageUrl);
    expect(imgRes.status()).toBe(200);
    expect(imgRes.headers()["content-type"]).toMatch(/^image\//);

    // Strip tags for text length check (>= 500 chars)
    const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    expect(textOnly.length).toBeGreaterThanOrEqual(500);

    // Headings: exactly 1 H1 and no skipped levels (h1 -> h3 without h2)
    const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
    expect(headings.filter((h) => h === 1)).toHaveLength(1);
    for (let i = 1; i < headings.length; i++) {
      expect(headings[i] - headings[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  test("Homepage JSON-LD is valid with Organization, Service, contactPoint and knowsAbout", async ({ request }) => {
    const res = await request.get("/", { headers: { Accept: "text/html" } });
    const html = await res.text();
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();

    const jsonLd = JSON.parse(match![1]);
    expect(jsonLd["@graph"]).toBeDefined();
    const org = jsonLd["@graph"].find((n: { "@type": string }) => n["@type"] === "Organization");
    const service = jsonLd["@graph"].find((n: { "@type": string }) => n["@type"] === "Service");

    expect(org).toBeDefined();
    expect(org.contactPoint?.telephone).toBeTruthy();
    expect(org.knowsAbout).toEqual(
      expect.arrayContaining(["Energia por assinatura", "Geração distribuída", "Mercado Livre de Energia"])
    );
    expect(service).toBeDefined();
    expect(service.areaServed.length).toBeGreaterThan(0);
  });

  test("GET /?mode=agent returns structured Markdown", async ({ request }) => {
    const res = await request.get("/?mode=agent");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/markdown; charset=utf-8");
    const body = await res.text();
    expect(body).toContain("## Área Atendida e Tabela de Descontos");
  });

  test("Unknown route returns 404 in Markdown and HTML", async ({ request }) => {
    const mdRes = await request.get("/rota-que-nao-existe", {
      headers: { Accept: "text/markdown" },
    });
    expect(mdRes.status()).toBe(404);
    expect(mdRes.headers()["content-type"]).toContain("text/markdown; charset=utf-8");
    const mdBody = await mdRes.text();
    expect(mdBody.length).toBeGreaterThanOrEqual(20);
    expect(mdBody).toContain("/llms.txt");
    expect(mdBody).toContain("/sitemap.xml");

    const htmlRes = await request.get("/rota-que-nao-existe", {
      headers: { Accept: "text/html" },
    });
    expect(htmlRes.status()).toBe(404);
  });

  test("Discovery endpoints (/sitemap.xml, /robots.txt, /llms.txt) return 200", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const sitemapXml = await sitemap.text();
    expect(sitemapXml).toContain("<urlset");
    expect(sitemapXml).toContain("<lastmod>");
    expect(sitemapXml).toContain("https://energiaprospectar.com.br/sobre");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const robotsTxt = await robots.text();
    expect(robotsTxt).toContain("Sitemap: https://energiaprospectar.com.br/sitemap.xml");
    expect(robotsTxt).toContain("ChatGPT-User");
    expect(robotsTxt).toContain("OAI-SearchBot");
    expect(robotsTxt).toContain("Claude-User");
    expect(robotsTxt).toContain("PerplexityBot");

    const llms = await request.get("/llms.txt");
    expect(llms.status()).toBe(200);
    const llmsTxt = await llms.text();
    expect(llmsTxt).toContain("## Quando usar");
    expect(llmsTxt).toContain("## Quando não usar");
  });

  test("Trust pages have >= 500 chars and English aliases redirect 308", async ({ request }) => {
    for (const path of ["/sobre", "/contato", "/privacidade"]) {
      const res = await request.get(path, { headers: { Accept: "text/html" } });
      expect(res.status()).toBe(200);
      expect((await res.text()).length).toBeGreaterThanOrEqual(500);
    }

    for (const [from, to] of [
      ["/about", "/sobre"],
      ["/contact", "/contato"],
      ["/privacy", "/privacidade"],
    ]) {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status()).toBe(308);
      expect(res.headers()["location"]).toBe(to);
    }
  });
});
