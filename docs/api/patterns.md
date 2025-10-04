# Redaction Patterns

Redactum includes 190 built-in patterns across 32 categories.

## Categories

### INSURANCE (26 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Auto Insurance Policy Number | `INSURANCE` | POL-AUTO-123456 |
| Home Insurance Policy Number | `INSURANCE` | HOME-2024-789012 |
| Life Insurance Policy Number | `INSURANCE` | LIFE-POL-456789 |
| Travel Insurance Policy | `INSURANCE` | TRV-2024-123456 |
| Workers Compensation Claim | `INSURANCE` | WC-2024-789456 |
| Disability Insurance Policy | `INSURANCE` | DIS-POL-123789 |
| Dental Insurance Policy | `INSURANCE` | DENT-456123 |
| Vision Insurance Policy | `INSURANCE` | VIS-789456 |
| US Health Insurance Policy Number | `INSURANCE` | H123456789 |
| US Insurance Group Number | `INSURANCE` | GRP123456 |
| US Insurance Claim Number | `INSURANCE` | CLM-2024-123456 |
| Medicare Number (US) | `INSURANCE` | 1EG4-TE5-MK72 |
| Medicaid Number (US) | `INSURANCE` | 123456789A |
| BCBS Member ID | `INSURANCE` | XYZ123456789 |
| Aetna Member ID | `INSURANCE` | W123456789 |
| UnitedHealth Member ID | `INSURANCE` | 901234567 |
| UK NHS Number | `INSURANCE` | 123 456 7890 |
| Canadian Health Card | `INSURANCE` | 1234-567-890 |
| Australian Medicare Number | `INSURANCE` | 1234 56789 0 |
| German Health Insurance Number | `INSURANCE` | A123456789 |
| French Social Security Number | `INSURANCE` | 1 84 12 76 451 089 46 |
| European Health Insurance Card | `INSURANCE` | 80123456789012345678 |
| Workers Compensation Claim | `INSURANCE` | WC-2024-789456 |
| Disability Insurance Policy | `INSURANCE` | DIS-POL-123789 |
| Dental Insurance Policy | `INSURANCE` | DENT-456123 |
| Vision Insurance Policy | `INSURANCE` | VIS-789456 |

### DEV_IDENTIFIER (16 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Google Cloud Project ID | `DEV_IDENTIFIER` | my-project-123456 |
| Kafka Bootstrap Server | `DEV_IDENTIFIER` | kafka-broker1.example.com:9092 |
| Container Registry | `DEV_IDENTIFIER` | gcr.io/my-project/my-image:latest |
| Git SSH URL | `DEV_IDENTIFIER` | git@github.com:user/repo.git |
| API Endpoint URL | `DEV_IDENTIFIER` | https://api.example.com/v1/users |
| Kubernetes Secret | `DEV_IDENTIFIER` | apiVersion: v1
kind: Secret
data:
  password: cGFzc3dvcmQ= |
| Build Number | `DEV_IDENTIFIER` | BUILD-2024.1.123 |
| Version Tag | `DEV_IDENTIFIER` | v1.2.3 |
| Commit Hash | `DEV_IDENTIFIER` | a1b2c3d4e5f6789012345678901234567890abcd |
| PR/Issue Number | `DEV_IDENTIFIER` | #1234 |
| Jira Ticket | `DEV_IDENTIFIER` | PROJ-1234 |
| Firebase Config | `DEV_IDENTIFIER` | firebaseConfig = { apiKey: "AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI" } |
| Supabase URL | `DEV_IDENTIFIER` | https://abcdefghijklmnopqrst.supabase.co |
| Auth0 Domain | `DEV_IDENTIFIER` | myapp.auth0.com |
| Netlify Site ID | `DEV_IDENTIFIER` | 12345678-1234-1234-1234-123456789012 |
| Vercel Deployment URL | `DEV_IDENTIFIER` | my-app-git-main-myteam.vercel.app |

