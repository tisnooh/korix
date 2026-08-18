import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales relatives au site KORIX.",
  alternates: { canonical: "/mentions-legales" },
};

export default function LegalPage() {
  const legal = siteConfig.legal;
  return (
    <article className="legal-page container">
      <p className="eyebrow"><span /> Informations</p>
      <h1>Mentions légales</h1>
      <p className="legal-updated">Dernière mise à jour : 15 juillet 2026.</p>

      <section>
        <h2>Éditeur du site</h2>
        <p>Le présent site est édité sous le nom <strong>{legal.name}</strong>.</p>
        <dl>
          {legal.form ? <><dt>Forme juridique</dt><dd>{legal.form}</dd></> : null}
          {legal.address ? <><dt>Adresse</dt><dd>{legal.address}</dd></> : null}
          {legal.registration ? <><dt>Immatriculation</dt><dd>{legal.registration}</dd></> : null}
          {legal.publicationDirector ? <><dt>Direction de la publication</dt><dd>{legal.publicationDirector}</dd></> : null}
        </dl>
        <p>Pour contacter l’éditeur, utilisez le <Link href="/contact">formulaire de projet</Link>.</p>
      </section>

      {legal.hostName ? (
        <section>
          <h2>Hébergement</h2>
          <p>Le site est hébergé par {legal.hostName}{legal.hostAddress ? `, ${legal.hostAddress}` : ""}.</p>
        </section>
      ) : null}

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, interfaces, éléments graphiques, marques et concepts présentés sur ce site sont protégés par le droit de la propriété intellectuelle.
          Toute reproduction ou adaptation sans autorisation écrite préalable est interdite.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          KORIX veille à fournir des informations exactes et à maintenir le site accessible. Une interruption temporaire ou une erreur ne peut toutefois être totalement exclue.
          Les projets marqués « Concept KORIX » sont des démonstrations créatives et ne correspondent pas à des missions client.
        </p>
      </section>
    </article>
  );
}
