import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("webhook urls patterns", () => {
  testCategoryCoverage(PolicyCategory.WEBHOOK_URLS, [
    "WEBHOOK_URL",
    "SLACK_WEBHOOK",
    "DISCORD_WEBHOOK",
  ]);

  describe("WEBHOOK_URL", () => {
    testPolicySuite({
      policyName: "WEBHOOK_URL",
      replacement: "[WEBHOOK_URL]",
      shouldMatch: [
        "https://hooks.example.com/webhook/1234567890abcdef", // standard webhook
        "http://hooks.test.com/api/webhook/abc123", // HTTP webhook
        "http://hooks.internal.net/webhook/secret456", // internal webhook
        "http://hooks.example.org/api/webhook/integration-key", // integration webhook
        "https://hooks.service.io/webhook/data-sync-123", // data sync webhook
        "https://hooks.company.com/v1/webhook/callback", // versioned webhook
        "http://hooks.dev.local/incoming/data", // dev environment
      ],
      shouldNotMatch: [
        "https://webhooks.service.com/incoming/xyz789", // webhooks subdomain not hooks
        "https://api.example.com/webhooks/callback/token123", // api subdomain not hooks
        "https://events.example.com/webhook/event-handler-789", // events subdomain not hooks
        "https://notifications.app.com/webhook/notify/abc123def", // notifications subdomain not hooks
        "https://webhooks.platform.com/v1/webhook/user-action", // webhooks subdomain not hooks
        "https://example.com/webhook", // no hooks subdomain
        "https://example.com/api/endpoint", // not webhook URL
        "http://test.com/callback", // no hooks subdomain
        "https://api.service.com/v1/data", // API endpoint
        "webhook-url", // text label
        "https://example.com", // domain only
      ],
    });
  });

  describe("SLACK_WEBHOOK", () => {
    testPolicySuite({
      policyName: "SLACK_WEBHOOK",
      replacement: "[SLACK_WEBHOOK]",
      shouldMatch: [
        "https://hooks.slack.com/services/T12345678/B1234567890/ABCDEFGHIJKLMNOPQRSTUVWX", // standard Slack webhook
        "https://hooks.slack.com/services/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", // different IDs
        "https://hooks.slack.com/services/TABCDEFGH/B1234ABCD56/1234567890ABCDEFGHIJKLMN", // mixed alphanumeric
        "https://hooks.slack.com/services/T00000000/B0000000000/000000000000000000000000", // all zeros
        "https://hooks.slack.com/services/TDEADBEEF/BCAFEBABE12/DEADBEEFCAFEBABEDEADBE00", // hex pattern
      ],
      shouldNotMatch: [
        "https://hooks.slack.com/services/TFFFFFFFF/BFFFFFFFFFF/ffffffffffffffffffffffffff", // lowercase not allowed in token
        "https://hooks.slack.com/services/T11111111/B1111111111/11111111111111111111111111", // 26 chars not 24
        "https://hooks.slack.com/services/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45", // 29 chars not 24
        "https://slack.com/webhook", // not hooks domain
        "https://hooks.slack.com/services/T123", // incomplete URL
        "https://api.slack.com/webhooks/123", // API not hooks
        "slack-webhook-url", // text label
        "https://hooks.slack.com/services", // missing path components
        "https://example.com/slack/webhook", // non-Slack domain
      ],
    });
  });

  describe("DISCORD_WEBHOOK", () => {
    testPolicySuite({
      policyName: "DISCORD_WEBHOOK",
      replacement: "[DISCORD_WEBHOOK]",
      shouldMatch: [
        "https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz123456", // standard Discord (68 chars)
        "https://discordapp.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz123456", // discordapp.com (68 chars)
        "https://discord.com/api/webhooks/987654321098765432/zyxwvutsrqponmlkjihgfedcba9876543210zyxwvutsrqponmlkjihgfedcba987654", // different IDs (68 chars)
        "https://discordapp.com/api/webhooks/999999999999999999/abcdefABCDEF123456abcdefABCDEF123456abcdefABCDEF123456abcdefABCDEF12", // mixed case (68 chars)
        "https://discord.com/api/webhooks/123456789012345678/abc-def_123ABC-xyz_789DEF-ghi_012JKL-mno_345PQR-stu_678VWX-yza_bcd12", // with dashes and underscores (68 chars)
      ],
      shouldNotMatch: [
        "https://discord.com/api/webhooks/111111111111111111/1111111111111111111111111111111111111111111111111111111111111111111111", // 70 chars not 68
        "https://discord.com/api/webhooks/000000000000000000/0000000000000000000000000000000000000000000000000000000000000000000000", // 70 chars not 68
        "https://discord.com/api/webhooks/123456789012345678/deadbeefcafebabedeadbeefcafebabedeadbeefcafebabedeadbeefcafebabe123456", // 74 chars not 68
        "https://discord.com/api/webhooks/555555555555555555/qwertyuiopasdfghjklzxcvbnm1234567890qwertyuiopasdfghjklzxcvbnm12345678", // 76 chars not 68
        "https://discord.com/webhook", // not API path
        "https://discord.com/api/webhooks/123", // incomplete
        "https://example.com/discord/webhook", // non-Discord domain
        "discord-webhook", // text label
        "https://discord.com/api/webhooks", // missing IDs
        "https://discordapp.com/webhooks/123/abc", // missing API path
      ],
    });
  });
});
