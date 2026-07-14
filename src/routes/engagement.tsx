import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import { computeFruits, FRUITS, REGIONS_NIGER } from "@/lib/fruits";

export const Route = createFileRoute("/engagement")({
  head: () => ({
    meta: [
      { title: "Je m'engage — L'Arbre de la Paix" },
      {
        name: "description",
        content:
          "Signez votre engagement citoyen pour la paix au Niger. Vos réponses font mûrir un fruit sur l'Arbre de la Paix.",
      },
      { property: "og:title", content: "Je m'engage — L'Arbre de la Paix" },
      {
        property: "og:description",
        content: "Signez votre engagement citoyen pour la paix au Niger.",
      },
    ],
  }),
  component: EngagementPage,
});

const engagementSchema = z.object({
  first_name: z.string().trim().min(1, "Prénom requis").max(80),
  last_name: z.string().trim().min(1, "Nom requis").max(80),
  gender: z.enum(["F", "H", "Autre"]).nullable(),
  age_range: z.enum(["-18", "18-25", "26-40", "41-60", "60+"]).nullable(),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  email: z.string().trim().email("Email invalide").max(200).optional().or(z.literal("")),
  region: z.string().min(1, "Région requise"),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  quartier: z.string().trim().max(80).optional().or(z.literal("")),
  paix_indispensable: z.boolean().nullable(),
  paix_actions: z.array(z.string()).max(20),
  civisme_lois: z.boolean().nullable(),
  civisme_biens: z.boolean().nullable(),
  civisme_haine: z.boolean().nullable(),
  benevolat: z.boolean().nullable(),
  quartier_participation: z.boolean().nullable(),
  membre_association: z.boolean().nullable(),
  valeurs: z.array(z.string()).max(20),
  testimony: z.string().trim().max(500).optional().or(z.literal("")),
  signed: z.literal(true, { errorMap: () => ({ message: "Vous devez signer l'engagement" }) }),
});

type FormState = z.input<typeof engagementSchema>;

const initialState: FormState = {
  first_name: "",
  last_name: "",
  gender: null,
  age_range: null,
  phone: "",
  email: "",
  region: "",
  city: "",
  quartier: "",
  paix_indispensable: null,
  paix_actions: [],
  civisme_lois: null,
  civisme_biens: null,
  civisme_haine: null,
  benevolat: null,
  quartier_participation: null,
  membre_association: null,
  valeurs: [],
  testimony: "",
  signed: false as unknown as true,
};

const STEPS = ["Identité", "Paix", "Civisme", "Communauté", "Valeurs", "Signature"];

const ACTIONS = [
  { id: "respecter", label: "Respecter les autres" },
  { id: "dialogue", label: "Promouvoir le dialogue" },
  { id: "refuser-violence", label: "Refuser la violence" },
  { id: "sensibiliser", label: "Sensibiliser mon entourage" },
  { id: "participer", label: "Participer aux activités communautaires" },
];

const VALEURS = [
  { id: "tolerance", label: "Tolérance" },
  { id: "solidarite", label: "Solidarité" },
  { id: "respect", label: "Respect" },
  { id: "honnetete", label: "Honnêteté" },
  { id: "inclusion", label: "Inclusion" },
  { id: "justice", label: "Justice" },
];

function EngagementPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { fruits: string[] }>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleArray = (key: "paix_actions" | "valeurs", id: string) => {
    setForm((f) => {
      const arr = f[key];
      const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
      return { ...f, [key]: next };
    });
  };

  const canGoNext = (() => {
    if (step === 0)
      return form.first_name.trim() && form.last_name.trim() && form.region;
    if (step === 5) return form.signed === true;
    return true;
  })();

  const submit = async () => {
    const parsed = engagementSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    setSubmitting(true);
    const fruits = computeFruits(parsed.data);
    const { error } = await supabase.from("engagements").insert({
      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      gender: parsed.data.gender,
      age_range: parsed.data.age_range,
      phone: parsed.data.phone || null,
      email: parsed.data.email || null,
      region: parsed.data.region,
      city: parsed.data.city || null,
      quartier: parsed.data.quartier || null,
      paix_indispensable: parsed.data.paix_indispensable,
      paix_actions: parsed.data.paix_actions,
      civisme_lois: parsed.data.civisme_lois,
      civisme_biens: parsed.data.civisme_biens,
      civisme_haine: parsed.data.civisme_haine,
      benevolat: parsed.data.benevolat,
      quartier_participation: parsed.data.quartier_participation,
      membre_association: parsed.data.membre_association,
      valeurs: parsed.data.valeurs,
      fruits,
      signed: true,
      testimony: parsed.data.testimony || null,
    });
    setSubmitting(false);
    if (error) {
      console.error(error);
      toast.error("Une erreur est survenue. Réessayez.");
      return;
    }
    setDone({ fruits });
  };

  if (done) {
    return (
      <div className="min-h-screen bg-kraft">
        <SiteNav />
        <Toaster position="top-center" />
        <main className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="mb-8 inline-flex rounded-full bg-leaf/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
            Engagement enregistré
          </div>
          <h1 className="mb-6 font-serif text-5xl text-forest">
            Merci, {form.first_name}.
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-moss/80">
            Votre feuille vient d'apparaître sur l'Arbre de la Paix. Vous avez
            fait mûrir <strong>{done.fruits.length}</strong> fruit
            {done.fruits.length > 1 ? "s" : ""}&nbsp;:
          </p>
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {done.fruits.map((fid) => {
              const fr = FRUITS.find((f) => f.id === fid);
              if (!fr) return null;
              return (
                <div
                  key={fid}
                  className="animate-fruit-pop flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-forest/10"
                >
                  <span className="text-xl">{fr.emoji}</span>
                  <span className="font-medium text-forest">{fr.name}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate({ to: "/" })}
              className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
            >
              Voir l'arbre
            </button>
            <button
              onClick={() => navigate({ to: "/tableau-de-bord" })}
              className="rounded-full border border-forest/20 px-6 py-3 text-sm font-medium text-forest hover:bg-forest/5"
            >
              Tableau de bord
            </button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-kraft">
      <SiteNav />
      <Toaster position="top-center" />
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <div className="mb-10">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-leaf">
            Étape {step + 1} sur {STEPS.length} · {STEPS[step]}
          </div>
          <h1 className="font-serif text-4xl text-forest lg:text-5xl">
            Je m'engage pour la paix.
          </h1>
          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-forest/10">
            <div
              className="h-full bg-leaf transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm lg:p-10">
          {step === 0 && (
            <div className="space-y-5">
              <Field label="Prénom *">
                <Input value={form.first_name} onChange={(v) => update("first_name", v)} />
              </Field>
              <Field label="Nom *">
                <Input value={form.last_name} onChange={(v) => update("last_name", v)} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Sexe">
                  <Segmented
                    value={form.gender}
                    onChange={(v) => update("gender", v as FormState["gender"])}
                    options={[
                      { v: "F", label: "F" },
                      { v: "H", label: "H" },
                      { v: "Autre", label: "Autre" },
                    ]}
                  />
                </Field>
                <Field label="Âge">
                  <Segmented
                    value={form.age_range}
                    onChange={(v) => update("age_range", v as FormState["age_range"])}
                    options={[
                      { v: "-18", label: "-18" },
                      { v: "18-25", label: "18–25" },
                      { v: "26-40", label: "26–40" },
                      { v: "41-60", label: "41–60" },
                      { v: "60+", label: "60+" },
                    ]}
                  />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Téléphone">
                  <Input value={form.phone ?? ""} onChange={(v) => update("phone", v)} />
                </Field>
                <Field label="Email (optionnel)">
                  <Input value={form.email ?? ""} onChange={(v) => update("email", v)} type="email" />
                </Field>
              </div>
              <Field label="Région *">
                <select
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-forest focus:border-leaf focus:outline-none"
                  value={form.region}
                  onChange={(e) => update("region", e.target.value)}
                >
                  <option value="">— Choisir une région —</option>
                  {REGIONS_NIGER.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Ville">
                  <Input value={form.city ?? ""} onChange={(v) => update("city", v)} />
                </Field>
                <Field label="Quartier">
                  <Input value={form.quartier ?? ""} onChange={(v) => update("quartier", v)} />
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <Field label="Pensez-vous que la paix est indispensable au développement ?">
                <YesNo
                  value={form.paix_indispensable}
                  onChange={(v) => update("paix_indispensable", v)}
                />
              </Field>
              <Field label="Êtes-vous prêt(e) à… (cochez tout ce qui s'applique)">
                <div className="grid gap-2 sm:grid-cols-2">
                  {ACTIONS.map((a) => (
                    <Check
                      key={a.id}
                      checked={form.paix_actions.includes(a.id)}
                      onChange={() => toggleArray("paix_actions", a.id)}
                      label={a.label}
                    />
                  ))}
                </div>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <Field label="Respectez-vous les lois ?">
                <YesNo value={form.civisme_lois} onChange={(v) => update("civisme_lois", v)} />
              </Field>
              <Field label="Respectez-vous les biens publics ?">
                <YesNo value={form.civisme_biens} onChange={(v) => update("civisme_biens", v)} />
              </Field>
              <Field label="Luttez-vous contre les discours de haine ?">
                <YesNo value={form.civisme_haine} onChange={(v) => update("civisme_haine", v)} />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <Field label="Faites-vous du bénévolat ?">
                <YesNo value={form.benevolat} onChange={(v) => update("benevolat", v)} />
              </Field>
              <Field label="Participez-vous aux activités de votre quartier ?">
                <YesNo
                  value={form.quartier_participation}
                  onChange={(v) => update("quartier_participation", v)}
                />
              </Field>
              <Field label="Êtes-vous membre d'une association ?">
                <YesNo
                  value={form.membre_association}
                  onChange={(v) => update("membre_association", v)}
                />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <Field label="Quelles valeurs incarnez-vous ?">
                <div className="grid gap-2 sm:grid-cols-2">
                  {VALEURS.map((v) => (
                    <Check
                      key={v.id}
                      checked={form.valeurs.includes(v.id)}
                      onChange={() => toggleArray("valeurs", v.id)}
                      label={v.label}
                    />
                  ))}
                </div>
              </Field>
              <Field label="Un message pour l'Arbre (optionnel, 500 caractères max)">
                <textarea
                  className="w-full rounded-xl border border-input bg-background p-4 text-sm text-forest focus:border-leaf focus:outline-none"
                  rows={4}
                  maxLength={500}
                  value={form.testimony ?? ""}
                  onChange={(e) => update("testimony", e.target.value)}
                  placeholder="Ex : J'ai organisé un dialogue dans mon quartier..."
                />
              </Field>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-sprout/15 p-6 text-forest">
                <p className="font-serif text-xl leading-snug">
                  « Je m'engage à promouvoir la paix, le civisme et la cohésion sociale
                  dans ma communauté, dans mes paroles et dans mes actes. »
                </p>
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-input p-4 hover:bg-forest/5">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-forest"
                  checked={form.signed === true}
                  onChange={(e) =>
                    update("signed", e.target.checked as unknown as FormState["signed"])
                  }
                />
                <span className="text-sm text-forest">
                  Je signe cet engagement et j'accepte que mon prénom, ma région et
                  mes fruits attribués apparaissent publiquement sur l'Arbre de la Paix.
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-full border border-forest/20 px-6 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest/5 disabled:opacity-30"
          >
            ← Précédent
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              disabled={!canGoNext}
              className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss disabled:opacity-40"
            >
              Continuer →
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!form.signed || submitting}
              className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss disabled:opacity-40"
            >
              {submitting ? "Enregistrement…" : "Déposer mon engagement"}
            </button>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

// -- Small primitives --------------------------------------------------------

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-forest">{label}</span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-forest focus:border-leaf focus:outline-none"
    />
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T | null;
  onChange: (v: T) => void;
  options: { v: T; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            value === o.v
              ? "border-forest bg-forest text-kraft"
              : "border-input bg-background text-forest hover:bg-forest/5"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function YesNo({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <Segmented
      value={value === null ? null : value ? "yes" : "no"}
      onChange={(v) => onChange(v === "yes")}
      options={[
        { v: "yes", label: "Oui" },
        { v: "no", label: "Non" },
      ]}
    />
  );
}

function Check({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-input bg-background px-4 py-3 hover:bg-forest/5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 accent-forest"
      />
      <span className="text-sm text-forest">{label}</span>
    </label>
  );
}
