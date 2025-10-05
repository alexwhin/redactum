import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("ssn patterns", () => {
  testCategoryCoverage(PolicyCategory.SSN, ["SSN"]);

  describe("SSN", () => {
    testPolicySuite({
      policyName: "SSN",
      replacement: "[SSN]",
      shouldMatch: [
        "123-45-6789", // standard SSN format
        "987-65-4321", // valid format
        "456-78-9012", // valid format
        "234-56-7890", // valid format
        "345-67-8901", // valid format
        "001-23-4567", // low area number (valid)
        "555-12-3456", // test SSN format
        "111-22-3333", // valid format
        "777-88-9999", // valid format
        "222-33-4444", // valid format
        "SSN: 456-78-9012", // with label prefix
        "Social Security: 123-45-6789.", // in sentence with punctuation
        "Employee SSN is 234-56-7890", // embedded in text
        "(987-65-4321)", // parentheses wrapped
      ],
      shouldNotMatch: [
        "12-345-6789", // wrong format (2-3-4 instead of 3-2-4)
        "123-456-789", // wrong format (3-3-3 instead of 3-2-4)
        "123456789", // no hyphens (9 digits)
        "regular text", // plain text
        "123-45-678", // too short (missing last digit)
        "12345", // too short
        "SSN", // just the label
        "social-security", // plain text
      ],
    });
  });
});
