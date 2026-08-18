export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  lead: string;
  audience: readonly string[];
  approach: readonly string[];
  deliverables: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "site-vitrine-sur-mesure",
    title: "Site vitrine sur mesure",
    shortTitle: "Site vitrine",
    summary: "Présenter votre activité avec précision, inspirer confiance et faciliter les demandes de contact.",
    lead:
      "Un site vitrine doit expliquer rapidement ce que vous faites, pour qui et pourquoi un prospect devrait vous contacter.",
    audience: [
      "Entreprises locales qui veulent professionnaliser leur présence en ligne",
      "Indépendants et cabinets qui ont besoin d’expliquer clairement leur expertise",
      "Structures qui souhaitent remplacer un site vieillissant ou difficile à administrer",
    ],
    approach: [
      "Clarification de l’offre et des parcours prioritaires",
      "Organisation des contenus autour des questions de vos prospects",
      "Direction visuelle cohérente avec votre activité",
      "Intégration responsive, accessible et optimisée pour la vitesse",
    ],
    deliverables: [
      "Un site adapté aux ordinateurs, tablettes et mobiles",
      "Des pages structurées pour la compréhension et le référencement",
      "Des appels à l’action reliés à de vraies prises de contact",
      "Les accès et les éléments du site transmis à la livraison",
    ],
  },
  {
    slug: "site-e-commerce",
    title: "Site e-commerce",
    shortTitle: "E-commerce",
    summary: "Construire une expérience d’achat rapide, rassurante et simple à administrer au quotidien.",
    lead:
      "Une boutique en ligne doit rendre les produits faciles à trouver, lever les hésitations et accompagner chaque étape jusqu’au paiement.",
    audience: [
      "Marques qui souhaitent lancer leur première boutique en ligne",
      "Commerçants qui veulent compléter leur activité physique",
      "E-commerces existants qui rencontrent des problèmes de clarté ou de performance",
    ],
    approach: [
      "Organisation du catalogue, des catégories et des fiches produit",
      "Conception d’un parcours d’achat court et rassurant",
      "Définition des besoins de paiement, livraison et gestion",
      "Contrôle du comportement sur mobile et des performances essentielles",
    ],
    deliverables: [
      "Une boutique cohérente avec votre catalogue et votre façon de vendre",
      "Des fiches produit lisibles et orientées vers la décision",
      "Un tunnel de commande configuré selon les outils retenus",
      "Une interface d’administration expliquée lors de la livraison",
    ],
  },
  {
    slug: "landing-page",
    title: "Landing page",
    shortTitle: "Landing page",
    summary: "Concentrer votre message et votre acquisition sur une page conçue pour une action précise.",
    lead:
      "Une landing page efficace relie une campagne, une offre et une action sans détour inutile pour le visiteur.",
    audience: [
      "Entreprises qui lancent une offre ou un nouveau service",
      "Équipes qui préparent une campagne publicitaire ciblée",
      "Professionnels qui veulent tester un message avant un site plus complet",
    ],
    approach: [
      "Définition d’un objectif de conversion unique",
      "Hiérarchisation du message, des objections et des preuves disponibles",
      "Conception d’une page rapide avec des appels à l’action cohérents",
      "Préparation d’une mesure d’audience respectueuse du consentement",
    ],
    deliverables: [
      "Une page autonome adaptée à la source de trafic prévue",
      "Un parcours court vers le formulaire ou l’action choisie",
      "Une version responsive contrôlée sur les principaux formats",
      "Les bases techniques nécessaires au partage et au référencement",
    ],
  },
  {
    slug: "refonte-strategique",
    title: "Refonte stratégique",
    shortTitle: "Refonte",
    summary: "Transformer un site dépassé en outil moderne, performant et cohérent avec vos contenus et vos objectifs.",
    lead:
      "Une refonte utile ne consiste pas à changer uniquement l’apparence : elle corrige aussi le message, le parcours et les limites techniques du site existant.",
    audience: [
      "Entreprises dont le site ne reflète plus l’activité actuelle",
      "Sites difficiles à utiliser sur mobile ou trop lents",
      "Structures qui veulent réorganiser leurs contenus sans repartir à l’aveugle",
    ],
    approach: [
      "Analyse des contenus, des parcours et des contraintes existantes",
      "Identification de ce qui doit être conservé, amélioré ou retiré",
      "Reconstruction de la hiérarchie visuelle et fonctionnelle",
      "Préparation de la mise en ligne et des redirections nécessaires",
    ],
    deliverables: [
      "Une structure éditoriale clarifiée avant le développement",
      "Une interface actuelle et cohérente avec votre positionnement",
      "Un site responsive avec des bases techniques assainies",
      "Un plan de reprise des contenus et des adresses importantes",
    ],
  },
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
