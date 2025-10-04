import { BaseAdapter } from "./base-adapter.js";
import type { UniversalRedactionConfig } from "../base/types.js";

interface ClaudeMessage {
  role: "user" | "assistant";
  content:
    | string
    | Array<{ type: string; text?: string; [key: string]: unknown }>;
}

interface MessageOptions {
  model: string;
  messages: ClaudeMessage[];
  system?: string;
  max_tokens: number;
  temperature?: number;
  tools?: unknown[];
  tool_choice?: unknown;
  [key: string]: unknown;
}

interface CompletionOptions {
  model: string;
  prompt: string;
  max_tokens_to_sample: number;
  temperature?: number;
  [key: string]: unknown;
}

interface ContentBlock {
  type: string;
  text?: string;
  tool_use?: {
    id: string;
    name: string;
    input: Record<string, unknown>;
  };
  [key: string]: unknown;
}

export class AnthropicAdapter extends BaseAdapter<unknown, unknown> {
  readonly providerName = "anthropic";
  readonly version = "0.24.0";

  async transform(input: unknown): Promise<unknown> {
    const result = this.provider.redact(input);

    return result.content;
  }

  createClientWrapper(anthropic: unknown): {
    messages: {
      create: (options: MessageOptions) => Promise<unknown>;
      stream: (options: MessageOptions) => Promise<unknown>;
    };
    completions: { create: (options: CompletionOptions) => Promise<unknown> };
  } {
    return {
      messages: {
        create: async (options: MessageOptions) => {
          try {
            const client = anthropic as {
              messages: { create: (options: unknown) => Promise<unknown> };
            };

            const cleanOptions = {
              ...options,
              messages: options.messages.map((msg) => ({
                ...msg,
                content: this.processContent(msg.content),
              })),
            };

            if (options.system) {
              cleanOptions.system = this.provider.redact(options.system)
                .content as string;
            }

            return client.messages.create(cleanOptions);
          } catch {
            throw new Error("Anthropic client not available");
          }
        },

        stream: async (options: MessageOptions) => {
          try {
            const client = anthropic as {
              messages: { create: (options: unknown) => Promise<unknown> };
            };

            const cleanOptions = {
              ...options,
              messages: options.messages.map((msg) => ({
                ...msg,
                content: this.processContent(msg.content),
              })),
              stream: true,
            };

            if (options.system) {
              cleanOptions.system = this.provider.redact(options.system)
                .content as string;
            }

            return client.messages.create(cleanOptions);
          } catch {
            throw new Error("Anthropic client not available");
          }
        },
      },

      completions: {
        create: async (options: CompletionOptions) => {
          try {
            const client = anthropic as {
              completions: { create: (options: unknown) => Promise<unknown> };
            };

            const cleanOptions = {
              ...options,
              prompt: this.provider.redact(options.prompt).content as string,
            };

            return client.completions.create(cleanOptions);
          } catch {
            throw new Error("Anthropic client not available");
          }
        },
      },
    };
  }

  private processContent(
    content:
      | string
      | Array<{ type: string; text?: string; [key: string]: unknown }>
  ): string | ContentBlock[] {
    if (typeof content === "string") {
      return this.provider.redact(content).content as string;
    }

    if (Array.isArray(content)) {
      return content.map((block) => {
        const cleanBlock = { ...block };

        if (block.text) {
          cleanBlock.text = this.provider.redact(block.text).content as string;
        }

        if (
          block["tool_use"] &&
          typeof block["tool_use"] === "object" &&
          block["tool_use"] !== null
        ) {
          const toolUse = block["tool_use"] as {
            id: string;
            name: string;
            input?: Record<string, unknown>;
          };
          if (toolUse.input) {
            const cleanInput: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(toolUse.input)) {
              if (typeof value === "string") {
                cleanInput[key] = this.provider.redact(value).content;
              } else {
                cleanInput[key] = value;
              }
            }
            cleanBlock["tool_use"] = {
              ...toolUse,
              input: cleanInput,
            };
          }
        }

        return cleanBlock;
      });
    }

    return content;
  }

  createToolCallProcessor(): {
    processToolCall: (toolCall: {
      name: string;
      input: Record<string, unknown>;
    }) => { name: string; input: Record<string, unknown> };
  } {
    return {
      processToolCall: (toolCall: {
        name: string;
        input: Record<string, unknown>;
      }) => {
        const cleanInput: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(toolCall.input)) {
          if (typeof value === "string") {
            cleanInput[key] = this.provider.redact(value).content;
          } else if (typeof value === "object" && value !== null) {
            cleanInput[key] = JSON.parse(
              this.provider.redact(JSON.stringify(value)).content as string
            );
          } else {
            cleanInput[key] = value;
          }
        }

        return {
          ...toolCall,
          input: cleanInput,
        };
      },
    };
  }

  createMessageProcessor(): {
    processMessage: (message: ClaudeMessage) => ClaudeMessage;
    processMessages: (messages: ClaudeMessage[]) => ClaudeMessage[];
    processSystemPrompt: (system: string) => string;
  } {
    return {
      processMessage: (message: ClaudeMessage): ClaudeMessage => ({
        ...message,
        content: this.processContent(message.content),
      }),

      processMessages: (messages: ClaudeMessage[]): ClaudeMessage[] =>
        messages.map((msg) => ({
          ...msg,
          content: this.processContent(msg.content),
        })),

      processSystemPrompt: (system: string): string =>
        this.provider.redact(system).content as string,
    };
  }

  createConversationCleaner(): {
    cleanConversation: (
      messages: ClaudeMessage[],
      systemPrompt?: string
    ) => { messages: ClaudeMessage[]; system?: string };
  } {
    return {
      cleanConversation: (messages: ClaudeMessage[], systemPrompt?: string) => {
        const cleanMessages = messages.map((msg) => ({
          ...msg,
          content: this.processContent(msg.content),
        }));

        const cleanSystem = systemPrompt
          ? (this.provider.redact(systemPrompt).content as string)
          : undefined;

        return {
          messages: cleanMessages,
          system: cleanSystem,
        };
      },
    };
  }

  createStreamingWrapper(): {
    createStreamingMessage: (
      options: MessageOptions
    ) => Promise<MessageOptions>;
  } {
    return {
      createStreamingMessage: async (options: MessageOptions) => {
        const cleanOptions = {
          ...options,
          messages: options.messages.map((msg) => ({
            ...msg,
            content: this.processContent(msg.content),
          })),
          stream: true,
        };

        if (options.system) {
          cleanOptions.system = this.provider.redact(options.system)
            .content as string;
        }

        return cleanOptions;
      },
    };
  }
}

export function createAnthropicAdapter(
  config?: UniversalRedactionConfig
): AnthropicAdapter {
  return new AnthropicAdapter(config);
}
