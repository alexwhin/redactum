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
        "4111111111111111",
        "5555555555554444",
        "378282246310005",
        "6011111111111117",
        "36227206271667",
        "5105105105105100",
        "4012888888881881",
        "4222222222222220",
      ],
      shouldNotMatch: [
        "1234567890",
        "not-a-card",
        "411111111111111",
        "12345678901234",
        "12345678901234567",
        "0000000000000000",
        "4111-1111-1111-1111",
      ],
    });
  });

  describe("CREDIT_CARD_WITH_SEPARATORS", () => {
    testPolicySuite({
      policyName: "CREDIT_CARD_WITH_SEPARATORS",
      replacement: "[CREDIT_CARD]",
      shouldMatch: [
        "4111-1111-1111-1111",
        "5555-5555-5555-4444",
        "3782-822463-10005",
        "4111 1111 1111 1111",
        "5555 5555 5555 4444",
        "3782 822463 10005",
        "6011-1111-1111-1117",
        "3622-720627-1667",
        "4012-8888-8888-1881",
        "5105-1051-0510-5100",
      ],
      shouldNotMatch: [
        "4111111111111111",
        "1234-5678-9012-3456",
        "not-a-card",
        "1111-1111-1111-1111",
        "0000-0000-0000-0000",
        "1234 5678 9012",
        "abcd-efgh-ijkl-mnop",
      ],
    });
  });
});
