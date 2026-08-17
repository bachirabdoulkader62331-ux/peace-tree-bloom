import { photos } from "@/content/homeSections";

export type HeroSlide = {
  id: string;
  src: string;
  alt: { fr: string; en: string };
};

/** Modifier les images du Hero ici — l'ordre définit l'ordre du slider. */
export const heroSlides: HeroSlide[] = [
  {
    id: "group-niamey",
    src: photos.groupNiamey,
    alt: {
      fr: "Membres et partenaires de l'AIP réunis lors d'une rencontre à Niamey",
      en: "AIP members and partners gathered at a meeting in Niamey",
    },
  },
  {
    id: "team-terrain",
    src: photos.teamTerrain,
    alt: {
      fr: "Équipe des Innovateurs pour la Paix et acteurs communautaires",
      en: "The Innovators for Peace team with community actors",
    },
  },
  {
    id: "atelier-numerique",
    src: photos.atelierNumerique,
    alt: {
      fr: "Session de travail sur les outils numériques pour la paix",
      en: "Working session on digital tools for peace",
    },
  },
  {
    id: "equipe-innovation",
    src: photos.equipeInnovation,
    alt: {
      fr: "Équipe d'innovateurs pour la paix après un atelier de travail",
      en: "Team of peace innovators after a workshop",
    },
  },
  {
    id: "alumma",
    src: photos.muryarAlumma,
    alt: {
      fr: "Activité du projet Muryar Al'Umma pour la paix au Niger",
      en: "Muryar Al'Umma peace project activity in Niger",
    },
  },
];

/** Contenu textuel et boutons du Hero — modifiable librement. */
export const heroContent = {
  fr: {
    eyebrow: "Association des Innovateurs pour la Paix",
    title: "Ensemble, construisons la paix",
    subtitle:
      "Promouvoir la paix, le civisme, la cohésion sociale et l'engagement communautaire par l'innovation.",
    primary: { label: "Découvrir nos projets", to: "/projets" },
    secondary: { label: "Rejoindre notre engagement", to: "/engagement" },
    slideLabel: (n: number) => `Aller à l'image ${n}`,
  },
  en: {
    eyebrow: "Association of Innovators for Peace",
    title: "Together, let's build peace",
    subtitle:
      "Promoting peace, civic values, social cohesion and community engagement through innovation.",
    primary: { label: "Discover our projects", to: "/projets" },
    secondary: { label: "Join our commitment", to: "/engagement" },
    slideLabel: (n: number) => `Go to slide ${n}`,
  },
} as const;

export const HERO_INTERVAL_MS = 6000;
