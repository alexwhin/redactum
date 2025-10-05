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
        "https://1234567890abcdef1234567890abcdef@1a2b3c.ingest.sentry.io/1234567",
      ],
      shouldNotMatch: ["https://sentry.io/project", "regular text"],
    });
  });

  describe("NEW_RELIC_LICENSE_KEY", () => {
    testPolicySuite({
      policyName: "NEW_RELIC_LICENSE_KEY",
      replacement: "[NEW_RELIC_KEY]",
      shouldMatch: [
        "newrelic-key: 1234567890abcdef1234567890abcdef12345678",
        "newrelic_license_key: 1234567890abcdef1234567890abcdef12345678",
      ],
      shouldNotMatch: ["newrelic-key: short", "invalid"],
    });
  });

  describe("DATADOG_API_KEY", () => {
    testPolicySuite({
      policyName: "DATADOG_API_KEY",
      replacement: "[DATADOG_API_KEY]",
      shouldMatch: [
        "datadog-key: 1234567890abcdef1234567890abcdef",
        "datadog_api_key: abcdef1234567890abcdef1234567890",
      ],
      shouldNotMatch: ["datadog-key: short", "invalid"],
    });
  });

  describe("PAGERDUTY_INTEGRATION_KEY", () => {
    testPolicySuite({
      policyName: "PAGERDUTY_INTEGRATION_KEY",
      replacement: "[PAGERDUTY_KEY]",
      shouldMatch: [
        "pagerduty-key: 1234567890abcdef1234567890abcdef",
        "pagerduty_integration_key: abcdef1234567890abcdef1234567890",
      ],
      shouldNotMatch: ["pagerduty-key: short", "invalid"],
    });
  });

  describe("GRAFANA_API_KEY", () => {
    testPolicySuite({
      policyName: "GRAFANA_API_KEY",
      replacement: "[GRAFANA_API_KEY]",
      shouldMatch: [
        "glsa_1234567890abcdefghijklmnopqrstuv_1a2b3c4d",
        "grafana-api-key: glsa_abcdefghijklmnopqrstuvwxyz123456_12345678",
      ],
      shouldNotMatch: ["glsa_short_123", "invalid"],
    });
  });

  describe("PROMETHEUS_REMOTE_WRITE", () => {
    testPolicySuite({
      policyName: "PROMETHEUS_REMOTE_WRITE",
      replacement: "[PROMETHEUS_REMOTE_WRITE]",
      shouldMatch: [
        "remote_write_url: https://prometheus-us-central1.grafana.net/api/v1/write",
        "prometheus_url: https://prometheus.example.com/api/v1/write",
      ],
      shouldNotMatch: ["remote_write_url: https://example.com", "invalid"],
    });
  });

  describe("SPLUNK_HEC_TOKEN", () => {
    testPolicySuite({
      policyName: "SPLUNK_HEC_TOKEN",
      replacement: "[SPLUNK_HEC_TOKEN]",
      shouldMatch: ["Splunk 12345678-1234-1234-1234-123456789012"],
      shouldNotMatch: ["Splunk 12345678-1234", "invalid"],
    });
  });

  describe("SUMO_LOGIC_COLLECTOR", () => {
    testPolicySuite({
      policyName: "SUMO_LOGIC_COLLECTOR",
      replacement: "[SUMOLOGIC_COLLECTOR]",
      shouldMatch: [
        "https://collectors.us2.sumologic.com/receiver/v1/http/1234567890ABCDEF",
      ],
      shouldNotMatch: ["https://sumologic.com/collector", "invalid"],
    });
  });

  describe("BUGSNAG_API_KEY", () => {
    testPolicySuite({
      policyName: "BUGSNAG_API_KEY",
      replacement: "[BUGSNAG_API_KEY]",
      shouldMatch: ["bugsnag-api-key: 1234567890abcdef1234567890abcdef"],
      shouldNotMatch: ["bugsnag-api-key: short", "invalid"],
    });
  });

  describe("ROLLBAR_ACCESS_TOKEN", () => {
    testPolicySuite({
      policyName: "ROLLBAR_ACCESS_TOKEN",
      replacement: "[ROLLBAR_TOKEN]",
      shouldMatch: [
        "rollbar-access-token: 1234567890abcdef1234567890abcdef",
        "rollbar_post_server_item: abcdef1234567890abcdef1234567890",
      ],
      shouldNotMatch: ["rollbar-access-token: short", "invalid"],
    });
  });

  describe("AIRBRAKE_API_KEY", () => {
    testPolicySuite({
      policyName: "AIRBRAKE_API_KEY",
      replacement: "[AIRBRAKE_KEY]",
      shouldMatch: [
        "airbrake-api-key: 1234567890abcdef1234567890abcdef",
        "airbrake_project_key: abcdef1234567890abcdef1234567890",
      ],
      shouldNotMatch: ["airbrake-api-key: short", "invalid"],
    });
  });

  describe("LOGDNA_INGESTION_KEY", () => {
    testPolicySuite({
      policyName: "LOGDNA_INGESTION_KEY",
      replacement: "[LOGDNA_KEY]",
      shouldMatch: [
        "logdna-ingestion-key: 1234567890abcdef1234567890abcdef",
        "logdna_api_key: abcdef1234567890abcdef1234567890",
      ],
      shouldNotMatch: ["logdna-ingestion-key: short", "invalid"],
    });
  });

  describe("LOGGLY_TOKEN", () => {
    testPolicySuite({
      policyName: "LOGGLY_TOKEN",
      replacement: "[LOGGLY_TOKEN]",
      shouldMatch: [
        "loggly-token: 12345678-1234-1234-1234-123456789012",
        "loggly_customer_token: abcdef01-2345-6789-abcd-ef0123456789",
      ],
      shouldNotMatch: ["loggly-token: 12345678-1234", "invalid"],
    });
  });

  describe("PAPERTRAIL_TOKEN", () => {
    testPolicySuite({
      policyName: "PAPERTRAIL_TOKEN",
      replacement: "[PAPERTRAIL_TOKEN]",
      shouldMatch: [
        "papertrail-token: 1234567890abcdef1234567890abcdef",
        "papertrail_api_token: abcdefghijklmnopqrstuvwxyz123456",
      ],
      shouldNotMatch: ["papertrail-token: short", "invalid"],
    });
  });
});
