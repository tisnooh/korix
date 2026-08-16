import { ChartNoAxesCombined, Crosshair, Rocket } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";

const pillars = [
  {
    icon: Crosshair,
    title: "Attirer",
    text: "Une identité visuelle cohérente avec votre métier, reconnaissable dès les premières secondes.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Convaincre",
    text: "Des contenus organisés autour des questions que vos prospects se posent avant de vous contacter.",
  },
  {
    icon: Rocket,
    title: "Développer",
    text: "Un site rapide, accessible et simple à faire évoluer lorsque votre activité avance.",
  },
] as const;

export function Mission() {
  return (
    <section className="section section--border" id="mission" aria-labelledby="mission-title">
      <div className="container split-section">
        <div>
          <SectionIntro
            eyebrow="Notre mission"
            title={<>Un site qui aide vos clients à <em>vous choisir.</em></>}
            text="Nous travaillons le message, le parcours et la réalisation technique pour que votre offre soit comprise rapidement, sur ordinateur comme sur mobile."
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
