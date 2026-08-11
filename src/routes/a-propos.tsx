import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import dialogueImg from "@/assets/dialogue.jpg";
import atelierImg from "@/assets/atelier.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos de l'AIP — Vision, mission et valeurs" },
      {
        name: "description",
        content:
          "Histoire, vision, mission et approche de l'Association des Innovateurs pour la Paix, organisation de jeunes engagés pour la paix au Sahel.",
      },
      { property: "og:title", content: "À propos de l'AIP — Vision, mission et valeurs" },
      {
        property: "og:description",
        content:
          "Une organisation de jeunes du Burkina Faso, du Mali et du Niger au service de la paix à l'ère du numérique.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/a-propos" },
    ],
    links: [{ rel: "canonical", href: "https://peace-tree-bloom.lovable.app/a-propos" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { c } = useI18n();

  return (
    <PageShell>
      <PageHero
        eyebrow={c.org.shortName}
        title={c.about.heading}
        text={c.about.intro}
        image={dialogueImg}
        imageAlt={c.about.heading}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            <div>
              <h2 className="mb-3 font-serif text-3xl text-forest">{c.about.historyTitle}</h2>
              <p className="leading-relaxed text-moss/80">{c.about.historyText}</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-3xl text-forest">{c.about.visionTitle}</h2>
              <p className="leading-relaxed text-moss/80">{c.about.visionText}</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-3xl text-forest">{c.about.missionTitle}</h2>
              <p className="leading-relaxed text-moss/80">{c.about.missionText}</p>
            </div>
          </div>
          <img
            src={atelierImg}
            alt={c.about.approachTitle}
            width={1024}
            height={1280}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lg ring-1 ring-black/5"
          />
        </div>
      </Section>

      <Section tone="muted" title={c.about.objectivesTitle}>
        <ol className="grid gap-4 md:grid-cols-2">
          {c.about.objectives.map((o, i) => (
            <li
              key={o}
              className="flex gap-4 rounded-2xl bg-white/60 p-6 ring-1 ring-black/5"
            >
              <span className="font-serif text-2xl text-leaf/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-moss/80">{o}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={c.about.approachTitle} text={c.about.approachText}>
        <div className="rounded-3xl border border-forest/10 p-8">
          <h3 className="mb-2 font-serif text-2xl text-forest">{c.about.zonesTitle}</h3>
          <p className="mb-6 text-sm leading-relaxed text-moss/80">{c.about.zonesText}</p>
          <div className="flex flex-wrap gap-2">
            {c.org.zones.map((z) => (
              <span
                key={z}
                className="rounded-full bg-sprout/25 px-4 py-1.5 text-sm font-medium text-forest"
              >
                {z}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="forest" title={c.common.ourValues}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.values.map((v) => (
            <div key={v.name} className="rounded-2xl border border-kraft/10 bg-kraft/5 p-6">
              <h3 className="mb-2 font-serif text-xl text-kraft">{v.name}</h3>
              <p className="text-sm leading-relaxed text-sprout/70">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/projets"
            className="rounded-full bg-sprout px-6 py-3 text-sm font-medium text-forest hover:bg-kraft"
          >
            {c.common.discoverProjects}
          </Link>
          <Link
            to="/devenir-partenaire"
            className="rounded-full border border-sprout/40 px-6 py-3 text-sm font-medium text-sprout hover:bg-sprout/10"
          >
            {c.nav.partner}
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
