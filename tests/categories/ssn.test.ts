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
        "123-45-6789",
        "987-65-4321",
        "456-78-9012",
        "234-56-7890",
        "345-67-8901",
        "001-23-4567",
        "555-12-3456",
        "111-22-3333",
        "777-88-9999",
        "222-33-4444",
      ],
      shouldNotMatch: [
        "12-345-6789",
        "123-456-789",
        "123456789",
        "regular text",
        "123-45-678",
        "12345",
        "SSN",
        "social-security",
      ],
    });
  });
});
