export const projectTypes = [
  "Site vitrine",
  "Site e-commerce",
  "Landing page",
  "Refonte de site",
  "Autre besoin",
] as const;

export const budgetRanges = [
  "Moins de 1 000 €",
  "1 000 € – 2 000 €",
  "2 000 € – 4 000 €",
  "4 000 € et plus",
  "Budget à définir",
] as const;

export const desiredTimelines = [
  "Dès que possible",
  "Sous 1 à 2 mois",
  "Sous 3 à 4 mois",
  "Plus de 4 mois",
  "À définir ensemble",
] as const;

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  consent: boolean;
  website: string;
  startedAt: number;
};

export type ContactField = keyof ContactPayload;
export type ContactErrors = Partial<Record<ContactField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+()\d\s.-]{6,30}$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

export function validateContactPayload(input: unknown): {
  data: ContactPayload;
  errors: ContactErrors;
  valid: boolean;
} {
  const source = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const data: ContactPayload = {
    name: clean(source.name, 80),
    company: clean(source.company, 120),
    email: clean(source.email, 160).toLowerCase(),
    phone: clean(source.phone, 30),
    projectType: clean(source.projectType, 60),
    budget: clean(source.budget, 60),
    timeline: clean(source.timeline, 60),
    description: typeof source.description === "string" ? source.description.trim().slice(0, 2000) : "",
    consent: source.consent === true,
    website: clean(source.website, 200),
    startedAt: typeof source.startedAt === "number" ? source.startedAt : Number(source.startedAt) || 0,
  };

  const errors: ContactErrors = {};
  if (data.name.length < 2) errors.name = "Indiquez votre nom complet.";
  if (data.company.length < 2) errors.company = "Indiquez le nom de votre entreprise ou activité.";
  if (!emailPattern.test(data.email)) errors.email = "Saisissez une adresse e-mail valide.";
  if (data.phone && !phonePattern.test(data.phone)) errors.phone = "Saisissez un numéro de téléphone valide.";
  if (!projectTypes.includes(data.projectType as (typeof projectTypes)[number])) {
    errors.projectType = "Choisissez un type de projet.";
  }
  if (!budgetRanges.includes(data.budget as (typeof budgetRanges)[number])) {
    errors.budget = "Choisissez une fourchette de budget.";
  }
  if (!desiredTimelines.includes(data.timeline as (typeof desiredTimelines)[number])) {
    errors.timeline = "Choisissez un délai souhaité.";
  }
  if (data.description.length < 30) errors.description = "Décrivez votre projet en au moins 30 caractères.";
  if (!data.consent) errors.consent = "Votre accord est nécessaire pour traiter la demande.";

  return { data, errors, valid: Object.keys(errors).length === 0 };
}
