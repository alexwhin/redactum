import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("credit card patterns", () => {
  const ccPatterns = POLICIES.filter(p => p.category === PolicyCategory.CREDIT_CARD);

  it("should have credit card patterns", () => {
    expect(ccPatterns.length).toBeGreaterThan(0);
  });

  it("should detect credit card numbers without separators", () => {
    const pattern = ccPatterns.find(p => p.name === "CREDIT_CARD");
    expect(pattern).toBeTruthy();

    expect("4111111111111111".match(pattern!.pattern)).toBeTruthy();
    expect("5555555555554444".match(pattern!.pattern)).toBeTruthy();
    expect("378282246310005".match(pattern!.pattern)).toBeTruthy();
  });

  it("should detect credit card numbers with dashes", () => {
    const pattern = ccPatterns.find(p => p.name === "CREDIT_CARD_WITH_SEPARATORS");
    expect(pattern).toBeTruthy();

    expect("4111-1111-1111-1111".match(pattern!.pattern)).toBeTruthy();
    expect("5555-5555-5555-4444".match(pattern!.pattern)).toBeTruthy();
    expect("3782-822463-10005".match(pattern!.pattern)).toBeTruthy();
  });

  it("should detect credit card numbers with spaces", () => {
    const pattern = ccPatterns.find(p => p.name === "CREDIT_CARD_WITH_SEPARATORS");
    expect(pattern).toBeTruthy();

    expect("4111 1111 1111 1111".match(pattern!.pattern)).toBeTruthy();
    expect("5555 5555 5555 4444".match(pattern!.pattern)).toBeTruthy();
    expect("3782 822463 10005".match(pattern!.pattern)).toBeTruthy();
  });
});
