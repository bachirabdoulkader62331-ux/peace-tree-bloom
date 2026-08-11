import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import communityImg from "@/assets/community.jpg";

export const Route = createFileRoute("/devenir-partenaire")({
  head: () => ({
    meta: [
      { title: "Devenir partenaire de l'AIP — Collaborons pour la paix" },
      {
        name: "description",
        content:
          "Organisations, institutions, entreprises et bailleurs : collaborez avec l'Association des Innovateurs pour la Paix au Niger.",
      },
      { property: "og:title", content: "Devenir partenaire de l'AIP — Collaborons pour la paix" },
      {
        property: "og:description",
        content: "Partenariat technique, financier, institutionnel, média ou mécénat.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/devenir-partenaire" },
    ],
    links: [
      { rel: "canonical", href: "https://peace-tree-bloom.lovable.app/devenir-partenaire" },
    ],
  }),
  component: PartnerPage,
});

function PartnerPage() {
  const { c } = useI18n();
  const [form, setForm] = useState({
    organization: "",
    manager: "",
    email: "",
    phone: "",
    type: c.partner.types[0],
    message: "",
  });

  const schema = z.object({
    organization: z.string().trim().min(1, c.common.requiredField).max(120),
    manager: z.string().trim().min(1, c.common.requiredField).max(120),
    email: z.string().trim().email(c.common.invalidEmail).max(200),
    phone: z.string().trim().max(40),
    type: z.string().trim().min(1).max(80),
    message: z.string().trim().min(1, c.common.requiredField).max(1500),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? c.common.requiredField);
      return;
    }
    const d = parsed.data;
    const body = `${c.partner.form.organization}: ${d.organization}\n${c.partner.form.manager}: ${d.manager}\n${c.partner.form.email}: ${d.email}\n${c.partner.form.phone}: ${d.phone}\n${c.partner.form.type}: ${d.type}\n\n${d.message}`;
    window.location.href = `mailto:${c.org.email}?subject=${encodeURIComponent(
      `${c.partner.heading} — ${d.organization}`,
    )}&body=${encodeURIComponent(body)}`;
    toast.success(c.partner.form.success);
  };

  const field =
    "w-full rounded-xl border border-input bg-white/70 px-4 py-3 text-sm text-forest outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20";

  return (
    <PageShell>
      <PageHero
        eyebrow={c.nav.partner}
        title={c.partner.heading}
        text={c.partner.intro}
        image={communityImg}
        imageAlt={c.partner.heading}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="mb-6 font-serif text-2xl text-forest">{c.partner.typesTitle}</h2>
            <ul className="space-y-3">
              {c.partner.types.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-xl border border-forest/10 px-5 py-3 text-sm text-moss/80"
                >
                  <span className="size-1.5 rounded-full bg-leaf" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white/50 p-8 ring-1 ring-black/5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                  {c.partner.form.organization}
                </span>
                <input
                  className={field}
                  value={form.organization}
                  maxLength={120}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                  {c.partner.form.manager}
                </span>
                <input
                  className={field}
                  value={form.manager}
                  maxLength={120}
                  onChange={(e) => setForm({ ...form, manager: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                  {c.partner.form.email}
                </span>
                <input
                  type="email"
                  className={field}
                  value={form.email}
                  maxLength={200}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                  {c.partner.form.phone} ({c.common.optional})
                </span>
                <input
                  className={field}
                  value={form.phone}
                  maxLength={40}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                {c.partner.form.type}
              </span>
              <select
                className={field}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                {c.partner.types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                {c.partner.form.message}
              </span>
              <textarea
                rows={5}
                className={field}
                value={form.message}
                maxLength={1500}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
            >
              {c.partner.form.submit}
            </button>
          </form>
        </div>
      </Section>
    </PageShell>
  );
}
