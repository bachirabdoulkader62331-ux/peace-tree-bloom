import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Handshake,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { Reveal, CountUp } from "@/components/home/Reveal";
import { useI18n, formatDate } from "@/lib/i18n";
import { useLiveStats } from "@/lib/useLiveStats";
import { homeSections, photos, HOME_VIDEO } from "@/content/homeSections";

import logoAlumma from "@/assets/logo-alumma-ginda.png.asset.json";

const baobabImg = photos.plateformeArbre;

const SITE = "https://aip-niger.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Association des Innovateurs pour la Paix (AIP) — Paix et innovation au Sahel" },
      {
        name: "description",
        content:
          "L'AIP, organisation de jeunes du Sahel, œuvre pour la consolidation de la paix et les droits humains à l'ère du numérique : Al'umma Ginda, L'Arbre de la Paix, lutte contre la désinformation.",
      },
      {
        property: "og:title",
        content: "Association des Innovateurs pour la Paix (AIP) — Paix et innovation au Sahel",
      },
      {
        property: "og:description",
        content:
          "Consolidation de la paix et promotion des droits humains à l'ère du numérique au Niger et au Sahel.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
  }),
  component: Home,
});

const icons = {
  lightbulb: Lightbulb,
  users: Users,
  shield: ShieldCheck,
  heart: Heart,
  handshake: Handshake,
  globe: MapPin,
  sparkles: Lightbulb,
  message: Mail,
} as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-leaf">
      <span className="h-px w-6 bg-leaf/50" />
      {children}
    </span>
  );
}

