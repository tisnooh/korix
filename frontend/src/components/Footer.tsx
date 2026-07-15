import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Brand } from "@/components/Brand";
import { navigation, serviceNames, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>Sites internet sur mesure pour entreprises ambitieuses.</p>
          <span>© {new Date().getFullYear()} KORIX. Tous droits réservés.</span>
        </div>
        <div>
          <h2>Navigation</h2>
          <ul>{navigation.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Services</h2>
          <ul>{serviceNames.map((service) => <li key={service}><Link href="/#services">{service}</Link></li>)}</ul>
        </div>
        <div>
          <h2>Contact</h2>
          <ul>
            <li><Link href="/#contact">Formulaire de projet <ArrowUpRight aria-hidden="true" size={14} /></Link></li>
            {siteConfig.publicEmail ? <li><a href={`mailto:${siteConfig.publicEmail}`}><Mail aria-hidden="true" size={14} /> {siteConfig.publicEmail}</a></li> : null}
            {siteConfig.phone ? <li><a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" size={14} /> {siteConfig.phone}</a></li> : null}
            {siteConfig.socials.map((social) => (
              <li key={social.label}><a href={social.href} target="_blank" rel="noreferrer">{social.label} <ArrowUpRight aria-hidden="true" size={14} /></a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/politique-confidentialite">Politique de confidentialité</Link>
        <a href="#top">Retour en haut ↑</a>
      </div>
    </footer>
  );
}
