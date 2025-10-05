---
prev: false
next: false
search: false
---

# Developer Identifiers Test Cases

[← Back to Test Cases](/api/test-cases)

This page shows 39 test cases that validate Developer Identifiers patterns.

| Policy | Test Case |
|--------|-----------|
| `GOOGLE_CLOUD_PROJECT_ID` | `gcp-project-id: my-project-123456` |
| `GOOGLE_CLOUD_PROJECT_ID` | `gcp_project_id: test-project` |
| `GOOGLE_CLOUD_PROJECT_ID` | `GCP_PROJECT_ID=production-app-2024` |
| `GOOGLE_CLOUD_PROJECT_ID` | `gcloud config set project my-prod-app-123456` |
| `GOOGLE_CLOUD_PROJECT_ID` | `--project=analytics-platform-42` |
| `GOOGLE_CLOUD_PROJECT_ID` | `--project staging-env-2024` |
| `GOOGLE_CLOUD_PROJECT_ID` | `export PROJECT_ID=my-staging-env-2024` |
| `GOOGLE_CLOUD_PROJECT_ID` | `PROJECT=data-pipeline-prod` |
| `GOOGLE_CLOUD_PROJECT_ID` | `projects/my-project-123/locations/us-central1` |
| `KAFKA_BOOTSTRAP_SERVER` | `kafka-broker1.example.com:9092` |
| `KAFKA_BOOTSTRAP_SERVER` | `localhost:9092` |
| `CONTAINER_REGISTRY` | `us.gcr.io/my-project/my-image:latest` |
| `CONTAINER_REGISTRY` | `myregistry.azurecr.io/app/web:v1.0` |
| `GIT_SSH_URL` | `git@github.com:user/repo.git` |
| `GIT_SSH_URL` | `git@gitlab.com:org/project.git` |
| `API_ENDPOINT_URL` | `https://api.example.com/v1/users` |
| `API_ENDPOINT_URL` | `http://api.test.com/v2/data` |
| `KUBERNETES_SECRET` | `kubernetes-secret: my-secret.default` |
| `KUBERNETES_SECRET` | `kubernetes_secret: app-config.production` |
| `BUILD_NUMBER` | `BUILD-2024.1.123` |
| `BUILD_NUMBER` | `build: 20241234` |
| `BUILD_NUMBER` | `build#1234567` |
| `VERSION_TAG` | `v1.2.3` |
| `VERSION_TAG` | `version: v2.0.0-beta` |
| `VERSION_TAG` | `v1.0.0+build.123` |
| `COMMIT_HASH` | `commit: a1b2c3d4e5f6789012345678901234567890abcd` |
| `COMMIT_HASH` | `sha: 1234567` |
| `COMMIT_HASH` | `commit: abcd1234` |
| `PR_ISSUE_NUMBER` | `PR #1234` |
| `PR_ISSUE_NUMBER` | `MR: 5678` |
| `PR_ISSUE_NUMBER` | `Issue#9012` |
| `JIRA_TICKET` | `PROJ-1234` |
| `JIRA_TICKET` | `TASK-567` |
| `JIRA_TICKET` | `BUG-890` |
| `FIREBASE_CONFIG` | `my-app-default-rtdb.us-central1.firebaseio.com` |
| `SUPABASE_URL` | `https://abcdefghijklmnopqrst.supabase.co` |
| `NETLIFY_SITE_ID` | `12345678-1234-1234-1234-123456789012` |
| `VERCEL_DEPLOYMENT_URL` | `https://my-app-git-main-myteam.vercel.app` |
| `VERCEL_DEPLOYMENT_URL` | `https://app.vercel.app` |
