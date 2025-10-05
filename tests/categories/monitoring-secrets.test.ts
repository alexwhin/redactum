import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("monitoring secrets patterns", () => {
  testCategoryCoverage(PolicyCategory.MONITORING_SECRETS, [
    "SENTRY_DSN",
    "NEW_RELIC_LICENSE_KEY",
    "DATADOG_API_KEY",
    "PAGERDUTY_INTEGRATION_KEY",
    "GRAFANA_API_KEY",
    "PROMETHEUS_REMOTE_WRITE",
    "SPLUNK_HEC_TOKEN",
    "SUMO_LOGIC_COLLECTOR",
    "BUGSNAG_API_KEY",
    "ROLLBAR_ACCESS_TOKEN",
    "AIRBRAKE_API_KEY",
    "LOGDNA_INGESTION_KEY",
    "LOGGLY_TOKEN",
    "PAPERTRAIL_TOKEN",
  ]);

  describe("SENTRY_DSN", () => {
    testPolicySuite({
      policyName: "SENTRY_DSN",
      replacement: "[SENTRY_DSN]",
      shouldMatch: [
        "https://1234567890abcdef1234567890abcdef@1a2b3c.ingest.sentry.io/1234567", // Sentry DSN with project ID
      ],
      shouldNotMatch: [
        "https://sentry.io/project", // No DSN key or ingest domain
        "regular text", // No Sentry DSN pattern
      ],
    });
  });

  describe("NEW_RELIC_LICENSE_KEY", () => {
    testPolicySuite({
      policyName: "NEW_RELIC_LICENSE_KEY",
      replacement: "[NEW_RELIC_KEY]",
      shouldMatch: [
        "newrelic-key: 1234567890abcdef1234567890abcdef12345678", // New Relic license key
        "newrelic_license_key: 1234567890abcdef1234567890abcdef12345678", // New Relic full label
      ],
      shouldNotMatch: [
        "newrelic-key: short", // Too short to be valid
        "invalid", // No New Relic key pattern
      ],
    });
  });

  describe("DATADOG_API_KEY", () => {
    testPolicySuite({
      policyName: "DATADOG_API_KEY",
      replacement: "[DATADOG_API_KEY]",
      shouldMatch: [
        "datadog-key: 1234567890abcdef1234567890abcdef", // Datadog API key
        "datadog_api_key: abcdef1234567890abcdef1234567890", // Datadog full label
      ],
      shouldNotMatch: [
        "datadog-key: short", // Too short to be valid
        "invalid", // No Datadog key pattern
      ],
    });
  });

  describe("PAGERDUTY_INTEGRATION_KEY", () => {
    testPolicySuite({
      policyName: "PAGERDUTY_INTEGRATION_KEY",
      replacement: "[PAGERDUTY_KEY]",
      shouldMatch: [
        "pagerduty-key: 1234567890abcdef1234567890abcdef", // PagerDuty integration key
        "pagerduty_integration_key: abcdef1234567890abcdef1234567890", // PagerDuty full label
      ],
      shouldNotMatch: [
        "pagerduty-key: short", // Too short to be valid
        "invalid", // No PagerDuty key pattern
      ],
    });
  });

  describe("GRAFANA_API_KEY", () => {
    testPolicySuite({
      policyName: "GRAFANA_API_KEY",
      replacement: "[GRAFANA_API_KEY]",
      shouldMatch: [
        "glsa_1234567890abcdefghijklmnopqrstuv_1a2b3c4d", // Grafana service account token
        "grafana-api-key: glsa_abcdefghijklmnopqrstuvwxyz123456_12345678", // Grafana labeled key
      ],
      shouldNotMatch: [
        "glsa_short_123", // Too short to be valid
        "invalid", // No Grafana key pattern
      ],
    });
  });

  describe("PROMETHEUS_REMOTE_WRITE", () => {
    testPolicySuite({
      policyName: "PROMETHEUS_REMOTE_WRITE",
      replacement: "[PROMETHEUS_REMOTE_WRITE]",
      shouldMatch: [
        "remote_write_url: https://prometheus-us-central1.grafana.net/api/v1/write", // Prometheus Grafana Cloud endpoint
        "prometheus_url: https://prometheus.example.com/api/v1/write", // Prometheus write endpoint
      ],
      shouldNotMatch: [
        "remote_write_url: https://example.com", // Missing /api/v1/write path
        "invalid", // No Prometheus URL pattern
      ],
    });
  });

  describe("SPLUNK_HEC_TOKEN", () => {
    testPolicySuite({
      policyName: "SPLUNK_HEC_TOKEN",
      replacement: "[SPLUNK_HEC_TOKEN]",
      shouldMatch: [
        "Splunk 12345678-1234-1234-1234-123456789012", // Splunk HTTP Event Collector token
      ],
      shouldNotMatch: [
        "Splunk 12345678-1234", // Incomplete UUID format
        "invalid", // No Splunk HEC token pattern
      ],
    });
  });

  describe("SUMO_LOGIC_COLLECTOR", () => {
    testPolicySuite({
      policyName: "SUMO_LOGIC_COLLECTOR",
      replacement: "[SUMOLOGIC_COLLECTOR]",
      shouldMatch: [
        "https://collectors.us2.sumologic.com/receiver/v1/http/1234567890ABCDEF", // Sumo Logic HTTP collector URL
      ],
      shouldNotMatch: [
        "https://sumologic.com/collector", // Not a collector endpoint
        "invalid", // No Sumo Logic pattern
      ],
    });
  });

  describe("BUGSNAG_API_KEY", () => {
    testPolicySuite({
      policyName: "BUGSNAG_API_KEY",
      replacement: "[BUGSNAG_API_KEY]",
      shouldMatch: [
        "bugsnag-api-key: 1234567890abcdef1234567890abcdef", // Bugsnag API key
      ],
      shouldNotMatch: [
        "bugsnag-api-key: short", // Too short to be valid
        "invalid", // No Bugsnag key pattern
      ],
    });
  });

  describe("ROLLBAR_ACCESS_TOKEN", () => {
    testPolicySuite({
      policyName: "ROLLBAR_ACCESS_TOKEN",
      replacement: "[ROLLBAR_TOKEN]",
      shouldMatch: [
        "rollbar-access-token: 1234567890abcdef1234567890abcdef", // Rollbar access token
        "rollbar_post_server_item: abcdef1234567890abcdef1234567890", // Rollbar server token
      ],
      shouldNotMatch: [
        "rollbar-access-token: short", // Too short to be valid
        "invalid", // No Rollbar token pattern
      ],
    });
  });

  describe("AIRBRAKE_API_KEY", () => {
    testPolicySuite({
      policyName: "AIRBRAKE_API_KEY",
      replacement: "[AIRBRAKE_KEY]",
      shouldMatch: [
        "airbrake-api-key: 1234567890abcdef1234567890abcdef", // Airbrake API key
        "airbrake_project_key: abcdef1234567890abcdef1234567890", // Airbrake project key
      ],
      shouldNotMatch: [
        "airbrake-api-key: short", // Too short to be valid
        "invalid", // No Airbrake key pattern
      ],
    });
  });

  describe("LOGDNA_INGESTION_KEY", () => {
    testPolicySuite({
      policyName: "LOGDNA_INGESTION_KEY",
      replacement: "[LOGDNA_KEY]",
      shouldMatch: [
        "logdna-ingestion-key: 1234567890abcdef1234567890abcdef", // LogDNA ingestion key
        "logdna_api_key: abcdef1234567890abcdef1234567890", // LogDNA API key
      ],
      shouldNotMatch: [
        "logdna-ingestion-key: short", // Too short to be valid
        "invalid", // No LogDNA key pattern
      ],
    });
  });

  describe("LOGGLY_TOKEN", () => {
    testPolicySuite({
      policyName: "LOGGLY_TOKEN",
      replacement: "[LOGGLY_TOKEN]",
      shouldMatch: [
        "loggly-token: 12345678-1234-1234-1234-123456789012", // Loggly customer token UUID
        "loggly_customer_token: abcdef01-2345-6789-abcd-ef0123456789", // Loggly token hex format
      ],
      shouldNotMatch: [
        "loggly-token: 12345678-1234", // Incomplete UUID format
        "invalid", // No Loggly token pattern
      ],
    });
  });

  describe("PAPERTRAIL_TOKEN", () => {
    testPolicySuite({
      policyName: "PAPERTRAIL_TOKEN",
      replacement: "[PAPERTRAIL_TOKEN]",
      shouldMatch: [
        "papertrail-token: 1234567890abcdef1234567890abcdef", // Papertrail API token
        "papertrail_api_token: abcdefghijklmnopqrstuvwxyz123456", // Papertrail token alphanumeric
      ],
      shouldNotMatch: [
        "papertrail-token: short", // Too short to be valid
        "invalid", // No Papertrail token pattern
      ],
    });
  });
});
