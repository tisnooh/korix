import { Layout, ShoppingBag, MousePointerClick, RefreshCw, ArrowUpRight } from "lucide-react";
import { Reveal, Overline } from "./Primitives";

const SERVICES = [
  {
    icon: Layout,
    name: "Site vitrine",
    desc: "Présentez votre entreprise et inspirez confiance.",
  },
  {
    icon: ShoppingBag,
    name: "Site e-commerce",
    desc: "Vendez vos produits avec une boutique en ligne claire et performante.",
  },
  {
    icon: MousePointerClick,
    name: "Landing page",
    desc: "Convertissez vos visiteurs en clients avec une page ciblée.",
  },
  {
    icon: RefreshCw,
    name: "Refonte de site",
    desc: "Modernisez votre site pour gagner en impact et en résultats.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Reveal><Overline>Services</Overline></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Des sites web adaptés à vos besoins.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base sm:text-lg font-light text-zinc-400">
              Des solutions simples, efficaces et pensées pour votre activité.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-5 md:gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <div
                data-testid={`service-card-${i}`}
                className="group relative h-full rounded-2xl bg-[#08080A] hairline p-9 md:p-10 hover:border-[#0057FF]/50 hover:shadow-[0_0_40px_-10px_rgba(0,87,255,0.4)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#0057FF]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative flex items-start justify-between">
                  <div className="h-14 w-14 rounded-2xl hairline flex items-center justify-center text-[#4d8bff] group-hover:text-white group-hover:bg-[#0057FF] transition-all duration-500">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-zinc-600 group-hover:text-[#4d8bff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                </div>
                <h3 className="relative font-display mt-8 text-2xl font-bold text-white">{s.name}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-zinc-500 max-w-xs">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
