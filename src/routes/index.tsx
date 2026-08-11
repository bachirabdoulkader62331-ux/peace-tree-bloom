import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/PageShell";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { useI18n, formatDate } from "@/lib/i18n";
import { useLiveStats } from "@/lib/useLiveStats";

import alummaImg from "@/assets/alumma-ginda.jpg";
import baobabImg from "@/assets/baobab-tree.jpg";
import logoAlumma from "@/assets/logo-alumma-ginda.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Association des Innovateurs pour la Paix — Paix, innovation, engagement" },
      {
        name: "description",
        content:
          "L'AIP œuvre pour la consolidation de la paix et la promotion des droits humains à l'ère du numérique au Niger et au Sahel, à travers L'Arbre de la Paix et Al'umma Ginda.",
      },
      {
        property: "og:title",
        content: "Association des Innovateurs pour la Paix — Paix, innovation, engagement",
      },
      {
        property: "og:description",
        content:
          "Consolidation de la paix et promotion des droits humains à l'ère du numérique au Niger et au Sahel.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://peace-tree-bloom.lovable.app/" }],
  }),
  component: Home,
});

function Home() {
  const { c, lang } = useI18n();
  const { stats, treeStage } = useLiveStats();

  return (
    <PageShell>
      {/* HERO */}
      <HeroSlider />


      {/* KEY FIGURES */}
      <section className="bg-forest py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {c.figures.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <span className="font-serif text-3xl text-kraft">{f.value}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sprout/60">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <Section tone="muted" title={c.home.valuesTitle} text={c.home.valuesText}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.values.map((v) => (
            <div
              key={v.name}
              className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5 transition-colors hover:bg-white"
            >
              <h3 className="mb-2 font-serif text-xl text-forest">{v.name}</h3>
              <p className="text-sm leading-relaxed text-moss/70">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section title={c.home.projectsTitle} text={c.home.projectsText}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Link
            to="/arbre-de-la-paix"
            className="group overflow-hidden rounded-3xl ring-1 ring-black/5"
          >
            <img
              src={baobabImg}
              alt={c.projects.treeCard.name}
              width={1024}
              height={640}
              loading="lazy"
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="bg-white/60 p-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">
                {c.projects.treeCard.tag}
              </span>
              <h3 className="mb-2 mt-3 font-serif text-2xl text-forest">
                {c.projects.treeCard.name}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-moss/80">
                {c.projects.treeCard.text}
              </p>
              <span className="text-sm font-medium text-forest underline decoration-leaf/40 decoration-2 underline-offset-4">
                {c.common.learnMore} →
              </span>
            </div>
          </Link>
          <Link
            to="/alumma-ginda"
            className="group overflow-hidden rounded-3xl ring-1 ring-black/5"
          >
            <img
              src={alummaImg}
              alt={c.projects.alummaCard.name}
              width={1024}
              height={640}
              loading="lazy"
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="bg-white/60 p-8">
              <div className="flex items-center gap-3">
                <img
                  src={logoAlumma.url}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="size-9 object-contain"
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">
                  {c.projects.alummaCard.tag}
                </span>
              </div>
              <h3 className="mb-2 mt-3 font-serif text-2xl text-forest">
                {c.projects.alummaCard.name}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-moss/80">
                {c.projects.alummaCard.text}
              </p>
              <span className="text-sm font-medium text-forest underline decoration-leaf/40 decoration-2 underline-offset-4">
                {c.common.learnMore} →
              </span>
            </div>
          </Link>
        </div>
      </Section>

      {/* LIVE TREE TEASER */}
      <Section tone="forest" title={c.home.engageTitle} text={c.home.engageText}>
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-kraft/10 bg-kraft/5 p-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl text-kraft">
                {stats.participants.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB")}
              </span>
              <span className="text-sm text-sprout/80">
                {lang === "fr" ? "citoyens engagés" : "citizens pledged"}
              </span>
            </div>
            <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-sprout/60">
              {treeStage.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/engagement"
              className="rounded-full bg-sprout px-6 py-3 text-sm font-medium text-forest transition-colors hover:bg-kraft"
            >
              {c.common.contribute}
            </Link>
            <Link
              to="/tableau-de-bord"
              className="rounded-full border border-sprout/40 px-6 py-3 text-sm font-medium text-sprout transition-colors hover:bg-sprout/10"
            >
              {c.common.dashboard} →
            </Link>
          </div>
        </div>
      </Section>

      {/* LATEST NEWS */}
      <Section tone="muted" title={c.common.latestNews}>
        <div className="grid gap-6 md:grid-cols-3">
          {c.news.items.slice(0, 3).map((n) => (
            <article key={n.slug} className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-leaf">
                <span className="size-1.5 rounded-full bg-leaf" />
                {n.category}
              </div>
              <h3 className="mb-2 font-serif text-xl leading-snug text-forest">{n.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-moss/80">{n.excerpt}</p>
              <span className="text-xs text-forest/50">{formatDate(n.date, lang)}</span>
            </article>
          ))}
        </div>
        <Link
          to="/actualites"
          className="mt-10 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
        >
          {c.common.seeAll}
        </Link>
      </Section>
    </PageShell>
  );
}
