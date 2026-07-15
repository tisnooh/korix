export const navigation = [
  { label: "Réalisations", href: "/#realisations" },
  { label: "Services", href: "/#services" },
  { label: "Processus", href: "/#processus" },
  { label: "À propos", href: "/#mission" },
] as const;

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

export const siteConfig = {
  name: "KORIX",
  description:
    "KORIX conçoit des sites internet sur mesure, rapides et pensés pour transformer une présence en ligne en levier de développement.",
  url: trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  socials: [
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "" },
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "" },
  ].filter((social) => social.href),
  legal: {
    name: process.env.NEXT_PUBLIC_LEGAL_NAME || "KORIX",
    form: process.env.NEXT_PUBLIC_LEGAL_FORM || "",
    address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "",
    registration: process.env.NEXT_PUBLIC_LEGAL_REGISTRATION || "",
    publicationDirector: process.env.NEXT_PUBLIC_PUBLICATION_DIRECTOR || "",
    hostName: process.env.NEXT_PUBLIC_HOST_NAME || "",
    hostAddress: process.env.NEXT_PUBLIC_HOST_ADDRESS || "",
  },
} as const;

export const serviceNames = [
  "Site vitrine sur mesure",
  "Site e-commerce",
  "Landing page de conversion",
  "Refonte stratégique",
] as const;
