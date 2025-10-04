#!/bin/bash

# This script replaces all pattern names in constants.ts with their PolicyName equivalents

FILE="/Users/alex/Work/personal/redact/src/constants.ts"

# Credit card variants that need to be removed (not in PolicyName)
sed -i '' '/Credit Card with Spaces/,/},/d' "$FILE"
sed -i '' '/Credit Card with Hyphens/,/},/d' "$FILE"
sed -i '' '/CVV Code/,/},/d' "$FILE"
sed -i '' '/Credit Card Expiry/,/},/d' "$FILE"

# IP addresses
sed -i '' 's/name: "IPv4 Address"/name: "IPV4_ADDRESS"/g' "$FILE"
sed -i '' 's/name: "IPv6 Address"/name: "IPV6_ADDRESS"/g' "$FILE"

# API Keys
sed -i '' 's/name: "OpenAI API Key"/name: "OPENAI_API_KEY"/g' "$FILE"
sed -i '' 's/name: "Anthropic API Key"/name: "ANTHROPIC_API_KEY"/g' "$FILE"
sed -i '' 's/name: "GitHub Token"/name: "GITHUB_TOKEN"/g' "$FILE"
sed -i '' 's/name: "GitHub Fine-grained Token"/name: "GITHUB_FINE_GRAINED_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Stripe Key"/name: "STRIPE_KEY"/g' "$FILE"
sed -i '' 's/name: "JWT Token"/name: "JWT_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Generic API Key"/name: "API_KEY_GENERIC"/g' "$FILE"
sed -i '' 's/name: "Google API Key"/name: "GOOGLE_API_KEY"/g' "$FILE"
sed -i '' 's/name: "Slack Token"/name: "SLACK_TOKEN"/g' "$FILE"
sed -i '' 's/name: "PayPal Client ID"/name: "PAYPAL_CLIENT_ID"/g' "$FILE"
sed -i '' 's/name: "Twilio API Key"/name: "TWILIO_API_KEY"/g' "$FILE"
sed -i '' 's/name: "SendGrid API Key"/name: "SENDGRID_API_KEY"/g' "$FILE"

# AWS Keys
sed -i '' 's/name: "AWS Access Key"/name: "AWS_ACCESS_KEY"/g' "$FILE"
sed -i '' 's/name: "AWS Secret Key"/name: "AWS_SECRET_KEY"/g' "$FILE"
sed -i '' 's/name: "AWS Session Token"/name: "AWS_SESSION_TOKEN"/g' "$FILE"

# Private Keys
sed -i '' 's/name: "RSA Private Key"/name: "RSA_PRIVATE_KEY"/g' "$FILE"
sed -i '' 's/name: "EC Private Key"/name: "EC_PRIVATE_KEY"/g' "$FILE"
sed -i '' 's/name: "OpenSSH Private Key"/name: "OPENSSH_PRIVATE_KEY"/g' "$FILE"
sed -i '' 's/name: "Generic Private Key"/name: "GENERIC_PRIVATE_KEY"/g' "$FILE"
sed -i '' 's/name: "SSH Private Key"/name: "SSH_PRIVATE_KEY"/g' "$FILE"

# Database
sed -i '' 's/name: "Database URL"/name: "DATABASE_URL"/g' "$FILE"
sed -i '' 's/name: "MongoDB Connection String"/name: "MONGODB_CONNECTION_STRING"/g' "$FILE"
sed -i '' 's/name: "PostgreSQL Connection String"/name: "POSTGRESQL_CONNECTION_STRING"/g' "$FILE"
sed -i '' 's/name: "MySQL Connection String"/name: "MYSQL_CONNECTION_STRING"/g' "$FILE"
sed -i '' 's/name: "Redis Connection String"/name: "REDIS_CONNECTION_STRING"/g' "$FILE"
sed -i '' 's/name: "Elasticsearch URL"/name: "ELASTICSEARCH_URL"/g' "$FILE"
sed -i '' 's/name: "RabbitMQ Connection String"/name: "RABBITMQ_CONNECTION_STRING"/g' "$FILE"
sed -i '' 's/name: "Cassandra Connection String"/name: "CASSANDRA_CONNECTION_STRING"/g' "$FILE"

