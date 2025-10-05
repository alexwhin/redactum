import { describe, it, expect } from "vitest";
import type {
  RedactionMode,
  HashAlgorithm,
  CategoryConfig,
  RedactionConfig,
  ConfigFile,
  ResolvedConfig,
  ConfigLoaderOptions,
  ConfigValidationError,
  ConfigSource,
} from "../../src/config/types.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("RedactionMode type", () => {
  it("should include all expected redaction modes", () => {
    const validModes: RedactionMode[] = [
      "mask",
      "replace",
      "remove",
      "hash",
      "encrypt",
    ];

    validModes.forEach((mode) => {
      const testMode: RedactionMode = mode;
      expect(testMode).toBe(mode);
    });
  });
});

describe("HashAlgorithm type", () => {
  it("should include all expected hash algorithms", () => {
    const validAlgorithms: HashAlgorithm[] = [
      "sha256",
      "sha512",
      "md5",
      "blake2b",
    ];

    validAlgorithms.forEach((algorithm) => {
      const testAlgorithm: HashAlgorithm = algorithm;
      expect(testAlgorithm).toBe(algorithm);
    });
  });
});

describe("CategoryConfig interface", () => {
  it("should accept valid category configuration", () => {
    const config: CategoryConfig = {
      enabled: true,
      mode: "replace",
      replacement: "[TEST]",
      preserveLength: false,
      preserveFormat: true,
      customPattern: "test.*",
    };

    expect(config.enabled).toBe(true);
    expect(config.mode).toBe("replace");
    expect(config.replacement).toBe("[TEST]");
    expect(config.preserveLength).toBe(false);
    expect(config.preserveFormat).toBe(true);
    expect(config.customPattern).toBe("test.*");
  });

  it("should accept minimal category configuration", () => {
    const config: CategoryConfig = {};

    expect(config).toBeDefined();
  });
});

describe("RedactionConfig interface", () => {
  it("should accept comprehensive redaction configuration", () => {
    const config: RedactionConfig = {
      mask: "#",
      replacement: "[HIDDEN]",
      categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
      customPolicies: [
        {
          name: "test",
          pattern: "test.*",
          flags: "gi",
          replacement: "[TEST]",
          mode: "replace",
        },
      ],
      globalMode: "hash",
      preserveLength: true,
      preserveFormat: false,
      hashOptions: {
        algorithm: "sha256",
        salt: "test",
        encoding: "hex",
      },
      encryptOptions: {
        algorithm: "aes-256-gcm",
        key: "test-key",
        iv: "test-iv",
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
        auditLog: true,
      },
      locale: "en-US",
      detectLanguage: true,
    };

    expect(config.mask).toBe("#");
    expect(config.categories).toEqual([
      PolicyCategory.EMAIL,
      PolicyCategory.PHONE,
    ]);
    expect(config.customPolicies).toHaveLength(1);
    expect(config.globalMode).toBe("hash");
  });

  it("should accept object-based categories configuration", () => {
    const config: RedactionConfig = {
      categories: {
        [PolicyCategory.EMAIL]: true,
        [PolicyCategory.PHONE]: {
          enabled: true,
          mode: "mask",
          replacement: "[PHONE]",
        },
      } as Record<PolicyCategory, boolean | CategoryConfig>,
    };

    expect(config.categories).toBeDefined();
  });
});

describe("ConfigFile interface", () => {
  it("should accept configuration file with extends and environments", () => {
    const configFile: ConfigFile = {
      $schema: "https://example.com/schema.json",
      extends: ["./base.json", "@redactum/strict"],
      env: {
        production: {
          security: {
            auditLog: true,
          },
        },
        development: {
          security: {
            auditLog: false,
          },
        },
      },
      presets: {
        strict: {
          globalMode: "remove",
          categories: [
            PolicyCategory.EMAIL,
            PolicyCategory.PHONE,
            PolicyCategory.SSN,
          ],
        },
      },
      mask: "*",
      replacement: "[REDACTED]",
    };

    expect(configFile.$schema).toBeDefined();
    expect(configFile.extends).toHaveLength(2);
    expect(configFile.env).toHaveProperty("production");
    expect(configFile.presets).toHaveProperty("strict");
  });
});

describe("ResolvedConfig interface", () => {
  it("should enforce required properties with proper types", () => {
    const categoriesMap = new Map<
      PolicyCategory,
      CategoryConfig & { enabled: boolean }
    >();
    categoriesMap.set(PolicyCategory.EMAIL, {
      enabled: true,
      mode: "replace",
      replacement: "[EMAIL]",
      preserveLength: false,
      preserveFormat: false,
    });

    const config: ResolvedConfig = {
      mask: "*",
      replacement: "[REDACTED]",
      globalMode: "replace",
      preserveLength: false,
      preserveFormat: false,
      locale: "en",
      detectLanguage: false,
      categories: categoriesMap,
      customPolicies: [
        {
          name: "test",
          pattern: /test/gi,
          replacement: "[TEST]",
          mode: "replace",
        },
      ],
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

    expect(config.categories).toBeInstanceOf(Map);
    expect(config.customPolicies[0]?.pattern).toBeInstanceOf(RegExp);
  });
});

describe("ConfigLoaderOptions interface", () => {
  it("should accept all loader options", () => {
    const options: ConfigLoaderOptions = {
      configPath: "/path/to/config.json",
      searchPaths: ["/path1", "/path2"],
      env: "production",
      preset: "strict",
      stopOnFirstFound: true,
      mergeExtends: true,
      allowEnvironmentOverrides: true,
    };

    expect(options.configPath).toBe("/path/to/config.json");
    expect(options.searchPaths).toHaveLength(2);
    expect(options.env).toBe("production");
    expect(options.stopOnFirstFound).toBe(true);
  });
});

describe("ConfigValidationError interface", () => {
  it("should structure validation errors properly", () => {
    const error: ConfigValidationError = {
      path: "categories.EMAIL.mode",
      message: "Invalid mode specified",
      value: "invalid-mode",
    };

    expect(error.path).toBe("categories.EMAIL.mode");
    expect(error.message).toBe("Invalid mode specified");
    expect(error.value).toBe("invalid-mode");
  });
});

describe("ConfigSource interface", () => {
  it("should define configuration source metadata", () => {
    const source: ConfigSource = {
      type: "file",
      path: "/path/to/config.json",
      priority: 1,
    };

    expect(source.type).toBe("file");
    expect(source.path).toBe("/path/to/config.json");
    expect(source.priority).toBe(1);
  });

  it("should accept all source types", () => {
    const sources: ConfigSource[] = [
      { type: "file", priority: 1 },
      { type: "env", priority: 2 },
      { type: "default", priority: 3 },
      { type: "cli", priority: 4 },
    ];

    sources.forEach((source) => {
      expect(["file", "env", "default", "cli"]).toContain(source.type);
    });
  });
});