### MONITORING_SECRETS (14 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Sentry DSN | `MONITORING_SECRETS` | https://1234567890abcdef@o123456.ingest.sentry.io/1234567 |
| New Relic License Key | `MONITORING_SECRETS` | 1234567890abcdefghijklmnopqrstuvwxyz1234NRAL |
| Datadog API Key | `MONITORING_SECRETS` | 1234567890abcdef1234567890abcdef |
| PagerDuty Integration Key | `MONITORING_SECRETS` | a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6 |
| Grafana API Key | `MONITORING_SECRETS` | glsa_1234567890abcdefghijklmnopqrstuvwxyz_12345678 |
| Prometheus Remote Write | `MONITORING_SECRETS` | https://prometheus-us-central1.grafana.net/api/prom/push |
| Splunk HEC Token | `MONITORING_SECRETS` | 12345678-1234-1234-1234-123456789012 |
| Sumo Logic Collector | `MONITORING_SECRETS` | https://collectors.sumologic.com/receiver/v1/http/1234567890ABCDEF |
| Bugsnag API Key | `MONITORING_SECRETS` | 1234567890abcdef1234567890abcdef |
| Rollbar Access Token | `MONITORING_SECRETS` | 1234567890abcdef1234567890abcdef |
| Airbrake API Key | `MONITORING_SECRETS` | 1234567890abcdef1234567890abcdef |
| LogDNA Ingestion Key | `MONITORING_SECRETS` | 1234567890abcdef1234567890abcdef |
| Loggly Token | `MONITORING_SECRETS` | 12345678-1234-1234-1234-123456789012 |
| Papertrail Token | `MONITORING_SECRETS` | 1234567890abcdef |

### API_KEY (13 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| OpenAI API Key | `API_KEY` | sk-proj-abcdefghijklmnop1234567890 |
| Anthropic API Key | `API_KEY` | sk-ant-api03-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789012345678901234567890 |
| GitHub Token | `API_KEY` | ghp_abcdefghijklmnopqrstuvwxyz1234567890 |
| GitHub Fine-grained Token | `API_KEY` | github_pat_1234567890ABCDEFGHIJ_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12 |
| Stripe Key | `API_KEY` | sk_live_1234567890abcdefghijklmnop |
| JWT Token | `API_KEY` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |
| Generic API Key | `API_KEY` | apikey_1234567890abcdef |
| Password Assignment | `API_KEY` | password = "P@ssw0rd123!" |
| Google API Key | `API_KEY` | AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI |
| Slack Token | `API_KEY` | xoxb-123456789012-123456789012-abcdefghijklmnopqrstuvwx |
| PayPal Client ID | `API_KEY` | AQkquBDf1zctJOWGKWUEtKXm6qVhueUEMvXO_-MCI4DQQ4-LWvkDLIN2fGsd |
| Twilio API Key | `API_KEY` | SK1234567890abcdef1234567890abcdef |
| SendGrid API Key | `API_KEY` | SG.abcdefghijklmnop.qrstuvwxyz1234567890ABCDEFGHIJKLMNOP |

### TAX_IDENTIFIER (11 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| US EIN with Label | `TAX_IDENTIFIER` | EIN: 12-3456789 |
| US EIN Prefixed | `TAX_IDENTIFIER` | EIN 12-3456789 |
| US TIN with Label | `TAX_IDENTIFIER` | TIN: 123-45-6789 |
| US EIN (Employer Identification Number) | `TAX_IDENTIFIER` | 12-3456789 |
| UK VAT Number | `TAX_IDENTIFIER` | GB123456789 |
| EU VAT Number | `TAX_IDENTIFIER` | DE123456789 |
| Canadian Business Number | `TAX_IDENTIFIER` | 123456789RC0001 |
| Australian ABN | `TAX_IDENTIFIER` | 12 345 678 901 |
| German Tax Number | `TAX_IDENTIFIER` | 12/345/67890 |
| French SIRET Number | `TAX_IDENTIFIER` | 12345678901234 |
| French SIREN Number | `TAX_IDENTIFIER` | 123456789 |

### INFRASTRUCTURE_SECRETS (10 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Terraform Cloud Token | `INFRASTRUCTURE_SECRETS` | 1234567890abcdef.atlasv1.1234567890abcdefghijklmnopqrstuvwxyz |
| HashiCorp Vault Token | `INFRASTRUCTURE_SECRETS` | hvs.1234567890abcdefghijklmnop |
| AWS Secrets Manager ARN | `INFRASTRUCTURE_SECRETS` | arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-abcdef |
| Azure Key Vault Secret | `INFRASTRUCTURE_SECRETS` | https://myvault.vault.azure.net/secrets/MySecret |
| GCP Secret Manager | `INFRASTRUCTURE_SECRETS` | projects/123456/secrets/my-secret/versions/latest |
| Kubernetes Config | `INFRASTRUCTURE_SECRETS` | kubeconfig: |
  apiVersion: v1
  clusters: [...] |
