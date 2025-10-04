import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("person name patterns", () => {
  const personNamePatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.PERSON_NAME,
  );

  it("should have person name patterns", () => {
    expect(personNamePatterns.length).toBeGreaterThan(0);
  });

  describe("PERSON_NAME", () => {
    const pattern = personNamePatterns.find((p) => p.name === "PERSON_NAME");

    it("should detect person names", () => {
      expect(pattern).toBeTruthy();
      expect("John Doe".match(pattern!.pattern)).toBeTruthy();
      expect("Jane Smith".match(pattern!.pattern)).toBeTruthy();
      expect("Mary Jane Watson".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match lowercase names", () => {
      expect("john doe".match(pattern!.pattern)).toBeFalsy();
    });

    it("should not match single words", () => {
      expect("John".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const pattern = personNamePatterns.find((p) => p.name === "PERSON_NAME");

    expect("regular text".match(pattern!.pattern)).toBeFalsy();
  });
});
