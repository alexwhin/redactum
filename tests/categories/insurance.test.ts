import { describe, it, expect } from "vitest";
import { redactum } from "../../src/core/redactum.js";
import type { PolicyName } from "../../src/types/index.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("INSURANCE category", () => {
  const options = {
    policies: ["AUTO_INSURANCE_POLICY", "HOME_INSURANCE_POLICY", "LIFE_INSURANCE_POLICY", "TRAVEL_INSURANCE_POLICY", "WORKERS_COMPENSATION_CLAIM", "DISABILITY_INSURANCE_POLICY", "DENTAL_INSURANCE_POLICY", "VISION_INSURANCE_POLICY", "US_HEALTH_INSURANCE_POLICY", "US_INSURANCE_GROUP_NUMBER", "US_INSURANCE_CLAIM_NUMBER", "MEDICARE_NUMBER_US", "MEDICAID_NUMBER_US", "BCBS_MEMBER_ID", "AETNA_MEMBER_ID", "UNITEDHEALTH_MEMBER_ID", "UK_NHS_NUMBER", "CANADIAN_HEALTH_CARD", "AUSTRALIAN_MEDICARE_NUMBER", "GERMAN_HEALTH_INSURANCE_NUMBER", "FRENCH_SOCIAL_SECURITY_NUMBER", "EUROPEAN_HEALTH_INSURANCE_CARD"] as PolicyName[],
  };

  describe("US Health Insurance", () => {
    it("should redact health insurance policy numbers", () => {
      const text = "Your policy: ABC123456789.";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Your [INSURANCE_POLICY].");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
      expect(result.findings[0]?.value).toBe("policy: ABC123456789");
    });

    it("should redact insurance group numbers", () => {
      const text = "Group: GRP123456";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[INSURANCE_GROUP]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact insurance claim numbers", () => {
      const text = "Claim #: CLM123456789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[INSURANCE_CLAIM]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact Medicare numbers", () => {
      const text = "Medicare: 123-45-6789-A1";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Medicare: [MEDICARE_NUMBER]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
      expect(result.findings[0]?.value).toBe("123-45-6789-A1");
    });

    it("should redact Medicaid numbers", () => {
      const text = "Medicaid: MCD123456789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[MEDICAID_NUMBER]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });
  });

  describe("US Insurance Providers", () => {
    it("should redact Blue Cross Blue Shield member IDs", () => {
      const text = "BCBS: ABC123456789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[BCBS_MEMBER_ID]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact Aetna member IDs", () => {
      const text = "Aetna: A123456789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[AETNA_MEMBER_ID]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact UnitedHealth member IDs", () => {
      const text = "UHC: 123456789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[UHC_MEMBER_ID]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });
  });

  describe("Property and Auto Insurance", () => {
    it("should redact auto insurance policy numbers", () => {
      const text = "Auto policy: AUTO123456";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[AUTO_POLICY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact car insurance policy numbers", () => {
      const text = "Car policy: CAR987654321";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[AUTO_POLICY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact home insurance policy numbers", () => {
      const text = "Home policy #: HOME123456";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[HOME_POLICY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact property insurance policy numbers", () => {
      const text = "Property policy: PROP987654";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[HOME_POLICY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });
  });

  describe("Life and Specialized Insurance", () => {
    it("should redact life insurance policy numbers", () => {
      const text = "Life policy: LIFE123456";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[LIFE_POLICY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact travel insurance policy numbers", () => {
      const text = "Travel policy: TRAV123456";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[TRAVEL_POLICY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact workers compensation claims", () => {
      const text = "Workers comp claim: WC123456";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[WC_CLAIM]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact disability insurance policies", () => {
      const text = "Disability policy: DIS123456";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[DISABILITY_POLICY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact dental insurance policies", () => {
      const text = "Dental policy: DENT123456";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[DENTAL_POLICY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });

    it("should redact vision insurance policies", () => {
      const text = "Vision policy: VIS123456";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[VISION_POLICY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });
  });

  describe("International Health Insurance", () => {
    it("should redact UK NHS numbers", () => {
      const text = "NHS number: 123 456 7890";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("NHS number: [NHS_NUMBER]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
      expect(result.findings[0]?.value).toBe("123 456 7890");
    });

    it("should redact Canadian health card numbers", () => {
      const text = "Health card: 1234 567 890";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Health card: [CA_HEALTH_CARD]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
      expect(result.findings[0]?.value).toBe("1234 567 890");
    });

    it("should redact Australian Medicare numbers", () => {
      const text = "Medicare: 1234 56789 0";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("Medicare: [AU_MEDICARE]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
      expect(result.findings[0]?.value).toBe("1234 56789 0");
    });

    it("should redact German health insurance numbers", () => {
      const text = "German health: A123456789";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("German health: [DE_HEALTH_INSURANCE]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
      expect(result.findings[0]?.value).toBe("A123456789");
    });

    it("should redact French social security numbers", () => {
      const text = "French SS: 123456789012345";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("French SS: [FR_SOCIAL_SECURITY]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
      expect(result.findings[0]?.value).toBe("123456789012345");
    });

    it("should redact European Health Insurance Card numbers", () => {
      const text = "EHIC: 123456789012";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("[EHIC_NUMBER]");
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
    });
  });

  describe("Mixed insurance identifiers", () => {
    it("should redact multiple different insurance IDs in one text", () => {
      const text = `
        Health policy: ABC123456789
        Medicare: 123-45-6789-A1
        Auto policy: AUTO987654
        NHS number: 987 654 3210
        EHIC: 567890123456
      `;
      
      const result = redactum(text, options);
      
      expect(result.findings).toHaveLength(5);
      expect(result.findings.every(f => f.category === PolicyCategory.INSURANCE)).toBe(true);
      
      expect(result.redactedText).toContain("[INSURANCE_POLICY]");
      expect(result.redactedText).toContain("[MEDICARE_NUMBER]");
      expect(result.redactedText).toContain("[AUTO_POLICY]");
      expect(result.redactedText).toContain("[NHS_NUMBER]");
      expect(result.redactedText).toContain("[EHIC_NUMBER]");
    });
  });

  describe("Edge cases", () => {
    it("should not redact partial matches", () => {
      const text = "This is not a policy 123 number";
      const result = redactum(text, options);
      
      expect(result.findings).toHaveLength(0);
      expect(result.redactedText).toBe(text);
    });

    it("should not redact invalid Medicare format", () => {
      const text = "Invalid: 123-45-67890-A1 or 12-345-6789-A";
      const result = redactum(text, options);
      
      expect(result.findings).toHaveLength(0);
      expect(result.redactedText).toBe(text);
    });

    it("should handle insurance IDs in context", () => {
      const text = "For your claim, reference policy: ABC123456789 when calling.";
      const result = redactum(text, options);
      
      expect(result.redactedText).toBe("For your claim, reference [INSURANCE_POLICY] when calling.");
      expect(result.findings).toHaveLength(1);
    });

    it("should handle case variations", () => {
      const text = "policy: ABC123456 and POLICY: DEF789012";
      const result = redactum(text, options);
      
      expect(result.findings).toHaveLength(2);
      expect(result.redactedText).toBe("[INSURANCE_POLICY] and [INSURANCE_POLICY]");
    });
  });

  describe("Performance with large text", () => {
    it("should efficiently process text with many insurance IDs", () => {
      const insuranceIds = Array.from({ length: 50 }, (_, i) => 
        `Policy: ABC${String(i).padStart(9, "0")}`
      );
      const text = insuranceIds.join(" ");
      
      const start = Date.now();
      const result = redactum(text, options);
      const duration = Date.now() - start;
      
      expect(result.findings).toHaveLength(50);
      expect(duration).toBeLessThan(100);
    });
  });

  describe("Format variations", () => {
    it("should handle different policy format styles", () => {
      const variations = [
        "policy: ABC123456",
        "policy #: ABC123456", 
        "policy#: ABC123456",
        "policy = ABC123456",
        "member: ABC123456",
        "member #: ABC123456"
      ];

      for (const variation of variations) {
        const result = redactum(variation, options);
        expect(result.findings).toHaveLength(1);
        expect(result.findings[0]?.category).toBe(PolicyCategory.INSURANCE);
      }
    });

    it("should handle spacing variations in health card numbers", () => {
      const variations = [
        "123 456 7890",    // spaces
        "1234567890",      // no spaces  
        "123-456-7890"     // dashes (should not match NHS pattern)
      ];

      const nhsResults = variations.map(v => redactum(`NHS: ${v}`, options));
      
      expect(nhsResults[0]?.findings).toHaveLength(1); // spaces - matches
      expect(nhsResults[1]?.findings).toHaveLength(1); // no spaces - matches
      expect(nhsResults[2]?.findings).toHaveLength(0); // dashes - doesn't match NHS pattern
    });
  });
});