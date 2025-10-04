import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("financial patterns", () => {
  const financialPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.FINANCIAL,
  );

  it("should have financial patterns", () => {
    expect(financialPatterns.length).toBeGreaterThan(0);
  });

  describe("BANK_ACCOUNT_US", () => {
    const pattern = financialPatterns.find((p) => p.name === "BANK_ACCOUNT_US");

    it("should detect US bank account numbers", () => {
      expect(pattern).toBeTruthy();
      expect("123456789012".match(pattern!.pattern)).toBeTruthy();
      expect("12345678".match(pattern!.pattern)).toBeTruthy();
      expect("1234567890123456".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid account numbers", () => {
      expect("1234567".match(pattern!.pattern)).toBeFalsy();
      expect("123456789012345678".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("ROUTING_NUMBER_US", () => {
    const pattern = financialPatterns.find(
      (p) => p.name === "ROUTING_NUMBER_US",
    );

    it("should detect US routing numbers", () => {
      expect(pattern).toBeTruthy();
      expect("021000021".match(pattern!.pattern)).toBeTruthy();
      expect("123456789".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid routing numbers", () => {
      expect("12345678".match(pattern!.pattern)).toBeFalsy();
      expect("1234567890".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("IBAN", () => {
    const pattern = financialPatterns.find((p) => p.name === "IBAN");

    it("should detect IBAN numbers", () => {
      expect(pattern).toBeTruthy();
      expect("GB82WEST12345698765432".match(pattern!.pattern)).toBeTruthy();
      expect("DE89370400440532013000".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid IBAN numbers", () => {
      expect("GB82WEST".match(pattern!.pattern)).toBeFalsy();
      expect("invalid-iban".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SWIFT_CODE", () => {
    const pattern = financialPatterns.find((p) => p.name === "SWIFT_CODE");

    it("should detect SWIFT codes", () => {
      expect(pattern).toBeTruthy();
      expect("BOFAUS3N".match(pattern!.pattern)).toBeTruthy();
      expect("DEUTDEFF".match(pattern!.pattern)).toBeTruthy();
      expect("BOFAUS3NXXX".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid SWIFT codes", () => {
      expect("BOFA".match(pattern!.pattern)).toBeFalsy();
      expect("bofaus3n".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const ibanPattern = financialPatterns.find((p) => p.name === "IBAN");

    expect("regular text".match(ibanPattern!.pattern)).toBeFalsy();
  });
});
