import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("infrastructure secrets patterns", () => {
  const infrastructureSecretsPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.INFRASTRUCTURE_SECRETS,
  );

  it("should have infrastructure secrets patterns", () => {
    expect(infrastructureSecretsPatterns.length).toBeGreaterThan(0);
  });

  describe("TERRAFORM_CLOUD_TOKEN", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "TERRAFORM_CLOUD_TOKEN",
    );

    it("should detect Terraform Cloud tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "12345678901234.atlasv1.123456789012345678901234567890123456789012345678901234".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Terraform tokens", () => {
      expect("terraform-token".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("HASHICORP_VAULT_TOKEN", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "HASHICORP_VAULT_TOKEN",
    );

    it("should detect HashiCorp Vault tokens", () => {
      expect(pattern).toBeTruthy();
      expect("vault-token: s.1234567890abcdefghijklmnop".match(pattern!.pattern)).toBeTruthy();
      expect("vault_token: r.abcdefghijklmnop123456789012".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Vault tokens", () => {
      expect("vault-token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AWS_SECRETS_MANAGER_ARN", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "AWS_SECRETS_MANAGER_ARN",
    );

    it("should detect AWS Secrets Manager ARNs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-abcdef".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid ARNs", () => {
      expect("arn:aws:secretsmanager:us-east-1".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AZURE_KEY_VAULT_SECRET", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "AZURE_KEY_VAULT_SECRET",
    );

    it("should detect Azure Key Vault secrets", () => {
      expect(pattern).toBeTruthy();
      expect(
        "https://myvault.vault.azure.net/secrets/MySecret/1234567890abcdef1234567890abcdef".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Azure vault URLs", () => {
      expect(
        "https://myvault.vault.azure.net/secrets/MySecret".match(pattern!.pattern),
      ).toBeFalsy();
    });
  });

  describe("GCP_SECRET_MANAGER", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "GCP_SECRET_MANAGER",
    );

    it("should detect GCP Secret Manager paths", () => {
      expect(pattern).toBeTruthy();
      expect(
        "projects/123456/secrets/my-secret/versions/latest".match(pattern!.pattern),
      ).toBeTruthy();
      expect("projects/my-project/secrets/db-password/versions/1".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid GCP secret paths", () => {
      expect("projects/123456/secrets/my-secret".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("KUBERNETES_CONFIG", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "KUBERNETES_CONFIG",
    );

    it("should detect Kubernetes config headers", () => {
      expect(pattern).toBeTruthy();
      expect("apiVersion: v1\nkind: Config".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match incomplete configs", () => {
      expect("apiVersion: v1".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("HELM_REPOSITORY_CREDENTIALS", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "HELM_REPOSITORY_CREDENTIALS",
    );

    it("should detect Helm repository credentials", () => {
      expect(pattern).toBeTruthy();
      expect("helm-repo-password: 1234567890abcdef".match(pattern!.pattern)).toBeTruthy();
      expect("helm_repo_username: admin".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Helm credentials", () => {
      expect("helm-password".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("ANSIBLE_VAULT_PASSWORD", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "ANSIBLE_VAULT_PASSWORD",
    );

    it("should detect Ansible vault passwords", () => {
      expect(pattern).toBeTruthy();
      expect(
        "ansible-vault-password-file: /path/to/vault-pass".match(pattern!.pattern),
      ).toBeTruthy();
      expect("ansible_vault_password: secret123".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Ansible vault passwords", () => {
      expect("ansible-vault".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("CONSUL_TOKEN", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "CONSUL_TOKEN",
    );

    it("should detect Consul tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "consul-token: 12345678-1234-1234-1234-123456789012".match(pattern!.pattern),
      ).toBeTruthy();
      expect("X-Consul-Token: abcdef01-2345-6789-abcd-ef0123456789".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Consul tokens", () => {
      expect("consul-token: 12345678-1234".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("RANCHER_TOKEN", () => {
    const pattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "RANCHER_TOKEN",
    );

    it("should detect Rancher tokens", () => {
      expect(pattern).toBeTruthy();
      expect("token-12abc:12345".match(pattern!.pattern)).toBeTruthy();
      expect("rancher-token: token-xyz12:67890".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Rancher tokens", () => {
      expect("invalid-token".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const vaultPattern = infrastructureSecretsPatterns.find(
      (p) => p.name === "HASHICORP_VAULT_TOKEN",
    );

    expect("regular text".match(vaultPattern!.pattern)).toBeFalsy();
  });
});
