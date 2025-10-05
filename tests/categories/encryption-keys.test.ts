import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("encryption keys patterns", () => {
  testCategoryCoverage(PolicyCategory.ENCRYPTION_KEYS, [
    "SSH_KEY_FINGERPRINT",
    "PGP_KEY_ID",
    "AGE_SECRET_KEY",
    "AGE_PUBLIC_KEY",
    "AWS_KMS_KEY_ID",
    "GCP_KMS_KEY",
    "AZURE_KEY_IDENTIFIER",
    "MASTER_KEY",
  ]);

  describe("SSH_KEY_FINGERPRINT", () => {
    testPolicySuite({
      policyName: "SSH_KEY_FINGERPRINT",
      replacement: "[SSH_KEY_FINGERPRINT]",
      shouldMatch: [
        "SHA256:1234567890abcdefghijklmnopqrstuvwxyz1234567",
        "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8",
        "MD5:12:34:56:78:90:ab:cd:ef:12:34:56:78:90:ab:cd:ef",
        "MD5:aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99",
      ],
      shouldNotMatch: [
        "SHA256:tooshort",
        "MD5:invalid",
        "SHA1:notasupportedformat",
        "regular text",
      ],
    });
  });

  describe("PGP_KEY_ID", () => {
    testPolicySuite({
      policyName: "PGP_KEY_ID",
      replacement: "[PGP_KEY_ID]",
      shouldMatch: [
        "0x1234567890ABCDEF",
        "0xABCDEF1234567890",
        "1234567890ABCDEF",
        "0x1234567890ABCDEF1234567890ABCDEF12345678",
        "0x12345678",
        "ABCDEF12",
      ],
      shouldNotMatch: ["0xGHIJKL", "0x123", "regular text"],
    });
  });

  describe("AGE_SECRET_KEY", () => {
    testPolicySuite({
      policyName: "AGE_SECRET_KEY",
      replacement: "[AGE_SECRET_KEY]",
      shouldMatch: [
        "AGE-SECRET-KEY-1QYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQY",
        "AGE-SECRET-KEY-1ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUV",
      ],
      shouldNotMatch: [
        "AGE-SECRET-KEY-1TOOSHORT",
        "AGE-SECRET-KEY-2WRONGPREFIX",
        "age-secret-key-1lowercase",
        "invalid",
      ],
    });
  });

  describe("AGE_PUBLIC_KEY", () => {
    testPolicySuite({
      policyName: "AGE_PUBLIC_KEY",
      replacement: "[AGE_PUBLIC_KEY]",
      shouldMatch: [
        "age1abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuv",
        "age1qyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqy",
      ],
      shouldNotMatch: [
        "age1UPPERCASE",
        "age1tooshort",
        "age2wrongprefix",
        "invalid",
      ],
    });
  });

  describe("AWS_KMS_KEY_ID", () => {
    testPolicySuite({
      policyName: "AWS_KMS_KEY_ID",
      replacement: "[KMS_KEY_ID]",
      shouldMatch: [
        "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012",
        "arn:aws:kms:eu-west-1:999999999999:key/abcdef01-2345-6789-abcd-ef0123456789",
        "12345678-1234-1234-1234-123456789012",
        "abcdef01-2345-6789-abcd-ef0123456789",
      ],
      shouldNotMatch: [
        "12345678-1234-1234-1234",
        "GHIJKLMN-1234-1234-1234-123456789012",
        "invalid",
      ],
    });
  });

  describe("GCP_KMS_KEY", () => {
    testPolicySuite({
      policyName: "GCP_KMS_KEY",
      replacement: "[GCP_KMS_KEY]",
      shouldMatch: [
        "projects/my-project/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key",
        "projects/test-123/locations/europe-west1/keyRings/prod-ring/cryptoKeys/encryption-key",
      ],
      shouldNotMatch: [
        "projects/my-project",
        "projects/my-project/locations/us-central1",
        "invalid",
      ],
    });
  });

  describe("AZURE_KEY_IDENTIFIER", () => {
    testPolicySuite({
      policyName: "AZURE_KEY_IDENTIFIER",
      replacement: "[AZURE_KEY_ID]",
      shouldMatch: [
        "https://myvault.vault.azure.net/keys/mykey/1234567890abcdef1234567890abcdef",
        "https://prod-vault.vault.azure.net/keys/encryption-key/abcdef1234567890abcdef1234567890",
      ],
      shouldNotMatch: [
        "https://myvault.vault.azure.net/secrets/mysecret/abc",
        "https://myvault.vault.azure.net/keys/mykey",
        "invalid",
      ],
    });
  });

  describe("MASTER_KEY", () => {
    testPolicySuite({
      policyName: "MASTER_KEY",
      replacement: "[MASTER_KEY]",
      shouldMatch: [
        "master_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=",
        "master-key: dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk",
        "master_key=YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkw",
        "encryption_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=",
        "encryption-key=dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk",
        "secret_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=",
        "secret-key=dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk",
      ],
      shouldNotMatch: [
        "master_key: short",
        "encryption_key: abc123",
        "invalid",
      ],
    });
  });
});
