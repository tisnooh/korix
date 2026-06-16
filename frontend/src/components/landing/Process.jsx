import { Reveal, Overline } from "./Primitives";

const STEPS = [
  { num: "01", title: "Découverte", text: "On échange sur votre projet et vos objectifs." },
  { num: "02", title: "Conception", text: "Nous créons une maquette sur mesure pour vous." },
  { num: "03", title: "Développement", text: "Votre site prend vie, rapide et optimisé." },
  { num: "04", title: "Lancement", text: "Mise en ligne et suivi pour vos résultats." },
];

export const Process = () => {
  return (
    <section id="processus" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Reveal><Overline>Notre processus</Overline></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Une méthode claire en 4 étapes.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base sm:text-lg font-light text-zinc-400">
              Un accompagnement clair, de la première idée à la mise en ligne.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-20">
          {/* connecting line (desktop) */}
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0057FF]/40 to-transparent" />

          <div className="grid md:grid-cols-4 gap-12 md:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.12}>
                <div data-testid={`process-step-${i}`} className="relative">
                  <div className="relative h-14 w-14 rounded-full bg-[#030303] border border-[#0057FF]/60 flex items-center justify-center blue-glow">
                    <span className="font-display text-sm font-bold text-[#4d8bff]">{s.num}</span>
                    <span className="absolute inset-0 rounded-full bg-[#0057FF]/20 animate-pulse-glow" />
                  </div>
                  <h3 className="font-display mt-7 text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500 max-w-[14rem]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
