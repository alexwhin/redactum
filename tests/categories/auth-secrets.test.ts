import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("auth secrets patterns", () => {
  testCategoryCoverage(PolicyCategory.AUTH_SECRETS, [
    "OAUTH_CLIENT_ID",
    "OAUTH_CLIENT_SECRET",
    "OAUTH_REFRESH_TOKEN",
    "OAUTH_ACCESS_TOKEN",
    "OKTA_API_TOKEN",
    "AUTH0_API_TOKEN",
    "KEYCLOAK_CLIENT_SECRET",
    "BASIC_AUTH_HEADER",
    "BEARER_TOKEN_HEADER",
    "API_KEY_HEADER",
    "SESSION_ID_COOKIE",
  ]);

  describe("OAUTH_CLIENT_ID", () => {
    testPolicySuite({
      policyName: "OAUTH_CLIENT_ID",
      replacement: "[OAUTH_CLIENT_ID]",
      shouldMatch: [
        "client_id: 1234567890-abcdefghijklmnopqrstuvwxyz", // OAuth client ID with hyphen separator
        "CLIENT_ID: abcdefghijklmnopqrstuvwxyz1234567890", // Uppercase client ID without separator
        "client-id: 1234567890abcdefghij", // Client ID with hyphen prefix format
        "client_id: 0000000000-ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Numeric prefix with uppercase suffix
        "CLIENT_ID: zyxwvutsrqponmlkjihgfedcba9876543210", // Long alphanumeric client ID
        "client-id: aBcDeFgHiJ1234567890", // Mixed case client ID
        "client_id: 999999999-aaaaaaaaaaaaaaaaaaaaaa", // Numeric prefix with lowercase suffix
        "CLIENT_ID: a1b2c3d4e5f6g7h8i9j0", // Alphanumeric client ID
      ],
      shouldNotMatch: [
        "client_id: short", // Too short to be valid OAuth client ID
        "regular text", // No client ID pattern present
        "client_id:", // Missing value after label
        "CLIENT_ID: abc", // Too short to be valid
        "client-id: tiny", // Too short to be valid
        "client_id", // Label without value
      ],
    });
  });

  describe("OAUTH_CLIENT_SECRET", () => {
    testPolicySuite({
      policyName: "OAUTH_CLIENT_SECRET",
      replacement: "[OAUTH_CLIENT_SECRET]",
      shouldMatch: [
        "client_secret: GOCSPX-1234567890abcdefghijklmnop", // Google OAuth client secret with prefix
        "CLIENT_SECRET: abcdefghijklmnopqrstuvwxyz1234567890", // Generic OAuth client secret
        "client_secret: GOCSPX-ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Google prefix with uppercase secret
        "CLIENT_SECRET: 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Long uppercase client secret
        "client_secret: GOCSPX-zyxwvutsrqponmlkjihgfedcba", // Google prefix with lowercase secret
        "CLIENT_SECRET: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890", // Mixed case client secret
        "client_secret: GOCSPX-0000000000000000000000000", // Google prefix with numeric secret
      ],
      shouldNotMatch: [
        "client_secret: short", // Too short to be valid secret
        "invalid", // No client secret pattern present
        "client_secret:", // Missing value after label
        "CLIENT_SECRET: abc", // Too short to be valid
        "client_secret: GOCSPX-short", // Google prefix but too short
        "CLIENT_SECRET: tiny", // Too short to be valid
      ],
    });
  });

  describe("OAUTH_REFRESH_TOKEN", () => {
    testPolicySuite({
      policyName: "OAUTH_REFRESH_TOKEN",
      replacement: "[OAUTH_REFRESH_TOKEN]",
      shouldMatch: [
        "refresh_token: 1//0gFU7abcdefghijklmnopqrstuvw", // Google refresh token with version prefix
        "REFRESH_TOKEN: 1234567890abcdefghijklmnopqrstuvwxyz", // Generic long refresh token
        "refresh_token: 1//0ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Google prefix with uppercase token
        "REFRESH_TOKEN: zyxwvutsrqponmlkjihgfedcba9876543210", // Long alphanumeric refresh token
        "refresh_token: 1//09876543210ZYXWVUTSRQPONML", // Google prefix with numeric token
        "REFRESH_TOKEN: 0000000000aaaaaaaaaaaaaaaaaaaaaa", // Long numeric-alpha refresh token
        "refresh_token: 1//0aBcDeFgHiJkLmNoPqRsTuVwXy", // Google prefix with mixed case token
      ],
      shouldNotMatch: [
        "refresh_token: short", // Too short to be valid refresh token
        "invalid", // No refresh token pattern present
        "refresh_token:", // Missing value after label
        "REFRESH_TOKEN: abc", // Too short to be valid
        "refresh_token: 1//0short", // Google prefix but too short
        "REFRESH_TOKEN: tiny", // Too short to be valid
      ],
    });
  });

  describe("OAUTH_ACCESS_TOKEN", () => {
    testPolicySuite({
      policyName: "OAUTH_ACCESS_TOKEN",
      replacement: "[OAUTH_ACCESS_TOKEN]",
      shouldMatch: [
        "access_token: ya29.a0ARrdaMabcdefghijklmnopqr", // Google access token with version prefix
        "ACCESS_TOKEN: 1234567890abcdefghijklmnopqrstuvwxyz", // Generic long access token
        "access_token: ya29.a0ABCDEFGHIJKLMNOPQRSTUVW", // Google prefix with uppercase token
        "ACCESS_TOKEN: zyxwvutsrqponmlkjihgfedcba9876543210", // Long alphanumeric access token
        "access_token: ya29.a0aBcDeFgHiJkLmNoPqRsTuVw", // Google prefix with mixed case token
        "ACCESS_TOKEN: 0000000000aaaaaaaaaaaaaaaaaaaaaa", // Long numeric-alpha access token
        "access_token: ya29.a09876543210ZYXWVUTSRQPON", // Google prefix with numeric token
      ],
      shouldNotMatch: [
        "access_token: short", // Too short to be valid access token
        "invalid", // No access token pattern present
        "access_token:", // Missing value after label
        "ACCESS_TOKEN: abc", // Too short to be valid
        "access_token: ya29.a0short", // Google prefix but too short
        "ACCESS_TOKEN: tiny", // Too short to be valid
      ],
    });
  });

  describe("OKTA_API_TOKEN", () => {
    testPolicySuite({
      policyName: "OKTA_API_TOKEN",
      replacement: "[OKTA_TOKEN]",
      shouldMatch: [
        "001234567890abcdefghijklmnopqrstuvwxyz1234", // Okta token with 00 prefix
        "00abcdefghijklmnopqrstuvwxyz1234567890abcd", // Okta token lowercase alphanumeric
        "00ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCD", // Okta token uppercase alphanumeric
        "00zyxwvutsrqponmlkjihgfedcba9876543210zyxw", // Okta token reverse alphanumeric
        "00aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBcD", // Okta token mixed case
        "000000000000000000000000000000000000000000", // Okta token all zeros
        "009876543210ZYXWVUTSRQPONMLKJIHGFEDCBA9876", // Okta token numeric uppercase mix
      ],
      shouldNotMatch: [
        "invalid: 123456", // No Okta token format
        "test", // Generic text without pattern
        "00short", // Has 00 prefix but too short
        "00abc", // Has 00 prefix but too short
        "001234567890", // Has 00 prefix but too short
        "okta-token", // Label without actual token
      ],
    });
  });

  describe("AUTH0_API_TOKEN", () => {
    testPolicySuite({
      policyName: "AUTH0_API_TOKEN",
      replacement: "[AUTH0_TOKEN]",
      shouldMatch: [
        "auth0-token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik", // Auth0 JWT with RSA256 algorithm
        "auth0_api_key: 1234567890abcdefghijklmnopqrstuvwxyz", // Auth0 API key lowercase
        "auth0-secret: abcdefghijklmnopqrstuvwxyz1234567890", // Auth0 secret lowercase
        "auth0-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik", // Auth0 JWT with HS256 algorithm
        "auth0_api_key: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // Auth0 API key uppercase
        "auth0-secret: zyxwvutsrqponmlkjihgfedcba9876543210", // Auth0 secret reverse alphanumeric
        "auth0-token: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik", // Auth0 JWT with ES256 algorithm
        "auth0_api_key: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890", // Auth0 API key mixed case
      ],
      shouldNotMatch: [
        "auth0-token: short", // Too short to be valid token
        "invalid", // No Auth0 pattern present
        "auth0-token:", // Missing value after label
        "auth0_api_key: abc", // Too short to be valid key
        "auth0-secret: tiny", // Too short to be valid secret
        "auth0-invalid", // Invalid Auth0 label format
      ],
    });
  });

  describe("KEYCLOAK_CLIENT_SECRET", () => {
    testPolicySuite({
      policyName: "KEYCLOAK_CLIENT_SECRET",
      replacement: "[KEYCLOAK_SECRET]",
      shouldMatch: [
        "keycloak-client-secret: 12345678-1234-1234-1234-123456789012", // Keycloak UUID format client secret
        "keycloak_client_secret: abcdef01-2345-6789-abcd-ef0123456789", // Keycloak secret with hex values
        "keycloak-client-secret: ABCDEF01-2345-6789-ABCD-EF0123456789", // Keycloak uppercase UUID
        "keycloak_client_secret: 00000000-0000-0000-0000-000000000000", // Keycloak all zeros UUID
        "keycloak-client-secret: zyxwvu98-7654-3210-zyxw-vu9876543210", // Keycloak custom UUID
        "keycloak_client_secret: aBcDeF01-2345-6789-AbCd-Ef0123456789", // Keycloak mixed case UUID
        "keycloak-client-secret: 99999999-9999-9999-9999-999999999999", // Keycloak all nines UUID
      ],
      shouldNotMatch: [
        "keycloak-client-secret: 12345678-1234", // Incomplete UUID format
        "invalid", // No Keycloak pattern present
        "keycloak-client-secret:", // Missing value after label
        "keycloak_client_secret: abc", // Not a valid UUID
        "keycloak-client-secret: 12345678-1234-1234-1234", // Missing last UUID segment
        "keycloak-invalid", // Invalid Keycloak label format
      ],
    });
  });

  describe("BASIC_AUTH_HEADER", () => {
    testPolicySuite({
      policyName: "BASIC_AUTH_HEADER",
      replacement: "Authorization: Basic [REDACTED]",
      shouldMatch: [
        "Authorization: Basic dXNlcjpwYXNzd29yZA==", // user:password in Base64
        "Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=", // admin:password123
        "Authorization: Basic dGVzdDp0ZXN0MTIz", // test:test123
        "Authorization: Basic bXlfdXNlcjpteV9wYXNzd29yZA==", // my_user:my_password
        "Authorization: Basic YXBpX2tleV91c2VyOmFwaV9rZXlfcGFzc3dvcmQ=", // api_key_user:api_key_password
        "Authorization: Basic cm9vdDpyb290", // root:root
        "Authorization: Basic QUJDREVGR0hJSkw=", // short Base64
        "Authorization: Basic YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkw", // long Base64
        "Authorization: Basic cXdlcnR5OnBhc3N3b3Jk", // qwerty:password
      ],
      shouldNotMatch: [
        "Authorization: Bearer token123", // Bearer, not Basic
        "Authorization: Basic", // missing Base64 value
        "Basic dXNlcjpwYXNzd29yZA==", // missing Authorization prefix
        "Authorization: basic invalid", // lowercase basic
        "Auth: Basic dXNlcjpwYXNzd29yZA==", // wrong header name
        "regular text", // plain text
      ],
    });
  });

  describe("BEARER_TOKEN_HEADER", () => {
    testPolicySuite({
      policyName: "BEARER_TOKEN_HEADER",
      replacement: "Authorization: Bearer [REDACTED]",
      shouldMatch: [
        "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U", // JWT token
        "Authorization: Bearer 1234567890abcdefghijklmnopqrstuvwxyz", // simple Bearer token
        "Authorization: Bearer sk-1234567890abcdefghijklmnopqrstuvwxyz", // API key as Bearer token
        "Authorization: Bearer ghp_abcdefghijklmnopqrstuvwxyz1234567890", // GitHub token
        "Authorization: Bearer ya29.a0ARrdaMabcdefghijklmnopqrstuvwxyz", // Google OAuth token
        "Authorization: Bearer AQIC5wM2LY4Sfcw", // OpenAM token
        "Authorization: Bearer mF_9.B5f-4.1JqM", // dotted Bearer token
        "Authorization: Bearer abc_def-ghi~jkl+mno/pqr", // URL-safe characters
        "Authorization: Bearer token123==", // with padding
      ],
      shouldNotMatch: [
        "Authorization: Basic dXNlcjpwYXNzd29yZA==", // Basic, not Bearer
        "Authorization: Bearer", // missing token
        "Bearer token123", // missing Authorization prefix
        "Authorization: bearer invalid", // lowercase bearer
        "Auth: Bearer token123", // wrong header name
        "regular text", // plain text
      ],
    });
  });

  describe("API_KEY_HEADER", () => {
    testPolicySuite({
      policyName: "API_KEY_HEADER",
      replacement: "[API_KEY_HEADER]: [REDACTED]",
      shouldMatch: [
        "X-API-Key: 1234567890abcdefghijklmnopqrst", // standard X-API-Key
        "API-Key: abcdefghijklmnopqrstuvwxyz1234567890", // API-Key variant
        "X-Api-Key: sk-1234567890abcdefghijklmnop", // X-Api-Key variant
        "ApiKey: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // ApiKey variant
        "X-API-Key: ghp_1234567890abcdefghijklmnopqrstuvwxyz", // GitHub-like key
        "API-Key: AIzaSy1234567890abcdefghijklmnopqrst", // Google-like key
        "X-Api-Key: pk_test_1234567890abcdefghijklmnop", // Stripe-like key
        "ApiKey: SG.1234567890abcdefghijklmnopqrstuvwxyz", // SendGrid-like key
        "X-API-Key: 1234567890_abcdefghijklmnopqrstuvwxyz", // with underscore
        "API-Key: 1234567890-abcdefghijklmnopqrstuvwxyz", // with hyphen
      ],
      shouldNotMatch: [
        "X-API-Key: short", // too short
        "X-API-Key:", // missing value
        "API-Key", // missing colon and value
        "Authorization: Bearer token123", // different header
        "X-API-Key: abc", // too short
        "regular text", // plain text
      ],
    });
  });

  describe("SESSION_ID_COOKIE", () => {
    testPolicySuite({
      policyName: "SESSION_ID_COOKIE",
      replacement: "[SESSION_COOKIE]=[REDACTED]",
      shouldMatch: [
        "sessionid=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0", // Django session
        "PHPSESSID=1234567890abcdefghijklmnopqrstuvwxyz", // PHP session
        "JSESSIONID=ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // Java session
        "connect.sid=s%3A1234567890abcdefghijklmnopqrstuvwxyz", // Express session
        "express.sid=1234567890abcdefghijklmnopqrstuvwxyz.signature", // Express session with signature
        "sessionid=abc-def-ghi-jkl-mno-pqr", // session with hyphens (must be 20+ chars)
        "PHPSESSID=aBcDeF1234567890aBcDeF1234567890", // mixed case
        "JSESSIONID=1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ.node01", // with node identifier
        "connect.sid=abcdefghijklmnopqrstuvwxyz1234567890", // plain connect.sid
        "express.sid=1234567890_abcdefghijklmnopqrstuvwxyz", // with underscore
      ],
      shouldNotMatch: [
        "sessionid=short", // too short
        "sessionid=", // missing value
        "PHPSESSID", // missing equals and value
        "cookie=value", // different cookie name
        "JSESSIONID=abc", // too short
        "regular text", // plain text
      ],
    });
  });
});
