import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("cloud credentials patterns", () => {
  testCategoryCoverage(PolicyCategory.CLOUD_CREDENTIALS, [
    "AZURE_SUBSCRIPTION_ID",
    "HEROKU_API_KEY",
    "DIGITALOCEAN_TOKEN",
    "RAILWAY_TOKEN",
    "GCP_SERVICE_ACCOUNT_KEY",
  ]);

  describe("AZURE_SUBSCRIPTION_ID", () => {
    testPolicySuite({
      policyName: "AZURE_SUBSCRIPTION_ID",
      replacement: "[AZURE_SUBSCRIPTION_ID]",
      shouldMatch: [
        "12345678-1234-1234-1234-123456789012",
        "abcdef01-2345-6789-abcd-ef0123456789",
      ],
      shouldNotMatch: ["not-a-uuid"],
    });
  });

  describe("HEROKU_API_KEY", () => {
    testPolicySuite({
      policyName: "HEROKU_API_KEY",
      replacement: "[HEROKU_API_KEY]",
      shouldMatch: ["12345678-1234-1234-1234-123456789012"],
      shouldNotMatch: ["not-a-uuid"],
    });
  });

  describe("DIGITALOCEAN_TOKEN", () => {
    testPolicySuite({
      policyName: "DIGITALOCEAN_TOKEN",
      replacement: "[DO_TOKEN]",
      shouldMatch: [
        "dop_v1_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      ],
      shouldNotMatch: ["dop_v1_short"],
    });
  });

  describe("RAILWAY_TOKEN", () => {
    testPolicySuite({
      policyName: "RAILWAY_TOKEN",
      replacement: "[RAILWAY_TOKEN]",
      shouldMatch: [
        "12345678-1234-1234-1234-123456789012",
        "abcdef01-2345-6789-abcd-ef0123456789",
      ],
      shouldNotMatch: ["railway.app"],
    });
  });

  describe("GCP_SERVICE_ACCOUNT_KEY", () => {
    testPolicySuite({
      policyName: "GCP_SERVICE_ACCOUNT_KEY",
      replacement: "[GCP_SERVICE_ACCOUNT]",
      shouldMatch: [
        "my-service-account@my-project.iam.gserviceaccount.com",
        "app-123@example-project-456.iam.gserviceaccount.com",
      ],
      shouldNotMatch: ["user@example.com"],
    });
  });
});
