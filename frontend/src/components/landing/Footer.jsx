import { Linkedin, Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

const NAV = ["Accueil", "Services", "Réalisations", "Tarifs", "À propos", "Contact"];
const SERVICES = ["Site vitrine", "Site e-commerce", "Landing page", "Refonte de site"];
const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
];

export const Footer = () => {
  return (
    <footer id="apropos" className="relative border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <span className="font-display text-2xl font-extrabold tracking-tight text-white">
              KOR<span className="text-[#4d8bff]">I</span>X
            </span>
            <p className="mt-5 text-sm leading-relaxed text-zinc-500 max-w-xs">
              Création de sites web modernes pour entreprises ambitieuses.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#contact"
                  aria-label={s.label}
                  data-testid={`social-${s.label.toLowerCase()}`}
                  className="h-10 w-10 rounded-full hairline glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#0057FF]/50 hover:-translate-y-0.5 transition-all"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* navigation */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-zinc-600">Navigation</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n}>
                  <a href="#top" className="text-sm text-zinc-400 hover:text-white transition-colors">{n}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-zinc-600">Services</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((n) => (
                <li key={n}>
                  <a href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">{n}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-zinc-600">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#4d8bff]" /> +33 6 12 34 56 78</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#4d8bff]" /> contact@korix.fr</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#4d8bff]" /> Lyon, France</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-zinc-600">© 2024 Korix. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
