import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const refuse = page.getByRole("button", { name: "Refuser" });
  if (await refuse.isVisible()) await refuse.click();
});

test("la page expose le SEO et une structure sémantique", async ({ page }) => {
  await expect(page).toHaveTitle(/KORIX/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /sites internet/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /127\.0\.0\.1:3100/);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});

test("la navigation, le carrousel et les liens internes fonctionnent", async ({ page, request }) => {
  const desktopServices = page.locator('.desktop-nav a[href="/#services"]');
  if (await desktopServices.isVisible()) {
    await desktopServices.click();
  } else {
    await page.getByTestId("menu-open").click();
    await page.locator('.mobile-nav a[href="/#services"]').click();
  }
  await expect(page.locator("#services")).toBeInViewport();

  const activeBefore = page.locator('.carousel-dots button[aria-current="true"]');
  await expect(activeBefore).toHaveAttribute("aria-label", /Aurora/);
  await expect(page.locator(".project-slide").nth(1)).toHaveAttribute("inert", "");
  await page.getByTestId("portfolio-next").click();
  await expect(page.locator('.carousel-dots button[aria-current="true"]')).toHaveAttribute("aria-label", /Dentala/);
  await expect(page.locator(".project-slide").nth(0)).toHaveAttribute("inert", "");
  await expect(page.locator(".project-slide").nth(1)).not.toHaveAttribute("inert");

  const dotSize = await page.locator(".carousel-dots button").first().boundingBox();
  expect(dotSize?.width).toBeGreaterThanOrEqual(24);
  expect(dotSize?.height).toBeGreaterThanOrEqual(24);

  const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => (link as HTMLAnchorElement).getAttribute("href")).filter(Boolean))] as string[],
  );
  for (const href of hrefs.filter((value) => !value.includes("#"))) {
    const response = await request.get(href);
    expect(response.ok(), `${href} doit répondre`).toBeTruthy();
  }
});

test("le choix de mesure d’audience reste modifiable", async ({ page }) => {
  await page.getByRole("button", { name: "Gérer mes préférences" }).click();
  await expect(page.getByTestId("consent-banner")).toBeVisible();
  await expect(page.getByTestId("consent-banner")).toBeFocused();
  await page.getByRole("button", { name: "Refuser" }).click();
  await expect(page.getByTestId("consent-banner")).toHaveCount(0);
});

for (const viewport of [
  { name: "tablette", width: 768, height: 1024 },
  { name: "mobile 390", width: 390, height: 844 },
  { name: "mobile 360", width: 360, height: 800 },
]) {
  test(`aucun débordement horizontal en ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.reload();
    const dimensions = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
  });
}

test("le menu mobile est utilisable au clavier", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByTestId("menu-open").click();
  await expect(page.getByRole("dialog", { name: "Menu principal" })).toBeVisible();
  await expect(page.getByTestId("menu-close")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Menu principal" })).not.toBeVisible();
});

test("la réduction des mouvements désactive les animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const duration = await page.locator(".hero-copy").evaluate((element) => getComputedStyle(element).animationDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.01);
});
