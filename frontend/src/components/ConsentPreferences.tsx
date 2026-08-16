"use client";

import { clearAnalyticsConsent } from "@/lib/analytics-consent";

export function ConsentPreferences() {
  const reopenConsent = () => {
    clearAnalyticsConsent();
    window.dispatchEvent(new Event("korix:consent"));
    window.setTimeout(() => {
      document.querySelector<HTMLElement>("[data-testid='consent-banner']")?.focus();
    }, 50);
  };

  return (
    <button className="footer-preferences" type="button" onClick={reopenConsent}>
      Gérer mes préférences
    </button>
  );
}
