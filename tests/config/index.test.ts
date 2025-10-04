import { describe, it, expect, beforeEach, vi } from "vitest";
import { 
  getConfig, 
  clearConfigCache, 
  loadConfig,
  getDefaultConfig,
  validateConfig,
  mergeConfigs,
  ConfigValidationException,
} from "../../src/config/index.js";
import type { ConfigLoaderOptions, ResolvedConfig } from "../../src/config/index.js";

vi.mock("../../src/config/loader.js", () => ({
  loadConfig: vi.fn(),
  ConfigValidationError: class extends Error {
    constructor(message: string, public errors: unknown[]) {
      super(message);
      this.name = "ConfigValidationError";
    }
  },
}));

describe("config index exports", () => {
  it("should export all expected functions and types", () => {
    expect(getConfig).toBeDefined();
    expect(clearConfigCache).toBeDefined();
    expect(loadConfig).toBeDefined();
    expect(getDefaultConfig).toBeDefined();
    expect(validateConfig).toBeDefined();
    expect(mergeConfigs).toBeDefined();
    expect(ConfigValidationException).toBeDefined();
  });
});

describe("getConfig", () => {
  beforeEach(() => {
    clearConfigCache();
    vi.clearAllMocks();
  });

  it("should load and cache configuration", async () => {
    const mockConfig: ResolvedConfig = {
      mask: "*",
      replacement: "[REDACTED]",
      globalMode: "replace",
      preserveLength: false,
      preserveFormat: false,
      locale: "en",
      detectLanguage: false,
      categories: new Map(),
      customPolicies: [],
      hashOptions: {
        algorithm: "sha256",
        salt: "",
        encoding: "hex",
      },
      encryptOptions: {
        algorithm: "aes-256-gcm",
        key: undefined,
        iv: undefined,
      },
      performance: {
        maximumInputSize: 1000,
        timeout: 5000,
        cachePatterns: true,
        streamThreshold: 500,
      },
      security: {
        preventRegexDos: true,
        maximumPatternLength: 100,
        maximumCustomPatterns: 10,
        auditLog: false,
      },
    };

    const { loadConfig: mockLoadConfig } = await import("../../src/config/loader.js");
    vi.mocked(mockLoadConfig).mockResolvedValue(mockConfig);

    const config1 = await getConfig();
    const config2 = await getConfig();

    expect(config1).toBe(mockConfig);
    expect(config2).toBe(mockConfig);
    expect(config1).toBe(config2);
    expect(mockLoadConfig).toHaveBeenCalledTimes(1);
  });

  it("should reload configuration when options are provided", async () => {
    const mockConfig1: ResolvedConfig = {
      mask: "*",
      replacement: "[REDACTED]",
      globalMode: "replace",
      preserveLength: false,
      preserveFormat: false,
      locale: "en",
      detectLanguage: false,
      categories: new Map(),
      customPolicies: [],
      hashOptions: {
        algorithm: "sha256",
        salt: "",
        encoding: "hex",
      },
      encryptOptions: {
        algorithm: "aes-256-gcm",
        key: undefined,
        iv: undefined,
      },
      performance: {
        maximumInputSize: 1000,
        timeout: 5000,
        cachePatterns: true,
        streamThreshold: 500,
      },
      security: {
        preventRegexDos: true,
        maximumPatternLength: 100,
        maximumCustomPatterns: 10,
        auditLog: false,
      },
    };

    const mockConfig2: ResolvedConfig = {
      ...mockConfig1,
      mask: "#",
    };

    const { loadConfig: mockLoadConfig } = await import("../../src/config/loader.js");
    vi.mocked(mockLoadConfig).mockResolvedValueOnce(mockConfig1).mockResolvedValueOnce(mockConfig2);

    const config1 = await getConfig();
    expect(config1.mask).toBe("*");

    const options: ConfigLoaderOptions = { configPath: "/custom/path" };
    const config2 = await getConfig(options);
    expect(config2.mask).toBe("#");

    expect(mockLoadConfig).toHaveBeenCalledTimes(2);
    expect(mockLoadConfig).toHaveBeenNthCalledWith(1, undefined);
    expect(mockLoadConfig).toHaveBeenNthCalledWith(2, options);
  });

  it("should handle loading errors", async () => {
    const error = new Error("Failed to load config");
    const { loadConfig: mockLoadConfig } = await import("../../src/config/loader.js");
    vi.mocked(mockLoadConfig).mockRejectedValue(error);

    await expect(getConfig()).rejects.toThrow("Failed to load config");
  });
});

describe("clearConfigCache", () => {
  it("should clear the cached configuration", async () => {
    const mockConfig: ResolvedConfig = {
      mask: "*",
      replacement: "[REDACTED]",
      globalMode: "replace",
      preserveLength: false,
      preserveFormat: false,
      locale: "en",
      detectLanguage: false,
      categories: new Map(),
      customPolicies: [],
      hashOptions: {
        algorithm: "sha256",
        salt: "",
        encoding: "hex",
      },
      encryptOptions: {
        algorithm: "aes-256-gcm",
        key: undefined,
        iv: undefined,
      },
      performance: {
        maximumInputSize: 1000,
        timeout: 5000,
        cachePatterns: true,
        streamThreshold: 500,
      },
      security: {
        preventRegexDos: true,
        maximumPatternLength: 100,
        maximumCustomPatterns: 10,
        auditLog: false,
      },
    };

    const { loadConfig: mockLoadConfig } = await import("../../src/config/loader.js");
    vi.mocked(mockLoadConfig).mockClear();
    vi.mocked(mockLoadConfig).mockResolvedValue(mockConfig);

    const initialCallCount = vi.mocked(mockLoadConfig).mock.calls.length;
    
    await getConfig();
    clearConfigCache();
    await getConfig();

    const finalCallCount = vi.mocked(mockLoadConfig).mock.calls.length;
    expect(finalCallCount - initialCallCount).toBe(2);
  });
});

describe("ConfigValidationException", () => {
  it("should be available as an export", () => {
    expect(ConfigValidationException).toBeDefined();
    expect(typeof ConfigValidationException).toBe("function");
  });

  it("should be constructible", () => {
    const errors = [{ path: "test", message: "test error", value: "test" }];
    const exception = new ConfigValidationException("Test error", errors);
    
    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe("Test error");
    expect(exception.errors).toBe(errors);
  });
});