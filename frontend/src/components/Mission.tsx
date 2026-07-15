import { ChartNoAxesCombined, Crosshair, Rocket } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";

const pillars = [
  {
    icon: Crosshair,
    title: "Attirer",
    text: "Une identité digitale qui capte l’attention et rend votre positionnement immédiatement lisible.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Convaincre",
    text: "Un parcours fluide qui répond aux bonnes questions et conduit naturellement vers la prise de contact.",
  },
  {
    icon: Rocket,
    title: "Développer",
    text: "Une base rapide, responsive et évolutive conçue pour accompagner durablement votre activité.",
  },
] as const;

export function Mission() {
  return (
    <section className="section section--border" id="mission" aria-labelledby="mission-title">
      <div className="container split-section">
        <div>
          <SectionIntro
            eyebrow="Notre mission"
            title={<>Votre réussite commence par un site <em>remarquable.</em></>}
            text="Chaque décision de design sert un objectif précis : rendre votre entreprise plus claire, plus crédible et plus simple à choisir."
          />
        </div>
        <div className="mission-grid">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article className="feature-card" key={title}>
              <div className="feature-icon"><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
