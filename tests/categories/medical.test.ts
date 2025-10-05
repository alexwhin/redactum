import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("medical patterns", () => {
  testCategoryCoverage(PolicyCategory.MEDICAL, [
    "MEDICAL_RECORD_NUMBER",
    "HEALTH_INSURANCE_ID",
  ]);

  describe("MEDICAL_RECORD_NUMBER", () => {
    testPolicySuite({
      policyName: "MEDICAL_RECORD_NUMBER",
      replacement: "[MRN]",
      shouldMatch: ["MRN-123456", "mrn: ABC123456", "MRN 123456789012"],
      shouldNotMatch: ["MRN-12345", "MRN", "regular text"],
    });
  });

  describe("HEALTH_INSURANCE_ID", () => {
    testPolicySuite({
      policyName: "HEALTH_INSURANCE_ID",
      replacement: "[INSURANCE_ID]",
      shouldMatch: [
        "Insurance HIB123456789",
        "policy: ABC12345678",
        "insurance-ID12345678901",
      ],
      shouldNotMatch: ["Insurance 1234567"],
    });
  });
});
