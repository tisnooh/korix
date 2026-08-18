import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services de création de sites internet",
  description: "Sites vitrines, e-commerce, landing pages et refontes conçus par KORIX selon les besoins réels de votre activité.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="content-page">
      <header className="container content-hero">
        <p className="eyebrow"><span /> Nos services</p>
        <h1>Un site conçu autour de votre activité, <em>pas d’un modèle générique.</em></h1>
        <p className="content-lead">
          KORIX accompagne les entreprises qui ont besoin d’un site clair, crédible et simple à utiliser. Le format est choisi selon votre offre, vos contenus et l’action attendue de vos visiteurs.
        </p>
        <Link className="button button--primary" href="/contact">Décrire votre projet <ArrowRight aria-hidden="true" size={18} /></Link>
      </header>

      <section className="container content-section" aria-labelledby="service-list-title">
        <div className="content-section-heading">
          <p className="eyebrow"><span /> Les formats</p>
          <h2 id="service-list-title">Quatre réponses à des besoins différents.</h2>
        </div>
        <div className="route-grid route-grid--services">
          {services.map((service, index) => (
            <Link className="route-card route-card--service" href={`/services/${service.slug}`} key={service.slug}>
              <span className="route-card-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <span className="route-card-link">Découvrir ce service <ArrowRight aria-hidden="true" size={17} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container case-cta content-cta">
        <div>
          <p className="eyebrow"><span /> Première étape</p>
          <h2>Vous ne savez pas encore quel format choisir&nbsp;?</h2>
          <p>Présentez simplement votre activité et votre objectif. Nous vous aiderons à définir le périmètre utile.</p>
        </div>
        <Link className="button button--primary" href="/contact">Échanger sur votre besoin <ArrowRight aria-hidden="true" size={18} /></Link>
      </section>
    </div>
  );
}
