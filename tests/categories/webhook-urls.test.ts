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
        "https://hooks.example.com/webhook/1234567890abcdef",
        "http://hooks.test.com/api/webhook/abc123",
      ],
      shouldNotMatch: ["https://example.com/webhook"],
    });
  });

  describe("SLACK_WEBHOOK", () => {
    testPolicySuite({
      policyName: "SLACK_WEBHOOK",
      replacement: "[SLACK_WEBHOOK]",
      shouldMatch: [
        "https://hooks.slack.com/services/T12345678/B1234567890/abcdefghijklmnopqrstuvwx",
      ],
      shouldNotMatch: ["https://slack.com/webhook"],
    });
  });

  describe("DISCORD_WEBHOOK", () => {
    testPolicySuite({
      policyName: "DISCORD_WEBHOOK",
      replacement: "[DISCORD_WEBHOOK]",
      shouldMatch: [
        "https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz123456",
        "https://discordapp.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz123456",
      ],
      shouldNotMatch: ["https://discord.com/webhook"],
    });
  });
});
