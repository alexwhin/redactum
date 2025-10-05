import { describe, it, expect } from "vitest";
import { mergeConfigs } from "../../src/config/merger.js";
import type {
  RedactionConfig,
  CategoryConfig,
} from "../../src/config/types.js";
import { PolicyCategory } from "../../src/types/index.js";

type MergeableConfig = RedactionConfig & {
  env?: Record<string, RedactionConfig>;
  presets?: Record<string, RedactionConfig>;
};

describe("mergeConfigs", () => {
  describe("simple field merging", () => {
    it("should override simple string fields", () => {
      const base: RedactionConfig = {
        mask: "*",
        replacement: "[REDACTED]",
      };

      const override: RedactionConfig = {
        mask: "#",
        replacement: "[HIDDEN]",
      };

      const result = mergeConfigs(base, override);

      expect(result).toEqual({
        mask: "#",
        replacement: "[HIDDEN]",
      });
    });

    it("should preserve base fields when not overridden", () => {
      const base: RedactionConfig = {
        mask: "*",
        replacement: "[REDACTED]",
        globalMode: "replace",
      };

      const override: RedactionConfig = {
        mask: "#",
      };

      const result = mergeConfigs(base, override);

      expect(result).toEqual({
        mask: "#",
        replacement: "[REDACTED]",
        globalMode: "replace",
      });
    });

    it("should handle undefined override values", () => {
      const base: RedactionConfig = {
        mask: "*",
        preserveLength: true,
      };

      const override: RedactionConfig = {
        mask: undefined,
        preserveLength: undefined,
      };

      const result = mergeConfigs(base, override);

      expect(result).toEqual({
        mask: "*",
        preserveLength: true,
      });
    });
  });

  describe("categories merging", () => {
    it("should replace array categories entirely", () => {
      const base: RedactionConfig = {
        categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
      };

      const override: RedactionConfig = {
        categories: [PolicyCategory.SSN],
      };

      const result = mergeConfigs(base, override);

      expect(result.categories).toEqual([PolicyCategory.SSN]);
    });

    it("should merge array base with object override", () => {
      const base: RedactionConfig = {
        categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
      };

      const override: RedactionConfig = {
        categories: {
          [PolicyCategory.EMAIL]: false,
          [PolicyCategory.SSN]: true,
        } as Record<PolicyCategory, boolean>,
      };

      const result = mergeConfigs(base, override);

      expect(result.categories).toEqual({
        [PolicyCategory.EMAIL]: false,
        [PolicyCategory.PHONE]: true,
        [PolicyCategory.SSN]: true,
      });
    });

    it("should merge object categories", () => {
      const base: RedactionConfig = {
        categories: {
          [PolicyCategory.EMAIL]: true,
          [PolicyCategory.PHONE]: {
            enabled: true,
            mode: "mask",
            replacement: "[PHONE]",
          },
        } as Record<PolicyCategory, boolean | CategoryConfig>,
      };

      const override: RedactionConfig = {
        categories: {
          [PolicyCategory.EMAIL]: false,
          [PolicyCategory.PHONE]: {
            mode: "hash",
          },
          [PolicyCategory.SSN]: true,
        } as Record<PolicyCategory, boolean | CategoryConfig>,
      };

      const result = mergeConfigs(base, override);

      expect(result.categories).toEqual({
        [PolicyCategory.EMAIL]: false,
        [PolicyCategory.PHONE]: {
          enabled: true,
          mode: "hash",
          replacement: "[PHONE]",
        },
        [PolicyCategory.SSN]: true,
      });
    });

    it("should handle null/undefined categories", () => {
      const base: RedactionConfig = {
        categories: [PolicyCategory.EMAIL],
      };

      const override: RedactionConfig = {};

      const result = mergeConfigs(base, override);

      expect(result.categories).toEqual([PolicyCategory.EMAIL]);
    });
  });

  describe("customPolicies merging", () => {
    it("should merge custom patterns by name", () => {
      const base: RedactionConfig = {
        customPolicies: [
          {
            name: "Pattern1",
            pattern: "old1",
            replacement: "[OLD1]",
          },
          {
            name: "Pattern2",
            pattern: "old2",
            replacement: "[OLD2]",
          },
        ],
      };

      const override: RedactionConfig = {
        customPolicies: [
          {
            name: "Pattern1",
            pattern: "new1",
            replacement: "[NEW1]",
          },
          {
            name: "Pattern3",
            pattern: "new3",
            replacement: "[NEW3]",
          },
        ],
      };

      const result = mergeConfigs(base, override);

      expect(result.customPolicies).toEqual([
        {
          name: "Pattern1",
          pattern: "new1",
          replacement: "[NEW1]",
        },
        {
          name: "Pattern2",
          pattern: "old2",
          replacement: "[OLD2]",
        },
        {
          name: "Pattern3",
          pattern: "new3",
          replacement: "[NEW3]",
        },
      ]);
    });

    it("should handle empty custom patterns", () => {
      const base: RedactionConfig = {
        customPolicies: [
          {
            name: "Pattern1",
            pattern: "test",
          },
        ],
      };

      const override: RedactionConfig = {
        customPolicies: [],
      };

      const result = mergeConfigs(base, override);

      expect(result.customPolicies).toEqual([]);
    });
  });

  describe("nested object merging", () => {
    it("should merge hashOptions", () => {
      const base: RedactionConfig = {
        hashOptions: {
          algorithm: "sha256",
          salt: "base-salt",
          encoding: "hex",
        },
      };

      const override: RedactionConfig = {
        hashOptions: {
          algorithm: "sha512",
          encoding: "base64",
        },
      };

      const result = mergeConfigs(base, override);

      expect(result.hashOptions).toEqual({
        algorithm: "sha512",
        salt: "base-salt",
        encoding: "base64",
      });
    });

    it("should merge performance options", () => {
      const base: RedactionConfig = {
        performance: {
          maximumInputSize: 1000,
          timeout: 5000,
          cachePatterns: true,
        },
      };

      const override: RedactionConfig = {
        performance: {
          maximumInputSize: 2000,
          streamThreshold: 512,
        },
      };

      const result = mergeConfigs(base, override);

      expect(result.performance).toEqual({
        maximumInputSize: 2000,
        timeout: 5000,
        cachePatterns: true,
        streamThreshold: 512,
      });
    });

    it("should merge security options", () => {
      const base: RedactionConfig = {
        security: {
          preventRegexDos: true,
          maximumPatternLength: 500,
        },
      };

      const override: RedactionConfig = {
        security: {
          auditLog: true,
          maximumCustomPatterns: 50,
        },
      };

      const result = mergeConfigs(base, override);

      expect(result.security).toEqual({
        preventRegexDos: true,
        maximumPatternLength: 500,
        auditLog: true,
        maximumCustomPatterns: 50,
      });
    });

    it("should handle undefined nested objects in base", () => {
      const base: RedactionConfig = {};

      const override: RedactionConfig = {
        hashOptions: {
          algorithm: "sha256",
        },
        performance: {
          timeout: 10000,
        },
      };

      const result = mergeConfigs(base, override);

      expect(result.hashOptions).toEqual({
        algorithm: "sha256",
      });

      expect(result.performance).toEqual({
        timeout: 10000,
      });
    });
  });

  describe("env and presets merging", () => {
    it("should merge env configurations", () => {
      const base: MergeableConfig = {
        env: {
          development: {
            mask: "*",
          },
          production: {
            mask: "#",
          },
        },
      };

      const override: MergeableConfig = {
        env: {
          production: {
            mask: "X",
            preserveLength: true,
          },
          staging: {
            mask: "-",
          },
        },
      };

      const result = mergeConfigs(base, override) as MergeableConfig;

      expect(result.env).toEqual({
        development: {
          mask: "*",
        },
        production: {
          mask: "X",
          preserveLength: true,
        },
        staging: {
          mask: "-",
        },
      });
    });

    it("should merge presets", () => {
      const base: MergeableConfig = {
        presets: {
          strict: {
            categories: [PolicyCategory.EMAIL],
          },
        },
      };

      const override: MergeableConfig = {
        presets: {
          strict: {
            categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
            preserveLength: false,
          },
          moderate: {
            categories: [PolicyCategory.EMAIL],
          },
        },
      };

      const result = mergeConfigs(base, override) as MergeableConfig;

      expect(result.presets).toEqual({
        strict: {
          categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
          preserveLength: false,
        },
        moderate: {
          categories: [PolicyCategory.EMAIL],
        },
      });
    });
  });

  describe("locale merging", () => {
    it("should replace locale entirely", () => {
      const base: RedactionConfig = {
        locale: "en",
      };

      const override: RedactionConfig = {
        locale: ["en", "es"],
      };

      const result = mergeConfigs(base, override);

      expect(result.locale).toEqual(["en", "es"]);
    });

    it("should handle undefined locale in override", () => {
      const base: RedactionConfig = {
        locale: ["en", "fr"],
      };

      const override: RedactionConfig = {
        mask: "#",
      };

      const result = mergeConfigs(base, override);

      expect(result.locale).toEqual(["en", "fr"]);
    });
  });

  describe("complex merging scenarios", () => {
    it("should handle deep merging with multiple levels", () => {
      const base: RedactionConfig = {
        mask: "*",
        categories: {
          [PolicyCategory.EMAIL]: {
            enabled: true,
            mode: "replace",
            replacement: "[EMAIL]",
          },
        } as Record<PolicyCategory, boolean | CategoryConfig>,
        performance: {
          maximumInputSize: 1000,
          timeout: 5000,
        },
        customPolicies: [
          {
            name: "ID",
            pattern: "ID-\\d+",
          },
        ],
      };

      const override: RedactionConfig = {
        replacement: "[HIDDEN]",
        categories: {
          [PolicyCategory.EMAIL]: {
            mode: "hash",
          },
          [PolicyCategory.PHONE]: true,
        } as Record<PolicyCategory, boolean | CategoryConfig>,
        performance: {
          cachePatterns: true,
        },
        customPolicies: [
          {
            name: "ID",
            pattern: "ID-\\d{6}",
            replacement: "[ID]",
          },
        ],
      };

      const result = mergeConfigs(base, override);

      expect(result).toEqual({
        mask: "*",
        replacement: "[HIDDEN]",
        categories: {
          [PolicyCategory.EMAIL]: {
            enabled: true,
            mode: "hash",
            replacement: "[EMAIL]",
          },
          [PolicyCategory.PHONE]: true,
        },
        performance: {
          maximumInputSize: 1000,
          timeout: 5000,
          cachePatterns: true,
        },
        customPolicies: [
          {
            name: "ID",
            pattern: "ID-\\d{6}",
            replacement: "[ID]",
          },
        ],
      });
    });

    it("should handle empty objects", () => {
      const base: RedactionConfig = {};
      const override: RedactionConfig = {};

      const result = mergeConfigs(base, override);

      expect(result).toEqual({});
    });

    it("should handle all fields at once", () => {
      const base: RedactionConfig = {
        mask: "*",
        replacement: "[BASE]",
        categories: [PolicyCategory.EMAIL],
        globalMode: "replace",
        preserveLength: true,
        preserveFormat: false,
        locale: "en",
        detectLanguage: false,
      };

      const override: RedactionConfig = {
        mask: "#",
        categories: [PolicyCategory.PHONE],
        globalMode: "hash",
        preserveFormat: true,
        locale: ["en", "es"],
        detectLanguage: true,
      };

      const result = mergeConfigs(base, override);

      expect(result).toEqual({
        mask: "#",
        replacement: "[BASE]",
        categories: [PolicyCategory.PHONE],
        globalMode: "hash",
        preserveLength: true,
        preserveFormat: true,
        locale: ["en", "es"],
        detectLanguage: true,
      });
    });
  });
});
