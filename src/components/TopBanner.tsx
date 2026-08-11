import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ROTATION_INTERVAL_MS = 5000;

export function TopBanner() {
  const { c } = useI18n();
  const messages = c.banner.messages;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % messages.length),
      ROTATION_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [messages.length]);

  return (
    <div className="relative z-50 bg-forest text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-2">
        <Megaphone className="hidden size-3.5 shrink-0 text-sprout sm:block" aria-hidden />
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="relative h-5">
            {messages.map((msg, i) => (
              <Link
                key={i}
                to="/alumma-ginda"
                className={cn(
                  "absolute inset-x-0 top-0 flex items-center justify-center gap-2 text-center text-xs font-medium transition-all duration-500 sm:text-sm",
                  i === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0",
                )}
                aria-hidden={i !== index}
              >
                <span className="truncate">{msg}</span>
                <span className="hidden shrink-0 text-sprout underline decoration-sprout/40 underline-offset-2 sm:inline">
                  {c.banner.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
