import { describe, expect, it } from "vitest";
import { isAllowedRequestOrigin } from "./request-origin";

describe("isAllowedRequestOrigin", () => {
  it("accepte l’origine publique indiquée par Host derrière le serveur Next", () => {
    const request = new Request("http://localhost:3000/api/contact", {
      headers: { origin: "http://127.0.0.1:3100", host: "127.0.0.1:3100" },
    });
    expect(isAllowedRequestOrigin(request)).toBe(true);
  });

  it("accepte l’origine publique transmise par un proxy", () => {
    const request = new Request("http://localhost:3000/api/contact", {
      headers: {
        origin: "https://korix.fr",
        "x-forwarded-host": "korix.fr",
        "x-forwarded-proto": "https",
      },
    });
    expect(isAllowedRequestOrigin(request)).toBe(true);
  });

  it("refuse une origine tierce", () => {
    const request = new Request("https://korix.fr/api/contact", {
      headers: { origin: "https://exemple-malveillant.fr", host: "korix.fr" },
    });
    expect(isAllowedRequestOrigin(request)).toBe(false);
  });

  it("n’échoue pas avec une URL optionnelle invalide", () => {
    const request = new Request("https://korix.fr/api/contact", {
      headers: { origin: "https://korix.fr" },
    });
    expect(isAllowedRequestOrigin(request, "domaine invalide")).toBe(true);
  });
});
