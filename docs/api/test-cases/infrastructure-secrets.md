---
prev: false
next: false
search: false
---

# Infrastructure Secrets Test Cases

[← Back to Test Cases](/api/test-cases)

This page shows 16 test cases that validate Infrastructure Secrets patterns.

| Policy | Test Case |
|--------|-----------|
| `TERRAFORM_CLOUD_TOKEN` | `12345678901234.atlasv1.123456789012345678901234567890123456789012345678901234` |
| `HASHICORP_VAULT_TOKEN` | `vault-token: s.1234567890abcdefghijklmnop` |
| `HASHICORP_VAULT_TOKEN` | `vault_token: r.abcdefghijklmnop123456789012` |
| `AWS_SECRETS_MANAGER_ARN` | `arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-abcdef` |
| `AZURE_KEY_VAULT_SECRET` | `https://myvault.vault.azure.net/secrets/MySecret/1234567890abcdef1234567890abcdef` |
| `GCP_SECRET_MANAGER` | `projects/123456/secrets/my-secret/versions/latest` |
| `GCP_SECRET_MANAGER` | `projects/my-project/secrets/db-password/versions/1` |
| `KUBERNETES_CONFIG` | `apiVersion: v1\nkind: Config` |
| `HELM_REPOSITORY_CREDENTIALS` | `helm-repo-password: 1234567890abcdef` |
| `HELM_REPOSITORY_CREDENTIALS` | `helm_repo_username: admin` |
| `ANSIBLE_VAULT_PASSWORD` | `ansible-vault-password-file: /path/to/vault-pass` |
| `ANSIBLE_VAULT_PASSWORD` | `ansible_vault_password: secret123` |
| `CONSUL_TOKEN` | `consul-token: 12345678-1234-1234-1234-123456789012` |
| `CONSUL_TOKEN` | `X-Consul-Token: abcdef01-2345-6789-abcd-ef0123456789` |
| `RANCHER_TOKEN` | `token-12abc:12345` |
| `RANCHER_TOKEN` | `rancher-token: token-xyz12:67890` |
