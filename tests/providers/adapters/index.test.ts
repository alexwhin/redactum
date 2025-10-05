import { describe, it, expect } from "vitest";
import {
  BaseAdapter,
  LangChainAdapter,
  createLangChainAdapter,
  LlamaIndexAdapter,
  createLlamaIndexAdapter,
  VercelAIAdapter,
  createVercelAIAdapter,
  OpenAIAdapter,
  createOpenAIAdapter,
  AnthropicAdapter,
  createAnthropicAdapter,
} from "../../../src/providers/adapters/index.js";

describe("Adapters Index Exports", () => {
  it("should export BaseAdapter", () => {
    expect(BaseAdapter).toBeDefined();
  });

  it("should export LangChainAdapter and factory", () => {
    expect(LangChainAdapter).toBeDefined();
    expect(createLangChainAdapter).toBeDefined();

    const adapter = createLangChainAdapter();
    expect(adapter).toBeInstanceOf(LangChainAdapter);
  });

  it("should export LlamaIndexAdapter and factory", () => {
    expect(LlamaIndexAdapter).toBeDefined();
    expect(createLlamaIndexAdapter).toBeDefined();

    const adapter = createLlamaIndexAdapter();
    expect(adapter).toBeInstanceOf(LlamaIndexAdapter);
  });

  it("should export VercelAIAdapter and factory", () => {
    expect(VercelAIAdapter).toBeDefined();
    expect(createVercelAIAdapter).toBeDefined();

    const adapter = createVercelAIAdapter();
    expect(adapter).toBeInstanceOf(VercelAIAdapter);
  });

  it("should export OpenAIAdapter and factory", () => {
    expect(OpenAIAdapter).toBeDefined();
    expect(createOpenAIAdapter).toBeDefined();

    const adapter = createOpenAIAdapter();
    expect(adapter).toBeInstanceOf(OpenAIAdapter);
  });

  it("should export AnthropicAdapter and factory", () => {
    expect(AnthropicAdapter).toBeDefined();
    expect(createAnthropicAdapter).toBeDefined();

    const adapter = createAnthropicAdapter();
    expect(adapter).toBeInstanceOf(AnthropicAdapter);
  });
});
