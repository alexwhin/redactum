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
});
