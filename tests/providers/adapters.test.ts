import { describe, it, expect } from "vitest";
import { Document } from "@langchain/core/documents";
import {
  createLangChainAdapter,
  createLlamaIndexAdapter,
} from "../../src/providers/index.js";

describe("Provider Adapters", () => {
  describe("LangChain Adapter", () => {
    it("should transform document content", async () => {
      const adapter = createLangChainAdapter({
        policies: ["EMAIL_ADDRESS"],
      });

      const doc = new Document({
        pageContent: "Contact me at test@example.com",
        metadata: { source: "test" },
      });

      const transformed = await adapter.transform([doc]) as Document[];
      expect(transformed[0]?.pageContent).toBe("Contact me at [EMAIL]");
      expect(transformed[0]?.metadata["source"]).toBe("test");
    });

    it("should redact metadata fields when specified", async () => {
      const adapter = createLangChainAdapter({
        policies: ["EMAIL_ADDRESS"],
        metadataKeys: ["author", "contact"],
      });

      const doc = new Document({
        pageContent: "Hello world",
        metadata: {
          author: "john@example.com",
          contact: "jane@example.com",
          other: "not-redacted@example.com",
        },
      });

      const [transformed] = await adapter.transform([doc]) as Document[];
      expect(transformed?.metadata["author"]).toBe("[EMAIL]");
      expect(transformed?.metadata["contact"]).toBe("[EMAIL]");
      expect(transformed?.metadata["other"]).toBe("not-redacted@example.com");
    });

    it("should handle string input", async () => {
      const adapter = createLangChainAdapter({
        policies: ["EMAIL_ADDRESS"],
      });

      const result = await adapter.transform("Contact at test@example.com");
      expect(result).toBe("Contact at [EMAIL]");
    });
  });

  describe("LlamaIndex Adapter", () => {
    class MockNode {
      constructor(private text: string, private metadata: Record<string, unknown> = {}) {}
      getText(): string { return this.text; }
      getMetadata(): Record<string, unknown> { return this.metadata; }
      getNodeId(): string { return "test-node"; }
      setContent(content: string): void { this.text = content; }
      clone(options?: { text?: string; metadata?: Record<string, unknown> }): MockNode {
        return new MockNode(
          options?.text ?? this.text,
          options?.metadata ?? this.metadata
        );
      }
    }

    it("should transform node content", async () => {
      const adapter = createLlamaIndexAdapter({
        policies: ["EMAIL_ADDRESS"],
      });

      const node = new MockNode("Contact me at test@example.com", { source: "test" });
      const transformed = await adapter.transform([node]) as unknown as MockNode[];

      expect(transformed[0]?.getText()).toBe("Contact me at [EMAIL]");
      expect(transformed[0]?.getMetadata()["source"]).toBe("test");
    });

    it("should handle string input", async () => {
      const adapter = createLlamaIndexAdapter({
        policies: ["EMAIL_ADDRESS"],
      });

      const result = await adapter.transform("Contact at test@example.com");
      expect(result).toBe("Contact at [EMAIL]");
    });
  });
});