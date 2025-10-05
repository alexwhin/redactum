import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("digital identity patterns", () => {
  testCategoryCoverage(PolicyCategory.DIGITAL_IDENTITY, [
    "UUID",
    "BITCOIN_ADDRESS",
    "ETHEREUM_ADDRESS",
    "MAC_ADDRESS",
    "SHA_HASH",
  ]);

  describe("UUID", () => {
    testPolicySuite({
      policyName: "UUID",
      replacement: "[UUID]",
      shouldMatch: [
        "550e8400-e29b-41d4-a716-446655440000", // UUID v4 (random)
        "123e4567-e89b-12d3-a456-426614174000", // UUID v1 (timestamp-based)
        "6ba7b810-9dad-11d1-80b4-00c04fd430c8", // UUID v1 namespace
        "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", // UUID v4 lowercase
        "A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11", // UUID v4 uppercase
        "Request ID: 550e8400-e29b-41d4-a716-446655440000", // in sentence
        "user_id=123e4567-e89b-12d3-a456-426614174000", // as parameter
        "{550e8400-e29b-41d4-a716-446655440000}", // braces wrapped
        "urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6", // URN format
        "123e4567-e89b-12d3-a456-426614174000-extra", // UUID with suffix (matches the UUID part)
      ],
      shouldNotMatch: [
        "not-a-uuid", // plain text
        "123e4567-e89b-12d3-a456", // too short (missing segment)
        "123e4567-e89b-12d3-a456-42661417400g", // invalid hex char
        "123e4567e89b12d3a456426614174000", // no hyphens
        "550e8400-e29b-41d4-a716", // partial UUID
        "00000000-0000-0000-0000-000000000000", // nil UUID (version 0 and variant 0 don't match pattern)
      ],
    });
  });

  describe("BITCOIN_ADDRESS", () => {
    testPolicySuite({
      policyName: "BITCOIN_ADDRESS",
      replacement: "[BITCOIN_ADDRESS]",
      shouldMatch: [
        "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", // valid P2PKH (Base58Check)
        "3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy", // valid P2SH (Base58Check)
        "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", // valid Bech32 (SegWit)
        "BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KQ9E2A", // valid upper-case Bech32
        "bc1p5cyxnuxmeuwuvkwfem96lxxss6ly3x7p4hqf6h", // valid Bech32m (Taproot)
        "(bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq),", // punctuation wrapped
        "Pay to: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa.", // trailing period
        "bitcoin:bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq?amount=0.01", // URI format
        "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzw\u200bf5mdq", // contains zero-width space
        "tb1qfmv0k0s5l4m8y6n7p8q9r0stuvwx2yz3abcd0e", // testnet Bech32 (included by policy)
        "bcrt1qy352eufvywh6r5z2m0m4tl0s4l7t9v5x3n0svk", // regtest Bech32 (included by policy)
      ],
      shouldNotMatch: [
        "0A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", // invalid prefix (Base58 never starts with 0)
        "bitcoin-address", // plain text, not an address
        "bc1QmixedCaseINVALID", // invalid mixed-case Bech32
        "1111111111111111111114oLvT2", // Base58Check checksum fail
        "bc1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", // invalid Bech32 length/checksum
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // SHA-256 hex digest
        "z3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy", // invalid starting char
        "bc1zw508d6qejxtdg4y5r3zarvaryvg6kdaj", // invalid Bech32 structure
      ],
    });
  });

  describe("ETHEREUM_ADDRESS", () => {
    testPolicySuite({
      policyName: "ETHEREUM_ADDRESS",
      replacement: "[ETH_ADDRESS]",
      shouldMatch: [
        "0x742d35Cc6634C0532925a3b844Bc9e7595f5a123", // standard mixed-case address
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // EIP-55 checksummed address
        "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae", // all lowercase (common format)
        "0xDE0B295669A9FD93D5F28D9EC85E40F4CB697BAE", // all uppercase (less common)
        "0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed", // another checksummed address
        "Send to: 0x742d35Cc6634C0532925a3b844Bc9e7595f5a123.", // in sentence with punctuation
        "(0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B)", // parentheses wrapped
        "ethereum:0x742d35Cc6634C0532925a3b844Bc9e7595f5a123", // ENS URI format
        "0x0000000000000000000000000000000000000000", // null address (burn address)
        "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT token contract
        "Contract: 0x742d35Cc6634C0532925a3b844Bc9e7595f5a123,", // trailing comma
        "0x742d35Cc6634C0532925a3b844Bc9e7595f5\u200ba123", // contains zero-width space
      ],
      shouldNotMatch: [
        "0x742d35Cc6634C0532925a3b844Bc9e7595f5a12", // too short (39 chars)
        "0x742d35Cc6634C0532925a3b844Bc9e7595f5a1234", // too long (41 chars)
        "0xGHIJKL6634C0532925a3b844Bc9e7595f5a123", // invalid hex chars
        "0x742d35Cc6634C0532925a3b844Bc9e7595f5a12g", // invalid char at end
        "ethereum-address", // plain text
        "1x742d35Cc6634C0532925a3b844Bc9e7595f5a123", // wrong prefix
        "0X742d35Cc6634C0532925a3b844Bc9e7595f5a123", // uppercase X (not standard)
        "742d35Cc6634C0532925a3b844Bc9e7595f5a123", // missing 0x prefix
        "0x", // just prefix
      ],
    });
  });

  describe("MAC_ADDRESS", () => {
    testPolicySuite({
      policyName: "MAC_ADDRESS",
      replacement: "[MAC_ADDRESS]",
      shouldMatch: [
        "00:1B:44:11:3A:B7", // colon separator (IEEE 802 standard)
        "AA:BB:CC:DD:EE:FF", // all uppercase with colons
        "aa:bb:cc:dd:ee:ff", // all lowercase with colons
        "00-1B-44-11-3A-B7", // hyphen separator (Windows style)
        "AA-BB-CC-DD-EE-FF", // all uppercase with hyphens
        "aa-bb-cc-dd-ee-ff", // all lowercase with hyphens
        "01:23:45:67:89:AB", // mixed case with colons
        "Device MAC: 00:1B:44:11:3A:B7", // in sentence with label
        "MAC 00:1B:44:11:3A:B7 detected", // embedded in text
        "(00:1B:44:11:3A:B7)", // parentheses wrapped
        "00:1B:44:11:3A:B7,", // trailing comma
        "ff:ff:ff:ff:ff:ff", // broadcast address
        "00:00:00:00:00:00", // null address
        "02:00:5e:00:00:00", // multicast address
      ],
      shouldNotMatch: [
        "00:1B:44:11:3A", // too short (5 octets)
        "00:1B:44:11:3A:B7:C8", // too long (7 octets)
        "GG:HH:II:JJ:KK:LL", // invalid hex characters
        "00:1B:44:11:3A:GG", // invalid hex in last octet
        "00.1B.44.11.3A.B7", // dot separator (Cisco style, not standard)
        "001B44113AB7", // no separators (EUI-48 bare format)
        "00:1B:44", // partial MAC address
        "mac-address", // plain text
        "00:1B:44:11:3A:B", // odd number of chars in last octet
      ],
    });
  });

  describe("SHA_HASH", () => {
    testPolicySuite({
      policyName: "SHA_HASH",
      replacement: "[HASH]",
      shouldMatch: [
        "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12", // SHA-1 hash (40 chars)
        "da39a3ee5e6b4b0d3255bfef95601890afd80709", // SHA-1 of empty string
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // SHA-256 hash (64 chars)
        "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae", // SHA-256 (foo)
        "38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b", // SHA-384 hash (96 chars)
        "Commit hash: 2fd4e1c67a2d28fced849ee1bb76e7391b93eb12", // in sentence with label
        "SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // with prefix
        "File integrity: 2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae.", // trailing period
        "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855", // uppercase SHA-256
      ],
      shouldNotMatch: [
        "tooshort", // too short to be any SHA hash
        "GHIJKLMNOPQRSTUVWXYZ1234567890123456789012", // invalid hex characters
        "2fd4e1c67a2d28fced849ee1bb76e7391b93eb1", // 39 chars (not valid SHA-1)
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b85", // 63 chars (not valid SHA-256)
        "38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95", // 95 chars (not valid SHA-384)
        "2fd4e1c67a2d28fced849ee1bb76e7391b93eb1g", // invalid hex char at end
        "sha-hash-here", // plain text
        "not-a-hash-value", // plain text
        "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e", // SHA-512 hash (128 chars, not supported by pattern)
      ],
    });
  });
});
