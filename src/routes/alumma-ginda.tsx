import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useI18n, formatDate } from "@/lib/i18n";
import logoAlumma from "@/assets/logo-alumma-ginda.png.asset.json";
import alummaImg from "@/assets/alumma-ginda.jpg";
import atelierImg from "@/assets/atelier.jpg";
import dialogueImg from "@/assets/dialogue.jpg";
import communityImg from "@/assets/community.jpg";

export const Route = createFileRoute("/alumma-ginda")({
  head: () => ({
    meta: [
      { title: "Al'umma Ginda — La voix de la population pour la paix" },
      {
        name: "description",
        content:
          "Al'umma Ginda : sensibilisation et plaidoyer numériques pour la paix au Niger, avec chatbot WhatsApp, contenus audio en langues locales et questionnaire citoyen.",
      },
      { property: "og:title", content: "Al'umma Ginda — La voix de la population pour la paix" },
      {
        property: "og:description",
        content:
          "Des outils numériques innovants au service de la cohésion sociale à Tillabéri, Maradi et Tahoua.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/alumma-ginda" },
    ],
    links: [{ rel: "canonical", href: "https://peace-tree-bloom.lovable.app/alumma-ginda" }],
  }),
  component: AlummaPage,
});

function AlummaPage() {
  const { c, lang } = useI18n();
  const gallery = [alummaImg, atelierImg, dialogueImg, communityImg];

  return (
    <PageShell>
      <PageHero
        eyebrow={c.projects.alummaCard.tag}
        title={c.alumma.heading}
        text={c.alumma.subtitle}
        image={alummaImg}
        imageAlt={c.alumma.heading}
      />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[auto_1fr]">
          <img
            src={logoAlumma.url}
            alt={c.alumma.heading}
            width={200}
            height={200}
            className="size-32 object-contain md:size-40"
          />
          <div className="space-y-8">
            <p className="font-serif text-2xl leading-snug text-forest">{c.alumma.meaning}</p>
            <div>
              <h2 className="mb-3 font-serif text-3xl text-forest">
                {c.alumma.presentationTitle}
              </h2>
              <p className="leading-relaxed text-moss/80">{c.alumma.presentationText}</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-3xl text-forest">{c.alumma.contextTitle}</h2>
              <p className="leading-relaxed text-moss/80">{c.alumma.contextText}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted" title={c.alumma.actionsTitle}>
        <div className="grid gap-4 sm:grid-cols-2">
          {c.alumma.actions.map((a) => (
            <div key={a.t} className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5">
              <h3 className="mb-2 font-serif text-xl text-forest">{a.t}</h3>
              <p className="text-sm leading-relaxed text-moss/80">{a.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${c.org.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
          >
            {c.common.whatsappBot}
          </a>
          <Link
            to="/engagement"
            className="rounded-full border border-forest/20 px-6 py-3 text-sm font-medium text-forest hover:bg-forest/5"
          >
            {c.common.contribute}
          </Link>
        </div>
      </Section>

      <Section title={c.alumma.beneficiariesTitle}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.alumma.beneficiaries.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-2xl border border-forest/10 p-5 text-sm text-moss/80"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-leaf" />
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="forest" title={c.alumma.impactTitle} text={c.alumma.impactText}>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {c.alumma.impactFigures.map((f) => (
            <div key={f.label} className="flex flex-col gap-1">
              <span className="font-serif text-4xl text-kraft">{f.value}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sprout/60">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" title={c.alumma.galleryTitle} text={c.alumma.galleryText}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${c.alumma.galleryTitle} ${i + 1}`}
              width={800}
              height={800}
              loading="lazy"
              className="aspect-square w-full rounded-2xl object-cover ring-1 ring-black/5"
            />
          ))}
        </div>
      </Section>

      <Section title={c.alumma.newsTitle}>
        <div className="grid gap-6 md:grid-cols-3">
          {c.news.items.map((n) => (
            <article key={n.slug} className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-leaf">
                {n.category}
              </span>
              <h3 className="mb-2 mt-3 font-serif text-xl leading-snug text-forest">{n.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-moss/80">{n.excerpt}</p>
              <span className="text-xs text-forest/50">{formatDate(n.date, lang)}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" title={c.alumma.partnersTitle} text={c.alumma.partnersText}>
        <div className="rounded-3xl border border-forest/10 bg-white/50 p-8">
          <h3 className="mb-2 font-serif text-2xl text-forest">{c.alumma.joinTitle}</h3>
          <p className="mb-6 text-sm leading-relaxed text-moss/80">{c.alumma.joinText}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/devenir-partenaire"
              className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
            >
              {c.nav.partner}
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-forest/20 px-6 py-3 text-sm font-medium text-forest hover:bg-forest/5"
            >
              {c.nav.contact}
            </Link>
          </div>
          <p className="mt-6 text-xs italic text-forest/40">{c.alumma.note}</p>
        </div>
      </Section>
    </PageShell>
  );
}
