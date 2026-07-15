import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";

const steps = [
  { number: "01", title: "Découverte", text: "Vos objectifs, votre activité et vos priorités sont cadrés ensemble." },
  { number: "02", title: "Conception", text: "La structure, les contenus et la direction visuelle prennent forme." },
  { number: "03", title: "Développement", text: "Le site devient rapide, accessible et parfaitement responsive." },
  { number: "04", title: "Lancement", text: "Après les contrôles, vous recevez le site et l’ensemble de ses accès." },
] as const;

export function Process() {
  return (
    <section className="section section--border" id="processus" aria-labelledby="process-title">
      <div className="container process-layout">
        <div>
          <SectionIntro eyebrow="Notre processus" title={<>Une méthode claire, sans <em>zone d’ombre.</em></>} />
          <Link className="text-link process-link" href="#contact" data-track="cta_process">
            Lancer la première étape <ArrowRight aria-hidden="true" size={18} />
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
