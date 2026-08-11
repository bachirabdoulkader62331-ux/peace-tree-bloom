/**
 * Configuration centralisée de l'assistant « Al'umma Ginda AI ».
 * Textes d'interface, suggestions et limites — modifiables ici uniquement.
 */

export const ASSISTANT = {
  name: "Al'umma Ginda AI",
  subtitle: "Votre assistant virtuel",
  status: "En ligne",
  tooltip: "Al'umma Ginda AI",
  placeholder: "Écrivez votre question...",
  greeting:
    "Bonjour 👋\n\nJe suis **Al'umma Ginda AI**, votre assistant virtuel.\n\nJe peux vous aider à découvrir Al'umma Ginda, ses objectifs, ses activités et les différentes façons de participer.",
  newConversation: "Nouvelle conversation",
  newConversationConfirm: "Démarrer une nouvelle conversation ? L'échange actuel sera effacé.",
  thinking: "Al'umma Ginda AI réfléchit...",
  errorGeneric:
    "Désolé, je rencontre actuellement un problème technique. Veuillez réessayer dans quelques instants.",
  suggestions: [
    "Qu'est-ce que Al'umma Ginda ?",
    "Quels sont vos objectifs ?",
    "Quelles sont vos activités ?",
    "Comment participer ?",
    "Comment contacter l'équipe ?",
  ],
} as const;

/** Limites de validation partagées frontend / backend. */
export const CHAT_LIMITS = {
  maxMessageChars: 1500,
  maxHistoryMessages: 30,
} as const;

/** Pages réelles du site — l'assistant ne doit jamais inventer d'URL. */
export const SITE_LINKS = [
  { label: "Al'umma Ginda", path: "/alumma-ginda" },
  { label: "L'Arbre de la Paix", path: "/arbre-de-la-paix" },
  { label: "Nos projets", path: "/projets" },
  { label: "À propos", path: "/a-propos" },
  { label: "Actualités", path: "/actualites" },
  { label: "Événements", path: "/evenements" },
  { label: "Galerie", path: "/galerie" },
  { label: "Rejoindre l'engagement", path: "/engagement" },
  { label: "Tableau de bord", path: "/tableau-de-bord" },
  { label: "Devenir partenaire", path: "/devenir-partenaire" },
  { label: "Nous contacter", path: "/contact" },
] as const;
