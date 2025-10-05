import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("dev identifier patterns", () => {
  testCategoryCoverage(PolicyCategory.DEV_IDENTIFIER, [
    "GOOGLE_CLOUD_PROJECT_ID",
    "KAFKA_BOOTSTRAP_SERVER",
    "CONTAINER_REGISTRY",
    "GIT_SSH_URL",
    "API_ENDPOINT_URL",
    "KUBERNETES_SECRET",
    "BUILD_NUMBER",
    "VERSION_TAG",
    "COMMIT_HASH",
    "PR_ISSUE_NUMBER",
    "JIRA_TICKET",
    "FIREBASE_CONFIG",
    "SUPABASE_URL",
    "AUTH0_DOMAIN",
    "NETLIFY_SITE_ID",
    "VERCEL_DEPLOYMENT_URL",
  ]);

  describe("GOOGLE_CLOUD_PROJECT_ID", () => {
    testPolicySuite({
      policyName: "GOOGLE_CLOUD_PROJECT_ID",
      replacement: "[GCP_PROJECT_ID]",
      shouldMatch: [
        "gcp-project-id: my-project-123456",
        "gcp_project_id: test-project",
        "GCP_PROJECT_ID=production-app-2024",
        "gcloud config set project my-prod-app-123456",
        "--project=analytics-platform-42",
        "--project staging-env-2024",
        "export PROJECT_ID=my-staging-env-2024",
        "PROJECT=data-pipeline-prod",
        "projects/my-project-123/locations/us-central1",
      ],
      shouldNotMatch: [
        "gcp-project-id: a",
        "project: ab",
        "my-app-service",
        "test-project",
        "feature-user-auth",
        "production-east",
        "web-frontend-v2",
      ],
    });
  });

  describe("KAFKA_BOOTSTRAP_SERVER", () => {
    testPolicySuite({
      policyName: "KAFKA_BOOTSTRAP_SERVER",
      replacement: "[KAFKA_BOOTSTRAP]",
      shouldMatch: ["kafka-broker1.example.com:9092", "localhost:9092"],
      shouldNotMatch: ["kafka-broker1.example.com:8080", "invalid"],
    });
  });

  describe("CONTAINER_REGISTRY", () => {
    testPolicySuite({
      policyName: "CONTAINER_REGISTRY",
      replacement: "[CONTAINER_IMAGE]",
      shouldMatch: [
        "us.gcr.io/my-project/my-image:latest",
        "myregistry.azurecr.io/app/web:v1.0",
      ],
      shouldNotMatch: ["docker.io/image:tag", "invalid"],
    });
  });

  describe("GIT_SSH_URL", () => {
    testPolicySuite({
      policyName: "GIT_SSH_URL",
      replacement: "[GIT_SSH_URL]",
      shouldMatch: [
        "git@github.com:user/repo.git",
        "git@gitlab.com:org/project.git",
      ],
      shouldNotMatch: ["https://github.com/user/repo.git", "invalid"],
    });
  });

  describe("API_ENDPOINT_URL", () => {
    testPolicySuite({
      policyName: "API_ENDPOINT_URL",
      replacement: "[API_ENDPOINT]",
      shouldMatch: [
        "https://api.example.com/v1/users",
        "http://api.test.com/v2/data",
      ],
      shouldNotMatch: ["https://www.example.com/page", "invalid"],
    });
  });

  describe("KUBERNETES_SECRET", () => {
    testPolicySuite({
      policyName: "KUBERNETES_SECRET",
      replacement: "[K8S_SECRET]",
      shouldMatch: [
        "kubernetes-secret: my-secret.default",
        "kubernetes_secret: app-config.production",
      ],
      shouldNotMatch: ["kubernetes-secret: invalid", "test"],
    });
  });

  describe("BUILD_NUMBER", () => {
    testPolicySuite({
      policyName: "BUILD_NUMBER",
      replacement: "[BUILD_NUMBER]",
      shouldMatch: ["BUILD-2024.1.123", "build: 20241234", "build#1234567"],
      shouldNotMatch: ["build: 123", "invalid"],
    });
  });

  describe("VERSION_TAG", () => {
    testPolicySuite({
      policyName: "VERSION_TAG",
      replacement: "[VERSION]",
      shouldMatch: ["v1.2.3", "version: v2.0.0-beta", "v1.0.0+build.123"],
      shouldNotMatch: ["v1.2", "invalid"],
    });
  });

  describe("COMMIT_HASH", () => {
    testPolicySuite({
      policyName: "COMMIT_HASH",
      replacement: "[COMMIT_HASH]",
      shouldMatch: [
        "commit: a1b2c3d4e5f6789012345678901234567890abcd",
        "sha: 1234567",
        "commit: abcd1234",
      ],
      shouldNotMatch: ["commit: 123456", "invalid"],
    });
  });

  describe("PR_ISSUE_NUMBER", () => {
    testPolicySuite({
      policyName: "PR_ISSUE_NUMBER",
      replacement: "[TICKET_NUMBER]",
      shouldMatch: ["PR #1234", "MR: 5678", "Issue#9012"],
      shouldNotMatch: ["PR #1234567", "invalid"],
    });
  });

  describe("JIRA_TICKET", () => {
    testPolicySuite({
      policyName: "JIRA_TICKET",
      replacement: "[JIRA_TICKET]",
      shouldMatch: ["PROJ-1234", "TASK-567", "BUG-890"],
      shouldNotMatch: ["PROJECT-1234", "PROJ", "regular text"],
    });
  });

  describe("FIREBASE_CONFIG", () => {
    testPolicySuite({
      policyName: "FIREBASE_CONFIG",
      replacement: "[FIREBASE_URL]",
      shouldMatch: ["my-app-default-rtdb.us-central1.firebaseio.com"],
      shouldNotMatch: ["firebase.com", "invalid"],
    });
  });

  describe("SUPABASE_URL", () => {
    testPolicySuite({
      policyName: "SUPABASE_URL",
      replacement: "[SUPABASE_URL]",
      shouldMatch: ["https://abcdefghijklmnopqrst.supabase.co"],
      shouldNotMatch: ["https://short.supabase.co", "invalid"],
    });
  });

  describe("AUTH0_DOMAIN", () => {
    testPolicySuite({
      policyName: "AUTH0_DOMAIN",
      replacement: "[AUTH0_DOMAIN]",
      shouldMatch: ["myapp.auth0.com", "test-app.us.auth0.com"],
      shouldNotMatch: ["auth0.com", "invalid"],
    });
  });

  describe("NETLIFY_SITE_ID", () => {
    testPolicySuite({
      policyName: "NETLIFY_SITE_ID",
      replacement: "[NETLIFY_SITE_ID]",
      shouldMatch: ["12345678-1234-1234-1234-123456789012"],
      shouldNotMatch: ["12345678-1234-1234", "invalid"],
    });
  });

  describe("VERCEL_DEPLOYMENT_URL", () => {
    testPolicySuite({
      policyName: "VERCEL_DEPLOYMENT_URL",
      replacement: "[VERCEL_URL]",
      shouldMatch: [
        "https://my-app-git-main-myteam.vercel.app",
        "https://app.vercel.app",
      ],
      shouldNotMatch: ["https://example.com", "invalid"],
    });
  });
});
