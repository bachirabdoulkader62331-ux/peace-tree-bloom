/**
 * Contenus de la page d'accueil issus du Rapport Annuel AIP 2024
 * (source de vérité : document officiel fourni par l'association).
 * Aucune donnée inventée : chiffres, noms de projets et partenaires
 * proviennent directement du rapport.
 */

import groupeNumeriqueSahel from "@/assets/photos/aip-groupe-numerique-sahel.jpg.asset.json";
import equipeCelebration from "@/assets/photos/aip-equipe-celebration.png.asset.json";
import sessionNumerique from "@/assets/photos/aip-session-numerique.jpg.asset.json";
import rencontreCommunautaire from "@/assets/photos/aip-rencontre-communautaire.jpg.asset.json";
import portraitParticipante from "@/assets/photos/aip-portrait-participante.jpg.asset.json";
import portraitInnovateur from "@/assets/photos/aip-portrait-innovateur.jpg.asset.json";
import portraitParticipant from "@/assets/photos/aip-portrait-participant.jpg.asset.json";
import atelierCartes from "@/assets/photos/aip-atelier-cartes.jpg.asset.json";
import atelierCercle from "@/assets/photos/aip-atelier-cercle.png.asset.json";
import plateformeArbre from "@/assets/photos/aip-plateforme-arbre-paix.jpg.asset.json";
import portraitEngagement from "@/assets/photos/aip-portrait-engagement.jpg.asset.json";

export const photos = {
  groupNiamey: groupeNumeriqueSahel.url,
  teamTerrain: equipeCelebration.url,
  atelierNumerique: sessionNumerique.url,
  muryarAlumma: rencontreCommunautaire.url,
  portraitEcoute: portraitParticipante.url,
  equipeInnovation: portraitInnovateur.url,
  atelierCartographie: atelierCartes.url,
  conflitsNumeriques: atelierCercle.url,
  plateformeArbre: plateformeArbre.url,
  portraitParticipant: portraitParticipant.url,
};


/**
 * Vidéo YouTube « Bienvenue sur Innovateurs pour la Paix ».
 * Renseigner l'identifiant de la vidéo (partie après ?v= de l'URL YouTube)
 * pour activer le lecteur intégré.
 */
export const HOME_VIDEO = {
  youtubeId: "",
  channelUrl: "https://www.youtube.com/results?search_query=Innovateurs+pour+la+Paix",
};

type Icon =
  | "lightbulb"
  | "users"
  | "shield"
  | "heart"
  | "handshake"
  | "globe"
  | "sparkles"
  | "message";

export type HomeSections = {
  presentation: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string[];
    pillarsTitle: string;
    pillars: string[];
    cta: string;
    imageAlt: string;
  };
  values: {
    eyebrow: string;
    title: string;
    text: string;
    items: { icon: Icon; name: string; text: string }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    items: {
      slug: "tree" | "alumma" | "digital" | "laafi";
      name: string;
      category: string;
      text: string;
      image: string;
      imageAlt: string;
      to: string;
    }[];
  };
  alumma: {
    eyebrow: string;
    title: string;
    text: string;
    points: { t: string; d: string }[];
    cta: string;
    imageAlt: string;
  };
  tree: {
    eyebrow: string;
    title: string;
    text: string;
    points: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  impact: {
    eyebrow: string;
    title: string;
    text: string;
    stats: { value: number; suffix?: string; label: string; note: string }[];
  };
  video: {
    eyebrow: string;
    title: string;
    text: string;
    fallback: string;
    fallbackCta: string;
  };
  activities: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    items: { date: string; category: string; title: string; text: string; image: string }[];
  };
  engage: {
    eyebrow: string;
    title: string;
    text: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  partners: {
    eyebrow: string;
    title: string;
    text: string;
    items: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    partnerCta: string;
  };
};

