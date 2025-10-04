import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("auth secrets patterns", () => {
  const authSecretsPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.AUTH_SECRETS,
  );

  it("should have auth secrets patterns", () => {
    expect(authSecretsPatterns.length).toBeGreaterThan(0);
  });

  describe("OAUTH_CLIENT_ID", () => {
    const pattern = authSecretsPatterns.find(
      (p) => p.name === "OAUTH_CLIENT_ID",
    );

    it("should detect OAuth client IDs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "client_id: 1234567890-abcdefghijklmnopqrstuvwxyz".match(pattern!.pattern),
      ).toBeTruthy();
      expect("CLIENT_ID: abcdefghijklmnopqrstuvwxyz1234567890".match(pattern!.pattern)).toBeTruthy();
      expect("client-id: 1234567890abcdefghij".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid client IDs", () => {
      expect("client_id: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("OAUTH_CLIENT_SECRET", () => {
    const pattern = authSecretsPatterns.find(
      (p) => p.name === "OAUTH_CLIENT_SECRET",
    );

    it("should detect OAuth client secrets", () => {
      expect(pattern).toBeTruthy();
      expect(
        "client_secret: GOCSPX-1234567890abcdefghijklmnop".match(pattern!.pattern),
      ).toBeTruthy();
      expect("CLIENT_SECRET: abcdefghijklmnopqrstuvwxyz1234567890".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid client secrets", () => {
      expect("client_secret: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("OAUTH_REFRESH_TOKEN", () => {
    const pattern = authSecretsPatterns.find(
      (p) => p.name === "OAUTH_REFRESH_TOKEN",
    );

    it("should detect OAuth refresh tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "refresh_token: 1//0gFU7abcdefghijklmnopqrstuvw".match(pattern!.pattern),
      ).toBeTruthy();
      expect("REFRESH_TOKEN: 1234567890abcdefghijklmnopqrstuvwxyz".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid refresh tokens", () => {
      expect("refresh_token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("OAUTH_ACCESS_TOKEN", () => {
    const pattern = authSecretsPatterns.find(
      (p) => p.name === "OAUTH_ACCESS_TOKEN",
    );

    it("should detect OAuth access tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "access_token: ya29.a0ARrdaMabcdefghijklmnopqr".match(pattern!.pattern),
      ).toBeTruthy();
      expect("ACCESS_TOKEN: 1234567890abcdefghijklmnopqrstuvwxyz".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid access tokens", () => {
      expect("access_token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("OKTA_API_TOKEN", () => {
    const pattern = authSecretsPatterns.find((p) => p.name === "OKTA_API_TOKEN");

    it("should detect Okta API tokens", () => {
      expect(pattern).toBeTruthy();
      expect("001234567890abcdefghijklmnopqrstuvwxyz1234".match(pattern!.pattern)).toBeTruthy();
      expect("00abcdefghijklmnopqrstuvwxyz1234567890abcd".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Okta tokens", () => {
      expect("invalid: 123456".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AUTH0_API_TOKEN", () => {
    const pattern = authSecretsPatterns.find(
      (p) => p.name === "AUTH0_API_TOKEN",
    );

    it("should detect Auth0 API tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "auth0-token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "auth0_api_key: 1234567890abcdefghijklmnopqrstuvwxyz".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "auth0-secret: abcdefghijklmnopqrstuvwxyz1234567890".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid Auth0 tokens", () => {
      expect("auth0-token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("KEYCLOAK_CLIENT_SECRET", () => {
    const pattern = authSecretsPatterns.find(
      (p) => p.name === "KEYCLOAK_CLIENT_SECRET",
    );

    it("should detect Keycloak client secrets", () => {
      expect(pattern).toBeTruthy();
      expect(
        "keycloak-client-secret: 12345678-1234-1234-1234-123456789012".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "keycloak_client_secret: abcdef01-2345-6789-abcd-ef0123456789".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Keycloak secrets", () => {
      expect("keycloak-client-secret: 12345678-1234".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const clientIdPattern = authSecretsPatterns.find(
      (p) => p.name === "OAUTH_CLIENT_ID",
    );

    expect("regular text".match(clientIdPattern!.pattern)).toBeFalsy();
  });
});
