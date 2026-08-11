import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Nous contacter — Association des Innovateurs pour la Paix" },
      {
        name: "description",
        content:
          "Adresse, téléphone, email et formulaire de contact de l'Association des Innovateurs pour la Paix à Niamey, Niger.",
      },
      { property: "og:title", content: "Nous contacter — Association des Innovateurs pour la Paix" },
      {
        property: "og:description",
        content: "Écrivez-nous : questions, propositions de partenariat ou demandes presse.",
      },
      { property: "og:url", content: "https://peace-tree-bloom.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://peace-tree-bloom.lovable.app/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          name: "Association des Innovateurs pour la Paix",
          email: "innovateurspaix@gmail.com",
          telephone: "+227 93 31 29 31",
          address: {
            "@type": "PostalAddress",
            streetAddress: "168 Avenue Muhamadou Buhari, Bobiel",
            addressLocality: "Niamey",
            addressCountry: "NE",
          },
          url: "https://peace-tree-bloom.lovable.app/",
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { c } = useI18n();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const schema = z.object({
    name: z.string().trim().min(1, c.common.requiredField).max(120),
    email: z.string().trim().email(c.common.invalidEmail).max(200),
    phone: z.string().trim().max(40),
    subject: z.string().trim().min(1, c.common.requiredField).max(150),
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
    const body = `${c.contact.form.name}: ${d.name}\n${c.contact.form.email}: ${d.email}\n${c.contact.form.phone}: ${d.phone}\n\n${d.message}`;
    window.location.href = `mailto:${c.org.email}?subject=${encodeURIComponent(
      d.subject,
    )}&body=${encodeURIComponent(body)}`;
    toast.success(c.contact.form.success);
  };

  const field =
    "w-full rounded-xl border border-input bg-white/70 px-4 py-3 text-sm text-forest outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20";

  return (
    <PageShell>
      <PageHero eyebrow={c.nav.contact} title={c.contact.heading} text={c.contact.intro} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden />
              <div>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-forest/50">
                  {c.contact.addressLabel}
                </span>
                <p className="text-sm leading-relaxed text-moss/80">{c.org.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden />
              <div>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-forest/50">
                  {c.contact.phoneLabel}
                </span>
                <a
                  href={`tel:${c.org.phone.replace(/\s/g, "")}`}
                  className="text-sm text-moss/80 hover:text-leaf"
                >
                  {c.org.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden />
              <div>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-forest/50">
                  {c.contact.emailLabel}
                </span>
                <a href={`mailto:${c.org.email}`} className="text-sm text-moss/80 hover:text-leaf">
                  {c.org.email}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-forest/10 p-6">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-forest/50">
                {c.contact.contactPersonLabel}
              </span>
              <p className="font-serif text-lg text-forest">{c.org.contactPerson.name}</p>
              <p className="text-sm text-moss/70">{c.org.contactPerson.role}</p>
              <p className="mt-2 text-sm text-moss/80">
                <a href={`mailto:${c.org.contactPerson.email}`} className="hover:text-leaf">
                  {c.org.contactPerson.email}
                </a>
                <br />
                <a
                  href={`tel:${c.org.contactPerson.phone.replace(/\s/g, "")}`}
                  className="hover:text-leaf"
                >
                  {c.org.contactPerson.phone}
                </a>
              </p>
            </div>
            <a
              href={`https://wa.me/${c.org.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-kraft hover:bg-moss"
            >
              <MessageCircle className="size-4" aria-hidden />
              {c.contact.whatsappCta}
            </a>
          </div>

          <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white/50 p-8 ring-1 ring-black/5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                  {c.contact.form.name}
                </span>
                <input
                  className={field}
                  value={form.name}
                  maxLength={120}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                  {c.contact.form.email}
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
                  {c.contact.form.phone} ({c.common.optional})
                </span>
                <input
                  className={field}
                  value={form.phone}
                  maxLength={40}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                  {c.contact.form.subject}
                </span>
                <input
                  className={field}
                  value={form.subject}
                  maxLength={150}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-forest/60">
                {c.contact.form.message}
              </span>
              <textarea
                rows={6}
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
              {c.contact.form.submit}
            </button>
          </form>
        </div>
      </Section>
    </PageShell>
  );
}
