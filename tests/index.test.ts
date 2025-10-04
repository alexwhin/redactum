import { describe, it, expect } from "vitest";
import {
  redactum,
  redactumBatch,
  redactumGetEnabledCategories,
  redactumGetPatterns,
  redactumGetAllPatterns,
  PolicyCategory,
  POLICIES,
  DEFAULT_REPLACEMENT,
  DEFAULT_ENABLED_CATEGORIES,
  redactumCalculateEntropy,
  redactumLooksLikeSecret,
  redactumValidateOptions,
  redactumValidatePolicy,
} from "../src/index.js";

describe("Main Index Exports", () => {
  describe("Functional API", () => {
    it("should export all functional methods", () => {
      expect(redactum).toBeDefined();
      expect(redactumBatch).toBeDefined();
      expect(redactumGetEnabledCategories).toBeDefined();
      expect(redactumGetPatterns).toBeDefined();
      expect(redactumGetAllPatterns).toBeDefined();
    });

    it("should redact text using functional approach", () => {
      const result = redactum("Contact me at john@example.com");
      expect(result.redactedText).toBe("Contact me at [EMAIL]");
      expect(result.stats.totalFindings).toBe(1);
    });

    it("should redact and extract text", () => {
      const result = redactum("Contact me at john@example.com");
      expect(result.redactedText).toBe("Contact me at [EMAIL]");
    });

    it("should handle custom patterns", () => {
      const result = redactum("Code: CUSTOM-1234", {
        customPolicies: [{
          name: "Custom Code",
          pattern: /CUSTOM-\d{4}/g,
          category: PolicyCategory.CUSTOM,
          replacement: "[CUSTOM]"
        }]
      });
      expect(result.redactedText).toBe("Code: [CUSTOM]");
    });

    it("should support independent custom patterns via options", () => {
      const result1 = redactum("INST1-123 INST2-456", {
        customPolicies: [{
          name: "Instance1",
          pattern: /INST1-\d+/g,
          category: PolicyCategory.CUSTOM,
          replacement: "[INST1]"
        }]
      });

      const result2 = redactum("INST1-123 INST2-456", {
        customPolicies: [{
          name: "Instance2",
          pattern: /INST2-\d+/g,
          category: PolicyCategory.CUSTOM,
          replacement: "[INST2]"
        }]
      });

      expect(result1.redactedText).toBe("[INST1] INST2-456");
      expect(result2.redactedText).toBe("INST1-123 [INST2]");
    });

    it("should batch redact multiple texts", () => {
      const texts = [
        "Email: john@example.com",
        "Phone: 555-123-4567",
        "SSN: 123-45-6789"
      ];
      const results = redactumBatch(texts, { policies: ["EMAIL_ADDRESS", "PHONE_NUMBER_US", "SSN"] });

      expect(results).toHaveLength(3);
      expect(results[0]?.redactedText).toBe("Email: [EMAIL]");
      expect(results[1]?.redactedText).toBe("Phone: [PHONE]");
      expect(results[2]?.redactedText).toBe("SSN: [SSN]");
    });

    it("should batch redact and extract strings", () => {
      const texts = [
        "Email: john@example.com",
        "Phone: 555-123-4567"
      ];
      const results = redactumBatch(texts, { policies: ["EMAIL_ADDRESS", "PHONE_NUMBER_US"] });
      const redactedTexts = results.map((r) => r.redactedText);

      expect(redactedTexts).toHaveLength(2);
      expect(redactedTexts[0]).toBe("Email: [EMAIL]");
      expect(redactedTexts[1]).toBe("Phone: [PHONE]");
    });
  });

  describe("PolicyCategory", () => {
    it("should export PolicyCategory enum", () => {
      expect(PolicyCategory).toBeDefined();
      expect(PolicyCategory.EMAIL).toBe("EMAIL");
      expect(PolicyCategory.PHONE).toBe("PHONE");
    });
  });

  describe("Constants", () => {
    it("should export POLICIES", () => {
      expect(POLICIES).toBeDefined();
      expect(typeof POLICIES).toBe("object");
    });

    it("should export DEFAULT_REPLACEMENT", () => {
      expect(DEFAULT_REPLACEMENT).toBeDefined();
      expect(typeof DEFAULT_REPLACEMENT).toBe("string");
    });

    it("should export DEFAULT_ENABLED_CATEGORIES", () => {
      expect(DEFAULT_ENABLED_CATEGORIES).toBeDefined();
      expect(Array.isArray(DEFAULT_ENABLED_CATEGORIES)).toBe(true);
    });
  });

  describe("Pattern Functions", () => {
    it("should return all patterns via getAllPatterns", () => {
      const patterns = redactumGetAllPatterns();
      expect(Array.isArray(patterns)).toBe(true);
      expect(patterns.length).toBeGreaterThan(0);
      expect(patterns[0]).toHaveProperty("name");
      expect(patterns[0]).toHaveProperty("pattern");
      expect(patterns[0]).toHaveProperty("category");
    });

    it("should return patterns for specific options via getPatterns", () => {
      const patterns = redactumGetPatterns({ policies: ["EMAIL_ADDRESS"] });
      expect(Array.isArray(patterns)).toBe(true);
      expect(patterns.length).toBeGreaterThan(0);
    });
  });

  describe("Utility Functions", () => {
    it("should export redactumCalculateEntropy", () => {
      expect(redactumCalculateEntropy).toBeDefined();
      expect(typeof redactumCalculateEntropy).toBe("function");
    });

    it("should export redactumLooksLikeSecret", () => {
      expect(redactumLooksLikeSecret).toBeDefined();
      expect(typeof redactumLooksLikeSecret).toBe("function");
    });

    it("should export redactumValidateOptions", () => {
      expect(redactumValidateOptions).toBeDefined();
      expect(typeof redactumValidateOptions).toBe("function");
    });

    it("should export redactumValidatePolicy", () => {
      expect(redactumValidatePolicy).toBeDefined();
      expect(typeof redactumValidatePolicy).toBe("function");
    });
  });

  describe("redactum primary function", () => {
    it("should export redactum function", () => {
      expect(redactum).toBeDefined();
      expect(typeof redactum).toBe("function");
    });

    it("should redact PII from text and return RedactionResult", () => {
      const result = redactum("Email me at john@example.com", {
        policies: ["EMAIL_ADDRESS"]
      });
      expect(result.redactedText).toBe("Email me at [EMAIL]");
      expect(result.stats.totalFindings).toBe(1);
    });

    it("should work without options", () => {
      const result = redactum("Contact john@example.com");
      expect(result.redactedText).toContain("[EMAIL]");
    });
  });
});