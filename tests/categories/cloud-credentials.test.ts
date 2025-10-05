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
        "12345678-1234-1234-1234-123456789012", // standard UUID format
        "abcdef01-2345-6789-abcd-ef0123456789", // hex characters
        "00000000-0000-0000-0000-000000000000", // all zeros UUID
        "ffffffff-ffff-ffff-ffff-ffffffffffff", // all f's UUID
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // mixed alphanumeric
        "98765432-1098-7654-3210-987654321098", // numeric heavy
        "deadbeef-cafe-babe-face-d00d00d00d00", // common hex patterns
        "11111111-2222-3333-4444-555555555555", // repeating patterns
      ],
      shouldNotMatch: [
        "not-a-uuid", // plain text
        "12345678-1234-1234-1234", // incomplete UUID
        "12345678-1234-1234-1234-1234567890123", // too long
        "GHIJKLMN-1234-1234-1234-123456789012", // invalid hex chars
        "12345678_1234_1234_1234_123456789012", // wrong separator
        "azure-subscription", // text label
      ],
    });
  });

  describe("HEROKU_API_KEY", () => {
    testPolicySuite({
      policyName: "HEROKU_API_KEY",
      replacement: "[HEROKU_API_KEY]",
      shouldMatch: [
        "12345678-1234-1234-1234-123456789012", // standard Heroku API key UUID
        "abcdef01-2345-6789-abcd-ef0123456789", // hex UUID
        "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", // repeating hex
        "11111111-2222-3333-4444-555555555555", // numeric pattern
        "deadbeef-dead-beef-dead-beefdeadbeef", // common hex pattern
        "00000000-0000-0000-0000-000000000000", // zeros UUID
        "ffffffff-ffff-ffff-ffff-ffffffffffff", // max hex UUID
        "12ab34cd-56ef-7890-abcd-ef1234567890", // mixed alphanumeric
      ],
      shouldNotMatch: [
        "not-a-uuid", // plain text
        "12345678-1234-1234", // incomplete
        "heroku-api-key", // text label
        "GHIJKLMN-1234-1234-1234-123456789012", // invalid hex
        "12345678-1234-1234-1234-1234567890123", // too long
        "api-key-value", // generic text
      ],
    });
  });

  describe("DIGITALOCEAN_TOKEN", () => {
    testPolicySuite({
      policyName: "DIGITALOCEAN_TOKEN",
      replacement: "[DO_TOKEN]",
      shouldMatch: [
        "dop_v1_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // standard DO token
        "dop_v1_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // all a's
        "dop_v1_0000000000000000000000000000000000000000000000000000000000000000", // all zeros
        "dop_v1_ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", // all f's
        "dop_v1_abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd", // repeating pattern
        "dop_v1_1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890", // mixed hex
        "dop_v1_deadbeefcafebabedeadbeefcafebabedeadbeefcafebabedeadbeefcafebabe", // common hex
        "dop_v1_9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba", // reverse pattern
      ],
      shouldNotMatch: [
        "dop_v1_short", // too short
        "dop_v2_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // wrong version
        "do_v1_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // missing 'p'
        "digitalocean-token", // text label
        "dop_v1_GHIJKLMNOPQRSTUVWXYZ", // invalid hex chars
        "token-value", // generic text
      ],
    });
  });

  describe("RAILWAY_TOKEN", () => {
    testPolicySuite({
      policyName: "RAILWAY_TOKEN",
      replacement: "[RAILWAY_TOKEN]",
      shouldMatch: [
        "12345678-1234-1234-1234-123456789012", // standard Railway UUID token
        "abcdef01-2345-6789-abcd-ef0123456789", // hex UUID
        "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", // repeating hex
        "00000000-0000-0000-0000-000000000000", // zeros UUID
        "ffffffff-ffff-ffff-ffff-ffffffffffff", // max hex UUID
        "deadbeef-cafe-babe-dead-beefdeadbeef", // common hex pattern
        "11111111-2222-3333-4444-555555555555", // numeric pattern
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // mixed alphanumeric
      ],
      shouldNotMatch: [
        "railway.app", // domain name
        "12345678-1234-1234", // incomplete UUID
        "not-a-uuid", // plain text
        "GHIJKLMN-1234-1234-1234-123456789012", // invalid hex
        "railway-token", // text label
        "token-123", // short text
      ],
    });
  });

  describe("GCP_SERVICE_ACCOUNT_KEY", () => {
    testPolicySuite({
      policyName: "GCP_SERVICE_ACCOUNT_KEY",
      replacement: "[GCP_SERVICE_ACCOUNT]",
      shouldMatch: [
        "my-service-account@my-project.iam.gserviceaccount.com", // standard service account
        "app-123@example-project-456.iam.gserviceaccount.com", // with numbers
        "terraform-sa@prod-project.iam.gserviceaccount.com", // terraform service account
        "cloud-build@build-project-123.iam.gserviceaccount.com", // cloud build
        "gke-node@kubernetes-cluster.iam.gserviceaccount.com", // GKE node
        "dataflow-worker@analytics-project.iam.gserviceaccount.com", // Dataflow
        "compute-engine@compute-proj.iam.gserviceaccount.com", // Compute Engine
        "storage-admin@backup-project-789.iam.gserviceaccount.com", // storage admin
        "app-service@my-app-project-2024.iam.gserviceaccount.com", // app service with year
        "ci-cd-pipeline@devops-project.iam.gserviceaccount.com", // CI/CD pipeline
      ],
      shouldNotMatch: [
        "user@example.com", // regular email
        "admin@gmail.com", // Gmail address
        "service@company.com", // company email
        "test@gserviceaccount.com", // missing IAM part
        "account@project.com", // non-GCP email
        "my-service-account@project", // incomplete domain
      ],
    });
  });
});