# Passwords and secrets
sed -i '' 's/name: "Password Assignment"/name: "PASSWORD_ASSIGNMENT"/g' "$FILE"
sed -i '' 's/name: "Environment Variable Secret"/name: "ENVIRONMENT_VARIABLE_SECRET"/g' "$FILE"
sed -i '' 's/name: "Generic Secret"/name: "GENERIC_SECRET"/g' "$FILE"
sed -i '' 's/name: "Generic Token"/name: "GENERIC_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Generic Password"/name: "GENERIC_PASSWORD"/g' "$FILE"
sed -i '' 's/name: "Generic Credential"/name: "GENERIC_CREDENTIAL"/g' "$FILE"

# Personal Information
sed -i '' 's/name: "Date of Birth"/name: "DATE_OF_BIRTH"/g' "$FILE"
sed -i '' 's/name: "Person Name"/name: "PERSON_NAME"/g' "$FILE"

# Addresses
sed -i '' 's/name: "US Street Address"/name: "US_STREET_ADDRESS"/g' "$FILE"
sed -i '' 's/name: "PO Box"/name: "PO_BOX"/g' "$FILE"
sed -i '' 's/name: "Apartment Number"/name: "APARTMENT_NUMBER"/g' "$FILE"
sed -i '' 's/name: "International Address"/name: "INTERNATIONAL_ADDRESS"/g' "$FILE"

# Government IDs
sed -i '' 's/name: "US Driver License"/name: "US_DRIVER_LICENSE"/g' "$FILE"
sed -i '' 's/name: "US Passport Number"/name: "US_PASSPORT_NUMBER"/g' "$FILE"
sed -i '' 's/name: "National ID (Generic)"/name: "NATIONAL_ID"/g' "$FILE"
sed -i '' 's/name: "Driver License"/name: "DRIVER_LICENSE"/g' "$FILE"
sed -i '' 's/name: "Passport Number"/name: "PASSPORT_NUMBER"/g' "$FILE"

# Tax IDs
sed -i '' 's/name: "US EIN with Label"/name: "US_EIN_WITH_LABEL"/g' "$FILE"
sed -i '' 's/name: "US EIN Prefixed"/name: "US_EIN_PREFIXED"/g' "$FILE"
sed -i '' 's/name: "US TIN with Label"/name: "US_TIN_WITH_LABEL"/g' "$FILE"
sed -i '' 's/name: "US EIN (Employer Identification Number)"/name: "US_EIN"/g' "$FILE"
sed -i '' 's/name: "UK VAT Number"/name: "UK_VAT_NUMBER"/g' "$FILE"
sed -i '' 's/name: "EU VAT Number"/name: "EU_VAT_NUMBER"/g' "$FILE"
sed -i '' 's/name: "Canadian Business Number"/name: "CANADIAN_BUSINESS_NUMBER"/g' "$FILE"
sed -i '' 's/name: "Australian ABN"/name: "AUSTRALIAN_ABN"/g' "$FILE"
sed -i '' 's/name: "German Tax Number"/name: "GERMAN_TAX_NUMBER"/g' "$FILE"
sed -i '' 's/name: "French SIRET Number"/name: "FRENCH_SIRET_NUMBER"/g' "$FILE"
sed -i '' 's/name: "French SIREN Number"/name: "FRENCH_SIREN_NUMBER"/g' "$FILE"

