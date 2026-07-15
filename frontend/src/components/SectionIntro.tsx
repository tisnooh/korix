import type { ReactNode } from "react";

export function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow"><span /> {eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
