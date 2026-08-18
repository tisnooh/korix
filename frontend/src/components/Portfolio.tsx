"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export function Portfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true, skipSnaps: false });
  const [selected, setSelected] = useState(0);

  const updateSelected = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateSelected);
    emblaApi.on("reInit", updateSelected);
    return () => {
      emblaApi.off("select", updateSelected);
      emblaApi.off("reInit", updateSelected);
    };
  }, [emblaApi, updateSelected]);

  return (
    <section className="section section--border portfolio-section" id="realisations" aria-labelledby="portfolio-title">
      <div className="container portfolio-heading">
        <div className="section-intro">
          <p className="eyebrow"><span /> Nos réalisations</p>
          <h2 id="portfolio-title">Des concepts pour montrer notre <em>approche.</em></h2>
          <p>Ces projets sont des démonstrations créatives réalisées par KORIX. Ils ne sont associés à aucun client.</p>
        </div>
        <div className="carousel-controls" aria-label="Contrôles du carrousel">
          <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="Réalisation précédente" data-testid="portfolio-prev">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => emblaApi?.scrollNext()} aria-label="Réalisation suivante" data-testid="portfolio-next">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="portfolio-viewport" ref={emblaRef} data-testid="portfolio-carousel">
        <div className="portfolio-track">
          {projects.map((project, index) => {
            const isSelected = selected === index;
            return (
              <article
                className="project-slide"
                key={project.slug}
                aria-label={`${index + 1} sur ${projects.length}`}
                aria-hidden={!isSelected}
                inert={!isSelected}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  loading={isSelected ? "eager" : "lazy"}
                  quality={82}
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 58vw"
                />
                <div className="project-shade" />
                <div className="project-topline">
                  <span>{project.sector}</span>
                  <span className="concept-badge">Concept KORIX</span>
                </div>
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <Link href={`/realisations/${project.slug}`} data-track={`project_${project.slug}`}>
                    Découvrir le concept <ArrowUpRight aria-hidden="true" size={17} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container portfolio-foot">
        <div className="carousel-dots" aria-label="Choisir une réalisation">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              className={selected === index ? "is-active" : ""}
              aria-label={`Afficher ${project.title}`}
              aria-current={selected === index ? "true" : undefined}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
        <Link className="text-link" href="/realisations" data-track="cta_portfolio">
          Voir toutes les réalisations <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </section>
  );
}
