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

test.describe("HowItWorks (section 2) full-viewport layout", () => {
  for (const vp of VIEWPORTS) {
    test(`fits exact visible viewport when scrolled to #como-funciona on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/", { waitUntil: "networkidle" });

      // Jump directly to #como-funciona accounting for sticky header
      await page.evaluate(() => {
        const headerH = document.querySelector("header")!.getBoundingClientRect().height;
        const sec = document.querySelector("#como-funciona")! as HTMLElement;
        window.scrollTo({ top: sec.offsetTop - headerH, behavior: "instant" as ScrollBehavior });
      });

      const section = page.locator("#como-funciona");
      const cta = section.getByRole("link", { name: /Ver Tabela de Descontos/i });
      const scrollCue = section.getByRole("link", { name: /Rolar para Tabela de Descontos/i });

      await expect(section).toBeVisible();
      await expect(cta).toBeVisible();
      await expect(scrollCue).toBeVisible();

      const metrics = await page.evaluate(() => {
        const headerH = document.querySelector("header")!.getBoundingClientRect().height;
        const secRect = document.querySelector("#como-funciona")!.getBoundingClientRect();
        const nextRect = document.querySelector("#tabela-descontos")!.getBoundingClientRect();
        const ctaRect = document
          .querySelector('#como-funciona a[href="#tabela-descontos"]')!
          .getBoundingClientRect();
        const items = [...document.querySelectorAll("#como-funciona ol li")].map((el) => {
          const r = el.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom };
        });

        return {
          innerWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          headerHeight: headerH,
          secTop: secRect.top,
          secBottom: secRect.bottom,
          nextTop: nextRect.top,
          ctaTop: ctaRect.top,
          ctaBottom: ctaRect.bottom,
          itemsCount: items.length,
          firstItemTop: items[0].top,
          lastItemBottom: items[items.length - 1].bottom,
        };
      });

      // Exact viewport fit below sticky header (tolerance 1px)
      expect(Math.abs(metrics.secTop - metrics.headerHeight)).toBeLessThanOrEqual(1);
      expect(Math.abs(metrics.secBottom - vp.height)).toBeLessThanOrEqual(1);

      // Next section (#tabela-descontos) completely below the fold
      expect(metrics.nextTop).toBeGreaterThanOrEqual(vp.height - 0.5);

      // All 5 steps and CTA fully visible inside the viewport
      expect(metrics.itemsCount).toBe(5);
      expect(metrics.firstItemTop).toBeGreaterThanOrEqual(metrics.headerHeight);
      expect(metrics.lastItemBottom).toBeLessThanOrEqual(vp.height);
      expect(metrics.ctaTop).toBeGreaterThanOrEqual(metrics.headerHeight);
      expect(metrics.ctaBottom).toBeLessThanOrEqual(vp.height);

      // No horizontal overflow
      expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth);
    });
  }
});
