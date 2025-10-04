import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("dev secret patterns", () => {
  const devSecretPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.DEV_SECRET,
  );

  it("should have dev secret patterns", () => {
    expect(devSecretPatterns.length).toBeGreaterThan(0);
  });

  describe("BASE64_URL_PARAM", () => {
    const pattern = devSecretPatterns.find((p) => p.name === "BASE64_URL_PARAM");

    it("should detect base64 URL parameters", () => {
      expect(pattern).toBeTruthy();
      expect(
        "https://example.com?token=aGVsbG93b3JsZHNlY3JldGtleXZhbHVl".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match short parameters", () => {
      expect(pattern).toBeTruthy();
      expect("https://example.com?id=abc123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("DOCKER_PASSWORD_FLAG", () => {
    const pattern = devSecretPatterns.find(
      (p) => p.name === "DOCKER_PASSWORD_FLAG",
    );

    it("should detect docker login passwords", () => {
      expect(pattern).toBeTruthy();
      expect(
        "docker login -u user -p mysecretpass123".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match docker commands without passwords", () => {
      expect(pattern).toBeTruthy();
      expect("docker ps -a".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("ENVIRONMENT_VARIABLE_SECRET", () => {
    const pattern = devSecretPatterns.find(
      (p) => p.name === "ENVIRONMENT_VARIABLE_SECRET",
    );

    it("should detect environment variable secrets", () => {
      expect(pattern).toBeTruthy();
      expect(
        "export API_KEY=sk-1234567890abcdef".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should detect database password variables", () => {
      expect(pattern).toBeTruthy();
      expect("MYSQL_PASSWORD=secret123".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match non-secret variables", () => {
      expect(pattern).toBeTruthy();
      expect("DATABASE_NAME=myapp".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SERVICE_ACCOUNT_EMAIL", () => {
    const pattern = devSecretPatterns.find(
      (p) => p.name === "SERVICE_ACCOUNT_EMAIL",
    );

    it("should detect GCP service account emails", () => {
      expect(pattern).toBeTruthy();
      expect(
        "service-account@my-project.iam.gserviceaccount.com".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match regular emails", () => {
      expect(pattern).toBeTruthy();
      expect("user@example.com".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SONARQUBE_TOKEN", () => {
    const pattern = devSecretPatterns.find(
      (p) => p.name === "SONARQUBE_TOKEN",
    );

    it("should detect SonarQube tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "sqp_1234567890abcdef1234567890abcdef12345678".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should detect sonar-token text", () => {
      expect(pattern).toBeTruthy();
      expect("sonar-token".match(pattern!.pattern)).toBeTruthy();
    });
  });

  describe("LAUNCHDARKLY_SDK_KEY", () => {
    const pattern = devSecretPatterns.find(
      (p) => p.name === "LAUNCHDARKLY_SDK_KEY",
    );

    it("should detect LaunchDarkly SDK keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "sdk-12345678-1234-1234-1234-123456789012".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should detect mobile SDK keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "mob-12345678-1234-1234-1234-123456789012".match(pattern!.pattern),
      ).toBeTruthy();
    });
  });

  describe("SEGMENT_WRITE_KEY", () => {
    const pattern = devSecretPatterns.find(
      (p) => p.name === "SEGMENT_WRITE_KEY",
    );

    it("should detect Segment write keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "segment-writekey: 1234567890abcdefghijklmnop123456".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match without key value", () => {
      expect(pattern).toBeTruthy();
      expect("segment-writekey: abc".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("MIXPANEL_API_SECRET", () => {
    const pattern = devSecretPatterns.find(
      (p) => p.name === "MIXPANEL_API_SECRET",
    );

    it("should detect Mixpanel API secrets", () => {
      expect(pattern).toBeTruthy();
      expect(
        "mixpanel-secret: 1234567890abcdef1234567890abcdef".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match without secret value", () => {
      expect(pattern).toBeTruthy();
      expect("mixpanel-secret: 123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("ALGOLIA_API_KEY", () => {
    const pattern = devSecretPatterns.find((p) => p.name === "ALGOLIA_API_KEY");

    it("should detect Algolia API keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "algolia-api-key: 1234567890abcdef1234567890abcdef".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match without key value", () => {
      expect(pattern).toBeTruthy();
      expect("algolia-api-key: abc".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("ELASTIC_CLOUD_ID", () => {
    const pattern = devSecretPatterns.find(
      (p) => p.name === "ELASTIC_CLOUD_ID",
    );

    it("should detect Elastic Cloud IDs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "elastic-cloud-id: dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyRjZWM2ZjI2MWE3NGJmMjRjZTMzYmI4ODExYjg0Mjk0ZiRjNmMyY2E2ZDA0MjI0OWFmMGNjN2Q3YTllOTYyNTc0Mw==".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match without Cloud ID value", () => {
      expect(pattern).toBeTruthy();
      expect("elastic-cloud-id: abc123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const envVarPattern = devSecretPatterns.find(
      (p) => p.name === "ENVIRONMENT_VARIABLE_SECRET",
    );

    expect("PORT=3000".match(envVarPattern!.pattern)).toBeFalsy();
    expect("NODE_ENV=production".match(envVarPattern!.pattern)).toBeFalsy();
  });
});