export const homeSections: Record<"fr" | "en", HomeSections> = {
  fr: {
    presentation: {
      eyebrow: "Qui sommes-nous",
      title: "Une organisation de jeunes du Sahel au service de la paix",
      lead:
        "L'Association des Innovateurs pour la Paix (AIP) est une Organisation de la Société Civile engagée dans la promotion de la paix durable et de l'innovation sociale.",
      body: [
        "L'AIP est née de la volonté de plusieurs équipes de jeunes vivant dans des zones touchées par les conflits au Sahel — Burkina Faso, Mali et Niger — tous participants au programme d'innovation pour la paix Sahel de 2020 organisé par Oxfam et Build Up.",
        "Notre mission : œuvrer pour la consolidation de la paix et la promotion des droits humains à l'ère du numérique, en combinant sensibilisation, éducation et développement durable.",
        "Notre vision : un monde où la paix est un pilier central du développement, où les communautés collaborent harmonieusement pour bâtir un avenir prospère et durable. L'AIP est membre et adhérente du manifeste de la coalition des constructeurs de la paix.",
      ],
      pillarsTitle: "Nos axes d'intervention",
      pillars: [
        "Intégration du numérique et de l'innovation dans la consolidation de la paix",
        "Promotion de la paix et de la sécurité",
        "Promotion des droits humains",
        "Développement communautaire",
      ],
      cta: "En savoir plus",
      imageAlt: "Membres et partenaires de l'AIP réunis à Niamey",
    },
    values: {
      eyebrow: "Nos valeurs",
      title: "Cinq valeurs qui guident chacune de nos actions",
      text:
        "L'AIP s'inspire des valeurs et du leadership de Build Up, organisation internationale qui œuvre pour la transformation des conflits à l'ère du numérique.",
      items: [
        {
          icon: "lightbulb",
          name: "Innovation",
          text: "Trouver des solutions créatives pour résoudre les problèmes liés à la paix et au développement.",
        },
        {
          icon: "users",
          name: "Engagement communautaire",
          text: "Mettre les populations locales au cœur des initiatives pour assurer leur durabilité.",
        },
        {
          icon: "shield",
          name: "Intégrité",
          text: "Adopter une gouvernance transparente et éthique dans toutes les actions.",
        },
        {
          icon: "heart",
          name: "Inclusion",
          text: "Promouvoir l'égalité et intégrer toutes les voix, en particulier celles des groupes marginalisés.",
        },
        {
          icon: "handshake",
          name: "Collaboration",
          text: "Travailler en synergie avec les acteurs locaux, nationaux et internationaux pour maximiser l'impact.",
        },
      ],
    },
    projects: {
      eyebrow: "Nos projets",
      title: "Des initiatives concrètes, du terrain aux espaces numériques",
      text:
        "Chaque projet part des besoins réels des communautés et s'appuie sur la conception centrée sur l'humain.",
      cta: "Découvrir le projet",
      items: [
        {
          slug: "tree",
          name: "L'Arbre de la Paix",
          category: "Engagement citoyen",
          text: "Un arbre numérique commun qui grandit à chaque engagement citoyen pour la paix.",
          image: photos.teamTerrain,
          imageAlt: "Rencontre communautaire de l'AIP",
          to: "/arbre-de-la-paix",
        },
        {
          slug: "alumma",
          name: "Al'umma Ginda",
          category: "Sensibilisation numérique",
          text: "« La voix de la population » : sensibilisation et plaidoyer par des outils numériques innovants.",
          image: photos.muryarAlumma,
          imageAlt: "Activité du projet Muryar Al'Umma",
          to: "/alumma-ginda",
        },
        {
          slug: "digital",
          name: "Transformation de conflits numériques",
          category: "Innovation & IA",
          text: "Avec des experts de Build Up et l'appui de la GIZ, l'équipe explore l'usage des outils d'IA au service des artisans de la paix en Afrique de l'Ouest.",
          image: photos.conflitsNumeriques,
          imageAlt: "Restitution graphique de l'atelier Digital Conflict Transformation in West Africa",
          to: "/projets",
        },
        {
          slug: "laafi",
          name: "LAAFI KIBARU — Informer pour la paix",
          category: "Lutte contre la désinformation",
          text: "À Niamey, en collaboration avec Search, une initiative de sensibilisation en ligne contre la désinformation et les discours de haine, avec des vidéos éducatives.",
          image: photos.atelierNumerique,
          imageAlt: "Atelier de travail numérique de l'équipe des Innovateurs",
          to: "/projets",
        },
      ],
    },
    alumma: {
      eyebrow: "Focus projet",
      title: "Al'umma Ginda — la voix de la population",
      text:
        "Une initiative de sensibilisation et de plaidoyer auprès des différentes composantes de la population, qui utilise des moyens de communication numériques innovants — intelligence artificielle, plateformes en ligne, contenus audio — pour l'engagement en faveur de la paix et de la cohésion sociale.",
      points: [
        {
          t: "Contenus multilingues",
          d: "Messages texte, audio et vidéo adaptés au haoussa, au zarma et au peulh.",
        },
        {
          t: "Chatbot WhatsApp",
          d: "Informations en texte et en audio, vidéos de sensibilisation et quiz de compréhension.",
        },
        {
          t: "Vulgarisation du code rural",
          d: "300 questions/réponses conçues avec les communautés pour atténuer les conflits fonciers.",
        },
        {
          t: "Bénéficiaires",
          d: "Jeunes, femmes, agriculteurs et éleveurs, leaders communautaires et religieux, autorités locales.",
        },
      ],
      cta: "Découvrir Al'umma Ginda",
      imageAlt: "Membre de l'équipe au travail devant le kakémono du projet Muryar Al'Umma",
    },
    tree: {
      eyebrow: "Focus projet",
      title: "L'Arbre de la Paix — l'engagement citoyen rendu visible",
      text:
        "Un mouvement citoyen à la fois évaluation et jeu : nous votons pour la paix à travers un questionnaire. À chaque clic pour la paix, une feuille apparaît sur l'arbre ; tous les 50 engagements, un fruit mûrit et porte un nom de paix ou d'espoir.",
      points: [
        "Un questionnaire simple sur la paix, le civisme et l'engagement communautaire.",
        "Une feuille par engagement, un fruit tous les 50 engagements.",
        "Des fruits qui incarnent les valeurs portées par les citoyens.",
        "Une progression suivie en temps réel sur le tableau de bord public.",
      ],
      ctaPrimary: "Découvrir L'Arbre de la Paix",
      ctaSecondary: "Participer",
    },
    impact: {
      eyebrow: "Notre impact",
      title: "Quelques chiffres du rapport annuel 2024",
      text:
        "Résultats mesurés en 10 jours après la publication de notre vidéo de sensibilisation, et portée du programme dont l'AIP est issue.",
      stats: [
        { value: 122447, label: "Vues", note: "Vidéo de sensibilisation, en 10 jours" },
        { value: 2131, label: "Mentions J'aime", note: "Même période" },
        { value: 231, label: "Partages", note: "Facebook, TikTok, WhatsApp" },
        { value: 6, label: "Équipes de jeunes", note: "Programme d'innovation pour la paix Sahel 2020" },
        { value: 3, label: "Pays du Sahel", note: "Burkina Faso, Mali, Niger" },
        { value: 72, suffix: " %", label: "Jeunes très intéressés", note: "Perception des projets en ligne" },
      ],
    },
    video: {
      eyebrow: "En vidéo",
      title: "Découvrez notre engagement",
      text:
        "Nos contenus vidéo servent à influencer positivement le débat en ligne autour de la paix et à construire un environnement numérique plus harmonieux.",
      fallback:
        "L'identifiant de la vidéo YouTube « Bienvenue sur Innovateurs pour la Paix » reste à renseigner pour activer le lecteur.",
      fallbackCta: "Voir sur YouTube",
    },
    activities: {
      eyebrow: "Activités",
      title: "Nos activités en 2024",
      text: "Ateliers, conférences internationales et campagnes numériques menées durant l'année.",
      cta: "Lire la suite",
      items: [
        {
          date: "2024",
          category: "Innovation & IA",
          title: "Que se passe-t-il lorsque des jeunes utilisent l'IA pour la paix ?",
          text: "Avec des experts de Build Up et l'appui de la GIZ, l'équipe a exploré comment tirer profit des outils d'IA pour le travail des artisans de la paix en Afrique de l'Ouest.",
          image: photos.conflitsNumeriques,
        },
        {
          date: "2024",
          category: "Build Peace, Manille",
          title: "Partage d'expérience au Build Peace 2024",
          text: "Les membres de l'AIP participent chaque année depuis 2020 au rendez-vous mondial des artisans de la paix à l'ère du numérique.",
          image: photos.atelierCartographie,
        },
        {
          date: "2024",
          category: "Conférence CITAD, Nigeria",
          title: "Outils numériques et IA dans la consolidation de la paix",
          text: "Première participation de l'AIP à la conférence des influenceurs organisée par CITAD, pour partager les résultats de son expérience.",
          image: photos.equipeInnovation,
        },
      ],
    },
    engage: {
      eyebrow: "Rejoignez-nous",
      title: "Devenez innovateur ou ambassadrice de la paix",
      text:
        "Les membres de l'organisation portent le titre d'innovateur(trice) pour la paix ou d'ambassadeur(trice) de la paix. Rejoignez le mouvement ou construisons un partenariat.",
      ctaPrimary: "Rejoindre notre engagement",
      ctaSecondary: "Devenir partenaire",
    },
    partners: {
      eyebrow: "Partenaires",
      title: "Ils marchent à nos côtés",
      text: "Collaborations citées dans le rapport annuel 2024 de l'AIP.",
      items: ["Oxfam", "Build Up", "GIZ", "Search for Common Ground", "CITAD", "Oxfam Ibis"],
    },
    contact: {
      eyebrow: "Contact",
      title: "Parlons de votre projet pour la paix",
      text: "Bureau exécutif à Niamey, Niger. Écrivez-nous ou appelez-nous directement.",
      cta: "Nous contacter",
      partnerCta: "Devenir partenaire",
    },
  },
  en: {
    presentation: {
      eyebrow: "Who we are",
      title: "A Sahelian youth organisation working for peace",
      lead:
        "The Association of Innovators for Peace (AIP) is a civil society organisation committed to sustainable peace and social innovation.",
      body: [
        "AIP was created by several teams of young people living in conflict-affected areas of the Sahel — Burkina Faso, Mali and Niger — all participants in the 2020 Sahel Peace Innovation Programme run by Oxfam and Build Up.",
        "Our mission: to work for peacebuilding and the promotion of human rights in the digital age, combining awareness-raising, education and sustainable development.",
        "Our vision: a world where peace is a central pillar of development and communities collaborate harmoniously to build a prosperous, sustainable future. AIP is a member and signatory of the peacebuilders coalition manifesto.",
      ],
      pillarsTitle: "Our areas of work",
      pillars: [
        "Integrating digital tools and innovation into peacebuilding",
        "Promoting peace and security",
        "Promoting human rights",
        "Community development",
      ],
      cta: "Learn more",
      imageAlt: "AIP members and partners gathered in Niamey",
    },
    values: {
      eyebrow: "Our values",
      title: "Five values guiding every action",
      text:
        "AIP draws on the values and leadership of Build Up, an international organisation working on conflict transformation in the digital age.",
      items: [
        {
          icon: "lightbulb",
          name: "Innovation",
          text: "Finding creative solutions to peace and development challenges.",
        },
        {
          icon: "users",
          name: "Community engagement",
          text: "Placing local people at the heart of initiatives to make them last.",
        },
        {
          icon: "shield",
          name: "Integrity",
          text: "Transparent and ethical governance in everything we do.",
        },
        {
          icon: "heart",
          name: "Inclusion",
          text: "Promoting equality and including every voice, especially marginalised groups.",
        },
        {
          icon: "handshake",
          name: "Collaboration",
          text: "Working with local, national and international actors to maximise impact.",
        },
      ],
    },
    projects: {
      eyebrow: "Our projects",
      title: "Concrete initiatives, from the field to digital spaces",
      text: "Every project starts from real community needs and follows human-centred design.",
      cta: "Discover the project",
      items: [
        {
          slug: "tree",
          name: "The Peace Tree",
          category: "Citizen engagement",
          text: "A shared digital tree that grows with every citizen pledge for peace.",
          image: photos.teamTerrain,
          imageAlt: "AIP community meeting",
          to: "/arbre-de-la-paix",
        },
        {
          slug: "alumma",
          name: "Al'umma Ginda",
          category: "Digital awareness",
          text: "“The voice of the people”: awareness and advocacy through innovative digital tools.",
          image: photos.muryarAlumma,
          imageAlt: "Muryar Al'Umma project activity",
          to: "/alumma-ginda",
        },
        {
          slug: "digital",
          name: "Digital conflict transformation",
          category: "Innovation & AI",
          text: "With Build Up experts and GIZ support, the team explores how AI tools can serve peacebuilders in West Africa.",
          image: photos.conflitsNumeriques,
          imageAlt: "Graphic recording of the Digital Conflict Transformation in West Africa workshop",
          to: "/projets",
        },
        {
          slug: "laafi",
          name: "LAAFI KIBARU — Informing for peace",
          category: "Countering disinformation",
          text: "In Niamey, with Search, an online campaign against disinformation and hate speech using educational videos.",
          image: photos.atelierNumerique,
          imageAlt: "Digital working session of the Innovators team",
          to: "/projets",
        },
      ],
    },
    alumma: {
      eyebrow: "Project focus",
      title: "Al'umma Ginda — the voice of the people",
      text:
        "An awareness and advocacy initiative reaching every part of the population, using innovative digital communication — artificial intelligence, online platforms and audio content — to build engagement for peace and social cohesion.",
      points: [
        { t: "Multilingual content", d: "Text, audio and video messages in Hausa, Zarma and Fulfulde." },
        {
          t: "WhatsApp chatbot",
          d: "Text and audio information, awareness videos and comprehension quizzes.",
        },
        {
          t: "Rural code made accessible",
          d: "300 questions and answers designed with communities to ease land-related conflicts.",
        },
        {
          t: "Beneficiaries",
          d: "Youth, women, farmers and herders, community and religious leaders, local authorities.",
        },
      ],
      cta: "Discover Al'umma Ginda",
      imageAlt: "Team member working in front of the Muryar Al'Umma project banner",
    },
    tree: {
      eyebrow: "Project focus",
      title: "The Peace Tree — citizen engagement made visible",
      text:
        "A citizen movement that is both an assessment and a game: we vote for peace through a questionnaire. Each pledge grows a leaf; every 50 pledges ripen a fruit named after peace or hope.",
      points: [
        "A simple questionnaire on peace, civic values and community engagement.",
        "One leaf per pledge, one fruit every 50 pledges.",
        "Fruits embodying the values citizens stand for.",
        "Live progress on the public dashboard.",
      ],
      ctaPrimary: "Discover The Peace Tree",
      ctaSecondary: "Take part",
    },
    impact: {
      eyebrow: "Our impact",
      title: "Figures from the 2024 annual report",
      text:
        "Results measured in the 10 days following our awareness video, and the reach of the programme AIP grew out of.",
      stats: [
        { value: 122447, label: "Views", note: "Awareness video, in 10 days" },
        { value: 2131, label: "Likes", note: "Same period" },
        { value: 231, label: "Shares", note: "Facebook, TikTok, WhatsApp" },
        { value: 6, label: "Youth teams", note: "2020 Sahel Peace Innovation Programme" },
        { value: 3, label: "Sahel countries", note: "Burkina Faso, Mali, Niger" },
        { value: 72, suffix: " %", label: "Youth highly interested", note: "Perception of online projects" },
      ],
    },
    video: {
      eyebrow: "Watch",
      title: "See our commitment",
      text:
        "Our video content aims to shape the online debate on peace and build a more harmonious digital environment.",
      fallback:
        "The YouTube ID for “Bienvenue sur Innovateurs pour la Paix” still needs to be provided to enable the player.",
      fallbackCta: "Watch on YouTube",
    },
    activities: {
      eyebrow: "Activities",
      title: "Our 2024 activities",
      text: "Workshops, international conferences and digital campaigns carried out during the year.",
      cta: "Read more",
      items: [
        {
          date: "2024",
          category: "Innovation & AI",
          title: "What happens when young people use AI for peace?",
          text: "With Build Up experts and GIZ support, the team explored how AI tools can serve peacebuilders in West Africa.",
          image: photos.conflitsNumeriques,
        },
        {
          date: "2024",
          category: "Build Peace, Manila",
          title: "Sharing experience at Build Peace 2024",
          text: "AIP members have attended the global gathering of digital-age peacebuilders every year since 2020.",
          image: photos.atelierCartographie,
        },
        {
          date: "2024",
          category: "CITAD conference, Nigeria",
          title: "Digital tools and AI in peacebuilding",
          text: "AIP's first participation in the influencers conference organised by CITAD, sharing the results of its experience.",
          image: photos.equipeInnovation,
        },
      ],
    },
    engage: {
      eyebrow: "Join us",
      title: "Become an innovator or ambassador for peace",
      text:
        "Members of the organisation carry the title of innovator for peace or ambassador for peace. Join the movement or build a partnership with us.",
      ctaPrimary: "Join our commitment",
      ctaSecondary: "Become a partner",
    },
    partners: {
      eyebrow: "Partners",
      title: "Walking alongside us",
      text: "Collaborations cited in AIP's 2024 annual report.",
      items: ["Oxfam", "Build Up", "GIZ", "Search for Common Ground", "CITAD", "Oxfam Ibis"],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your peace project",
      text: "Executive office in Niamey, Niger. Write to us or call directly.",
      cta: "Contact us",
      partnerCta: "Become a partner",
    },
  },
};
