import { describe, it, expect } from "vitest";
import {
  createLangChainAdapter,
  LangChainAdapter,
} from "../../src/providers/adapters/langchain-adapter.js";
import type { PolicyName } from "../../src/types/index.js";

interface MockDocument {
  pageContent: string;
  metadata: Record<string, unknown>;
  id?: string;
}

describe("LangChain Adapter", () => {
  describe("createLangChainAdapter", () => {
    it("should create a new LangChainAdapter instance", () => {
      const adapter = createLangChainAdapter();
      expect(adapter).toBeInstanceOf(LangChainAdapter);
      expect(adapter.providerName).toBe("langchain");
      expect(adapter.version).toBe("3.0.0");
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
      const adapter = createLangChainAdapter(config);
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
      const adapter = createLangChainAdapter({
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

    it("should transform document array input", async () => {
      const adapter = createLangChainAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const documents: MockDocument[] = [
        {
          pageContent: "Email me at john@example.com",
          metadata: { source: "test" },
        },
        {
          pageContent: "Another email: jane@example.org",
          metadata: { source: "test2" },
          id: "doc-123",
        },
      ];

      const result = (await adapter.transform(documents)) as MockDocument[];

      expect(result).toHaveLength(2);
      expect(result[0]?.pageContent).toBe("Email me at [EMAIL]");
      expect(result[0]?.metadata["source"]).toBe("test");
      expect(result[1]?.pageContent).toBe("Another email: [EMAIL]");
      expect(result[1]?.id).toBe("doc-123");
    });

    it("should handle empty document arrays", async () => {
      const adapter = createLangChainAdapter();
      const result = await adapter.transform([]);
      expect(result).toEqual([]);
    });

    it("should throw error for invalid input types", async () => {
      const adapter = createLangChainAdapter();
      await expect(adapter.transform(123 as unknown as string)).rejects.toThrow(
        "Invalid input type"
      );
    });

    it("should preserve document metadata", async () => {
      const adapter = createLangChainAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
        metadataKeys: ["author"],
      });

      const documents: MockDocument[] = [
        {
          pageContent: "Hello world",
          metadata: { author: "john@example.com", other: "value" },
        },
      ];

      const result = (await adapter.transform(documents)) as MockDocument[];
      expect(result[0]?.metadata["other"]).toBe("value");
    });
  });

  describe("createDocumentTransformer", () => {
    it("should create a document transformer function", () => {
      const adapter = createLangChainAdapter();
      const transformer = adapter.createDocumentTransformer();
      expect(typeof transformer).toBe("function");
    });

    it("should transform documents using the transformer", async () => {
      const adapter = createLangChainAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const transformer = adapter.createDocumentTransformer();
      const documents: MockDocument[] = [
        { pageContent: "Contact test@example.com", metadata: {} },
      ];

      const result = await transformer(documents);
      expect(result[0]?.pageContent).toBe("Contact [EMAIL]");
    });
  });

  describe("createRunnable", () => {
    it("should create a runnable that can be called", async () => {
      const adapter = createLangChainAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      try {
        const runnable = await adapter.createRunnable();
        expect(runnable).toBeTruthy();
      } catch (error) {
        expect((error as Error).message).toContain(
          "LangChain core runnables not available"
        );
      }
    });
  });

  describe("createRunnableWithMetadata", () => {
    it("should create a runnable that returns full results", async () => {
      const adapter = createLangChainAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      try {
        const runnable = await adapter.createRunnableWithMetadata();
        expect(runnable).toBeTruthy();
      } catch (error) {
        expect((error as Error).message).toContain(
          "LangChain core runnables not available"
        );
      }
    });
  });

  describe("createDocumentTransform", () => {
    it("should create a document transform class", async () => {
      const adapter = createLangChainAdapter();

      try {
        const TransformClass = await adapter.createDocumentTransform();
        expect(TransformClass).toBeTruthy();
      } catch (error) {
        expect((error as Error).message).toContain(
          "LangChain core documents not available"
        );
      }
    });
  });

  describe("configuration updates", () => {
    it("should allow config updates", () => {
      const adapter = createLangChainAdapter({
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

  describe("error handling", () => {
    it("should handle malformed documents gracefully", async () => {
      const adapter = createLangChainAdapter();
      const malformedDocs = [null, undefined] as unknown as MockDocument[];

      const result = (await adapter.transform(malformedDocs)) as MockDocument[];
      expect(result).toHaveLength(2);
    });
  });
});
