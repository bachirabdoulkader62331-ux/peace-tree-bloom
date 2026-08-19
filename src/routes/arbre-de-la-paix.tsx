import { photos } from "@/content/homeSections";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { useLiveStats } from "@/lib/useLiveStats";
import { FRUITS } from "@/lib/fruits";

const baobabImg = photos.plateformeArbre;
const communityImg = photos.groupNiamey;
const nigerMapImg = photos.portraitParticipant;

export const Route = createFileRoute("/arbre-de-la-paix")({
  head: () => ({
    meta: [
      { title: "L'Arbre de la Paix — Engagement citoyen en temps réel" },
      {
        name: "description",
        content:
          "Chaque engagement citoyen pour la paix fait apparaître une feuille sur L'Arbre de la Paix : un fruit mûrit tous les 50 engagements. Suivez la progression en temps réel.",
      },
      { property: "og:title", content: "L'Arbre de la Paix — Engagement citoyen en temps réel" },
      {
        property: "og:description",
        content:
          "Votons pour la paix : un questionnaire citoyen qui fait grandir un arbre commun, feuille après feuille.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/arbre-de-la-paix" },
    ],
    links: [{ rel: "canonical", href: "https://peace-tree-bloom.lovable.app/arbre-de-la-paix" }],
  }),
  component: TreePage,
});

