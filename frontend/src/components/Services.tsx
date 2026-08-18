import Link from "next/link";
import { ArrowRight, Blocks, LayoutTemplate, RefreshCcw, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";
import { services } from "@/lib/services";

const serviceIcons: Record<string, LucideIcon> = {
  "site-vitrine-sur-mesure": LayoutTemplate,
  "site-e-commerce": ShoppingBag,
  "landing-page": Blocks,
  "refonte-strategique": RefreshCcw,
};

export function Services() {
  return (
    <section className="section section--border" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading-row">
          <SectionIntro
            eyebrow="Nos expertises"
            title={<>Le bon site pour votre <em>objectif.</em></>}
            text="Nous définissons le format et les fonctionnalités utiles selon votre activité, vos contenus et la façon dont vos clients vous trouvent."
          />
          <Link className="text-link" href="/services" data-track="cta_services">
            Découvrir tous les services <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className="services-list">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug];
            return (
              <Link className="service-row" href={`/services/${service.slug}`} key={service.slug}>
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="service-icon"><Icon aria-hidden="true" /></div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ArrowRight className="service-arrow" aria-hidden="true" size={19} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
