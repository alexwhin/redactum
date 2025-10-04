import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("encryption keys patterns", () => {
  const encryptionPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.ENCRYPTION_KEYS,
  );

  it("should have encryption key patterns", () => {
    expect(encryptionPatterns.length).toBeGreaterThan(0);
  });

  describe("SSH_KEY_FINGERPRINT", () => {
    const pattern = encryptionPatterns.find(
      (p) => p.name === "SSH_KEY_FINGERPRINT",
    );

    it("should detect SHA256 fingerprints", () => {
      expect(pattern).toBeTruthy();
      expect(
        "SHA256:1234567890abcdefghijklmnopqrstuvwxyz1234567".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should detect MD5 fingerprints", () => {
      expect(
        "MD5:12:34:56:78:90:ab:cd:ef:12:34:56:78:90:ab:cd:ef".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "MD5:aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid fingerprints", () => {
      expect("SHA256:tooshort".match(pattern!.pattern)).toBeFalsy();
      expect("MD5:invalid".match(pattern!.pattern)).toBeFalsy();
      expect("SHA1:notasupportedformat".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PGP_KEY_ID", () => {
    const pattern = encryptionPatterns.find((p) => p.name === "PGP_KEY_ID");

    it("should detect PGP key IDs", () => {
      expect(pattern).toBeTruthy();
      expect("0x1234567890ABCDEF".match(pattern!.pattern)).toBeTruthy();
      expect("0xABCDEF1234567890".match(pattern!.pattern)).toBeTruthy();
      expect("1234567890ABCDEF".match(pattern!.pattern)).toBeTruthy();
    });

    it("should detect long form PGP key IDs", () => {
      expect(
        "0x1234567890ABCDEF1234567890ABCDEF12345678".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should detect short form PGP key IDs", () => {
      expect("0x12345678".match(pattern!.pattern)).toBeTruthy();
      expect("ABCDEF12".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid key IDs", () => {
      expect("0xGHIJKL".match(pattern!.pattern)).toBeFalsy();
      expect("0x123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AGE_SECRET_KEY", () => {
    const pattern = encryptionPatterns.find((p) => p.name === "AGE_SECRET_KEY");

    it("should detect age secret keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "AGE-SECRET-KEY-1QYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQY".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "AGE-SECRET-KEY-1ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUV".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid age secret keys", () => {
      expect("AGE-SECRET-KEY-1TOOSHORT".match(pattern!.pattern)).toBeFalsy();
      expect("AGE-SECRET-KEY-2WRONGPREFIX".match(pattern!.pattern)).toBeFalsy();
      expect(
        "age-secret-key-1lowercase".match(pattern!.pattern),
      ).toBeFalsy();
    });
  });

  describe("AGE_PUBLIC_KEY", () => {
    const pattern = encryptionPatterns.find((p) => p.name === "AGE_PUBLIC_KEY");

    it("should detect age public keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "age1abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuv".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "age1qyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqy".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid age public keys", () => {
      expect("age1UPPERCASE".match(pattern!.pattern)).toBeFalsy();
      expect("age1tooshort".match(pattern!.pattern)).toBeFalsy();
      expect("age2wrongprefix".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AWS_KMS_KEY_ID", () => {
    const pattern = encryptionPatterns.find((p) => p.name === "AWS_KMS_KEY_ID");

    it("should detect AWS KMS key IDs with ARN", () => {
      expect(pattern).toBeTruthy();
      expect(
        "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "arn:aws:kms:eu-west-1:999999999999:key/abcdef01-2345-6789-abcd-ef0123456789".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should detect standalone UUID key IDs", () => {
      expect(
        "12345678-1234-1234-1234-123456789012".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "abcdef01-2345-6789-abcd-ef0123456789".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid UUIDs", () => {
      expect("12345678-1234-1234-1234".match(pattern!.pattern)).toBeFalsy();
      expect(
        "GHIJKLMN-1234-1234-1234-123456789012".match(pattern!.pattern),
      ).toBeFalsy();
    });
  });

  describe("GCP_KMS_KEY", () => {
    const pattern = encryptionPatterns.find((p) => p.name === "GCP_KMS_KEY");

    it("should detect GCP KMS key paths", () => {
      expect(pattern).toBeTruthy();
      expect(
        "projects/my-project/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "projects/test-123/locations/europe-west1/keyRings/prod-ring/cryptoKeys/encryption-key".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match incomplete paths", () => {
      expect("projects/my-project".match(pattern!.pattern)).toBeFalsy();
      expect(
        "projects/my-project/locations/us-central1".match(pattern!.pattern),
      ).toBeFalsy();
    });
  });

  describe("AZURE_KEY_IDENTIFIER", () => {
    const pattern = encryptionPatterns.find(
      (p) => p.name === "AZURE_KEY_IDENTIFIER",
    );

    it("should detect Azure key vault identifiers", () => {
      expect(pattern).toBeTruthy();
      expect(
        "https://myvault.vault.azure.net/keys/mykey/1234567890abcdef1234567890abcdef".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "https://prod-vault.vault.azure.net/keys/encryption-key/abcdef1234567890abcdef1234567890".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Azure key URLs", () => {
      expect(
        "https://myvault.vault.azure.net/secrets/mysecret/abc".match(
          pattern!.pattern,
        ),
      ).toBeFalsy();
      expect("https://myvault.vault.azure.net/keys/mykey".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("MASTER_KEY", () => {
    const pattern = encryptionPatterns.find((p) => p.name === "MASTER_KEY");

    it("should detect master keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "master_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "master-key: dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect("master_key=YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkw".match(pattern!.pattern)).toBeTruthy();
    });

    it("should detect encryption keys", () => {
      expect(
        "encryption_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "encryption-key=dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should detect secret keys", () => {
      expect(
        "secret_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect("secret-key=dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match short values", () => {
      expect("master_key: short".match(pattern!.pattern)).toBeFalsy();
      expect("encryption_key: abc123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives across patterns", () => {
    const sshPattern = encryptionPatterns.find(
      (p) => p.name === "SSH_KEY_FINGERPRINT",
    );
    const pgpPattern = encryptionPatterns.find((p) => p.name === "PGP_KEY_ID");
    const ageSecretPattern = encryptionPatterns.find(
      (p) => p.name === "AGE_SECRET_KEY",
    );
    const agePublicPattern = encryptionPatterns.find(
      (p) => p.name === "AGE_PUBLIC_KEY",
    );

    expect("regular text".match(sshPattern!.pattern)).toBeFalsy();
    expect("regular text".match(pgpPattern!.pattern)).toBeFalsy();
    expect("regular text".match(ageSecretPattern!.pattern)).toBeFalsy();
    expect("regular text".match(agePublicPattern!.pattern)).toBeFalsy();
  });
});
