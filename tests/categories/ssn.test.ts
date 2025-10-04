import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("ssn patterns", () => {
  const ssnPatterns = POLICIES.filter((p) => p.category === PolicyCategory.SSN);

  it("should have SSN patterns", () => {
    expect(ssnPatterns.length).toBeGreaterThan(0);
  });

  describe("SSN", () => {
    const pattern = ssnPatterns.find((p) => p.name === "SSN");

    it("should detect Social Security Numbers", () => {
      expect(pattern).toBeTruthy();
      expect("123-45-6789".match(pattern!.pattern)).toBeTruthy();
      expect("987-65-4321".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid SSNs", () => {
      expect("12-345-6789".match(pattern!.pattern)).toBeFalsy();
      expect("123-456-789".match(pattern!.pattern)).toBeFalsy();
      expect("123456789".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const pattern = ssnPatterns.find((p) => p.name === "SSN");

    expect("regular text".match(pattern!.pattern)).toBeFalsy();
    expect("123-45-678".match(pattern!.pattern)).toBeFalsy();
  });
});
