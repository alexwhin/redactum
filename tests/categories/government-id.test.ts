import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("government id patterns", () => {
  const governmentIdPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.GOVERNMENT_ID,
  );

  it("should have government ID patterns", () => {
    expect(governmentIdPatterns.length).toBeGreaterThan(0);
  });

  describe("US_DRIVER_LICENSE", () => {
    const pattern = governmentIdPatterns.find(
      (p) => p.name === "US_DRIVER_LICENSE",
    );

    it("should detect US driver license numbers", () => {
      expect(pattern).toBeTruthy();
      expect("D12345678".match(pattern!.pattern)).toBeTruthy();
      expect("AB1234567".match(pattern!.pattern)).toBeTruthy();
      expect("A123456".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid license numbers", () => {
      expect("D12345".match(pattern!.pattern)).toBeFalsy();
      expect("ABC12345".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("US_PASSPORT_NUMBER", () => {
    const pattern = governmentIdPatterns.find(
      (p) => p.name === "US_PASSPORT_NUMBER",
    );

    it("should detect US passport numbers", () => {
      expect(pattern).toBeTruthy();
      expect("M12345678".match(pattern!.pattern)).toBeTruthy();
      expect("123456789".match(pattern!.pattern)).toBeTruthy();
      expect("passport 123456789".match(pattern!.pattern)).toBeTruthy();
      expect("passport: A12345678".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid passport numbers", () => {
      expect("12345678".match(pattern!.pattern)).toBeFalsy();
      expect("ABCDEFGHI".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("NATIONAL_ID", () => {
    const pattern = governmentIdPatterns.find((p) => p.name === "NATIONAL_ID");

    it("should detect national ID numbers", () => {
      expect(pattern).toBeTruthy();
      expect("National ID: ID123456789".match(pattern!.pattern)).toBeTruthy();
      expect("citizen-id ABC12345678".match(pattern!.pattern)).toBeTruthy();
      expect("national_id: XYZ123456".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid national IDs", () => {
      expect("National ID: 123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const licensePattern = governmentIdPatterns.find(
      (p) => p.name === "US_DRIVER_LICENSE",
    );

    expect("regular text".match(licensePattern!.pattern)).toBeFalsy();
  });
});
