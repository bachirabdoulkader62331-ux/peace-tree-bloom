import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { CHAT_LIMITS } from "@/lib/ai/assistant.config";
import { buildSystemPrompt, getAiConfig } from "@/lib/ai/assistant.server";

type ChatBody = { messages?: unknown };

function textLength(message: UIMessage): number {
  return message.parts
    .filter((p) => p.type === "text")
    .reduce((n, p) => n + ("text" in p ? p.text.length : 0), 0);
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ChatBody;
        try {
          body = (await request.json()) as ChatBody;
        } catch {
          return new Response("Requête invalide", { status: 400 });
        }

        const messages = body.messages;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("Requête invalide", { status: 400 });
        }
        const history = (messages as UIMessage[]).slice(-CHAT_LIMITS.maxHistoryMessages);
        if (history.some((m) => textLength(m) > CHAT_LIMITS.maxMessageChars)) {
          return new Response("Message trop long", { status: 413 });
        }

        const { model, apiKey } = getAiConfig();
        if (!apiKey) {
          console.error("[api/chat] clé API IA manquante");
          return new Response("Service indisponible", { status: 503 });
        }

        const gateway = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        });

        try {
          const result = streamText({
            model: gateway.responses(model),
            system: buildSystemPrompt(),
            messages: await convertToModelMessages(history),
            providerOptions: { openai: { store: false } },
            abortSignal: request.signal,
          });

          return result.toUIMessageStreamResponse({ originalMessages: history });
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return new Response("Requête annulée", { status: 499 });
          }
          console.error("[api/chat]", error);
          return new Response("Service indisponible", { status: 503 });
        }
      },
    },
  },
});
