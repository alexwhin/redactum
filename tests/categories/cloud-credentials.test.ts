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
    "AWS_ACCOUNT_ID",
    "GCP_API_KEY",
    "AZURE_STORAGE_CONNECTION_STRING",
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

  describe("AWS_ACCOUNT_ID", () => {
    testPolicySuite({
      policyName: "AWS_ACCOUNT_ID",
      replacement: "[AWS_ACCOUNT_ID]",
      shouldMatch: [
        "aws-account-id: 123456789012", // standard labeled format
        "aws_account_id: 987654321098", // underscore separator
        "AWS-ACCOUNT-ID: 111111111111", // uppercase
        "aws-account-id 234567890123", // without colon
        "AWS_ACCOUNT_ID: 000000000001", // with leading zeros
        "aws-account-id# 999999999999", // with hash
        "aws_account_id 555555555555", // underscore without colon
        "AWS-ACCOUNT-ID: 777777777777", // mixed case prefix
        "awsaccountid: 888888888888", // no separator in label
        "aws-account_id: 444444444444", // mixed separators
      ],
      shouldNotMatch: [
        "aws-account-id: 12345678901", // too short (11 digits)
        "aws-account-id: 1234567890123", // too long (13 digits)
        "aws-account-id:", // missing value
        "123456789012", // no label
        "account-id: 123456789012", // incomplete label
        "regular text", // plain text
      ],
    });
  });

  describe("GCP_API_KEY", () => {
    testPolicySuite({
      policyName: "GCP_API_KEY",
      replacement: "[GCP_API_KEY]",
      shouldMatch: [
        "AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI", // Google Maps API key (39 total chars = AIza + 35)
        "AIzaABCDEF1234567890abcdefGHIJKLMNOPQRS", // generic GCP API key
        "AIza1234567890abcdefghijklmnopqrstuv123", // alphanumeric
        "AIzaZYXWVUTSRQPONMLKJIHGFEDCBA987654321", // mixed case
        "AIzaabcdefghijklmnopqrstuvwxyz123456789", // lowercase heavy
        "AIzaABCDEFGHIJKLMNOPQRSTUVWXYZ123456789", // uppercase heavy
        "AIza_1234567890abcdefghijklmnopqrstuv-1", // with special chars
        "AIza-ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678", // with hyphen
        "AIza1234567890abcdefghijklmnopqrstuvwxy", // numeric start
      ],
      shouldNotMatch: [
        "AIza123", // too short
        "AIzaSy", // too short
        "AiZaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI", // wrong case prefix
        "AIZA1234567890abcdefghijklmnopqrstuv", // wrong prefix case
        "api-key-123", // wrong format
        "regular text", // plain text
      ],
    });
  });

  describe("AZURE_STORAGE_CONNECTION_STRING", () => {
    testPolicySuite({
      policyName: "AZURE_STORAGE_CONNECTION_STRING",
      replacement: "[AZURE_STORAGE_CONNECTION]",
      shouldMatch: [
        "DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ABCDEFGHIJKLMNOPQRSTUV==;EndpointSuffix=core.windows.net", // standard Azure Storage
        "DefaultEndpointsProtocol=https;AccountName=storageacct;AccountKey=HIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ABCDEFGHIJKLMNOPQRSTUVWXYZabc==;EndpointSuffix=core.windows.net", // uppercase key
        "DefaultEndpointsProtocol=https;AccountName=prod-storage;AccountKey=OPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij==;EndpointSuffix=core.windows.net", // prod storage
        "DefaultEndpointsProtocol=https;AccountName=devstorage;AccountKey=VWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopq==;EndpointSuffix=core.windows.net", // dev storage
        "DefaultEndpointsProtocol=https;AccountName=backup123;AccountKey=cdefghijklmnopqrstuvwxyz0123456789+/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx==;EndpointSuffix=core.windows.net", // backup storage
        "DefaultEndpointsProtocol=https;AccountName=logs-store;AccountKey=jklmnopqrstuvwxyz0123456789+/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234==;EndpointSuffix=core.windows.net", // logs storage
        "DefaultEndpointsProtocol=https;AccountName=media2024;AccountKey=qrstuvwxyz0123456789+/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/==;EndpointSuffix=core.windows.net", // media storage
        "DefaultEndpointsProtocol=https;AccountName=archive-data;AccountKey=xyz0123456789+/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/ABCDEFG==;EndpointSuffix=core.windows.net", // archive storage
      ],
      shouldNotMatch: [
        "DefaultEndpointsProtocol=https;AccountName=myaccount", // incomplete connection string
        "AccountKey=abcdefghijklmnopqrstuvwxyz==", // missing protocol and account
        "DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=short==;EndpointSuffix=core.windows.net", // key too short
        "regular text", // plain text
        "azure-storage-connection", // just label
        "EndpointSuffix=core.windows.net", // missing key parts
      ],
    });
  });
});
