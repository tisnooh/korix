export type Project = {
  slug: string;
  title: string;
  sector: string;
  image: string;
  alt: string;
  summary: string;
  brief: string;
  solution: string;
  focus: readonly string[];
};

export const projects: readonly Project[] = [
  {
    slug: "restaurant-aurora",
    title: "Aurora",
    sector: "Restaurant",
    image: "/assets/portfolio-restaurant.webp",
    alt: "Concept de site gastronomique Aurora, présenté sur un ordinateur dans une ambiance sombre",
    summary: "Une expérience éditoriale qui place la cuisine, l’atmosphère et la réservation au premier plan.",
    brief:
      "Imaginer la présence numérique d’un restaurant gastronomique avec une navigation courte et une prise de réservation immédiatement identifiable.",
    solution:
      "Une direction artistique chaleureuse, une hiérarchie inspirée des cartes de restaurant et des parcours courts vers les informations essentielles.",
    focus: ["Direction artistique", "Parcours de réservation", "Responsive mobile"],
  },
  {
    slug: "clinique-dentala",
    title: "Dentala",
    sector: "Santé",
    image: "/assets/portfolio-dentaire.webp",
    alt: "Concept de site pour la clinique Dentala affiché sur un ordinateur dans un cabinet sombre",
    summary: "Une interface rassurante qui rend l’expertise, les soins et la prise de rendez-vous faciles à comprendre.",
    brief:
      "Concevoir un univers numérique soigné pour un cabinet dentaire fictif sans sacrifier la clarté attendue dans le secteur de la santé.",
    solution:
      "Un contraste maîtrisé, des contenus structurés par intention et une interface sobre qui guide naturellement vers le contact.",
    focus: ["Clarté des contenus", "Réassurance", "Accessibilité"],
  },
  {
    slug: "immobilier-nocturne",
    title: "Nocturne",
    sector: "Immobilier",
    image: "/assets/portfolio-immobilier.webp",
    alt: "Concept de site immobilier Nocturne présentant une villa contemporaine de nuit",
    summary: "Une vitrine immobilière cinématographique pensée pour valoriser chaque bien sans ralentir la consultation.",
    brief:
      "Créer un concept capable de présenter une opération immobilière haut de gamme avec suffisamment d’émotion et de précision.",
    solution:
      "Une grille éditoriale ample, des visuels prioritaires et des informations organisées pour accompagner la découverte du programme.",
    focus: ["Valorisation des biens", "Performance visuelle", "Architecture éditoriale"],
  },
  {
    slug: "beaute-aurora-luminance",
    title: "Aurora Luminance",
    sector: "Beauté",
    image: "/assets/portfolio-beaute.webp",
    alt: "Concept de site Aurora Luminance pour un institut de beauté",
    summary: "Un langage de marque minimal et sensoriel, conçu pour faire ressentir la qualité avant le premier rendez-vous.",
    brief:
      "Définir une expérience en ligne soignée pour un institut de beauté fictif, avec une découverte simple des prestations.",
    solution:
      "Une composition élégante, des transitions discrètes et des appels à l’action visibles sans rompre l’atmosphère de marque.",
    focus: ["Identité de marque", "Présentation des prestations", "Conversion"],
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
