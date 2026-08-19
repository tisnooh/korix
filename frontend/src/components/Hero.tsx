"use client";

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
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
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
      <div className="hero-device-stage">
        <Image
          className="hero-device"
          src="/assets/korix-laptop-rock-transparent-1920.png"
          alt="Ordinateur KORIX présentant une sélection de créations de sites, posé sur une roche éclairée en bleu"
          width={1920}
          height={1080}
          priority
          quality={94}
          sizes="(max-width: 899px) 118vw, min(68vw, 1280px)"
        />
        <div className="hero-device-energy" aria-hidden="true">
          <svg className="hero-device-energy-map" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="hero-crack-dim" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.9 -0.7 1.5 0 -0.05"
                  result="crackAlpha"
                />
                <feFlood floodColor="#00030a" result="dimColor" />
                <feComposite in="dimColor" in2="crackAlpha" operator="in" />
              </filter>
              <filter id="hero-crack-glow" x="-12%" y="-12%" width="124%" height="124%" colorInterpolationFilters="sRGB">
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.9 -0.7 1.5 0 -0.05"
                  result="crackAlpha"
                />
                <feFlood floodColor="#008cff" result="energyColor" />
                <feComposite in="energyColor" in2="crackAlpha" operator="in" result="energyCore" />
                <feGaussianBlur in="energyCore" stdDeviation="5" result="energyGlow" />
                <feMerge>
                  <feMergeNode in="energyGlow" />
                  <feMergeNode in="energyCore" />
                </feMerge>
              </filter>
              <linearGradient id="hero-crack-sweep-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="black" />
                <stop offset="0.26" stopColor="black" />
                <stop offset="0.46" stopColor="#6d6d6d" />
                <stop offset="0.5" stopColor="white" />
                <stop offset="0.58" stopColor="#b8b8b8" />
                <stop offset="0.78" stopColor="#222" />
                <stop offset="1" stopColor="black" />
              </linearGradient>
              <mask className="hero-crack-sweep-mask" id="hero-crack-sweep-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080">
                <rect className="hero-crack-sweep" x="-900" y="0" width="820" height="1080" fill="url(#hero-crack-sweep-gradient)" />
              </mask>
            </defs>
            <image
              className="hero-device-crack-dimmer"
              href="/assets/korix-laptop-rock-transparent-1920.png"
              width="1920"
              height="1080"
              filter="url(#hero-crack-dim)"
            />
            <image
              className="hero-device-energy-image"
              href="/assets/korix-laptop-rock-transparent-1920.png"
              width="1920"
              height="1080"
              filter="url(#hero-crack-glow)"
              mask="url(#hero-crack-sweep-mask)"
            />
          </svg>
        </div>
      </div>
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
