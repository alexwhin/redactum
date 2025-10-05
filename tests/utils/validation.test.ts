import { describe, it, expect } from "vitest";
import type { Policy, RedactumOptions } from "../../src/types/index.js";
import { PolicyCategory } from "../../src/types/index.js";
import {
  redactumValidateOptions,
  redactumValidatePolicy,
} from "../../src/utils/validation.js";

describe("validation utilities", () => {
  describe("redactumValidateOptions", () => {
    it("should validate correct options", () => {
      const options: RedactumOptions = {
        policies: [
          "EMAIL_ADDRESS",
          "PHONE_NUMBER_US",
          "PHONE_NUMBER_UK",
          "PHONE_NUMBER_CANADIAN",
          "PHONE_NUMBER_INTERNATIONAL",
        ],
        replacement: "[REDACTED]",
        preserveLength: true,
        excludePatterns: [{ pattern: /test/ }],
      };

      expect(() => redactumValidateOptions(options)).not.toThrow();
    });

    it("should throw for invalid category", () => {
      const options: RedactumOptions = {
        policies: ["INVALID" as any],
      };

      expect(() => redactumValidateOptions(options)).toThrow(
        "Invalid policy name: INVALID"
      );
    });

    it("should throw for invalid replacement type", () => {
      const options: RedactumOptions = {
        replacement: 123 as any,
      };

      expect(() => redactumValidateOptions(options)).toThrow(
        "Replacement must be a string or function"
      );
    });

    it("should throw for invalid exclude pattern object", () => {
      const options: RedactumOptions = {
        excludePatterns: ["not-a-regex" as any],
      };

      expect(() => redactumValidateOptions(options)).toThrow(
        "Exclude pattern must have a valid RegExp pattern"
      );
    });

    it("should accept object-based exclude patterns with policies", () => {
      const options: RedactumOptions = {
        excludePatterns: [
          {
            pattern: /admin@/,
            policies: ["EMAIL_ADDRESS"],
          },
        ],
      };

      expect(() => redactumValidateOptions(options)).not.toThrow();
    });

    it("should accept object-based exclude patterns without policies", () => {
      const options: RedactumOptions = {
        excludePatterns: [
          {
            pattern: /test@/,
          },
        ],
      };

      expect(() => redactumValidateOptions(options)).not.toThrow();
    });

    it("should throw for exclude pattern with invalid RegExp", () => {
      const options: RedactumOptions = {
        excludePatterns: [
          {
            pattern: "not-a-regex" as unknown as RegExp,
            policies: ["EMAIL_ADDRESS"],
          },
        ],
      };

      expect(() => redactumValidateOptions(options)).toThrow(
        "Exclude pattern must have a valid RegExp pattern"
      );
    });

    it("should throw for exclude pattern with invalid policy name", () => {
      const options: RedactumOptions = {
        excludePatterns: [
          {
            pattern: /test/,
            policies: ["INVALID_POLICY" as any],
          },
        ],
      };

      expect(() => redactumValidateOptions(options)).toThrow(
        "Invalid policy name in exclude pattern: INVALID_POLICY"
      );
    });

    it("should throw for exclude pattern with non-array policies", () => {
      const options: RedactumOptions = {
        excludePatterns: [
          {
            pattern: /test/,
            policies: "EMAIL_ADDRESS" as unknown as any[],
          },
        ],
      };

      expect(() => redactumValidateOptions(options)).toThrow(
        "Exclude pattern policies must be an array"
      );
    });

    it("should accept mixed global and specific exclude patterns", () => {
      const options: RedactumOptions = {
        excludePatterns: [
          { pattern: /global@/ },
          {
            pattern: /specific@/,
            policies: ["EMAIL_ADDRESS"],
          },
        ],
      };

      expect(() => redactumValidateOptions(options)).not.toThrow();
    });

    it("should accept function replacement", () => {
      const options: RedactumOptions = {
        replacement: (match, category) => `[${category}:${match.length}]`,
      };

      expect(() => redactumValidateOptions(options)).not.toThrow();
    });
  });

  describe("redactumValidatePolicy", () => {
    it("should validate correct pattern", () => {
      const pattern: Policy = {
        name: "Test Pattern",
        pattern: /test/g,
        category: PolicyCategory.CUSTOM,
        replacement: "[TEST]",
      };

      expect(() => redactumValidatePolicy(pattern)).not.toThrow();
    });

    it("should throw for missing name", () => {
      const pattern: Policy = {
        name: "",
        pattern: /test/g,
        category: PolicyCategory.CUSTOM,
      };

      expect(() => redactumValidatePolicy(pattern)).toThrow(
        "Pattern must have a valid name"
      );
    });

    it("should throw for invalid pattern", () => {
      const pattern: Policy = {
        name: "Test",
        pattern: "not-a-regex" as any,
        category: PolicyCategory.CUSTOM,
      };

      expect(() => redactumValidatePolicy(pattern)).toThrow(
        'Pattern "Test" must have a valid RegExp pattern'
      );
    });

    it("should throw for invalid category", () => {
      const pattern: Policy = {
        name: "Test",
        pattern: /test/g,
        category: "INVALID" as any,
      };

      expect(() => redactumValidatePolicy(pattern)).toThrow(
        'Pattern "Test" has invalid category: INVALID'
      );
    });

    it("should throw for invalid replacement type", () => {
      const pattern: Policy = {
        name: "Test",
        pattern: /test/g,
        category: PolicyCategory.CUSTOM,
        replacement: 123 as any,
      };

      expect(() => redactumValidatePolicy(pattern)).toThrow(
        'Pattern "Test" replacement must be a string'
      );
    });
  });
});
