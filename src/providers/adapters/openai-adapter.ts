import { BaseAdapter } from "./base-adapter.js";
import type { UniversalRedactionConfig } from "../base/types.js";

interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool" | "function";
  content: string | null;
  name?: string;
  tool_calls?: unknown[];
  tool_call_id?: string;
}

interface ChatCompletionOptions {
  model: string;
  messages: ChatMessage[];
  functions?: unknown[];
  tools?: unknown[];
  temperature?: number;
  max_tokens?: number;
  [key: string]: unknown;
}

interface CompletionOptions {
  model: string;
  prompt: string | string[];
  max_tokens?: number;
  temperature?: number;
  [key: string]: unknown;
}

interface EmbeddingOptions {
  model: string;
  input: string | string[];
  [key: string]: unknown;
}

interface AssistantMessage {
  role: "user" | "assistant";
  content: string;
  file_ids?: string[];
  metadata?: Record<string, unknown>;
}

export class OpenAIAdapter extends BaseAdapter<unknown, unknown> {
  readonly providerName = "openai";
  readonly version = "4.0.0";

  async transform(input: unknown): Promise<unknown> {
    const result = this.provider.redact(input);

    return result.content;
  }

  createClientWrapper(openai: unknown): {
    chat: {
      completions: {
        create: (options: ChatCompletionOptions) => Promise<unknown>;
      };
    };
    completions: { create: (options: CompletionOptions) => Promise<unknown> };
    embeddings: { create: (options: EmbeddingOptions) => Promise<unknown> };
  } {
    return {
      chat: {
        completions: {
          create: async (options: ChatCompletionOptions) => {
            try {
              const client = openai as {
                chat: {
                  completions: {
                    create: (options: unknown) => Promise<unknown>;
                  };
                };
              };

              const cleanOptions = {
                ...options,
                messages: options.messages.map((msg) => ({
                  ...msg,
                  content: msg.content
                    ? (this.provider.redact(msg.content).content as string)
                    : null,
                })),
              };

              return client.chat.completions.create(cleanOptions);
            } catch {
              throw new Error("OpenAI client not available");
            }
          },
        },
      },

      completions: {
        create: async (options: CompletionOptions) => {
          try {
            const client = openai as {
              completions: { create: (options: unknown) => Promise<unknown> };
            };

            const cleanOptions = { ...options };

            if (typeof options.prompt === "string") {
              cleanOptions.prompt = this.provider.redact(options.prompt)
                .content as string;
            } else if (Array.isArray(options.prompt)) {
              cleanOptions.prompt = options.prompt.map(
                (p) => this.provider.redact(p).content as string
              );
            }

            return client.completions.create(cleanOptions);
          } catch {
            throw new Error("OpenAI client not available");
          }
        },
      },

      embeddings: {
        create: async (options: EmbeddingOptions) => {
          try {
            const client = openai as {
              embeddings: { create: (options: unknown) => Promise<unknown> };
            };

            const cleanOptions = { ...options };

            if (typeof options.input === "string") {
              cleanOptions.input = this.provider.redact(options.input)
                .content as string;
            } else if (Array.isArray(options.input)) {
              cleanOptions.input = options.input.map(
                (text) => this.provider.redact(text).content as string
              );
            }

            return client.embeddings.create(cleanOptions);
          } catch {
            throw new Error("OpenAI client not available");
          }
        },
      },
    };
  }

  createAssistantWrapper(openai: unknown): {
    beta: {
      threads: {
        messages: {
          create: (
            threadId: string,
            message: AssistantMessage
          ) => Promise<unknown>;
        };
        runs: {
          create: (
            threadId: string,
            options: {
              assistant_id: string;
              instructions?: string;
              [key: string]: unknown;
            }
          ) => Promise<unknown>;
        };
      };
    };
  } {
    return {
      beta: {
        threads: {
          messages: {
            create: async (threadId: string, message: AssistantMessage) => {
              try {
                const client = openai as {
                  beta: {
                    threads: {
                      messages: {
                        create: (
                          threadId: string,
                          message: unknown
                        ) => Promise<unknown>;
                      };
                    };
                  };
                };

                const cleanMessage = {
                  ...message,
                  content: this.provider.redact(message.content)
                    .content as string,
                };

                if (message.metadata) {
                  const cleanMetadata: Record<string, unknown> = {};
                  for (const [key, value] of Object.entries(message.metadata)) {
                    if (typeof value === "string") {
                      cleanMetadata[key] = this.provider.redact(value).content;
                    } else {
                      cleanMetadata[key] = value;
                    }
                  }
                  cleanMessage.metadata = cleanMetadata;
                }

                return client.beta.threads.messages.create(
                  threadId,
                  cleanMessage
                );
              } catch {
                throw new Error("OpenAI client not available");
              }
            },
          },

          runs: {
            create: async (
              threadId: string,
              options: {
                assistant_id: string;
                instructions?: string;
                [key: string]: unknown;
              }
            ) => {
              try {
                const client = openai as {
                  beta: {
                    threads: {
                      runs: {
                        create: (
                          threadId: string,
                          options: unknown
                        ) => Promise<unknown>;
                      };
                    };
                  };
                };

                const cleanOptions = { ...options };

                if (options.instructions) {
                  cleanOptions.instructions = this.provider.redact(
                    options.instructions
                  ).content as string;
                }

                return client.beta.threads.runs.create(threadId, cleanOptions);
              } catch {
                throw new Error("OpenAI client not available");
              }
            },
          },
        },
      },
    };
  }

  createFunctionCallCleaner(): {
    cleanFunctionCall: (functionCall: { name: string; arguments: string }) => {
      name: string;
      arguments: string;
    };
    cleanToolCall: (toolCall: {
      function: { name: string; arguments: string };
      [key: string]: unknown;
    }) => {
      function: { name: string; arguments: string };
      [key: string]: unknown;
    };
  } {
    return {
      cleanFunctionCall: (functionCall: {
        name: string;
        arguments: string;
      }) => ({
        ...functionCall,
        arguments: this.provider.redact(functionCall.arguments)
          .content as string,
      }),

      cleanToolCall: (toolCall: {
        function: { name: string; arguments: string };
        [key: string]: unknown;
      }) => ({
        ...toolCall,
        function: {
          ...toolCall.function,
          arguments: this.provider.redact(toolCall.function.arguments)
            .content as string,
        },
      }),
    };
  }

  createMessageProcessor(): {
    processMessages: (messages: ChatMessage[]) => ChatMessage[];
    processSystemMessage: (content: string) => string;
    processUserMessage: (content: string) => string;
  } {
    return {
      processMessages: (messages: ChatMessage[]) =>
        messages.map((msg) => ({
          ...msg,
          content: msg.content
            ? (this.provider.redact(msg.content).content as string)
            : null,
        })),

      processSystemMessage: (content: string) =>
        this.provider.redact(content).content as string,

      processUserMessage: (content: string) =>
        this.provider.redact(content).content as string,
    };
  }
}

export function createOpenAIAdapter(
  config?: UniversalRedactionConfig
): OpenAIAdapter {
  return new OpenAIAdapter(config);
}
