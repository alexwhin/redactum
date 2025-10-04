# Policies

Redactum provides **182 battle-tested policies** organized into **32 categories** to protect sensitive data across your entire stack.

From API keys and database credentials to personal information and financial data, each policy is designed to catch real-world patterns while minimizing false positives. Use them individually or combine categories to match your security requirements.

## Developer Identifiers

| Policy | Example Match |
|--------|---------------|
| `GOOGLE_CLOUD_PROJECT_ID` | my-project-123456 |
| `KAFKA_BOOTSTRAP_SERVER` | kafka-broker1.example.com:9092 |
| `CONTAINER_REGISTRY` | gcr.io/my-project/my-image:latest |
| `GIT_SSH_URL` | git@github.com:user/repo.git |
| `API_ENDPOINT_URL` | https://api.example.com/v1/users |
| `KUBERNETES_SECRET` | apiVersion: v1\nkind: Secret\ndata:\n  password: cGFzc3dvcmQ= |
| `BUILD_NUMBER` | BUILD-2024.1.123 |
| `VERSION_TAG` | v1.2.3 |
| `COMMIT_HASH` | a1b2c3d4e5f6789012345678901234567890abcd |
| `PR_ISSUE_NUMBER` | #1234 |
| `JIRA_TICKET` | PROJ-1234 |
| `FIREBASE_CONFIG` | firebaseConfig = { apiKey: "AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI" } |
| `SUPABASE_URL` | https://abcdefghijklmnopqrst.supabase.co |
| `AUTH0_DOMAIN` | myapp.auth0.com |
| `NETLIFY_SITE_ID` | 12345678-1234-1234-1234-123456789012 |
| `VERCEL_DEPLOYMENT_URL` | my-app-git-main-myteam.vercel.app |

## Developer Secrets

| Policy | Example Match |
|--------|---------------|
| `ENVIRONMENT_VARIABLE_SECRET` | export API_KEY=sk-1234567890abcdef |
| `ENVIRONMENT_VARIABLE_SECRET` | export API_KEY=sk-1234567890abcdef |
| `SERVICE_ACCOUNT_EMAIL` | service-account@my-project.iam.gserviceaccount.com |
| `SONARQUBE_TOKEN` | sqa_1234567890abcdef1234567890abcdef12345678 |
| `LAUNCHDARKLY_SDK_KEY` | sdk-12345678-1234-1234-1234-123456789012 |
| `SEGMENT_WRITE_KEY` | 1234567890abcdefghijklmnopqrstuv |
| `MIXPANEL_API_SECRET` | 1234567890abcdef1234567890abcdef |
| `ALGOLIA_API_KEY` | 1234567890abcdef1234567890abcdef |
| `ELASTIC_CLOUD_ID` | my-deployment:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyRjZWM2ZjI2MWE3NGJmMjRjZTMzYmI4ODExYjg0Mjk0ZiRjNmMyY2E2ZDA0MjI0OWFmMGNjN2Q3YTllOTYyNTc0Mw== |

## Database Credentials

| Policy | Example Match |
|--------|---------------|
| `DATABASE_URL` | postgres://user:pass@host:5432/dbname |
| `MONGODB_CONNECTION_STRING` | mongodb://user:pass@host:27017/database |
| `REDIS_CONNECTION_STRING` | redis://user:password@localhost:6379/0 |
| `ELASTICSEARCH_URL` | https://elastic:password@localhost:9200 |
| `RABBITMQ_CONNECTION_STRING` | amqp://user:password@localhost:5672/ |
| `POSTGRESQL_CONNECTION_STRING` | postgresql://user:password@localhost:5432/dbname |
| `MYSQL_CONNECTION_STRING` | mysql://user:password@localhost:3306/database |
| `CASSANDRA_CONNECTION_STRING` | cassandra://user:pass@host:9042/keyspace |

## Cloud Credentials

| Policy | Example Match |
|--------|---------------|
| `AZURE_SUBSCRIPTION_ID` | 12345678-1234-1234-1234-123456789012 |
| `HEROKU_API_KEY` | 12345678-1234-1234-1234-123456789012 |
| `DIGITALOCEAN_TOKEN` | dop_v1_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd |
| `VERCEL_TOKEN` | abcdefghijklmnopqrstuvwxyz1234567890 |
| `RAILWAY_TOKEN` | 12345678-1234-1234-1234-123456789012 |
| `GCP_SERVICE_ACCOUNT_KEY` | my-service-account@my-project.iam.gserviceaccount.com |

## API Keys

