import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact et demande de projet",
  description: "Présentez votre activité et votre projet de site internet à KORIX, ou contactez-nous directement par e-mail, téléphone ou WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactSection standalone headingLevel="h1" />;
}
