import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("aws key patterns", () => {
  const awsKeyPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.AWS_KEY,
  );

  it("should have AWS key patterns", () => {
    expect(awsKeyPatterns.length).toBeGreaterThan(0);
  });

  describe("AWS_ACCESS_KEY", () => {
    const pattern = awsKeyPatterns.find((p) => p.name === "AWS_ACCESS_KEY");

    it("should detect AWS access keys", () => {
      expect(pattern).toBeTruthy();
      expect("AKIAIOSFODNN7EXAMPLE".match(pattern!.pattern)).toBeTruthy();
      expect("ASIAIOSFODNN7EXAMPLE".match(pattern!.pattern)).toBeTruthy();
      expect("ABIAIOSFODNN7EXAMPLE".match(pattern!.pattern)).toBeTruthy();
      expect("ACCAIOSFODNN7EXAMPLE".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid AWS access keys", () => {
      expect("AKIA123".match(pattern!.pattern)).toBeFalsy();
      expect("aws-access-key".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AWS_SECRET_KEY", () => {
    const pattern = awsKeyPatterns.find((p) => p.name === "AWS_SECRET_KEY");

    it("should detect AWS secret keys", () => {
      expect(pattern).toBeTruthy();
      expect("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY".match(pattern!.pattern)).toBeTruthy();
      expect("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match short values", () => {
      expect("short".match(pattern!.pattern)).toBeFalsy();
      expect("tooshortvalue".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AWS_SESSION_TOKEN", () => {
    const pattern = awsKeyPatterns.find((p) => p.name === "AWS_SESSION_TOKEN");

    it("should detect AWS session tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "FQoGZXIvYXdzEBYaDKJHabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwx".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match short values", () => {
      expect("shorttoken".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const accessKeyPattern = awsKeyPatterns.find(
      (p) => p.name === "AWS_ACCESS_KEY",
    );

    expect("regular text".match(accessKeyPattern!.pattern)).toBeFalsy();
  });
});
