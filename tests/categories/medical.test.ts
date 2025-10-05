import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("medical patterns", () => {
  const medicalPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.MEDICAL,
  );

  it("should have medical patterns", () => {
    expect(medicalPatterns.length).toBeGreaterThan(0);
  });

  describe("MEDICAL_RECORD_NUMBER", () => {
    const pattern = medicalPatterns.find(
      (p) => p.name === "MEDICAL_RECORD_NUMBER",
    );

    it("should detect medical record numbers", () => {
      expect(pattern).toBeTruthy();
      expect("MRN-123456".match(pattern!.pattern)).toBeTruthy();
      expect("mrn: ABC123456".match(pattern!.pattern)).toBeTruthy();
      expect("MRN 123456789012".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid MRN formats", () => {
      expect("MRN-12345".match(pattern!.pattern)).toBeFalsy();
      expect("MRN".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("HEALTH_INSURANCE_ID", () => {
    const pattern = medicalPatterns.find(
      (p) => p.name === "HEALTH_INSURANCE_ID",
    );

    it("should detect health insurance IDs", () => {
      expect(pattern).toBeTruthy();
      expect("Insurance HIB123456789".match(pattern!.pattern)).toBeTruthy();
      expect("policy: ABC12345678".match(pattern!.pattern)).toBeTruthy();
      expect("insurance-ID12345678901".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid insurance IDs", () => {
      expect("Insurance 1234567".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const mrnPattern = medicalPatterns.find(
      (p) => p.name === "MEDICAL_RECORD_NUMBER",
    );

    expect("regular text".match(mrnPattern!.pattern)).toBeFalsy();
  });
});
