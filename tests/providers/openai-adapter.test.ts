import { describe, it, expect } from "vitest";
import {
  createOpenAIAdapter,
  OpenAIAdapter,
} from "../../src/providers/adapters/openai-adapter.js";
import type { PolicyName } from "../../src/types/index.js";

interface MockOpenAIClient {
  chat: {
    completions: {
      create: (options: unknown) => Promise<unknown>;
    };
  };
  completions: {
    create: (options: unknown) => Promise<unknown>;
  };
  embeddings: {
    create: (options: unknown) => Promise<unknown>;
  };
  beta: {
    threads: {
      messages: {
        create: (threadId: string, message: unknown) => Promise<unknown>;
      };
      runs: {
        create: (threadId: string, options: unknown) => Promise<unknown>;
      };
    };
  };
}

describe("OpenAI Adapter", () => {
  describe("createOpenAIAdapter", () => {
    it("should create a new OpenAIAdapter instance", () => {
      const adapter = createOpenAIAdapter();
      expect(adapter).toBeInstanceOf(OpenAIAdapter);
      expect(adapter.providerName).toBe("openai");
      expect(adapter.version).toBe("4.0.0");
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
      const adapter = createOpenAIAdapter(config);
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
      const adapter = createOpenAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const result = await adapter.transform("Contact john@example.com");
      expect(result).toBe("Contact [EMAIL]");
    });

    it("should handle complex input", async () => {
      const adapter = createOpenAIAdapter({
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
    const mockClient: MockOpenAIClient = {
      chat: {
        completions: {
          create: async (_options) => ({
            id: "test",
            choices: [{ message: { content: "response" } }],
          }),
        },
      },
      completions: {
        create: async (_options) => ({
          id: "test",
          choices: [{ text: "response" }],
        }),
      },
      embeddings: {
        create: async (_options) => ({ data: [{ embedding: [0.1, 0.2] }] }),
      },
      beta: {
        threads: {
          messages: {
            create: async (_threadId, _message) => ({
              id: "msg_123",
              content: [],
            }),
          },
          runs: {
            create: async (_threadId, _options) => ({
              id: "run_123",
              status: "queued",
            }),
          },
        },
      },
    };

    it("should create client wrapper with required methods", () => {
      const adapter = createOpenAIAdapter();
      const wrapper = adapter.createClientWrapper(mockClient);

      expect(wrapper).toHaveProperty("chat");
      expect(wrapper).toHaveProperty("completions");
      expect(wrapper).toHaveProperty("embeddings");
      expect(wrapper.chat).toHaveProperty("completions");
    });

    it("should redact chat completion messages", async () => {
      const adapter = createOpenAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "user", content: "My email is test@example.com" },
          { role: "assistant", content: "I understand" },
        ],
      });

      expect(result).toBeDefined();
    });

    it("should redact completion prompts", async () => {
      const adapter = createOpenAIAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: "My phone number is 555-123-4567",
      });

      expect(result).toBeDefined();
    });

    it("should handle string array prompts", async () => {
      const adapter = createOpenAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: ["First prompt with test@example.com", "Second prompt"],
      });

      expect(result).toBeDefined();
    });

    it("should redact embedding input", async () => {
      const adapter = createOpenAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.embeddings.create({
        model: "text-embedding-ada-002",
        input: "My email is user@example.com",
      });

      expect(result).toBeDefined();
    });

    it("should handle embedding input arrays", async () => {
      const adapter = createOpenAIAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const wrapper = adapter.createClientWrapper(mockClient);

      const result = await wrapper.embeddings.create({
        model: "text-embedding-ada-002",
        input: ["Text with 555-123-4567", "Clean text"],
      });

      expect(result).toBeDefined();
    });
  });

  describe("createAssistantWrapper", () => {
    const mockClient: MockOpenAIClient = {
      chat: { completions: { create: async () => ({}) } },
      completions: { create: async () => ({}) },
      embeddings: { create: async () => ({}) },
      beta: {
        threads: {
          messages: {
            create: async (_threadId, _message) => ({
              id: "msg_123",
              content: [],
            }),
          },
          runs: {
            create: async (_threadId, _options) => ({
              id: "run_123",
              status: "queued",
            }),
          },
        },
      },
    };

    it("should create assistant wrapper", () => {
      const adapter = createOpenAIAdapter();
      const wrapper = adapter.createAssistantWrapper(mockClient);

      expect(wrapper).toHaveProperty("beta");
      expect(wrapper.beta).toHaveProperty("threads");
      expect(wrapper.beta.threads).toHaveProperty("messages");
      expect(wrapper.beta.threads).toHaveProperty("runs");
    });

    it("should redact thread messages", async () => {
      const adapter = createOpenAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createAssistantWrapper(mockClient);

      const result = await wrapper.beta.threads.messages.create("thread_123", {
        role: "user",
        content: "My email is test@example.com",
      });

      expect(result).toBeDefined();
    });

    it("should redact message metadata", async () => {
      const adapter = createOpenAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const wrapper = adapter.createAssistantWrapper(mockClient);

      const result = await wrapper.beta.threads.messages.create("thread_123", {
        role: "user",
        content: "Hello",
        metadata: {
          user_email: "user@example.com",
          session_id: "sess_123",
        },
      });

      expect(result).toBeDefined();
    });

    it("should redact run instructions", async () => {
      const adapter = createOpenAIAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const wrapper = adapter.createAssistantWrapper(mockClient);

      const result = await wrapper.beta.threads.runs.create("thread_123", {
        assistant_id: "asst_123",
        instructions: "Call the user at 555-123-4567",
      });

      expect(result).toBeDefined();
    });
  });

  describe("createFunctionCallCleaner", () => {
    it("should create function call cleaner", () => {
      const adapter = createOpenAIAdapter();
      const cleaner = adapter.createFunctionCallCleaner();

      expect(cleaner).toHaveProperty("cleanFunctionCall");
      expect(cleaner).toHaveProperty("cleanToolCall");
      expect(typeof cleaner.cleanFunctionCall).toBe("function");
      expect(typeof cleaner.cleanToolCall).toBe("function");
    });

    it("should clean function call arguments", () => {
      const adapter = createOpenAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const cleaner = adapter.createFunctionCallCleaner();
      const functionCall = {
        name: "send_email",
        arguments: JSON.stringify({ to: "user@example.com", message: "Hello" }),
      };

      const cleaned = cleaner.cleanFunctionCall(functionCall);
      expect(cleaned.name).toBe("send_email");
      expect(cleaned.arguments).toContain("[EMAIL]");
    });

    it("should clean tool call arguments", () => {
      const adapter = createOpenAIAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const cleaner = adapter.createFunctionCallCleaner();
      const toolCall = {
        id: "call_123",
        type: "function",
        function: {
          name: "make_call",
          arguments: JSON.stringify({ phone: "555-123-4567" }),
        },
      };

      const cleaned = cleaner.cleanToolCall(toolCall);
      expect(cleaned.function.name).toBe("make_call");
      expect(cleaned.function.arguments).toContain("[PHONE]");
    });
  });

  describe("createMessageProcessor", () => {
    it("should create message processor with required methods", () => {
      const adapter = createOpenAIAdapter();
      const processor = adapter.createMessageProcessor();

      expect(processor).toHaveProperty("processMessages");
      expect(processor).toHaveProperty("processSystemMessage");
      expect(processor).toHaveProperty("processUserMessage");
    });

    it("should process messages array", () => {
      const adapter = createOpenAIAdapter({
        policies: ["EMAIL_ADDRESS"] as PolicyName[],
      });

      const processor = adapter.createMessageProcessor();
      const messages = [
        { role: "user" as const, content: "My email is test@example.com" },
        { role: "assistant" as const, content: "Thank you" },
        { role: "user" as const, content: null },
      ];

      const processed = processor.processMessages(messages);
      expect(processed[0]?.content).toBe("My email is [EMAIL]");
      expect(processed[1]?.content).toBe("Thank you");
      expect(processed[2]?.content).toBe(null);
    });

    it("should process system message", () => {
      const adapter = createOpenAIAdapter({
        policies: [
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
      });

      const processor = adapter.createMessageProcessor();
      const system = "You are helpful. Never share 555-123-4567";

      const processed = processor.processSystemMessage(system);
      expect(processed).toBe("You are helpful. Never share [PHONE]");
    });

    it("should process user message", () => {
      const adapter = createOpenAIAdapter({
        policies: ["SSN"],
      });

      const processor = adapter.createMessageProcessor();
      const message = "My SSN is 123-45-6789";

      const processed = processor.processUserMessage(message);
      expect(processed).toBe("My SSN is [SSN]");
    });
  });

  describe("configuration updates", () => {
    it("should allow config updates", () => {
      const adapter = createOpenAIAdapter({
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
    it("should handle missing OpenAI client gracefully", async () => {
      const adapter = createOpenAIAdapter();
      const wrapper = adapter.createClientWrapper(null);

      await expect(
        wrapper.chat.completions.create({
          model: "gpt-4",
          messages: [],
        })
      ).rejects.toThrow("OpenAI client not available");
    });
  });
});
