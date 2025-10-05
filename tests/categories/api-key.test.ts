import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("api key patterns", () => {
  testCategoryCoverage(PolicyCategory.API_KEY, [
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GITHUB_TOKEN",
    "GITHUB_FINE_GRAINED_TOKEN",
    "STRIPE_KEY",
    "JWT_TOKEN",
    "API_KEY_GENERIC",
    "GOOGLE_API_KEY",
    "SLACK_TOKEN",
    "PAYPAL_CLIENT_ID",
    "TWILIO_API_KEY",
    "SENDGRID_API_KEY",
    "PASSWORD_ASSIGNMENT",
  ]);

  describe("OPENAI_API_KEY", () => {
    testPolicySuite({
      policyName: "OPENAI_API_KEY",
      replacement: "[OPENAI_KEY]",
      shouldMatch: [
        "sk-1234567890abcdefghijklmnopqrstuvwxyz",
        "sk-abcdefghijklmnopqrstuvwxyz123456",
        "sk-ABCDEFGHIJKLMNOPQRSTUVWXYZ123456",
        "sk-1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "sk-proj-1234567890abcdefghijklmnopqrstuvwxyz",
        "sk-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
        "sk-ZYXWVUTSRQPONMLKJIHGFEDCBA987654",
      ],
      shouldNotMatch: [
        "sk-short",
        "api-key-1234567890",
        "regular text",
        "sk-",
        "sk-12345",
        "sk-toolittlecharactershere",
        "openai-key-123456",
      ],
    });
  });

  describe("ANTHROPIC_API_KEY", () => {
    testPolicySuite({
      policyName: "ANTHROPIC_API_KEY",
      replacement: "[ANTHROPIC_KEY]",
      shouldMatch: [
        "sk-ant-api03-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789012345678901234567890",
        "sk-ant-api03-1234567890abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890",
        "sk-ant-api03-ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210zyxwvutsrqponmlkjihgfedcba09876543210987654321098765432109",
        "sk-ant-api03-aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789AbCdEfGhIjKlMnOpQrStUvWxYz01234567890123456789012345678901",
        "sk-ant-api03-0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      ],
      shouldNotMatch: [
        "sk-ant-short",
        "sk-1234567890",
        "sk-ant-api03-tooshort",
        "sk-ant-api03-",
        "anthropic-key-123",
        "sk-ant-123456",
      ],
    });
  });

  describe("GITHUB_TOKEN", () => {
    testPolicySuite({
      policyName: "GITHUB_TOKEN",
      replacement: "[GITHUB_TOKEN]",
      shouldMatch: [
        "ghp_abcdefghijklmnopqrstuvwxyz1234567890",
        "gho_abcdefghijklmnopqrstuvwxyz1234567890",
        "ghu_abcdefghijklmnopqrstuvwxyz1234567890",
        "ghs_abcdefghijklmnopqrstuvwxyz1234567890",
        "ghr_abcdefghijklmnopqrstuvwxyz1234567890",
        "ghp_1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "gho_ZYXWVUTSRQPONMLKJIHGFEDCBA0987654321",
        "ghu_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8",
        "ghs_00000000000000000000000000000000000000",
        "ghr_aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890",
      ],
      shouldNotMatch: [
        "ghp_short",
        "github_token",
        "ghp_",
        "ghp_12345",
        "gho_tooshort",
        "github-personal-token",
        "gh_token_123456",
      ],
    });
  });

  describe("GITHUB_FINE_GRAINED_TOKEN", () => {
    testPolicySuite({
      policyName: "GITHUB_FINE_GRAINED_TOKEN",
      replacement: "[GITHUB_PAT]",
      shouldMatch: [
        "github_pat_1234567890ABCDEFGHIJ_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY",
        "github_pat_ABCDEFGHIJ1234567890_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxy",
        "github_pat_0000000000AAAAAAAAAA_0000000000aaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAA",
        "github_pat_aBcDeFgHiJ1234567890_aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXY",
        "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B",
      ],
      shouldNotMatch: [
        "github_pat_short",
        "github_token",
        "github_pat_",
        "github_pat_1234567890_short",
        "github_pat_ABCDEFGHIJ_tooshort",
        "github-pat-invalid",
      ],
    });
  });

  describe("STRIPE_KEY", () => {
    testPolicySuite({
      policyName: "STRIPE_KEY",
      replacement: "[STRIPE_KEY]",
      shouldMatch: [
        "sk_live_1234567890abcdefghijklmnop",
        "sk_test_1234567890abcdefghijklmnop",
        "pk_live_1234567890abcdefghijklmnop",
        "pk_test_1234567890abcdefghijklmnop",
        "rk_live_1234567890abcdefghijklmnop",
        "sk_live_ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "pk_test_zyxwvutsrqponmlkjihgfedcba",
        "rk_test_a1b2c3d4e5f6g7h8i9j0k1l2m3",
        "sk_live_00000000000000000000000000",
        "pk_live_aBcDeFgHiJkLmNoPqRsTuVwXyZ",
      ],
      shouldNotMatch: [
        "sk_live_short",
        "stripe_key_1234",
        "sk_live_",
        "pk_test_",
        "sk_prod_1234567890abcdefghijklmnop",
        "stripe-key-invalid",
        "sk_live_toolittle",
      ],
    });
  });

  describe("JWT_TOKEN", () => {
    testPolicySuite({
      policyName: "JWT_TOKEN",
      replacement: "[JWT_TOKEN]",
      shouldMatch: [
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDEyMzQ1Njc4OTAiLCJhdWQiOiJodHRwczovL2FwaS5leGFtcGxlLmNvbS8iLCJleHAiOjE2MDAwMDAwMDAsImlhdCI6MTYwMDAwMDAwMH0.abcdefghijklmnopqrstuvwxyz1234567890",
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImV4cCI6MTYwMDAwMDAwMH0.MEUCIQD1234567890abcdefghijklmnopqrstuvwxyz",
        "eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwicm9sZSI6ImFkbWluIn0.signature1234567890abcdefghij",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTYwMDAwMDAwMH0.abcdef1234567890ZYXWVU",
      ],
      shouldNotMatch: [
        "eyJhbGciOiJ.short",
        "not-a-jwt-token",
        "eyJhbGciOiJIUzI1NiJ9",
        "eyJhbGciOiJIUzI1NiJ9.",
        "jwt-token-invalid",
        "Bearer token123",
      ],
    });
  });

  describe("API_KEY_GENERIC", () => {
    testPolicySuite({
      policyName: "API_KEY_GENERIC",
      replacement: "[API_KEY]",
      shouldMatch: [
        "api_key: 1234567890abcdefghij",
        "apikey: 1234567890abcdefghijklmnop",
        "access_token: 1234567890abcdefghij",
        "bearer_token: 1234567890abcdefghij",
        "api_key: ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "apikey: zyxwvutsrqponmlkjihgfedcba",
        "access_token: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
        "bearer_token: 00000000000000000000",
        "api_key: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890",
      ],
      shouldNotMatch: [
        "api_key: short",
        "api_key:",
        "apikey: abc",
        "access_token: tiny",
        "bearer_token:",
        "invalid-key",
      ],
    });
  });

  describe("GOOGLE_API_KEY", () => {
    testPolicySuite({
      policyName: "GOOGLE_API_KEY",
      replacement: "[GOOGLE_API_KEY]",
      shouldMatch: [
        "AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI",
        "AIzaSyAbcdefghijklmnopqrstuvwxyz1234567",
        "AIzaSyABCDEFGHIJKLMNOPQRSTUVWXYZ1234567",
        "AIzaSy0123456789abcdefghijklmnopqrstuv",
        "AIzaSy_abcdefghijklmnopqrstuvwxyz12345",
        "AIzaSy-1234567890ABCDEFGHIJKLMNOPQRSTU",
        "AIzaSyZYXWVUTSRQPONMLKJIHGFEDCBA9876543",
      ],
      shouldNotMatch: [
        "AIzaShort",
        "google-api-key",
        "AIzaSy",
        "AIzaSy123",
        "AIza-too-short",
        "AIzaSy_tooshort",
      ],
    });
  });

  describe("SLACK_TOKEN", () => {
    testPolicySuite({
      policyName: "SLACK_TOKEN",
      replacement: "[SLACK_TOKEN]",
      shouldMatch: [
        "xoxb-123456789012-123456789012-abcdefghijklmnopqrstuvwx",
        "xoxp-123456789012-123456789012-abcdefghijklmnopqrstuvwx",
        "xoxa-123456789012-123456789012-abcdefghijklmnopqrstuvwx",
        "xoxr-123456789012-123456789012-abcdefghijklmnopqrstuvwx",
        "xoxs-123456789012-123456789012-abcdefghijklmnopqrstuvwx",
        "xoxb-000000000000-111111111111-ABCDEFGHIJKLMNOPQRSTUVWX",
        "xoxp-999999999999-888888888888-0000000000000000000000000",
        "xoxa-123456789012-987654321098-aBcDeFgHiJkLmNoPqRsTuVwX",
        "xoxr-111111111111-222222222222-zyxwvutsrqponmlkjihgfedc",
        "xoxs-555555555555-666666666666-1234567890abcdefghijklmn",
      ],
      shouldNotMatch: [
        "xoxb-123-456-short",
        "slack-token",
        "xoxb-123456789012-123456789012-short",
        "xoxb-123-123-abc",
        "xoxp-invalid",
        "xox-123456789012-123456789012-abcdefghijklmnopqrstuvwx",
      ],
    });
  });

  describe("PAYPAL_CLIENT_ID", () => {
    testPolicySuite({
      policyName: "PAYPAL_CLIENT_ID",
      replacement: "[PAYPAL_CLIENT_ID]",
      shouldMatch: [
        "AQkquBDf1zctJOWGKWUEtKXm6qVhueUEMvXO_-MCI4DQQ4-LWvkDLIN2fGsdabcdefghijklmnopqrstu",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ",
        "A1234567890abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        "Azyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210zyxwvuts",
        "A_-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEF",
      ],
      shouldNotMatch: [
        "AShort",
        "paypal-client-id",
        "A12345",
        "ABCDEFGHIJ",
        "paypal-invalid",
        "A",
      ],
    });
  });

  describe("TWILIO_API_KEY", () => {
    testPolicySuite({
      policyName: "TWILIO_API_KEY",
      replacement: "[TWILIO_API_KEY]",
      shouldMatch: [
        "SK1234567890abcdef1234567890abcdef",
        "SKabcdefghijklmnopqrstuvwxyz123456",
        "SKABCDEFGHIJKLMNOPQRSTUVWXYZ123456",
        "SK0000000000000000000000000000000",
        "SKzyxwvutsrqponmlkjihgfedcba987654",
        "SKaBcDeFgHiJkLmNoPqRsTuVwXyZ123456",
        "SK9876543210ABCDEFGHIJKLMNOPQRSTUV",
      ],
      shouldNotMatch: [
        "SKshort",
        "twilio-key",
        "SK",
        "SK12345",
        "SK123456789012345678901234567890123",
        "twilio-api-key",
      ],
    });
  });

  describe("SENDGRID_API_KEY", () => {
    testPolicySuite({
      policyName: "SENDGRID_API_KEY",
      replacement: "[SENDGRID_API_KEY]",
      shouldMatch: [
        "SG.abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234",
        "SG.ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz1234",
        "SG.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234",
        "SG.zyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA9876",
        "SG.aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBcDeFgHiJkLmNoPqRsTuVwXyZ1234",
      ],
      shouldNotMatch: [
        "SG.short",
        "sendgrid-key",
        "SG.",
        "SG.abc",
        "SG.tooshorttobevalid",
        "sendgrid-api-key",
      ],
    });
  });

  describe("PASSWORD_ASSIGNMENT", () => {
    testPolicySuite({
      policyName: "PASSWORD_ASSIGNMENT",
      replacement: 'password="[PASSWORD]"',
      shouldMatch: [
        'password = "P@ssw0rd123!"',
        "password: 'MySecret123'",
        'passwd="SecretPass456"',
        "password = 'Str0ng!Pass'",
        'passwd="C0mpl3x!P@ss"',
        'password: "T3st!ng123"',
        'password = "MyP@ssw0rd2024"',
        "passwd='$3cr3tK3y!'",
      ],
      shouldNotMatch: [
        'password = "short"',
        "password:",
        "passwd=",
        'password = "abc"',
        "password: 'tiny'",
        "password-invalid",
      ],
    });
  });
});
