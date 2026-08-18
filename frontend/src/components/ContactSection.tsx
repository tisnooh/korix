import { Check, FileCheck2, Mail, MessageCircle, MonitorSmartphone, PanelsTopLeft, Phone, UserRoundCheck } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

const assurances = [
  { icon: FileCheck2, title: "Devis gratuit", text: "Un périmètre clair avant de commencer." },
  { icon: UserRoundCheck, title: "Suivi personnalisé", text: "Un interlocuteur impliqué dans votre projet." },
  { icon: PanelsTopLeft, title: "Propriété transmise", text: "Le site et ses accès vous appartiennent." },
  { icon: MonitorSmartphone, title: "Contrôles essentiels", text: "Affichage responsive, bases SEO, accessibilité et vitesse." },
] as const;

type ContactSectionProps = {
  standalone?: boolean;
  headingLevel?: "h1" | "h2";
};

export function ContactSection({ standalone = false, headingLevel = "h2" }: ContactSectionProps) {
  const Heading = headingLevel;

  return (
    <section className={`contact-section section--border${standalone ? " contact-section--standalone" : ""}`} id="contact" aria-labelledby="contact-title">
      <div className="contact-planet" aria-hidden="true" />
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow"><span /> Votre projet</p>
          <Heading id="contact-title">Parlons de votre activité et du site <em>dont vous avez besoin.</em></Heading>
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
          <div className="contact-direct" aria-label="Coordonnées directes">
            <a href={`mailto:${siteConfig.publicEmail}`}><Mail aria-hidden="true" /> {siteConfig.publicEmail}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" /> {siteConfig.phone}</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /> Écrire sur WhatsApp</a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
