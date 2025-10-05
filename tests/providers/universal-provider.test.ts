import { describe, it, expect } from "vitest";
import { UniversalProvider } from "../../src/providers/index.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("UniversalProvider", () => {
  it("should redact text directly", () => {
    const provider = new UniversalProvider({
      policies: ["EMAIL_ADDRESS"],
    });

    const result = provider.redact("Contact me at test@example.com");
    expect(result.content).toBe("Contact me at [EMAIL]");
    expect(result.redactionResult.findings).toHaveLength(1);
  });

  it("should handle custom patterns", () => {
    const provider = new UniversalProvider({
      customPolicies: [
        {
          name: "Custom ID",
          pattern: /CUST-\d{4}/g,
          replacement: "[CUSTOMER_ID]",
          category: PolicyCategory.CUSTOM,
        },
      ],
    });

    const result = provider.redact("User CUST-1234 logged in");
    expect(result.content).toBe("User [CUSTOMER_ID] logged in");
  });

  it("should handle multiple categories", () => {
    const provider = new UniversalProvider({
      policies: [
        "EMAIL_ADDRESS",
        "PHONE_NUMBER_US",
        "PHONE_NUMBER_UK",
        "PHONE_NUMBER_CANADIAN",
        "PHONE_NUMBER_INTERNATIONAL",
      ],
    });

    const result = provider.redact(
      "Email: test@example.com, Phone: 555-123-4567"
    );
    expect(result.content).toBe("Email: [EMAIL], Phone: [PHONE]");
    expect(result.redactionResult.findings).toHaveLength(2);
  });

  it("should preserve metadata", () => {
    const provider = new UniversalProvider();
    const result = provider.redact({
      content: "test",
      metadata: { source: "test.txt" },
    });

    expect(result.providerMetadata).toEqual({ source: "test.txt" });
  });

  it("should include redaction statistics", () => {
    const provider = new UniversalProvider({
      policies: ["EMAIL_ADDRESS"],
    });

    const result = provider.redact("test@example.com and another@example.com");
    expect(result.redactionResult.stats.totalFindings).toBe(2);
    expect(
      result.redactionResult.stats.findingsByCategory[PolicyCategory.EMAIL]
    ).toBe(2);
    expect(result.processingTime).toBeGreaterThanOrEqual(0);
  });
});
