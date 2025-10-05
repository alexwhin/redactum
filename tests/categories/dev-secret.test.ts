import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("dev secret patterns", () => {
  testCategoryCoverage(PolicyCategory.DEV_SECRET, [
    "BASE64_URL_PARAM",
    "DOCKER_PASSWORD_FLAG",
    "ENVIRONMENT_VARIABLE_SECRET",
    "SERVICE_ACCOUNT_EMAIL",
    "SONARQUBE_TOKEN",
    "LAUNCHDARKLY_SDK_KEY",
    "SEGMENT_WRITE_KEY",
    "MIXPANEL_API_SECRET",
    "ALGOLIA_API_KEY",
    "ELASTIC_CLOUD_ID",
  ]);

  describe("BASE64_URL_PARAM", () => {
    testPolicySuite({
      policyName: "BASE64_URL_PARAM",
      replacement: "[BASE64]",
      shouldMatch: [
        "https://example.com?token=aGVsbG93b3JsZHNlY3JldGtleXZhbHVl",
      ],
      shouldNotMatch: ["https://example.com?id=abc123", "invalid"],
    });
  });

  describe("DOCKER_PASSWORD_FLAG", () => {
    testPolicySuite({
      policyName: "DOCKER_PASSWORD_FLAG",
      replacement: "[PASSWORD]",
      shouldMatch: ["docker login -u user -p mysecretpass123"],
      shouldNotMatch: ["docker ps -a", "invalid"],
    });
  });

  describe("ENVIRONMENT_VARIABLE_SECRET", () => {
    testPolicySuite({
      policyName: "ENVIRONMENT_VARIABLE_SECRET",
      replacement: "[REDACTED]",
      shouldMatch: [
        "export API_KEY=sk-1234567890abcdef",
        "MYSQL_PASSWORD=secret123",
      ],
      shouldNotMatch: [
        "DATABASE_NAME=myapp",
        "PORT=3000",
        "NODE_ENV=production",
      ],
    });
  });

  describe("SERVICE_ACCOUNT_EMAIL", () => {
    testPolicySuite({
      policyName: "SERVICE_ACCOUNT_EMAIL",
      replacement: "[SERVICE_ACCOUNT]",
      shouldMatch: ["service-account@my-project.iam.gserviceaccount.com"],
      shouldNotMatch: ["user@example.com", "invalid"],
    });
  });

  describe("SONARQUBE_TOKEN", () => {
    testPolicySuite({
      policyName: "SONARQUBE_TOKEN",
      replacement: "[SONARQUBE_TOKEN]",
      shouldMatch: [
        "sqp_1234567890abcdef1234567890abcdef12345678",
        "sonar-token",
      ],
      shouldNotMatch: ["invalid"],
    });
  });

  describe("LAUNCHDARKLY_SDK_KEY", () => {
    testPolicySuite({
      policyName: "LAUNCHDARKLY_SDK_KEY",
      replacement: "[LAUNCHDARKLY_KEY]",
      shouldMatch: [
        "sdk-12345678-1234-1234-1234-123456789012",
        "mob-12345678-1234-1234-1234-123456789012",
      ],
      shouldNotMatch: ["invalid"],
    });
  });

  describe("SEGMENT_WRITE_KEY", () => {
    testPolicySuite({
      policyName: "SEGMENT_WRITE_KEY",
      replacement: "[SEGMENT_WRITE_KEY]",
      shouldMatch: ["segment-writekey: 1234567890abcdefghijklmnop123456"],
      shouldNotMatch: ["segment-writekey: abc", "invalid"],
    });
  });

  describe("MIXPANEL_API_SECRET", () => {
    testPolicySuite({
      policyName: "MIXPANEL_API_SECRET",
      replacement: "[MIXPANEL_SECRET]",
      shouldMatch: ["mixpanel-secret: 1234567890abcdef1234567890abcdef"],
      shouldNotMatch: ["mixpanel-secret: 123", "invalid"],
    });
  });

  describe("ALGOLIA_API_KEY", () => {
    testPolicySuite({
      policyName: "ALGOLIA_API_KEY",
      replacement: "[ALGOLIA_API_KEY]",
      shouldMatch: ["algolia-api-key: 1234567890abcdef1234567890abcdef"],
      shouldNotMatch: ["algolia-api-key: abc", "invalid"],
    });
  });

  describe("ELASTIC_CLOUD_ID", () => {
    testPolicySuite({
      policyName: "ELASTIC_CLOUD_ID",
      replacement: "[ELASTIC_CLOUD_ID]",
      shouldMatch: [
        "elastic-cloud-id: dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyRjZWM2ZjI2MWE3NGJmMjRjZTMzYmI4ODExYjg0Mjk0ZiRjNmMyY2E2ZDA0MjI0OWFmMGNjN2Q3YTllOTYyNTc0Mw==",
      ],
      shouldNotMatch: ["elastic-cloud-id: abc123", "invalid"],
    });
  });
});
