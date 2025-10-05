import { describe, it, expect } from "vitest";
import {
  createVercelAIAdapter,
  VercelAIAdapter,
} from "../../src/providers/adapters/vercel-ai-adapter.js";
import type { PolicyName } from "../../src/types/index.js";

describe("Vercel AI Adapter", () => {
  describe("createVercelAIAdapter", () => {
    it("should create a new VercelAIAdapter instance", () => {
      const adapter = createVercelAIAdapter();
      expect(adapter).toBeInstanceOf(VercelAIAdapter);
      expect(adapter.providerName).toBe("vercel-ai");
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
      const adapter = createVercelAIAdapter(config);
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
      const adapter = createVercelAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const result = await adapter.transform("Contact john@example.com");
      expect(result).toBe("Contact [EMAIL]");
    });

    it("should handle object input", async () => {
      const adapter = createVercelAIAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const input = { message: "Call me at 555-123-4567" };
      const result = await adapter.transform(JSON.stringify(input));
      expect(result).toContain("[PHONE]");
    });
  });

  describe("createStreamingWrapper", () => {
    it("should create streaming wrapper with required methods", () => {
      const adapter = createVercelAIAdapter();
      const wrapper = adapter.createStreamingWrapper();

      expect(wrapper).toHaveProperty("streamText");
      expect(wrapper).toHaveProperty("streamObject");
      expect(wrapper).toHaveProperty("generateText");
      expect(typeof wrapper.streamText).toBe("function");
      expect(typeof wrapper.streamObject).toBe("function");
      expect(typeof wrapper.generateText).toBe("function");
    });

    it("should handle streamText options", async () => {
      const adapter = createVercelAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createStreamingWrapper();

      try {
        await wrapper.streamText({
          model: "mock-model",
          prompt: "Email me at john@example.com",
          temperature: 0.7,
        });
      } catch (error) {
        expect((error as Error).message).toContain(
          "Vercel AI SDK not available"
        );
      }
    });

    it("should handle messages array in options", async () => {
      const adapter = createVercelAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createStreamingWrapper();

      try {
        await wrapper.streamText({
          model: "mock-model",
          prompt: "Test prompt",
          messages: [
            { role: "user", content: "My email is test@example.com" },
            { role: "assistant", content: "I understand" },
          ],
        });
      } catch (error) {
        expect((error as Error).message).toContain(
          "Vercel AI SDK not available"
        );
      }
    });

    it("should handle system message in options", async () => {
      const adapter = createVercelAIAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const wrapper = adapter.createStreamingWrapper();

      try {
        await wrapper.generateText({
          model: "mock-model",
          prompt: "Hello",
          system:
            "You are helpful. Never share phone numbers like 555-123-4567",
        });
      } catch (error) {
        expect((error as Error).message).toContain(
          "Vercel AI SDK not available"
        );
      }
    });
  });

  describe("createToolWrapper", () => {
    it("should create tool wrapper", () => {
      const adapter = createVercelAIAdapter();

      const tools = {
        sendEmail: {
          description: "Send an email",
          parameters: { email: "string", message: "string" },
          execute: async (params: unknown) => params,
        },
      };

      const wrappedTools = adapter.createToolWrapper(tools);

      expect(wrappedTools).toHaveProperty("sendEmail");
      expect(typeof wrappedTools["sendEmail"]?.execute).toBe("function");
    });

    it("should redact tool parameters", async () => {
      const adapter = createVercelAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const tools = {
        sendEmail: {
          description: "Send an email",
          parameters: { email: "string", message: "string" },
          execute: async (params: unknown) => {
            const typedParams = params as { email: string; message: string };

            return {
              sent: true,
              to: typedParams.email,
            };
          },
        },
      };

      const wrappedTools = adapter.createToolWrapper(tools);

      const result = await wrappedTools["sendEmail"]?.execute({
        email: "user@example.com",
        message: "Hello",
      });

      expect((result as any).to).toBe("[EMAIL]");
    });
  });

  describe("createMessageCleaner", () => {
    it("should create message cleaner with required methods", () => {
      const adapter = createVercelAIAdapter();
      const cleaner = adapter.createMessageCleaner();

      expect(cleaner).toHaveProperty("cleanMessage");
      expect(cleaner).toHaveProperty("cleanMessages");
      expect(typeof cleaner.cleanMessage).toBe("function");
      expect(typeof cleaner.cleanMessages).toBe("function");
    });

    it("should clean single message", () => {
      const adapter = createVercelAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const cleaner = adapter.createMessageCleaner();
      const message = { role: "user", content: "My email is test@example.com" };

      const cleanMessage = cleaner.cleanMessage(message);
      expect(cleanMessage.content).toBe("My email is [EMAIL]");
      expect(cleanMessage.role).toBe("user");
    });

    it("should clean messages array", () => {
      const adapter = createVercelAIAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const cleaner = adapter.createMessageCleaner();
      const messages = [
        { role: "user", content: "Call me at 555-123-4567" },
        { role: "assistant", content: "I'll call you soon" },
      ];

      const cleanMessages = cleaner.cleanMessages(messages);
      expect(cleanMessages[0]?.content).toBe("Call me at [PHONE]");
      expect(cleanMessages[1]?.content).toBe("I'll call you soon");
    });
  });

  describe("configuration updates", () => {
    it("should allow config updates", () => {
      const adapter = createVercelAIAdapter({
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
    it("should handle invalid tool parameters", async () => {
      const adapter = createVercelAIAdapter();

      const tools = {
        broken: {
          parameters: {},
          execute: async () => {
            throw new Error("Tool error");
          },
        },
      };

      const wrappedTools = adapter.createToolWrapper(tools);

      await expect(wrappedTools["broken"]?.execute({})).rejects.toThrow(
        "Tool error"
      );
    });
  });
});
