import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("credit card patterns", () => {
  testCategoryCoverage(PolicyCategory.CREDIT_CARD, [
    "CREDIT_CARD",
    "CREDIT_CARD_WITH_SEPARATORS",
  ]);

  describe("CREDIT_CARD", () => {
    testPolicySuite({
      policyName: "CREDIT_CARD",
      replacement: "[CREDIT_CARD]",
      shouldMatch: [
        "4111111111111111", // Visa test card (16 digits)
        "5555555555554444", // Mastercard test card (16 digits)
        "378282246310005", // American Express test card (15 digits)
        "6011111111111117", // Discover test card (16 digits)
        "36227206271667", // Diners Club test card (14 digits)
        "5105105105105100", // Mastercard test card
        "4012888888881881", // Visa test card
        "4222222222222220", // Visa test card (alternate)
        "Card: 4111111111111111", // with label prefix
        "CC 5555555555554444", // with abbreviation prefix
        "Payment card 378282246310005.", // in sentence with period
      ],
      shouldNotMatch: [
        "1234567890", // too short
        "not-a-card", // plain text
        "411111111111111", // 15 digits (not valid for Visa)
        "12345678901234", // 14 digits sequential
        "12345678901234567", // 17 digits (too long)
        "0000000000000000", // all zeros
        "4111-1111-1111-1111", // has separators (different pattern)
        "1111111111111111", // fails Luhn algorithm
        "3530111333300000", // JCB not supported by pattern
        "6304000000000000", // Maestro not supported by pattern
        "5019717010103742", // Dankort not supported by pattern
      ],
    });
  });

  describe("CREDIT_CARD_WITH_SEPARATORS", () => {
    testPolicySuite({
      policyName: "CREDIT_CARD_WITH_SEPARATORS",
      replacement: "[CREDIT_CARD]",
      shouldMatch: [
        "4111-1111-1111-1111", // Visa with hyphens (4-4-4-4)
        "5555-5555-5555-4444", // Mastercard with hyphens (4-4-4-4)
        "3782-822463-10005", // Amex with hyphens (4-6-5)
        "4111 1111 1111 1111", // Visa with spaces (4-4-4-4)
        "5555 5555 5555 4444", // Mastercard with spaces (4-4-4-4)
        "3782 822463 10005", // Amex with spaces (4-6-5)
        "6011-1111-1111-1117", // Discover with hyphens
        "3622-720627-1667", // Diners Club with hyphens (4-6-4)
        "4012-8888-8888-1881", // Visa with hyphens
        "5105-1051-0510-5100", // Mastercard with hyphens
        "Card: 4111-1111-1111-1111", // with label prefix
        "CC: 5555 5555 5555 4444.", // in sentence with period
      ],
      shouldNotMatch: [
        "4111111111111111", // no separators (different pattern)
        "1234-5678-9012-3456", // fails Luhn algorithm
        "not-a-card", // plain text
        "1111-1111-1111-1111", // fails Luhn algorithm
        "0000-0000-0000-0000", // all zeros
        "1234 5678 9012", // too short (12 digits)
        "abcd-efgh-ijkl-mnop", // non-numeric
        "4111-1111-1111", // too short (missing group)
        "3530-1113-3330-0000", // JCB not supported by pattern
        "6304-0000-0000-0000", // Maestro not supported by pattern
      ],
    });
  });
});
