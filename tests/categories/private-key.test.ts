import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("private key patterns", () => {
  const privateKeyPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.PRIVATE_KEY,
  );

  it("should have private key patterns", () => {
    expect(privateKeyPatterns.length).toBeGreaterThan(0);
  });

  describe("RSA_PRIVATE_KEY", () => {
    const pattern = privateKeyPatterns.find((p) => p.name === "RSA_PRIVATE_KEY");

    it("should detect RSA private keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEA... -----END RSA PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match other key types", () => {
      expect(
        "-----BEGIN EC PRIVATE KEY----- content -----END EC PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeFalsy();
    });
  });

  describe("EC_PRIVATE_KEY", () => {
    const pattern = privateKeyPatterns.find((p) => p.name === "EC_PRIVATE_KEY");

    it("should detect EC private keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "-----BEGIN EC PRIVATE KEY----- MHcCAQEEIA... -----END EC PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match other key types", () => {
      expect(
        "-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeFalsy();
    });
  });

  describe("OPENSSH_PRIVATE_KEY", () => {
    const pattern = privateKeyPatterns.find(
      (p) => p.name === "OPENSSH_PRIVATE_KEY",
    );

    it("should detect OpenSSH private keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "-----BEGIN OPENSSH PRIVATE KEY----- b3BlbnNzaC1rZXktdjEA... -----END OPENSSH PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match other key types", () => {
      expect(
        "-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeFalsy();
    });
  });

  describe("GENERIC_PRIVATE_KEY", () => {
    const pattern = privateKeyPatterns.find(
      (p) => p.name === "GENERIC_PRIVATE_KEY",
    );

    it("should detect generic private keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "-----BEGIN PRIVATE KEY----- MIIEvQIBADANBgkqhkiG9w0BAQ... -----END PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "-----BEGIN DSA PRIVATE KEY----- content -----END DSA PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "-----BEGIN EC PRIVATE KEY----- content -----END EC PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match public keys", () => {
      expect(
        "-----BEGIN PUBLIC KEY----- content -----END PUBLIC KEY-----".match(
          pattern!.pattern,
        ),
      ).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const rsaPattern = privateKeyPatterns.find(
      (p) => p.name === "RSA_PRIVATE_KEY",
    );

    expect("regular text".match(rsaPattern!.pattern)).toBeFalsy();
  });
});
