import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand${compact ? " brand--compact" : ""}`} href="/" aria-label="KORIX — Accueil">
      KOR<span aria-hidden="true">I</span>X
    </Link>
  );
}
