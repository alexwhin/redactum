import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("date of birth patterns", () => {
  const dobPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.DATE_OF_BIRTH,
  );

  it("should have date of birth patterns", () => {
    expect(dobPatterns.length).toBeGreaterThan(0);
  });

  describe("DATE_OF_BIRTH", () => {
    const pattern = dobPatterns.find((p) => p.name === "DATE_OF_BIRTH");

    it("should detect dates of birth with slash separator", () => {
      expect(pattern).toBeTruthy();
      expect("01/15/1990".match(pattern!.pattern)).toBeTruthy();
      expect("12/31/2000".match(pattern!.pattern)).toBeTruthy();
      expect("1/5/1995".match(pattern!.pattern)).toBeTruthy();
    });

    it("should detect dates of birth with dash separator", () => {
      expect("01-15-1990".match(pattern!.pattern)).toBeTruthy();
      expect("12-31-2000".match(pattern!.pattern)).toBeTruthy();
      expect("1-5-1995".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid dates", () => {
      expect("13/32/1990".match(pattern!.pattern)).toBeFalsy();
      expect("00/00/2000".match(pattern!.pattern)).toBeFalsy();
      expect("01/15/1800".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const pattern = dobPatterns.find((p) => p.name === "DATE_OF_BIRTH");

    expect("regular text".match(pattern!.pattern)).toBeFalsy();
  });
});
