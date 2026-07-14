export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-kraft py-16">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 px-6 md:flex-row">
        <div className="max-w-sm">
          <div className="mb-6 flex items-center gap-2">
            <div className="grid size-6 place-items-center rounded-full bg-forest">
              <div className="size-2 rotate-45 rounded-sm bg-sprout" />
            </div>
            <span className="font-serif text-lg tracking-tight text-forest">
              L'Arbre de la Paix
            </span>
          </div>
          <p className="text-sm leading-relaxed text-moss/80">
            Une initiative citoyenne de l'Association des Innovateurs pour la Paix,
            pour la cohésion sociale et le vivre-ensemble au Niger.
          </p>
        </div>
        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest/40">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-forest/80">
              <li><a href="/" className="hover:text-leaf">Accueil</a></li>
              <li><a href="/tableau-de-bord" className="hover:text-leaf">Statistiques</a></li>
              <li><a href="/engagement" className="hover:text-leaf">S'engager</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-forest/40">
              Contact
            </span>
            <ul className="space-y-2 text-sm text-forest/80">
              <li>Niamey, Niger</li>
              <li>contact@arbredelapaix.ne</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl items-center justify-between border-t border-forest/5 px-6 pt-8">
        <span className="text-xs text-forest/40">
          © {new Date().getFullYear()} L'Arbre de la Paix. Tous droits réservés.
        </span>
        <span className="text-xs italic text-forest/40">
          Ensemble, faisons grandir la paix.
        </span>
      </div>
    </footer>
  );
}
