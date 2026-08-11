import { Minus, RotateCcw, X } from "lucide-react";

import { AlummaAvatar } from "./AlummaAvatar";
import { ASSISTANT } from "@/lib/ai/assistant.config";

export function AIChatHeader({
  onMinimize,
  onClose,
  onReset,
}: {
  onMinimize: () => void;
  onClose: () => void;
  onReset: () => void;
}) {
  return (
    <header className="flex items-center gap-3 border-b border-white/10 bg-forest px-4 py-3 text-kraft">
      <AlummaAvatar size={40} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{ASSISTANT.name}</p>
        <p className="truncate text-[11px] text-sprout/80">{ASSISTANT.subtitle}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-sprout">
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          {ASSISTANT.status}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onReset}
          aria-label={ASSISTANT.newConversation}
          title={ASSISTANT.newConversation}
          className="rounded-full p-2 text-sprout transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout"
        >
          <RotateCcw className="size-4" />
        </button>
        <button
          type="button"
          onClick={onMinimize}
          aria-label="Réduire"
          title="Réduire"
          className="rounded-full p-2 text-sprout transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout"
        >
          <Minus className="size-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          title="Fermer"
          className="rounded-full p-2 text-sprout transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout"
        >
          <X className="size-4" />
        </button>
      </div>
    </header>
  );
}
