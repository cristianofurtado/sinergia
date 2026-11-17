import { test, expect } from "@playwright/test";

test.describe("Área de Login e Colaboradores", () => {
  test("Header contains Área de Login link to /login", async ({ request }) => {
    const res = await request.get("/", { headers: { Accept: "text/html" } });
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain('href="/login"');
    expect(html).toContain("Área de Login");
  });

  test("GET /login renders official logo, Google button and LGPD notice", async ({ request }) => {
    const res = await request.get("/login", { headers: { Accept: "text/html" } });
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain("/logo-energia-prospectar.webp");
    expect(html).toContain("Entrar com Google");
    expect(html).toContain("LGPD");
  });

  test("Protected routes (/painel, /painel/admin, /admin, /aguardando-aprovacao) redirect unauthenticated users to /login", async ({ request }) => {
    for (const path of ["/painel", "/painel/admin", "/admin", "/aguardando-aprovacao"]) {
      const res = await request.get(path, { maxRedirects: 0 });
      expect([302, 303, 307]).toContain(res.status());
      expect(res.headers()["location"]).toContain("/login");
    }
  });

  test("Protected API endpoints reject unauthenticated requests with 401", async ({ request }) => {
    const presign = await request.post("/api/files/presign", {
      data: { action: "put", category: "document", mimeType: "application/pdf", sizeBytes: 1024, fileName: "doc.pdf" },
    });
    expect(presign.status()).toBe(401);

    const adminUsers = await request.get("/api/admin/users");
    expect(adminUsers.status()).toBe(401);

    const adminFiles = await request.post("/api/admin/files", {
      data: { title: "Teste", textBody: "Conteudo" },
    });
    expect(adminFiles.status()).toBe(401);
  });
});
