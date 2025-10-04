import { describe, it, expect } from "vitest";
import { redactum } from "../../src/core/redactum.js";
import type { PolicyName } from "../../src/types/index.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("TAX_IDENTIFIER category", () => {
  const options = {
    policies: ["US_EIN_WITH_LABEL", "US_EIN_PREFIXED", "US_TIN_WITH_LABEL", "US_EIN", "UK_VAT_NUMBER", "EU_VAT_NUMBER", "CANADIAN_BUSINESS_NUMBER", "AUSTRALIAN_ABN", "GERMAN_TAX_NUMBER", "FRENCH_SIRET_NUMBER", "FRENCH_SIREN_NUMBER"] as PolicyName[],
  };

  describe("US Tax Identifiers", () => {
    it("should redact US EIN (Employer Identification Number)", () => {
      const text = "Our EIN is 12-3456789 for tax purposes.";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Our EIN is [EIN] for tax purposes.");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
      expect(result.findings[0]?.value).toBe("12-3456789");
    });

    it("should redact EIN with label", () => {
      const text = "EIN: 98-7654321";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[EIN]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.replacement).toBe("[EIN]");
    });

    it("should redact TIN (Taxpayer Identification Number)", () => {
      const text = "TIN 45-6789012 is required for filing.";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[TIN] is required for filing.");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
    });

    it("should handle multiple EIN formats", () => {
      const text = "EIN: 12-3456789, EIN 98-7654321, and 55-1234567";
      const result = redactum(text, options);
      
      expect(result.findings).toHaveLength(3);
      expect(result.redactedText).toBe("[EIN], [EIN], and [EIN]");
    });
  });

  describe("UK VAT Numbers", () => {
    it("should redact standard UK VAT number", () => {
      const text = "UK VAT: GB123456789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("UK VAT: [UK_VAT]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
    });

    it("should redact UK VAT with spaces", () => {
      const text = "VAT GB 123 4567 89";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("VAT [UK_VAT]");
      expect(result.findings).toHaveLength(1);
    });

    it("should redact extended UK VAT format", () => {
      const text = "Registration: GB123456789012";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Registration: [UK_VAT]");
      expect(result.findings).toHaveLength(1);
    });
  });

  describe("EU VAT Numbers", () => {
    it("should redact German VAT number", () => {
      const text = "German VAT: DE123456789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("German VAT: [EU_VAT]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
    });

    it("should redact French VAT number", () => {
      const text = "France VAT FR12345678901";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("France VAT [EU_VAT]");
      expect(result.findings).toHaveLength(1);
    });

    it("should redact multiple EU VAT numbers", () => {
      const text = "Partners: IT12345678901, ES123456789, NL123456789B01";
      const result = redactum(text, options);
      
      expect(result.findings).toHaveLength(3);
      expect(result.redactedText).toBe("Partners: [EU_VAT], [EU_VAT], [EU_VAT]");
    });

    it("should handle all EU country codes", () => {
      const euCountries = [
        "AT123456789", "BE123456789", "BG123456789", "CY123456789",
        "CZ123456789", "DE123456789", "DK123456789", "EE123456789",
        "ES123456789", "FI123456789", "FR12345678901", "GR123456789",
        "HR123456789", "HU123456789", "IE123456789", "IT12345678901",
        "LT123456789", "LU123456789", "LV123456789", "MT123456789",
        "NL123456789B01", "PL123456789", "PT123456789", "RO123456789",
        "SE123456789", "SI123456789", "SK123456789"
      ];

      for (const vatNumber of euCountries) {
        const result = redactum(`VAT: ${vatNumber}`, options);
        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
        expect(result.redactedText).toBe("VAT: [EU_VAT]");
      }
    });
  });

  describe("Canadian Business Numbers", () => {
    it("should redact Canadian BN (9 digits)", () => {
      const text = "Canadian BN: 123456789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Canadian BN: [CA_BN]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
    });

    it("should redact Canadian BN with program account", () => {
      const text = "BN: 123456789 RT0001";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("BN: [CA_BN]");
      expect(result.findings).toHaveLength(1);
    });

    it("should redact spaced Canadian BN", () => {
      const text = "Business Number: 123456789RT0001";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Business Number: [CA_BN]");
      expect(result.findings).toHaveLength(1);
    });
  });

  describe("Australian ABN", () => {
    it("should redact Australian ABN", () => {
      const text = "ABN: 12 345 678 901";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("ABN: [AU_ABN]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
    });

    it("should redact ABN without spaces", () => {
      const text = "Australian ABN 12345678901";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Australian ABN [AU_ABN]");
      expect(result.findings).toHaveLength(1);
    });
  });

  describe("German Tax Numbers", () => {
    it("should redact German tax number", () => {
      const text = "Tax ID: 12/345/67890";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Tax ID: [DE_TAX_ID]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
    });
  });

  describe("French Tax Identifiers", () => {
    it("should redact French SIRET number", () => {
      const text = "SIRET: 123 456 789 01234";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("SIRET: [FR_SIRET]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
    });

    it("should redact French SIREN number", () => {
      const text = "SIREN: 123 456 789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("SIREN: [FR_SIREN]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.TAX_IDENTIFIER);
    });

    it("should redact SIRET without spaces", () => {
      const text = "Company SIRET 12345678901234";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Company SIRET [FR_SIRET]");
      expect(result.findings).toHaveLength(1);
    });
  });

  describe("Mixed tax identifiers", () => {
    it("should redact multiple different tax IDs in one text", () => {
      const text = `
        US Company EIN: 12-3456789
        UK VAT: GB123456789
        German VAT: DE987654321
        Canadian BN: 987654321
        Australian ABN: 98 765 432 109
      `;
      
      const result = redactum(text, options);
      
      expect(result.findings).toHaveLength(5);
      expect(result.findings.every(f => f.category === PolicyCategory.TAX_IDENTIFIER)).toBe(true);
      
      expect(result.redactedText).toContain("[EIN]");
      expect(result.redactedText).toContain("[UK_VAT]");
      expect(result.redactedText).toContain("[EU_VAT]");
      expect(result.redactedText).toContain("[CA_BN]");
      expect(result.redactedText).toContain("[AU_ABN]");
    });
  });

  describe("Edge cases", () => {
    it("should not redact invalid EIN format", () => {
      const text = "Invalid: 123-456789 or 1-23456789";
      const result = redactum(text, options);
      
      expect(result.findings).toHaveLength(0);
      expect(result.redactedText).toBe(text);
    });

    it("should not redact partial matches", () => {
      const text = "Phone: +12-3456789 looks like EIN but isn't";
      const result = redactum(text, options);
      
      expect(result.findings).toHaveLength(0);
      expect(result.redactedText).toBe(text);
    });

    it("should handle tax IDs in context", () => {
      const text = "For tax filing, use EIN 12-3456789 and include form 941.";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("For tax filing, use [EIN] and include form 941.");
      expect(result.findings).toHaveLength(1);
    });
  });

  describe("Performance with large text", () => {
    it("should efficiently process text with many tax IDs", () => {
      const taxIds = Array.from({ length: 100 }, (_, i) => {
        const prefix = 10 + (i % 90); // Keep prefix between 10-99
        const suffix = String(i).padStart(7, "0");

        return `EIN: ${prefix}-${suffix}`;
      });
      const text = taxIds.join(" ");
      
      const start = Date.now();
      const result = redactum(text, options);
      const duration = Date.now() - start;
      
      expect(result.findings).toHaveLength(100);
      expect(duration).toBeLessThan(100); // Should process quickly
    });
  });
});