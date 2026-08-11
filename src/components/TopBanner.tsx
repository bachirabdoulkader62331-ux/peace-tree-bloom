import { Link } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function TopBanner() {
  const { c } = useI18n();
  const messages = c.banner.messages;

  // Concaténer les messages en une seule ligne avec séparateurs visuels.
  const tickerText = messages.join("  •  ");

  return (
    <div className="relative z-50 bg-forest text-white">
      <Link
        to="/alumma-ginda"
        className="group flex items-center gap-3 px-6 py-2"
      >
        <Megaphone className="hidden size-3.5 shrink-0 text-sprout sm:block" aria-hidden />
        <span className="sr-only">{c.banner.cta}</span>
        <span className="relative block w-full overflow-hidden whitespace-nowrap">
          <span
            className="inline-block animate-marquee whitespace-nowrap will-change-transform"
            aria-hidden="true"
          >
            {tickerText}
            <span className="mx-6 text-sprout">•</span>
            {tickerText}
            <span className="mx-6 text-sprout">•</span>
          </span>
        </span>
      </Link>
    </div>
  );
}
