import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/contact");
  const refuse = page.getByRole("button", { name: "Refuser" });
  if (await refuse.isVisible()) await refuse.click();
});

test("le formulaire signale clairement les erreurs", async ({ page }) => {
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.getByText("Vérifiez les champs signalés avant l’envoi.")).toBeVisible();
  await expect(page.getByText("Indiquez votre nom complet.")).toBeVisible();
  await expect(page.locator('[name="name"]')).toBeFocused();
});

test("une demande complète atteint le service d'envoi de test", async ({ page }) => {
  await page.getByLabel("Nom").fill("Camille Martin");
  await page.getByLabel("Entreprise ou activité").fill("Atelier Martin");
  await page.getByLabel("E-mail").fill("camille@example.com");
  await page.getByLabel(/Téléphone/).fill("+33 6 00 00 00 00");
  await page.getByLabel("Type de projet").selectOption("Site vitrine");
  await page.getByLabel("Budget envisagé").selectOption("1 000 € – 2 000 €");
  await page.getByLabel("Délai souhaité").selectOption("Sous 1 à 2 mois");
  await page.getByLabel("Votre projet").fill("Nous souhaitons présenter notre activité avec un site clair et recevoir davantage de demandes qualifiées.");
  await page.getByRole("checkbox").check();
  await page.waitForTimeout(3100);
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.getByTestId("contact-success")).toBeVisible();
  await expect(page.getByText("Merci pour votre confiance.")).toBeVisible();
});
