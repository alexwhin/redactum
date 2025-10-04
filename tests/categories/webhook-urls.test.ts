import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("webhook urls patterns", () => {
  const webhookUrlsPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.WEBHOOK_URLS,
  );

  it("should have webhook URL patterns", () => {
    expect(webhookUrlsPatterns.length).toBeGreaterThan(0);
  });

  describe("WEBHOOK_URL", () => {
    const pattern = webhookUrlsPatterns.find((p) => p.name === "WEBHOOK_URL");

    it("should detect webhook URLs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "https://hooks.example.com/webhook/1234567890abcdef".match(pattern!.pattern),
      ).toBeTruthy();
      expect("http://hooks.test.com/api/webhook/abc123".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match non-webhook URLs", () => {
      expect("https://example.com/webhook".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SLACK_WEBHOOK", () => {
    const pattern = webhookUrlsPatterns.find((p) => p.name === "SLACK_WEBHOOK");

    it("should detect Slack webhook URLs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "https://hooks.slack.com/services/T12345678/B1234567890/abcdefghijklmnopqrstuvwx".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Slack webhook URLs", () => {
      expect("https://slack.com/webhook".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("DISCORD_WEBHOOK", () => {
    const pattern = webhookUrlsPatterns.find(
      (p) => p.name === "DISCORD_WEBHOOK",
    );

    it("should detect Discord webhook URLs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz123456".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "https://discordapp.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz123456".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Discord webhook URLs", () => {
      expect("https://discord.com/webhook".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const slackPattern = webhookUrlsPatterns.find(
      (p) => p.name === "SLACK_WEBHOOK",
    );

    expect("regular text".match(slackPattern!.pattern)).toBeFalsy();
  });
});
