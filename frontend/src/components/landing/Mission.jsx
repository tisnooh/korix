import { Target, Sparkles, Rocket } from "lucide-react";
import { Reveal, Overline } from "./Primitives";

const CARDS = [
  {
    icon: Target,
    title: "Attirer",
    text: "Un design qui capte l'attention dès la première seconde.",
  },
  {
    icon: Sparkles,
    title: "Convaincre",
    text: "Une expérience fluide qui transforme vos visiteurs en clients.",
  },
  {
    icon: Rocket,
    title: "Développer",
    text: "Des sites rapides, optimisés et pensés pour la performance.",
  },
];

export const Mission = () => {
  return (
    <section className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start">
        {/* left */}
        <div className="lg:sticky lg:top-32">
          <Reveal><Overline>Notre mission</Overline></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.04] text-white">
              Votre succès commence par un site{" "}
              <span className="text-gradient">exceptionnel</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 h-px w-16 bg-[#0057FF]" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-base sm:text-lg font-light text-zinc-400">
              Nous concevons chaque site comme un véritable levier de croissance pour
              votre entreprise.
            </p>
          </Reveal>
        </div>

        {/* right — 3 cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div
                data-testid={`mission-card-${i}`}
                className="group relative h-full rounded-2xl bg-[#08080A] hairline p-7 md:p-8 hover:border-[#0057FF]/50 hover:shadow-[0_0_40px_-10px_rgba(0,87,255,0.4)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#0057FF]/12 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-12 w-12 rounded-xl hairline flex items-center justify-center text-[#4d8bff] group-hover:text-white group-hover:bg-[#0057FF] transition-all duration-500">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="relative font-display mt-7 text-xl font-bold text-white">{c.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-zinc-500">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
