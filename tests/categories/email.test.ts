import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("email patterns", () => {
  const emailPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.EMAIL,
  );

  it("should have email patterns", () => {
    expect(emailPatterns.length).toBeGreaterThan(0);
  });

  describe("EMAIL_ADDRESS", () => {
    const pattern = emailPatterns.find((p) => p.name === "EMAIL_ADDRESS");

    it("should detect standard email addresses", () => {
      expect(pattern).toBeTruthy();
      expect("john@example.com".match(pattern!.pattern)).toBeTruthy();
      expect("user.name@domain.co.uk".match(pattern!.pattern)).toBeTruthy();
      expect("test+tag@example.org".match(pattern!.pattern)).toBeTruthy();
    });

    it("should detect emails with numbers", () => {
      expect(pattern).toBeTruthy();
      expect("user123@test456.com".match(pattern!.pattern)).toBeTruthy();
    });

    it("should detect emails with special characters", () => {
      expect(pattern).toBeTruthy();
      expect("user.name+tag@example.com".match(pattern!.pattern)).toBeTruthy();
      expect("first_last@company.co".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid emails", () => {
      expect(pattern).toBeTruthy();
      expect("not-an-email".match(pattern!.pattern)).toBeFalsy();
      expect("@example.com".match(pattern!.pattern)).toBeFalsy();
      expect("user@".match(pattern!.pattern)).toBeFalsy();
    });
  });
});
