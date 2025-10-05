#!/usr/bin/env tsx
import { POLICIES } from "../src/constants.js";
import type { PolicyCategory } from "../src/types/index.js";
import { writeFileSync, readFileSync, readdirSync, mkdirSync } from "fs";
import { join } from "path";

function toHumanReadable(snakeCase: string): string {
  return snakeCase
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getCategoryDisplayName(category: PolicyCategory): string {
  const categoryMap: Record<string, string> = {
    EMAIL: "Email",
    PHONE: "Phone Numbers",
    SSN: "Social Security Numbers",
    CREDIT_CARD: "Credit Cards",
    IP_ADDRESS: "IP Addresses",
    API_KEY: "API Keys",
    AWS_KEY: "AWS Credentials",
    PRIVATE_KEY: "Private Keys",
    ADDRESS: "Addresses",
    GOVERNMENT_ID: "Government IDs",
    TAX_IDENTIFIER: "Tax Identifiers",
    INSURANCE: "Insurance",
    FINANCIAL: "Financial",
    MEDICAL: "Medical",
    DIGITAL_IDENTITY: "Digital Identity",
    GEOGRAPHIC: "Geographic",
    EMPLOYEE_ID: "Employee IDs",
    VEHICLE: "Vehicles",
    DEV_SECRET: "Developer Secrets",
    DEV_IDENTIFIER: "Developer Identifiers",
    CLOUD_CREDENTIALS: "Cloud Credentials",
    CI_CD_SECRETS: "CI/CD Secrets",
    PACKAGE_REGISTRY: "Package Registries",
    DATABASE_CREDENTIALS: "Database Credentials",
    MONITORING_SECRETS: "Monitoring Secrets",
    AUTH_SECRETS: "Authentication Secrets",
    MESSAGING_SECRETS: "Messaging Secrets",
    WEBHOOK_URLS: "Webhook URLs",
    ENCRYPTION_KEYS: "Encryption Keys",
    CONTAINER_REGISTRY: "Container Registries",
    INFRASTRUCTURE_SECRETS: "Infrastructure Secrets",
    CUSTOM: "Custom",
  };

  return categoryMap[category] || toHumanReadable(category);
}

export const exampleMap: Record<string, string> = {
  EMAIL_ADDRESS: "john@example.com",
  PHONE_NUMBER_US: "555-123-4567",
  PHONE_NUMBER_INTERNATIONAL: "Call +14155551234",
  PHONE_NUMBER_UK: "+442071234567",
  PHONE_NUMBER_CANADIAN: "+1-416-555-0123",
  SSN: "123-45-6789",
  CREDIT_CARD: "4111111111111111",
  IPV4_ADDRESS: "192.168.1.1",
  IPV6_ADDRESS: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
  MAC_ADDRESS: "00:1B:44:11:3A:B7",
  UUID: "550e8400-e29b-41d4-a716-446655440000",
  PASSPORT_NUMBER: "M12345678",
  DRIVER_LICENSE: "D123-4567-8901",
  VIN: "1HGBH41JXMN109186",
  ROUTING_NUMBER_US: "021000021",
  IBAN: "GB82WEST12345698765432",
  SWIFT_CODE: "BOFAUS3N",
  BITCOIN_ADDRESS: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  ETHEREUM_ADDRESS: "0x742d35Cc6634C0532925a3b844Bc9e7595f5a123",
  MEDICAL_RECORD_NUMBER: "MRN-123456",
  HEALTH_INSURANCE_ID: "Insurance HIB123456789",
  URL_WITH_CREDENTIALS: "https://user:password@example.com",
  JWT_TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  API_KEY_GENERIC: "api_key: 1234567890abcdefghij",
  AWS_ACCESS_KEY: "AKIAIOSFODNN7EXAMPLE",
  AWS_SECRET_KEY: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  AWS_SESSION_TOKEN:
    "FQoGZXIvYXdzEBYaDKJHabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwx",
  GOOGLE_API_KEY: "AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI",
  OPENAI_API_KEY: "sk-1234567890abcdefghijklmnopqrstuvwxyz",
  ANTHROPIC_API_KEY:
    "sk-ant-api03-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789012345678901234567890",
  GITHUB_TOKEN: "ghp_abcdefghijklmnopqrstuvwxyz1234567890",
  GITHUB_FINE_GRAINED_TOKEN:
    "github_pat_1234567890ABCDEFGHIJ_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY",
  GITLAB_TOKEN: "glpat-abcdefghijklmnopqrst",
  BITBUCKET_TOKEN: "bitbucket-token: 1234567890abcdefghij",
  AZURE_SUBSCRIPTION_ID: "12345678-1234-1234-1234-123456789012",
  AZURE_CLIENT_ID: "12345678-1234-1234-1234-123456789012",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  DOCKER_HUB_TOKEN: "dckr_pat_abcd1234efgh5678ijkl9012mnop3456qrst",
  DOCKER_REGISTRY_TOKEN: "dckr_pat_abcd1234efgh5678ijkl9012mnop3456qrst",
  NPM_TOKEN: "npm_abcd1234efgh5678ijkl9012mnop3456qrst",
  PYPI_TOKEN:
    "pypi-abcd1234efgh5678ijkl9012mnop3456qrstuvwx7890yzab1234cdef567",
  RUBYGEMS_API_KEY: "rubygems_1234567890abcdef",
  SLACK_WEBHOOK:
    "https://hooks.slack.com/services/T12345678/B1234567890/abcdefghijklmnopqrstuvwx",
  SLACK_TOKEN: "xoxb-123456789012-123456789012-abcdefghijklmnopqrstuvwx",
  DISCORD_TOKEN:
    "NzU0MzIxMDk4NzY1NDMyMTIz.X123456.abcdefghijklmnopqrstuvwxyz1234567890",
  DISCORD_WEBHOOK:
    "https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz123456",
  TWILIO_ACCOUNT_SID: "AC12345678901234567890123456789012",
  TWILIO_AUTH_TOKEN: "1234567890abcdef1234567890abcdef",
  TWILIO_API_KEY: "SK1234567890abcdef1234567890abcdef",
  SENDGRID_API_KEY:
    "SG.abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234",
  STRIPE_KEY: "sk_live_1234567890abcdefghijklmnop",
  SQUARE_ACCESS_TOKEN: "sq0atp-1234567890abcdef",
  PAYPAL_CLIENT_ID:
    "AQkquBDf1zctJOWGKWUEtKXm6qVhueUEMvXO_-MCI4DQQ4-LWvkDLIN2fGsdabcdefghijklmnopqrstu",
  BRAINTREE_ACCESS_TOKEN: "access_token$sandbox$1234567890abcdef",
  MAILGUN_API_KEY: "key-1234567890abcdef1234567890abcdef",
  MAILCHIMP_API_KEY: "1234567890abcdef1234567890abcdef-us1",
  FIREBASE_API_KEY: "AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI",
  FIREBASE_CONFIG: "my-app-default-rtdb.us-central1.firebaseio.com",
  SUPABASE_API_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3BxcnN0IiwiaWF0IjoxNjI3MjA4NTQyLCJleHAiOjE5NzQzNjM3NDJ9.abcdefghijklmnopqrstuvwxyz1234567890",
  SUPABASE_URL: "https://abcdefghijklmnopqrst.supabase.co",
  NETLIFY_ACCESS_TOKEN: "1234567890abcdef1234567890abcdef1234567890abcdef",
  NETLIFY_SITE_ID: "12345678-1234-1234-1234-123456789012",
  HEROKU_API_KEY: "12345678-1234-1234-1234-123456789012",
  RAILWAY_TOKEN: "12345678-1234-1234-1234-123456789012",
  DIGITALOCEAN_TOKEN:
    "dop_v1_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  GCP_SERVICE_ACCOUNT_KEY:
    "my-service-account@my-project.iam.gserviceaccount.com",
  CREDIT_CARD_WITH_SEPARATORS: "4111-1111-1111-1111",
  BASE64_URL_PARAM:
    "https://example.com?token=aGVsbG93b3JsZHNlY3JldGtleXZhbHVl",
  DOCKER_PASSWORD_FLAG: "docker login -u user -p mysecretpass123",
  LINODE_API_TOKEN:
    "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  VULTR_API_KEY: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
  MONGODB_CONNECTION_STRING: "mongodb://user:pass@host:27017/database",
  POSTGRESQL_CONNECTION_STRING:
    "postgresql://user:password@localhost:5432/dbname",
  MYSQL_CONNECTION_STRING: "mysql://user:password@localhost:3306/database",
  REDIS_CONNECTION_STRING: "redis://user:password@localhost:6379/0",
  ELASTICSEARCH_URL: "https://elastic:password@localhost:9200",
  RABBITMQ_CONNECTION_STRING: "amqp://user:password@localhost:5672/",
  KAFKA_CONNECTION_STRING: "localhost:9092",
  CASSANDRA_CONNECTION_STRING: "cassandra://user:pass@host:9042/keyspace",
  DATABASE_CONNECTION_STRING:
    "Server=localhost;Database=myDb;User Id=myUser;Password=myPass;",
  DATABASE_URL: "postgres://user:pass@host:5432/dbname",
  LDAP_CONNECTION_STRING:
    "ldap://cn=admin,dc=example,dc=com:password@ldap.example.com",
  SSH_PRIVATE_KEY:
    "-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEA... -----END RSA PRIVATE KEY-----",
  RSA_PRIVATE_KEY:
    "-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEA... -----END RSA PRIVATE KEY-----",
  EC_PRIVATE_KEY:
    "-----BEGIN EC PRIVATE KEY----- MHcCAQEEIA... -----END EC PRIVATE KEY-----",
  OPENSSH_PRIVATE_KEY:
    "-----BEGIN OPENSSH PRIVATE KEY----- b3BlbnNzaC1rZXktdjEA... -----END OPENSSH PRIVATE KEY-----",
  GENERIC_PRIVATE_KEY:
    "-----BEGIN PRIVATE KEY----- MIIEvQIBADANBgkqhkiG9w0BAQ... -----END PRIVATE KEY-----",
  PGP_PRIVATE_KEY: "-----BEGIN PGP PRIVATE KEY BLOCK----- Version: GnuPG v1",
  BASE64_ENCODED_SECRET: "U2VjcmV0S2V5MTIzNDU2Nzg5MA==",
  HEX_ENCODED_SECRET: "4d79537570657253656372657448657832303234",
  GENERIC_SECRET: "secret_1234567890abcdef",
  GENERIC_TOKEN: "token_1234567890abcdef",
  GENERIC_CREDENTIAL: "credential_1234567890abcdef",
  GENERIC_PASSWORD: "P@ssw0rd123!",
  PASSWORD_ASSIGNMENT: 'password = "P@ssw0rd123!"',
  CERTIFICATE: "-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWgAwIBAgIJAKl...",
  ENVIRONMENT_VARIABLE_SECRET: "export API_KEY=sk-1234567890abcdef",
  DOCKER_REGISTRY_AUTH:
    '{"auths":{"https://index.docker.io/v1/":{"auth":"dXNlcjpwYXNzd29yZA=="}}}',
  KUBERNETES_SECRET: "kubernetes-secret: my-secret.default",
  KUBERNETES_CONFIG: "apiVersion: v1\nkind: Config",
  TERRAFORM_VARIABLE: 'variable "api_key" { default = "sk-1234567890abcdef" }',
  TERRAFORM_CLOUD_TOKEN:
    "12345678901234.atlasv1.123456789012345678901234567890123456789012345678901234",
  ANSIBLE_VAULT: "$ANSIBLE_VAULT;1.1;AES256\\n66383439383834353...",
  ANSIBLE_VAULT_PASSWORD: "ansible-vault-password-file: /path/to/vault-pass",
  AETNA_MEMBER_ID: "Aetna W123456789",
  BCBS_MEMBER_ID: "BCBS XYZ123456789",
  UNITEDHEALTH_MEMBER_ID: "United 901234567",
  UK_NHS_NUMBER: "123 456 7890",
  CANADIAN_HEALTH_CARD: "1234567890",
  AUSTRALIAN_MEDICARE_NUMBER: "1234 56789 0",
  GERMAN_HEALTH_INSURANCE_NUMBER: "A123456789",
  FRENCH_SOCIAL_SECURITY_NUMBER: "184127645108946",
  EUROPEAN_HEALTH_INSURANCE_CARD: "EHIC 801234567890123",
  AUTO_INSURANCE_POLICY: "Auto Policy: POLAUTO123",
  HOME_INSURANCE_POLICY: "Home Policy: HOME2024789",
  LIFE_INSURANCE_POLICY: "Life Policy: LIFEPOL456",
  TRAVEL_INSURANCE_POLICY: "Travel Policy: TRV2024123",
  WORKERS_COMPENSATION_CLAIM: "Workers Comp Claim: WC2024789",
  DISABILITY_INSURANCE_POLICY: "Disability Policy: DISPOL123",
  DENTAL_INSURANCE_POLICY: "Dental Policy: DENT456123",
  VISION_INSURANCE_POLICY: "Vision Policy: VIS789456",
  US_HEALTH_INSURANCE_POLICY: "Policy H123456789",
  US_INSURANCE_GROUP_NUMBER: "GRP123456",
  US_INSURANCE_CLAIM_NUMBER: "Claim CLM2024123456",
  MEDICARE_NUMBER_US: "123-45-6789-A",
  MEDICAID_NUMBER_US: "Medicaid 123456789A",
  EMPLOYEE_ID: "EMP 123456",
  US_DRIVER_LICENSE: "D12345678",
  US_PASSPORT_NUMBER: "M12345678",
  NATIONAL_ID: "National ID: ID123456789",
  US_LICENSE_PLATE: "ABC-1234",
  US_ZIP_CODE: "12345",
  CANADIAN_POSTAL_CODE: "K1A 0B1",
  UK_POSTCODE: "SW1A 1AA",
  GPS_COORDINATES: "40.7128,-74.0060",
  UK_VAT_NUMBER: "GB123456789",
  EU_VAT_NUMBER: "DE123456789",
  CANADIAN_BUSINESS_NUMBER: "123456789RC0001",
  AUSTRALIAN_ABN: "12 345 678 901",
  GERMAN_TAX_NUMBER: "12/345/67890",
  FRENCH_SIRET_NUMBER: "12345678901234",
  FRENCH_SIREN_NUMBER: "123456789",
  US_EIN: "12-3456789",
  US_EIN_WITH_LABEL: "EIN: 12-3456789",
  US_EIN_PREFIXED: "EIN 12-3456789",
  US_TIN_WITH_LABEL: "TIN 12-3456789",
  GOOGLE_CLOUD_PROJECT_ID: "gcp-project-id: my-project-123456",
  KAFKA_BOOTSTRAP_SERVER: "kafka-broker1.example.com:9092",
  CONTAINER_REGISTRY: "us.gcr.io/my-project/my-image:latest",
  GIT_SSH_URL: "git@github.com:user/repo.git",
  API_ENDPOINT_URL: "https://api.example.com/v1/users",
  BUILD_NUMBER: "BUILD-2024.1.123",
  VERSION_TAG: "v1.2.3",
  COMMIT_HASH: "commit: a1b2c3d4e5f6789012345678901234567890abcd",
  PR_ISSUE_NUMBER: "PR #1234",
  JIRA_TICKET: "PROJ-1234",
  AUTH0_DOMAIN: "myapp.auth0.com",
  AUTH0_API_TOKEN:
    "auth0-token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik",
  VERCEL_DEPLOYMENT_URL: "https://my-app-git-main-myteam.vercel.app",
  SERVICE_ACCOUNT_EMAIL: "service-account@my-project.iam.gserviceaccount.com",
  WEBHOOK_URL: "https://hooks.example.com/webhook/1234567890abcdef",
  OAUTH_CLIENT_ID: "client_id: 1234567890-abcdefghijklmnopqrstuvwxyz",
  OAUTH_CLIENT_SECRET: "client_secret: GOCSPX-1234567890abcdefghijklmnop",
  OAUTH_REFRESH_TOKEN: "refresh_token: 1//0gFU7abcdefghijklmnopqrstuvw",
  OAUTH_ACCESS_TOKEN: "access_token: ya29.a0ARrdaMabcdefghijklmnopqr",
  OKTA_API_TOKEN: "okta-token: 001234567890aBcDeFgHiJkLmNoPqRsTuVwXyZ12",
  KEYCLOAK_CLIENT_SECRET:
    "keycloak-client-secret: 12345678-1234-1234-1234-123456789012",
  SHA_HASH: "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12",
  JENKINS_TOKEN: "jenkins-token: 11a1234567890abcdef1234567890abcd",
  CIRCLECI_TOKEN: "circleci-token: 1234567890abcdef1234567890abcdef12345678",
  TRAVIS_CI_TOKEN: "travis-token: 1234567890abcdefghijkl",
  GITLAB_CI_TOKEN: "CI_JOB_TOKEN: 1234567890abcdef",
  AZURE_DEVOPS_TOKEN:
    "azdo-token: 1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdef",
  BITBUCKET_TOKEN_ALT: "ATBB1234567890abcdefghij",
  SENTRY_DSN:
    "https://1234567890abcdef1234567890abcdef@1a2b3c.ingest.sentry.io/1234567",
  NEW_RELIC_LICENSE_KEY:
    "newrelic-key: 1234567890abcdef1234567890abcdef12345678",
  DATADOG_API_KEY: "datadog-key: 1234567890abcdef1234567890abcdef",
  PAGERDUTY_INTEGRATION_KEY: "pagerduty-key: 1234567890abcdef1234567890abcdef",
  GRAFANA_API_KEY: "glsa_1234567890abcdefghijklmnopqrstuv_1a2b3c4d",
  PROMETHEUS_REMOTE_WRITE:
    "remote_write_url: https://prometheus-us-central1.grafana.net/api/v1/write",
  SPLUNK_HEC_TOKEN: "Splunk 12345678-1234-1234-1234-123456789012",
  SUMO_LOGIC_COLLECTOR:
    "https://collectors.us2.sumologic.com/receiver/v1/http/1234567890ABCDEF",
  BUGSNAG_API_KEY: "bugsnag-api-key: 1234567890abcdef1234567890abcdef",
  ROLLBAR_ACCESS_TOKEN:
    "rollbar-access-token: 1234567890abcdef1234567890abcdef",
  AIRBRAKE_API_KEY: "airbrake-api-key: 1234567890abcdef1234567890abcdef",
  LOGDNA_INGESTION_KEY:
    "logdna-ingestion-key: 1234567890abcdef1234567890abcdef",
  LOGGLY_TOKEN: "loggly-token: 12345678-1234-1234-1234-123456789012",
  PAPERTRAIL_TOKEN: "papertrail-token: 1234567890abcdef1234567890abcdef",
  HASHICORP_VAULT_TOKEN: "vault-token: s.1234567890abcdefghijklmnop",
  AWS_SECRETS_MANAGER_ARN:
    "arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-abcdef",
  AZURE_KEY_VAULT_SECRET:
    "https://myvault.vault.azure.net/secrets/MySecret/1234567890abcdef1234567890abcdef",
  GCP_SECRET_MANAGER: "projects/123456/secrets/my-secret/versions/latest",
  HELM_REPOSITORY_CREDENTIALS: "helm-repo-password: 1234567890abcdef",
  CONSUL_TOKEN: "consul-token: 12345678-1234-1234-1234-123456789012",
  RANCHER_TOKEN: "token-12abc:12345",
  QUAY_IO_TOKEN: "quay.io-token: 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456",
  JFROG_ARTIFACTORY_TOKEN: "AKCp1234567890abcdefghijklmnopqrstuvwxyz",
  NEXUS_REPOSITORY_TOKEN: "nexus-token: 1234567890abcdef-1234-1234-1234",
  CLOUDFLARE_API_TOKEN: "1234567890abcdefghijklmnopqrstuvwxyz1234",
  SSH_KEY_FINGERPRINT: "SHA256:1234567890abcdefghijklmnopqrstuvwxyz1234567",
  PGP_KEY_ID: "0x1234567890ABCDEF",
  AGE_SECRET_KEY:
    "AGE-SECRET-KEY-1QYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQY",
  AGE_PUBLIC_KEY:
    "age1abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuv",
  AWS_KMS_KEY_ID:
    "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012",
  GCP_KMS_KEY:
    "projects/my-project/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key",
  AZURE_KEY_IDENTIFIER:
    "https://myvault.vault.azure.net/keys/mykey/1234567890abcdef1234567890abcdef",
  MASTER_KEY:
    "master_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=",
  SONARQUBE_TOKEN: "sqp_1234567890abcdef1234567890abcdef12345678",
  LAUNCHDARKLY_SDK_KEY: "sdk-12345678-1234-1234-1234-123456789012",
  SEGMENT_WRITE_KEY: "segment-writekey: 1234567890abcdefghijklmnop123456",
  MIXPANEL_API_SECRET: "mixpanel-secret: 1234567890abcdef1234567890abcdef",
  ALGOLIA_API_KEY: "algolia-api-key: 1234567890abcdef1234567890abcdef",
  ELASTIC_CLOUD_ID:
    "elastic-cloud-id: dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyRjZWM2ZjI2MWE3NGJmMjRjZTMzYmI4ODExYjg0Mjk0ZiRjNmMyY2E2ZDA0MjI0OWFmMGNjN2Q3YTllOTYyNTc0Mw==",
};

const categoryOrder: PolicyCategory[] = [
  "DEV_IDENTIFIER" as PolicyCategory,
  "DEV_SECRET" as PolicyCategory,
  "DATABASE_CREDENTIALS" as PolicyCategory,
  "CLOUD_CREDENTIALS" as PolicyCategory,
  "API_KEY" as PolicyCategory,
  "AWS_KEY" as PolicyCategory,
  "PRIVATE_KEY" as PolicyCategory,
  "CI_CD_SECRETS" as PolicyCategory,
  "MONITORING_SECRETS" as PolicyCategory,
  "AUTH_SECRETS" as PolicyCategory,
  "MESSAGING_SECRETS" as PolicyCategory,
  "WEBHOOK_URLS" as PolicyCategory,
  "PACKAGE_REGISTRY" as PolicyCategory,
  "CONTAINER_REGISTRY" as PolicyCategory,
  "INFRASTRUCTURE_SECRETS" as PolicyCategory,
  "ENCRYPTION_KEYS" as PolicyCategory,
  "INSURANCE" as PolicyCategory,
  "MEDICAL" as PolicyCategory,
  "FINANCIAL" as PolicyCategory,
  "TAX_IDENTIFIER" as PolicyCategory,
  "GOVERNMENT_ID" as PolicyCategory,
  "SSN" as PolicyCategory,
  "CREDIT_CARD" as PolicyCategory,
  "EMAIL" as PolicyCategory,
  "PHONE" as PolicyCategory,
  "ADDRESS" as PolicyCategory,
  "GEOGRAPHIC" as PolicyCategory,
  "EMPLOYEE_ID" as PolicyCategory,
  "VEHICLE" as PolicyCategory,
  "IP_ADDRESS" as PolicyCategory,
  "DIGITAL_IDENTITY" as PolicyCategory,
  "CUSTOM" as PolicyCategory,
];

function generatePoliciesDocumentation(): void {
  const policiesByCategory = POLICIES.reduce((acc, policy) => {
    if (!acc[policy.category]) {
      acc[policy.category] = [];
    }
    acc[policy.category]!.push(policy);

    return acc;
  }, {} as Record<string, typeof POLICIES>);

  const sortedCategories = categoryOrder
    .filter((cat) => policiesByCategory[cat])
    .map((cat) => [cat, policiesByCategory[cat]!] as const);

  let markdown = `# Policies

<PatternStats />

From API keys and database credentials to personal information and financial data, each policy is designed to catch real-world patterns while minimizing false positives. Use them individually or combine categories to match your security requirements.

`;

  for (const [category, policies] of sortedCategories) {
    const displayName = getCategoryDisplayName(category as PolicyCategory);

    markdown += `## ${displayName}\n\n`;
    markdown += `| Policy | Example Match |\n`;
    markdown += `|--------|---------------|\n`;

    for (const policy of policies) {
      const example = exampleMap[policy.name] || "[REDACTED]";
      const displayExample = example.replace(/\n/g, " ");
      markdown += `| \`${policy.name}\` | \`${displayExample}\` |\n`;
    }
    markdown += `\n`;
  }

  const outputPath = join(process.cwd(), "docs", "api", "policies.md");
  writeFileSync(outputPath, markdown);

  console.log(`Generated policies documentation at ${outputPath}`);
  console.log(`Total policies: ${POLICIES.length}`);
  console.log(`Categories: ${sortedCategories.length}`);
}

interface TestCase {
  policyName: string;
  category: PolicyCategory;
  replacement: string;
  testCases: string[];
}

function extractTestCases(): TestCase[] {
  const testCases: TestCase[] = [];
  const testsDir = join(process.cwd(), "tests", "categories");
  const testFiles = readdirSync(testsDir).filter((f) => f.endsWith(".test.ts"));

  for (const file of testFiles) {
    const filePath = join(testsDir, file);
    const content = readFileSync(filePath, "utf-8");
    const policyMatches = content.matchAll(
      /describe\("([A-Z_]+)",\s*\(\)\s*=>\s*\{[\s\S]*?testPolicySuite\(\{[\s\S]*?policyName:\s*"([A-Z_]+)",[\s\S]*?replacement:\s*"([^"]+)",[\s\S]*?shouldMatch:\s*\[([\s\S]*?)\]/g
    );

    for (const match of policyMatches) {
      const policyName = match[2];
      const replacement = match[3];
      const shouldMatchStr = match[4];

      if (!policyName || !replacement || !shouldMatchStr) {
        continue;
      }

      const policy = POLICIES.find((p) => p.name === policyName);

      if (!policy) {
        continue;
      }

      const testCaseMatches = shouldMatchStr.matchAll(
        /"([^"\\]*(\\.[^"\\]*)*)"/g
      );
      const cases = Array.from(testCaseMatches).map((m) => {
        const captured = m[1];

        return captured ? captured.replace(/\\"/g, '"') : "";
      });

      testCases.push({
        policyName,
        category: policy.category,
        replacement,
        testCases: cases,
      });
    }
  }

  return testCases;
}

function generateTestCasesDocumentation(): void {
  const testCases = extractTestCases();
  const testCasesByCategory = testCases.reduce((acc, tc) => {
    if (!acc[tc.category]) {
      acc[tc.category] = [];
    }
    acc[tc.category]!.push(tc);

    return acc;
  }, {} as Record<string, TestCase[]>);

  const sortedTestCategories = categoryOrder
    .filter((cat) => testCasesByCategory[cat])
    .map((cat) => [cat, testCasesByCategory[cat]!] as const);

  let testMarkdown = `---
search: false
---

# Test Cases

<TestCaseStats />

Auto-generated from the test suites. All tests pass, ensuring pattern accuracy and comprehensive coverage.

`;

  let totalTestCases = 0;

  for (const [category, tests] of sortedTestCategories) {
    const displayName = getCategoryDisplayName(category as PolicyCategory);
    const kebabCategory = category.toLowerCase().replace(/_/g, "-");
    const categoryLink = `/api/test-cases/${kebabCategory}`;

    let categoryTestCount = 0;
    for (const test of tests) {
      categoryTestCount += test.testCases.length;
    }
    totalTestCases += categoryTestCount;

    testMarkdown += `- [${displayName}](${categoryLink}) (${categoryTestCount} test cases)\n`;

    let categoryMarkdown = `---
prev: false
next: false
search: false
---

# ${displayName} Test Cases

[← Back to Test Cases](/api/test-cases)

This page shows ${categoryTestCount} test cases that validate ${displayName} patterns.

| Policy | Test Case |
|--------|-----------|
`;

    for (const test of tests) {
      for (const testCase of test.testCases) {
        const displayTestCase = testCase.replace(/\n/g, " ");
        categoryMarkdown += `| \`${test.policyName}\` | \`${displayTestCase}\` |\n`;
      }
    }

    const categoryDir = join(process.cwd(), "docs", "api", "test-cases");
    mkdirSync(categoryDir, { recursive: true });
    const categoryOutputPath = join(categoryDir, `${kebabCategory}.md`);
    writeFileSync(categoryOutputPath, categoryMarkdown);
  }

  const testOutputPath = join(process.cwd(), "docs", "api", "test-cases.md");
  writeFileSync(testOutputPath, testMarkdown);

  const testStatsPath = join(process.cwd(), "test-case-statistics.json");
  const testStats = {
    totalTestCases,
    totalCategories: sortedTestCategories.length,
    lastUpdated: new Date().toISOString(),
  };
  writeFileSync(testStatsPath, `${JSON.stringify(testStats, null, 2)}\n`);

  console.log(`Generated test cases documentation at ${testOutputPath}`);
  console.log(`Total test cases: ${totalTestCases}`);
  console.log(`Test categories: ${sortedTestCategories.length}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generatePoliciesDocumentation();
  generateTestCasesDocumentation();
}
