import { describe, it, expect } from "vitest";
import {
  redactum
} from "../../src/index.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("Redactum and Functional API", () => {
  describe("functional API - basic functionality", () => {
    it("should redact all PII types by default", () => {
      const text = `
        Email: john@example.com
        Phone: (555) 123-4567
        SSN: 123-45-6789
        IP: 192.168.1.1
        DOB: 01/15/1990
        Address: 123 Main Street
        Name: John Doe
        API Key: sk-abcd1234567890abcdef1234567890abcdef123456
      `;
      const result = redactum(text);

      expect(result.redactedText).toContain("[EMAIL]");
      expect(result.redactedText).toContain("[PHONE]");
      expect(result.redactedText).toContain("[SSN]");
      expect(result.redactedText).toContain("[IP]");
      expect(result.redactedText).toContain("[DOB]");
      expect(result.redactedText).toContain("[ADDRESS]");
      expect(result.redactedText).toContain("[NAME]");
      expect(result.redactedText).toContain("[OPENAI_KEY]");
      expect(result.stats.totalFindings).toBeGreaterThanOrEqual(8);
    });

    it("should redact email addresses", () => {
      const result = redactum("Contact me at john@example.com");

      expect(result.redactedText).toBe("Contact me at [EMAIL]");
      expect(result.stats.totalFindings).toBe(1);
      expect(result.stats.findingsByCategory[PolicyCategory.EMAIL]).toBe(1);
    });

    it("should redact phone numbers", () => {
      const result = redactum("Call me at (555) 123-4567");

      expect(result.redactedText).toBe("Call me at [PHONE]");
      expect(result.stats.totalFindings).toBe(1);
    });

    it("should redact multiple PII types", () => {
      const text = "Email: test@example.com, Phone: 555-123-4567";
      const result = redactum(text);

      expect(result.redactedText).toBe("Email: [EMAIL], Phone: [PHONE]");
      expect(result.stats.totalFindings).toBe(2);
    });
  });

  describe("functional API - custom options", () => {
    it("should use custom replacement", () => {
      const result = redactum("My email is test@example.com", { replacement: "***" });

      expect(result.redactedText).toBe("My email is ***");
    });

    it("should preserve length when enabled", () => {
      const result = redactum("test@example.com", { preserveLength: true });

      expect(result.redactedText).toHaveLength("test@example.com".length);
      expect(result.redactedText).toMatch(/^\[EMAIL\]\*+$/);
    });

    it("should only redact specified categories", () => {
      const result = redactum("Email: test@example.com, Phone: 555-123-4567", {
        policies: ["EMAIL_ADDRESS"],
      });

      expect(result.redactedText).toBe("Email: [EMAIL], Phone: 555-123-4567");
      expect(result.stats.totalFindings).toBe(1);
    });
  });

  describe("functional API - edge cases", () => {
    describe("empty and invalid inputs", () => {
      it("should handle empty string", () => {
        const result = redactum("");

        expect(result.redactedText).toBe("");
        expect(result.findings).toHaveLength(0);
        expect(result.stats.totalFindings).toBe(0);
      });

      it("should handle whitespace only", () => {
        const result = redactum("   \n\t  ");

        expect(result.redactedText).toBe("   \n\t  ");
        expect(result.findings).toHaveLength(0);
      });

      it("should handle very long text", () => {
        const longText = `${"No PII here. ".repeat(1000)  }Contact: test@example.com`;
        const result = redactum(longText);

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.category).toBe(PolicyCategory.EMAIL);
      });
    });

    describe("overlapping patterns", () => {
      it("should handle overlapping matches correctly", () => {
        const result = redactum("My email is test@192.168.1.1.com");

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.category).toBe(PolicyCategory.EMAIL);
      });

      it("should handle adjacent patterns", () => {
        const result = redactum("test@example.com 192.168.1.1");

        expect(result.findings).toHaveLength(2);
        const categories = result.findings.map(f => f.category);
        expect(categories).toContain(PolicyCategory.EMAIL);
        expect(categories).toContain(PolicyCategory.IP_ADDRESS);
      });
    });

    describe("pattern at string boundaries", () => {
      it("should detect pattern at start of string", () => {
        const result = redactum("test@example.com is my email");

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.start).toBe(0);
      });

      it("should detect pattern at end of string", () => {
        const result = redactum("My email is test@example.com");

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.end).toBe("My email is test@example.com".length);
      });
    });

    describe("custom replacement functions", () => {
      it("should handle custom replacement function", () => {
        const result = redactum("Email: test@example.com", {
          replacement: (match, category) => `<${category}:${match.length}>`,
        });
        expect(result.redactedText).toBe("Email: <EMAIL:16>");
      });

      it("should handle errors in replacement function gracefully", () => {
        expect(() => {
          redactum("test@example.com", {
            replacement: () => {
              throw new Error("Replacement function error");
            },
          });
        }).toThrow();
      });
    });

    describe("exclude patterns", () => {
      it("should exclude patterns globally without policies field", () => {
        const result = redactum("Email: test@example.com and user@domain.com", {
          excludePatterns: [{ pattern: /test@example\.com/ }],
        });

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.value).toBe("user@domain.com");
      });

      it("should exclude patterns for specific policies only", () => {
        const result = redactum("Contact: admin@company.com and SSN: 123-45-6789", {
          excludePatterns: [
            {
              pattern: /admin@company\.com/,
              policies: ["EMAIL_ADDRESS"],
            },
          ],
        });

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.policyName).toBe("SSN");
      });

      it("should support multiple policy-specific exclusions", () => {
        const result = redactum("Email: noreply@company.com, Phone: 555-000-0000, Other: test@example.com, Phone: 555-123-4567", {
          excludePatterns: [
            {
              pattern: /noreply@/,
              policies: ["EMAIL_ADDRESS"],
            },
            {
              pattern: /555-000-0000/,
              policies: ["PHONE_NUMBER_US"],
            },
          ],
        });

        expect(result.findings).toHaveLength(2);
        expect(result.findings.map(f => f.value)).toContain("test@example.com");
        expect(result.findings.map(f => f.value)).toContain("555-123-4567");
      });

      it("should apply global exclusions when policies array is empty", () => {
        const result = redactum("Email: public@example.com and private@example.com", {
          excludePatterns: [
            {
              pattern: /public@/,
              policies: [],
            },
          ],
        });

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.value).toBe("private@example.com");
      });

      it("should apply global exclusions when policies is undefined", () => {
        const result = redactum("Email: test@example.com and user@example.com", {
          excludePatterns: [
            {
              pattern: /test@/,
            },
          ],
        });

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.value).toBe("user@example.com");
      });

      it("should support mixing global and policy-specific exclusions", () => {
        const result = redactum("Email: global-exclude@example.com, Phone: 555-000-1234, Email: test@example.com", {
          excludePatterns: [
            { pattern: /global-exclude@/ },
            {
              pattern: /555-000-/,
              policies: ["PHONE_NUMBER_US"],
            },
          ],
        });

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.value).toBe("test@example.com");
      });

      it("should not exclude from policies not in the exclusion list", () => {
        const result = redactum("Phone: 555-123-4567", {
          excludePatterns: [
            {
              pattern: /555/,
              policies: ["EMAIL_ADDRESS"],
            },
          ],
        });

        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.policyName).toBe("PHONE_NUMBER_US");
      });
    });

    describe("preserve length edge cases", () => {
      it("should handle preserve length with short replacement", () => {
        const result = redactum("test@example.com", {
          preserveLength: true,
          replacement: "X",
        });

        expect(result.redactedText).toHaveLength("test@example.com".length);
        expect(result.redactedText).toBe("X***************");
      });

      it("should handle preserve length with long replacement", () => {
        const result = redactum("a@b.co", {
          preserveLength: true,
          replacement: "VERY_LONG_REPLACEMENT",
        });

        expect(result.redactedText).toHaveLength("a@b.co".length);
        expect(result.redactedText).toBe("VERY_L");
      });
    });

    describe("performance with many patterns", () => {
      it("should handle text with many potential matches efficiently", () => {
        const textWithManyPatterns = `
        Email: user1@example.com, user2@test.org
        Phones: (555) 123-4567, 555-987-6543
        IPs: 192.168.1.1, 10.0.0.1, 172.16.0.1
        Cards: 4111111111111111, 5555555555554444
        APIs: sk-abcd1234567890abcdef1234567890abcdef123456
      `;

        const startTime = Date.now();
        const result = redactum(textWithManyPatterns);
        const endTime = Date.now();

        expect(result.findings.length).toBeGreaterThan(5);
        expect(endTime - startTime).toBeLessThan(100);
      });
    });

  });

  describe("functional API - advanced features", () => {
    it("should extract redacted text", () => {
      const result = redactum("Contact me at john@example.com");
      expect(result.redactedText).toBe("Contact me at [EMAIL]");
    });

    it("should handle custom patterns via options", () => {
      const result = redactum("Employee EMP-123456 started today", {
        customPolicies: [{
          name: "Employee ID",
          pattern: /EMP-\d{6}/g,
          category: PolicyCategory.CUSTOM,
          replacement: "[EMP_ID]",
        }]
      });

      expect(result.findings).toHaveLength(1);
      expect(result.redactedText).toBe("Employee [EMP_ID] started today");
    });

    it("should support selective policies via options", () => {
      const result = redactum("Email: test@example.com Phone: 555-123-4567", {
        policies: ["EMAIL_ADDRESS"],
      });

      expect(result.redactedText).toBe("Email: [EMAIL] Phone: 555-123-4567");
    });

    it("should support multiple custom patterns independently", () => {
      const result1 = redactum("CUSTOM1-123 CUSTOM2-456", {
        customPolicies: [{
          name: "Pattern1",
          pattern: /CUSTOM1-\d+/g,
          category: PolicyCategory.CUSTOM,
          replacement: "[P1]",
        }]
      });

      const result2 = redactum("CUSTOM1-123 CUSTOM2-456", {
        customPolicies: [{
          name: "Pattern2",
          pattern: /CUSTOM2-\d+/g,
          category: PolicyCategory.CUSTOM,
          replacement: "[P2]",
        }]
      });

      expect(result1.redactedText).toBe("[P1] CUSTOM2-456");
      expect(result2.redactedText).toBe("CUSTOM1-123 [P2]");
    });
  });

  describe("createRedactum", () => {
    it("should create a stateful redactor instance", async () => {
      const { createRedactum } = await import("../../src/core/redactum.js");
      const redactor = createRedactum({
        policies: ["EMAIL_ADDRESS"]
      });

      const result = redactor.redactum("Email: john@example.com");
      expect(result.redactedText).toBe("Email: [EMAIL]");
    });

    it("should support adding custom patterns dynamically", async () => {
      const { createRedactum } = await import("../../src/core/redactum.js");
      const redactor = createRedactum();

      redactor.addCustomPattern({
        name: "CustomID",
        pattern: /ID-\d{6}/g,
        category: PolicyCategory.CUSTOM,
        replacement: "[ID]"
      });

      const result = redactor.redactum("User ID-123456");
      expect(result.redactedText).toContain("[ID]");
    });

    it("should support removing custom patterns", async () => {
      const { createRedactum } = await import("../../src/core/redactum.js");
      const redactor = createRedactum();

      redactor.addCustomPattern({
        name: "CustomID",
        pattern: /ID-\d{6}/g,
        category: PolicyCategory.CUSTOM,
        replacement: "[ID]"
      });

      const removed = redactor.removeCustomPattern("CustomID");
      expect(removed).toBe(true);
    });

    it("should support updating options", async () => {
      const { createRedactum } = await import("../../src/core/redactum.js");
      const redactor = createRedactum({
        policies: ["EMAIL_ADDRESS"]
      });

      redactor.updateOptions({ policies: ["PHONE_NUMBER_US"] });

      const result = redactor.redactum("Email: john@example.com Phone: 555-123-4567");
      expect(result.redactedText).toContain("[PHONE]");
      expect(result.redactedText).toContain("john@example.com");
    });
  });

});