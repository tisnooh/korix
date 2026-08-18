import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";

const steps = [
  { number: "01", title: "Découverte", text: "Nous clarifions votre activité, vos clients et l’objectif principal du site." },
  { number: "02", title: "Conception", text: "Nous préparons la structure, les contenus et la direction visuelle." },
  { number: "03", title: "Développement", text: "Nous intégrons le site et contrôlons son affichage sur chaque écran." },
  { number: "04", title: "Mise en ligne", text: "Après validation, le site est publié et tous les accès vous sont transmis." },
] as const;

export function Process() {
  return (
    <section className="section section--border" id="processus" aria-labelledby="process-title">
      <div className="container process-layout">
        <div>
          <SectionIntro eyebrow="Notre processus" title={<>De la première discussion à la <em>mise en ligne.</em></>} />
          <Link className="text-link process-link" href="/contact" data-track="cta_process">
            Décrire votre projet <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <ol className="process-steps">
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
