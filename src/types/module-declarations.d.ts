declare module "llamaindex" {
  export abstract class BaseNodePostprocessor {
    abstract postprocessNodes(nodes: unknown[]): Promise<unknown[]>;
  }
}

declare module "ai" {
  export function streamText(options: unknown): Promise<unknown>;
  export function streamObject(options: unknown): Promise<unknown>;
  export function generateText(options: unknown): Promise<unknown>;
}

declare module "openai" {
  export default class OpenAI {
    chat: {
      completions: {
        create(options: unknown): Promise<unknown>;
      };
    };
    completions: {
      create(options: unknown): Promise<unknown>;
    };
    embeddings: {
      create(options: unknown): Promise<unknown>;
    };
    beta: {
      threads: {
        messages: {
          create(threadId: string, message: unknown): Promise<unknown>;
        };
        runs: {
          create(threadId: string, options: unknown): Promise<unknown>;
        };
      };
    };
  }
}

declare module "@anthropic-ai/sdk" {
  export default class Anthropic {
    messages: {
      create(options: unknown): Promise<unknown>;
    };
    completions: {
      create(options: unknown): Promise<unknown>;
    };
  }
}
