import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useLiveStats } from "@/lib/useLiveStats";
import { FRUITS } from "@/lib/fruits";
import baobabImg from "@/assets/baobab-tree.jpg";
import communityImg from "@/assets/community.jpg";
import nigerMapImg from "@/assets/niger-map.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "L'Arbre de la Paix — Faites grandir la paix au Niger" },
      {
        name: "description",
        content:
          "Une plateforme citoyenne nigérienne où chaque engagement pour la paix, le civisme et la solidarité fait grandir un arbre commun en temps réel.",
      },
      { property: "og:title", content: "L'Arbre de la Paix — Faites grandir la paix au Niger" },
      {
        property: "og:description",
        content: "Une plateforme citoyenne nigérienne où chaque engagement pour la paix, le civisme et la solidarité fait grandir un arbre commun en temps réel.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { stats, treeStage } = useLiveStats();
  const growthPct = treeStage.next
    ? Math.round((stats.participants / treeStage.next) * 100)
    : 100;

  return (
    <div className="relative min-h-screen overflow-hidden bg-kraft">
      <div className="texture-kraft pointer-events-none absolute inset-0 z-50" />
      <SiteNav />

      {/* HERO */}
      <header className="relative flex min-h-[85vh] flex-col lg:flex-row">
        <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:py-0 lg:pl-16 lg:pr-12">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-leaf/20 bg-leaf/10 px-3 py-1">
            <span className="flex size-2 animate-pulse rounded-full bg-leaf" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-leaf">
              Plateforme citoyenne nigérienne
            </span>
          </div>
          <h1 className="mb-6 font-serif text-5xl leading-tight text-balance text-forest lg:text-7xl">
            Faites grandir la paix,
            <br />
            un engagement à la fois.
          </h1>
          <p className="mb-10 max-w-[52ch] text-pretty text-lg leading-relaxed text-moss/90">
            Chaque promesse de dialogue, de tolérance ou de solidarité nourrit les
            racines de notre nation. Regardez notre arbre commun fleurir au rythme
            de vos actions.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/engagement"
              className="flex items-center gap-3 rounded-full bg-forest py-3 pl-5 pr-6 font-medium text-kraft ring-1 ring-forest transition-transform hover:scale-[1.02]"
            >
              <span className="grid size-5 place-items-center rounded-full bg-leaf">
                <span className="size-2 rounded-full bg-kraft" />
              </span>
              Déposer mon engagement
            </Link>
            <Link
              to="/tableau-de-bord"
              className="text-sm font-medium italic text-moss underline decoration-leaf/40 decoration-2 underline-offset-4 hover:decoration-leaf"
            >
              Voir le tableau de bord live →
            </Link>
          </div>
        </div>

        {/* Illustrated tree */}
        <div className="relative w-full overflow-hidden border-l border-black/5 bg-leaf/5 lg:w-1/2">
          <img
            src={baobabImg}
            alt="Illustration du baobab sacré, arbre symbolique de la paix"
            width={1024}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-multiply"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center lg:p-12">
            <div className="rounded-2xl bg-kraft/90 px-6 py-5 shadow-xl ring-1 ring-forest/10 backdrop-blur">
              <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-forest/50">
                L'arbre en temps réel
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-5xl text-forest">
                  {stats.participants.toLocaleString("fr-FR")}
                </span>
                <span className="text-sm text-moss">citoyens engagés</span>
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-[10px] font-semibold uppercase tracking-widest text-forest/60">
                  <span>{treeStage.label}</span>
                  <span>
                    {treeStage.next ? `${growthPct}% vers l'étape ${treeStage.stage + 1}` : "Maturité atteinte"}
                  </span>
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
      </header>

      {/* LIVE COUNTERS RIBBON */}
      <section className="bg-forest py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[
            { label: "Citoyens engagés", value: stats.participants },
            { label: "Actions promises", value: stats.actions },
            { label: "Fruits apparus", value: stats.fruitCount },
            { label: "Régions actives", value: `${stats.regionsActive} / 8` },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sprout/60">
                {s.label}
              </span>
              <span className="font-serif text-3xl text-kraft">
                {typeof s.value === "number" ? s.value.toLocaleString("fr-FR") : s.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FRUITS GRID */}
      <section className="bg-kraft/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-[56ch]">
            <h2 className="mb-4 font-serif text-4xl text-forest">
              Les Fruits de la Cohésion
            </h2>
            <p className="leading-relaxed text-moss/80">
              Chaque thématique d'engagement fait mûrir un fruit distinct sur l'arbre.
              Voici l'état actuel de notre récolte nationale.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {FRUITS.map((fruit) => {
              const count = stats.fruitBreakdown[fruit.id] ?? 0;
              return (
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
                  <p className="mb-4 text-xs text-moss/70 leading-relaxed">
                    {fruit.description}
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="font-serif text-2xl text-forest">{count}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-leaf">
                      fruits
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="comment" className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <img
              src={communityImg}
              alt="Rassemblement communautaire sous un grand arbre au Niger"
              width={1024}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lg ring-1 ring-black/5"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="mb-8 font-serif text-4xl text-forest">
              Trois pas pour notre futur commun
            </h2>
            <div className="space-y-12">
              {[
                {
                  n: "01",
                  t: "Répondez au questionnaire",
                  d: "Partagez vos convictions sur la paix, le civisme et l'engagement communautaire en quelques étapes.",
                },
                {
                  n: "02",
                  t: "Signez votre engagement",
                  d: "Vos réponses attribuent automatiquement des fruits selon les valeurs que vous incarnez.",
                },
                {
                  n: "03",
                  t: "Voyez l'arbre grandir",
                  d: "Chaque nouvel engagement fait apparaître une feuille et rapproche l'arbre de sa maturité.",
                },
              ].map((s) => (
                <div key={s.n} className="flex gap-6">
                  <span className="shrink-0 font-serif text-4xl text-leaf/40">{s.n}</span>
                  <div>
                    <h4 className="mb-2 text-lg font-medium text-forest">{s.t}</h4>
                    <p className="text-sm leading-relaxed text-moss/80">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/engagement"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft transition-colors hover:bg-moss"
            >
              Commencer mon engagement
            </Link>
          </div>
        </div>
      </section>

      {/* NIGER MAP */}
      <section className="overflow-hidden bg-forest py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-4xl text-kraft">
              La paix s'enracine partout au Niger
            </h2>
            <p className="text-sm uppercase tracking-[0.18em] text-sprout/60">
              Répartition des engagements par région
            </p>
          </div>

          <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-3xl border border-kraft/10 bg-kraft/5">
            <img
              src={nigerMapImg}
              alt="Carte stylisée du Niger avec zones d'engagement"
              width={1600}
              height={900}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div className="relative z-10 grid grid-cols-2 gap-4 px-10 md:grid-cols-4">
              {["Niamey", "Agadez", "Zinder", "Tillabéri"].map((region) => (
                <div
                  key={region}
                  className="rounded-xl border border-kraft/10 bg-kraft/10 p-4 backdrop-blur-sm"
                >
                  <span className="block text-xs font-bold text-sprout">{region}</span>
                  <span className="block font-serif text-xl text-kraft">
                    {(stats.regionBreakdown[region] ?? 0).toLocaleString("fr-FR")}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/tableau-de-bord"
              className="inline-flex items-center gap-2 rounded-full border border-sprout/40 px-6 py-3 text-sm font-medium text-sprout transition-colors hover:bg-sprout/10"
            >
              Voir le tableau de bord complet →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / ACTUALITÉS */}
      <section id="actualites" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 font-serif text-4xl text-forest">Voix des citoyens</h2>
          {stats.latest.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-forest/20 p-16 text-center">
              <p className="font-serif text-2xl text-forest/60">
                Soyez le premier à planter une feuille sur l'arbre.
              </p>
              <Link
                to="/engagement"
                className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
              >
                Je m'engage
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stats.latest.map((e) => (
                <article
                  key={e.id}
                  className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5"
                >
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-leaf">
                    <span className="size-1.5 rounded-full bg-leaf" />
                    {e.region}
                  </div>
                  <p className="mb-4 font-serif text-lg leading-snug text-forest">
                    {e.testimony
                      ? `« ${e.testimony} »`
                      : `${e.first_name} s'est engagé pour la paix.`}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {e.fruits.slice(0, 4).map((fid) => {
                      const fr = FRUITS.find((f) => f.id === fid);
                      if (!fr) return null;
                      return (
                        <span
                          key={fid}
                          className="rounded-full bg-sprout/20 px-2 py-0.5 text-[10px] font-medium text-forest"
                        >
                          {fr.emoji} {fr.name}
                        </span>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
