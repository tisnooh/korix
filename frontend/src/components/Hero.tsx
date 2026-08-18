import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, KeyRound, ShieldCheck } from "lucide-react";

const promises = [
  { icon: Gauge, title: "Rapides", text: "Pensés pour la fluidité" },
  { icon: ShieldCheck, title: "Fiables", text: "Développés avec soin" },
  { icon: KeyRound, title: "À vous", text: "Accès et propriété transmis" },
] as const;

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Image
        className="hero-background"
        src="/assets/korix-hero-space-background-1920.webp"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
      />
      <div className="hero-overlay" aria-hidden="true" />
      <Image
        className="hero-device"
        src="/assets/korix-laptop-rock-transparent-1920.png"
        alt="Ordinateur KORIX présentant une sélection de créations de sites, posé sur une roche éclairée en bleu"
        width={1920}
        height={1080}
        priority
        quality={94}
        sizes="(max-width: 899px) 110vw, min(68vw, 1280px)"
      />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Création de sites internet</p>
          <h1 id="hero-title">
            <span className="hero-title-line">Des sites internet</span>
            <span className="hero-title-line">conçus pour</span>
            <span className="hero-title-line"><em>développer</em> votre</span>
            <span className="hero-title-line">activité.</span>
          </h1>
          <p className="hero-lead">
            Des sites rapides et clairs, conçus pour présenter votre activité et faciliter les prises de contact.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" href="/contact" data-track="cta_hero_primary">
              Démarrer un projet <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="button button--ghost" href="/realisations" data-track="cta_hero_projects">
              Voir nos réalisations <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>

        <div className="hero-promises" aria-label="Engagements KORIX">
          {promises.map(({ icon: Icon, title, text }) => (
            <div className="hero-promise" key={title}>
              <Icon aria-hidden="true" />
              <span><strong>{title}</strong><small>{text}</small></span>
            </div>
          ))}
        </div>
      </div>
      <div className="quality-seal" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <defs><path id="seal-path" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" /></defs>
          <text><textPath href="#seal-path">KORIX · DESIGN · DÉVELOPPEMENT · </textPath></text>
        </svg>
        <span>✦</span>
      </div>
    </section>
  );
}
