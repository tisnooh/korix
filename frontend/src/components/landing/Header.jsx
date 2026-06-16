import { useEffect, useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";

const NAV = [
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
  { label: "Processus", href: "#processus" },
  { label: "À propos", href: "#apropos" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030303]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="brand-logo"
          className="font-display text-2xl font-extrabold tracking-tight text-white"
        >
          KOR<span className="text-[#4d8bff]">I</span>X
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              data-testid={`nav-${n.label
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "")}`}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-testid="header-cta"
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-[#0057FF] hover:bg-[#1f6bff] hover:shadow-[0_0_24px_rgba(0,87,255,0.55)] transition-all duration-300"
          >
            Démarrer un projet
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            data-testid="header-menu-icon"
            className="h-11 w-11 rounded-full hairline glass flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#0057FF]/50 transition-all"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
