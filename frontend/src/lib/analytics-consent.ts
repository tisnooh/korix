export type AnalyticsConsent = "unknown" | "accepted" | "refused";

const storageKey = "korix-analytics-consent";
let transientConsent: AnalyticsConsent = "unknown";

export function readAnalyticsConsent(): AnalyticsConsent {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored === "accepted" || stored === "refused" ? stored : transientConsent;
  } catch {
    return transientConsent;
  }
}

export function saveAnalyticsConsent(value: Exclude<AnalyticsConsent, "unknown">) {
  transientConsent = value;
  try {
    window.localStorage.setItem(storageKey, value);
  } catch {
    // The in-memory choice still applies to the current page.
  }
}

export function clearAnalyticsConsent() {
  transientConsent = "unknown";
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // The in-memory choice is still cleared for the current page.
  }
}
