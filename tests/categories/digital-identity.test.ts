import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("digital identity patterns", () => {
  const digitalIdentityPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.DIGITAL_IDENTITY,
  );

  it("should have digital identity patterns", () => {
    expect(digitalIdentityPatterns.length).toBeGreaterThan(0);
  });

  describe("UUID", () => {
    const pattern = digitalIdentityPatterns.find((p) => p.name === "UUID");

    it("should detect UUIDs", () => {
      expect(pattern).toBeTruthy();
      expect("550e8400-e29b-41d4-a716-446655440000".match(pattern!.pattern)).toBeTruthy();
      expect("123e4567-e89b-12d3-a456-426614174000".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid UUIDs", () => {
      expect("not-a-uuid".match(pattern!.pattern)).toBeFalsy();
      expect("123e4567-e89b-12d3-a456".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("BITCOIN_ADDRESS", () => {
    const pattern = digitalIdentityPatterns.find(
      (p) => p.name === "BITCOIN_ADDRESS",
    );

    it("should detect Bitcoin addresses", () => {
      expect(pattern).toBeTruthy();
      expect("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa".match(pattern!.pattern)).toBeTruthy();
      expect("3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy".match(pattern!.pattern)).toBeTruthy();
      expect("bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Bitcoin addresses", () => {
      expect("0A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa".match(pattern!.pattern)).toBeFalsy();
      expect("bitcoin-address".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("ETHEREUM_ADDRESS", () => {
    const pattern = digitalIdentityPatterns.find(
      (p) => p.name === "ETHEREUM_ADDRESS",
    );

    it("should detect Ethereum addresses", () => {
      expect(pattern).toBeTruthy();
      expect("0x742d35Cc6634C0532925a3b844Bc9e7595f5a123".match(pattern!.pattern)).toBeTruthy();
      expect("0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Ethereum addresses", () => {
      expect("0x742d35Cc6634C0532925a3b844Bc9e7595f5a12".match(pattern!.pattern)).toBeFalsy();
      expect("ethereum-address".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("MAC_ADDRESS", () => {
    const pattern = digitalIdentityPatterns.find((p) => p.name === "MAC_ADDRESS");

    it("should detect MAC addresses with colons", () => {
      expect(pattern).toBeTruthy();
      expect("00:1B:44:11:3A:B7".match(pattern!.pattern)).toBeTruthy();
      expect("AA:BB:CC:DD:EE:FF".match(pattern!.pattern)).toBeTruthy();
    });

    it("should detect MAC addresses with hyphens", () => {
      expect("00-1B-44-11-3A-B7".match(pattern!.pattern)).toBeTruthy();
      expect("AA-BB-CC-DD-EE-FF".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid MAC addresses", () => {
      expect("00:1B:44:11:3A".match(pattern!.pattern)).toBeFalsy();
      expect("GG:HH:II:JJ:KK:LL".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SHA_HASH", () => {
    const pattern = digitalIdentityPatterns.find((p) => p.name === "SHA_HASH");

    it("should detect SHA-1 hashes", () => {
      expect(pattern).toBeTruthy();
      expect("2fd4e1c67a2d28fced849ee1bb76e7391b93eb12".match(pattern!.pattern)).toBeTruthy();
      expect("da39a3ee5e6b4b0d3255bfef95601890afd80709".match(pattern!.pattern)).toBeTruthy();
    });

    it("should detect SHA-256 hashes", () => {
      expect(
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should detect SHA-384 hashes", () => {
      expect(
        "38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid hashes", () => {
      expect("tooshort".match(pattern!.pattern)).toBeFalsy();
      expect("GHIJKLMNOPQRSTUVWXYZ1234567890123456789012".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const uuidPattern = digitalIdentityPatterns.find((p) => p.name === "UUID");
    const bitcoinPattern = digitalIdentityPatterns.find(
      (p) => p.name === "BITCOIN_ADDRESS",
    );

    expect("regular text".match(uuidPattern!.pattern)).toBeFalsy();
    expect("regular text".match(bitcoinPattern!.pattern)).toBeFalsy();
  });
});
