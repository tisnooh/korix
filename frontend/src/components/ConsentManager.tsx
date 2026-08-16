"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  readAnalyticsConsent,
  saveAnalyticsConsent,
  type AnalyticsConsent,
} from "@/lib/analytics-consent";

type PostHogClient = typeof import("posthog-js").default;

export function ConsentManager() {
  const consent = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("korix:consent", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("korix:consent", onStoreChange);
      };
    },
    readAnalyticsConsent,
    () => "unknown",
  ) as AnalyticsConsent;
  const clientRef = useRef<PostHogClient | null>(null);

  const initializeAnalytics = useCallback(async () => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    if (clientRef.current) {
      clientRef.current.opt_in_capturing();
      return;
    }
    const { default: posthog } = await import("posthog-js");
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      disable_session_recording: true,
      person_profiles: "identified_only",
      persistence: "localStorage+cookie",
    });
    posthog.opt_in_capturing();
    clientRef.current = posthog;
  }, []);

  useEffect(() => {
    if (consent === "accepted") {
      void initializeAnalytics();
      return;
    }
    if (clientRef.current) {
      clientRef.current.opt_out_capturing();
      clientRef.current.reset();
    }
  }, [consent, initializeAnalytics]);

  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (target && clientRef.current) clientRef.current.capture(target.dataset.track || "cta_click");
    };
    const trackConversion = (event: Event) => {
      const name = (event as CustomEvent<{ event?: string }>).detail?.event;
      if (name && clientRef.current) clientRef.current.capture(name);
    };
    document.addEventListener("click", trackClick);
    window.addEventListener("korix:conversion", trackConversion);
    return () => {
      document.removeEventListener("click", trackClick);
      window.removeEventListener("korix:conversion", trackConversion);
    };
  }, []);

  const choose = (value: Exclude<AnalyticsConsent, "unknown">) => {
    saveAnalyticsConsent(value);
    window.dispatchEvent(new Event("korix:consent"));
  };

  if (consent !== "unknown") return null;

  return (
    <aside className="consent-banner" aria-labelledby="consent-title" data-testid="consent-banner" tabIndex={-1}>
      <div>
        <strong id="consent-title">Mesure d’audience respectueuse</strong>
        <p>
          Avec votre accord, des statistiques de fréquentation nous aident à améliorer ce site. Aucun enregistrement de session
          n’est activé. <Link href="/politique-confidentialite">En savoir plus</Link>
        </p>
      </div>
      <div className="consent-actions">
        <button type="button" className="button button--ghost" onClick={() => choose("refused")}>Refuser</button>
        <button type="button" className="button button--primary" onClick={() => choose("accepted")}>Accepter</button>
      </div>
    </aside>
  );
}
