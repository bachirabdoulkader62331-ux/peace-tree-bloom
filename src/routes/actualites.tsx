import { photos } from "@/content/homeSections";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useI18n, formatDate } from "@/lib/i18n";

const atelierImg = photos.atelierCartographie;

export const Route = createFileRoute("/actualites")({
  head: () => ({
    meta: [
      { title: "Actualités — Association des Innovateurs pour la Paix" },
      {
        name: "description",
        content:
          "Articles, communiqués, activités, témoignages et résultats des projets de l'Association des Innovateurs pour la Paix au Niger.",
      },
      { property: "og:title", content: "Actualités — Association des Innovateurs pour la Paix" },
      {
        property: "og:description",
        content: "Les dernières nouvelles de nos projets de paix au Niger et au Sahel.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/actualites" },
    ],
    links: [{ rel: "canonical", href: "https://peace-tree-bloom.lovable.app/actualites" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { c, lang } = useI18n();

  return (
    <PageShell>
      <PageHero
        eyebrow={c.nav.news}
        title={c.news.heading}
        text={c.news.intro}
        image={atelierImg}
        imageAlt={c.news.heading}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.news.items.map((n) => (
            <article
              key={n.slug}
              className="flex flex-col rounded-2xl bg-white/60 p-6 ring-1 ring-black/5"
            >
              <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-leaf">
                <span className="size-1.5 rounded-full bg-leaf" />
                {n.category}
              </div>
              <h2 className="mb-2 font-serif text-xl leading-snug text-forest">{n.title}</h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-moss/80">{n.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-forest/50">
                <span>{formatDate(n.date, lang)}</span>
                <span>{n.author}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" title={c.common.nextEvents}>
        <Link
          to="/evenements"
          className="inline-flex rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
        >
          {c.nav.events}
        </Link>
      </Section>
    </PageShell>
  );
}