# Insurance
sed -i '' 's/name: "Auto Insurance Policy Number"/name: "AUTO_INSURANCE_POLICY"/g' "$FILE"
sed -i '' 's/name: "Home Insurance Policy Number"/name: "HOME_INSURANCE_POLICY"/g' "$FILE"
sed -i '' 's/name: "Life Insurance Policy Number"/name: "LIFE_INSURANCE_POLICY"/g' "$FILE"
sed -i '' 's/name: "Travel Insurance Policy"/name: "TRAVEL_INSURANCE_POLICY"/g' "$FILE"
sed -i '' 's/name: "Disability Insurance Policy"/name: "DISABILITY_INSURANCE_POLICY"/g' "$FILE"
sed -i '' 's/name: "Dental Insurance Policy"/name: "DENTAL_INSURANCE_POLICY"/g' "$FILE"
sed -i '' 's/name: "Vision Insurance Policy"/name: "VISION_INSURANCE_POLICY"/g' "$FILE"
sed -i '' 's/name: "US Health Insurance Policy Number"/name: "US_HEALTH_INSURANCE_POLICY"/g' "$FILE"
sed -i '' 's/name: "US Insurance Group Number"/name: "US_INSURANCE_GROUP_NUMBER"/g' "$FILE"
sed -i '' 's/name: "US Insurance Claim Number"/name: "US_INSURANCE_CLAIM_NUMBER"/g' "$FILE"
sed -i '' 's/name: "Medicare Number (US)"/name: "MEDICARE_NUMBER_US"/g' "$FILE"
sed -i '' 's/name: "Medicaid Number (US)"/name: "MEDICAID_NUMBER_US"/g' "$FILE"
sed -i '' 's/name: "BCBS Member ID"/name: "BCBS_MEMBER_ID"/g' "$FILE"
sed -i '' 's/name: "Aetna Member ID"/name: "AETNA_MEMBER_ID"/g' "$FILE"
sed -i '' 's/name: "UnitedHealth Member ID"/name: "UNITEDHEALTH_MEMBER_ID"/g' "$FILE"
sed -i '' 's/name: "UK NHS Number"/name: "UK_NHS_NUMBER"/g' "$FILE"
sed -i '' 's/name: "Canadian Health Card"/name: "CANADIAN_HEALTH_CARD"/g' "$FILE"
sed -i '' 's/name: "Australian Medicare Number"/name: "AUSTRALIAN_MEDICARE_NUMBER"/g' "$FILE"
sed -i '' 's/name: "German Health Insurance Number"/name: "GERMAN_HEALTH_INSURANCE_NUMBER"/g' "$FILE"
sed -i '' 's/name: "French Social Security Number"/name: "FRENCH_SOCIAL_SECURITY_NUMBER"/g' "$FILE"
sed -i '' 's/name: "European Health Insurance Card"/name: "EUROPEAN_HEALTH_INSURANCE_CARD"/g' "$FILE"

# Remove duplicate Workers Compensation Claim entries
sed -i '' '0,/name: "Workers Compensation Claim"/{s/name: "Workers Compensation Claim"/name: "WORKERS_COMPENSATION_CLAIM"/}' "$FILE"

# Financial
sed -i '' 's/name: "US Bank Account Number"/name: "BANK_ACCOUNT_US"/g' "$FILE"
sed -i '' 's/name: "US Routing Number"/name: "ROUTING_NUMBER_US"/g' "$FILE"
sed -i '' 's/name: "IBAN"/name: "IBAN"/g' "$FILE"
sed -i '' 's/name: "SWIFT Code"/name: "SWIFT_CODE"/g' "$FILE"

# Medical
sed -i '' 's/name: "Medical Record Number"/name: "MEDICAL_RECORD_NUMBER"/g' "$FILE"
sed -i '' 's/name: "Health Insurance ID"/name: "HEALTH_INSURANCE_ID"/g' "$FILE"
sed -i '' 's/name: "NPI Number"/name: "NPI_NUMBER"/g' "$FILE"

# Digital Identity
sed -i '' 's/name: "Bitcoin Address"/name: "BITCOIN_ADDRESS"/g' "$FILE"
sed -i '' 's/name: "Ethereum Address"/name: "ETHEREUM_ADDRESS"/g' "$FILE"
sed -i '' 's/name: "MAC Address"/name: "MAC_ADDRESS"/g' "$FILE"
sed -i '' 's/name: "UUID"/name: "UUID"/g' "$FILE"
sed -i '' 's/name: "SHA Hash"/name: "SHA_HASH"/g' "$FILE"

# Geographic
sed -i '' 's/name: "US ZIP Code"/name: "US_ZIP_CODE"/g' "$FILE"
sed -i '' 's/name: "Canadian Postal Code"/name: "CANADIAN_POSTAL_CODE"/g' "$FILE"
sed -i '' 's/name: "UK Postcode"/name: "UK_POSTCODE"/g' "$FILE"
sed -i '' 's/name: "GPS Coordinates"/name: "GPS_COORDINATES"/g' "$FILE"

# Employee
sed -i '' 's/name: "Employee ID"/name: "EMPLOYEE_ID"/g' "$FILE"

# Vehicle
sed -i '' 's/name: "VIN Number"/name: "VIN"/g' "$FILE"
sed -i '' 's/name: "US License Plate"/name: "US_LICENSE_PLATE"/g' "$FILE"

# Container Registry
sed -i '' 's/name: "Docker Registry Token"/name: "DOCKER_REGISTRY_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Docker Hub Token"/name: "DOCKER_HUB_TOKEN"/g' "$FILE"

# Package Registry
sed -i '' 's/name: "NPM Token"/name: "NPM_TOKEN"/g' "$FILE"
sed -i '' 's/name: "PyPI Token"/name: "PYPI_TOKEN"/g' "$FILE"

