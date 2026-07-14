import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useLiveStats } from "@/lib/useLiveStats";
import { FRUITS, REGIONS_NIGER } from "@/lib/fruits";

export const Route = createFileRoute("/tableau-de-bord")({
  head: () => ({
    meta: [
      { title: "Tableau de bord public — L'Arbre de la Paix" },
      {
        name: "description",
        content:
          "Statistiques citoyennes en temps réel : engagements par région du Niger, répartition par valeur, croissance de l'Arbre de la Paix.",
      },
      { property: "og:title", content: "Tableau de bord public — L'Arbre de la Paix" },
      {
        property: "og:description",
        content: "Statistiques citoyennes en temps réel pour la paix au Niger.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { stats, treeStage } = useLiveStats();
  const maxRegion = Math.max(1, ...Object.values(stats.regionBreakdown));
  const maxFruit = Math.max(1, ...Object.values(stats.fruitBreakdown));

  return (
    <div className="min-h-screen bg-kraft">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-leaf/10 px-3 py-1">
              <span className="size-2 animate-pulse rounded-full bg-leaf" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-leaf">
                Données en direct
              </span>
            </div>
            <h1 className="font-serif text-5xl text-forest">Tableau de bord public</h1>
            <p className="mt-2 max-w-xl text-moss/80">
              L'impact collectif des citoyens engagés pour la paix au Niger, mis à
              jour en temps réel.
            </p>
          </div>
          <div className="rounded-2xl bg-forest px-6 py-4 text-kraft">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sprout/70">
              Étape de l'arbre
            </div>
            <div className="font-serif text-2xl">{treeStage.label}</div>
            <div className="text-xs text-sprout/60">
              {treeStage.next
                ? `Prochaine étape à ${treeStage.next.toLocaleString("fr-FR")} participants`
                : "Maturité atteinte"}
            </div>
          </div>
        </header>

        {/* KPI grid */}
        <section className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Participants", value: stats.participants },
            { label: "Actions promises", value: stats.actions },
            { label: "Fruits apparus", value: stats.fruitCount },
            { label: "Régions actives", value: `${stats.regionsActive} / 8` },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest/50">
                {k.label}
              </div>
              <div className="mt-2 font-serif text-4xl text-forest">
                {typeof k.value === "number" ? k.value.toLocaleString("fr-FR") : k.value}
              </div>
            </div>
          ))}
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Répartition par région */}
          <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-2xl text-forest">
              Engagements par région
            </h2>
            <ul className="space-y-4">
              {REGIONS_NIGER.map((r) => {
                const count = stats.regionBreakdown[r] ?? 0;
                const pct = Math.round((count / maxRegion) * 100);
                return (
                  <li key={r}>
                    <div className="mb-1 flex items-baseline justify-between text-sm">
                      <span className="font-medium text-forest">{r}</span>
                      <span className="font-mono text-forest/70">{count}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-forest/5">
                      <div
                        className="h-full bg-leaf transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Fruits */}
          <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-2xl text-forest">Les 8 fruits</h2>
            <ul className="space-y-4">
              {FRUITS.map((fr) => {
                const count = stats.fruitBreakdown[fr.id] ?? 0;
                const pct = Math.round((count / maxFruit) * 100);
                return (
                  <li key={fr.id}>
                    <div className="mb-1 flex items-baseline justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-forest">
                        <span className="text-lg">{fr.emoji}</span>
                        {fr.name}
                      </span>
                      <span className="font-mono text-forest/70">{count}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-forest/5">
                      <div
                        className="h-full bg-sprout transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Genre */}
          <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-2xl text-forest">Répartition par sexe</h2>
            {Object.keys(stats.genderBreakdown).length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune donnée pour l'instant.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {["F", "H", "Autre"].map((g) => {
                  const n = stats.genderBreakdown[g] ?? 0;
                  const total = Object.values(stats.genderBreakdown).reduce(
                    (a, b) => a + b,
                    0,
                  ) || 1;
                  return (
                    <div key={g} className="rounded-xl bg-forest/5 p-4 text-center">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-forest/60">
                        {g === "F" ? "Femmes" : g === "H" ? "Hommes" : "Autre"}
                      </div>
                      <div className="mt-1 font-serif text-3xl text-forest">{n}</div>
                      <div className="text-xs text-moss/60">
                        {Math.round((n / total) * 100)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Derniers engagements */}
          <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
            <h2 className="mb-6 font-serif text-2xl text-forest">
              Derniers engagements
            </h2>
            {stats.latest.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucun engagement pour l'instant. Soyez le premier !
              </p>
            ) : (
              <ul className="space-y-4">
                {stats.latest.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-start justify-between gap-4 border-b border-forest/5 pb-4 last:border-0"
                  >
                    <div>
                      <div className="text-sm font-medium text-forest">
                        {e.first_name} — {e.region}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {e.fruits.slice(0, 3).map((fid) => {
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
                    </div>
                    <time className="shrink-0 text-[10px] uppercase tracking-widest text-forest/40">
                      {new Date(e.created_at).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
