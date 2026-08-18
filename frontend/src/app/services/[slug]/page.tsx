import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getService, services } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <article className="content-page service-page">
      <header className="container content-hero">
        <Link className="back-link" href="/services"><ArrowLeft aria-hidden="true" size={17} /> Tous les services</Link>
        <p className="eyebrow"><span /> Service KORIX</p>
        <h1>{service.title}</h1>
        <p className="content-lead">{service.lead}</p>
        <Link className="button button--primary" href="/contact">Parler de ce projet <ArrowRight aria-hidden="true" size={18} /></Link>
      </header>

      <div className="container service-detail-grid">
        <section>
          <p className="eyebrow"><span /> Pour qui</p>
          <h2>Ce format peut vous convenir si…</h2>
          <ul className="bullet-list">
            {service.audience.map((item) => <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>)}
          </ul>
        </section>
        <section>
          <p className="eyebrow"><span /> Notre approche</p>
          <h2>Une conception guidée par l’usage.</h2>
          <ul className="bullet-list">
            {service.approach.map((item) => <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>)}
          </ul>
        </section>
        <section>
          <p className="eyebrow"><span /> Ce qui est prévu</p>
          <h2>Des livrables clairs dès le départ.</h2>
          <ul className="bullet-list">
            {service.deliverables.map((item) => <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>)}
          </ul>
        </section>
      </div>

      <section className="container case-cta content-cta">
        <div>
          <p className="eyebrow"><span /> Votre besoin</p>
          <h2>Définissons le périmètre adapté à votre activité.</h2>
        </div>
        <Link className="button button--primary" href="/contact">Présenter votre projet <ArrowRight aria-hidden="true" size={18} /></Link>
      </section>
    </article>
  );
}
