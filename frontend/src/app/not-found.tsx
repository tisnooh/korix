import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found container">
      <span className="not-found-code">404</span>
      <p className="eyebrow"><span /> Trajectoire inconnue</p>
      <h1>Cette page a quitté notre orbite.</h1>
      <p>Le lien utilisé n’existe plus ou n’a jamais été publié.</p>
      <Link className="button button--primary" href="/"><ArrowLeft aria-hidden="true" size={18} /> Revenir à l’accueil</Link>
    </section>
  );
}
