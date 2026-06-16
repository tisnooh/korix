import { Reveal } from "./Primitives";

const CLIENTS = ["Cabinet dentaire", "Restaurant", "Institut de beauté", "Immobilier"];
const STATS = [
  { value: "120+", label: "projets réalisés" },
  { value: "98%", label: "clients satisfaits" },
  { value: "2,5M€", label: "de valeur générée" },
];

export const TrustBar = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-10 -mt-4">
      <Reveal>
        <div data-testid="trust-bar" className="glass rounded-3xl px-7 py-8 md:px-12 md:py-9">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-center">
            {/* clients */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-zinc-600 font-semibold">
                Ils nous font confiance
              </span>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {CLIENTS.map((c) => (
                  <span key={c} className="text-sm font-medium text-zinc-400">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-4 lg:border-l lg:border-white/5 lg:pl-12">
              {STATS.map((s) => (
                <div key={s.label} data-testid={`stat-${s.value}`}>
                  <p className="font-display text-2xl md:text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[11px] md:text-xs text-zinc-500 leading-snug mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
