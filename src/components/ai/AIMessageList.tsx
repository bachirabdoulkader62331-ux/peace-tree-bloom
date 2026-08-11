import type { UIMessage } from "ai";

import { AlummaAvatar } from "./AlummaAvatar";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestionButtons } from "./SuggestionButtons";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { ASSISTANT } from "@/lib/ai/assistant.config";

function messageText(message: UIMessage): string {
  return message.parts
    .map((p) => (p.type === "text" && "text" in p ? p.text : ""))
    .join("")
    .trim();
}

export function AIMessageList({
  messages,
  status,
  errorMessage,
  onSuggestion,
}: {
  messages: UIMessage[];
  status: string;
  errorMessage: string | null;
  onSuggestion: (text: string) => void;
}) {
  const isBusy = status === "submitted" || status === "streaming";
  const lastIsAssistantEmpty =
    messages.length > 0 &&
    messages[messages.length - 1]?.role === "assistant" &&
    messageText(messages[messages.length - 1]!) === "";

  return (
    <Conversation className="flex-1">
      <ConversationContent className="gap-4 px-4 py-4">
        {/* Écran d'accueil */}
        <div className="flex items-start gap-2">
          <AlummaAvatar size={28} />
          <div className="min-w-0 text-sm leading-relaxed text-foreground">
            <MessageResponse>{ASSISTANT.greeting}</MessageResponse>
          </div>
        </div>

        {messages.length === 0 && (
          <div className="pl-9">
            <SuggestionButtons onSelect={onSuggestion} disabled={isBusy} />
          </div>
        )}

        {messages.map((message) => {
          const text = messageText(message);
          if (!text) return null;
          return (
            <Message key={message.id} from={message.role}>
              {message.role === "assistant" ? (
                <div className="flex items-start gap-2">
                  <AlummaAvatar size={28} />
                  <MessageContent className="rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
                    <MessageResponse>{text}</MessageResponse>
                  </MessageContent>
                </div>
              ) : (
                <MessageContent className="group-[.is-user]:rounded-2xl group-[.is-user]:bg-forest group-[.is-user]:text-kraft">
                  <p className="whitespace-pre-wrap">{text}</p>
                </MessageContent>
              )}
            </Message>
          );
        })}

        {(status === "submitted" || lastIsAssistantEmpty) && <TypingIndicator />}

        {errorMessage && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            {errorMessage}
          </div>
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
