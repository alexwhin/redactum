import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("credit card patterns", () => {
  const ccPatterns = POLICIES.filter(p => p.category === PolicyCategory.CREDIT_CARD);

  it("should have credit card patterns", () => {
    expect(ccPatterns.length).toBeGreaterThan(0);
  });

  it("should detect credit card numbers", () => {
    const pattern = ccPatterns.find(p => p.name === "CREDIT_CARD");
    expect(pattern).toBeTruthy();

    expect("4111111111111111".match(pattern!.pattern)).toBeTruthy();
    expect("5555555555554444".match(pattern!.pattern)).toBeTruthy();
    expect("378282246310005".match(pattern!.pattern)).toBeTruthy();
  });
});
