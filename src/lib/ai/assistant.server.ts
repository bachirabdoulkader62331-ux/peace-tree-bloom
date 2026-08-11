/**
 * Base de connaissances + prompt système de l'assistant.
 * Source unique : les contenus officiels du site (src/content/fr.ts).
 * Architecture prête pour un futur RAG : il suffit d'enrichir `buildKnowledge()`.
 */
import { fr } from "@/content/fr";
import { SITE_LINKS } from "./assistant.config";

export function getAiConfig() {
  // Lu à l'exécution (jamais au niveau module) : l'environnement est injecté par requête.
  return {
    model: process.env["AI_CHAT_MODEL"] ?? "openai/gpt-5.6-sol",
    apiKey: process.env["LOVABLE_API_KEY"] ?? "",
  };
}

function buildKnowledge(): string {
  const org = fr.org as Record<string, unknown>;
  const parts = [
    "## Association des Innovateurs pour la Paix (AIP)",
    JSON.stringify(org),
    "## Projet Al'umma Ginda",
    JSON.stringify(fr.alumma),
    "## Projet L'Arbre de la Paix",
    JSON.stringify(fr.tree),
    "## À propos",
    JSON.stringify(fr.about),
    "## Actualités",
    JSON.stringify(fr.news),
    "## Événements",
    JSON.stringify(fr.events),
    "## Contact",
    JSON.stringify(fr.contact),
  ];
  return parts.join("\n");
}

export function buildSystemPrompt(): string {
  const links = SITE_LINKS.map((l) => `- ${l.label} : ${l.path}`).join("\n");
  return [
    "Tu es « Al'umma Ginda AI », l'assistant virtuel officiel du projet Al'umma Ginda, porté par l'Association des Innovateurs pour la Paix (Niger).",
    "",
    "PERSONNALITÉ : chaleureuse, professionnelle, respectueuse, claire, concise et accessible. Jamais agressive, politique, discriminatoire ni irrespectueuse.",
    "LANGUE : réponds en priorité en français. Si l'utilisateur écrit dans une autre langue, réponds dans cette langue.",
    "STYLE : réponses courtes (3 à 6 phrases maximum), Markdown simple (paragraphes, listes, liens). Termine si pertinent par un lien utile du site.",
    "",
    "RÈGLE ABSOLUE : n'invente jamais de chiffres, partenaires, projets, dates, événements, coordonnées ou informations institutionnelles.",
    "Si l'information est absente de la base de connaissances ci-dessous, réponds exactement : « Je ne dispose pas actuellement de cette information. Vous pouvez contacter directement l'équipe d'Al'umma Ginda pour obtenir plus de précisions. »",
    "",
    "PAGES RÉELLES DU SITE (n'utilise aucune autre URL interne) :",
    links,
    "",
    "BASE DE CONNAISSANCES OFFICIELLE :",
    buildKnowledge(),
  ].join("\n");
}
