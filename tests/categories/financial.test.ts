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
      shouldMatch: [
        "021000021", // Chase Bank routing number
        "123456789", // generic 9-digit
        "111000025", // Bank of America
        "026009593", // Bank of America
        "121000248", // Wells Fargo
        "011401533", // PNC Bank
        "000000001", // all zeros except last
        "999999999", // all nines
      ],
      shouldNotMatch: [
        "12345678", // 8 digits (too short)
        "1234567890", // 10 digits (too long)
        "123-456-789", // with hyphens
        "routing number", // text label
        "12345678a", // contains letter
        "regular text", // plain text
      ],
    });
  });

  describe("IBAN", () => {
    testPolicySuite({
      policyName: "IBAN",
      replacement: "[IBAN]",
      shouldMatch: [
        "GB82WEST12345698765432", // UK IBAN
        "DE89370400440532013000", // German IBAN
        "FR1420041010050500013M02606", // French IBAN
        "IT60X0542811101000000123456", // Italian IBAN
        "ES9121000418450200051332", // Spanish IBAN
        "NL91ABNA0417164300", // Dutch IBAN
        "BE68539007547034", // Belgian IBAN
        "CH9300762011623852957", // Swiss IBAN
        "AT611904300234573201", // Austrian IBAN
        "PL61109010140000071219812874", // Polish IBAN
      ],
      shouldNotMatch: [
        "GB82WEST", // too short
        "invalid-iban", // invalid format
        "regular text", // plain text
        "IBAN123456", // wrong format
        "12345678", // numbers only
        "ABCDEFGH", // letters only
      ],
    });
  });

  describe("SWIFT_CODE", () => {
    testPolicySuite({
      policyName: "SWIFT_CODE",
      replacement: "[SWIFT]",
      shouldMatch: [
        "BOFAUS3N", // Bank of America 8-char
        "DEUTDEFF", // Deutsche Bank 8-char
        "BOFAUS3NXXX", // Bank of America 11-char
        "CHASUS33", // Chase Bank
        "CITIUS33", // Citibank
        "WFBIUS6S", // Wells Fargo
        "PNBPUS3NNYC", // PNC Bank with branch
        "HSBCGB2L", // HSBC UK
        "BNPAFRPP", // BNP Paribas France
        "CRESCHZZ80A", // Credit Suisse Switzerland
        "BOFAUS3N123", // 11 chars (8 base + 3 branch)
      ],
      shouldNotMatch: [
        "BOFA", // too short
        "bofaus3n", // lowercase (invalid)
        "BOFAUS3N1234", // 12 chars (too long)
        "BOFA-US-3N", // with hyphens
        "SWIFT123", // wrong format
        "regular text", // plain text
      ],
    });
  });
});