function Home() {
  const { c, lang } = useI18n();
  const h = homeSections[lang];
  const { stats, treeStage } = useLiveStats();
  const locale = lang === "fr" ? "fr-FR" : "en-GB";

  return (
    <PageShell>
      <HeroSlider />

      {/* PRÉSENTATION AIP */}
      <section className="bg-kraft py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>{h.presentation.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-balance text-forest md:text-4xl">
              {h.presentation.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-moss">{h.presentation.lead}</p>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-moss/80">
              {h.presentation.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <Link
              to="/a-propos"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-kraft transition-colors hover:bg-moss"
            >
              {h.presentation.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={120} className="lg:pl-6">
            <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
              <img
                src={photos.groupNiamey}
                alt={h.presentation.imageAlt}
                width={1280}
                height={853}
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover md:h-96"
              />
            </div>
            <span className="mt-8 block text-[10px] font-bold uppercase tracking-[0.2em] text-forest/40">
              {h.presentation.pillarsTitle}
            </span>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {h.presentation.pillars.map((p) => (
                <li
                  key={p}
                  className="rounded-2xl bg-white/70 p-4 text-sm leading-snug text-moss ring-1 ring-black/5 transition-colors hover:bg-white"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* VALEURS */}
      <section className="border-y border-black/5 bg-leaf/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-[60ch]">
            <Eyebrow>{h.values.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl text-forest md:text-4xl">{h.values.title}</h2>
            <p className="mt-4 leading-relaxed text-moss/80">{h.values.text}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {h.values.items.map((v, i) => {
              const Icon = icons[v.icon];
              return (
                <Reveal key={v.name} delay={i * 80} as="article">
                  <div className="group h-full rounded-3xl bg-white/70 p-7 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-forest/5">
                    <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-sky/20 text-sky-deep transition-colors group-hover:bg-sky/35">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mb-2 font-serif text-xl text-forest">{v.name}</h3>
                    <p className="text-sm leading-relaxed text-moss/75">{v.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section className="bg-kraft py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-[60ch]">
            <Eyebrow>{h.projects.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl text-forest md:text-4xl">{h.projects.title}</h2>
            <p className="mt-4 leading-relaxed text-moss/80">{h.projects.text}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {h.projects.items.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90} as="article" className="h-full">
                <Link
                  to={p.to}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/70 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/5"
                >
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    width={1024}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">
                      {p.category}
                    </span>
                    <h3 className="mb-2 mt-3 font-serif text-2xl text-forest">{p.name}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-moss/80">{p.text}</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-forest">
                      {h.projects.cta}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS AL'UMMA GINDA */}
      <section className="bg-forest py-24 text-kraft">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-3xl ring-1 ring-kraft/10">
              <img
                src={photos.muryarAlumma}
                alt={h.alumma.imageAlt}
                width={1280}
                height={853}
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover md:h-[26rem]"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="mb-4 inline-flex items-center gap-3">
              <img
                src={logoAlumma.url}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="size-10 object-contain"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-sprout/70">
                {h.alumma.eyebrow}
              </span>
            </span>
            <h2 className="font-serif text-3xl text-kraft md:text-4xl">{h.alumma.title}</h2>
            <p className="mt-5 leading-relaxed text-sprout/85">{h.alumma.text}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {h.alumma.points.map((p) => (
                <li key={p.t} className="rounded-2xl border border-kraft/10 bg-kraft/5 p-5">
                  <span className="block font-serif text-lg text-kraft">{p.t}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-sprout/70">{p.d}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/alumma-ginda"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 text-sm font-semibold text-sky-ink transition-colors hover:bg-sky-soft"
            >
              {h.alumma.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FOCUS ARBRE DE LA PAIX */}
      <section className="bg-kraft py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{h.tree.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl text-forest md:text-4xl">{h.tree.title}</h2>
            <p className="mt-5 leading-relaxed text-moss/85">{h.tree.text}</p>
            <ul className="mt-8 space-y-3">
              {h.tree.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-moss/80">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-leaf" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/arbre-de-la-paix"
                className="group inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-kraft transition-colors hover:bg-moss"
              >
                {h.tree.ctaPrimary}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/engagement"
                className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
              >
                {h.tree.ctaSecondary}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
              <img
                src={baobabImg}
                alt={c.projects.treeCard.name}
                width={1024}
                height={640}
                loading="lazy"
                decoding="async"
                className="h-64 w-full object-cover md:h-80"
              />
            </div>
            <div className="mt-6 rounded-3xl bg-white/70 p-7 ring-1 ring-black/5">
              <span className="font-serif text-4xl text-forest">
                {stats.participants.toLocaleString(locale)}
              </span>
              <span className="mt-1 block text-sm text-moss/70">
                {lang === "fr" ? "citoyens engagés" : "citizens pledged"}
              </span>
              <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">
                {treeStage.label}
              </span>
              <Link
                to="/tableau-de-bord"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-leaf/40 decoration-2 underline-offset-4"
              >
                {c.common.dashboard} →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* IMPACT / CHIFFRES */}
      <section className="border-y border-black/5 bg-sky/10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-[60ch]">
            <Eyebrow>{h.impact.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl text-forest md:text-4xl">{h.impact.title}</h2>
            <p className="mt-4 leading-relaxed text-moss/80">{h.impact.text}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {h.impact.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="h-full rounded-3xl bg-white/75 p-7 ring-1 ring-black/5">
                  <span className="font-serif text-4xl text-forest md:text-5xl">
                    <CountUp value={s.value} suffix={s.suffix} locale={locale} />
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-moss">{s.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-moss/60">{s.note}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIDÉO */}
      <section className="bg-kraft py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="text-center">
            <Eyebrow>{h.video.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl text-forest md:text-4xl">{h.video.title}</h2>
            <p className="mx-auto mt-4 max-w-[62ch] leading-relaxed text-moss/80">{h.video.text}</p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            {HOME_VIDEO.youtubeId ? (
              <div className="aspect-video overflow-hidden rounded-3xl ring-1 ring-black/10">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${HOME_VIDEO.youtubeId}`}
                  title={h.video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-forest/20 bg-white/60 p-12 text-center">
                <PlayCircle className="size-12 text-sky-deep" />
                <p className="max-w-[52ch] text-sm leading-relaxed text-moss/75">
                  {h.video.fallback}
                </p>
                <a
                  href={HOME_VIDEO.channelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-kraft transition-colors hover:bg-moss"
                >
                  {h.video.fallbackCta}
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ACTIVITÉS 2024 + ACTUALITÉS */}
      <section className="border-t border-black/5 bg-leaf/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-[60ch]">
            <Eyebrow>{h.activities.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl text-forest md:text-4xl">{h.activities.title}</h2>
            <p className="mt-4 leading-relaxed text-moss/80">{h.activities.text}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {h.activities.items.map((a, i) => (
              <Reveal key={a.title} delay={i * 90} as="article" className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/70 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-forest/5">
                  <img
                    src={a.image}
                    alt=""
                    width={1024}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-leaf">
                      <span className="size-1.5 rounded-full bg-leaf" />
                      {a.category}
                      <span className="text-forest/30">· {a.date}</span>
                    </div>
                    <h3 className="mb-2 font-serif text-xl leading-snug text-forest">{a.title}</h3>
                    <p className="text-sm leading-relaxed text-moss/80">{a.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16" delay={80}>
            <h3 className="mb-6 font-serif text-2xl text-forest">{c.common.latestNews}</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {c.news.items.slice(0, 3).map((n) => (
                <article key={n.slug} className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5">
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-leaf">
                    <span className="size-1.5 rounded-full bg-leaf" />
                    {n.category}
                  </div>
                  <h4 className="mb-2 font-serif text-lg leading-snug text-forest">{n.title}</h4>
                  <p className="mb-4 text-sm leading-relaxed text-moss/80">{n.excerpt}</p>
                  <span className="text-xs text-forest/50">{formatDate(n.date, lang)}</span>
                </article>
              ))}
            </div>
            <Link
              to="/actualites"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-forest/25 px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
            >
              {c.common.seeAll}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* APPEL À L'ENGAGEMENT */}
      <section className="bg-forest py-24 text-kraft">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="overflow-hidden rounded-3xl border border-kraft/10 bg-kraft/5">
            <div className="grid items-center gap-10 p-10 md:grid-cols-[1.1fr_0.9fr] md:p-14">
              <div>
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.22em] text-sprout/70">
                  {h.engage.eyebrow}
                </span>
                <h2 className="font-serif text-3xl text-kraft md:text-4xl">{h.engage.title}</h2>
                <p className="mt-4 max-w-[54ch] leading-relaxed text-sprout/80">{h.engage.text}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/engagement"
                    className="group inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 text-sm font-semibold text-sky-ink transition-colors hover:bg-sky-soft"
                  >
                    {h.engage.ctaPrimary}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/devenir-partenaire"
                    className="inline-flex items-center gap-2 rounded-full border border-sprout/40 px-6 py-3 text-sm font-semibold text-sprout transition-colors hover:bg-sprout/10"
                  >
                    {h.engage.ctaSecondary}
                  </Link>
                </div>
              </div>
              <img
                src={photos.portraitEngagement}
                alt=""
                width={1024}
                height={520}
                loading="lazy"
                decoding="async"
                className="h-56 w-full rounded-2xl object-cover md:h-64"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="bg-kraft py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="max-w-[60ch]">
            <Eyebrow>{h.partners.eyebrow}</Eyebrow>
            <h2 className="font-serif text-2xl text-forest md:text-3xl">{h.partners.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-moss/70">{h.partners.text}</p>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {h.partners.items.map((p, i) => (
              <Reveal key={p} delay={i * 60}>
                <span className="inline-flex rounded-full bg-white/70 px-5 py-2.5 text-sm font-semibold text-forest ring-1 ring-black/5 transition-colors hover:bg-white">
                  {p}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="border-t border-black/5 bg-sky/10 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>{h.contact.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl text-forest md:text-4xl">{h.contact.title}</h2>
            <p className="mt-4 leading-relaxed text-moss/80">{h.contact.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-kraft transition-colors hover:bg-moss"
              >
                {h.contact.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/devenir-partenaire"
                className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
              >
                {h.contact.partnerCta}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-4 rounded-3xl bg-white/75 p-8 ring-1 ring-black/5">
              <li className="flex gap-4 text-sm leading-relaxed text-moss">
                <MapPin className="mt-0.5 size-5 shrink-0 text-sky-deep" />
                {c.org.address}
              </li>
              <li className="flex gap-4 text-sm text-moss">
                <Mail className="size-5 shrink-0 text-sky-deep" />
                <a href={`mailto:${c.org.email}`} className="hover:text-leaf">
                  {c.org.email}
                </a>
              </li>
              <li className="flex gap-4 text-sm text-moss">
                <Phone className="size-5 shrink-0 text-sky-deep" />
                <a href={`tel:${c.org.phone.replace(/\s/g, "")}`} className="hover:text-leaf">
                  {c.org.phone}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