| Helm Repository Credentials | `INFRASTRUCTURE_SECRETS` | helm repo add myrepo https://charts.example.com --username user --password pass |
| Ansible Vault Password | `INFRASTRUCTURE_SECRETS` | ansible-vault-password-file: /path/to/vault-pass |
| Consul Token | `INFRASTRUCTURE_SECRETS` | 12345678-1234-1234-1234-123456789012 |
| Rancher Token | `INFRASTRUCTURE_SECRETS` | token-12abc:1234567890abcdefghijklmnopqrstuvwxyz |

### DEV_SECRET (9 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Environment Variable Secret | `DEV_SECRET` | export SECRET_KEY=sk-1234567890abcdef |
| Environment Variable Assignment | `DEV_SECRET` | [REDACTED] |
| Service Account Email | `DEV_SECRET` | service-account@my-project.iam.gserviceaccount.com |
| SonarQube Token | `DEV_SECRET` | sqa_1234567890abcdef1234567890abcdef12345678 |
| LaunchDarkly SDK Key | `DEV_SECRET` | sdk-12345678-1234-1234-1234-123456789012 |
| Segment Write Key | `DEV_SECRET` | 1234567890abcdefghijklmnopqrstuv |
| Mixpanel API Secret | `DEV_SECRET` | 1234567890abcdef1234567890abcdef |
| Algolia API Key | `DEV_SECRET` | 1234567890abcdef1234567890abcdef |
| Elastic Cloud ID | `DEV_SECRET` | my-deployment:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyRjZWM2ZjI2MWE3NGJmMjRjZTMzYmI4ODExYjg0Mjk0ZiRjNmMyY2E2ZDA0MjI0OWFmMGNjN2Q3YTllOTYyNTc0Mw== |

### DATABASE_CREDENTIALS (8 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Database URL | `DATABASE_CREDENTIALS` | postgres://user:pass@host:5432/dbname |
| MongoDB Connection String | `DATABASE_CREDENTIALS` | mongodb://user:pass@host:27017/database |
| Redis Connection String | `DATABASE_CREDENTIALS` | redis://user:password@localhost:6379/0 |
| Elasticsearch URL | `DATABASE_CREDENTIALS` | https://elastic:password@localhost:9200 |
| RabbitMQ Connection String | `DATABASE_CREDENTIALS` | amqp://user:password@localhost:5672/ |
| PostgreSQL Connection String | `DATABASE_CREDENTIALS` | postgresql://user:password@localhost:5432/dbname |
| MySQL Connection String | `DATABASE_CREDENTIALS` | mysql://user:password@localhost:3306/database |
| Cassandra Connection String | `DATABASE_CREDENTIALS` | cassandra://user:pass@host:9042/keyspace |

### VEHICLE (8 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| VIN Number | `VEHICLE` | 1HGBH41JXMN109186 |
| UK Vehicle Registration | `VEHICLE` | [REDACTED] |
| Canadian License Plate | `VEHICLE` | [REDACTED] |
| Australian Rego Plate | `VEHICLE` | [REDACTED] |
| European License Plate | `VEHICLE` | [REDACTED] |
| US License Plate | `VEHICLE` | ABC-1234 |
| Vehicle Registration Number | `VEHICLE` | [REDACTED] |
| Motor Insurance Policy | `VEHICLE` | [REDACTED] |

### CI_CD_SECRETS (7 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Jenkins Token | `CI_CD_SECRETS` | 11a1234567890abcdef1234567890abcdef12 |
| CircleCI Token | `CI_CD_SECRETS` | circle-token-1234567890abcdef |
| Travis CI Token | `CI_CD_SECRETS` | travis-token-1234567890abcdef |
| GitLab Token | `CI_CD_SECRETS` | glpat-abcdefghijklmnopqrst |
| GitLab CI Token | `CI_CD_SECRETS` | ci-token-1234567890abcdef |
| Azure DevOps Token | `CI_CD_SECRETS` | 52-char-token-1234567890abcdefghijklmnopqrstuvwxyz1234 |
| Bitbucket Token | `CI_CD_SECRETS` | ATBB1234567890abcdefghij |

