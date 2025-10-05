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
        "Auto policy: AUTO123456", // Auto insurance policy number
        "Car policy: CAR987654321", // Car insurance policy
        "vehicle pol: VEH123456", // Vehicle policy abbreviation
      ],
      shouldNotMatch: [
        "auto insurance", // Missing policy number
        "invalid", // No auto policy pattern
      ],
    });
  });

  describe("HOME_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "HOME_INSURANCE_POLICY",
      replacement: "[HOME_POLICY]",
      shouldMatch: [
        "Home policy #: HOME123456", // Home insurance with hash
        "Property policy: PROP987654", // Property insurance
        "house pol: HOU123456", // House policy abbreviation
      ],
      shouldNotMatch: [
        "home insurance", // Missing policy number
        "invalid", // No home policy pattern
      ],
    });
  });

  describe("LIFE_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "LIFE_INSURANCE_POLICY",
      replacement: "[LIFE_POLICY]",
      shouldMatch: [
        "Life policy: LIFE123456", // Life insurance policy number
      ],
      shouldNotMatch: [
        "life insurance", // Missing policy number
        "invalid", // No life policy pattern
      ],
    });
  });

  describe("TRAVEL_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "TRAVEL_INSURANCE_POLICY",
      replacement: "[TRAVEL_POLICY]",
      shouldMatch: [
        "Travel policy: TRAV123456", // Travel insurance policy number
      ],
      shouldNotMatch: [
        "travel insurance", // Missing policy number
        "invalid", // No travel policy pattern
      ],
    });
  });

  describe("WORKERS_COMPENSATION_CLAIM", () => {
    testPolicySuite({
      policyName: "WORKERS_COMPENSATION_CLAIM",
      replacement: "[WC_CLAIM]",
      shouldMatch: [
        "Workers comp claim: WC123456", // Workers comp claim number
        "wc clm: WC987654", // WC claim abbreviation
      ],
      shouldNotMatch: [
        "workers compensation", // Missing claim number
        "invalid", // No WC claim pattern
      ],
    });
  });

  describe("DISABILITY_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "DISABILITY_INSURANCE_POLICY",
      replacement: "[DISABILITY_POLICY]",
      shouldMatch: [
        "Disability policy: DIS123456", // Disability insurance policy
      ],
      shouldNotMatch: [
        "disability insurance", // Missing policy number
        "invalid", // No disability policy pattern
      ],
    });
  });

  describe("DENTAL_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "DENTAL_INSURANCE_POLICY",
      replacement: "[DENTAL_POLICY]",
      shouldMatch: [
        "Dental policy: DENT123456", // Dental insurance policy
        "dent pol: DEN987654", // Dental policy abbreviation
      ],
      shouldNotMatch: [
        "dental insurance", // Missing policy number
        "invalid", // No dental policy pattern
      ],
    });
  });

  describe("VISION_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "VISION_INSURANCE_POLICY",
      replacement: "[VISION_POLICY]",
      shouldMatch: [
        "Vision policy: VIS123456", // Vision insurance policy
        "vis pol: VIS987654", // Vision policy abbreviation
      ],
      shouldNotMatch: [
        "vision insurance", // Missing policy number
        "invalid", // No vision policy pattern
      ],
    });
  });

  describe("US_HEALTH_INSURANCE_POLICY", () => {
    testPolicySuite({
      policyName: "US_HEALTH_INSURANCE_POLICY",
      replacement: "[INSURANCE_POLICY]",
      shouldMatch: [
        "policy: ABC123456789", // US health insurance policy
        "member: XYZ987654321", // US health member ID
      ],
      shouldNotMatch: [
        "policy: 123", // Too short to be valid
        "invalid", // No health policy pattern
      ],
    });
  });

  describe("US_INSURANCE_GROUP_NUMBER", () => {
    testPolicySuite({
      policyName: "US_INSURANCE_GROUP_NUMBER",
      replacement: "[INSURANCE_GROUP]",
      shouldMatch: [
        "Group: GRP123456", // Insurance group number
        "grp: GRP9876", // Group abbreviation
      ],
      shouldNotMatch: [
        "invalid", // No group number pattern
      ],
    });
  });

  describe("US_INSURANCE_CLAIM_NUMBER", () => {
    testPolicySuite({
      policyName: "US_INSURANCE_CLAIM_NUMBER",
      replacement: "[INSURANCE_CLAIM]",
      shouldMatch: [
        "Claim #: CLM123456789", // Insurance claim with hash
        "clm: CLM987654321AB", // Claim abbreviation with alphanumeric
      ],
      shouldNotMatch: [
        "claim: 123", // Too short to be valid
        "invalid", // No claim number pattern
      ],
    });
  });

  describe("MEDICARE_NUMBER_US", () => {
    testPolicySuite({
      policyName: "MEDICARE_NUMBER_US",
      replacement: "[MEDICARE_NUMBER]",
      shouldMatch: [
        "123-45-6789-A1", // Medicare number with suffix
        "987-65-4321-B", // Medicare with single letter suffix
      ],
      shouldNotMatch: [
        "123-45-67890-A1", // Too many digits in third group
        "invalid", // No Medicare pattern
      ],
    });
  });

  describe("MEDICAID_NUMBER_US", () => {
    testPolicySuite({
      policyName: "MEDICAID_NUMBER_US",
      replacement: "[MEDICAID_NUMBER]",
      shouldMatch: [
        "Medicaid: MCD123456789", // Medicaid number
        "mcd: MCD987654321", // Medicaid abbreviation
      ],
      shouldNotMatch: [
        "medicaid: 123", // Too short to be valid
        "invalid", // No Medicaid pattern
      ],
    });
  });

  describe("BCBS_MEMBER_ID", () => {
    testPolicySuite({
      policyName: "BCBS_MEMBER_ID",
      replacement: "[BCBS_MEMBER_ID]",
      shouldMatch: [
        "BCBS: ABC123456789", // Blue Cross Blue Shield ID
        "blue cross: XYZ987654321", // Full name member ID
      ],
      shouldNotMatch: [
        "bcbs: 123", // Too short to be valid
        "invalid", // No BCBS pattern
      ],
    });
  });

  describe("AETNA_MEMBER_ID", () => {
    testPolicySuite({
      policyName: "AETNA_MEMBER_ID",
      replacement: "[AETNA_MEMBER_ID]",
      shouldMatch: [
        "Aetna: A123456789", // Aetna member ID
        "aetna: AB12345678", // Aetna with alphanumeric
      ],
      shouldNotMatch: [
        "aetna: 123", // Too short to be valid
        "invalid", // No Aetna pattern
      ],
    });
  });

  describe("UNITEDHEALTH_MEMBER_ID", () => {
    testPolicySuite({
      policyName: "UNITEDHEALTH_MEMBER_ID",
      replacement: "[UHC_MEMBER_ID]",
      shouldMatch: [
        "UHC: 123456789", // UnitedHealthcare 9 digit ID
        "united: 987654321", // UHC with united label
      ],
      shouldNotMatch: [
        "uhc: 12345678", // Too short 8 digits
        "invalid", // No UHC pattern
      ],
    });
  });

  describe("UK_NHS_NUMBER", () => {
    testPolicySuite({
      policyName: "UK_NHS_NUMBER",
      replacement: "[NHS_NUMBER]",
      shouldMatch: [
        "123 456 7890", // UK NHS number with spaces
        "9876543210", // UK NHS number no spaces
      ],
      shouldNotMatch: [
        "123-456-7890", // Wrong separator dashes not spaces
        "invalid", // No NHS pattern
      ],
    });
  });

  describe("CANADIAN_HEALTH_CARD", () => {
    testPolicySuite({
      policyName: "CANADIAN_HEALTH_CARD",
      replacement: "[CA_HEALTH_CARD]",
      shouldMatch: [
        "1234 567 890", // Canadian health card with spaces
        "9876543210", // Canadian health card no spaces
      ],
      shouldNotMatch: [
        "123 456 789", // Too short 9 digits
        "invalid", // No Canadian health card pattern
      ],
    });
  });

  describe("AUSTRALIAN_MEDICARE_NUMBER", () => {
    testPolicySuite({
      policyName: "AUSTRALIAN_MEDICARE_NUMBER",
      replacement: "[AU_MEDICARE]",
      shouldMatch: [
        "1234 56789 0", // Australian Medicare number
      ],
      shouldNotMatch: [
        "1234 5678 9", // Wrong format missing digit
        "invalid", // No Australian Medicare pattern
      ],
    });
  });

  describe("GERMAN_HEALTH_INSURANCE_NUMBER", () => {
    testPolicySuite({
      policyName: "GERMAN_HEALTH_INSURANCE_NUMBER",
      replacement: "[DE_HEALTH_INSURANCE]",
      shouldMatch: [
        "A123456789", // German health insurance with letter prefix
        "Z987654321", // German health insurance Z prefix
      ],
      shouldNotMatch: [
        "12345678", // Missing letter prefix
        "invalid", // No German health insurance pattern
      ],
    });
  });

  describe("FRENCH_SOCIAL_SECURITY_NUMBER", () => {
    testPolicySuite({
      policyName: "FRENCH_SOCIAL_SECURITY_NUMBER",
      replacement: "[FR_SOCIAL_SECURITY]",
      shouldMatch: [
        "123456789012345", // French social security 15 digits
        "298765432109876", // French SSN starting with 2
      ],
      shouldNotMatch: [
        "012345678901234", // Cannot start with 0
        "invalid", // No French SSN pattern
      ],
    });
  });

  describe("EUROPEAN_HEALTH_INSURANCE_CARD", () => {
    testPolicySuite({
      policyName: "EUROPEAN_HEALTH_INSURANCE_CARD",
      replacement: "[EHIC_NUMBER]",
      shouldMatch: [
        "EHIC: 123456789012", // European health insurance card 12 digits
        "ehic: 9876543210123456", // EHIC 16 digits
      ],
      shouldNotMatch: [
        "ehic: 123", // Too short to be valid
        "invalid", // No EHIC pattern
      ],
    });
  });
});
