import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos de KORIX",
  description: "Découvrez l’approche de KORIX pour concevoir des sites internet clairs, soignés et adaptés aux entreprises.",
  alternates: { canonical: "/a-propos" },
};

const principles = [
  {
    title: "Comprendre avant de dessiner",
    text: "Le projet commence par votre activité, vos clients et vos priorités. Le design vient ensuite pour rendre ce message plus clair.",
  },
  {
    title: "Faire des choix utiles",
    text: "Chaque page, fonctionnalité et animation doit avoir une raison d’être. Nous évitons d’ajouter de la complexité qui ne sert ni votre équipe ni vos visiteurs.",
  },
  {
    title: "Livrer un site qui vous appartient",
    text: "Les accès et les éléments du projet vous sont transmis. Vous savez ce qui a été réalisé et sur quelles bases votre site fonctionne.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="content-page about-page">
      <header className="container content-hero">
        <p className="eyebrow"><span /> À propos</p>
        <h1>KORIX conçoit des sites qui rendent une activité <em>plus simple à comprendre.</em></h1>
        <p className="content-lead">
          Nous accompagnons les entreprises qui veulent une présence en ligne plus claire et plus professionnelle, sans discours opaque ni fonctionnalités ajoutées par habitude.
        </p>
        <Link className="button button--primary" href="/contact">Nous parler de votre activité <ArrowRight aria-hidden="true" size={18} /></Link>
      </header>

      <section className="container content-section" aria-labelledby="principles-title">
        <div className="content-section-heading">
          <p className="eyebrow"><span /> Notre manière de travailler</p>
          <h2 id="principles-title">Une méthode lisible du premier échange à la mise en ligne.</h2>
        </div>
        <div className="about-principles">
          {principles.map((principle, index) => (
            <article key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-commitment">
        <div>
          <p className="eyebrow"><span /> Ce que vous pouvez attendre</p>
          <h2>Des échanges concrets et un périmètre expliqué.</h2>
        </div>
        <ul className="bullet-list">
          <li><Check aria-hidden="true" /><span>Des contenus et des parcours pensés pour de vraies personnes.</span></li>
          <li><Check aria-hidden="true" /><span>Un affichage contrôlé sur ordinateur, tablette et mobile.</span></li>
          <li><Check aria-hidden="true" /><span>Des bases propres pour l’accessibilité, le référencement et la vitesse.</span></li>
          <li><Check aria-hidden="true" /><span>Des décisions expliquées, sans promesse impossible à vérifier.</span></li>
        </ul>
      </section>

      <section className="container case-cta content-cta">
        <div>
          <p className="eyebrow"><span /> Faisons connaissance</p>
          <h2>Parlez-nous de votre activité et de ce qui doit changer.</h2>
        </div>
        <Link className="button button--primary" href="/contact">Démarrer la discussion <ArrowRight aria-hidden="true" size={18} /></Link>
      </section>
    </div>
  );
}
