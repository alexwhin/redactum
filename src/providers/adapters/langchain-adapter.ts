import { BaseAdapter } from "./base-adapter.js";
import type { UniversalRedactionConfig } from "../base/types.js";

interface Document {
  pageContent: string;
  metadata: Record<string, unknown>;
  id?: string;
}

export class LangChainAdapter extends BaseAdapter<
  Document[] | string,
  Document[] | string
> {
  readonly providerName = "langchain";
  readonly version = "3.0.0";

  async transform(input: Document[] | string): Promise<Document[] | string> {
    if (typeof input === "string") {
      const result = this.provider.redact(input);

      return result.content as string;
    }

    if (Array.isArray(input)) {
      const results = await this.provider.redactBatch(input);

      return results.map((result, index) => {
        const doc = input[index];

        return {
          pageContent: result.content as string,
          metadata: result.providerMetadata || (doc ? doc.metadata : {}),
          ...(doc?.id && { id: doc.id }),
        };
      });
    }

    throw new Error(`Invalid input type for ${this.providerName} adapter`);
  }

  createDocumentTransformer(): (documents: Document[]) => Promise<Document[]> {
    return async (documents: Document[]): Promise<Document[]> =>
      this.transform(documents) as Promise<Document[]>;
  }

  async createRunnable(): Promise<unknown> {
    try {
      const { RunnableLambda } = await import("@langchain/core/runnables");

      return new RunnableLambda({
        func: async (input: string) => {
          const result = this.provider.redact(input);

          return result.content;
        },
      });
    } catch {
      throw new Error(
        "@langchain/core runnables not available. Install @langchain/core"
      );
    }
  }

  async createRunnableWithMetadata(): Promise<unknown> {
    try {
      const { RunnableLambda } = await import("@langchain/core/runnables");

      return new RunnableLambda({
        func: async (input: string) => this.provider.redact(input),
      });
    } catch {
      throw new Error(
        "@langchain/core runnables not available. Install @langchain/core"
      );
    }
  }

  async createDocumentTransform(): Promise<unknown> {
    try {
      const { BaseDocumentTransformer } = await import(
        "@langchain/core/documents"
      );

      return class PIIRedactionTransformer extends BaseDocumentTransformer {
        constructor(private adapter: LangChainAdapter) {
          super();
        }

        async transformDocuments(documents: Document[]): Promise<Document[]> {
          return this.adapter.transform(documents) as Promise<Document[]>;
        }

        static from(adapter: LangChainAdapter): PIIRedactionTransformer {
          return new PIIRedactionTransformer(adapter);
        }
      }.from(this);
    } catch {
      throw new Error(
        "@langchain/core documents not available. Install @langchain/core"
      );
    }
  }
}

export function createLangChainAdapter(
  config?: UniversalRedactionConfig
): LangChainAdapter {
  return new LangChainAdapter(config);
}
