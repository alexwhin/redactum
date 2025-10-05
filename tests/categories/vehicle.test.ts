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
        "1HGBH41JXMN109186", // Honda VIN
        "JH4KA7561PC008269", // Acura VIN
        "WVWZZZ3CZHE051389", // Volkswagen VIN
        "5XYKT3A69CG123456", // Hyundai VIN
        "2C3CDXHG9CH123456", // Dodge VIN
        "1FTFW1ET5DFC12345", // Ford VIN
        "3GNAXUEV8KL123456", // Chevrolet VIN
        "JTDKBRFU9H3123456", // Toyota VIN
        "4S3BMHB68B3123456", // Subaru VIN
        "WAUZZZ4G5EN123456", // Audi VIN
      ],
      shouldNotMatch: [
        "ABC123", // too short
        "1234567890", // too short
        "INVALID-VIN", // contains hyphen
        "1HGBH41JXMN10918", // 16 chars (too short)
        "1HGBH41JXMN1091866", // 18 chars (too long)
        "regular text", // plain text
      ],
    });
  });

  describe("US_LICENSE_PLATE", () => {
    testPolicySuite({
      policyName: "US_LICENSE_PLATE",
      replacement: "[LICENSE_PLATE]",
      shouldMatch: [
        "ABC-1234", // letter-number with hyphen
        "123-ABC", // number-letter with hyphen
        "XYZ123", // letter-number no separator
        "NY-1234", // state prefix
        "CA-ABC123", // state with mixed
        "AB-123", // short form
        "1-ABCD", // number with 4 letters
      ],
      shouldNotMatch: [
        "A", // single character
        "123", // too short
        "7ABC123", // mixed format not matching pattern
        "ABC123D", // mixed format not matching pattern
        "12-3456", // numbers only with separator
        "VANITY1", // vanity plate format not matching
        "HELLO", // letters only
        "TOOLONG1234567890", // exceeds typical length
        "ABC-", // incomplete
        "license plate", // text label
        "regular text", // plain text
      ],
    });
  });
});
