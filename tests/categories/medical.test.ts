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
      shouldMatch: [
        "MRN-123456", // standard 6-digit MRN
        "mrn: ABC123456", // with alpha prefix
        "MRN 123456789012", // 12-digit MRN
        "MRN-987654", // different 6-digit
        "mrn: XYZ9876543", // alpha prefix different
        "MRN 111111111111", // repeating pattern
        "MRN-ABCD12345", // alpha-numeric
        "mrn: 1234567890AB", // numeric-alpha mix
        "MRN 000000000001", // leading zeros
        "MRN-999999", // all nines
      ],
      shouldNotMatch: [
        "MRN-12345", // too short (5 digits)
        "MRN", // label only
        "regular text", // plain text
        "mrn: 123", // too short
        "MRN-", // missing number
        "medical record", // text description
      ],
    });
  });

  describe("HEALTH_INSURANCE_ID", () => {
    testPolicySuite({
      policyName: "HEALTH_INSURANCE_ID",
      replacement: "[INSURANCE_ID]",
      shouldMatch: [
        "Insurance HIB123456789", // HIB prefix format
        "policy: ABC12345678", // policy format
        "insurance-ID12345678901", // ID format
        "Insurance XYZ987654321", // different prefix
        "policy: 1234567890AB", // numeric-alpha
        "insurance-ABC123456789", // alpha-numeric
        "Insurance 0000000000001", // leading zeros
        "policy: ZZZ99999999", // alpha numeric mix
        "insurance-HIB111111111", // repeating pattern
        "Insurance DEF123456789", // DEF prefix
      ],
      shouldNotMatch: [
        "Insurance 1234567", // too short
        "policy: 123", // too short
        "insurance-ID", // missing number
        "regular text", // plain text
        "Insurance", // label only
        "policy:", // missing ID
      ],
    });
  });
});
