# KORIX — Landing Page Premium (PRD)

## Problem Statement
Ultra-premium one-page landing page for KORIX, a business that ONLY creates websites
(Site vitrine, Site e-commerce, Landing page, Refonte de site). FRENCH only.
Dark luxurious cinematic theme, electric blue highlights. Must instantly communicate that
KORIX builds premium websites that help businesses look professional and attract more clients.

## User Choices
- 100% static (no backend, no DB)
- Dark theme only
- Premium AI-generated website mockup images per sector (dentaire, restaurant, beauté, immobilier)
- Reference image provided as visual inspiration (refined, not copied)

## Architecture
- Frontend: React (CRA + craco), Tailwind, framer-motion, lucide-react
- No backend usage. Fully static marketing page served on `/`.
- Page: `/app/frontend/src/pages/Landing.jsx`
- Sections: `/app/frontend/src/components/landing/` (Header, Hero, TrustBar, Services, Portfolio, Process, FinalCTA, Footer, Primitives)
- Images: generated once via Gemini Nano Banana (gemini-3.1-flash-image-preview), saved to
  `/app/frontend/public/assets/` (hero-scene, portfolio-dentaire/beaute/restaurant/immobilier). Script: `/app/scripts/gen_images.py`

## Design System
- Fonts: Cabinet Grotesk (display) + Outfit (body) via Fontshare
- Colors: deep black #030303, surface #08080A, electric blue #0057FF, cyan #00E5FF
- Effects: planet-glow radial gradients, blue glow, glassmorphism, grain overlay, floating + scroll-reveal animations

## Implemented (2026-06-16)
- Transparent→blurred sticky header with nav + "Démarrer un projet" CTA + menu icon
- Cinematic hero: bold headline, dual CTAs, floating laptop+mobile mockup w/ blue glow, rotating badge, 3 value points
- Glass trust bar: client sectors + 3 stats (120+, 98%, 2,5M€)
- Services: 4 premium dark cards w/ hover glow
- Portfolio: editorial alternating layout, 4 sector projects w/ premium mockups + hover
- Process: 4-step glowing timeline
- Final CTA: luminous blue section + mailto button + 3 reassurance points
- Footer: 4 columns + social icons
- Fully responsive; verified by testing agent at 100% (frontend), no console errors

## Upgrade — Cinematic layered direction (2026-06-16)
- Hero rebuilt in animated LAYERS from uploaded separated assets: galaxy starfield (CSS, drift+twinkle) + glowing planet horizon (`planet-arc.png`, mix-blend-screen, parallax, halo pulse) + floating laptop-on-rock foreground (`laptop-rock.png`). framer-motion useScroll parallax on stars/planet/laptop/text. Inline stats (+50 / 98% / 2,5M€).
- Added Mission section (3 cards: Attirer / Convaincre / Développer).
- Portfolio converted to premium embla carousel (prev/next + dots, peeking slides): Résidences Horizon, Le Goût Authentique, Clinique Dentaire Lumière, Maison Éclat.
- Process copy updated (Découverte/Conception/Développement/Lancement).
- Final CTA now uses large planet horizon (`planet-wide.png`, mix-blend-screen) as cinematic background.
- TrustBar simplified to client-sectors strip. Verified 100% (testing agent iteration_2).

## Backlog / Next Action Items
- P1: Functional contact form (backend + email) when KORIX wants lead capture
- P2: "Tarifs" and "À propos" dedicated content/sections (currently anchors)
- P2: Dynamic copyright year; multi-language toggle
- P2: Real client logos in trust bar
