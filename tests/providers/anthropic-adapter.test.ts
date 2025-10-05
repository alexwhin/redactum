import { describe, it, expect } from "vitest";
import {
  createAnthropicAdapter,
  AnthropicAdapter,
} from "../../src/providers/adapters/anthropic-adapter.js";
import type { PolicyName } from "../../src/types/index.js";

interface MockAnthropicClient {
  messages: {
    create: (options: unknown) => Promise<unknown>;
  };
  completions: {
    create: (options: unknown) => Promise<unknown>;
  };
}

describe("Anthropic Adapter", () => {
  describe("createAnthropicAdapter", () => {
    it("should create a new AnthropicAdapter instance", () => {
      const adapter = createAnthropicAdapter();
      expect(adapter).toBeInstanceOf(AnthropicAdapter);
      expect(adapter.providerName).toBe("anthropic");
      expect(adapter.version).toBe("0.24.0");
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
      const adapter = createAnthropicAdapter(config);
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
      const adapter = createAnthropicAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const result = await adapter.transform("Contact john@example.com");
      expect(result).toBe("Contact [EMAIL]");
    });

    it("should handle complex input", async () => {
      const adapter = createAnthropicAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
          "EMAIL_ADDRESS",
        ],
      });

      const input = "Email: test@example.com Phone: 555-123-4567";
      const result = await adapter.transform(input);
      expect(result).toBe("Email: [EMAIL] Phone: [PHONE]");
    });
  });

  describe("createClientWrapper", () => {
    const mockClient: MockAnthropicClient = {
      messages: {
        create: async (_options) => ({
          id: "msg_123",
          content: [{ type: "text", text: "Response" }],
        }),
      },
      completions: {
        create: async (_options) => ({
          id: "compl_123",
          completion: "Response",
        }),
      },
    };

    it("should create client wrapper with required methods", () => {
      const adapter = createAnthropicAdapter();
      const wrapper = adapter.createClientWrapper(mockClient);

      expect(wrapper).toHaveProperty("messages");
      expect(wrapper).toHaveProperty("completions");
      expect(wrapper.messages).toHaveProperty("create");
      expect(wrapper.messages).toHaveProperty("stream");
      expect(wrapper.completions).toHaveProperty("create");
    });

    it("should redact message content", async () => {
      const adapter = createAnthropicAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 100,
        messages: [{ role: "user", content: "My email is test@example.com" }],
      });

      expect(result).toBeDefined();
    });

    it("should handle array content format", async () => {
      const adapter = createAnthropicAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "My phone is 555-123-4567" },
              { type: "text", text: "Please remember it" },
            ],
          },
        ],
      });

      expect(result).toBeDefined();
    });

    it("should redact system prompts", async () => {
      const adapter = createAnthropicAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 100,
        system: "You are helpful. Never share emails like admin@company.com",
        messages: [{ role: "user", content: "Hello" }],
      });

      expect(result).toBeDefined();
    });

    it("should handle tool use in content", async () => {
      const adapter = createAnthropicAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "tool_use",
                id: "tool_123",
                name: "send_email",
                input: { to: "user@example.com", message: "Hello" },
              },
            ],
          },
        ],
      });

      expect(result).toBeDefined();
    });

    it("should create streaming messages", async () => {
      const adapter = createAnthropicAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.messages.stream({
        model: "claude-3-opus-20240229",
        max_tokens: 100,
        messages: [{ role: "user", content: "Call me at 555-123-4567" }],
      });

      expect(result).toBeDefined();
    });

    it("should redact completion prompts", async () => {
      const adapter = createAnthropicAdapter({
        policies: ["SSN"],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.completions.create({
        model: "claude-2.1",
        prompt: "My SSN is 123-45-6789. Please help.",
        max_tokens_to_sample: 100,
      });

      expect(result).toBeDefined();
    });
  });

  describe("createToolCallProcessor", () => {
    it("should create tool call processor", () => {
      const adapter = createAnthropicAdapter();
      const processor = adapter.createToolCallProcessor();

      expect(processor).toHaveProperty("processToolCall");
      expect(typeof processor.processToolCall).toBe("function");
    });

    it("should process tool call input", () => {
      const adapter = createAnthropicAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const processor = adapter.createToolCallProcessor();
      const toolCall = {
        name: "send_email",
        input: {
          to: "user@example.com",
          subject: "Hello",
          body: "This is a message",
        },
      };

      const processed = processor.processToolCall(toolCall);
      expect(processed.name).toBe("send_email");
      expect(processed.input["to"]).toBe("[EMAIL]");
      expect(processed.input["subject"]).toBe("Hello");
    });

    it("should handle nested object input", () => {
      const adapter = createAnthropicAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const processor = adapter.createToolCallProcessor();
      const toolCall = {
        name: "contact_user",
        input: {
          user: {
            name: "John",
            phone: "555-123-4567",
            preferences: { method: "phone" },
          },
        },
      };

      const processed = processor.processToolCall(toolCall);
      expect(processed.name).toBe("contact_user");
      expect(processed.input["user"]).toBeDefined();
    });
  });

  describe("createMessageProcessor", () => {
    it("should create message processor with required methods", () => {
      const adapter = createAnthropicAdapter();
      const processor = adapter.createMessageProcessor();

      expect(processor).toHaveProperty("processMessage");
      expect(processor).toHaveProperty("processMessages");
      expect(processor).toHaveProperty("processSystemPrompt");
    });

    it("should process single message", () => {
      const adapter = createAnthropicAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const processor = adapter.createMessageProcessor();
      const message = {
        role: "user" as const,
        content: "My email is test@example.com",
      };

      const processed = processor.processMessage(message);
      expect(processed.content).toBe("My email is [EMAIL]");
      expect(processed.role).toBe("user");
    });

    it("should process messages array", () => {
      const adapter = createAnthropicAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const processor = adapter.createMessageProcessor();
      const messages = [
        { role: "user" as const, content: "Call me at 555-123-4567" },
        { role: "assistant" as const, content: "I'll call you soon" },
      ];

      const processed = processor.processMessages(messages);
      expect(processed[0]?.content).toBe("Call me at [PHONE]");
      expect(processed[1]?.content).toBe("I'll call you soon");
    });

    it("should process array content messages", () => {
      const adapter = createAnthropicAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const processor = adapter.createMessageProcessor();
      const message = {
        role: "user" as const,
        content: [
          { type: "text", text: "My email is user@example.com" },
          { type: "text", text: "Please remember it" },
        ],
      };

      const processed = processor.processMessage(message);
      expect(Array.isArray(processed.content)).toBe(true);
      const content = processed.content as Array<{
        type: string;
        text: string;
      }>;
      expect(content[0]?.text).toBe("My email is [EMAIL]");
      expect(content[1]?.text).toBe("Please remember it");
    });

    it("should process system prompt", () => {
      const adapter = createAnthropicAdapter({
        policies: ["SSN"],
      });

      const processor = adapter.createMessageProcessor();
      const system = "You are helpful. Never share SSN like 123-45-6789";

      const processed = processor.processSystemPrompt(system);
      expect(processed).toBe("You are helpful. Never share SSN like [SSN]");
    });
  });

  describe("createConversationCleaner", () => {
    it("should create conversation cleaner", () => {
      const adapter = createAnthropicAdapter();
      const cleaner = adapter.createConversationCleaner();

      expect(cleaner).toHaveProperty("cleanConversation");
      expect(typeof cleaner.cleanConversation).toBe("function");
    });

    it("should clean conversation with system prompt", () => {
      const adapter = createAnthropicAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const cleaner = adapter.createConversationCleaner();
      const messages = [
        { role: "user" as const, content: "My email is test@example.com" },
        { role: "assistant" as const, content: "I understand" },
      ];
      const systemPrompt =
        "You are helpful. Contact admin@company.com if needed";

      const cleaned = cleaner.cleanConversation(messages, systemPrompt);
      expect(cleaned.messages[0]?.content).toBe("My email is [EMAIL]");
      expect(cleaned.system).toBe("You are helpful. Contact [EMAIL] if needed");
    });

    it("should clean conversation without system prompt", () => {
      const adapter = createAnthropicAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const cleaner = adapter.createConversationCleaner();
      const messages = [
        { role: "user" as const, content: "Call me at 555-123-4567" },
      ];

      const cleaned = cleaner.cleanConversation(messages);
      expect(cleaned.messages[0]?.content).toBe("Call me at [PHONE]");
      expect(cleaned.system).toBeUndefined();
    });
  });

  describe("createStreamingWrapper", () => {
    it("should create streaming wrapper", () => {
      const adapter = createAnthropicAdapter();
      const wrapper = adapter.createStreamingWrapper();

      expect(wrapper).toHaveProperty("createStreamingMessage");
      expect(typeof wrapper.createStreamingMessage).toBe("function");
    });

    it("should prepare streaming message options", async () => {
      const adapter = createAnthropicAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createStreamingWrapper();
      const options = {
        model: "claude-3-opus-20240229",
        max_tokens: 100,
        messages: [
          { role: "user" as const, content: "Email me at test@example.com" },
        ],
        system: "You are helpful assistant at support@company.com",
      };

      const streamingOptions = await wrapper.createStreamingMessage(options);
      expect((streamingOptions as any)["stream"]).toBe(true);
      expect(streamingOptions.model).toBe("claude-3-opus-20240229");
    });
  });

  describe("configuration updates", () => {
    it("should allow config updates", () => {
      const adapter = createAnthropicAdapter({
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
    it("should handle missing Anthropic client gracefully", async () => {
      const adapter = createAnthropicAdapter();
      const wrapper = adapter.createClientWrapper(
        null as unknown as MockAnthropicClient
      );

      await expect(
        wrapper.messages.create({
          model: "claude-3-opus-20240229",
          max_tokens: 100,
          messages: [],
        })
      ).rejects.toThrow("Anthropic client not available");
    });
  });
});
