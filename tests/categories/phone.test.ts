import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("phone patterns", () => {
  testCategoryCoverage(PolicyCategory.PHONE, [
    "PHONE_NUMBER_UK",
    "PHONE_NUMBER_CANADIAN",
    "PHONE_NUMBER_INTERNATIONAL",
    "PHONE_NUMBER_US",
  ]);

  describe("PHONE_NUMBER_UK", () => {
    testPolicySuite({
      policyName: "PHONE_NUMBER_UK",
      replacement: "[PHONE]",
      shouldMatch: [
        "+442071234567",
        "+441234567890",
        "02071234567",
        "01234567890",
        "+447911123456",
        "07700900123",
        "+441632960123",
        "01632960456",
        "+443001234567",
      ],
      shouldNotMatch: [
        "+4400000000",
        "0123",
        "regular text",
        "+44123",
        "0123456",
        "+44",
        "012345678901234",
      ],
    });
  });

  describe("PHONE_NUMBER_CANADIAN", () => {
    testPolicySuite({
      policyName: "PHONE_NUMBER_CANADIAN",
      replacement: "[PHONE]",
      shouldMatch: [
        "+1-416-555-0123",
        "1 416 555 0123",
        "(416) 555-0123",
        "+1-604-555-0199",
        "1 514 555 0123",
        "(250) 555-0123",
        "+1-403-555-0100",
        "1 613 555 0123",
      ],
      shouldNotMatch: [
        "+1-111-555-0123",
        "123-456-7890",
        "+1-000-555-0123",
        "1 100 555 0123",
        "(111) 555-0123",
        "+1-555-5555",
      ],
    });
  });

  describe("PHONE_NUMBER_INTERNATIONAL", () => {
    testPolicySuite({
      policyName: "PHONE_NUMBER_INTERNATIONAL",
      replacement: "[PHONE]",
      shouldMatch: [
        "Call +14155551234",
        "Contact +33123456789",
        "Phone +861234567890",
        "+442071234567",
        "+4915123456789",
        "+81312345678",
        "+61212345678",
        "+551199887766",
      ],
      shouldNotMatch: [
        "+0123456789",
        "++1234567890",
        "+",
        "1234567890",
        "123456",
        "international",
      ],
    });
  });

  describe("PHONE_NUMBER_US", () => {
    testPolicySuite({
      policyName: "PHONE_NUMBER_US",
      replacement: "[PHONE]",
      shouldMatch: [
        "555-123-4567",
        "(555) 123-4567",
        "555.123.4567",
        "+1-555-123-4567",
        "5551234567",
        "(800) 555-0199",
        "202-456-1111",
        "+1-212-555-0123",
        "9995551234",
        "555.867.5309",
      ],
      shouldNotMatch: [
        "123-45-6789",
        "555-12-345",
        "regular text",
        "555-1234",
        "(555) 12-3456",
        "55512345",
        "phone",
      ],
    });
  });
});
