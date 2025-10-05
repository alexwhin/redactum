import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("private key patterns", () => {
  testCategoryCoverage(PolicyCategory.PRIVATE_KEY, [
    "RSA_PRIVATE_KEY",
    "EC_PRIVATE_KEY",
    "OPENSSH_PRIVATE_KEY",
    "GENERIC_PRIVATE_KEY",
  ]);

  describe("RSA_PRIVATE_KEY", () => {
    testPolicySuite({
      policyName: "RSA_PRIVATE_KEY",
      replacement: "[RSA_PRIVATE_KEY]",
      shouldMatch: [
        "-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEA... -----END RSA PRIVATE KEY-----",
        "-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEA1234567890abcdef... -----END RSA PRIVATE KEY-----",
        "-----BEGIN RSA PRIVATE KEY----- ABCDEFGHIJKLMNOP... -----END RSA PRIVATE KEY-----",
        "-----BEGIN RSA PRIVATE KEY----- zyxwvutsrqponmlk... -----END RSA PRIVATE KEY-----",
        "-----BEGIN RSA PRIVATE KEY----- 0123456789ABCDEF... -----END RSA PRIVATE KEY-----",
      ],
      shouldNotMatch: [
        "-----BEGIN EC PRIVATE KEY----- content -----END EC PRIVATE KEY-----",
        "regular text",
        "-----BEGIN RSA PRIVATE KEY-----",
        "-----END RSA PRIVATE KEY-----",
        "-----BEGIN RSA PUBLIC KEY----- content -----END RSA PUBLIC KEY-----",
        "BEGIN RSA PRIVATE KEY content END RSA PRIVATE KEY",
      ],
    });
  });

  describe("EC_PRIVATE_KEY", () => {
    testPolicySuite({
      policyName: "EC_PRIVATE_KEY",
      replacement: "[EC_PRIVATE_KEY]",
      shouldMatch: [
        "-----BEGIN EC PRIVATE KEY----- MHcCAQEEIA... -----END EC PRIVATE KEY-----",
        "-----BEGIN EC PRIVATE KEY----- ABCDEFGHIJ... -----END EC PRIVATE KEY-----",
        "-----BEGIN EC PRIVATE KEY----- 1234567890... -----END EC PRIVATE KEY-----",
        "-----BEGIN EC PRIVATE KEY----- zyxwvutsrq... -----END EC PRIVATE KEY-----",
        "-----BEGIN EC PRIVATE KEY----- 0000000000... -----END EC PRIVATE KEY-----",
      ],
      shouldNotMatch: [
        "-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----",
        "-----BEGIN EC PRIVATE KEY-----",
        "-----END EC PRIVATE KEY-----",
        "BEGIN EC PRIVATE KEY content END EC PRIVATE KEY",
        "-----BEGIN EC PUBLIC KEY----- content -----END EC PUBLIC KEY-----",
      ],
    });
  });

  describe("OPENSSH_PRIVATE_KEY", () => {
    testPolicySuite({
      policyName: "OPENSSH_PRIVATE_KEY",
      replacement: "[OPENSSH_PRIVATE_KEY]",
      shouldMatch: [
        "-----BEGIN OPENSSH PRIVATE KEY----- b3BlbnNzaC1rZXktdjEA... -----END OPENSSH PRIVATE KEY-----",
        "-----BEGIN OPENSSH PRIVATE KEY----- ABCDEFGHIJKLMNOP... -----END OPENSSH PRIVATE KEY-----",
        "-----BEGIN OPENSSH PRIVATE KEY----- 1234567890abcdef... -----END OPENSSH PRIVATE KEY-----",
        "-----BEGIN OPENSSH PRIVATE KEY----- zyxwvutsrqponmlk... -----END OPENSSH PRIVATE KEY-----",
        "-----BEGIN OPENSSH PRIVATE KEY----- 0000000000000000... -----END OPENSSH PRIVATE KEY-----",
      ],
      shouldNotMatch: [
        "-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----",
        "-----BEGIN OPENSSH PRIVATE KEY-----",
        "-----END OPENSSH PRIVATE KEY-----",
        "BEGIN OPENSSH PRIVATE KEY content END OPENSSH PRIVATE KEY",
        "-----BEGIN SSH2 ENCRYPTED PRIVATE KEY----- content -----END SSH2 ENCRYPTED PRIVATE KEY-----",
      ],
    });
  });

  describe("GENERIC_PRIVATE_KEY", () => {
    testPolicySuite({
      policyName: "GENERIC_PRIVATE_KEY",
      replacement: "[PRIVATE_KEY]",
      shouldMatch: [
        "-----BEGIN PRIVATE KEY----- MIIEvQIBADANBgkqhkiG9w0BAQ... -----END PRIVATE KEY-----",
        "-----BEGIN DSA PRIVATE KEY----- content -----END DSA PRIVATE KEY-----",
        "-----BEGIN EC PRIVATE KEY----- content -----END EC PRIVATE KEY-----",
        "-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----",
        "-----BEGIN OPENSSH PRIVATE KEY----- b3BlbnNzaC... -----END OPENSSH PRIVATE KEY-----",
      ],
      shouldNotMatch: [
        "-----BEGIN PUBLIC KEY----- content -----END PUBLIC KEY-----",
        "regular text",
        "-----BEGIN PRIVATE KEY-----",
        "-----END PRIVATE KEY-----",
        "BEGIN PRIVATE KEY content END PRIVATE KEY",
        "-----BEGIN CERTIFICATE----- content -----END CERTIFICATE-----",
      ],
    });
  });
});
