import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, BarChart3, Zap } from "lucide-react";
import { Overline } from "./Primitives";

const ease = [0.22, 1, 0.36, 1];

const STATS = [
  { icon: Star, value: "+50", label: "Entreprises accompagnées" },
  { icon: BarChart3, value: "98%", label: "Clients satisfaits" },
  { icon: Zap, value: "2,5M€", label: "De valeur générée" },
];

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planetY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const planetScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100vh] overflow-hidden pt-32 md:pt-40 pb-20"
      data-testid="hero-section"
    >
      {/* deep space backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_60%_8%,rgba(0,72,220,0.22),transparent_60%)]" />
      <motion.div style={{ y: starsY }} className="absolute inset-0 starfield animate-drift opacity-70" />
      <motion.div style={{ y: starsY }} className="absolute inset-0 starfield animate-twinkle opacity-40" />

      {/* planet horizon — lower background layer */}
      <motion.div
        style={{ y: planetY, scale: planetScale }}
        className="absolute -bottom-[42%] left-1/2 -translate-x-1/2 w-[140%] md:w-[120%] lg:w-[95%] pointer-events-none"
      >
        <div className="relative animate-halo">
          <img
            src="/assets/planet-arc.png"
            alt=""
            aria-hidden="true"
            className="w-full blend-screen select-none"
          />
        </div>
      </motion.div>
      {/* horizon glow line */}
      <div className="absolute bottom-[8%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2f7bff]/70 to-transparent blur-[1px] animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-8 items-center">
        {/* Left — copy */}
        <motion.div style={{ y: textY }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <Overline>Studio de sites web</Overline>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight text-white"
          >
            Des sites internet <br className="hidden sm:block" />
            qui font la <span className="text-gradient">différence</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-7 max-w-md text-base sm:text-lg font-light leading-relaxed text-zinc-400"
          >
            Des sites modernes, rapides et pensés pour convertir vos visiteurs en clients.
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
              Voir mes projets
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* inline stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6"
          >
            {STATS.map((s) => (
              <div key={s.label} data-testid={`hero-stat-${s.value}`} className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-xl hairline glass flex items-center justify-center text-[#4d8bff]">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-white leading-none">{s.value}</p>
                  <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — layered device scene */}
        <motion.div
          style={{ y: laptopY }}
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
          className="relative"
        >
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,87,255,0.28),transparent_65%)] blur-2xl scale-110" />
          <div className="relative animate-float">
            <img
              src="/assets/laptop-rock.png"
              alt="Maquette de site web premium créée par KORIX"
              data-testid="hero-mockup"
              className="relative w-full select-none drop-shadow-[0_50px_90px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* rotating premium badge */}
          <div className="absolute right-2 top-2 sm:right-6 sm:top-6 h-24 w-24 hidden sm:flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow text-zinc-400/70">
              <defs>
                <path id="heroCircle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="8.5" fill="currentColor" letterSpacing="2.5">
                <textPath href="#heroCircle">KORIX • CRÉATION DE SITES WEB • </textPath>
              </text>
            </svg>
            <div className="h-8 w-8 rounded-full bg-[#0057FF] blue-glow rotate-45" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
