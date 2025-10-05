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
        "SHA256:1234567890abcdefghijklmnopqrstuvwxyz1234567", // SSH SHA256 fingerprint
        "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8", // SSH SHA256 base64 format
        "MD5:12:34:56:78:90:ab:cd:ef:12:34:56:78:90:ab:cd:ef", // SSH MD5 fingerprint
        "MD5:aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99", // SSH MD5 hex format
      ],
      shouldNotMatch: [
        "SHA256:tooshort", // SHA256 too short
        "MD5:invalid", // Invalid MD5 format
        "SHA1:notasupportedformat", // SHA1 not supported
        "regular text", // No fingerprint pattern
      ],
    });
  });

  describe("PGP_KEY_ID", () => {
    testPolicySuite({
      policyName: "PGP_KEY_ID",
      replacement: "[PGP_KEY_ID]",
      shouldMatch: [
        "0x1234567890ABCDEF", // PGP key ID with 0x prefix 16 chars
        "0xABCDEF1234567890", // PGP key ID hex format
        "1234567890ABCDEF", // PGP key ID without prefix
        "0x1234567890ABCDEF1234567890ABCDEF12345678", // Long PGP key ID 40 chars
        "0x12345678", // Short PGP key ID 8 chars
        "ABCDEF12", // Short PGP key without prefix
      ],
      shouldNotMatch: [
        "0xGHIJKL", // Invalid hex chars G-L
        "0x123", // Too short less than 8 chars
        "regular text", // No PGP key pattern
      ],
    });
  });

  describe("AGE_SECRET_KEY", () => {
    testPolicySuite({
      policyName: "AGE_SECRET_KEY",
      replacement: "[AGE_SECRET_KEY]",
      shouldMatch: [
        "AGE-SECRET-KEY-1QYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQY", // Age encryption secret key
        "AGE-SECRET-KEY-1ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUV", // Age secret key alphanumeric
      ],
      shouldNotMatch: [
        "AGE-SECRET-KEY-1TOOSHORT", // Too short for valid age key
        "AGE-SECRET-KEY-2WRONGPREFIX", // Wrong version prefix must be 1
        "age-secret-key-1lowercase", // Must be uppercase
        "invalid", // No age secret key pattern
      ],
    });
  });

  describe("AGE_PUBLIC_KEY", () => {
    testPolicySuite({
      policyName: "AGE_PUBLIC_KEY",
      replacement: "[AGE_PUBLIC_KEY]",
      shouldMatch: [
        "age1abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuv", // Age encryption public key
        "age1qyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqy", // Age public key bech32 format
      ],
      shouldNotMatch: [
        "age1UPPERCASE", // Must be lowercase
        "age1tooshort", // Too short for valid age public key
        "age2wrongprefix", // Wrong version must be age1
        "invalid", // No age public key pattern
      ],
    });
  });

  describe("AWS_KMS_KEY_ID", () => {
    testPolicySuite({
      policyName: "AWS_KMS_KEY_ID",
      replacement: "[KMS_KEY_ID]",
      shouldMatch: [
        "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012", // AWS KMS ARN format
        "arn:aws:kms:eu-west-1:999999999999:key/abcdef01-2345-6789-abcd-ef0123456789", // AWS KMS ARN EU region
        "12345678-1234-1234-1234-123456789012", // AWS KMS key ID UUID only
        "abcdef01-2345-6789-abcd-ef0123456789", // AWS KMS key ID hex format
      ],
      shouldNotMatch: [
        "12345678-1234-1234-1234", // Incomplete UUID format
        "GHIJKLMN-1234-1234-1234-123456789012", // Invalid hex chars in UUID
        "invalid", // No AWS KMS key pattern
      ],
    });
  });

  describe("GCP_KMS_KEY", () => {
    testPolicySuite({
      policyName: "GCP_KMS_KEY",
      replacement: "[GCP_KMS_KEY]",
      shouldMatch: [
        "projects/my-project/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key", // GCP KMS full resource path
        "projects/test-123/locations/europe-west1/keyRings/prod-ring/cryptoKeys/encryption-key", // GCP KMS EU region
      ],
      shouldNotMatch: [
        "projects/my-project", // Missing locations and keys
        "projects/my-project/locations/us-central1", // Missing keyRings and cryptoKeys
        "invalid", // No GCP KMS key pattern
      ],
    });
  });

  describe("AZURE_KEY_IDENTIFIER", () => {
    testPolicySuite({
      policyName: "AZURE_KEY_IDENTIFIER",
      replacement: "[AZURE_KEY_ID]",
      shouldMatch: [
        "https://myvault.vault.azure.net/keys/mykey/1234567890abcdef1234567890abcdef", // Azure Key Vault key identifier
        "https://prod-vault.vault.azure.net/keys/encryption-key/abcdef1234567890abcdef1234567890", // Azure prod vault key
      ],
      shouldNotMatch: [
        "https://myvault.vault.azure.net/secrets/mysecret/abc", // Secret not key
        "https://myvault.vault.azure.net/keys/mykey", // Missing version identifier
        "invalid", // No Azure key identifier pattern
      ],
    });
  });

  describe("MASTER_KEY", () => {
    testPolicySuite({
      policyName: "MASTER_KEY",
      replacement: "[MASTER_KEY]",
      shouldMatch: [
        "master_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=", // Master key base64 encoded
        "master-key: dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk", // Master key hyphen format
        "master_key=YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkw", // Master key assignment format
        "encryption_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=", // Encryption key base64
        "encryption-key=dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk", // Encryption key assignment
        "secret_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=", // Secret key base64
        "secret-key=dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk", // Secret key hyphen assignment
      ],
      shouldNotMatch: [
        "master_key: short", // Too short not base64
        "encryption_key: abc123", // Too short to be valid
        "invalid", // No master key pattern
      ],
    });
  });
});
