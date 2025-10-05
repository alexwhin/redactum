import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("INSURANCE category", () => {
  testCategoryCoverage(PolicyCategory.INSURANCE, [
    "AUTO_INSURANCE_POLICY",
    "HOME_INSURANCE_POLICY",
    "LIFE_INSURANCE_POLICY",
    "TRAVEL_INSURANCE_POLICY",
    "WORKERS_COMPENSATION_CLAIM",
    "DISABILITY_INSURANCE_POLICY",
    "DENTAL_INSURANCE_POLICY",
    "VISION_INSURANCE_POLICY",
    "US_HEALTH_INSURANCE_POLICY",
    "US_INSURANCE_GROUP_NUMBER",
    "US_INSURANCE_CLAIM_NUMBER",
    "MEDICARE_NUMBER_US",
    "MEDICAID_NUMBER_US",
    "BCBS_MEMBER_ID",
    "AETNA_MEMBER_ID",
    "UNITEDHEALTH_MEMBER_ID",
    "UK_NHS_NUMBER",
    "CANADIAN_HEALTH_CARD",
    "AUSTRALIAN_MEDICARE_NUMBER",
    "GERMAN_HEALTH_INSURANCE_NUMBER",
    "FRENCH_SOCIAL_SECURITY_NUMBER",
    "EUROPEAN_HEALTH_INSURANCE_CARD",
  ]);

  describe("AUTO_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "AUTO_INSURANCE_POLICY",
      replacement: "[AUTO_POLICY]",
      shouldMatch: [
        "Auto policy: AUTO123456",
        "Car policy: CAR987654321",
        "vehicle pol: VEH123456",
      ],
      shouldNotMatch: ["auto insurance", "invalid"],
    });
  });

  describe("HOME_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "HOME_INSURANCE_POLICY",
      replacement: "[HOME_POLICY]",
      shouldMatch: [
        "Home policy #: HOME123456",
        "Property policy: PROP987654",
        "house pol: HOU123456",
      ],
      shouldNotMatch: ["home insurance", "invalid"],
    });
  });

  describe("LIFE_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "LIFE_INSURANCE_POLICY",
      replacement: "[LIFE_POLICY]",
      shouldMatch: ["Life policy: LIFE123456"],
      shouldNotMatch: ["life insurance", "invalid"],
    });
  });

  describe("TRAVEL_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "TRAVEL_INSURANCE_POLICY",
      replacement: "[TRAVEL_POLICY]",
      shouldMatch: ["Travel policy: TRAV123456"],
      shouldNotMatch: ["travel insurance", "invalid"],
    });
  });

  describe("WORKERS_COMPENSATION_CLAIM", () => {
    testPolicySuite({
      policyName: "WORKERS_COMPENSATION_CLAIM",
      replacement: "[WC_CLAIM]",
      shouldMatch: ["Workers comp claim: WC123456", "wc clm: WC987654"],
      shouldNotMatch: ["workers compensation", "invalid"],
    });
  });

  describe("DISABILITY_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "DISABILITY_INSURANCE_POLICY",
      replacement: "[DISABILITY_POLICY]",
      shouldMatch: ["Disability policy: DIS123456"],
      shouldNotMatch: ["disability insurance", "invalid"],
    });
  });

  describe("DENTAL_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "DENTAL_INSURANCE_POLICY",
      replacement: "[DENTAL_POLICY]",
      shouldMatch: ["Dental policy: DENT123456", "dent pol: DEN987654"],
      shouldNotMatch: ["dental insurance", "invalid"],
    });
  });

  describe("VISION_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "VISION_INSURANCE_POLICY",
      replacement: "[VISION_POLICY]",
      shouldMatch: ["Vision policy: VIS123456", "vis pol: VIS987654"],
      shouldNotMatch: ["vision insurance", "invalid"],
    });
  });

  describe("US_HEALTH_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "US_HEALTH_INSURANCE_POLICY",
      replacement: "[INSURANCE_POLICY]",
      shouldMatch: ["policy: ABC123456789", "member: XYZ987654321"],
      shouldNotMatch: ["policy: 123", "invalid"],
    });
  });

  describe("US_INSURANCE_GROUP_NUMBER", () => {
    testPolicySuite({
      policyName: "US_INSURANCE_GROUP_NUMBER",
      replacement: "[INSURANCE_GROUP]",
      shouldMatch: ["Group: GRP123456", "grp: GRP9876"],
      shouldNotMatch: ["invalid"],
    });
  });

  describe("US_INSURANCE_CLAIM_NUMBER", () => {
    testPolicySuite({
      policyName: "US_INSURANCE_CLAIM_NUMBER",
      replacement: "[INSURANCE_CLAIM]",
      shouldMatch: ["Claim #: CLM123456789", "clm: CLM987654321AB"],
      shouldNotMatch: ["claim: 123", "invalid"],
    });
  });

  describe("MEDICARE_NUMBER_US", () => {
    testPolicySuite({
      policyName: "MEDICARE_NUMBER_US",
      replacement: "[MEDICARE_NUMBER]",
      shouldMatch: ["123-45-6789-A1", "987-65-4321-B"],
      shouldNotMatch: ["123-45-67890-A1", "invalid"],
    });
  });

  describe("MEDICAID_NUMBER_US", () => {
    testPolicySuite({
      policyName: "MEDICAID_NUMBER_US",
      replacement: "[MEDICAID_NUMBER]",
      shouldMatch: ["Medicaid: MCD123456789", "mcd: MCD987654321"],
      shouldNotMatch: ["medicaid: 123", "invalid"],
    });
  });

  describe("BCBS_MEMBER_ID", () => {
    testPolicySuite({
      policyName: "BCBS_MEMBER_ID",
      replacement: "[BCBS_MEMBER_ID]",
      shouldMatch: ["BCBS: ABC123456789", "blue cross: XYZ987654321"],
      shouldNotMatch: ["bcbs: 123", "invalid"],
    });
  });

  describe("AETNA_MEMBER_ID", () => {
    testPolicySuite({
      policyName: "AETNA_MEMBER_ID",
      replacement: "[AETNA_MEMBER_ID]",
      shouldMatch: ["Aetna: A123456789", "aetna: AB12345678"],
      shouldNotMatch: ["aetna: 123", "invalid"],
    });
  });

  describe("UNITEDHEALTH_MEMBER_ID", () => {
    testPolicySuite({
      policyName: "UNITEDHEALTH_MEMBER_ID",
      replacement: "[UHC_MEMBER_ID]",
      shouldMatch: ["UHC: 123456789", "united: 987654321"],
      shouldNotMatch: ["uhc: 12345678", "invalid"],
    });
  });

  describe("UK_NHS_NUMBER", () => {
    testPolicySuite({
      policyName: "UK_NHS_NUMBER",
      replacement: "[NHS_NUMBER]",
      shouldMatch: ["123 456 7890", "9876543210"],
      shouldNotMatch: ["123-456-7890", "invalid"],
    });
  });

  describe("CANADIAN_HEALTH_CARD", () => {
    testPolicySuite({
      policyName: "CANADIAN_HEALTH_CARD",
      replacement: "[CA_HEALTH_CARD]",
      shouldMatch: ["1234 567 890", "9876543210"],
      shouldNotMatch: ["123 456 789", "invalid"],
    });
  });

  describe("AUSTRALIAN_MEDICARE_NUMBER", () => {
    testPolicySuite({
      policyName: "AUSTRALIAN_MEDICARE_NUMBER",
      replacement: "[AU_MEDICARE]",
      shouldMatch: ["1234 56789 0"],
      shouldNotMatch: ["1234 5678 9", "invalid"],
    });
  });

  describe("GERMAN_HEALTH_INSURANCE_NUMBER", () => {
    testPolicySuite({
      policyName: "GERMAN_HEALTH_INSURANCE_NUMBER",
      replacement: "[DE_HEALTH_INSURANCE]",
      shouldMatch: ["A123456789", "Z987654321"],
      shouldNotMatch: ["12345678", "invalid"],
    });
  });

  describe("FRENCH_SOCIAL_SECURITY_NUMBER", () => {
    testPolicySuite({
      policyName: "FRENCH_SOCIAL_SECURITY_NUMBER",
      replacement: "[FR_SOCIAL_SECURITY]",
      shouldMatch: ["123456789012345", "298765432109876"],
      shouldNotMatch: ["012345678901234", "invalid"],
    });
  });

  describe("EUROPEAN_HEALTH_INSURANCE_CARD", () => {
    testPolicySuite({
      policyName: "EUROPEAN_HEALTH_INSURANCE_CARD",
      replacement: "[EHIC_NUMBER]",
      shouldMatch: ["EHIC: 123456789012", "ehic: 9876543210123456"],
      shouldNotMatch: ["ehic: 123", "invalid"],
    });
  });
});