### AUTH_SECRETS (7 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| OAuth Client ID | `AUTH_SECRETS` | 1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com |
| OAuth Client Secret | `AUTH_SECRETS` | GOCSPX-1234567890abcdefghijklmnop |
| OAuth Refresh Token | `AUTH_SECRETS` | 1//0gFU7... |
| OAuth Access Token | `AUTH_SECRETS` | ya29.a0ARrdaM... |
| Okta API Token | `AUTH_SECRETS` | 00Aa1234567890aBcDeFgHiJkLmNoPqRsTuVwXyZ |
| Auth0 API Token | `AUTH_SECRETS` | eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik... |
| Keycloak Client Secret | `AUTH_SECRETS` | 12345678-1234-1234-1234-123456789012 |

### CREDIT_CARD (5 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Credit Card | `CREDIT_CARD` | 4111-1111-1111-1111 |
| Credit Card with Spaces | `CREDIT_CARD` | [REDACTED] |
| Credit Card with Hyphens | `CREDIT_CARD` | [REDACTED] |
| CVV Code | `CREDIT_CARD` | [REDACTED] |
| Credit Card Expiry | `CREDIT_CARD` | [REDACTED] |

### DIGITAL_IDENTITY (5 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Bitcoin Address | `DIGITAL_IDENTITY` | 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa |
| Ethereum Address | `DIGITAL_IDENTITY` | 0x742d35Cc6634C0532925a3b844Bc9e7595f5a123 |
| MAC Address | `DIGITAL_IDENTITY` | 00:1B:44:11:3A:B7 |
| UUID | `DIGITAL_IDENTITY` | 550e8400-e29b-41d4-a716-446655440000 |
| SHA Hash | `DIGITAL_IDENTITY` | 2fd4e1c67a2d28fced849ee1bb76e7391b93eb12 |

### PACKAGE_REGISTRY (5 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| NPM Token | `PACKAGE_REGISTRY` | npm_abcd1234efgh5678ijkl9012mnop3456qrst |
| PyPI Token | `PACKAGE_REGISTRY` | pypi-abcd1234efgh5678ijkl9012mnop3456qrstuvwx7890yzab1234cdef5678 |
| Quay.io Token | `PACKAGE_REGISTRY` | robot$myrobot+deploy:1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ |
| JFrog Artifactory Token | `PACKAGE_REGISTRY` | AKCp1234567890abcdefghijklmnopqrstuvwxyz |
| Nexus Repository Token | `PACKAGE_REGISTRY` | 1234567890abcdef-1234-1234-1234-123456789012 |

### PHONE (4 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| UK Phone Number | `PHONE` | +44 20 7123 4567 |
| Canadian Phone Number | `PHONE` | +1-416-555-0123 |
| International Phone | `PHONE` | +1-555-123-4567 |
| Phone Number | `PHONE` | 555-123-4567 |

### PRIVATE_KEY (4 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| RSA Private Key | `PRIVATE_KEY` | -----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA... |
| EC Private Key | `PRIVATE_KEY` | -----BEGIN EC PRIVATE KEY-----
MHcCAQEEIA... |
| OpenSSH Private Key | `PRIVATE_KEY` | -----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEA... |
| Generic Private Key | `PRIVATE_KEY` | -----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQ... |

### ADDRESS (4 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| US Street Address | `ADDRESS` | 123 Main Street, Anytown, ST 12345 |
| PO Box | `ADDRESS` | PO Box 1234 |
| Apartment Number | `ADDRESS` | Apt 4B |
| International Address | `ADDRESS` | 10 Downing Street, London SW1A 2AA, UK |

### FINANCIAL (4 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| US Bank Account Number | `FINANCIAL` | 123456789012 |
| US Routing Number | `FINANCIAL` | 021000021 |
| IBAN | `FINANCIAL` | GB82 WEST 1234 5698 7654 32 |
| SWIFT Code | `FINANCIAL` | BOFAUS3N |

