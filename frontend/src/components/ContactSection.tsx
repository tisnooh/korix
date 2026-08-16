import { Check, FileCheck2, MonitorSmartphone, PanelsTopLeft, UserRoundCheck } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const assurances = [
  { icon: FileCheck2, title: "Devis gratuit", text: "Un périmètre clair avant de commencer." },
  { icon: UserRoundCheck, title: "Suivi personnalisé", text: "Un interlocuteur impliqué dans votre projet." },
  { icon: PanelsTopLeft, title: "Propriété transmise", text: "Le site et ses accès vous appartiennent." },
  { icon: MonitorSmartphone, title: "Contrôles essentiels", text: "Affichage responsive, bases SEO, accessibilité et vitesse." },
] as const;

export function ContactSection() {
  return (
    <section className="contact-section section--border" id="contact" aria-labelledby="contact-title">
      <div className="contact-planet" aria-hidden="true" />
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow"><span /> Votre projet</p>
          <h2 id="contact-title">Parlons de votre activité et du site <em>dont vous avez besoin.</em></h2>
          <p>
            Décrivez votre activité, votre objectif et vos contraintes. Nous utiliserons ces éléments pour préparer un échange concret.
          </p>
          <ul className="assurance-list">
            {assurances.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <span><strong>{title}</strong><small>{text}</small></span>
              </li>
            ))}
          </ul>
          <p className="contact-expectation"><Check aria-hidden="true" /> Chaque demande est lue et traitée individuellement.</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
