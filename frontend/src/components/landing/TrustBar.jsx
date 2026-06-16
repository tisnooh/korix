import { Reveal } from "./Primitives";

const CLIENTS = [
  "Cabinet dentaire",
  "Restaurant",
  "Institut de beauté",
  "Immobilier",
  "E-commerce",
  "Artisans",
];

export const TrustBar = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-10 -mt-6">
      <Reveal>
        <div data-testid="trust-bar" className="glass rounded-3xl px-7 py-6 md:px-10 md:py-7">
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <span className="text-[11px] tracking-[0.25em] uppercase text-zinc-500 font-semibold whitespace-nowrap">
              Ils nous font confiance
            </span>
            <div className="hidden md:block h-8 w-px bg-white/10" />
            <div className="relative flex-1 overflow-hidden">
              <div className="flex items-center gap-x-10 gap-y-3 flex-wrap md:flex-nowrap">
                {CLIENTS.map((c) => (
                  <span
                    key={c}
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
