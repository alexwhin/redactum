import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("aws key patterns", () => {
  testCategoryCoverage(PolicyCategory.AWS_KEY, [
    "AWS_ACCESS_KEY",
    "AWS_SECRET_KEY",
    "AWS_SESSION_TOKEN",
  ]);

  describe("AWS_ACCESS_KEY", () => {
    testPolicySuite({
      policyName: "AWS_ACCESS_KEY",
      replacement: "[AWS_ACCESS_KEY]",
      shouldMatch: [
        "AKIAIOSFODNN7EXAMPLE", // standard IAM user access key
        "ASIAIOSFODNN7EXAMPLE", // temporary STS credentials
        "ABIAIOSFODNN7EXAMPLE", // AWS STS service bearer token
        "ACCAIOSFODNN7EXAMPLE", // context-specific credentials
        "AKIAZZZZZZZZZZZZZZZZ", // IAM access key (all uppercase)
        "ASIA1234567890ABCDEF", // STS session credentials
        "ABIAABCDEFGHIJKLMNOP", // service bearer token
        "ACCA0000000000000000", // context credentials
        "AKIAZYXWVUTSRQPONMLK", // IAM access key (mixed case)
        "AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE", // in environment variable
        "access_key: ASIAIOSFODNN7EXAMPLE", // with label prefix
        "Key: ABIAIOSFODNN7EXAMPLE.", // in sentence with period
        "AKIAQ3DJFKLSDJFKLSDF", // real format with Q prefix
      ],
      shouldNotMatch: [
        "AKIA123", // too short (< 20 chars)
        "aws-access-key", // plain text
        "regular text", // no matching prefix
        "AKIA", // just prefix
        "ASIA12345", // too short
        "ABIA-invalid", // contains hyphen
        "ACCA", // just prefix
        "AKIZ1234567890ABCDEF", // invalid prefix (AKIZ not valid)
      ],
    });
  });

  describe("AWS_SECRET_KEY", () => {
    testPolicySuite({
      policyName: "AWS_SECRET_KEY",
      replacement: "[AWS_SECRET]",
      shouldMatch: [
        "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY", // AWS documentation example (40 chars)
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn", // 40 char alphanumeric
        "zyxwvutsrqponmlkjihgfedcba/ZYXWVUTSRQPON", // with forward slash (40 chars)
        "0123456789/ABCDEFGHIJKLMNOPQRSTUVWXYZabc", // numeric + slash (40 chars)
        "aBcDeFgHiJkLmNoPqRsTuVwXyZ/1234567890abc", // mixed case with slash (40 chars)
        "ZyXwVuTsRqPoNmLkJiHgFeDcBa1234567890/abc", // random mix (40 chars)
        "ABCD1234EFGH5678IJKL9012MNOP3456QRST7890", // alphanumeric only (40 chars)
        "abcd/efgh/ijkl/mnop/qrst/uvwx/yz12/34567", // multiple slashes (40 chars)
        "1234+5678+9012+3456+7890+1234+5678+90ABC", // with plus signs (40 chars)
        "aBcD+eFgH/iJkL+mNoP/qRsT+uVwX/yZ12+34567", // mixed separators (40 chars)
      ],
      shouldNotMatch: [
        "short", // too short
        "tooshortvalue", // still too short
        "ABC123", // way too short
        "invalid-key", // contains hyphen
        "aws-secret-key", // plain text
        "123456789012345678901234567890", // only 30 chars
        "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLE", // 39 chars (too short)
      ],
    });
  });

  describe("AWS_SESSION_TOKEN", () => {
    testPolicySuite({
      policyName: "AWS_SESSION_TOKEN",
      replacement: "[AWS_SESSION_TOKEN]",
      shouldMatch: [
        "FQoGZXIvYXdzEBYaDKJHabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwx", // typical STS session token (100 chars)
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrst", // alphanumeric session token (110 chars)
        "zyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA0123456789zyxwvutsrqponmlkjihgfedcba9876543210", // reverse alpha session token (110 chars)
        "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", // numeric session token (110 chars)
        "aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789aBcDeFgHiJkLmNoPqRsTuVwXyZ012345", // mixed case session token (110 chars)
        "AWS_SESSION_TOKEN=FQoGZXIvYXdzEBYaDKJHabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwx", // env var format
        "session: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrst", // with label
        "IQoJb3JpZ2luX2VjEI3//////////wEaCXVzLWVhc3QtMSJHMEUCIQDabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwx", // real-world format with IQoJb3 prefix (150 chars)
        "FwoGZXIvYXdzEEoaDEabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJ", // with FwoGZX prefix (140 chars)
        "AQoDYXdzEPz//////////wEaoAFabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABC", // with AQoDYX prefix (140 chars)
      ],
      shouldNotMatch: [
        "shorttoken", // too short
        "invalid", // too short
        "aws-session-token", // plain text
        "FQoGZXIvYXdzEBYaDKJH", // only 20 chars (too short)
        "too-short-for-session-token", // contains hyphens and too short
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", // only 52 chars (too short)
      ],
    });
  });
});
