import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("financial patterns", () => {
  testCategoryCoverage(PolicyCategory.FINANCIAL, [
    "CREDIT_CARD",
    "CREDIT_CARD_WITH_SEPARATORS",
    "ROUTING_NUMBER_US",
    "IBAN",
    "SWIFT_CODE",
    "ACCOUNT_NUMBER_US",
    "ACH_ROUTING_NUMBER",
    "CREDIT_CARD_CVV",
  ]);

  describe("CREDIT_CARD", () => {
    testPolicySuite({
      policyName: "CREDIT_CARD",
      replacement: "[CREDIT_CARD]",
      shouldMatch: [
        "4111111111111111", // Visa test card (16 digits)
        "5555555555554444", // Mastercard test card (16 digits)
        "378282246310005", // American Express test card (15 digits)
        "6011111111111117", // Discover test card (16 digits)
        "36227206271667", // Diners Club test card (14 digits)
        "5105105105105100", // Mastercard test card
        "4012888888881881", // Visa test card
        "4222222222222220", // Visa test card (alternate)
        "Card: 4111111111111111", // with label prefix
        "CC 5555555555554444", // with abbreviation prefix
        "Payment card 378282246310005.", // in sentence with period
      ],
      shouldNotMatch: [
        "1234567890", // too short
        "not-a-card", // plain text
        "411111111111111", // 15 digits (not valid for Visa)
        "12345678901234", // 14 digits sequential
        "12345678901234567", // 17 digits (too long)
        "0000000000000000", // all zeros
        "4111-1111-1111-1111", // has separators (different pattern)
        "1111111111111111", // fails Luhn algorithm
        "3530111333300000", // JCB not supported by pattern
        "6304000000000000", // Maestro not supported by pattern
        "5019717010103742", // Dankort not supported by pattern
      ],
    });
  });

  describe("CREDIT_CARD_WITH_SEPARATORS", () => {
    testPolicySuite({
      policyName: "CREDIT_CARD_WITH_SEPARATORS",
      replacement: "[CREDIT_CARD]",
      shouldMatch: [
        "4111-1111-1111-1111", // Visa with hyphens (4-4-4-4)
        "5555-5555-5555-4444", // Mastercard with hyphens (4-4-4-4)
        "3782-822463-10005", // Amex with hyphens (4-6-5)
        "4111 1111 1111 1111", // Visa with spaces (4-4-4-4)
        "5555 5555 5555 4444", // Mastercard with spaces (4-4-4-4)
        "3782 822463 10005", // Amex with spaces (4-6-5)
        "6011-1111-1111-1117", // Discover with hyphens
        "3622-720627-1667", // Diners Club with hyphens (4-6-4)
        "4012-8888-8888-1881", // Visa with hyphens
        "5105-1051-0510-5100", // Mastercard with hyphens
        "Card: 4111-1111-1111-1111", // with label prefix
        "CC: 5555 5555 5555 4444.", // in sentence with period
      ],
      shouldNotMatch: [
        "4111111111111111", // no separators (different pattern)
        "1234-5678-9012-3456", // fails Luhn algorithm
        "not-a-card", // plain text
        "1111-1111-1111-1111", // fails Luhn algorithm
        "0000-0000-0000-0000", // all zeros
        "1234 5678 9012", // too short (12 digits)
        "abcd-efgh-ijkl-mnop", // non-numeric
        "4111-1111-1111", // too short (missing group)
        "3530-1113-3330-0000", // JCB not supported by pattern
        "6304-0000-0000-0000", // Maestro not supported by pattern
      ],
    });
  });

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

  describe("ACCOUNT_NUMBER_US", () => {
    testPolicySuite({
      policyName: "ACCOUNT_NUMBER_US",
      replacement: "[ACCOUNT_NUMBER]",
      shouldMatch: [
        "Account Number: 123456789012", // labeled account number
        "account number: 87654321", // lowercase label
        "Acct Num: 123456789012345", // abbreviated form
        "ACC NO: 98765432101", // another abbreviation
        "account# 1234567890", // with hash symbol
        "Acct: 12345678901234567", // 17 digits max
        "Account: 12345678", // 8 digits min
        "acc no 987654321012", // space-separated abbreviation
        "ACCOUNT NUMBER: 567890123456", // uppercase
        "account 1234567890123", // without colon
      ],
      shouldNotMatch: [
        "Account Number: 1234567", // too short (7 digits)
        "Account Number: 123456789012345678", // too long (18 digits)
        "account", // no number
        "123456789012", // no label
        "acc 12345", // too short with label
        "regular text", // plain text
      ],
    });
  });

  describe("ACH_ROUTING_NUMBER", () => {
    testPolicySuite({
      policyName: "ACH_ROUTING_NUMBER",
      replacement: "[ROUTING_NUMBER]",
      shouldMatch: [
        "Routing Number: 021000021", // labeled routing number
        "routing number: 111000025", // lowercase
        "ABA: 026009593", // ABA number
        "RTN: 121000248", // RTN abbreviation
        "Routing# 011401533", // with hash
        "routing 091000019", // without colon
        "ABA 122000247", // ABA without colon
        "rtn 111000025", // lowercase rtn
        "021000021", // starting with 0 (valid routing number)
        "091000019", // another starting with 0
      ],
      shouldNotMatch: [
        "Routing Number: 12345678", // too short
        "Routing Number: 1234567890", // too long
        "routing", // no number
        "123456789", // no label, doesn't start with 0
        "ABA", // just the label
        "regular text", // plain text
      ],
    });
  });

  describe("CREDIT_CARD_CVV", () => {
    testPolicySuite({
      policyName: "CREDIT_CARD_CVV",
      replacement: "[CVV]",
      shouldMatch: [
        "CVV: 123", // standard 3-digit CVV
        "cvv: 456", // lowercase
        "CVC: 789", // CVC variant
        "cvc 321", // lowercase without colon
        "CVV2: 654", // CVV2 variant
        "CID: 987", // Card Identification variant
        "cvv# 111", // with hash symbol
        "CVV 222", // without colon
        "cvc: 1234", // 4-digit (Amex)
        "CVV:333", // no space after colon
        "cvv2 4567", // 4-digit CVV2
      ],
      shouldNotMatch: [
        "CVV: 12", // too short (2 digits)
        "CVV: 12345", // too long (5 digits)
        "cvv", // no number
        "123", // no label
        "CVV code", // no number
        "regular text", // plain text
      ],
    });
  });
});
