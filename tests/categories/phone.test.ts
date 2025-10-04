import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("phone patterns", () => {
  const phonePatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.PHONE,
  );

  it("should have phone patterns", () => {
    expect(phonePatterns.length).toBeGreaterThan(0);
  });

  describe("PHONE_NUMBER_UK", () => {
    const pattern = phonePatterns.find((p) => p.name === "PHONE_NUMBER_UK");

    it("should detect UK phone numbers with +44", () => {
      expect(pattern).toBeTruthy();
      expect("+442071234567".match(pattern!.pattern)).toBeTruthy();
      expect("+441234567890".match(pattern!.pattern)).toBeTruthy();
    });

    it("should detect UK phone numbers with 0", () => {
      expect("02071234567".match(pattern!.pattern)).toBeTruthy();
      expect("01234567890".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid UK phone numbers", () => {
      expect("+4400000000".match(pattern!.pattern)).toBeFalsy();
      expect("0123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PHONE_NUMBER_CANADIAN", () => {
    const pattern = phonePatterns.find(
      (p) => p.name === "PHONE_NUMBER_CANADIAN",
    );

    it("should detect Canadian phone numbers", () => {
      expect(pattern).toBeTruthy();
      expect("+1-416-555-0123".match(pattern!.pattern)).toBeTruthy();
      expect("1 416 555 0123".match(pattern!.pattern)).toBeTruthy();
      expect("(416) 555-0123".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Canadian phone numbers", () => {
      expect("+1-111-555-0123".match(pattern!.pattern)).toBeFalsy();
      expect("123-456-7890".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PHONE_NUMBER_INTERNATIONAL", () => {
    const pattern = phonePatterns.find(
      (p) => p.name === "PHONE_NUMBER_INTERNATIONAL",
    );

    it("should detect international phone numbers", () => {
      expect(pattern).toBeTruthy();
      expect("Call +14155551234".match(pattern!.pattern)).toBeTruthy();
      expect("Contact +33123456789".match(pattern!.pattern)).toBeTruthy();
      expect("Phone +861234567890".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid international phone numbers", () => {
      expect("+0123456789".match(pattern!.pattern)).toBeFalsy();
      expect("++1234567890".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PHONE_NUMBER_US", () => {
    const pattern = phonePatterns.find((p) => p.name === "PHONE_NUMBER_US");

    it("should detect US phone numbers", () => {
      expect(pattern).toBeTruthy();
      expect("555-123-4567".match(pattern!.pattern)).toBeTruthy();
      expect("(555) 123-4567".match(pattern!.pattern)).toBeTruthy();
      expect("555.123.4567".match(pattern!.pattern)).toBeTruthy();
      expect("+1-555-123-4567".match(pattern!.pattern)).toBeTruthy();
    });

    it("should detect US phone numbers without separators", () => {
      expect("5551234567".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid US phone numbers", () => {
      expect("123-45-6789".match(pattern!.pattern)).toBeFalsy();
      expect("555-12-345".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const usPattern = phonePatterns.find((p) => p.name === "PHONE_NUMBER_US");
    const ukPattern = phonePatterns.find((p) => p.name === "PHONE_NUMBER_UK");

    expect("regular text".match(usPattern!.pattern)).toBeFalsy();
    expect("regular text".match(ukPattern!.pattern)).toBeFalsy();
  });
});