| Policy | Example Match |
|--------|---------------|
| `OPENAI_API_KEY` | sk-proj-abcdefghijklmnop1234567890 |
| `ANTHROPIC_API_KEY` | sk-ant-api03-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789012345678901234567890 |
| `GITHUB_TOKEN` | ghp_abcdefghijklmnopqrstuvwxyz1234567890 |
| `GITHUB_FINE_GRAINED_TOKEN` | github_pat_1234567890ABCDEFGHIJ_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12 |
| `STRIPE_KEY` | sk_live_1234567890abcdefghijklmnop |
| `JWT_TOKEN` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |
| `API_KEY_GENERIC` | apikey_1234567890abcdef |
| `PASSWORD_ASSIGNMENT` | password = "P@ssw0rd123!" |
| `GOOGLE_API_KEY` | AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI |
| `SLACK_TOKEN` | xoxb-123456789012-123456789012-abcdefghijklmnopqrstuvwx |
| `PAYPAL_CLIENT_ID` | AQkquBDf1zctJOWGKWUEtKXm6qVhueUEMvXO_-MCI4DQQ4-LWvkDLIN2fGsd |
| `TWILIO_API_KEY` | SK1234567890abcdef1234567890abcdef |
| `SENDGRID_API_KEY` | SG.abcdefghijklmnop.qrstuvwxyz1234567890ABCDEFGHIJKLMNOP |

## AWS Credentials

| Policy | Example Match |
|--------|---------------|
| `AWS_ACCESS_KEY` | AKIAIOSFODNN7EXAMPLE |
| `AWS_SECRET_KEY` | wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY |
| `AWS_SESSION_TOKEN` | FQoGZXIvYXdzEBYaDKJH...EXAMPLE |

## Private Keys

| Policy | Example Match |
|--------|---------------|
| `RSA_PRIVATE_KEY` | -----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA... |
| `EC_PRIVATE_KEY` | -----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIA... |
| `OPENSSH_PRIVATE_KEY` | -----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEA... |
| `GENERIC_PRIVATE_KEY` | -----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQ... |

## CI/CD Secrets

| Policy | Example Match |
|--------|---------------|
| `JENKINS_TOKEN` | 11a1234567890abcdef1234567890abcdef12 |
| `CIRCLECI_TOKEN` | circle-token-1234567890abcdef |
| `TRAVIS_CI_TOKEN` | travis-token-1234567890abcdef |
| `GITLAB_TOKEN` | glpat-abcdefghijklmnopqrst |
| `GITLAB_CI_TOKEN` | ci-token-1234567890abcdef |
| `AZURE_DEVOPS_TOKEN` | 52-char-token-1234567890abcdefghijklmnopqrstuvwxyz1234 |
| `BITBUCKET_TOKEN` | ATBB1234567890abcdefghij |

## Monitoring Secrets

| Policy | Example Match |
|--------|---------------|
| `SENTRY_DSN` | https://1234567890abcdef@o123456.ingest.sentry.io/1234567 |
| `NEW_RELIC_LICENSE_KEY` | 1234567890abcdefghijklmnopqrstuvwxyz1234NRAL |
| `DATADOG_API_KEY` | 1234567890abcdef1234567890abcdef |
| `PAGERDUTY_INTEGRATION_KEY` | a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6 |
| `GRAFANA_API_KEY` | glsa_1234567890abcdefghijklmnopqrstuvwxyz_12345678 |
| `PROMETHEUS_REMOTE_WRITE` | https://prometheus-us-central1.grafana.net/api/prom/push |
| `SPLUNK_HEC_TOKEN` | 12345678-1234-1234-1234-123456789012 |
| `SUMO_LOGIC_COLLECTOR` | https://collectors.sumologic.com/receiver/v1/http/1234567890ABCDEF |
| `BUGSNAG_API_KEY` | 1234567890abcdef1234567890abcdef |
| `ROLLBAR_ACCESS_TOKEN` | 1234567890abcdef1234567890abcdef |
| `AIRBRAKE_API_KEY` | 1234567890abcdef1234567890abcdef |
| `LOGDNA_INGESTION_KEY` | 1234567890abcdef1234567890abcdef |
| `LOGGLY_TOKEN` | 12345678-1234-1234-1234-123456789012 |
| `PAPERTRAIL_TOKEN` | 1234567890abcdef |

## Authentication Secrets

| Policy | Example Match |
|--------|---------------|
| `OAUTH_CLIENT_ID` | 1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com |
| `OAUTH_CLIENT_SECRET` | GOCSPX-1234567890abcdefghijklmnop |
| `OAUTH_REFRESH_TOKEN` | 1//0gFU7... |
| `OAUTH_ACCESS_TOKEN` | ya29.a0ARrdaM... |
| `OKTA_API_TOKEN` | 00Aa1234567890aBcDeFgHiJkLmNoPqRsTuVwXyZ |
| `AUTH0_API_TOKEN` | eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik... |
| `KEYCLOAK_CLIENT_SECRET` | 12345678-1234-1234-1234-123456789012 |

