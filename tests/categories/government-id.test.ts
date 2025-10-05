import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("government id patterns", () => {
  testCategoryCoverage(PolicyCategory.GOVERNMENT_ID, [
    "US_DRIVER_LICENSE",
    "US_PASSPORT_NUMBER",
    "NATIONAL_ID",
  ]);

  describe("US_DRIVER_LICENSE", () => {
    testPolicySuite({
      policyName: "US_DRIVER_LICENSE",
      replacement: "[DRIVER_LICENSE]",
      shouldMatch: ["D12345678", "AB1234567", "A123456"],
      shouldNotMatch: ["D12345", "ABC12345", "regular text"],
    });
  });

  describe("US_PASSPORT_NUMBER", () => {
    testPolicySuite({
      policyName: "US_PASSPORT_NUMBER",
      replacement: "[PASSPORT]",
      shouldMatch: [
        "M12345678",
        "123456789",
        "passport 123456789",
        "passport: A12345678",
      ],
      shouldNotMatch: ["12345678", "ABCDEFGHI"],
    });
  });

  describe("NATIONAL_ID", () => {
    testPolicySuite({
      policyName: "NATIONAL_ID",
      replacement: "[NATIONAL_ID]",
      shouldMatch: [
        "National ID: ID123456789",
        "citizen-id ABC12345678",
        "national_id: XYZ123456",
      ],
      shouldNotMatch: ["National ID: 123", "regular text"],
    });
  });
});
