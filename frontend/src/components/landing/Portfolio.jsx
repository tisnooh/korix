import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal, Overline } from "./Primitives";

const PROJECTS = [
  {
    category: "Immobilier",
    name: "Résidences Horizon",
    desc: "Un univers premium pour valoriser des biens d'exception.",
    img: "/assets/portfolio-immobilier.png",
  },
  {
    category: "Restaurant",
    name: "Le Goût Authentique",
    desc: "Une expérience immersive qui donne envie de réserver instantanément.",
    img: "/assets/portfolio-restaurant.png",
  },
  {
    category: "Santé",
    name: "Clinique Dentaire Lumière",
    desc: "Une présence en ligne rassurante qui inspire confiance dès le premier regard.",
    img: "/assets/portfolio-dentaire.png",
  },
  {
    category: "Institut de beauté",
    name: "Maison Éclat",
    desc: "Une vitrine élégante et sensorielle au service d'une marque haut de gamme.",
    img: "/assets/portfolio-beaute.png",
  },
];

export const Portfolio = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, dragFree: false });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section id="projets" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xl">
            <Reveal><Overline>Nos réalisations</Overline></Reveal>
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

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                data-testid="portfolio-prev"
                aria-label="Précédent"
                className="h-12 w-12 rounded-full hairline glass flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#0057FF]/60 transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                data-testid="portfolio-next"
                aria-label="Suivant"
                className="h-12 w-12 rounded-full hairline glass flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#0057FF]/60 transition-all"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* carousel */}
      <div className="mt-14 max-w-7xl mx-auto px-6 md:px-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {PROJECTS.map((p, i) => (
              <div
                key={p.name}
                data-testid={`project-${i}`}
                className="relative shrink-0 grow-0 basis-full md:basis-[68%] lg:basis-[60%]"
              >
                <div className="group relative overflow-hidden rounded-3xl hairline">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent" />

                  {/* top label */}
                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                    <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#7aa8ff] glass rounded-full px-4 py-1.5">
                      {p.category}
                    </span>
                    <span className="h-11 w-11 rounded-full glass flex items-center justify-center text-white -rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-500">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  {/* bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{p.name}</h3>
                    <p className="mt-2 max-w-md text-sm text-zinc-400">{p.desc}</p>
                    <a
                      href="#contact"
                      data-testid={`project-link-${i}`}
                      className="group/link mt-5 inline-flex items-center gap-2 rounded-full bg-white/95 hover:bg-white px-6 py-2.5 text-sm font-semibold text-black transition-all"
                    >
                      Voir le projet
                      <ArrowUpRight className="h-4 w-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="mt-8 flex items-center gap-2.5">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              data-testid={`portfolio-dot-${i}`}
              aria-label={`Aller au projet ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selected === i ? "w-8 bg-[#0057FF]" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
