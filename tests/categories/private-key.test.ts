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
        "-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEA... -----END RSA PRIVATE KEY-----", // RSA private key PEM format
        "-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEA1234567890abcdef... -----END RSA PRIVATE KEY-----", // RSA key with base64
        "-----BEGIN RSA PRIVATE KEY----- ABCDEFGHIJKLMNOP... -----END RSA PRIVATE KEY-----", // RSA key uppercase
        "-----BEGIN RSA PRIVATE KEY----- zyxwvutsrqponmlk... -----END RSA PRIVATE KEY-----", // RSA key lowercase
        "-----BEGIN RSA PRIVATE KEY----- 0123456789ABCDEF... -----END RSA PRIVATE KEY-----", // RSA key alphanumeric
      ],
      shouldNotMatch: [
        "-----BEGIN EC PRIVATE KEY----- content -----END EC PRIVATE KEY-----", // EC not RSA
        "regular text", // No private key pattern
        "-----BEGIN RSA PRIVATE KEY-----", // Missing end marker
        "-----END RSA PRIVATE KEY-----", // Missing begin marker
        "-----BEGIN RSA PUBLIC KEY----- content -----END RSA PUBLIC KEY-----", // Public not private
        "BEGIN RSA PRIVATE KEY content END RSA PRIVATE KEY", // Missing dashes
      ],
    });
  });

  describe("EC_PRIVATE_KEY", () => {
    testPolicySuite({
      policyName: "EC_PRIVATE_KEY",
      replacement: "[EC_PRIVATE_KEY]",
      shouldMatch: [
        "-----BEGIN EC PRIVATE KEY----- MHcCAQEEIA... -----END EC PRIVATE KEY-----", // EC private key PEM format
        "-----BEGIN EC PRIVATE KEY----- ABCDEFGHIJ... -----END EC PRIVATE KEY-----", // EC key uppercase
        "-----BEGIN EC PRIVATE KEY----- 1234567890... -----END EC PRIVATE KEY-----", // EC key numeric
        "-----BEGIN EC PRIVATE KEY----- zyxwvutsrq... -----END EC PRIVATE KEY-----", // EC key lowercase
        "-----BEGIN EC PRIVATE KEY----- 0000000000... -----END EC PRIVATE KEY-----", // EC key all zeros
      ],
      shouldNotMatch: [
        "-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----", // RSA not EC
        "-----BEGIN EC PRIVATE KEY-----", // Missing end marker
        "-----END EC PRIVATE KEY-----", // Missing begin marker
        "BEGIN EC PRIVATE KEY content END EC PRIVATE KEY", // Missing dashes
        "-----BEGIN EC PUBLIC KEY----- content -----END EC PUBLIC KEY-----", // Public not private
      ],
    });
  });

  describe("OPENSSH_PRIVATE_KEY", () => {
    testPolicySuite({
      policyName: "OPENSSH_PRIVATE_KEY",
      replacement: "[OPENSSH_PRIVATE_KEY]",
      shouldMatch: [
        "-----BEGIN OPENSSH PRIVATE KEY----- b3BlbnNzaC1rZXktdjEA... -----END OPENSSH PRIVATE KEY-----", // OpenSSH private key format
        "-----BEGIN OPENSSH PRIVATE KEY----- ABCDEFGHIJKLMNOP... -----END OPENSSH PRIVATE KEY-----", // OpenSSH key uppercase
        "-----BEGIN OPENSSH PRIVATE KEY----- 1234567890abcdef... -----END OPENSSH PRIVATE KEY-----", // OpenSSH key alphanumeric
        "-----BEGIN OPENSSH PRIVATE KEY----- zyxwvutsrqponmlk... -----END OPENSSH PRIVATE KEY-----", // OpenSSH key lowercase
        "-----BEGIN OPENSSH PRIVATE KEY----- 0000000000000000... -----END OPENSSH PRIVATE KEY-----", // OpenSSH key all zeros
      ],
      shouldNotMatch: [
        "-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----", // RSA not OpenSSH
        "-----BEGIN OPENSSH PRIVATE KEY-----", // Missing end marker
        "-----END OPENSSH PRIVATE KEY-----", // Missing begin marker
        "BEGIN OPENSSH PRIVATE KEY content END OPENSSH PRIVATE KEY", // Missing dashes
        "-----BEGIN SSH2 ENCRYPTED PRIVATE KEY----- content -----END SSH2 ENCRYPTED PRIVATE KEY-----", // SSH2 not OpenSSH
      ],
    });
  });

  describe("GENERIC_PRIVATE_KEY", () => {
    testPolicySuite({
      policyName: "GENERIC_PRIVATE_KEY",
      replacement: "[PRIVATE_KEY]",
      shouldMatch: [
        "-----BEGIN PRIVATE KEY----- MIIEvQIBADANBgkqhkiG9w0BAQ... -----END PRIVATE KEY-----", // Generic PKCS#8 private key
        "-----BEGIN DSA PRIVATE KEY----- content -----END DSA PRIVATE KEY-----", // DSA private key
        "-----BEGIN EC PRIVATE KEY----- content -----END EC PRIVATE KEY-----", // EC private key
        "-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----", // RSA private key
        "-----BEGIN OPENSSH PRIVATE KEY----- b3BlbnNzaC... -----END OPENSSH PRIVATE KEY-----", // OpenSSH private key
      ],
      shouldNotMatch: [
        "-----BEGIN PUBLIC KEY----- content -----END PUBLIC KEY-----", // Public not private
        "regular text", // No private key pattern
        "-----BEGIN PRIVATE KEY-----", // Missing end marker
        "-----END PRIVATE KEY-----", // Missing begin marker
        "BEGIN PRIVATE KEY content END PRIVATE KEY", // Missing dashes
        "-----BEGIN CERTIFICATE----- content -----END CERTIFICATE-----", // Certificate not key
      ],
    });
  });
});
