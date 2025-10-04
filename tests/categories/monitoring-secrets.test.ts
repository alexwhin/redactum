import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("monitoring secrets patterns", () => {
  const monitoringSecretsPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.MONITORING_SECRETS,
  );

  it("should have monitoring secrets patterns", () => {
    expect(monitoringSecretsPatterns.length).toBeGreaterThan(0);
  });

  describe("SENTRY_DSN", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "SENTRY_DSN",
    );

    it("should detect Sentry DSN URLs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "https://1234567890abcdef1234567890abcdef@1a2b3c.ingest.sentry.io/1234567".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Sentry DSNs", () => {
      expect("https://sentry.io/project".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("NEW_RELIC_LICENSE_KEY", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "NEW_RELIC_LICENSE_KEY",
    );

    it("should detect New Relic license keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "newrelic-key: 1234567890abcdef1234567890abcdef12345678".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "newrelic_license_key: 1234567890abcdef1234567890abcdef12345678".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid New Relic keys", () => {
      expect("newrelic-key: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("DATADOG_API_KEY", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "DATADOG_API_KEY",
    );

    it("should detect Datadog API keys", () => {
      expect(pattern).toBeTruthy();
      expect("datadog-key: 1234567890abcdef1234567890abcdef".match(pattern!.pattern)).toBeTruthy();
      expect(
        "datadog_api_key: abcdef1234567890abcdef1234567890".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid Datadog keys", () => {
      expect("datadog-key: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PAGERDUTY_INTEGRATION_KEY", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "PAGERDUTY_INTEGRATION_KEY",
    );

    it("should detect PagerDuty integration keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "pagerduty-key: 1234567890abcdef1234567890abcdef".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "pagerduty_integration_key: abcdef1234567890abcdef1234567890".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid PagerDuty keys", () => {
      expect("pagerduty-key: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("GRAFANA_API_KEY", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "GRAFANA_API_KEY",
    );

    it("should detect Grafana API keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "glsa_1234567890abcdefghijklmnopqrstuv_1a2b3c4d".match(pattern!.pattern),
      ).toBeTruthy();
      expect("grafana-api-key: glsa_abcdefghijklmnopqrstuvwxyz123456_12345678".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Grafana keys", () => {
      expect("glsa_short_123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PROMETHEUS_REMOTE_WRITE", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "PROMETHEUS_REMOTE_WRITE",
    );

    it("should detect Prometheus remote write URLs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "remote_write_url: https://prometheus-us-central1.grafana.net/api/v1/write".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "prometheus_url: https://prometheus.example.com/api/v1/write".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Prometheus URLs", () => {
      expect("remote_write_url: https://example.com".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SPLUNK_HEC_TOKEN", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "SPLUNK_HEC_TOKEN",
    );

    it("should detect Splunk HEC tokens", () => {
      expect(pattern).toBeTruthy();
      expect("Splunk 12345678-1234-1234-1234-123456789012".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Splunk tokens", () => {
      expect("Splunk 12345678-1234".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SUMO_LOGIC_COLLECTOR", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "SUMO_LOGIC_COLLECTOR",
    );

    it("should detect Sumo Logic collector URLs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "https://collectors.us2.sumologic.com/receiver/v1/http/1234567890ABCDEF".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Sumo Logic URLs", () => {
      expect("https://sumologic.com/collector".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("BUGSNAG_API_KEY", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "BUGSNAG_API_KEY",
    );

    it("should detect Bugsnag API keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "bugsnag-api-key: 1234567890abcdef1234567890abcdef".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid Bugsnag keys", () => {
      expect("bugsnag-api-key: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("ROLLBAR_ACCESS_TOKEN", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "ROLLBAR_ACCESS_TOKEN",
    );

    it("should detect Rollbar access tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "rollbar-access-token: 1234567890abcdef1234567890abcdef".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "rollbar_post_server_item: abcdef1234567890abcdef1234567890".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid Rollbar tokens", () => {
      expect("rollbar-access-token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AIRBRAKE_API_KEY", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "AIRBRAKE_API_KEY",
    );

    it("should detect Airbrake API keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "airbrake-api-key: 1234567890abcdef1234567890abcdef".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "airbrake_project_key: abcdef1234567890abcdef1234567890".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid Airbrake keys", () => {
      expect("airbrake-api-key: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("LOGDNA_INGESTION_KEY", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "LOGDNA_INGESTION_KEY",
    );

    it("should detect LogDNA ingestion keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "logdna-ingestion-key: 1234567890abcdef1234567890abcdef".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "logdna_api_key: abcdef1234567890abcdef1234567890".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid LogDNA keys", () => {
      expect("logdna-ingestion-key: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("LOGGLY_TOKEN", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "LOGGLY_TOKEN",
    );

    it("should detect Loggly tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "loggly-token: 12345678-1234-1234-1234-123456789012".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "loggly_customer_token: abcdef01-2345-6789-abcd-ef0123456789".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Loggly tokens", () => {
      expect("loggly-token: 12345678-1234".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PAPERTRAIL_TOKEN", () => {
    const pattern = monitoringSecretsPatterns.find(
      (p) => p.name === "PAPERTRAIL_TOKEN",
    );

    it("should detect Papertrail tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "papertrail-token: 1234567890abcdef1234567890abcdef".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "papertrail_api_token: abcdefghijklmnopqrstuvwxyz123456".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid Papertrail tokens", () => {
      expect("papertrail-token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const sentryPattern = monitoringSecretsPatterns.find(
      (p) => p.name === "SENTRY_DSN",
    );

    expect("regular text".match(sentryPattern!.pattern)).toBeFalsy();
  });
});
