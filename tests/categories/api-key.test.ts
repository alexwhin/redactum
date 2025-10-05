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
    "CLOUDFLARE_API_TOKEN",
  ]);

  describe("OPENAI_API_KEY", () => {
    testPolicySuite({
      policyName: "OPENAI_API_KEY",
      replacement: "[OPENAI_KEY]",
      shouldMatch: [
        "sk-1234567890abcdefghijklmnopqrstuvwxyz", // standard API key (lowercase)
        "sk-abcdefghijklmnopqrstuvwxyz123456", // alphanumeric mix
        "sk-ABCDEFGHIJKLMNOPQRSTUVWXYZ123456", // uppercase variant
        "sk-1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", // numeric prefix
        "sk-proj-1234567890abcdefghijklmnopqrstuvwxyz", // project-scoped key
        "sk-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6", // mixed case alternating
        "sk-ZYXWVUTSRQPONMLKJIHGFEDCBA987654", // reverse alpha pattern
      ],
      shouldNotMatch: [
        "sk-short", // too short to be valid
        "api-key-1234567890", // wrong prefix
        "regular text", // plain text
        "sk-", // just prefix
        "sk-12345", // insufficient length
        "sk-toolittlecharactershere", // still too short
        "openai-key-123456", // incorrect format
      ],
    });
  });

  describe("ANTHROPIC_API_KEY", () => {
    testPolicySuite({
      policyName: "ANTHROPIC_API_KEY",
      replacement: "[ANTHROPIC_KEY]",
      shouldMatch: [
        "sk-ant-api03-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789012345678901234567890", // standard Anthropic key (100 chars)
        "sk-ant-api03-1234567890abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890", // numeric start pattern
        "sk-ant-api03-ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210zyxwvutsrqponmlkjihgfedcba09876543210987654321098765432109", // reverse alpha pattern
        "sk-ant-api03-aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789AbCdEfGhIjKlMnOpQrStUvWxYz01234567890123456789012345678901", // mixed case pattern
        "sk-ant-api03-0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", // all zeros (test key)
      ],
      shouldNotMatch: [
        "sk-ant-short", // missing api03 and token
        "sk-1234567890", // missing ant-api03 prefix
        "sk-ant-api03-tooshort", // token too short
        "sk-ant-api03-", // missing token entirely
        "anthropic-key-123", // wrong format
        "sk-ant-123456", // missing api03
      ],
    });
  });

  describe("GITHUB_TOKEN", () => {
    testPolicySuite({
      policyName: "GITHUB_TOKEN",
      replacement: "[GITHUB_TOKEN]",
      shouldMatch: [
        "ghp_abcdefghijklmnopqrstuvwxyz1234567890", // personal access token
        "gho_abcdefghijklmnopqrstuvwxyz1234567890", // OAuth token
        "ghu_abcdefghijklmnopqrstuvwxyz1234567890", // user-to-server token
        "ghs_abcdefghijklmnopqrstuvwxyz1234567890", // server-to-server token
        "ghr_abcdefghijklmnopqrstuvwxyz1234567890", // refresh token
        "ghp_1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", // numeric prefix with uppercase
        "gho_ZYXWVUTSRQPONMLKJIHGFEDCBA0987654321", // reverse alpha pattern
        "ghu_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8", // mixed case alternating
        "ghs_00000000000000000000000000000000000000", // all zeros (test token)
        "ghr_aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890", // mixed case pattern
      ],
      shouldNotMatch: [
        "ghp_short", // insufficient length
        "github_token", // wrong format
        "ghp_", // missing token
        "ghp_12345", // too short
        "gho_tooshort", // insufficient length
        "github-personal-token", // incorrect format
        "gh_token_123456", // wrong prefix
      ],
    });
  });

  describe("GITHUB_FINE_GRAINED_TOKEN", () => {
    testPolicySuite({
      policyName: "GITHUB_FINE_GRAINED_TOKEN",
      replacement: "[GITHUB_PAT]",
      shouldMatch: [
        "github_pat_1234567890ABCDEFGHIJ_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY", // standard fine-grained PAT
        "github_pat_ABCDEFGHIJ1234567890_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxy", // alphanumeric variant
        "github_pat_0000000000AAAAAAAAAA_0000000000aaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAA", // test pattern with zeros
        "github_pat_aBcDeFgHiJ1234567890_aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXY", // mixed case pattern
        "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B", // reverse numeric pattern
      ],
      shouldNotMatch: [
        "github_pat_short", // missing prefix and token
        "github_token", // wrong format
        "github_pat_", // missing both parts
        "github_pat_1234567890_short", // token too short
        "github_pat_ABCDEFGHIJ_tooshort", // insufficient token length
        "github-pat-invalid", // wrong separator
      ],
    });
  });

  describe("STRIPE_KEY", () => {
    testPolicySuite({
      policyName: "STRIPE_KEY",
      replacement: "[STRIPE_KEY]",
      shouldMatch: [
        "sk_live_1234567890abcdefghijklmnop", // secret live key
        "sk_test_1234567890abcdefghijklmnop", // secret test key
        "pk_live_1234567890abcdefghijklmnop", // publishable live key
        "pk_test_1234567890abcdefghijklmnop", // publishable test key
        "rk_live_1234567890abcdefghijklmnop", // restricted live key
        "sk_live_ABCDEFGHIJKLMNOPQRSTUVWXYZ", // uppercase variant
        "pk_test_zyxwvutsrqponmlkjihgfedcba", // reverse alpha pattern
        "rk_test_a1b2c3d4e5f6g7h8i9j0k1l2m3", // mixed case alternating
        "sk_live_00000000000000000000000000", // all zeros (test key)
        "pk_live_aBcDeFgHiJkLmNoPqRsTuVwXyZ", // mixed case pattern
      ],
      shouldNotMatch: [
        "sk_live_short", // insufficient length
        "stripe_key_1234", // wrong format
        "sk_live_", // missing key
        "pk_test_", // missing key
        "sk_prod_1234567890abcdefghijklmnop", // invalid environment
        "stripe-key-invalid", // incorrect format
        "sk_live_toolittle", // too short
      ],
    });
  });

  describe("JWT_TOKEN", () => {
    testPolicySuite({
      policyName: "JWT_TOKEN",
      replacement: "[JWT_TOKEN]",
      shouldMatch: [
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", // standard HS256 JWT
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDEyMzQ1Njc4OTAiLCJhdWQiOiJodHRwczovL2FwaS5leGFtcGxlLmNvbS8iLCJleHAiOjE2MDAwMDAwMDAsImlhdCI6MTYwMDAwMDAwMH0.abcdefghijklmnopqrstuvwxyz1234567890", // RS256 with claims
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImV4cCI6MTYwMDAwMDAwMH0.MEUCIQD1234567890abcdefghijklmnopqrstuvwxyz", // ES256 with user data
        "eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwicm9sZSI6ImFkbWluIn0.signature1234567890abcdefghij", // PS256 with role
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTYwMDAwMDAwMH0.abcdef1234567890ZYXWVU", // HS384 variant
      ],
      shouldNotMatch: [
        "eyJhbGciOiJ.short", // missing payload and signature
        "not-a-jwt-token", // plain text
        "eyJhbGciOiJIUzI1NiJ9", // only header
        "eyJhbGciOiJIUzI1NiJ9.", // header with trailing dot
        "jwt-token-invalid", // incorrect format
        "Bearer token123", // bearer prefix without JWT
      ],
    });
  });

  describe("API_KEY_GENERIC", () => {
    testPolicySuite({
      policyName: "API_KEY_GENERIC",
      replacement: "[API_KEY]",
      shouldMatch: [
        "api_key: 1234567890abcdefghij", // api_key format
        "apikey: 1234567890abcdefghijklmnop", // apikey format (no underscore)
        "access_token: 1234567890abcdefghij", // access_token format
        "bearer_token: 1234567890abcdefghij", // bearer_token format
        "api_key: ABCDEFGHIJKLMNOPQRSTUVWXYZ", // uppercase variant
        "apikey: zyxwvutsrqponmlkjihgfedcba", // reverse alpha pattern
        "access_token: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6", // mixed case alternating
        "bearer_token: 00000000000000000000", // all zeros (test key)
        "api_key: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890", // mixed case pattern
      ],
      shouldNotMatch: [
        "api_key: short", // insufficient length
        "api_key:", // missing value
        "apikey: abc", // too short
        "access_token: tiny", // insufficient length
        "bearer_token:", // missing value
        "invalid-key", // wrong format
      ],
    });
  });

  describe("GOOGLE_API_KEY", () => {
    testPolicySuite({
      policyName: "GOOGLE_API_KEY",
      replacement: "[GOOGLE_API_KEY]",
      shouldMatch: [
        "AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI", // realistic Google API key
        "AIzaSyAbcdefghijklmnopqrstuvwxyz1234567", // standard alphanumeric
        "AIzaSyABCDEFGHIJKLMNOPQRSTUVWXYZ1234567", // uppercase variant
        "AIzaSy0123456789abcdefghijklmnopqrstuv", // numeric prefix
        "AIzaSy_abcdefghijklmnopqrstuvwxyz12345", // with underscore
        "AIzaSy-1234567890ABCDEFGHIJKLMNOPQRSTU", // with hyphen
        "AIzaSyZYXWVUTSRQPONMLKJIHGFEDCBA9876543", // reverse alpha pattern
      ],
      shouldNotMatch: [
        "AIzaShort", // wrong prefix
        "google-api-key", // incorrect format
        "AIzaSy", // missing key
        "AIzaSy123", // too short
        "AIza-too-short", // wrong prefix and too short
        "AIzaSy_tooshort", // insufficient length
      ],
    });
  });

  describe("SLACK_TOKEN", () => {
    testPolicySuite({
      policyName: "SLACK_TOKEN",
      replacement: "[SLACK_TOKEN]",
      shouldMatch: [
        "xoxb-123456789012-123456789012-abcdefghijklmnopqrstuvwx", // bot token
        "xoxp-123456789012-123456789012-abcdefghijklmnopqrstuvwx", // user token
        "xoxa-123456789012-123456789012-abcdefghijklmnopqrstuvwx", // app-level token
        "xoxr-123456789012-123456789012-abcdefghijklmnopqrstuvwx", // refresh token
        "xoxs-123456789012-123456789012-abcdefghijklmnopqrstuvwx", // signing secret
        "xoxb-000000000000-111111111111-ABCDEFGHIJKLMNOPQRSTUVWX", // uppercase variant
        "xoxp-999999999999-888888888888-0000000000000000000000000", // all numeric token
        "xoxa-123456789012-987654321098-aBcDeFgHiJkLmNoPqRsTuVwX", // mixed case pattern
        "xoxr-111111111111-222222222222-zyxwvutsrqponmlkjihgfedc", // reverse alpha pattern
        "xoxs-555555555555-666666666666-1234567890abcdefghijklmn", // numeric prefix token
      ],
      shouldNotMatch: [
        "xoxb-123-456-short", // numeric parts too short
        "slack-token", // incorrect format
        "xoxb-123456789012-123456789012-short", // token too short
        "xoxb-123-123-abc", // numeric parts insufficient
        "xoxp-invalid", // missing parts
        "xox-123456789012-123456789012-abcdefghijklmnopqrstuvwx", // incomplete prefix
      ],
    });
  });

  describe("PAYPAL_CLIENT_ID", () => {
    testPolicySuite({
      policyName: "PAYPAL_CLIENT_ID",
      replacement: "[PAYPAL_CLIENT_ID]",
      shouldMatch: [
        "AQkquBDf1zctJOWGKWUEtKXm6qVhueUEMvXO_-MCI4DQQ4-LWvkDLIN2fGsdabcdefghijklmnopqrstu", // realistic PayPal client ID
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ", // alphanumeric mix
        "A1234567890abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // numeric prefix
        "Azyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210zyxwvuts", // reverse alpha pattern
        "A_-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEF", // with special chars
      ],
      shouldNotMatch: [
        "AShort", // too short
        "paypal-client-id", // incorrect format
        "A12345", // insufficient length
        "ABCDEFGHIJ", // too short
        "paypal-invalid", // wrong format
        "A", // only prefix
      ],
    });
  });

  describe("TWILIO_API_KEY", () => {
    testPolicySuite({
      policyName: "TWILIO_API_KEY",
      replacement: "[TWILIO_API_KEY]",
      shouldMatch: [
        "SK1234567890abcdef1234567890abcdef", // standard Twilio API key
        "SKabcdefghijklmnopqrstuvwxyz123456", // lowercase variant
        "SKABCDEFGHIJKLMNOPQRSTUVWXYZ123456", // uppercase variant
        "SK0000000000000000000000000000000", // all zeros (test key)
        "SKzyxwvutsrqponmlkjihgfedcba987654", // reverse alpha pattern
        "SKaBcDeFgHiJkLmNoPqRsTuVwXyZ123456", // mixed case pattern
        "SK9876543210ABCDEFGHIJKLMNOPQRSTUV", // numeric prefix
      ],
      shouldNotMatch: [
        "SKshort", // too short
        "twilio-key", // incorrect format
        "SK", // only prefix
        "SK12345", // insufficient length
        "SK123456789012345678901234567890123", // too long
        "twilio-api-key", // wrong format
      ],
    });
  });

  describe("SENDGRID_API_KEY", () => {
    testPolicySuite({
      policyName: "SENDGRID_API_KEY",
      replacement: "[SENDGRID_API_KEY]",
      shouldMatch: [
        "SG.abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234", // standard SendGrid key
        "SG.ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz1234", // uppercase start
        "SG.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234", // numeric prefix
        "SG.zyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA9876", // reverse alpha pattern
        "SG.aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBcDeFgHiJkLmNoPqRsTuVwXyZ1234", // mixed case pattern
      ],
      shouldNotMatch: [
        "SG.short", // too short
        "sendgrid-key", // incorrect format
        "SG.", // only prefix
        "SG.abc", // insufficient length
        "SG.tooshorttobevalid", // too short
        "sendgrid-api-key", // wrong format
      ],
    });
  });

  describe("PASSWORD_ASSIGNMENT", () => {
    testPolicySuite({
      policyName: "PASSWORD_ASSIGNMENT",
      replacement: 'password="[PASSWORD]"',
      shouldMatch: [
        'password = "P@ssw0rd123!"', // double quotes with special chars
        "password: 'MySecret123'", // single quotes colon syntax
        'passwd="SecretPass456"', // passwd variant
        "password = 'Str0ng!Pass'", // single quotes equals syntax
        'passwd="C0mpl3x!P@ss"', // passwd with special chars
        'password: "T3st!ng123"', // colon with double quotes
        'password = "MyP@ssw0rd2024"', // year suffix pattern
        "passwd='$3cr3tK3y!'", // special char prefix
      ],
      shouldNotMatch: [
        'password = "short"', // too short (under 8 chars)
        "password:", // missing value
        "passwd=", // missing value
        'password = "abc"', // too short
        "password: 'tiny'", // insufficient length
        "password-invalid", // wrong format
      ],
    });
  });

  describe("CLOUDFLARE_API_TOKEN", () => {
    testPolicySuite({
      policyName: "CLOUDFLARE_API_TOKEN",
      replacement: "[CLOUDFLARE_TOKEN]",
      shouldMatch: [
        "1234567890abcdefghijklmnopqrstuvwxyz1234", // 40-character token
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcd", // mixed case
        "aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBcD", // alternating case
        "0000000000111111111122222222223333333333", // numeric pattern
        "zyxwvutsrqponmlkjihgfedcba9876543210abcd", // reverse alpha
        "abcdefghijklmnopqrstuvwxyz12345678901234", // lowercase heavy
        "ZYXWVUTSRQPONMLKJIHGFEDCBA1234567890ABCD", // uppercase heavy
        "xAxBxCxDxExFxGxHxIxJxKxLxMxNxOxPxQxRxSxT", // alternating pattern with x
        "zZyYxXwWvVuUtTsSrRqQpPoOnNmMlLkKjJiIhHgG", // alternating upper/lower
      ],
      shouldNotMatch: [
        "123456789012345678901234567890123456789", // 39 characters (too short)
        "12345678901234567890123456789012345678901", // 41 characters (too long)
        "cloudflare-token-abc", // wrong format
        "regular text", // plain text
        "api-key-123", // wrong prefix
        "short", // way too short
      ],
    });
  });
});
