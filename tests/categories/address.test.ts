import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("address patterns", () => {
  const addressPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.ADDRESS,
  );

  it("should have address patterns", () => {
    expect(addressPatterns.length).toBeGreaterThan(0);
  });

  describe("US_STREET_ADDRESS", () => {
    const pattern = addressPatterns.find((p) => p.name === "US_STREET_ADDRESS");

    it("should detect US street addresses", () => {
      expect(pattern).toBeTruthy();
      expect("123 Main Street, Anytown, ST 12345".match(pattern!.pattern)).toBeTruthy();
      expect("456 Oak Avenue".match(pattern!.pattern)).toBeTruthy();
      expect("789 Park Road".match(pattern!.pattern)).toBeTruthy();
      expect("1000 Broadway Boulevard".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid addresses", () => {
      expect("Main Street".match(pattern!.pattern)).toBeFalsy();
      expect("123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PO_BOX", () => {
    const pattern = addressPatterns.find((p) => p.name === "PO_BOX");

    it("should detect PO Box addresses", () => {
      expect(pattern).toBeTruthy();
      expect("PO Box 1234".match(pattern!.pattern)).toBeTruthy();
      expect("P.O. Box 5678".match(pattern!.pattern)).toBeTruthy();
      expect("Post Office Box 9012".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid PO Box formats", () => {
      expect("PO 1234".match(pattern!.pattern)).toBeFalsy();
      expect("Box 1234".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("APARTMENT_NUMBER", () => {
    const pattern = addressPatterns.find((p) => p.name === "APARTMENT_NUMBER");

    it("should detect apartment numbers", () => {
      expect(pattern).toBeTruthy();
      expect("Apt 4B".match(pattern!.pattern)).toBeTruthy();
      expect("Apartment 12".match(pattern!.pattern)).toBeTruthy();
      expect("Unit 5A".match(pattern!.pattern)).toBeTruthy();
      expect("Suite 100".match(pattern!.pattern)).toBeTruthy();
      expect("Ste. 200".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid apartment formats", () => {
      expect("Apt".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("INTERNATIONAL_ADDRESS", () => {
    const pattern = addressPatterns.find(
      (p) => p.name === "INTERNATIONAL_ADDRESS",
    );

    it("should detect international addresses", () => {
      expect(pattern).toBeTruthy();
      expect("10 Downing Street, London SW1A 2AA, UK".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match simple text", () => {
      expect("regular text".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const streetPattern = addressPatterns.find(
      (p) => p.name === "US_STREET_ADDRESS",
    );

    expect("regular text".match(streetPattern!.pattern)).toBeFalsy();
  });
});
