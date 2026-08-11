import { useEffect, useRef } from "react";
import type { ChatStatus } from "ai";

import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { ASSISTANT, CHAT_LIMITS } from "@/lib/ai/assistant.config";

export function AIInput({
  status,
  onSend,
  onStop,
  autoFocusKey,
}: {
  status: ChatStatus;
  onSend: (text: string) => void;
  onStop: () => void;
  autoFocusKey: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const textarea = wrapRef.current?.querySelector("textarea");
    textarea?.focus();
  }, [autoFocusKey, busy]);

  return (
    <div
      ref={wrapRef}
      className="border-t border-black/5 bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3"
    >
      <PromptInput
        onSubmit={(message, event) => {
          event.preventDefault();
          const text = (message.text ?? "").trim();
          if (!text || busy) return;
          onSend(text.slice(0, CHAT_LIMITS.maxMessageChars));
        }}
      >
        <PromptInputTextarea
          placeholder={ASSISTANT.placeholder}
          maxLength={CHAT_LIMITS.maxMessageChars}
          aria-label={ASSISTANT.placeholder}
        />
        <PromptInputFooter className="justify-end">
          <PromptInputSubmit status={status} onStop={onStop} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
