import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("vehicle patterns", () => {
  testCategoryCoverage(PolicyCategory.VEHICLE, ["VIN", "US_LICENSE_PLATE"]);

  describe("VIN", () => {
    testPolicySuite({
      policyName: "VIN",
      replacement: "[VIN]",
      shouldMatch: [
        "1HGBH41JXMN109186",
        "JH4KA7561PC008269",
        "WVWZZZ3CZHE051389",
      ],
      shouldNotMatch: ["ABC123", "1234567890", "INVALID-VIN"],
    });
  });

  describe("US_LICENSE_PLATE", () => {
    testPolicySuite({
      policyName: "US_LICENSE_PLATE",
      replacement: "[LICENSE_PLATE]",
      shouldMatch: ["ABC-1234", "123-ABC", "XYZ123"],
      shouldNotMatch: ["A", "123", "TOOLONG1234567890"],
    });
  });
});