## Webhook URLs

| Policy | Example Match |
|--------|---------------|
| `WEBHOOK_URL` | https://example.com/webhook/1234567890abcdef |
| `SLACK_WEBHOOK` | https://hooks.slack.com/services/T12345678/B123456789/abcdefghijklmnopqrstuvwx |
| `DISCORD_WEBHOOK` | https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890 |

## Package Registries

| Policy | Example Match |
|--------|---------------|
| `NPM_TOKEN` | npm_abcd1234efgh5678ijkl9012mnop3456qrst |
| `PYPI_TOKEN` | pypi-abcd1234efgh5678ijkl9012mnop3456qrstuvwx7890yzab1234cdef5678 |
| `QUAY_IO_TOKEN` | robot$myrobot+deploy:1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ |
| `JFROG_ARTIFACTORY_TOKEN` | AKCp1234567890abcdefghijklmnopqrstuvwxyz |
| `NEXUS_REPOSITORY_TOKEN` | 1234567890abcdef-1234-1234-1234-123456789012 |

## Container Registries

| Policy | Example Match |
|--------|---------------|
| `DOCKER_REGISTRY_TOKEN` | dckr_reg_1234567890abcdef |
| `DOCKER_HUB_TOKEN` | dckr_pat_abcd1234efgh5678ijkl9012mnop3456qrst |

## Infrastructure Secrets

| Policy | Example Match |
|--------|---------------|
| `TERRAFORM_CLOUD_TOKEN` | 1234567890abcdef.atlasv1.1234567890abcdefghijklmnopqrstuvwxyz |
| `HASHICORP_VAULT_TOKEN` | hvs.1234567890abcdefghijklmnop |
| `AWS_SECRETS_MANAGER_ARN` | arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-abcdef |
| `AZURE_KEY_VAULT_SECRET` | https://myvault.vault.azure.net/secrets/MySecret |
| `GCP_SECRET_MANAGER` | projects/123456/secrets/my-secret/versions/latest |
| `KUBERNETES_CONFIG` | kubeconfig: |\n  apiVersion: v1\n  clusters: [...] |
| `HELM_REPOSITORY_CREDENTIALS` | helm repo add myrepo https://charts.example.com --username user --password pass |
| `ANSIBLE_VAULT_PASSWORD` | ansible-vault-password-file: /path/to/vault-pass |
| `CONSUL_TOKEN` | 12345678-1234-1234-1234-123456789012 |
| `RANCHER_TOKEN` | token-12abc:1234567890abcdefghijklmnopqrstuvwxyz |

## Encryption Keys

| Policy | Example Match |
|--------|---------------|
| `SSH_KEY_FINGERPRINT` | SHA256:1234567890abcdefghijklmnopqrstuvwxyz/12345 |

## Insurance

| Policy | Example Match |
|--------|---------------|
| `AUTO_INSURANCE_POLICY` | POL-AUTO-123456 |
| `HOME_INSURANCE_POLICY` | HOME-2024-789012 |
| `LIFE_INSURANCE_POLICY` | LIFE-POL-456789 |
| `TRAVEL_INSURANCE_POLICY` | TRV-2024-123456 |
| `WORKERS_COMPENSATION_CLAIM` | WC-2024-789456 |
| `DISABILITY_INSURANCE_POLICY` | DIS-POL-123789 |
| `DENTAL_INSURANCE_POLICY` | DENT-456123 |
| `VISION_INSURANCE_POLICY` | VIS-789456 |
| `US_HEALTH_INSURANCE_POLICY` | H123456789 |
| `US_INSURANCE_GROUP_NUMBER` | GRP123456 |
| `US_INSURANCE_CLAIM_NUMBER` | CLM-2024-123456 |
| `MEDICARE_NUMBER_US` | 1EG4-TE5-MK72 |
| `MEDICAID_NUMBER_US` | 123456789A |
| `BCBS_MEMBER_ID` | XYZ123456789 |
| `AETNA_MEMBER_ID` | W123456789 |
| `UNITEDHEALTH_MEMBER_ID` | 901234567 |
| `UK_NHS_NUMBER` | 123 456 7890 |
| `CANADIAN_HEALTH_CARD` | 1234-567-890 |
| `AUSTRALIAN_MEDICARE_NUMBER` | 1234 56789 0 |
| `GERMAN_HEALTH_INSURANCE_NUMBER` | A123456789 |
| `FRENCH_SOCIAL_SECURITY_NUMBER` | 1 84 12 76 451 089 46 |
| `EUROPEAN_HEALTH_INSURANCE_CARD` | 80123456789012345678 |
| `WORKERS_COMPENSATION_CLAIM` | WC-2024-789456 |
| `DISABILITY_INSURANCE_POLICY` | DIS-POL-123789 |
| `DENTAL_INSURANCE_POLICY` | DENT-456123 |
| `VISION_INSURANCE_POLICY` | VIS-789456 |

