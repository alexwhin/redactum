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
        "+442071234567", // London landline (international format)
        "+441234567890", // standard landline (international format)
        "02071234567", // London landline (national format)
        "01234567890", // standard landline (national format)
        "+447911123456", // mobile number (international format)
        "07700900123", // mobile number (national format)
        "+441632960123", // valid test number (Ofcom range)
        "01632960456", // valid test number (national format)
        "+443001234567", // 0300 non-geographic number
        "Call: +442087654321", // in sentence with label
        "Tel: 02087654321", // with label prefix
        "+447400123456", // mobile (07400 range)
        "08001234567", // 0800 freephone number
        "+448081234567", // 0808 freephone (international)
        "09991234567", // 0999 area code (pattern allows it)
      ],
      shouldNotMatch: [
        "+4400000000", // invalid (too short for UK)
        "0123", // too short
        "regular text", // plain text
        "+44123", // too short
        "0123456", // too short
        "+44", // just country code
        "012345678901234", // too long
      ],
    });
  });

  describe("PHONE_NUMBER_CANADIAN", () => {
    testPolicySuite({
      policyName: "PHONE_NUMBER_CANADIAN",
      replacement: "[PHONE]",
      shouldMatch: [
        "+1-416-555-0123", // Toronto area code (Ontario)
        "1 416 555 0123", // Toronto with spaces
        "(416) 555-0123", // Toronto with parentheses
        "+1-604-555-0199", // Vancouver area code (BC)
        "1 514 555 0123", // Montreal area code (Quebec)
        "(250) 555-0123", // Victoria/Kamloops area code (BC)
        "+1-403-555-0100", // Calgary area code (Alberta)
        "1 613 555 0123", // Ottawa area code (Ontario)
        "+1-778-555-0145", // BC overlay area code
        "(905) 555-0199", // Greater Toronto area (GTA)
        "1 647 555 0123", // Toronto overlay area code
        "+1-438-555-0188", // Montreal overlay area code
        "+1-211-555-0123", // 211 area code (pattern allows N11)
      ],
      shouldNotMatch: [
        "+1-111-555-0123", // invalid area code (N11 reserved)
        "123-456-7890", // missing country code or wrong format
        "+1-000-555-0123", // invalid area code (000)
        "1 100 555 0123", // invalid area code (N00 not valid)
        "(111) 555-0123", // invalid area code (N11 reserved)
        "+1-555-5555", // incomplete number
      ],
    });
  });

  describe("PHONE_NUMBER_INTERNATIONAL", () => {
    testPolicySuite({
      policyName: "PHONE_NUMBER_INTERNATIONAL",
      replacement: "[PHONE]",
      shouldMatch: [
        "Call +14155551234", // US number (international format)
        "Contact +33123456789", // France number
        "Phone +861234567890", // China number
        "+442071234567", // UK number
        "+4915123456789", // Germany mobile
        "+81312345678", // Japan (Tokyo)
        "+61212345678", // Australia number
        "+551199887766", // Brazil (São Paulo)
        "+35314012345", // Ireland (Dublin)
        "+31201234567", // Netherlands (Amsterdam)
        "+46812345678", // Sweden (Stockholm)
        "+34911234567", // Spain (Madrid)
        "+390212345678", // Italy (Milan)
        "+41443456789", // Switzerland (Zurich)
      ],
      shouldNotMatch: [
        "+0123456789", // invalid country code (0)
        "++1234567890", // double plus sign
        "+", // just plus sign
        "1234567890", // missing country code prefix
        "123456", // too short
        "international", // plain text
      ],
    });
  });

  describe("PHONE_NUMBER_US", () => {
    testPolicySuite({
      policyName: "PHONE_NUMBER_US",
      replacement: "[PHONE]",
      shouldMatch: [
        "555-123-4567", // standard format with hyphens
        "(555) 123-4567", // with parentheses around area code
        "555.123.4567", // with dots
        "+1-555-123-4567", // international format
        "5551234567", // no separators
        "(800) 555-0199", // toll-free number
        "202-456-1111", // DC area code (White House)
        "+1-212-555-0123", // NYC area code (international)
        "9995551234", // valid area code (999)
        "555.867.5309", // famous test number (Tommy Tutone)
        "Call: (415) 555-0100", // in sentence with label
        "1-800-555-0199", // toll-free with country code
        "+1 (555) 867-5309", // international with spaces and parens
        "(702) 555-0123", // Las Vegas area code
      ],
      shouldNotMatch: [
        "123-45-6789", // SSN format (not phone)
        "555-12-345", // wrong digit grouping
        "regular text", // plain text
        "555-1234", // missing area code
        "(555) 12-3456", // wrong digit grouping
        "55512345", // too short (8 digits)
        "phone", // plain text
      ],
    });
  });
});
