"use client";

import Image from "next/image";
import Link from "next/link";
import { PointerEvent, useRef } from "react";
import { ArrowRight, Gauge, KeyRound, ShieldCheck } from "lucide-react";

const promises = [
  { icon: Gauge, title: "Rapides", text: "Pensés pour la fluidité" },
  { icon: ShieldCheck, title: "Fiables", text: "Développés avec soin" },
  { icon: KeyRound, title: "À vous", text: "Accès et propriété transmis" },
] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);

  const updateDeviceDepth = (event: PointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(min-width: 900px) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = heroRef.current;
    if (!hero) return;
    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      hero.style.setProperty("--hero-device-x", `${x.toFixed(2)}px`);
      hero.style.setProperty("--hero-device-y", `${y.toFixed(2)}px`);
    });
  };

  const resetDeviceDepth = () => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.setProperty("--hero-device-x", "0px");
    hero.style.setProperty("--hero-device-y", "0px");
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={updateDeviceDepth}
      onPointerLeave={resetDeviceDepth}
    >
      <Image
        className="hero-background"
        src="/assets/korix-hero-space-clean.png"
        alt=""
        fill
        priority
        quality={84}
        sizes="100vw"
      />
      <Image
        className="hero-planet"
        src="/assets/korix-hero-planet-transparent.png"
        alt=""
        width={1302}
        height={1208}
        priority
        quality={86}
        sizes="(max-width: 899px) 140vw, min(76vw, 1450px)"
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
      <div className="hero-transition" aria-hidden="true" />
    </section>
  );
}
