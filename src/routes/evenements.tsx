import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useI18n, formatDate } from "@/lib/i18n";
import dialogueImg from "@/assets/dialogue.jpg";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements — Association des Innovateurs pour la Paix" },
      {
        name: "description",
        content:
          "Ateliers, caravanes de sensibilisation et rencontres citoyennes organisés par l'Association des Innovateurs pour la Paix au Niger.",
      },
      { property: "og:title", content: "Événements — Association des Innovateurs pour la Paix" },
      {
        property: "og:description",
        content: "Retrouvez nos ateliers, caravanes et rencontres pour la paix au Niger.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/evenements" },
    ],
    links: [{ rel: "canonical", href: "https://peace-tree-bloom.lovable.app/evenements" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { c, lang } = useI18n();
  const upcoming = c.events.items.filter((e) => e.upcoming);
  const past = c.events.items.filter((e) => !e.upcoming);

  return (
    <PageShell>
      <PageHero
        eyebrow={c.nav.events}
        title={c.events.heading}
        text={c.events.intro}
        image={dialogueImg}
        imageAlt={c.events.heading}
      />

      <Section title={c.events.upcoming} text={c.events.registerNote}>
        <div className="space-y-4">
          {upcoming.map((e) => (
            <article
              key={e.title}
              className="flex flex-col gap-4 rounded-2xl bg-white/60 p-6 ring-1 ring-black/5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-leaf">
                  <span>{formatDate(e.date, lang)}</span>
                  <span className="text-forest/40">{e.time}</span>
                  <span className="text-forest/40">{e.place}</span>
                </div>
                <h2 className="mb-1 font-serif text-xl text-forest">{e.title}</h2>
                <p className="max-w-[60ch] text-sm leading-relaxed text-moss/80">{e.text}</p>
              </div>
              <a
                href={`mailto:${c.org.email}?subject=${encodeURIComponent(e.title)}`}
                className="shrink-0 rounded-full bg-forest px-5 py-2.5 text-center text-sm font-medium text-kraft hover:bg-moss"
              >
                {c.common.register}
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" title={c.events.past}>
        <div className="space-y-4">
          {past.map((e) => (
            <article key={e.title} className="rounded-2xl border border-forest/10 p-6">
              <div className="mb-2 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-forest/40">
                <span>{formatDate(e.date, lang)}</span>
                <span>{e.place}</span>
              </div>
              <h2 className="mb-1 font-serif text-xl text-forest">{e.title}</h2>
              <p className="max-w-[60ch] text-sm leading-relaxed text-moss/80">{e.text}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
