import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Target } from "lucide-react";
import { Overline } from "./Primitives";

const VALUES = [
  { icon: Zap, title: "Rapides", text: "Chargement ultra rapide" },
  { icon: ShieldCheck, title: "Sécurisés", text: "Protection et fiabilité" },
  { icon: Target, title: "Optimisés", text: "Pensés pour convertir" },
];

const ease = [0.22, 1, 0.36, 1];

export const Hero = () => {
  return (
    <section id="top" className="relative pt-36 md:pt-44 pb-24 overflow-hidden">
      <div className="absolute inset-0 radial-top pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] planet-glow pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
        {/* Left */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <Overline>Création de sites web</Overline>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight text-white"
          >
            Des sites internet <br className="hidden sm:block" />
            conçus pour <span className="text-gradient">développer</span> votre activité.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-7 max-w-xl text-base sm:text-lg font-light leading-relaxed text-zinc-400"
          >
            Je crée des sites web modernes, rapides et optimisés pour attirer vos
            visiteurs et convertir plus de clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white bg-[#0057FF] hover:bg-[#1f6bff] hover:shadow-[0_0_30px_rgba(0,87,255,0.6)] transition-all duration-300"
            >
              Démarrer un projet
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#projets"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-zinc-200 hairline glass hover:border-[#0057FF]/50 hover:text-white transition-all duration-300"
            >
              Voir mes réalisations
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Value points */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            {VALUES.map((v) => (
              <div key={v.title} data-testid={`value-${v.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`} className="flex items-start gap-3">
                <div className="mt-0.5 h-10 w-10 shrink-0 rounded-xl hairline glass flex items-center justify-center text-[#4d8bff]">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{v.title}</p>
                  <p className="text-xs text-zinc-500">{v.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - device scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
          className="relative"
        >
          <div className="absolute -inset-10 planet-glow blur-2xl opacity-80 pointer-events-none" />
          <div className="relative animate-float">
            <div className="absolute inset-0 blue-glow rounded-[2rem]" />
            <img
              src="/assets/hero-scene.png"
              alt="Maquette de site web premium KORIX"
              data-testid="hero-mockup"
              className="relative w-full rounded-[1.5rem] drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* rotating badge */}
          <div className="absolute -right-2 -bottom-2 sm:right-2 sm:bottom-6 h-24 w-24 hidden sm:flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow text-zinc-500">
              <defs>
                <path id="circlePath" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="9" fill="currentColor" letterSpacing="2">
                <textPath href="#circlePath">KORIX • SITES WEB PREMIUM • KORIX • </textPath>
              </text>
            </svg>
            <div className="h-9 w-9 rounded-full bg-[#0057FF] blue-glow rotate-45" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
