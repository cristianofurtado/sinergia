import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "360x640", width: 360, height: 640 },
  { name: "375x667 (iPhone SE)", width: 375, height: 667 },
  { name: "390x844", width: 390, height: 844 },
  { name: "412x915", width: 412, height: 915 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "2560x1440", width: 2560, height: 1440 },
] as const;

test.describe("Hero full-viewport layout", () => {
  for (const vp of VIEWPORTS) {
    test(`fits exact visible viewport on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/", { waitUntil: "networkidle" });

      const hero = page.locator("#inicio");
      const nextSection = page.locator("#como-funciona");
      const primaryCta = hero.getByRole("link", { name: /Ver Tabela de Descontos/i });
      const secondaryCta = hero.getByRole("link", { name: /Falar com um Consultor/i });
      const scrollCue = hero.getByRole("link", { name: /Rolar para Como Funciona/i });

      await expect(hero).toBeVisible();
      await expect(primaryCta).toBeVisible();
      await expect(secondaryCta).toBeVisible();
      await expect(scrollCue).toBeVisible();

      const metrics = await page.evaluate(() => {
        const headerEl = document.querySelector("header")!;
        const heroEl = document.querySelector("#inicio")!;
        const nextEl = document.querySelector("#como-funciona")!;
        const primaryEl = heroEl.querySelector('a[href="#tabela-descontos"]')!;
        const secondaryEl = heroEl.querySelector('a[href="#contato"]')!;

        const hRect = headerEl.getBoundingClientRect();
        const heroRect = heroEl.getBoundingClientRect();
        const nextRect = nextEl.getBoundingClientRect();
        const cta1 = primaryEl.getBoundingClientRect();
        const cta2 = secondaryEl.getBoundingClientRect();

        return {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          scrollWidth: document.documentElement.scrollWidth,
          headerHeight: hRect.height,
          heroBottom: heroRect.bottom,
          nextTop: nextRect.top,
          cta1: { top: cta1.top, bottom: cta1.bottom, left: cta1.left, right: cta1.right },
          cta2: { top: cta2.top, bottom: cta2.bottom, left: cta2.left, right: cta2.right },
        };
      });

      // (b) hero.bottom == viewport.height (tolerance 1px)
      expect(Math.abs(metrics.heroBottom - vp.height)).toBeLessThanOrEqual(1);

      // (c) top of next section (HowItWorks) is completely below the fold
      expect(metrics.nextTop).toBeGreaterThanOrEqual(vp.height - 0.5);

      // (d) both CTAs are fully inside the visible viewport below the sticky header
      for (const cta of [metrics.cta1, metrics.cta2]) {
        expect(cta.top).toBeGreaterThanOrEqual(metrics.headerHeight);
        expect(cta.bottom).toBeLessThanOrEqual(vp.height);
        expect(cta.left).toBeGreaterThanOrEqual(0);
        expect(cta.right).toBeLessThanOrEqual(vp.width);
      }

      // (e) no horizontal scroll
      expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth);
    });
  }

  test("scroll indicator navigates to #como-funciona without header overlap", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/", { waitUntil: "networkidle" });

    const scrollCue = page.locator("#inicio").getByRole("link", { name: /Rolar para Como Funciona/i });
    await expect(scrollCue).toBeVisible();
    await scrollCue.click();

    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const headerH = document.querySelector("header")!.getBoundingClientRect().height;
          const nextTop = document.querySelector("#como-funciona")!.getBoundingClientRect().top;
          return Math.round(nextTop - headerH);
        });
      })
      .toBeGreaterThanOrEqual(-2);
  });
});
