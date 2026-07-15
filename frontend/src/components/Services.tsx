import Link from "next/link";
import { ArrowRight, Blocks, LayoutTemplate, RefreshCcw, ShoppingBag } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";

const services = [
  {
    number: "01",
    icon: LayoutTemplate,
    title: "Site vitrine sur mesure",
    text: "Présenter votre activité avec précision, inspirer confiance et générer des demandes qualifiées.",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "Site e-commerce",
    text: "Construire une expérience d’achat rapide, rassurante et simple à administrer au quotidien.",
  },
  {
    number: "03",
    icon: Blocks,
    title: "Landing page",
    text: "Concentrer votre message et votre acquisition sur une page conçue pour une action précise.",
  },
  {
    number: "04",
    icon: RefreshCcw,
    title: "Refonte stratégique",
    text: "Transformer un site dépassé en outil moderne, performant et cohérent avec votre ambition.",
  },
] as const;

export function Services() {
  return (
    <section className="section section--border" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading-row">
          <SectionIntro
            eyebrow="Nos expertises"
            title={<>Le bon format pour le bon <em>objectif.</em></>}
            text="Pas de formule générique : le périmètre, les contenus et la technologie sont définis selon votre activité."
          />
          <Link className="text-link" href="#contact" data-track="cta_services">
            Échanger sur votre besoin <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className="services-list">
          {services.map(({ number, icon: Icon, title, text }) => (
            <article className="service-row" key={title}>
              <span className="service-number">{number}</span>
              <div className="service-icon"><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowRight className="service-arrow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
