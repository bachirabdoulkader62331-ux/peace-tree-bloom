import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoAip from "@/assets/logo-aip.png.asset.json";

export function SiteNav() {
  const { c, lang, toggleLang } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: c.nav.home },
    { to: "/a-propos", label: c.nav.about },
    { to: "/projets", label: c.nav.projects },
    { to: "/arbre-de-la-paix", label: c.nav.tree },
    { to: "/alumma-ginda", label: c.nav.alumma },
    { to: "/actualites", label: c.nav.news },
    { to: "/evenements", label: c.nav.events },
    { to: "/galerie", label: c.nav.gallery },
    { to: "/contact", label: c.nav.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-kraft/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoAip.url}
            alt={c.org.name}
            width={160}
            height={44}
            className="h-9 w-auto"
          />
          <span className="sr-only">{c.org.name}</span>
        </Link>

        <div className="hidden items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-forest/70 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="transition-colors hover:text-forest [&.active]:text-forest"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Changer de langue / Switch language"
            className="flex items-center gap-1.5 rounded-full border border-forest/20 px-3 py-1.5 text-xs font-semibold uppercase text-forest transition-colors hover:bg-forest/5"
          >
            <Globe className="size-3.5" aria-hidden />
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <Link
            to="/engagement"
            className="hidden rounded-full bg-forest px-4 py-2 text-sm font-medium text-sprout ring-1 ring-forest transition-colors hover:bg-moss sm:block"
          >
            {c.nav.cta}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-full border border-forest/20 text-forest xl:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-kraft xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-forest/80 transition-colors hover:bg-forest/5 [&.active]:text-forest"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/engagement"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-forest px-4 py-2.5 text-center text-sm font-medium text-sprout"
            >
              {c.nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
