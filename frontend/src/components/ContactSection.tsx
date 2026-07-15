import { Check, FileCheck2, MonitorSmartphone, PanelsTopLeft, UserRoundCheck } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const assurances = [
  { icon: FileCheck2, title: "Devis gratuit", text: "Un périmètre clair avant de commencer." },
  { icon: UserRoundCheck, title: "Suivi personnalisé", text: "Un interlocuteur impliqué dans votre projet." },
  { icon: PanelsTopLeft, title: "Propriété transmise", text: "Le site et ses accès vous appartiennent." },
  { icon: MonitorSmartphone, title: "Qualité contrôlée", text: "Responsive, SEO, accessibilité et vitesse vérifiés." },
] as const;

export function ContactSection() {
  return (
    <section className="contact-section section--border" id="contact" aria-labelledby="contact-title">
      <div className="contact-planet" aria-hidden="true" />
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow"><span /> Votre projet</p>
          <h2 id="contact-title">Prêt à faire passer votre présence en ligne <em>au niveau supérieur&nbsp;?</em></h2>
          <p>
            Décrivez-nous votre besoin. Les informations ci-dessous permettent de préparer un premier échange utile,
            sans vous faire perdre de temps.
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
