import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Traitement des données personnelles et gestion du consentement sur le site KORIX.",
  alternates: { canonical: "/politique-confidentialite" },
};

export default function PrivacyPage() {
  return (
    <article className="legal-page container">
      <p className="eyebrow"><span /> Vos données</p>
      <h1>Politique de confidentialité</h1>
      <p className="legal-updated">Dernière mise à jour : 15 juillet 2026.</p>

      <section>
        <h2>Données collectées</h2>
        <p>
          Le formulaire peut recueillir votre nom, votre entreprise, votre adresse e-mail, votre téléphone si vous le fournissez,
          ainsi que les informations relatives à votre projet, son budget et son calendrier.
        </p>
      </section>

      <section>
        <h2>Finalité et base légale</h2>
        <p>
          Ces informations servent exclusivement à analyser votre demande, vous répondre et préparer un éventuel échange commercial.
          Le traitement repose sur votre consentement, que vous donnez explicitement avant l’envoi du formulaire.
        </p>
      </section>

      <section>
        <h2>Destinataires et durée de conservation</h2>
        <p>
          Les données sont accessibles uniquement à KORIX et au prestataire technique utilisé pour acheminer le message.
          Elles sont supprimées au plus tard trois ans après le dernier échange, sauf obligation légale ou relation contractuelle en cours.
          Elles ne sont ni revendues ni utilisées pour une inscription automatique à une newsletter.
        </p>
      </section>

      <section>
        <h2>Mesure d’audience</h2>
        <p>
          L’outil de mesure d’audience n’est chargé qu’après votre accord. Le refus n’empêche aucune fonctionnalité du site.
          L’enregistrement de session est désactivé. Votre choix est enregistré localement dans votre navigateur et peut être effacé en supprimant les données du site.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou la portabilité de vos données, et retirer votre consentement.
          Adressez votre demande via le <Link href="/#contact">formulaire de contact</Link> en précisant qu’elle concerne vos données personnelles.
        </p>
      </section>

      <section>
        <h2>Sécurité</h2>
        <p>
          Le formulaire applique une validation côté navigateur et côté serveur, une limitation des envois et des contrôles anti-spam.
          Les secrets nécessaires à l’acheminement des e-mails restent exclusivement côté serveur.
        </p>
      </section>
    </article>
  );
}
