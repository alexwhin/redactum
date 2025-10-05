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
      shouldMatch: ["EIN: 98-7654321", "ein: 12-3456789"],
      shouldNotMatch: ["12-3456789", "invalid"],
    });
  });

  describe("US_EIN_PREFIXED", () => {
    testPolicySuite({
      policyName: "US_EIN_PREFIXED",
      replacement: "[EIN]",
      shouldMatch: ["EIN 98-7654321", "ein 12-3456789"],
      shouldNotMatch: ["12-3456789", "invalid"],
    });
  });

  describe("US_TIN_WITH_LABEL", () => {
    testPolicySuite({
      policyName: "US_TIN_WITH_LABEL",
      replacement: "[TIN]",
      shouldMatch: ["TIN 45-6789012", "tin 12-3456789"],
      shouldNotMatch: ["45-6789012", "invalid"],
    });
  });

  describe("US_EIN", () => {
    testPolicySuite({
      policyName: "US_EIN",
      replacement: "[EIN]",
      shouldMatch: ["12-3456789", "98-7654321", "55-1234567"],
      shouldNotMatch: ["123-456789", "1-23456789", "+12-3456789"],
    });
  });

  describe("UK_VAT_NUMBER", () => {
    testPolicySuite({
      policyName: "UK_VAT_NUMBER",
      replacement: "[UK_VAT]",
      shouldMatch: ["GB123456789", "GB 123 4567 89", "GB123456789012"],
      shouldNotMatch: ["DE123456789", "invalid"],
    });
  });

  describe("EU_VAT_NUMBER", () => {
    testPolicySuite({
      policyName: "EU_VAT_NUMBER",
      replacement: "[EU_VAT]",
      shouldMatch: [
        "DE123456789",
        "FR12345678901",
        "IT12345678901",
        "ES123456789",
        "NL123456789B01",
        "AT123456789",
        "BE123456789",
        "BG123456789",
        "CY123456789",
        "CZ123456789",
        "DK123456789",
        "EE123456789",
        "FI123456789",
        "GR123456789",
        "HR123456789",
        "HU123456789",
        "IE123456789",
        "LT123456789",
        "LU123456789",
        "LV123456789",
        "MT123456789",
        "PL123456789",
        "PT123456789",
        "RO123456789",
        "SE123456789",
        "SI123456789",
        "SK123456789",
      ],
      shouldNotMatch: ["GB123456789", "US123456789", "invalid"],
    });
  });

  describe("CANADIAN_BUSINESS_NUMBER", () => {
    testPolicySuite({
      policyName: "CANADIAN_BUSINESS_NUMBER",
      replacement: "[CA_BN]",
      shouldMatch: ["123456789", "123456789 RT0001", "123456789RT0001"],
      shouldNotMatch: ["12345678", "invalid"],
    });
  });

  describe("AUSTRALIAN_ABN", () => {
    testPolicySuite({
      policyName: "AUSTRALIAN_ABN",
      replacement: "[AU_ABN]",
      shouldMatch: ["12 345 678 901", "12345678901"],
      shouldNotMatch: ["1234567890", "invalid"],
    });
  });

  describe("GERMAN_TAX_NUMBER", () => {
    testPolicySuite({
      policyName: "GERMAN_TAX_NUMBER",
      replacement: "[DE_TAX_ID]",
      shouldMatch: ["12/345/67890"],
      shouldNotMatch: ["12/345/6789", "invalid"],
    });
  });

  describe("FRENCH_SIRET_NUMBER", () => {
    testPolicySuite({
      policyName: "FRENCH_SIRET_NUMBER",
      replacement: "[FR_SIRET]",
      shouldMatch: ["123 456 789 01234", "12345678901234"],
      shouldNotMatch: ["123 456 789", "invalid"],
    });
  });

  describe("FRENCH_SIREN_NUMBER", () => {
    testPolicySuite({
      policyName: "FRENCH_SIREN_NUMBER",
      replacement: "[FR_SIREN]",
      shouldMatch: ["123 456 789", "123456789"],
      shouldNotMatch: ["12345678", "invalid"],
    });
  });
});
