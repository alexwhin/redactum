import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("geographic patterns", () => {
  testCategoryCoverage(PolicyCategory.GEOGRAPHIC, [
    "US_ZIP_CODE",
    "CANADIAN_POSTAL_CODE",
    "UK_POSTCODE",
    "GPS_COORDINATES",
  ]);

  describe("US_ZIP_CODE", () => {
    testPolicySuite({
      policyName: "US_ZIP_CODE",
      replacement: "[ZIP]",
      shouldMatch: ["12345", "12345-6789"],
      shouldNotMatch: ["1234", "123456", "regular text"],
    });
  });

  describe("CANADIAN_POSTAL_CODE", () => {
    testPolicySuite({
      policyName: "CANADIAN_POSTAL_CODE",
      replacement: "[POSTAL_CODE]",
      shouldMatch: ["K1A 0B1", "K1A0B1"],
      shouldNotMatch: ["K1A0B", "123456"],
    });
  });

  describe("UK_POSTCODE", () => {
    testPolicySuite({
      policyName: "UK_POSTCODE",
      replacement: "[POSTCODE]",
      shouldMatch: ["SW1A 1AA", "M1 1AE", "B33 8TH"],
      shouldNotMatch: ["INVALID", "regular text"],
    });
  });

  describe("GPS_COORDINATES", () => {
    testPolicySuite({
      policyName: "GPS_COORDINATES",
      replacement: "[COORDINATES]",
      shouldMatch: ["40.7128,-74.0060", "-33.8688, 151.2093"],
      shouldNotMatch: ["40.7,-74.0", "regular text"],
    });
  });
});
