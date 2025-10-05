import { describe, it, expect } from "vitest";
import {
  createLlamaIndexAdapter,
  LlamaIndexAdapter,
} from "../../src/providers/adapters/llamaindex-adapter.js";
import type { PolicyName } from "../../src/types/index.js";

class MockNode {
  constructor(
    private text: string,
    private metadata: Record<string, unknown> = {},
    private nodeId = "test-node"
  ) {}

  getText(): string {
    return this.text;
  }

  getMetadata(): Record<string, unknown> {
    return this.metadata;
  }

  getNodeId(): string {
    return this.nodeId;
  }

  setContent(content: string): void {
    this.text = content;
  }

  clone(options?: {
    text?: string;
    metadata?: Record<string, unknown>;
  }): MockNode {
    return new MockNode(
      options?.text ?? this.text,
      options?.metadata ?? this.metadata,
      this.nodeId
    );
  }
}

describe("LlamaIndex Adapter", () => {
  describe("createLlamaIndexAdapter", () => {
    it("should create a new LlamaIndexAdapter instance", () => {
      const adapter = createLlamaIndexAdapter();
      expect(adapter).toBeInstanceOf(LlamaIndexAdapter);
      expect(adapter.providerName).toBe("llamaindex");
      expect(adapter.version).toBe("5.0.0");
    });

    it("should accept configuration options", () => {
      const config = {
        policies: [
          "EMAIL_ADDRESS",
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ] as PolicyName[],
      };
      const adapter = createLlamaIndexAdapter(config);
      expect(adapter.getConfig().policies).toEqual([
        "EMAIL_ADDRESS",
        "PHONE_NUMBER_US",
        "PHONE_NUMBER_UK",
        "PHONE_NUMBER_CANADIAN",
        "PHONE_NUMBER_INTERNATIONAL",
      ]);
    });
  });

  describe("transform method", () => {
    it("should transform string input", async () => {
      const adapter = createLlamaIndexAdapter({
        policies: [
          "EMAIL_ADDRESS",
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ] as PolicyName[],
      });

      const result = await adapter.transform(
        "Contact john@example.com or call 555-123-4567"
      );
      expect(result).toBe("Contact [EMAIL] or call [PHONE]");
    });

    it("should transform node array input", async () => {
      const adapter = createLlamaIndexAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const nodes = [
        new MockNode("Email me at john@example.com", { source: "test" }),
        new MockNode("Another email: jane@example.org", { source: "test2" }),
      ];

      const result = (await adapter.transform(nodes)) as MockNode[];

      expect(result).toHaveLength(2);
      expect(result[0]?.getText()).toBe("Email me at [EMAIL]");
      expect(result[0]?.getMetadata()["source"]).toBe("test");
      expect(result[1]?.getText()).toBe("Another email: [EMAIL]");
    });

    it("should handle empty node arrays", async () => {
      const adapter = createLlamaIndexAdapter();
      const result = await adapter.transform([]);
      expect(result).toEqual([]);
    });

    it("should throw error for invalid input types", async () => {
      const adapter = createLlamaIndexAdapter();
      await expect(adapter.transform(123 as unknown as string)).rejects.toThrow(
        "Invalid input type"
      );
    });

    it("should throw error for missing nodes in array", async () => {
      const adapter = createLlamaIndexAdapter();
      const nodesWithNull = [
        new MockNode("test"),
        null,
      ] as unknown as MockNode[];

      await expect(adapter.transform(nodesWithNull)).rejects.toThrow(
        "Missing node at index 1"
      );
    });

    it("should preserve node metadata", async () => {
      const adapter = createLlamaIndexAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
        metadataKeys: ["author"],
      });

      const nodes = [
        new MockNode("Hello world", {
          author: "john@example.com",
          other: "value",
        }),
      ];

      const result = (await adapter.transform(nodes)) as MockNode[];
      expect(result[0]?.getMetadata()["other"]).toBe("value");
    });
  });

  describe("createNodeTransformer", () => {
    it("should create a node transformer object", () => {
      const adapter = createLlamaIndexAdapter();
      const transformer = adapter.createNodeTransformer();

      expect(transformer).toHaveProperty("transform");
      expect(typeof transformer.transform).toBe("function");
    });

    it("should transform nodes using the transformer", async () => {
      const adapter = createLlamaIndexAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const transformer = adapter.createNodeTransformer();
      const nodes = [new MockNode("Contact test@example.com")];

      const result = await transformer.transform(nodes);
      expect(result[0]?.getText()).toBe("Contact [EMAIL]");
    });
  });

  describe("createTransformComponent", () => {
    it("should create a transform component object", () => {
      const adapter = createLlamaIndexAdapter();
      const component = adapter.createTransformComponent();

      expect(component).toHaveProperty("transformNodes");
      expect(typeof component.transformNodes).toBe("function");
    });

    it("should transform nodes using the component", async () => {
      const adapter = createLlamaIndexAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const component = adapter.createTransformComponent();
      const nodes = [new MockNode("Email: test@example.com")];

      const result = await component.transformNodes(nodes);
      expect(result[0]?.getText()).toBe("Email: [EMAIL]");
    });
  });

  describe("createTransformation", () => {
    it("should create a transformation interface", async () => {
      const adapter = createLlamaIndexAdapter();
      const transformation = await adapter.createTransformation();

      expect(transformation).toHaveProperty("transform");
      expect(typeof transformation.transform).toBe("function");
    });

    it("should transform nodes using the transformation", async () => {
      const adapter = createLlamaIndexAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const transformation = await adapter.createTransformation();
      const nodes = [new MockNode("Call 555-123-4567")];

      const result = await transformation.transform(nodes);
      expect(result[0]?.getText()).toBe("Call [PHONE]");
    });
  });

  describe("createPreprocessor", () => {
    it("should create a preprocessor class", async () => {
      const adapter = createLlamaIndexAdapter();

      try {
        const PreprocessorClass = await adapter.createPreprocessor();
        expect(PreprocessorClass).toBeTruthy();
      } catch (error) {
        expect((error as Error).message).toContain("llamaindex not available");
      }
    });
  });

  describe("configuration updates", () => {
    it("should allow config updates", () => {
      const adapter = createLlamaIndexAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      adapter.updateConfig({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      expect(adapter.getConfig().policies).toEqual([
        "PHONE_NUMBER_US",
        "PHONE_NUMBER_UK",
        "PHONE_NUMBER_CANADIAN",
        "PHONE_NUMBER_INTERNATIONAL",
      ]);
    });
  });

  describe("node operations", () => {
    it("should preserve node IDs after transformation", async () => {
      const adapter = createLlamaIndexAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });
      const nodes = [new MockNode("test@example.com", {}, "unique-id")];

      const result = (await adapter.transform(nodes)) as MockNode[];
      expect(result[0]?.getNodeId()).toBe("unique-id");
    });

    it("should handle nodes with complex metadata", async () => {
      const adapter = createLlamaIndexAdapter();
      const complexMeta = {
        nested: { deep: { value: "test" } },
        array: [1, 2, 3],
        date: new Date().toISOString(),
      };

      const nodes = [new MockNode("Hello world", complexMeta)];
      const result = (await adapter.transform(nodes)) as MockNode[];

      expect(result[0]?.getMetadata()).toEqual(complexMeta);
    });
  });
});
