import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getProject, projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Concept de site ${project.sector}`,
    description: project.summary,
    alternates: { canonical: `/realisations/${project.slug}` },
    openGraph: { title: `${project.title} — Concept KORIX`, description: project.summary, images: [project.image] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="case-page">
      <div className="container case-heading">
        <Link className="back-link" href="/realisations"><ArrowLeft aria-hidden="true" size={17} /> Toutes les réalisations</Link>
        <p className="eyebrow"><span /> {project.sector}</p>
        <div className="case-title-row">
          <h1>{project.title}</h1>
          <span className="concept-badge">Concept KORIX · projet démonstratif</span>
        </div>
        <p className="case-lead">{project.summary}</p>
      </div>

      <div className="container case-visual">
        <Image src={project.image} alt={project.alt} width={1408} height={768} priority quality={88} sizes="(max-width: 1200px) 100vw, 1200px" />
      </div>

      <div className="container case-details">
        <section>
          <p className="eyebrow"><span /> Le brief</p>
          <h2>Le besoin exploré</h2>
          <p>{project.brief}</p>
        </section>
        <section>
          <p className="eyebrow"><span /> La réponse</p>
          <h2>La solution imaginée</h2>
          <p>{project.solution}</p>
        </section>
        <aside>
          <h2>Points de conception</h2>
          <ul>{project.focus.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}</ul>
        </aside>
      </div>

      <section className="container case-cta">
        <div>
          <p className="eyebrow"><span /> Votre projet</p>
          <h2>Présentez-nous votre activité et le site dont vous avez besoin.</h2>
        </div>
        <Link className="button button--primary" href="/contact" data-track={`cta_case_${project.slug}`}>
          Démarrer un projet <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </article>
  );
}
