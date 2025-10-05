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
        "12345678901234.atlasv1.123456789012345678901234567890123456789012345678901234", // Terraform Cloud API token
      ],
      shouldNotMatch: [
        "terraform-token", // Missing atlasv1 format
        "invalid", // No Terraform token pattern
      ],
    });
  });

  describe("HASHICORP_VAULT_TOKEN", () => {
    testPolicySuite({
      policyName: "HASHICORP_VAULT_TOKEN",
      replacement: "[VAULT_TOKEN]",
      shouldMatch: [
        "vault-token: s.1234567890abcdefghijklmnop", // Vault service token format
        "vault_token: r.abcdefghijklmnop123456789012", // Vault batch token format
      ],
      shouldNotMatch: [
        "vault-token: short", // Too short to be valid
        "regular text", // No Vault token pattern
      ],
    });
  });

  describe("AWS_SECRETS_MANAGER_ARN", () => {
    testPolicySuite({
      policyName: "AWS_SECRETS_MANAGER_ARN",
      replacement: "[AWS_SECRET_ARN]",
      shouldMatch: [
        "arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-abcdef", // AWS Secrets Manager ARN
      ],
      shouldNotMatch: [
        "arn:aws:secretsmanager:us-east-1", // Incomplete ARN missing secret
        "invalid", // No AWS secret ARN pattern
      ],
    });
  });

  describe("AZURE_KEY_VAULT_SECRET", () => {
    testPolicySuite({
      policyName: "AZURE_KEY_VAULT_SECRET",
      replacement: "[AZURE_VAULT_SECRET]",
      shouldMatch: [
        "https://myvault.vault.azure.net/secrets/MySecret/1234567890abcdef1234567890abcdef", // Azure Key Vault secret URL
      ],
      shouldNotMatch: [
        "https://myvault.vault.azure.net/secrets/MySecret", // Missing version identifier
        "invalid", // No Azure vault secret pattern
      ],
    });
  });

  describe("GCP_SECRET_MANAGER", () => {
    testPolicySuite({
      policyName: "GCP_SECRET_MANAGER",
      replacement: "[GCP_SECRET]",
      shouldMatch: [
        "projects/123456/secrets/my-secret/versions/latest", // GCP Secret Manager latest version
        "projects/my-project/secrets/db-password/versions/1", // GCP Secret Manager specific version
      ],
      shouldNotMatch: [
        "projects/123456/secrets/my-secret", // Missing version path
        "invalid", // No GCP secret pattern
      ],
    });
  });

  describe("KUBERNETES_CONFIG", () => {
    testPolicySuite({
      policyName: "KUBERNETES_CONFIG",
      replacement: "[KUBECONFIG]",
      shouldMatch: [
        "apiVersion: v1\nkind: Config", // Kubernetes config YAML
      ],
      shouldNotMatch: [
        "apiVersion: v1", // Missing kind Config
        "invalid", // No Kubernetes config pattern
      ],
    });
  });

  describe("HELM_REPOSITORY_CREDENTIALS", () => {
    testPolicySuite({
      policyName: "HELM_REPOSITORY_CREDENTIALS",
      replacement: "[HELM_CREDENTIALS]",
      shouldMatch: [
        "helm-repo-password: 1234567890abcdef", // Helm repository password
        "helm_repo_username: admin", // Helm repository username
      ],
      shouldNotMatch: [
        "helm-password", // No repo prefix
        "invalid", // No Helm credentials pattern
      ],
    });
  });

  describe("ANSIBLE_VAULT_PASSWORD", () => {
    testPolicySuite({
      policyName: "ANSIBLE_VAULT_PASSWORD",
      replacement: "[ANSIBLE_VAULT_PASSWORD]",
      shouldMatch: [
        "ansible-vault-password-file: /path/to/vault-pass", // Ansible vault password file path
        "ansible_vault_password: secret123", // Ansible vault password value
      ],
      shouldNotMatch: [
        "ansible-vault", // Missing password keyword
        "invalid", // No Ansible vault pattern
      ],
    });
  });

  describe("CONSUL_TOKEN", () => {
    testPolicySuite({
      policyName: "CONSUL_TOKEN",
      replacement: "[CONSUL_TOKEN]",
      shouldMatch: [
        "consul-token: 12345678-1234-1234-1234-123456789012", // Consul ACL token UUID
        "X-Consul-Token: abcdef01-2345-6789-abcd-ef0123456789", // Consul HTTP header token
      ],
      shouldNotMatch: [
        "consul-token: 12345678-1234", // Incomplete UUID format
        "invalid", // No Consul token pattern
      ],
    });
  });

  describe("RANCHER_TOKEN", () => {
    testPolicySuite({
      policyName: "RANCHER_TOKEN",
      replacement: "[RANCHER_TOKEN]",
      shouldMatch: [
        "token-12abc:12345", // Rancher API token format
        "rancher-token: token-xyz12:67890", // Rancher labeled token
      ],
      shouldNotMatch: [
        "invalid-token", // Missing colon separator
        "test", // No Rancher token pattern
      ],
    });
  });
});
