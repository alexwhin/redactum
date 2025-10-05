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
        "AKIAIOSFODNN7EXAMPLE",
        "ASIAIOSFODNN7EXAMPLE",
        "ABIAIOSFODNN7EXAMPLE",
        "ACCAIOSFODNN7EXAMPLE",
        "AKIAZZZZZZZZZZZZZZZZ",
        "ASIA1234567890ABCDEF",
        "ABIAABCDEFGHIJKLMNOP",
        "ACCA0000000000000000",
        "AKIAZYXWVUTSRQPONMLK",
      ],
      shouldNotMatch: [
        "AKIA123",
        "aws-access-key",
        "regular text",
        "AKIA",
        "ASIA12345",
        "ABIA-invalid",
        "ACCA",
      ],
    });
  });

  describe("AWS_SECRET_KEY", () => {
    testPolicySuite({
      policyName: "AWS_SECRET_KEY",
      replacement: "[AWS_SECRET]",
      shouldMatch: [
        "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn",
        "zyxwvutsrqponmlkjihgfedcba/ZYXWVUTSRQPON",
        "0123456789/ABCDEFGHIJKLMNOPQRSTUVWXYZabc",
        "aBcDeFgHiJkLmNoPqRsTuVwXyZ/1234567890abc",
      ],
      shouldNotMatch: [
        "short",
        "tooshortvalue",
        "ABC123",
        "invalid-key",
        "aws-secret-key",
        "123456789012345678901234567890",
      ],
    });
  });

  describe("AWS_SESSION_TOKEN", () => {
    testPolicySuite({
      policyName: "AWS_SESSION_TOKEN",
      replacement: "[AWS_SESSION_TOKEN]",
      shouldMatch: [
        "FQoGZXIvYXdzEBYaDKJHabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwx",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrst",
        "zyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA0123456789zyxwvutsrqponmlkjihgfedcba9876543210",
        "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789aBcDeFgHiJkLmNoPqRsTuVwXyZ012345",
      ],
      shouldNotMatch: [
        "shorttoken",
        "invalid",
        "aws-session-token",
        "FQoGZXIvYXdzEBYaDKJH",
        "too-short-for-session-token",
      ],
    });
  });
});
