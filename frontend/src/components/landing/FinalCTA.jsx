import { ArrowRight, Clock, FileText, HeartHandshake } from "lucide-react";
import { Reveal } from "./Primitives";

const REASSURE = [
  { icon: Clock, text: "Réponse rapide sous 24h" },
  { icon: FileText, text: "Devis gratuit et sans engagement" },
  { icon: HeartHandshake, text: "Accompagnement personnalisé" },
];

export const FinalCTA = () => {
  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal y={36}>
          <div
            data-testid="final-cta"
            className="relative overflow-hidden rounded-[2rem] hairline bg-[#050507] px-7 py-20 md:px-16 md:py-28 text-center"
          >
            <div className="absolute inset-x-0 -bottom-1/3 h-[80%] planet-glow pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0057FF]/50 to-transparent" />

            <div className="relative">
              <h2 className="font-display mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02] text-white">
                Prêt à donner un nouvel élan à votre{" "}
                <span className="text-gradient">présence en ligne</span> ?
              </h2>

              <div className="mt-10 flex justify-center">
                <a
                  href="mailto:contact@korix.fr"
                  data-testid="final-cta-button"
                  className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-semibold text-white bg-[#0057FF] hover:bg-[#1f6bff] hover:shadow-[0_0_36px_rgba(0,87,255,0.65)] transition-all duration-300"
                >
                  Démarrer mon projet
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {REASSURE.map((r) => (
                  <div key={r.text} className="flex items-center gap-2.5 text-sm text-zinc-400">
                    <r.icon className="h-4 w-4 text-[#4d8bff]" />
                    {r.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