# Cloud Credentials
sed -i '' 's/name: "Azure Subscription ID"/name: "AZURE_SUBSCRIPTION_ID"/g' "$FILE"
sed -i '' 's/name: "Heroku API Key"/name: "HEROKU_API_KEY"/g' "$FILE"
sed -i '' 's/name: "DigitalOcean Token"/name: "DIGITALOCEAN_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Cloudflare API Token"/name: "CLOUDFLARE_API_TOKEN"/g' "$FILE"

# Dev Identifiers
sed -i '' 's/name: "Google Cloud Project ID"/name: "GOOGLE_CLOUD_PROJECT_ID"/g' "$FILE"
sed -i '' 's/name: "Kafka Bootstrap Server"/name: "KAFKA_BOOTSTRAP_SERVER"/g' "$FILE"
sed -i '' 's/name: "Container Registry"/name: "CONTAINER_REGISTRY"/g' "$FILE"
sed -i '' 's/name: "Git SSH URL"/name: "GIT_SSH_URL"/g' "$FILE"
sed -i '' 's/name: "API Endpoint URL"/name: "API_ENDPOINT_URL"/g' "$FILE"
sed -i '' 's/name: "Build Number"/name: "BUILD_NUMBER"/g' "$FILE"
sed -i '' 's/name: "Version Tag"/name: "VERSION_TAG"/g' "$FILE"
sed -i '' 's/name: "Commit Hash"/name: "COMMIT_HASH"/g' "$FILE"
sed -i '' 's/name: "PR\/Issue Number"/name: "PR_ISSUE_NUMBER"/g' "$FILE"
sed -i '' 's/name: "Jira Ticket"/name: "JIRA_TICKET"/g' "$FILE"
sed -i '' 's/name: "Firebase Config"/name: "FIREBASE_CONFIG"/g' "$FILE"
sed -i '' 's/name: "Supabase URL"/name: "SUPABASE_URL"/g' "$FILE"
sed -i '' 's/name: "Auth0 Domain"/name: "AUTH0_DOMAIN"/g' "$FILE"
sed -i '' 's/name: "Netlify Site ID"/name: "NETLIFY_SITE_ID"/g' "$FILE"
sed -i '' 's/name: "Vercel Deployment URL"/name: "VERCEL_DEPLOYMENT_URL"/g' "$FILE"

# Webhook URLs
sed -i '' 's/name: "Webhook URL"/name: "WEBHOOK_URL"/g' "$FILE"
sed -i '' 's/name: "Slack Webhook"/name: "SLACK_WEBHOOK"/g' "$FILE"
sed -i '' 's/name: "Discord Webhook"/name: "DISCORD_WEBHOOK"/g' "$FILE"

# Dev Secrets
sed -i '' 's/name: "Environment Variable Assignment"/name: "ENVIRONMENT_VARIABLE_SECRET"/g' "$FILE"
sed -i '' 's/name: "Kubernetes Secret"/name: "KUBERNETES_SECRET"/g' "$FILE"
sed -i '' 's/name: "Service Account Email"/name: "SERVICE_ACCOUNT_EMAIL"/g' "$FILE"
sed -i '' 's/name: "SonarQube Token"/name: "SONARQUBE_TOKEN"/g' "$FILE"
sed -i '' 's/name: "LaunchDarkly SDK Key"/name: "LAUNCHDARKLY_SDK_KEY"/g' "$FILE"
sed -i '' 's/name: "Segment Write Key"/name: "SEGMENT_WRITE_KEY"/g' "$FILE"
sed -i '' 's/name: "Mixpanel API Secret"/name: "MIXPANEL_API_SECRET"/g' "$FILE"
sed -i '' 's/name: "Algolia API Key"/name: "ALGOLIA_API_KEY"/g' "$FILE"
sed -i '' 's/name: "Elastic Cloud ID"/name: "ELASTIC_CLOUD_ID"/g' "$FILE"

# Encryption Keys
sed -i '' 's/name: "SSH Key Fingerprint"/name: "SSH_KEY_FINGERPRINT"/g' "$FILE"

# CI/CD Secrets
sed -i '' 's/name: "Jenkins Token"/name: "JENKINS_TOKEN"/g' "$FILE"
sed -i '' 's/name: "CircleCI Token"/name: "CIRCLECI_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Travis CI Token"/name: "TRAVIS_CI_TOKEN"/g' "$FILE"
sed -i '' 's/name: "GitLab Token"/name: "GITLAB_TOKEN"/g' "$FILE"
sed -i '' 's/name: "GitLab CI Token"/name: "GITLAB_CI_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Azure DevOps Token"/name: "AZURE_DEVOPS_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Bitbucket Token"/name: "BITBUCKET_TOKEN"/g' "$FILE"

