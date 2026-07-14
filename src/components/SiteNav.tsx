import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:py-8">
      <Link to="/" className="flex items-center gap-2">
        <div className="grid size-9 place-items-center rounded-full bg-forest">
          <div className="size-3 rotate-45 rounded-sm bg-sprout" />
        </div>
        <span className="font-serif text-xl tracking-tight text-forest">
          L'Arbre de la Paix
        </span>
      </Link>
      <div className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-forest/70 md:flex">
        <Link to="/" className="transition-colors hover:text-forest [&.active]:text-forest">
          L'Initiative
        </Link>
        <Link
          to="/tableau-de-bord"
          className="transition-colors hover:text-forest [&.active]:text-forest"
        >
          Tableau de bord
        </Link>
        <a href="/#actualites" className="transition-colors hover:text-forest">
          Actualités
        </a>
      </div>
      <Link
        to="/engagement"
        className="flex items-center gap-2 rounded-full bg-forest py-2 pl-3 pr-4 text-sm font-medium text-sprout ring-1 ring-forest transition-colors hover:bg-moss"
      >
        <span className="grid size-4 place-items-center rounded-full bg-sprout/20">
          <span className="size-1.5 rounded-full bg-sprout" />
        </span>
        Je m'engage
      </Link>
    </nav>
  );
}
