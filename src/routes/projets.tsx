import { photos } from "@/content/homeSections";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";

const baobabImg = photos.plateformeArbre;
const alummaImg = photos.muryarAlumma;
const communityImg = photos.groupNiamey;

export const Route = createFileRoute("/projets")({
  head: () => ({
    meta: [
      { title: "Nos projets — Initiatives de paix numériques de l'AIP" },
      {
        name: "description",
        content:
          "Découvrez L'Arbre de la Paix et Al'umma Ginda, les initiatives de l'Association des Innovateurs pour la Paix au Niger.",
      },
      { property: "og:title", content: "Nos projets — Initiatives de paix numériques de l'AIP" },
      {
        property: "og:description",
        content: "L'Arbre de la Paix et Al'umma Ginda : le numérique au service de la cohésion sociale.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/projets" },
    ],
    links: [{ rel: "canonical", href: "https://peace-tree-bloom.lovable.app/projets" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { c } = useI18n();

  const cards = [
    { ...c.projects.treeCard, to: "/arbre-de-la-paix" as const, img: baobabImg },
    { ...c.projects.alummaCard, to: "/alumma-ginda" as const, img: alummaImg },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow={c.nav.projects}
        title={c.projects.heading}
        text={c.projects.intro}
        image={communityImg}
        imageAlt={c.projects.heading}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          {cards.map((p) => (
            <Link
              key={p.name}
              to={p.to}
              className="group overflow-hidden rounded-3xl ring-1 ring-black/5"
            >
              <img
                src={p.img}
                alt={p.name}
                width={1024}
                height={640}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="bg-white/60 p-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">
                  {p.tag}
                </span>
                <h2 className="mb-2 mt-3 font-serif text-2xl text-forest">{p.name}</h2>
                <p className="mb-4 text-sm leading-relaxed text-moss/80">{p.text}</p>
                <span className="text-sm font-medium text-forest underline decoration-leaf/40 decoration-2 underline-offset-4">
                  {c.common.learnMore} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="muted" title={c.projects.futureTitle} text={c.projects.futureText}>
        <Link
          to="/devenir-partenaire"
          className="inline-flex rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
        >
          {c.nav.partner}
        </Link>
      </Section>
    </PageShell>
  );
}
