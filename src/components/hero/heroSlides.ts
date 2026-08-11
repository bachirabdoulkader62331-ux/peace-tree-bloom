import heroUnity from "@/assets/hero/hero-unity.jpg";
import heroDialogue from "@/assets/hero/hero-dialogue.jpg";
import heroInnovation from "@/assets/hero/hero-innovation.jpg";
import heroEngagement from "@/assets/hero/hero-engagement.jpg";

export type HeroSlide = {
  id: string;
  src: string;
  alt: { fr: string; en: string };
};

/** Modifier les images du Hero ici — l'ordre définit l'ordre du slider. */
export const heroSlides: HeroSlide[] = [
  {
    id: "unity",
    src: heroUnity,
    alt: {
      fr: "Jeunes du Sahel unis, mains jointes au coucher du soleil",
      en: "Young people of the Sahel united, hands joined at sunset",
    },
  },
  {
    id: "dialogue",
    src: heroDialogue,
    alt: {
      fr: "Cercle de dialogue communautaire sous un arbre au Niger",
      en: "Community dialogue circle under a tree in Niger",
    },
  },
  {
    id: "innovation",
    src: heroInnovation,
    alt: {
      fr: "Atelier d'innovation avec de jeunes participants",
      en: "Innovation workshop with young participants",
    },
  },
  {
    id: "engagement",
    src: heroEngagement,
    alt: {
      fr: "Élèves et volontaires plantant un arbre ensemble",
      en: "Students and volunteers planting a tree together",
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
