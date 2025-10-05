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
        "client_id: 1234567890-abcdefghijklmnopqrstuvwxyz",
        "CLIENT_ID: abcdefghijklmnopqrstuvwxyz1234567890",
        "client-id: 1234567890abcdefghij",
        "client_id: 0000000000-ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "CLIENT_ID: zyxwvutsrqponmlkjihgfedcba9876543210",
        "client-id: aBcDeFgHiJ1234567890",
        "client_id: 999999999-aaaaaaaaaaaaaaaaaaaaaa",
        "CLIENT_ID: a1b2c3d4e5f6g7h8i9j0",
      ],
      shouldNotMatch: [
        "client_id: short",
        "regular text",
        "client_id:",
        "CLIENT_ID: abc",
        "client-id: tiny",
        "client_id",
      ],
    });
  });

  describe("OAUTH_CLIENT_SECRET", () => {
    testPolicySuite({
      policyName: "OAUTH_CLIENT_SECRET",
      replacement: "[OAUTH_CLIENT_SECRET]",
      shouldMatch: [
        "client_secret: GOCSPX-1234567890abcdefghijklmnop",
        "CLIENT_SECRET: abcdefghijklmnopqrstuvwxyz1234567890",
        "client_secret: GOCSPX-ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "CLIENT_SECRET: 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "client_secret: GOCSPX-zyxwvutsrqponmlkjihgfedcba",
        "CLIENT_SECRET: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890",
        "client_secret: GOCSPX-0000000000000000000000000",
      ],
      shouldNotMatch: [
        "client_secret: short",
        "invalid",
        "client_secret:",
        "CLIENT_SECRET: abc",
        "client_secret: GOCSPX-short",
        "CLIENT_SECRET: tiny",
      ],
    });
  });

  describe("OAUTH_REFRESH_TOKEN", () => {
    testPolicySuite({
      policyName: "OAUTH_REFRESH_TOKEN",
      replacement: "[OAUTH_REFRESH_TOKEN]",
      shouldMatch: [
        "refresh_token: 1//0gFU7abcdefghijklmnopqrstuvw",
        "REFRESH_TOKEN: 1234567890abcdefghijklmnopqrstuvwxyz",
        "refresh_token: 1//0ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "REFRESH_TOKEN: zyxwvutsrqponmlkjihgfedcba9876543210",
        "refresh_token: 1//09876543210ZYXWVUTSRQPONML",
        "REFRESH_TOKEN: 0000000000aaaaaaaaaaaaaaaaaaaaaa",
        "refresh_token: 1//0aBcDeFgHiJkLmNoPqRsTuVwXy",
      ],
      shouldNotMatch: [
        "refresh_token: short",
        "invalid",
        "refresh_token:",
        "REFRESH_TOKEN: abc",
        "refresh_token: 1//0short",
        "REFRESH_TOKEN: tiny",
      ],
    });
  });

  describe("OAUTH_ACCESS_TOKEN", () => {
    testPolicySuite({
      policyName: "OAUTH_ACCESS_TOKEN",
      replacement: "[OAUTH_ACCESS_TOKEN]",
      shouldMatch: [
        "access_token: ya29.a0ARrdaMabcdefghijklmnopqr",
        "ACCESS_TOKEN: 1234567890abcdefghijklmnopqrstuvwxyz",
        "access_token: ya29.a0ABCDEFGHIJKLMNOPQRSTUVW",
        "ACCESS_TOKEN: zyxwvutsrqponmlkjihgfedcba9876543210",
        "access_token: ya29.a0aBcDeFgHiJkLmNoPqRsTuVw",
        "ACCESS_TOKEN: 0000000000aaaaaaaaaaaaaaaaaaaaaa",
        "access_token: ya29.a09876543210ZYXWVUTSRQPON",
      ],
      shouldNotMatch: [
        "access_token: short",
        "invalid",
        "access_token:",
        "ACCESS_TOKEN: abc",
        "access_token: ya29.a0short",
        "ACCESS_TOKEN: tiny",
      ],
    });
  });

  describe("OKTA_API_TOKEN", () => {
    testPolicySuite({
      policyName: "OKTA_API_TOKEN",
      replacement: "[OKTA_TOKEN]",
      shouldMatch: [
        "001234567890abcdefghijklmnopqrstuvwxyz1234",
        "00abcdefghijklmnopqrstuvwxyz1234567890abcd",
        "00ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCD",
        "00zyxwvutsrqponmlkjihgfedcba9876543210zyxw",
        "00aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBcD",
        "000000000000000000000000000000000000000000",
        "009876543210ZYXWVUTSRQPONMLKJIHGFEDCBA9876",
      ],
      shouldNotMatch: [
        "invalid: 123456",
        "test",
        "00short",
        "00abc",
        "001234567890",
        "okta-token",
      ],
    });
  });

  describe("AUTH0_API_TOKEN", () => {
    testPolicySuite({
      policyName: "AUTH0_API_TOKEN",
      replacement: "[AUTH0_TOKEN]",
      shouldMatch: [
        "auth0-token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik",
        "auth0_api_key: 1234567890abcdefghijklmnopqrstuvwxyz",
        "auth0-secret: abcdefghijklmnopqrstuvwxyz1234567890",
        "auth0-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik",
        "auth0_api_key: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        "auth0-secret: zyxwvutsrqponmlkjihgfedcba9876543210",
        "auth0-token: eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik",
        "auth0_api_key: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890",
      ],
      shouldNotMatch: [
        "auth0-token: short",
        "invalid",
        "auth0-token:",
        "auth0_api_key: abc",
        "auth0-secret: tiny",
        "auth0-invalid",
      ],
    });
  });

  describe("KEYCLOAK_CLIENT_SECRET", () => {
    testPolicySuite({
      policyName: "KEYCLOAK_CLIENT_SECRET",
      replacement: "[KEYCLOAK_SECRET]",
      shouldMatch: [
        "keycloak-client-secret: 12345678-1234-1234-1234-123456789012",
        "keycloak_client_secret: abcdef01-2345-6789-abcd-ef0123456789",
        "keycloak-client-secret: ABCDEF01-2345-6789-ABCD-EF0123456789",
        "keycloak_client_secret: 00000000-0000-0000-0000-000000000000",
        "keycloak-client-secret: zyxwvu98-7654-3210-zyxw-vu9876543210",
        "keycloak_client_secret: aBcDeF01-2345-6789-AbCd-Ef0123456789",
        "keycloak-client-secret: 99999999-9999-9999-9999-999999999999",
      ],
      shouldNotMatch: [
        "keycloak-client-secret: 12345678-1234",
        "invalid",
        "keycloak-client-secret:",
        "keycloak_client_secret: abc",
        "keycloak-client-secret: 12345678-1234-1234-1234",
        "keycloak-invalid",
      ],
    });
  });
});
