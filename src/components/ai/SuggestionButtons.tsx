import { ASSISTANT } from "@/lib/ai/assistant.config";

export function SuggestionButtons({
  onSelect,
  disabled,
}: {
  onSelect: (text: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ASSISTANT.suggestions.map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(s)}
          className="rounded-full border border-sky/40 bg-white px-3 py-2 text-left text-xs font-medium text-sky-deep transition-colors hover:border-sky hover:bg-sky/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky disabled:opacity-50"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
