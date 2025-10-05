import { describe, it, expect } from "vitest";
import { getDefaultConfig, CONFIG_FILE_NAMES, CONFIG_SCHEMA_URL } from "../../src/config/defaults.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("getDefaultConfig", () => {
  it("should return a valid default configuration", () => {
    const config = getDefaultConfig();

    expect(config).toBeDefined();
    expect(config.mask).toBe("*");
    expect(config.replacement).toBe("[REDACTED]");
    expect(config.globalMode).toBe("replace");
    expect(config.preserveLength).toBe(false);
    expect(config.preserveFormat).toBe(false);
    expect(config.locale).toBe("en");
    expect(config.detectLanguage).toBe(false);
  });

  it("should return categories as a Map with all PolicyCategory values", () => {
    const config = getDefaultConfig();

    expect(config.categories).toBeInstanceOf(Map);
    
    const allCategories = Object.values(PolicyCategory);
    expect(config.categories.size).toBe(allCategories.length);

    for (const category of allCategories) {
      expect(config.categories.has(category)).toBe(true);
      const categoryConfig = config.categories.get(category);
      expect(categoryConfig).toBeDefined();
      expect(categoryConfig).toHaveProperty("enabled");
      expect(categoryConfig).toHaveProperty("mode");
      expect(categoryConfig).toHaveProperty("replacement");
      expect(categoryConfig).toHaveProperty("preserveFormat");
    }
  });

  it("should have security-sensitive categories enabled by default", () => {
    const config = getDefaultConfig();

    const sensitiveCategories = [
      PolicyCategory.EMAIL,
      PolicyCategory.PHONE,
      PolicyCategory.SSN,
      PolicyCategory.CREDIT_CARD,
      PolicyCategory.API_KEY,
      PolicyCategory.AWS_KEY,
      PolicyCategory.PRIVATE_KEY,
      PolicyCategory.DEV_SECRET,
    ];

    for (const category of sensitiveCategories) {
      const categoryConfig = config.categories.get(category);
      expect(categoryConfig?.enabled).toBe(true);
    }
  });

  it("should have less sensitive categories disabled by default", () => {
    const config = getDefaultConfig();

    const lesseSensitiveCategories = [
      PolicyCategory.ADDRESS,
      PolicyCategory.DATE_OF_BIRTH,
      PolicyCategory.MEDICAL,
      PolicyCategory.GEOGRAPHIC,
      PolicyCategory.EMPLOYEE_ID,
      PolicyCategory.VEHICLE,
      PolicyCategory.DEV_IDENTIFIER,
      PolicyCategory.CUSTOM,
    ];

    for (const category of lesseSensitiveCategories) {
      const categoryConfig = config.categories.get(category);
      expect(categoryConfig?.enabled).toBe(false);
    }
  });

  it("should have valid hash options", () => {
    const config = getDefaultConfig();

    expect(config.hashOptions).toBeDefined();
    expect(config.hashOptions.algorithm).toBe("sha256");
    expect(config.hashOptions.salt).toBe("");
    expect(config.hashOptions.encoding).toBe("hex");
  });

  it("should have valid encrypt options", () => {
    const config = getDefaultConfig();

    expect(config.encryptOptions).toBeDefined();
    expect(config.encryptOptions.algorithm).toBe("aes-256-gcm");
    expect(config.encryptOptions.key).toBeUndefined();
    expect(config.encryptOptions.iv).toBeUndefined();
  });

  it("should have reasonable performance defaults", () => {
    const config = getDefaultConfig();

    expect(config.performance).toBeDefined();
    expect(config.performance.maximumInputSize).toBe(10 * 1024 * 1024);
    expect(config.performance.timeout).toBe(30000);
    expect(config.performance.cachePatterns).toBe(true);
    expect(config.performance.streamThreshold).toBe(1024 * 1024);
  });

  it("should have security defaults enabled", () => {
    const config = getDefaultConfig();

    expect(config.security).toBeDefined();
    expect(config.security.preventRegexDos).toBe(true);
    expect(config.security.maximumPatternLength).toBe(1000);
    expect(config.security.maximumCustomPatterns).toBe(100);
    expect(config.security.auditLog).toBe(false);
  });

  it("should return empty custom patterns by default", () => {
    const config = getDefaultConfig();

    expect(config.customPolicies).toEqual([]);
  });
});

describe("CONFIG_FILE_NAMES", () => {
  it("should contain all expected configuration file names", () => {
    expect(CONFIG_FILE_NAMES).toContain(".redactumrc.json");
    expect(CONFIG_FILE_NAMES).toContain(".redactumrc.js");
    expect(CONFIG_FILE_NAMES).toContain(".redactumrc.cjs");
    expect(CONFIG_FILE_NAMES).toContain(".redactumrc.mjs");
    expect(CONFIG_FILE_NAMES).toContain(".redactumrc.yaml");
    expect(CONFIG_FILE_NAMES).toContain(".redactumrc.yml");
    expect(CONFIG_FILE_NAMES).toContain("redactum.config.json");
    expect(CONFIG_FILE_NAMES).toContain("redactum.config.js");
    expect(CONFIG_FILE_NAMES).toContain("redactum.config.cjs");
    expect(CONFIG_FILE_NAMES).toContain("redactum.config.mjs");
    expect(CONFIG_FILE_NAMES).toContain("redactum.config.yaml");
    expect(CONFIG_FILE_NAMES).toContain("redactum.config.yml");
  });

  it("should prioritize .redactumrc files over redactum.config files", () => {
    const rcIndex = CONFIG_FILE_NAMES.indexOf(".redactumrc.json");
    const configIndex = CONFIG_FILE_NAMES.indexOf("redactum.config.json");
    
    expect(rcIndex).toBeLessThan(configIndex);
  });
});

describe("CONFIG_SCHEMA_URL", () => {
  it("should be a valid URL string", () => {
    expect(typeof CONFIG_SCHEMA_URL).toBe("string");
    expect(CONFIG_SCHEMA_URL).toMatch(/^https?:\/\//);
  });
});