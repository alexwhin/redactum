import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("geographic patterns", () => {
  testCategoryCoverage(PolicyCategory.GEOGRAPHIC, [
    "US_ZIP_CODE",
    "CANADIAN_POSTAL_CODE",
    "UK_POSTCODE",
    "GPS_COORDINATES",
  ]);

  describe("US_ZIP_CODE", () => {
    testPolicySuite({
      policyName: "US_ZIP_CODE",
      replacement: "[ZIP]",
      shouldMatch: [
        "12345", // 5-digit ZIP
        "12345-6789", // ZIP+4 format
        "90210", // Beverly Hills
        "10001", // New York
        "60601", // Chicago
        "02134", // Boston
        "94102", // San Francisco
        "33101-1234", // Miami ZIP+4
        "00000", // all zeros
        "99999-9999", // all nines
        "12345-678", // matches 12345 (valid 5-digit ZIP, ignores -678)
        "12345-67890", // matches both 12345 and 67890 as separate ZIPs
      ],
      shouldNotMatch: [
        "1234", // 4 digits (too short)
        "123456", // 6 digits (too long without hyphen)
        "regular text", // plain text
        "zip code", // text label
      ],
    });
  });

  describe("CANADIAN_POSTAL_CODE", () => {
    testPolicySuite({
      policyName: "CANADIAN_POSTAL_CODE",
      replacement: "[POSTAL_CODE]",
      shouldMatch: [
        "K1A 0B1", // standard with space
        "K1A0B1", // without space
        "M5V 3A8", // Toronto
        "V6B 1A1", // Vancouver
        "H2Y 1C6", // Montreal
        "T2P 2M5", // Calgary
        "R3C 0A6", // Winnipeg
        "A1A 1A1", // repeating pattern
        "Z9Z9Z9", // no space format
        "B2B 2B2", // repeating B's
      ],
      shouldNotMatch: [
        "K1A0B", // too short
        "123456", // all digits
        "K1A-0B1", // hyphen instead of space
        "K1A  0B1", // double space
        "postal code", // text label
        "regular text", // plain text
      ],
    });
  });

  describe("UK_POSTCODE", () => {
    testPolicySuite({
      policyName: "UK_POSTCODE",
      replacement: "[POSTCODE]",
      shouldMatch: [
        "SW1A 1AA", // Buckingham Palace
        "M1 1AE", // Manchester
        "B33 8TH", // Birmingham
        "CR2 6XH", // Croydon
        "DN55 1PT", // Doncaster
        "W1A 0AX", // BBC Broadcasting House
        "EC1A 1BB", // City of London
        "NW1 6XE", // London
        "G1 1AA", // Glasgow
        "EH1 1AA", // Edinburgh
      ],
      shouldNotMatch: [
        "INVALID", // plain text
        "regular text", // plain text
        "SW1A", // incomplete
        "123 456", // all numbers
        "SW1A-1AA", // hyphen instead of space
        "postcode", // text label
      ],
    });
  });

  describe("GPS_COORDINATES", () => {
    testPolicySuite({
      policyName: "GPS_COORDINATES",
      replacement: "[COORDINATES]",
      shouldMatch: [
        "40.7128,-74.0060", // New York City
        "-33.8688, 151.2093", // Sydney
        "51.5074,-0.1278", // London
        "48.8566,2.3522", // Paris
        "35.6762,139.6503", // Tokyo
        "-22.9068,-43.1729", // Rio de Janeiro
        "1.3521,103.8198", // Singapore
        "-37.8136,144.9631", // Melbourne
        "55.7558,37.6173", // Moscow
        "34.0522,-118.2437", // Los Angeles
      ],
      shouldNotMatch: [
        "40.7,-74.0", // too short precision
        "regular text", // plain text
        "40.7128", // missing longitude
        "-74.0060", // missing latitude
        "latitude,longitude", // text labels
        "gps coordinates", // text description
      ],
    });
  });
});
