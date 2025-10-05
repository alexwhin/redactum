import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("infrastructure secrets patterns", () => {
  testCategoryCoverage(PolicyCategory.INFRASTRUCTURE_SECRETS, [
    "TERRAFORM_CLOUD_TOKEN",
    "HASHICORP_VAULT_TOKEN",
    "AWS_SECRETS_MANAGER_ARN",
    "AZURE_KEY_VAULT_SECRET",
    "GCP_SECRET_MANAGER",
    "KUBERNETES_CONFIG",
    "HELM_REPOSITORY_CREDENTIALS",
    "ANSIBLE_VAULT_PASSWORD",
    "CONSUL_TOKEN",
    "RANCHER_TOKEN",
  ]);

  describe("TERRAFORM_CLOUD_TOKEN", () => {
    testPolicySuite({
      policyName: "TERRAFORM_CLOUD_TOKEN",
      replacement: "[TERRAFORM_TOKEN]",
      shouldMatch: [
        "12345678901234.atlasv1.123456789012345678901234567890123456789012345678901234",
      ],
      shouldNotMatch: ["terraform-token", "invalid"],
    });
  });

  describe("HASHICORP_VAULT_TOKEN", () => {
    testPolicySuite({
      policyName: "HASHICORP_VAULT_TOKEN",
      replacement: "[VAULT_TOKEN]",
      shouldMatch: [
        "vault-token: s.1234567890abcdefghijklmnop",
        "vault_token: r.abcdefghijklmnop123456789012",
      ],
      shouldNotMatch: ["vault-token: short", "regular text"],
    });
  });

  describe("AWS_SECRETS_MANAGER_ARN", () => {
    testPolicySuite({
      policyName: "AWS_SECRETS_MANAGER_ARN",
      replacement: "[AWS_SECRET_ARN]",
      shouldMatch: [
        "arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-abcdef",
      ],
      shouldNotMatch: ["arn:aws:secretsmanager:us-east-1", "invalid"],
    });
  });

  describe("AZURE_KEY_VAULT_SECRET", () => {
    testPolicySuite({
      policyName: "AZURE_KEY_VAULT_SECRET",
      replacement: "[AZURE_VAULT_SECRET]",
      shouldMatch: [
        "https://myvault.vault.azure.net/secrets/MySecret/1234567890abcdef1234567890abcdef",
      ],
      shouldNotMatch: [
        "https://myvault.vault.azure.net/secrets/MySecret",
        "invalid",
      ],
    });
  });

  describe("GCP_SECRET_MANAGER", () => {
    testPolicySuite({
      policyName: "GCP_SECRET_MANAGER",
      replacement: "[GCP_SECRET]",
      shouldMatch: [
        "projects/123456/secrets/my-secret/versions/latest",
        "projects/my-project/secrets/db-password/versions/1",
      ],
      shouldNotMatch: ["projects/123456/secrets/my-secret", "invalid"],
    });
  });

  describe("KUBERNETES_CONFIG", () => {
    testPolicySuite({
      policyName: "KUBERNETES_CONFIG",
      replacement: "[KUBECONFIG]",
      shouldMatch: ["apiVersion: v1\nkind: Config"],
      shouldNotMatch: ["apiVersion: v1", "invalid"],
    });
  });

  describe("HELM_REPOSITORY_CREDENTIALS", () => {
    testPolicySuite({
      policyName: "HELM_REPOSITORY_CREDENTIALS",
      replacement: "[HELM_CREDENTIALS]",
      shouldMatch: [
        "helm-repo-password: 1234567890abcdef",
        "helm_repo_username: admin",
      ],
      shouldNotMatch: ["helm-password", "invalid"],
    });
  });

  describe("ANSIBLE_VAULT_PASSWORD", () => {
    testPolicySuite({
      policyName: "ANSIBLE_VAULT_PASSWORD",
      replacement: "[ANSIBLE_VAULT_PASSWORD]",
      shouldMatch: [
        "ansible-vault-password-file: /path/to/vault-pass",
        "ansible_vault_password: secret123",
      ],
      shouldNotMatch: ["ansible-vault", "invalid"],
    });
  });

  describe("CONSUL_TOKEN", () => {
    testPolicySuite({
      policyName: "CONSUL_TOKEN",
      replacement: "[CONSUL_TOKEN]",
      shouldMatch: [
        "consul-token: 12345678-1234-1234-1234-123456789012",
        "X-Consul-Token: abcdef01-2345-6789-abcd-ef0123456789",
      ],
      shouldNotMatch: ["consul-token: 12345678-1234", "invalid"],
    });
  });

  describe("RANCHER_TOKEN", () => {
    testPolicySuite({
      policyName: "RANCHER_TOKEN",
      replacement: "[RANCHER_TOKEN]",
      shouldMatch: ["token-12abc:12345", "rancher-token: token-xyz12:67890"],
      shouldNotMatch: ["invalid-token", "test"],
    });
  });
});
