import { describe, it, expect } from "vitest";
import type {
  UniversalRedactionConfig,
  UniversalRedactionResult,
} from "../../../src/providers/base/types.js";
import { PolicyCategory } from "../../../src/types/index.js";

describe("Provider Types", () => {
  it("should have correct UniversalRedactionConfig structure", () => {
    const config: UniversalRedactionConfig = {
      policies: ["EMAIL_ADDRESS"],
      customPolicies: [],
      replacement: "[REDACTED]",
      preserveLength: false,
      excludePatterns: [],
    };

    expect(config.policies).toContain("EMAIL_ADDRESS");
    expect(config.replacement).toBe("[REDACTED]");
  });

  it("should have correct UniversalRedactionResult structure", () => {
    const result: UniversalRedactionResult = {
      content: "redacted text",
      redactionResult: {
        text: "test@example.com",
        redactedText: "redacted text",
        findings: [
          {
            category: PolicyCategory.EMAIL,
            policyName: "EMAIL_ADDRESS",
            value: "test@example.com",
            match: "test@example.com",
            start: 0,
            end: 16,
            replacement: "[EMAIL]",
          },
        ],
        stats: {
          totalFindings: 1,
          findingsByCategory: {
            [PolicyCategory.EMAIL]: 1,
          } as Record<PolicyCategory, number>,
          processingTimeMs: 10,
        },
      },
      providerMetadata: { source: "test" },
      processingTime: 10,
    };

    expect(result.content).toBe("redacted text");
    expect(result.redactionResult.findings).toHaveLength(1);
    expect(result.providerMetadata).toHaveProperty("source");
  });

  it("should allow optional metadata", () => {
    const result: UniversalRedactionResult = {
      content: "test",
      redactionResult: {
        text: "test",
        redactedText: "test",
        findings: [],
        stats: {
          totalFindings: 0,
          findingsByCategory: {} as Record<PolicyCategory, number>,
          processingTimeMs: 1,
        },
      },
      processingTime: 1,
    };

    expect(result.providerMetadata).toBeUndefined();
  });
});
