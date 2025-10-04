import { describe, it, expect } from "vitest";
import { validateConfig } from "../../src/config/validator.js";
import type { RedactionConfig, CategoryConfig } from "../../src/config/types.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("validateConfig", () => {
  describe("basic fields validation", () => {
    it("should validate valid mask field", () => {
      const config: RedactionConfig = { mask: "*" };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject invalid mask field", () => {
      const config: RedactionConfig = { mask: 123 as any };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "mask",
        message: "Mask must be a string",
        value: 123,
      });
    });

    it("should validate valid replacement field", () => {
      const config: RedactionConfig = { replacement: "[REDACTED]" };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject invalid replacement field", () => {
      const config: RedactionConfig = { replacement: true as any };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "replacement",
        message: "Replacement must be a string",
        value: true,
      });
    });

    it("should validate valid globalMode", () => {
      const validModes = ["mask", "replace", "remove", "hash", "encrypt"];
      for (const mode of validModes) {
        const config: RedactionConfig = { globalMode: mode as any };
        const result = validateConfig(config);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it("should reject invalid globalMode", () => {
      const config: RedactionConfig = { globalMode: "invalid" as any };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "globalMode",
        message: "Global mode must be one of: mask, replace, remove, hash, encrypt",
        value: "invalid",
      });
    });

    it("should validate boolean fields", () => {
      const config: RedactionConfig = {
        preserveLength: true,
        preserveFormat: false,
        detectLanguage: true,
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject non-boolean values for boolean fields", () => {
      const config: RedactionConfig = {
        preserveLength: "yes" as any,
        preserveFormat: 1 as any,
        detectLanguage: null as any,
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(3);
    });
  });

  describe("categories validation", () => {
    it("should validate categories as array", () => {
      const config: RedactionConfig = {
        categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject invalid categories in array", () => {
      const config: RedactionConfig = {
        categories: ["EMAIL" as PolicyCategory, "INVALID_CATEGORY" as PolicyCategory],
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "categories[1]",
        message: "Invalid category: INVALID_CATEGORY",
        value: "INVALID_CATEGORY",
      });
    });

    it("should validate categories as object with boolean values", () => {
      const config: RedactionConfig = {
        categories: {
          [PolicyCategory.EMAIL]: true,
          [PolicyCategory.PHONE]: false,
        } as Record<PolicyCategory, boolean>,
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should validate categories as object with config values", () => {
      const config: RedactionConfig = {
        categories: {
          [PolicyCategory.EMAIL]: {
            enabled: true,
            mode: "hash",
            replacement: "[EMAIL_HASH]",
            preserveLength: false,
            preserveFormat: true,
            customPattern: "\\b[\\w._%+-]+@[\\w.-]+\\.[A-Z]{2,}\\b",
          },
        } as Record<PolicyCategory, CategoryConfig>,
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject invalid category configuration", () => {
      const config: RedactionConfig = {
        categories: {
          [PolicyCategory.EMAIL]: {
            enabled: "yes" as any,
            mode: "invalid" as any,
            replacement: 123 as any,
          },
        } as Record<PolicyCategory, CategoryConfig>,
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should reject non-array/object categories", () => {
      const config: RedactionConfig = {
        categories: "EMAIL,PHONE" as any,
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "categories",
        message: "Categories must be an array or object",
        value: "EMAIL,PHONE",
      });
    });
  });

  describe("customPolicies validation", () => {
    it("should validate valid custom patterns", () => {
      const config: RedactionConfig = {
        customPolicies: [
          {
            name: "Custom Email",
            pattern: "[a-z]+@example\\.com",
            flags: "gi",
            replacement: "[CUSTOM_EMAIL]",
            mode: "replace",
          },
        ],
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject patterns without required fields", () => {
      const config: RedactionConfig = {
        customPolicies: [
          {
            name: "",
            pattern: "",
          },
        ],
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "customPolicies[0].name",
        message: "Pattern name is required and must be a string",
        value: "",
      });
    });

    it("should reject invalid regex patterns", () => {
      const config: RedactionConfig = {
        customPolicies: [
          {
            name: "Bad Pattern",
            pattern: "[unclosed",
          },
        ],
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.objectContaining({
          path: "customPolicies[0].pattern",
          message: expect.stringContaining("Invalid regex pattern"),
        })
      );
    });

    it("should reject patterns that may cause ReDoS", () => {
      const config: RedactionConfig = {
        customPolicies: [
          {
            name: "ReDoS Pattern",
            pattern: "(a+)+b",
          },
        ],
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "customPolicies[0].pattern",
        message: "Pattern may cause catastrophic backtracking (ReDoS vulnerability)",
        value: "(a+)+b",
      });
    });

    it("should reject too many custom patterns", () => {
      const patterns = Array(101).fill({
        name: "Pattern",
        pattern: "test",
      });
      const config: RedactionConfig = { customPolicies: patterns };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "customPolicies",
        message: "Too many custom patterns. Maximum allowed: 100",
        value: 101,
      });
    });

    it("should reject patterns exceeding max length", () => {
      const longPattern = "a".repeat(1001);
      const config: RedactionConfig = {
        customPolicies: [
          {
            name: "Long Pattern",
            pattern: longPattern,
          },
        ],
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "customPolicies[0].pattern",
        message: "Pattern length exceeds maximum of 1000 characters",
        value: 1001,
      });
    });
  });

  describe("hashOptions validation", () => {
    it("should validate valid hash options", () => {
      const config: RedactionConfig = {
        hashOptions: {
          algorithm: "sha256",
          salt: "mysalt",
          encoding: "hex",
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject invalid hash algorithm", () => {
      const config: RedactionConfig = {
        hashOptions: {
          algorithm: "sha1" as any,
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "hashOptions.algorithm",
        message: "Hash algorithm must be one of: sha256, sha512, md5, blake2b",
        value: "sha1",
      });
    });

    it("should reject invalid encoding", () => {
      const config: RedactionConfig = {
        hashOptions: {
          encoding: "binary" as any,
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "hashOptions.encoding",
        message: "Encoding must be one of: hex, base64, base64url",
        value: "binary",
      });
    });
  });

  describe("encryptOptions validation", () => {
    it("should validate valid encrypt options", () => {
      const config: RedactionConfig = {
        encryptOptions: {
          algorithm: "aes-256-gcm",
          key: "mykey",
          iv: "myiv",
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject non-string encrypt options", () => {
      const config: RedactionConfig = {
        encryptOptions: {
          algorithm: 123 as any,
          key: true as any,
          iv: null as any,
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(3);
    });
  });

  describe("performance options validation", () => {
    it("should validate valid performance options", () => {
      const config: RedactionConfig = {
        performance: {
          maximumInputSize: 1024 * 1024,
          timeout: 5000,
          cachePatterns: true,
          streamThreshold: 1024,
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject negative or zero values", () => {
      const config: RedactionConfig = {
        performance: {
          maximumInputSize: 0,
          timeout: -1,
          streamThreshold: 0,
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(3);
    });

    it("should reject maximumInputSize exceeding limit", () => {
      const config: RedactionConfig = {
        performance: {
          maximumInputSize: 200 * 1024 * 1024,
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "performance.maximumInputSize",
        message: "Maximum input size cannot exceed 104857600 bytes",
        value: 200 * 1024 * 1024,
      });
    });
  });

  describe("security options validation", () => {
    it("should validate valid security options", () => {
      const config: RedactionConfig = {
        security: {
          preventRegexDos: true,
          maximumPatternLength: 500,
          maximumCustomPatterns: 50,
          auditLog: false,
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject invalid security options", () => {
      const config: RedactionConfig = {
        security: {
          preventRegexDos: "yes" as any,
          maximumPatternLength: -1,
          maximumCustomPatterns: 200,
          auditLog: 1 as any,
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe("locale validation", () => {
    it("should validate valid locale as string", () => {
      const config: RedactionConfig = { locale: "en" };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should validate valid locale with country", () => {
      const config: RedactionConfig = { locale: "en-US" };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should validate valid locale array", () => {
      const config: RedactionConfig = { locale: ["en", "es-ES", "fr"] };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject invalid locale format", () => {
      const config: RedactionConfig = { locale: "english" };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual({
        path: "locale",
        message: "Invalid locale format. Expected format: \"en\" or \"en-US\"",
        value: "english",
      });
    });

    it("should reject non-string locale values", () => {
      const config: RedactionConfig = { locale: [123, true] as any };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(2);
    });
  });

  describe("complex validation scenarios", () => {
    it("should validate complete valid configuration", () => {
      const config: RedactionConfig = {
        mask: "*",
        replacement: "[REDACTED]",
        categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
        customPolicies: [
          {
            name: "Custom ID",
            pattern: "ID-\\d{6}",
            replacement: "[ID]",
            mode: "replace",
          },
        ],
        globalMode: "replace",
        preserveLength: true,
        preserveFormat: false,
        hashOptions: {
          algorithm: "sha256",
          salt: "salt",
          encoding: "hex",
        },
        performance: {
          maximumInputSize: 1024 * 1024,
          timeout: 10000,
        },
        security: {
          preventRegexDos: true,
          auditLog: true,
        },
        locale: ["en", "es"],
        detectLanguage: true,
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should collect multiple validation errors", () => {
      const config: RedactionConfig = {
        mask: 123 as any,
        globalMode: "invalid" as any,
        categories: ["INVALID"] as any,
        customPolicies: "not-an-array" as any,
        performance: {
          maximumInputSize: -1,
        },
      };
      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(4);
    });
  });
});