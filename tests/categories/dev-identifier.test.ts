import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("dev identifier patterns", () => {
  const devIdentifierPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.DEV_IDENTIFIER,
  );

  it("should have dev identifier patterns", () => {
    expect(devIdentifierPatterns.length).toBeGreaterThan(0);
  });

  describe("GOOGLE_CLOUD_PROJECT_ID", () => {
    const pattern = devIdentifierPatterns.find(
      (p) => p.name === "GOOGLE_CLOUD_PROJECT_ID",
    );

    it("should detect GCP project IDs", () => {
      expect(pattern).toBeTruthy();
      expect("gcp-project-id: my-project-123456".match(pattern!.pattern)).toBeTruthy();
      expect("gcp_project_id: test-project".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid project IDs", () => {
      expect("gcp-project-id: a".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("KAFKA_BOOTSTRAP_SERVER", () => {
    const pattern = devIdentifierPatterns.find(
      (p) => p.name === "KAFKA_BOOTSTRAP_SERVER",
    );

    it("should detect Kafka bootstrap servers", () => {
      expect(pattern).toBeTruthy();
      expect("kafka-broker1.example.com:9092".match(pattern!.pattern)).toBeTruthy();
      expect("localhost:9092".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Kafka servers", () => {
      expect("kafka-broker1.example.com:8080".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("CONTAINER_REGISTRY", () => {
    const pattern = devIdentifierPatterns.find(
      (p) => p.name === "CONTAINER_REGISTRY",
    );

    it("should detect container registry URLs", () => {
      expect(pattern).toBeTruthy();
      expect("us.gcr.io/my-project/my-image:latest".match(pattern!.pattern)).toBeTruthy();
      expect("myregistry.azurecr.io/app/web:v1.0".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid registry URLs", () => {
      expect("docker.io/image:tag".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("GIT_SSH_URL", () => {
    const pattern = devIdentifierPatterns.find((p) => p.name === "GIT_SSH_URL");

    it("should detect Git SSH URLs", () => {
      expect(pattern).toBeTruthy();
      expect("git@github.com:user/repo.git".match(pattern!.pattern)).toBeTruthy();
      expect("git@gitlab.com:org/project.git".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match HTTPS URLs", () => {
      expect("https://github.com/user/repo.git".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("API_ENDPOINT_URL", () => {
    const pattern = devIdentifierPatterns.find(
      (p) => p.name === "API_ENDPOINT_URL",
    );

    it("should detect API endpoint URLs", () => {
      expect(pattern).toBeTruthy();
      expect("https://api.example.com/v1/users".match(pattern!.pattern)).toBeTruthy();
      expect("http://api.test.com/v2/data".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match non-API URLs", () => {
      expect("https://www.example.com/page".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("BUILD_NUMBER", () => {
    const pattern = devIdentifierPatterns.find((p) => p.name === "BUILD_NUMBER");

    it("should detect build numbers", () => {
      expect(pattern).toBeTruthy();
      expect("BUILD-2024.1.123".match(pattern!.pattern)).toBeTruthy();
      expect("build: 20241234".match(pattern!.pattern)).toBeTruthy();
      expect("build#1234567".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match short build numbers", () => {
      expect("build: 123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("VERSION_TAG", () => {
    const pattern = devIdentifierPatterns.find((p) => p.name === "VERSION_TAG");

    it("should detect version tags", () => {
      expect(pattern).toBeTruthy();
      expect("v1.2.3".match(pattern!.pattern)).toBeTruthy();
      expect("version: v2.0.0-beta".match(pattern!.pattern)).toBeTruthy();
      expect("v1.0.0+build.123".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid version tags", () => {
      expect("v1.2".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("COMMIT_HASH", () => {
    const pattern = devIdentifierPatterns.find((p) => p.name === "COMMIT_HASH");

    it("should detect commit hashes", () => {
      expect(pattern).toBeTruthy();
      expect("commit: a1b2c3d4e5f6789012345678901234567890abcd".match(pattern!.pattern)).toBeTruthy();
      expect("sha: 1234567".match(pattern!.pattern)).toBeTruthy();
      expect("commit: abcd1234".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid commit hashes", () => {
      expect("commit: 123456".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PR_ISSUE_NUMBER", () => {
    const pattern = devIdentifierPatterns.find(
      (p) => p.name === "PR_ISSUE_NUMBER",
    );

    it("should detect PR and issue numbers", () => {
      expect(pattern).toBeTruthy();
      expect("PR #1234".match(pattern!.pattern)).toBeTruthy();
      expect("MR: 5678".match(pattern!.pattern)).toBeTruthy();
      expect("Issue#9012".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid numbers", () => {
      expect("PR #1234567".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("JIRA_TICKET", () => {
    const pattern = devIdentifierPatterns.find((p) => p.name === "JIRA_TICKET");

    it("should detect JIRA tickets", () => {
      expect(pattern).toBeTruthy();
      expect("PROJ-1234".match(pattern!.pattern)).toBeTruthy();
      expect("TASK-567".match(pattern!.pattern)).toBeTruthy();
      expect("BUG-890".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid ticket formats", () => {
      expect("PROJECT-1234".match(pattern!.pattern)).toBeFalsy();
      expect("PROJ".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("FIREBASE_CONFIG", () => {
    const pattern = devIdentifierPatterns.find(
      (p) => p.name === "FIREBASE_CONFIG",
    );

    it("should detect Firebase URLs", () => {
      expect(pattern).toBeTruthy();
      expect("my-app-default-rtdb.us-central1.firebaseio.com".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Firebase URLs", () => {
      expect("firebase.com".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SUPABASE_URL", () => {
    const pattern = devIdentifierPatterns.find((p) => p.name === "SUPABASE_URL");

    it("should detect Supabase URLs", () => {
      expect(pattern).toBeTruthy();
      expect("https://abcdefghijklmnopqrst.supabase.co".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Supabase URLs", () => {
      expect("https://short.supabase.co".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AUTH0_DOMAIN", () => {
    const pattern = devIdentifierPatterns.find((p) => p.name === "AUTH0_DOMAIN");

    it("should detect Auth0 domains", () => {
      expect(pattern).toBeTruthy();
      expect("myapp.auth0.com".match(pattern!.pattern)).toBeTruthy();
      expect("test-app.us.auth0.com".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Auth0 domains", () => {
      expect("auth0.com".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("NETLIFY_SITE_ID", () => {
    const pattern = devIdentifierPatterns.find(
      (p) => p.name === "NETLIFY_SITE_ID",
    );

    it("should detect Netlify site IDs", () => {
      expect(pattern).toBeTruthy();
      expect("12345678-1234-1234-1234-123456789012".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid UUIDs", () => {
      expect("12345678-1234-1234".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("VERCEL_DEPLOYMENT_URL", () => {
    const pattern = devIdentifierPatterns.find(
      (p) => p.name === "VERCEL_DEPLOYMENT_URL",
    );

    it("should detect Vercel deployment URLs", () => {
      expect(pattern).toBeTruthy();
      expect("https://my-app-git-main-myteam.vercel.app".match(pattern!.pattern)).toBeTruthy();
      expect("https://app.vercel.app".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match non-Vercel URLs", () => {
      expect("https://example.com".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("KUBERNETES_SECRET", () => {
    const pattern = devIdentifierPatterns.find(
      (p) => p.name === "KUBERNETES_SECRET",
    );

    it("should detect Kubernetes secrets", () => {
      expect(pattern).toBeTruthy();
      expect("kubernetes-secret: my-secret.default".match(pattern!.pattern)).toBeTruthy();
      expect("kubernetes_secret: app-config.production".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid secret names", () => {
      expect("kubernetes-secret: invalid".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const jiraPattern = devIdentifierPatterns.find(
      (p) => p.name === "JIRA_TICKET",
    );

    expect("regular text".match(jiraPattern!.pattern)).toBeFalsy();
  });
});
