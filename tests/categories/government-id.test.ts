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
      shouldMatch: [
        "D12345678", // California format
        "AB1234567", // two letter prefix
        "A123456", // single letter 6 digits
        "XY9876543", // different letters
        "Z1111111", // repeating digits
        "D00000000", // all zeros
        "K98765432", // single letter 8 digits
        "MN7654321", // two letters
        "P1234567", // single letter 7 digits
      ],
      shouldNotMatch: [
        "D12345", // too short
        "ABC12345", // 5 digits (too short for some)
        "ABC123456", // three letter prefix (pattern only allows 1-2 letters)
        "regular text", // plain text
        "1234567", // no letter prefix
        "ABCD1234567", // too many letters
        "driver-license", // text label
      ],
    });
  });

  describe("US_PASSPORT_NUMBER", () => {
    testPolicySuite({
      policyName: "US_PASSPORT_NUMBER",
      replacement: "[PASSPORT]",
      shouldMatch: [
        "M12345678", // M prefix format
        "123456789", // 9 digits
        "passport 123456789", // with label
        "passport: A12345678", // with label and letter
        "987654321", // different digits
        "passport 000000001", // leading zeros
        "passport: Z98765432", // Z prefix
        "111111111", // repeating pattern
        "passport 555555555", // repeating fives
        "passport: B11111111", // B prefix
      ],
      shouldNotMatch: [
        "12345678", // 8 digits (too short)
        "ABCDEFGHI", // all letters
        "passport", // label only
        "passport: 12345", // too short
        "1234567890", // 10 digits (too long)
        "regular text", // plain text
      ],
    });
  });

  describe("NATIONAL_ID", () => {
    testPolicySuite({
      policyName: "NATIONAL_ID",
      replacement: "[NATIONAL_ID]",
      shouldMatch: [
        "National ID: ID123456789", // ID prefix
        "citizen-id ABC12345678", // citizen-id label
        "national_id: XYZ123456", // underscore format
        "National ID: 1234567890", // numeric only
        "citizen-id DEF987654321", // different prefix
        "national_id: GHI111111111", // repeating digits
        "National ID: JKL00000000", // zeros
        "citizen-id MNO99999999", // nines
        "national_id: PQR12345678", // alpha-numeric
        "National ID: STU987654321", // different ID
      ],
      shouldNotMatch: [
        "National ID: 123", // too short
        "regular text", // plain text
        "National ID:", // missing ID
        "citizen-id 12", // too short
        "national_id:", // missing ID
        "national id", // missing colon/hyphen
      ],
    });
  });
});
