import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("package registry patterns", () => {
  testCategoryCoverage(PolicyCategory.PACKAGE_REGISTRY, [
    "NPM_TOKEN",
    "PYPI_TOKEN",
    "QUAY_IO_TOKEN",
    "JFROG_ARTIFACTORY_TOKEN",
    "NEXUS_REPOSITORY_TOKEN",
  ]);

  describe("NPM_TOKEN", () => {
    testPolicySuite({
      policyName: "NPM_TOKEN",
      replacement: "[NPM_TOKEN]",
      shouldMatch: [
        "npm_abc123abc123abc123abc123abc123abc123", // standard npm token (exactly 36 chars)
        "npm_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // all A's (36 chars)
        "npm_000000000000000000000000000000000000", // all zeros (36 chars)
        "npm_zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", // all z's (36 chars)
        "npm_123456789012345678901234567890123456", // all digits (36 chars)
        "npm_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij", // mixed case (36 chars)
      ],
      shouldNotMatch: [
        "npm_short", // too short
        "npm_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // 37 chars (too long)
        "npm_0000000000000000000000000000000000000", // 37 chars (too long)
        "npm_zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", // 37 chars (too long)
        "npm-token", // hyphen not underscore
        "regular text", // plain text
        "npm_", // missing token value
        "npm_abc", // too short
        "npmtoken1234567890", // missing underscore
      ],
    });
  });

  describe("PYPI_TOKEN", () => {
    testPolicySuite({
      policyName: "PYPI_TOKEN",
      replacement: "[PYPI_TOKEN]",
      shouldMatch: [
        "pypi-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // all A's (59 chars)
        "pypi-00000000000000000000000000000000000000000000000000000000000", // all zeros (59 chars)
        "pypi-zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", // all z's (59 chars)
        "pypi-12345678901234567890123456789012345678901234567890123456789", // all digits (59 chars)
      ],
      shouldNotMatch: [
        "pypi-short", // too short
        "pypi-ABC-DEF_123-ABC-DEF_456-ABC-DEF_789-ABC-DEF_012-ABC-DEF_3", // 57 chars after pypi- (need exactly 59)
        "pypi-1234567890123456789012345678901234567890123456789012345678", // 58 chars after pypi- (need exactly 59)
        "invalid token", // plain text
        "pypi_token", // underscore not hyphen
        "pypi-", // missing token value
        "pypi-abc123", // too short
        "pyptoken123456", // missing hyphen
      ],
    });
  });

  describe("QUAY_IO_TOKEN", () => {
    testPolicySuite({
      policyName: "QUAY_IO_TOKEN",
      replacement: "[QUAY_TOKEN]",
      shouldMatch: [
        "quay.io-token: 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // standard with label (50 chars)
        "quay.io-robot: abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGH", // robot token (50 chars)
        "quay.io-robot: deadbeefCAFEBABEdeadbeefCAFEBABE123456789012", // hex pattern (50 chars)
        "quay.io-token: 9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA987654", // reverse (50 chars)
        "quay.io-robot: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890AbCdEf", // mixed case (50 chars)
        "quay.io-token: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890+/=abc", // with base64 chars (50 chars)
      ],
      shouldNotMatch: [
        "quay.io-token: ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", // 39 chars (too short)
        "quay.io-token: short", // too short
        "invalid", // plain text
        "quay-token: 1234567890", // missing .io
        "quay.io-token:", // missing token value
        "quay.io-robot: abc", // too short
        "quaytoken", // missing label
      ],
    });
  });

  describe("JFROG_ARTIFACTORY_TOKEN", () => {
    testPolicySuite({
      policyName: "JFROG_ARTIFACTORY_TOKEN",
      replacement: "[ARTIFACTORY_TOKEN]",
      shouldMatch: [
        "AKCp1234567890abcdefghijklmnopqrstuvwxyz", // standard AKCp token (min 10 chars after AKC)
        "AKC1234567890abcdef", // plain AKC with 15 chars after
        "AKCp9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA", // reverse pattern (more than 10)
        "AKCabcdefghijklmnop", // alphanumeric (min 10 chars after AKC)
        "AKCdeadbeefcafebabe1234567890", // hex pattern (more than 10)
        "artifactory-api-key: AKC0123456789abcdef", // api-key variant
        "artifactory-token: ABC123", // matches "artifactory-token" pattern (first alternative in regex)
      ],
      shouldNotMatch: [
        "AKC123", // too short (only 3 chars after AKC)
        "AKCp", // too short (only 1 char after AKC)
        "AKCpaaaaaaaa", // 8 chars after AKC (need 10+)
        "invalid token", // plain text
        "AKP1234567890", // wrong prefix
        "token-value", // no AKC prefix
      ],
    });
  });

  describe("NEXUS_REPOSITORY_TOKEN", () => {
    testPolicySuite({
      policyName: "NEXUS_REPOSITORY_TOKEN",
      replacement: "[NEXUS_TOKEN]",
      shouldMatch: [
        "nexus-token: 1234567890abcdef-1234-1234-1234", // standard with UUID pattern (20+ chars)
        "nexus-password: secretpassword123456", // password format (exactly 20 chars)
        "nexus-token: abcdefghijklmnop-5678-9012-3456", // alphanumeric (20+ chars)
        "nexus-token: 0000000000000000-0000-0000-0000", // all zeros (20+ chars)
        "nexus-token: aaaaaaaaaaaaaaaa-aaaa-aaaa-aaaa", // all a's (20+ chars)
        "nexus-password: 12345678901234567890", // exactly 20 chars
        "nexus-password: nexus123SecretToken0", // 21 chars alphanumeric
      ],
      shouldNotMatch: [
        "nexus-password: MyP@ssw0rd!Secret123", // contains special chars @ and ! not in pattern
        "nexus-password: Str0ng!P@ssw0rd789", // contains special chars ! and @ not in pattern
        "nexus-password: nexus123SecretToken", // only 19 chars (need 20+)
        "nexus-token: abc", // too short
        "invalid", // plain text
        "nexus-password: a", // too short
        "nexus-token:", // missing token value
        "nexus-password:", // missing password
        "nexustoken", // missing label
      ],
    });
  });
});
