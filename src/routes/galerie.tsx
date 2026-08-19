import { photos } from "@/content/homeSections";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";

const baobabImg = photos.plateformeArbre;
const alummaImg = photos.muryarAlumma;
const communityImg = photos.groupNiamey;
const atelierImg = photos.atelierCartographie;
const dialogueImg = photos.conflitsNumeriques;
const nigerMapImg = photos.portraitParticipant;
const aipHero = photos.teamTerrain;

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Photos et vidéos de nos activités" },
      {
        name: "description",
        content:
          "Photos et vidéos des activités, événements et projets de l'Association des Innovateurs pour la Paix au Niger.",
      },
      { property: "og:title", content: "Galerie — Photos et vidéos de nos activités" },
      {
        property: "og:description",
        content: "Découvrez en images nos activités communautaires, événements et projets de paix.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/galerie" },
    ],
    links: [{ rel: "canonical", href: "https://peace-tree-bloom.lovable.app/galerie" }],
  }),
  component: GalleryPage,
});

type Cat = "all" | "activities" | "events" | "projects";

const MEDIA: Array<{ src: string; cat: Exclude<Cat, "all">; key: string }> = [
  { src: alummaImg, cat: "projects", key: "alumma" },
  { src: atelierImg, cat: "activities", key: "atelier" },
  { src: dialogueImg, cat: "events", key: "dialogue" },
  { src: communityImg, cat: "events", key: "community" },
  { src: baobabImg, cat: "projects", key: "baobab" },
  { src: aipHero, cat: "activities", key: "aip" },
  { src: nigerMapImg, cat: "projects", key: "map" },
];

function GalleryPage() {
  const { c } = useI18n();
  const [cat, setCat] = useState<Cat>("all");
  const visible = cat === "all" ? MEDIA : MEDIA.filter((m) => m.cat === cat);

  const tabs: Cat[] = ["all", "activities", "events", "projects"];

  return (
    <PageShell>
      <PageHero eyebrow={c.nav.gallery} title={c.gallery.heading} text={c.gallery.intro} />

      <Section>
        <div className="mb-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setCat(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                cat === t
                  ? "bg-forest text-kraft"
                  : "border border-forest/20 text-forest hover:bg-forest/5"
              }`}
            >
              {c.gallery.categories[t]}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((m) => (
            <img
              key={m.key}
              src={m.src}
              alt={`${c.gallery.heading} — ${c.gallery.categories[m.cat]}`}
              width={800}
              height={800}
              loading="lazy"
              className="aspect-square w-full rounded-2xl object-cover ring-1 ring-black/5 transition-transform hover:scale-[1.02]"
            />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
