import { BaseAdapter } from "./base-adapter.js";
import type { UniversalRedactionConfig } from "../base/types.js";

interface BaseNode {
  getText(): string;
  clone(options?: {
    text?: string;
    metadata?: Record<string, unknown>;
  }): BaseNode;
  getMetadata(): Record<string, unknown>;
  getNodeId(): string;
  setContent(content: string): void;
}

interface NodeTransformation {
  transform(nodes: BaseNode[]): Promise<BaseNode[]>;
}

export class LlamaIndexAdapter extends BaseAdapter<
  BaseNode[] | string,
  BaseNode[] | string
> {
  readonly providerName = "llamaindex";
  readonly version = "5.0.0";

  async transform(input: BaseNode[] | string): Promise<BaseNode[] | string> {
    if (typeof input === "string") {
      const result = this.provider.redact(input);

      return result.content as string;
    }

    if (Array.isArray(input)) {
      const results = await this.provider.redactBatch(input);

      return results.map((result, index) => {
        const node = input[index];
        if (!node) {
          throw new Error(`Missing node at index ${index}`);
        }

        return node.clone({
          text: result.content as string,
          metadata: result.providerMetadata || node.getMetadata(),
        });
      });
    }

    throw new Error(`Invalid input type for ${this.providerName} adapter`);
  }

  createNodeTransformer(): {
    transform: (nodes: BaseNode[]) => Promise<BaseNode[]>;
  } {
    return {
      transform: async (nodes: BaseNode[]): Promise<BaseNode[]> =>
        this.transform(nodes) as Promise<BaseNode[]>,
    };
  }

  createTransformComponent(): {
    transformNodes: (nodes: BaseNode[]) => Promise<BaseNode[]>;
  } {
    return {
      transformNodes: async (nodes: BaseNode[]): Promise<BaseNode[]> =>
        this.transform(nodes) as Promise<BaseNode[]>,
    };
  }

  async createTransformation(): Promise<NodeTransformation> {
    return {
      transform: async (nodes: BaseNode[]): Promise<BaseNode[]> =>
        this.transform(nodes) as Promise<BaseNode[]>,
    };
  }

  async createPreprocessor(): Promise<unknown> {
    try {
      const { BaseNodePostprocessor } = await import("llamaindex");

      return class PIIRedactionPostprocessor extends BaseNodePostprocessor {
        constructor(private adapter: LlamaIndexAdapter) {
          super();
        }

        async postprocessNodes(nodes: BaseNode[]): Promise<BaseNode[]> {
          return this.adapter.transform(nodes) as Promise<BaseNode[]>;
        }

        static from(adapter: LlamaIndexAdapter): PIIRedactionPostprocessor {
          return new PIIRedactionPostprocessor(adapter);
        }
      }.from(this);
    } catch {
      throw new Error("llamaindex not available. Install llamaindex");
    }
  }
}

export function createLlamaIndexAdapter(
  config?: UniversalRedactionConfig
): LlamaIndexAdapter {
  return new LlamaIndexAdapter(config);
}
