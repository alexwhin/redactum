import { describe, it, expect } from "vitest";
import { BaseAdapter } from "../../../src/providers/adapters/base-adapter.js";
import type { PolicyName } from "../../../src/types/index.js";
import { PolicyCategory } from "../../../src/types/index.js";

class TestAdapter extends BaseAdapter<string, string> {
  readonly providerName = "TestProvider";
  readonly version = "1.0.0";

  async transform(input: string): Promise<string> {
    const result = this.provider.redact({ content: input });

    return result.content as string;
  }
}

describe("BaseAdapter", () => {
  it("should initialize with redaction config", () => {
    const adapter = new TestAdapter({
      policies: ["EMAIL_ADDRESS"] as PolicyName[],
    });

    expect(adapter).toBeInstanceOf(BaseAdapter);
  });

  it("should transform input through provider", async () => {
    const adapter = new TestAdapter({
      policies: ["EMAIL_ADDRESS"] as PolicyName[],
    });

    const result = await adapter.transform("Contact me at test@example.com");
    expect(result).toBe("Contact me at [EMAIL]");
  });

  it("should handle custom patterns", async () => {
    const adapter = new TestAdapter({
      customPolicies: [
        {
          name: "Custom ID",
          pattern: /CUST-\d{4}/g,
          replacement: "[CUSTOMER_ID]",
          category: PolicyCategory.CUSTOM,
        },
      ],
    });

    const result = await adapter.transform("User CUST-1234 logged in");
    expect(result).toBe("User [CUSTOMER_ID] logged in");
  });

  it("should use default replacement when specified", async () => {
    const adapter = new TestAdapter({
      policies: ["EMAIL_ADDRESS"] as PolicyName[],
      replacement: "[HIDDEN]",
    });

    const result = await adapter.transform("Email: test@example.com");
    expect(result).toBe("Email: [HIDDEN]");
  });

  it("should handle multiple categories", async () => {
    const adapter = new TestAdapter({
      policies: [
        "EMAIL_ADDRESS",
        "PHONE_NUMBER_US",
        "PHONE_NUMBER_UK",
        "PHONE_NUMBER_CANADIAN",
        "PHONE_NUMBER_INTERNATIONAL",
      ] as PolicyName[],
    });

    const result = await adapter.transform(
      "Email: test@example.com, Phone: 555-123-4567"
    );
    expect(result).toBe("Email: [EMAIL], Phone: [PHONE]");
  });
});
