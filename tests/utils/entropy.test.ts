import { describe, it, expect } from "vitest";
import { redactumCalculateEntropy, redactumLooksLikeSecret } from "../../src/utils/entropy.js";

describe("entropy utilities", () => {
  describe("redactumCalculateEntropy", () => {
    it("should return 0 for empty string", () => {
      expect(redactumCalculateEntropy("")).toBe(0);
    });

    it("should return 0 for single character", () => {
      expect(redactumCalculateEntropy("a")).toBe(0);
    });

    it("should calculate entropy for uniform distribution", () => {
      const entropy = redactumCalculateEntropy("abcd");
      expect(entropy).toBe(2); // log2(4) = 2
    });

    it("should calculate entropy for non-uniform distribution", () => {
      const entropy = redactumCalculateEntropy("aaab");
      expect(entropy).toBeCloseTo(0.811, 2);
    });

    it("should handle high-entropy strings", () => {
      const highEntropyString = "a1B!x9Z@m4N#";
      const entropy = redactumCalculateEntropy(highEntropyString);
      expect(entropy).toBeGreaterThan(3);
    });
  });

  describe("redactumLooksLikeSecret", () => {
    it("should return false for short strings", () => {
      expect(redactumLooksLikeSecret("short")).toBe(false);
    });

    it("should return true for high-entropy strings", () => {
      const highEntropySecret = "sk_1234567890abcdefghijklmnopqrstuvwxyz";
      expect(redactumLooksLikeSecret(highEntropySecret)).toBe(true);
    });

    it("should return true for complex strings", () => {
      const complexSecret = "MyS3cr3tP@ssw0rd!2024";
      expect(redactumLooksLikeSecret(complexSecret)).toBe(true);
    });

    it("should return false for simple strings", () => {
      expect(redactumLooksLikeSecret("thisisasimplestring")).toBe(false);
    });

    it("should use custom thresholds", () => {
      const simpleString = "password123456789";
      expect(redactumLooksLikeSecret(simpleString, 10, 2.0)).toBe(true);
    });
  });
});