# Infrastructure Secrets
sed -i '' 's/name: "Terraform Cloud Token"/name: "TERRAFORM_CLOUD_TOKEN"/g' "$FILE"
sed -i '' 's/name: "HashiCorp Vault Token"/name: "HASHICORP_VAULT_TOKEN"/g' "$FILE"
sed -i '' 's/name: "AWS Secrets Manager ARN"/name: "AWS_SECRETS_MANAGER_ARN"/g' "$FILE"
sed -i '' 's/name: "Azure Key Vault Secret"/name: "AZURE_KEY_VAULT_SECRET"/g' "$FILE"
sed -i '' 's/name: "GCP Secret Manager"/name: "GCP_SECRET_MANAGER"/g' "$FILE"
sed -i '' 's/name: "Kubernetes Config"/name: "KUBERNETES_CONFIG"/g' "$FILE"
sed -i '' 's/name: "Helm Repository Credentials"/name: "HELM_REPOSITORY_CREDENTIALS"/g' "$FILE"
sed -i '' 's/name: "Ansible Vault Password"/name: "ANSIBLE_VAULT_PASSWORD"/g' "$FILE"
sed -i '' 's/name: "Consul Token"/name: "CONSUL_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Rancher Token"/name: "RANCHER_TOKEN"/g' "$FILE"

# Auth Secrets
sed -i '' 's/name: "OAuth Client ID"/name: "OAUTH_CLIENT_ID"/g' "$FILE"
sed -i '' 's/name: "OAuth Client Secret"/name: "OAUTH_CLIENT_SECRET"/g' "$FILE"
sed -i '' 's/name: "OAuth Refresh Token"/name: "OAUTH_REFRESH_TOKEN"/g' "$FILE"
sed -i '' 's/name: "OAuth Access Token"/name: "OAUTH_ACCESS_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Okta API Token"/name: "OKTA_API_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Auth0 API Token"/name: "AUTH0_API_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Keycloak Client Secret"/name: "KEYCLOAK_CLIENT_SECRET"/g' "$FILE"

# Package Registry
sed -i '' 's/name: "Quay.io Token"/name: "QUAY_IO_TOKEN"/g' "$FILE"
sed -i '' 's/name: "JFrog Artifactory Token"/name: "JFROG_ARTIFACTORY_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Nexus Repository Token"/name: "NEXUS_REPOSITORY_TOKEN"/g' "$FILE"

# Monitoring Secrets
sed -i '' 's/name: "Sentry DSN"/name: "SENTRY_DSN"/g' "$FILE"
sed -i '' 's/name: "New Relic License Key"/name: "NEW_RELIC_LICENSE_KEY"/g' "$FILE"
sed -i '' 's/name: "Datadog API Key"/name: "DATADOG_API_KEY"/g' "$FILE"
sed -i '' 's/name: "PagerDuty Integration Key"/name: "PAGERDUTY_INTEGRATION_KEY"/g' "$FILE"
sed -i '' 's/name: "Grafana API Key"/name: "GRAFANA_API_KEY"/g' "$FILE"
sed -i '' 's/name: "Prometheus Remote Write"/name: "PROMETHEUS_REMOTE_WRITE"/g' "$FILE"
sed -i '' 's/name: "Splunk HEC Token"/name: "SPLUNK_HEC_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Sumo Logic Collector"/name: "SUMO_LOGIC_COLLECTOR"/g' "$FILE"
sed -i '' 's/name: "Bugsnag API Key"/name: "BUGSNAG_API_KEY"/g' "$FILE"
sed -i '' 's/name: "Rollbar Access Token"/name: "ROLLBAR_ACCESS_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Airbrake API Key"/name: "AIRBRAKE_API_KEY"/g' "$FILE"
sed -i '' 's/name: "LogDNA Ingestion Key"/name: "LOGDNA_INGESTION_KEY"/g' "$FILE"
sed -i '' 's/name: "Loggly Token"/name: "LOGGLY_TOKEN"/g' "$FILE"
sed -i '' 's/name: "Papertrail Token"/name: "PAPERTRAIL_TOKEN"/g' "$FILE"

echo "✅ Pattern names have been refactored"
