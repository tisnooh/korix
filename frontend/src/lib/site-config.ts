export const navigation = [
  { label: "Réalisations", href: "/realisations" },
  { label: "Services", href: "/services" },
  { label: "Processus", href: "/#processus" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const instagramUrl = "https://www.instagram.com/korixagency";
export const whatsappUrl = "https://wa.me/33759354091";

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const defaultSiteUrl = deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000";

export const siteConfig = {
  name: "KORIX",
  description:
    "KORIX conçoit des sites internet clairs, rapides et adaptés aux besoins des entreprises.",
  url: trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl),
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "korixagency@gmail.com",
  phone: process.env.NEXT_PUBLIC_PHONE || "+33 7 59 35 40 91",
  socials: [
    { label: "Instagram", href: instagramUrl },
  ],
  legal: {
    name: process.env.NEXT_PUBLIC_LEGAL_NAME || "Itiel Apetse",
    form: process.env.NEXT_PUBLIC_LEGAL_FORM || "Activité en cours de création",
    address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "",
    registration: process.env.NEXT_PUBLIC_LEGAL_REGISTRATION || "",
    publicationDirector: process.env.NEXT_PUBLIC_PUBLICATION_DIRECTOR || "Itiel Apetse",
    hostName: process.env.NEXT_PUBLIC_HOST_NAME || "",
    hostAddress: process.env.NEXT_PUBLIC_HOST_ADDRESS || "",
  },
} as const;
