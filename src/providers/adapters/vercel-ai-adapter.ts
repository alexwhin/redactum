import { BaseAdapter } from "./base-adapter.js";
import type { UniversalRedactionConfig } from "../base/types.js";

interface StreamTextOptions {
  model: unknown;
  prompt: string;
  messages?: Array<{ role: string; content: string }>;
  system?: string;
  maxTokens?: number;
  temperature?: number;
  [key: string]: unknown;
}

interface StreamObjectOptions {
  model: unknown;
  prompt: string;
  schema: unknown;
  system?: string;
  [key: string]: unknown;
}

interface GenerateTextOptions {
  model: unknown;
  prompt?: string;
  messages?: Array<{ role: string; content: string }>;
  system?: string;
  tools?: Record<string, unknown>;
  [key: string]: unknown;
}

interface Tool {
  description?: string;
  parameters: unknown;
  execute: (params: unknown) => Promise<unknown> | unknown;
}

export class VercelAIAdapter extends BaseAdapter<unknown, unknown> {
  readonly providerName = "vercel-ai";
  readonly version = "3.0.0";

  async transform(input: unknown): Promise<unknown> {
    const result = this.provider.redact(input);

    return result.content;
  }

  createStreamingWrapper(): {
    streamText: (options: StreamTextOptions) => Promise<unknown>;
    streamObject: (options: StreamObjectOptions) => Promise<unknown>;
    generateText: (options: GenerateTextOptions) => Promise<unknown>;
  } {
    return {
      streamText: async (options: StreamTextOptions) => {
        try {
          const { streamText } = await import("ai");

          const cleanOptions = { ...options };

          if (options.prompt) {
            const result = this.provider.redact(options.prompt);
            cleanOptions.prompt = result.content as string;
          }

          if (options.messages) {
            cleanOptions.messages = options.messages.map((msg) => ({
              ...msg,
              content: this.provider.redact(msg.content).content as string,
            }));
          }

          if (options.system) {
            const result = this.provider.redact(options.system);
            cleanOptions.system = result.content as string;
          }

          return await streamText(cleanOptions);
        } catch (error) {
          if ((error as Error).message?.includes("Cannot find module")) {
            throw new Error("Vercel AI SDK not available. Install ai package");
          }
          throw new Error("Vercel AI SDK not available. Install ai package");
        }
      },

      streamObject: async (options: StreamObjectOptions) => {
        try {
          const { streamObject } = await import("ai");

          const cleanOptions = { ...options };

          if (options.prompt) {
            const result = this.provider.redact(options.prompt);
            cleanOptions.prompt = result.content as string;
          }

          if (options.system) {
            const result = this.provider.redact(options.system);
            cleanOptions.system = result.content as string;
          }

          return await streamObject(cleanOptions);
        } catch (error) {
          if ((error as Error).message?.includes("Cannot find module")) {
            throw new Error("Vercel AI SDK not available. Install ai package");
          }
          throw new Error("Vercel AI SDK not available. Install ai package");
        }
      },

      generateText: async (options: GenerateTextOptions) => {
        try {
          const { generateText } = await import("ai");

          const cleanOptions = { ...options };

          if (options.prompt) {
            const result = this.provider.redact(options.prompt);
            cleanOptions.prompt = result.content as string;
          }

          if (options.messages) {
            cleanOptions.messages = options.messages.map((msg) => ({
              ...msg,
              content: this.provider.redact(msg.content).content as string,
            }));
          }

          if (options.system) {
            const result = this.provider.redact(options.system);
            cleanOptions.system = result.content as string;
          }

          return await generateText(cleanOptions);
        } catch (error) {
          if ((error as Error).message?.includes("Cannot find module")) {
            throw new Error("Vercel AI SDK not available. Install ai package");
          }
          throw new Error("Vercel AI SDK not available. Install ai package");
        }
      },
    };
  }

  createToolWrapper(tools: Record<string, Tool>): Record<string, Tool> {
    const wrappedTools: Record<string, Tool> = {};

    for (const [name, tool] of Object.entries(tools)) {
      wrappedTools[name] = {
        ...tool,
        execute: async (params: unknown) => {
          const cleanParams = this.provider.redact(JSON.stringify(params));
          const parsedParams = JSON.parse(cleanParams.content as string);

          return tool.execute(parsedParams);
        },
      };
    }

    return wrappedTools;
  }

  createMessageCleaner(): {
    cleanMessage: (message: { role: string; content: string }) => {
      role: string;
      content: string;
    };
    cleanMessages: (
      messages: Array<{ role: string; content: string }>
    ) => Array<{ role: string; content: string }>;
  } {
    return {
      cleanMessage: (message: { role: string; content: string }) => ({
        ...message,
        content: this.provider.redact(message.content).content as string,
      }),

      cleanMessages: (messages: Array<{ role: string; content: string }>) =>
        messages.map((msg) => ({
          ...msg,
          content: this.provider.redact(msg.content).content as string,
        })),
    };
  }
}

export function createVercelAIAdapter(
  config?: UniversalRedactionConfig
): VercelAIAdapter {
  return new VercelAIAdapter(config);
}
