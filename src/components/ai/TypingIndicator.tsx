import { AlummaAvatar } from "./AlummaAvatar";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { ASSISTANT } from "@/lib/ai/assistant.config";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2" aria-live="polite">
      <AlummaAvatar size={28} />
      <Shimmer className="pt-1 text-sm">{ASSISTANT.thinking}</Shimmer>
    </div>
  );
}
