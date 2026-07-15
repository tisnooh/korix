import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { serviceNames, siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "KORIX",
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: "France",
    availableLanguage: "fr",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Création de sites internet",
      itemListElement: serviceNames.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Hero />
      <Mission />
      <Services />
      <Portfolio />
      <Process />
      <ContactSection />
    </>
  );
}