function TreePage() {
  const { c, lang } = useI18n();
  const { stats, treeStage } = useLiveStats();
  const locale = lang === "fr" ? "fr-FR" : "en-GB";
  const growthPct = treeStage.next
    ? Math.round((stats.participants / treeStage.next) * 100)
    : 100;

  const topValues = [...FRUITS]
    .map((f) => ({ ...f, count: stats.fruitBreakdown[f.id] ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative flex flex-col border-b border-black/5 lg:flex-row">
        <div className="flex w-full flex-col justify-center px-6 py-16 lg:w-1/2 lg:pl-16 lg:pr-12">
          <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-leaf">
            {c.projects.treeCard.tag}
          </span>
          <h1 className="mb-6 font-serif text-4xl leading-tight text-balance text-forest lg:text-6xl">
            {c.tree.heading}
          </h1>
          <p className="mb-10 max-w-[54ch] text-pretty text-lg leading-relaxed text-moss/90">
            {c.tree.intro}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/engagement"
              className="rounded-full bg-forest px-6 py-3 font-medium text-kraft ring-1 ring-forest transition-transform hover:scale-[1.02]"
            >
              {c.common.contribute}
            </Link>
            <Link
              to="/tableau-de-bord"
              className="text-sm font-medium italic text-moss underline decoration-leaf/40 decoration-2 underline-offset-4 hover:decoration-leaf"
            >
              {c.common.dashboard} →
            </Link>
          </div>
        </div>
        <div className="relative min-h-[380px] w-full overflow-hidden border-l border-black/5 bg-leaf/5 lg:w-1/2">
          <img
            src={baobabImg}
            alt={c.tree.heading}
            width={1024}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-multiply"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center lg:p-12">
            <div className="rounded-2xl bg-kraft/90 px-6 py-5 shadow-xl ring-1 ring-forest/10 backdrop-blur">
              <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/50">
                {c.tree.statsTitle}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-5xl text-forest">
                  {stats.participants.toLocaleString(locale)}
                </span>
                <span className="text-sm text-moss">
                  {lang === "fr" ? "citoyens engagés" : "citizens pledged"}
                </span>
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-[10px] font-semibold uppercase tracking-widest text-forest/60">
                  <span>{treeStage.label}</span>
                  <span>{growthPct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-forest/10">
                  <div
                    className="h-full bg-leaf transition-all duration-700"
                    style={{ width: `${growthPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="bg-forest py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[
            { label: lang === "fr" ? "Citoyens engagés" : "Citizens pledged", value: stats.participants },
            { label: lang === "fr" ? "Actions promises" : "Actions pledged", value: stats.actions },
            { label: lang === "fr" ? "Fruits apparus" : "Fruits grown", value: stats.fruitCount },
            { label: lang === "fr" ? "Régions actives" : "Active regions", value: `${stats.regionsActive} / 8` },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-serif text-3xl text-kraft">
                {typeof s.value === "number" ? s.value.toLocaleString(locale) : s.value}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sprout/60">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <Section title={c.tree.howTitle}>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <img
            src={communityImg}
            alt={c.tree.howTitle}
            width={1024}
            height={1280}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lg ring-1 ring-black/5"
          />
          <div className="space-y-10">
            {c.tree.steps.map((s) => (
              <div key={s.n} className="flex gap-6">
                <span className="shrink-0 font-serif text-4xl text-leaf/40">{s.n}</span>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-forest">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-moss/80">{s.d}</p>
                </div>
              </div>
            ))}
            <Link
              to="/engagement"
              className="inline-flex rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
            >
              {c.common.contribute}
            </Link>
          </div>
        </div>
      </Section>

      {/* FRUITS */}
      <Section tone="muted" title={c.tree.fruitsTitle} text={c.tree.fruitsText}>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {FRUITS.map((fruit) => (
            <div
              key={fruit.id}
              className="group rounded-2xl bg-white/50 p-6 ring-1 ring-black/5 transition-colors hover:bg-white"
            >
              <div className="mb-4 grid size-12 place-items-center rounded-full bg-sprout/25">
                <span className="text-2xl transition-transform group-hover:scale-110">
                  {fruit.emoji}
                </span>
              </div>
              <h3 className="mb-1 font-serif text-xl text-forest">{fruit.name}</h3>
              <p className="mb-4 text-xs leading-relaxed text-moss/70">{fruit.description}</p>
              <span className="font-serif text-2xl text-forest">
                {stats.fruitBreakdown[fruit.id] ?? 0}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* TOP VALUES */}
      <Section title={c.tree.topValues}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topValues.map((v) => (
            <div key={v.id} className="rounded-2xl border border-forest/10 p-6">
              <span className="text-2xl">{v.emoji}</span>
              <h3 className="mt-3 font-serif text-xl text-forest">{v.name}</h3>
              <span className="mt-1 block font-serif text-2xl text-leaf">{v.count}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* MAP */}
      <section className="overflow-hidden bg-forest py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl text-kraft md:text-4xl">{c.tree.mapTitle}</h2>
            <p className="text-sm uppercase tracking-[0.18em] text-sprout/60">{c.tree.mapText}</p>
          </div>
          <div className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-3xl border border-kraft/10 bg-kraft/5">
            <img
              src={nigerMapImg}
              alt={c.tree.mapTitle}
              width={1600}
              height={900}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="relative z-10 grid grid-cols-2 gap-4 px-10 md:grid-cols-4">
              {["Niamey", "Tillabéri", "Maradi", "Tahoua"].map((region) => (
                <div
                  key={region}
                  className="rounded-xl border border-kraft/10 bg-kraft/10 p-4 backdrop-blur-sm"
                >
                  <span className="block text-xs font-bold text-sprout">{region}</span>
                  <span className="block font-serif text-xl text-kraft">
                    {(stats.regionBreakdown[region] ?? 0).toLocaleString(locale)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/tableau-de-bord"
              className="inline-flex rounded-full border border-sprout/40 px-6 py-3 text-sm font-medium text-sprout hover:bg-sprout/10"
            >
              {c.common.dashboard} →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section title={c.tree.ctaTitle} text={c.tree.ctaText}>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/engagement"
            className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
          >
            {c.common.contribute}
          </Link>
          <a
            href={`https://wa.me/${c.org.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-forest/20 px-6 py-3 text-sm font-medium text-forest hover:bg-forest/5"
          >
            {c.common.whatsappBot}
          </a>
        </div>
      </Section>
    </PageShell>
  );
}
