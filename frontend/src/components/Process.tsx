"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";

const steps = [
  { number: "01", title: "Découverte", text: "Nous clarifions votre activité, vos clients et l’objectif principal du site." },
  { number: "02", title: "Conception", text: "Nous préparons la structure, les contenus et la direction visuelle." },
  { number: "03", title: "Développement", text: "Nous intégrons le site et contrôlons son affichage sur chaque écran." },
  { number: "04", title: "Mise en ligne", text: "Après validation, le site est publié et tous les accès vous sont transmis." },
] as const;

export function Process() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(steps);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section--border" id="processus" aria-labelledby="process-title">
      <div className="container process-layout">
        <div>
          <SectionIntro eyebrow="Notre processus" title={<>De la première discussion à la <em>mise en ligne.</em></>} />
          <Link className="text-link process-link" href="/contact" data-track="cta_process">
            Décrire votre projet <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <ol ref={stepsRef} className={`process-steps${isVisible ? " is-visible" : ""}`}>
          {steps.map((step) => (
            <li key={step.number}>
              <div className="process-node">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
