import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import logoAip from "@/assets/logo-aip.png.asset.json";

export function SiteFooter() {
  const { c } = useI18n();

  return (
    <footer className="border-t border-black/5 bg-kraft py-16">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 px-6 lg:flex-row">
        <div className="max-w-sm">
          <img
            src={logoAip.url}
            alt={c.org.name}
            width={180}
            height={50}
            loading="lazy"
            className="mb-5 h-10 w-auto"
          />
          <p className="text-sm leading-relaxed text-moss/80">{c.footer.about}</p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-20">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest/40">
              {c.footer.navTitle}
            </span>
            <ul className="space-y-2 text-sm text-forest/80">
              <li><Link to="/" className="hover:text-leaf">{c.nav.home}</Link></li>
              <li><Link to="/a-propos" className="hover:text-leaf">{c.nav.about}</Link></li>
              <li><Link to="/actualites" className="hover:text-leaf">{c.nav.news}</Link></li>
              <li><Link to="/evenements" className="hover:text-leaf">{c.nav.events}</Link></li>
              <li><Link to="/galerie" className="hover:text-leaf">{c.nav.gallery}</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest/40">
              {c.footer.projectsTitle}
            </span>
            <ul className="space-y-2 text-sm text-forest/80">
              <li><Link to="/projets" className="hover:text-leaf">{c.nav.projects}</Link></li>
              <li><Link to="/arbre-de-la-paix" className="hover:text-leaf">{c.nav.tree}</Link></li>
              <li><Link to="/alumma-ginda" className="hover:text-leaf">{c.nav.alumma}</Link></li>
              <li><Link to="/tableau-de-bord" className="hover:text-leaf">{c.common.dashboard}</Link></li>
              <li><Link to="/devenir-partenaire" className="hover:text-leaf">{c.nav.partner}</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest/40">
              {c.footer.contactTitle}
            </span>
            <ul className="space-y-2 text-sm text-forest/80">
              <li>{c.org.address}</li>
              <li>
                <a href={`mailto:${c.org.email}`} className="hover:text-leaf">{c.org.email}</a>
              </li>
              <li>
                <a href={`tel:${c.org.phone.replace(/\s/g, "")}`} className="hover:text-leaf">
                  {c.org.phone}
                </a>
              </li>
              <li><Link to="/contact" className="hover:text-leaf">{c.nav.contact}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-forest/5 px-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-forest/40">
          © {new Date().getFullYear()} {c.org.name}. {c.footer.rights}
        </span>
        <span className="text-xs italic text-forest/40">{c.footer.motto}</span>
      </div>
    </footer>
  );
}
