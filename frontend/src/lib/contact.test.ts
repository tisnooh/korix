import { describe, expect, it } from "vitest";
import {
  budgetRanges,
  desiredTimelines,
  projectTypes,
  validateContactPayload,
} from "./contact";

const validPayload = {
  name: "Camille Martin",
  company: "Atelier Martin",
  email: "camille@example.com",
  phone: "+33 6 00 00 00 00",
  projectType: projectTypes[0],
  budget: budgetRanges[1],
  timeline: desiredTimelines[1],
  description: "Nous souhaitons créer un site clair pour présenter notre activité et recevoir des demandes.",
  consent: true,
  website: "",
  startedAt: Date.now() - 10_000,
};

describe("validateContactPayload", () => {
  it("accepte une demande complète", () => {
    const result = validateContactPayload(validPayload);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("refuse les champs requis absents ou invalides", () => {
    const result = validateContactPayload({ ...validPayload, name: "", email: "incorrect", consent: false });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.consent).toBeTruthy();
  });

  it("refuse des options arbitraires", () => {
    const result = validateContactPayload({ ...validPayload, budget: "gratuit", projectType: "inconnu" });
    expect(result.errors.budget).toBeTruthy();
    expect(result.errors.projectType).toBeTruthy();
  });

  it("normalise les espaces et l'adresse e-mail", () => {
    const result = validateContactPayload({
      ...validPayload,
      name: "  Camille   Martin  ",
      email: "  CAMILLE@EXAMPLE.COM  ",
    });
    expect(result.data.name).toBe("Camille Martin");
    expect(result.data.email).toBe("camille@example.com");
  });
});
