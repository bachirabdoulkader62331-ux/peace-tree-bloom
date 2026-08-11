import { AlummaAvatar } from "./AlummaAvatar";
import { ASSISTANT } from "@/lib/ai/assistant.config";
import { cn } from "@/lib/utils";

export function FloatingAIButton({
  open,
  onClick,
  className,
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 sm:bottom-6 sm:right-6",
        className,
      )}
    >
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-forest px-3 py-1.5 text-xs font-medium text-kraft opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:block"
      >
        {ASSISTANT.tooltip}
      </span>
      <button
        type="button"
        onClick={onClick}
        aria-label={ASSISTANT.tooltip}
        aria-expanded={open}
        className="relative flex size-14 items-center justify-center rounded-full bg-sky shadow-[0_10px_30px_-8px_rgba(33,72,155,0.55)] ring-1 ring-white/40 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 sm:size-16"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-sky/40 [animation-duration:3s]" />
        <AlummaAvatar size={44} className="relative ring-0" />
      </button>
    </div>
  );
}
