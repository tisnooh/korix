import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Réalisations et concepts de sites internet",
  description: "Découvrez les concepts KORIX conçus pour illustrer notre approche du design, des contenus et des parcours web.",
  alternates: { canonical: "/realisations" },
};

export default function ProjectsPage() {
  return (
    <div className="content-page projects-page">
      <header className="container content-hero">
        <p className="eyebrow"><span /> Nos réalisations</p>
        <h1>Des concepts qui montrent notre manière de <em>penser un site.</em></h1>
        <p className="content-lead">
          Ces projets sont des concepts démonstratifs créés par KORIX. Ils ne sont pas présentés comme des commandes clients&nbsp;: ils illustrent notre travail sur la hiérarchie, l’ambiance et les parcours.
        </p>
      </header>

      <section className="container content-section" aria-labelledby="project-list-title">
        <h2 className="sr-only" id="project-list-title">Liste des concepts KORIX</h2>
        <div className="project-route-grid">
          {projects.map((project) => (
            <article className="project-route-card" key={project.slug}>
              <Link className="project-route-media" href={`/realisations/${project.slug}`} aria-label={`Découvrir le concept ${project.title}`}>
                <Image src={project.image} alt={project.alt} width={1408} height={768} sizes="(max-width: 760px) 100vw, 50vw" />
              </Link>
              <div className="project-route-copy">
                <div><span>{project.sector}</span><span>Concept KORIX</span></div>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <Link className="text-link" href={`/realisations/${project.slug}`}>Voir le concept <ArrowUpRight aria-hidden="true" size={17} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container case-cta content-cta">
        <div>
          <p className="eyebrow"><span /> Votre activité</p>
          <h2>Construisons une direction qui vous ressemble.</h2>
        </div>
        <Link className="button button--primary" href="/contact">Présenter votre projet <ArrowRight aria-hidden="true" size={18} /></Link>
      </section>
    </div>
  );
}
