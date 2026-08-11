import { useCallback, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import { AIChatHeader } from "./AIChatHeader";
import { AIInput } from "./AIInput";
import { AIMessageList } from "./AIMessageList";
import { ASSISTANT } from "@/lib/ai/assistant.config";

/**
 * Fenêtre de conversation. Session unique, mémoire en mémoire vive
 * (réinitialisée via « Nouvelle conversation » ou au rechargement de la page).
 */
export function AIChatWindow({
  onMinimize,
  onClose,
}: {
  onMinimize: () => void;
  onClose: () => void;
}) {
  const [sessionId, setSessionId] = useState(() => `alumma-${Date.now()}`);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);

  const { messages, sendMessage, status, stop, setMessages } = useChat({
    id: sessionId,
    transport,
    onError: () => setErrorMessage(ASSISTANT.errorGeneric),
  });

  const send = useCallback(
    (text: string) => {
      setErrorMessage(null);
      void sendMessage({ text });
    },
    [sendMessage],
  );

  const reset = useCallback(() => {
    if (messages.length > 0 && !window.confirm(ASSISTANT.newConversationConfirm)) return;
    stop();
    setMessages([]);
    setErrorMessage(null);
    setSessionId(`alumma-${Date.now()}`);
  }, [messages.length, setMessages, stop]);

  return (
    <div
      role="dialog"
      aria-label={ASSISTANT.name}
      className="fixed inset-x-0 bottom-0 top-0 z-50 flex flex-col overflow-hidden bg-muted shadow-2xl animate-hero-in sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[400px] sm:rounded-3xl sm:ring-1 sm:ring-black/10"
    >
      <AIChatHeader onMinimize={onMinimize} onClose={onClose} onReset={reset} />
      <AIMessageList
        messages={messages}
        status={status}
        errorMessage={errorMessage}
        onSuggestion={send}
      />
      <AIInput status={status} onSend={send} onStop={stop} autoFocusKey={sessionId} />
    </div>
  );
}
