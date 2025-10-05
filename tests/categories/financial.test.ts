import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("financial patterns", () => {
  testCategoryCoverage(PolicyCategory.FINANCIAL, [
    "ROUTING_NUMBER_US",
    "IBAN",
    "SWIFT_CODE",
  ]);

  describe("ROUTING_NUMBER_US", () => {
    testPolicySuite({
      policyName: "ROUTING_NUMBER_US",
      replacement: "[ROUTING_NUMBER]",
      shouldMatch: ["021000021", "123456789"],
      shouldNotMatch: ["12345678", "1234567890"],
    });
  });

  describe("IBAN", () => {
    testPolicySuite({
      policyName: "IBAN",
      replacement: "[IBAN]",
      shouldMatch: ["GB82WEST12345698765432", "DE89370400440532013000"],
      shouldNotMatch: ["GB82WEST", "invalid-iban", "regular text"],
    });
  });

  describe("SWIFT_CODE", () => {
    testPolicySuite({
      policyName: "SWIFT_CODE",
      replacement: "[SWIFT]",
      shouldMatch: ["BOFAUS3N", "DEUTDEFF", "BOFAUS3NXXX"],
      shouldNotMatch: ["BOFA", "bofaus3n"],
    });
  });
});
