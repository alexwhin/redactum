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
        "gcp-project-id: my-project-123456", // GCP project with label prefix
        "gcp_project_id: test-project", // GCP project underscore format
        "GCP_PROJECT_ID=production-app-2024", // GCP project env var format
        "gcloud config set project my-prod-app-123456", // GCP gcloud command
        "--project=analytics-platform-42", // GCP project flag with equals
        "--project staging-env-2024", // GCP project flag with space
        "export PROJECT_ID=my-staging-env-2024", // GCP project export statement
        "PROJECT=data-pipeline-prod", // GCP project variable assignment
        "projects/my-project-123/locations/us-central1", // GCP full resource path
      ],
      shouldNotMatch: [
        "gcp-project-id: a", // Too short single char
        "project: ab", // Too short two chars
        "my-app-service", // No label or context
        "test-project", // No label or context
        "feature-user-auth", // Generic kebab-case name
        "production-east", // Generic environment name
        "web-frontend-v2", // Generic service name
      ],
    });
  });

  describe("KAFKA_BOOTSTRAP_SERVER", () => {
    testPolicySuite({
      policyName: "KAFKA_BOOTSTRAP_SERVER",
      replacement: "[KAFKA_BOOTSTRAP]",
      shouldMatch: [
        "kafka-broker1.example.com:9092", // Kafka broker with hostname
        "localhost:9092", // Kafka on localhost
      ],
      shouldNotMatch: [
        "kafka-broker1.example.com:8080", // Wrong port not 9092
        "invalid", // No Kafka server pattern
      ],
    });
  });

  describe("CONTAINER_REGISTRY", () => {
    testPolicySuite({
      policyName: "CONTAINER_REGISTRY",
      replacement: "[CONTAINER_IMAGE]",
      shouldMatch: [
        "us.gcr.io/my-project/my-image:latest", // Google Container Registry image
        "myregistry.azurecr.io/app/web:v1.0", // Azure Container Registry image
      ],
      shouldNotMatch: [
        "docker.io/image:tag", // Public Docker Hub not private registry
        "invalid", // No container registry pattern
      ],
    });
  });

  describe("GIT_SSH_URL", () => {
    testPolicySuite({
      policyName: "GIT_SSH_URL",
      replacement: "[GIT_SSH_URL]",
      shouldMatch: [
        "git@github.com:user/repo.git", // GitHub SSH URL
        "git@gitlab.com:org/project.git", // GitLab SSH URL
      ],
      shouldNotMatch: [
        "https://github.com/user/repo.git", // HTTPS not SSH
        "invalid", // No Git SSH pattern
      ],
    });
  });

  describe("API_ENDPOINT_URL", () => {
    testPolicySuite({
      policyName: "API_ENDPOINT_URL",
      replacement: "[API_ENDPOINT]",
      shouldMatch: [
        "https://api.example.com/v1/users", // HTTPS API endpoint with version
        "http://api.test.com/v2/data", // HTTP API endpoint with version
      ],
      shouldNotMatch: [
        "https://www.example.com/page", // Regular web page not API
        "invalid", // No API endpoint pattern
      ],
    });
  });

  describe("KUBERNETES_SECRET", () => {
    testPolicySuite({
      policyName: "KUBERNETES_SECRET",
      replacement: "[K8S_SECRET]",
      shouldMatch: [
        "kubernetes-secret: my-secret.default", // K8s secret with namespace
        "kubernetes_secret: app-config.production", // K8s secret production namespace
      ],
      shouldNotMatch: [
        "kubernetes-secret: invalid", // No namespace separator
        "test", // No K8s secret pattern
      ],
    });
  });

  describe("BUILD_NUMBER", () => {
    testPolicySuite({
      policyName: "BUILD_NUMBER",
      replacement: "[BUILD_NUMBER]",
      shouldMatch: [
        "BUILD-2024.1.123", // Build number with year and version
        "build: 20241234", // Build number with date format
        "build#1234567", // Build number with hash prefix
      ],
      shouldNotMatch: [
        "build: 123", // Too short to be valid build
        "invalid", // No build number pattern
      ],
    });
  });

  describe("VERSION_TAG", () => {
    testPolicySuite({
      policyName: "VERSION_TAG",
      replacement: "[VERSION]",
      shouldMatch: [
        "v1.2.3", // Semantic version tag
        "version: v2.0.0-beta", // Pre-release version tag
        "v1.0.0+build.123", // Version with build metadata
      ],
      shouldNotMatch: [
        "v1.2", // Incomplete semantic version
        "invalid", // No version tag pattern
      ],
    });
  });

  describe("COMMIT_HASH", () => {
    testPolicySuite({
      policyName: "COMMIT_HASH",
      replacement: "[COMMIT_HASH]",
      shouldMatch: [
        "commit: a1b2c3d4e5f6789012345678901234567890abcd", // Full 40-char commit hash
        "sha: 1234567", // Short 7-char commit hash
        "commit: abcd1234", // 8-char commit hash
      ],
      shouldNotMatch: [
        "commit: 123456", // Too short 6 chars
        "invalid", // No commit hash pattern
      ],
    });
  });

  describe("PR_ISSUE_NUMBER", () => {
    testPolicySuite({
      policyName: "PR_ISSUE_NUMBER",
      replacement: "[TICKET_NUMBER]",
      shouldMatch: [
        "PR #1234", // Pull request number
        "MR: 5678", // Merge request number
        "Issue#9012", // Issue ticket number
      ],
      shouldNotMatch: [
        "PR #1234567", // Too long 7 digits
        "invalid", // No PR/issue pattern
      ],
    });
  });

  describe("JIRA_TICKET", () => {
    testPolicySuite({
      policyName: "JIRA_TICKET",
      replacement: "[JIRA_TICKET]",
      shouldMatch: [
        "PROJ-1234", // Jira project ticket
        "TASK-567", // Jira task ticket
        "BUG-890", // Jira bug ticket
      ],
      shouldNotMatch: [
        "PROJECT-1234", // Project key too long
        "PROJ", // No ticket number
        "regular text", // No Jira pattern
      ],
    });
  });

  describe("FIREBASE_CONFIG", () => {
    testPolicySuite({
      policyName: "FIREBASE_CONFIG",
      replacement: "[FIREBASE_URL]",
      shouldMatch: [
        "my-app-default-rtdb.us-central1.firebaseio.com", // Firebase Realtime Database URL
      ],
      shouldNotMatch: [
        "firebase.com", // Just domain not full URL
        "invalid", // No Firebase pattern
      ],
    });
  });

  describe("SUPABASE_URL", () => {
    testPolicySuite({
      policyName: "SUPABASE_URL",
      replacement: "[SUPABASE_URL]",
      shouldMatch: [
        "https://abcdefghijklmnopqrst.supabase.co", // Supabase project URL
      ],
      shouldNotMatch: [
        "https://short.supabase.co", // Project ID too short
        "invalid", // No Supabase pattern
      ],
    });
  });

  describe("AUTH0_DOMAIN", () => {
    testPolicySuite({
      policyName: "AUTH0_DOMAIN",
      replacement: "[AUTH0_DOMAIN]",
      shouldMatch: [
        "myapp.auth0.com", // Auth0 tenant domain
        "test-app.us.auth0.com", // Auth0 regional tenant domain
      ],
      shouldNotMatch: [
        "auth0.com", // Just Auth0 domain not tenant
        "invalid", // No Auth0 domain pattern
      ],
    });
  });

  describe("NETLIFY_SITE_ID", () => {
    testPolicySuite({
      policyName: "NETLIFY_SITE_ID",
      replacement: "[NETLIFY_SITE_ID]",
      shouldMatch: [
        "12345678-1234-1234-1234-123456789012", // Netlify site UUID
      ],
      shouldNotMatch: [
        "12345678-1234-1234", // Incomplete UUID format
        "invalid", // No Netlify site ID pattern
      ],
    });
  });

  describe("VERCEL_DEPLOYMENT_URL", () => {
    testPolicySuite({
      policyName: "VERCEL_DEPLOYMENT_URL",
      replacement: "[VERCEL_URL]",
      shouldMatch: [
        "https://my-app-git-main-myteam.vercel.app", // Vercel deployment with branch
        "https://app.vercel.app", // Simple Vercel app URL
      ],
      shouldNotMatch: [
        "https://example.com", // Not a Vercel URL
        "invalid", // No Vercel URL pattern
      ],
    });
  });
});