## Medical

| Policy | Example Match |
|--------|---------------|
| `MEDICAL_RECORD_NUMBER` | MRN-123456 |
| `HEALTH_INSURANCE_ID` | HIB123456789 |
| `NPI_NUMBER` | 1234567890 |

## Financial

| Policy | Example Match |
|--------|---------------|
| `BANK_ACCOUNT_US` | 123456789012 |
| `ROUTING_NUMBER_US` | 021000021 |
| `IBAN` | GB82 WEST 1234 5698 7654 32 |
| `SWIFT_CODE` | BOFAUS3N |

## Tax Identifiers

| Policy | Example Match |
|--------|---------------|
| `US_EIN_WITH_LABEL` | EIN: 12-3456789 |
| `US_EIN_PREFIXED` | EIN 12-3456789 |
| `US_TIN_WITH_LABEL` | TIN: 123-45-6789 |
| `US_EIN` | 12-3456789 |
| `UK_VAT_NUMBER` | GB123456789 |
| `EU_VAT_NUMBER` | DE123456789 |
| `CANADIAN_BUSINESS_NUMBER` | 123456789RC0001 |
| `AUSTRALIAN_ABN` | 12 345 678 901 |
| `GERMAN_TAX_NUMBER` | 12/345/67890 |
| `FRENCH_SIRET_NUMBER` | 12345678901234 |
| `FRENCH_SIREN_NUMBER` | 123456789 |

## Government IDs

| Policy | Example Match |
|--------|---------------|
| `US_DRIVER_LICENSE` | D123-4567-8901 |
| `US_PASSPORT_NUMBER` | M12345678 |
| `NATIONAL_ID` | ID-123456789 |

## Social Security Numbers

| Policy | Example Match |
|--------|---------------|
| `SSN` | 123-45-6789 |

## Credit Cards

| Policy | Example Match |
|--------|---------------|
| `CREDIT_CARD` | 4111-1111-1111-1111 |

## Email

| Policy | Example Match |
|--------|---------------|
| `EMAIL_ADDRESS` | john@example.com |

## Phone Numbers

| Policy | Example Match |
|--------|---------------|
| `PHONE_NUMBER_UK` | +44 20 7123 4567 |
| `PHONE_NUMBER_CANADIAN` | +1-416-555-0123 |
| `PHONE_NUMBER_INTERNATIONAL` | +44 20 7123 4567 |
| `PHONE_NUMBER_US` | 555-123-4567 |

## Person Names

| Policy | Example Match |
|--------|---------------|
| `PERSON_NAME` | John Doe |

## Dates of Birth

| Policy | Example Match |
|--------|---------------|
| `DATE_OF_BIRTH` | 01/15/1990 |

## Addresses

| Policy | Example Match |
|--------|---------------|
| `US_STREET_ADDRESS` | 123 Main Street, Anytown, ST 12345 |
| `PO_BOX` | PO Box 1234 |
| `APARTMENT_NUMBER` | Apt 4B |
| `INTERNATIONAL_ADDRESS` | 10 Downing Street, London SW1A 2AA, UK |

## Geographic

| Policy | Example Match |
|--------|---------------|
| `US_ZIP_CODE` | 12345 |
| `CANADIAN_POSTAL_CODE` | K1A 0B1 |
| `UK_POSTCODE` | SW1A 1AA |
| `GPS_COORDINATES` | 40.7128,-74.0060 |

## Employee IDs

| Policy | Example Match |
|--------|---------------|
| `EMPLOYEE_ID` | EMP-123456 |

## Vehicles

| Policy | Example Match |
|--------|---------------|
| `VIN` | 1HGBH41JXMN109186 |
| `US_LICENSE_PLATE` | ABC-1234 |

## IP Addresses

| Policy | Example Match |
|--------|---------------|
| `IPV4_ADDRESS` | 192.168.1.1 |
| `IPV6_ADDRESS` | 2001:0db8:85a3:0000:0000:8a2e:0370:7334 |

## Digital Identity

| Policy | Example Match |
|--------|---------------|
| `BITCOIN_ADDRESS` | 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa |
| `ETHEREUM_ADDRESS` | 0x742d35Cc6634C0532925a3b844Bc9e7595f5a123 |
| `MAC_ADDRESS` | 00:1B:44:11:3A:B7 |
| `UUID` | 550e8400-e29b-41d4-a716-446655440000 |
| `SHA_HASH` | 2fd4e1c67a2d28fced849ee1bb76e7391b93eb12 |

