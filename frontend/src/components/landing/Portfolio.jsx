import { ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "./Primitives";

const PROJECTS = [
  {
    index: "01",
    category: "Cabinet dentaire",
    name: "Clinique Dentaire Lumière",
    desc: "Une présence en ligne rassurante qui inspire confiance dès le premier regard.",
    img: "/assets/portfolio-dentaire.png",
  },
  {
    index: "02",
    category: "Institut de beauté",
    name: "Maison Éclat",
    desc: "Une vitrine élégante et sensorielle au service d'une marque haut de gamme.",
    img: "/assets/portfolio-beaute.png",
  },
  {
    index: "03",
    category: "Restaurant",
    name: "Le Goût Authentique",
    desc: "Une expérience immersive qui donne envie de réserver instantanément.",
    img: "/assets/portfolio-restaurant.png",
  },
  {
    index: "04",
    category: "Immobilier",
    name: "Résidences Horizon",
    desc: "Un univers premium pour valoriser des biens d'exception.",
    img: "/assets/portfolio-immobilier.png",
  },
];

export const Portfolio = () => {
  return (
    <section id="projets" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Reveal><Overline>Réalisations</Overline></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Des projets qui parlent de résultats.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base sm:text-lg font-light text-zinc-400">
              Des réalisations pensées pour valoriser chaque activité.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-24 md:gap-32">
          {PROJECTS.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={p.name} y={40}>
                <div
                  data-testid={`project-${i}`}
                  className={`grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* image */}
                  <div className="group relative">
                    <div className="absolute -inset-6 planet-glow blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative overflow-hidden rounded-2xl hairline">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-transparent" />
                      <div className="absolute top-5 right-5 h-11 w-11 rounded-full glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:rotate-0 -rotate-45 transition-all duration-500">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* text */}
                  <div className={reversed ? "lg:pr-6" : "lg:pl-6"}>
                    <span className="font-display text-7xl font-extrabold text-white/5">{p.index}</span>
                    <p className="mt-2 text-[11px] tracking-[0.25em] uppercase font-semibold text-[#4d8bff]">
                      {p.category}
                    </p>
                    <h3 className="font-display mt-3 text-3xl md:text-4xl font-bold text-white">{p.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-500 max-w-sm">{p.desc}</p>
                    <a
                      href="#contact"
                      data-testid={`project-link-${i}`}
                      className="group/link mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white"
                    >
                      <span className="border-b border-white/20 group-hover/link:border-[#0057FF] pb-0.5 transition-colors">
                        Voir le projet
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#4d8bff] group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
