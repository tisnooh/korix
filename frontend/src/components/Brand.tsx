import Image from "next/image";
import Link from "next/link";

type BrandVariant = "header" | "menu" | "footer";

export function Brand({ variant = "header" }: { variant?: BrandVariant }) {
  return (
    <Link className={`brand brand--${variant}`} href="/" aria-label="Retour à l’accueil KORIX">
      <Image
        className="brand-logo"
        src="/assets/brand/korix-wordmark-seul-transparent.png"
        alt="Logo KORIX"
        width={754}
        height={206}
        priority={variant === "header"}
        unoptimized
      />
    </Link>
  );
}
