import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("TAX_IDENTIFIER category", () => {
  testCategoryCoverage(PolicyCategory.TAX_IDENTIFIER, [
    "US_EIN_WITH_LABEL",
    "US_EIN_PREFIXED",
    "US_TIN_WITH_LABEL",
    "US_EIN",
    "UK_VAT_NUMBER",
    "EU_VAT_NUMBER",
    "CANADIAN_BUSINESS_NUMBER",
    "AUSTRALIAN_ABN",
    "GERMAN_TAX_NUMBER",
    "FRENCH_SIRET_NUMBER",
    "FRENCH_SIREN_NUMBER",
  ]);

  describe("US_EIN_WITH_LABEL", () => {
    testPolicySuite({
      policyName: "US_EIN_WITH_LABEL",
      replacement: "[EIN]",
      shouldMatch: [
        "EIN: 98-7654321", // US EIN with colon label
        "ein: 12-3456789", // US EIN lowercase label
      ],
      shouldNotMatch: [
        "12-3456789", // Missing EIN label
        "invalid", // No EIN pattern
      ],
    });
  });

  describe("US_EIN_PREFIXED", () => {
    testPolicySuite({
      policyName: "US_EIN_PREFIXED",
      replacement: "[EIN]",
      shouldMatch: [
        "EIN 98-7654321", // US EIN with space label
        "ein 12-3456789", // US EIN lowercase space label
      ],
      shouldNotMatch: [
        "12-3456789", // Missing EIN label
        "invalid", // No EIN pattern
      ],
    });
  });

  describe("US_TIN_WITH_LABEL", () => {
    testPolicySuite({
      policyName: "US_TIN_WITH_LABEL",
      replacement: "[TIN]",
      shouldMatch: [
        "TIN 45-6789012", // US TIN with space label
        "tin 12-3456789", // US TIN lowercase label
      ],
      shouldNotMatch: [
        "45-6789012", // Missing TIN label
        "invalid", // No TIN pattern
      ],
    });
  });

  describe("US_EIN", () => {
    testPolicySuite({
      policyName: "US_EIN",
      replacement: "[EIN]",
      shouldMatch: [
        "12-3456789", // US EIN format
        "98-7654321", // US EIN alternate
        "55-1234567", // US EIN variation
      ],
      shouldNotMatch: [
        "123-456789", // Wrong format 3 digits before dash
        "1-23456789", // Wrong format 1 digit before dash
        "+12-3456789", // Has plus prefix
      ],
    });
  });

  describe("UK_VAT_NUMBER", () => {
    testPolicySuite({
      policyName: "UK_VAT_NUMBER",
      replacement: "[UK_VAT]",
      shouldMatch: [
        "GB123456789", // UK VAT 9 digits
        "GB 123 4567 89", // UK VAT with spaces
        "GB123456789012", // UK VAT 12 digits
      ],
      shouldNotMatch: [
        "DE123456789", // Not GB prefix
        "invalid", // No UK VAT pattern
      ],
    });
  });

  describe("EU_VAT_NUMBER", () => {
    testPolicySuite({
      policyName: "EU_VAT_NUMBER",
      replacement: "[EU_VAT]",
      shouldMatch: [
        "DE123456789", // Germany VAT
        "FR12345678901", // France VAT
        "IT12345678901", // Italy VAT
        "ES123456789", // Spain VAT
        "NL123456789B01", // Netherlands VAT
        "AT123456789", // Austria VAT
        "BE123456789", // Belgium VAT
        "BG123456789", // Bulgaria VAT
        "CY123456789", // Cyprus VAT
        "CZ123456789", // Czech Republic VAT
        "DK123456789", // Denmark VAT
        "EE123456789", // Estonia VAT
        "FI123456789", // Finland VAT
        "GR123456789", // Greece VAT
        "HR123456789", // Croatia VAT
        "HU123456789", // Hungary VAT
        "IE123456789", // Ireland VAT
        "LT123456789", // Lithuania VAT
        "LU123456789", // Luxembourg VAT
        "LV123456789", // Latvia VAT
        "MT123456789", // Malta VAT
        "PL123456789", // Poland VAT
        "PT123456789", // Portugal VAT
        "RO123456789", // Romania VAT
        "SE123456789", // Sweden VAT
        "SI123456789", // Slovenia VAT
        "SK123456789", // Slovakia VAT
      ],
      shouldNotMatch: [
        "GB123456789", // UK not EU
        "US123456789", // Non-EU prefix
        "invalid", // No EU VAT pattern
      ],
    });
  });

  describe("CANADIAN_BUSINESS_NUMBER", () => {
    testPolicySuite({
      policyName: "CANADIAN_BUSINESS_NUMBER",
      replacement: "[CA_BN]",
      shouldMatch: [
        "123456789", // Canadian business number 9 digits
        "123456789 RT0001", // Canadian BN with program account
        "123456789RT0001", // Canadian BN program no space
      ],
      shouldNotMatch: [
        "12345678", // Too short 8 digits
        "invalid", // No Canadian BN pattern
      ],
    });
  });

  describe("AUSTRALIAN_ABN", () => {
    testPolicySuite({
      policyName: "AUSTRALIAN_ABN",
      replacement: "[AU_ABN]",
      shouldMatch: [
        "12 345 678 901", // Australian ABN with spaces
        "12345678901", // Australian ABN no spaces
      ],
      shouldNotMatch: [
        "1234567890", // Too short 10 digits
        "invalid", // No Australian ABN pattern
      ],
    });
  });

  describe("GERMAN_TAX_NUMBER", () => {
    testPolicySuite({
      policyName: "GERMAN_TAX_NUMBER",
      replacement: "[DE_TAX_ID]",
      shouldMatch: [
        "12/345/67890", // German tax number format
      ],
      shouldNotMatch: [
        "12/345/6789", // Missing last digit
        "invalid", // No German tax pattern
      ],
    });
  });

  describe("FRENCH_SIRET_NUMBER", () => {
    testPolicySuite({
      policyName: "FRENCH_SIRET_NUMBER",
      replacement: "[FR_SIRET]",
      shouldMatch: [
        "123 456 789 01234", // French SIRET with spaces
        "12345678901234", // French SIRET no spaces
      ],
      shouldNotMatch: [
        "123 456 789", // Too short SIREN not SIRET
        "invalid", // No French SIRET pattern
      ],
    });
  });

  describe("FRENCH_SIREN_NUMBER", () => {
    testPolicySuite({
      policyName: "FRENCH_SIREN_NUMBER",
      replacement: "[FR_SIREN]",
      shouldMatch: [
        "123 456 789", // French SIREN with spaces
        "123456789", // French SIREN no spaces
      ],
      shouldNotMatch: [
        "12345678", // Too short 8 digits
        "invalid", // No French SIREN pattern
      ],
    });
  });
});