### GEOGRAPHIC (4 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| US ZIP Code | `GEOGRAPHIC` | 12345 |
| Canadian Postal Code | `GEOGRAPHIC` | K1A 0B1 |
| UK Postcode | `GEOGRAPHIC` | SW1A 1AA |
| GPS Coordinates | `GEOGRAPHIC` | 40.7128,-74.0060 |

### CLOUD_CREDENTIALS (4 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Azure Subscription ID | `CLOUD_CREDENTIALS` | 12345678-1234-1234-1234-123456789012 |
| Heroku API Key | `CLOUD_CREDENTIALS` | 12345678-1234-1234-1234-123456789012 |
| DigitalOcean Token | `CLOUD_CREDENTIALS` | dop_v1_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd |
| Cloudflare API Token | `CLOUD_CREDENTIALS` | 1234567890abcdefghijklmnopqrstuvwxyz1234 |

### AWS_KEY (3 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| AWS Access Key | `AWS_KEY` | AKIAIOSFODNN7EXAMPLE |
| AWS Secret Key | `AWS_KEY` | wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY |
| AWS Session Token | `AWS_KEY` | FQoGZXIvYXdzEBYaDKJH...EXAMPLE |

### GOVERNMENT_ID (3 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| US Driver License | `GOVERNMENT_ID` | D123-4567-8901 |
| US Passport Number | `GOVERNMENT_ID` | M12345678 |
| National ID (Generic) | `GOVERNMENT_ID` | ID-123456789 |

### MEDICAL (3 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Medical Record Number | `MEDICAL` | MRN-123456 |
| Health Insurance ID | `MEDICAL` | HIB123456789 |
| NPI Number | `MEDICAL` | 1234567890 |

### WEBHOOK_URLS (3 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Webhook URL | `WEBHOOK_URLS` | https://example.com/webhook/1234567890abcdef |
| Slack Webhook | `WEBHOOK_URLS` | https://hooks.slack.com/services/T12345678/B123456789/abcdefghijklmnopqrstuvwx |
| Discord Webhook | `WEBHOOK_URLS` | https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890 |

### IP_ADDRESS (2 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| IPv4 Address | `IP_ADDRESS` | 192.168.1.1 |
| IPv6 Address | `IP_ADDRESS` | 2001:0db8:85a3:0000:0000:8a2e:0370:7334 |

### CONTAINER_REGISTRY (2 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Docker Registry Token | `CONTAINER_REGISTRY` | dckr_reg_1234567890abcdef |
| Docker Hub Token | `CONTAINER_REGISTRY` | dckr_pat_abcd1234efgh5678ijkl9012mnop3456qrst |

### EMAIL (1 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Email | `EMAIL` | john@company.io |

### SSN (1 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Social Security Number | `SSN` | 123-45-6789 |

### DATE_OF_BIRTH (1 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Date of Birth | `DATE_OF_BIRTH` | 01/15/1990 |

### PERSON_NAME (1 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Person Name | `PERSON_NAME` | John Doe |

### EMPLOYEE_ID (1 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| Employee ID | `EMPLOYEE_ID` | EMP-123456 |

### ENCRYPTION_KEYS (1 patterns)

| Pattern Name | Category Enum | Example Match |
|--------------|---------------|---------------|
| SSH Key Fingerprint | `ENCRYPTION_KEYS` | SHA256:1234567890abcdefghijklmnopqrstuvwxyz/12345 |

## Usage

### Redact All Categories (Default)
```typescript
import { redactum } from 'redactum';

const safe = redactum("My email is john@company.io");
// "My email is [EMAIL]"
```

### Redact Specific Categories
```typescript
import { redactum, SensitiveDataCategory } from 'redactum';

const safe = redactum(text, {
  policies: [SensitiveDataCategory.EMAIL, SensitiveDataCategory.PHONE]
});
```

### Add Custom Patterns
```typescript
import { redactum, PolicyCategory } from 'redactum';

const result = redactum(text, {
  customPolicies: [{
    name: "Employee ID",
    pattern: /EMP-\d{6}/g,
    category: PolicyCategory.CUSTOM,
    replacement: "[EMPLOYEE_ID]"
  }]
});
```
