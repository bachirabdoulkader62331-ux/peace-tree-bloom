// Shared taxonomy of the 8 "Fruits de la Paix".
// A fruit is attributed based on citizen responses (see /engagement form).

export type FruitId =
  | "tolerance"
  | "civisme"
  | "solidarite"
  | "dialogue"
  | "engagement"
  | "justice"
  | "bienveillance"
  | "espoir";

export interface Fruit {
  id: FruitId;
  name: string;
  emoji: string;
  color: string; // token utility class (bg-*)
  description: string;
}

export const FRUITS: Fruit[] = [
  { id: "tolerance",    name: "Tolérance",    emoji: "🍎", color: "bg-destructive/60",  description: "Respect des différences et ouverture aux autres." },
  { id: "civisme",      name: "Civisme",      emoji: "🍊", color: "bg-[oklch(0.72_0.16_60)]", description: "Respect des lois et comportement citoyen." },
  { id: "solidarite",   name: "Solidarité",   emoji: "🍇", color: "bg-[oklch(0.45_0.14_320)]", description: "Entraide, bénévolat et soutien social." },
  { id: "dialogue",     name: "Dialogue",     emoji: "🍐", color: "bg-leaf",           description: "Écoute et résolution pacifique des conflits." },
  { id: "engagement",   name: "Engagement",   emoji: "🥭", color: "bg-[oklch(0.75_0.15_75)]", description: "Participation active à la vie communautaire." },
  { id: "justice",      name: "Justice",      emoji: "🍒", color: "bg-[oklch(0.55_0.20_20)]", description: "Équité et respect des droits humains." },
  { id: "bienveillance",name: "Bienveillance",emoji: "🍋", color: "bg-[oklch(0.85_0.15_95)]", description: "Lutte contre les discours de haine." },
  { id: "espoir",       name: "Espoir",       emoji: "🍍", color: "bg-sprout",         description: "Optimisme et mobilisation pour l'avenir." },
];

export const REGIONS_NIGER = [
  "Niamey", "Agadez", "Diffa", "Dosso", "Maradi", "Tahoua", "Tillabéri", "Zinder",
];

export interface EngagementInput {
  paix_indispensable?: boolean | null;
  paix_actions?: string[] | null;
  civisme_lois?: boolean | null;
  civisme_biens?: boolean | null;
  civisme_haine?: boolean | null;
  benevolat?: boolean | null;
  quartier_participation?: boolean | null;
  membre_association?: boolean | null;
  valeurs?: string[] | null;
}

/** Compute which fruits are attributed based on the questionnaire answers. */
export function computeFruits(e: EngagementInput): FruitId[] {
  const fruits = new Set<FruitId>();
  const valeurs = new Set(e.valeurs ?? []);
  const actions = new Set(e.paix_actions ?? []);

  if (valeurs.has("tolerance") || valeurs.has("inclusion") || valeurs.has("respect")) fruits.add("tolerance");
  if (e.civisme_lois || e.civisme_biens) fruits.add("civisme");
  if (valeurs.has("solidarite") || e.benevolat) fruits.add("solidarite");
  if (actions.has("dialogue") || actions.has("sensibiliser")) fruits.add("dialogue");
  if (e.quartier_participation || actions.has("participer") || e.membre_association) fruits.add("engagement");
  if (valeurs.has("justice") || valeurs.has("honnetete")) fruits.add("justice");
  if (e.civisme_haine || actions.has("refuser-violence")) fruits.add("bienveillance");
  if (e.paix_indispensable) fruits.add("espoir");

  return [...fruits];
}

/** Determine the growth stage of the collective tree. */
export function treeStage(participants: number): {
  stage: 1 | 2 | 3 | 4 | 5;
  label: string;
  next: number | null;
} {
  if (participants < 50)   return { stage: 1, label: "Petite pousse",   next: 50 };
  if (participants < 200)  return { stage: 2, label: "Jeune arbre",     next: 200 };
  if (participants < 500)  return { stage: 3, label: "Arbre feuillu",   next: 500 };
  if (participants < 1000) return { stage: 4, label: "Grand arbre",     next: 1000 };
  return { stage: 5, label: "Arbre majestueux", next: null };
}
