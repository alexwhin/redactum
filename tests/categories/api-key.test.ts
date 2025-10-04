import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("api key patterns", () => {
  const apiKeyPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.API_KEY,
  );

  it("should have API key patterns", () => {
    expect(apiKeyPatterns.length).toBeGreaterThan(0);
  });

  describe("OPENAI_API_KEY", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "OPENAI_API_KEY");

    it("should detect OpenAI API keys", () => {
      expect(pattern).toBeTruthy();
      expect("sk-1234567890abcdefghijklmnopqrstuvwxyz".match(pattern!.pattern)).toBeTruthy();
      expect("sk-abcdefghijklmnopqrstuvwxyz123456".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid OpenAI keys", () => {
      expect("sk-short".match(pattern!.pattern)).toBeFalsy();
      expect("api-key-1234567890".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("ANTHROPIC_API_KEY", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "ANTHROPIC_API_KEY");

    it("should detect Anthropic API keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "sk-ant-api03-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789012345678901234567890".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Anthropic keys", () => {
      expect("sk-ant-short".match(pattern!.pattern)).toBeFalsy();
      expect("sk-1234567890".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("GITHUB_TOKEN", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "GITHUB_TOKEN");

    it("should detect GitHub personal access tokens", () => {
      expect(pattern).toBeTruthy();
      expect("ghp_abcdefghijklmnopqrstuvwxyz1234567890".match(pattern!.pattern)).toBeTruthy();
      expect("gho_abcdefghijklmnopqrstuvwxyz1234567890".match(pattern!.pattern)).toBeTruthy();
      expect("ghu_abcdefghijklmnopqrstuvwxyz1234567890".match(pattern!.pattern)).toBeTruthy();
      expect("ghs_abcdefghijklmnopqrstuvwxyz1234567890".match(pattern!.pattern)).toBeTruthy();
      expect("ghr_abcdefghijklmnopqrstuvwxyz1234567890".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid GitHub tokens", () => {
      expect("ghp_short".match(pattern!.pattern)).toBeFalsy();
      expect("github_token".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("GITHUB_FINE_GRAINED_TOKEN", () => {
    const pattern = apiKeyPatterns.find(
      (p) => p.name === "GITHUB_FINE_GRAINED_TOKEN",
    );

    it("should detect GitHub fine-grained tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "github_pat_1234567890ABCDEFGHIJ_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid fine-grained tokens", () => {
      expect("github_pat_short".match(pattern!.pattern)).toBeFalsy();
      expect("github_token".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("STRIPE_KEY", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "STRIPE_KEY");

    it("should detect Stripe API keys", () => {
      expect(pattern).toBeTruthy();
      expect("sk_live_1234567890abcdefghijklmnop".match(pattern!.pattern)).toBeTruthy();
      expect("sk_test_1234567890abcdefghijklmnop".match(pattern!.pattern)).toBeTruthy();
      expect("pk_live_1234567890abcdefghijklmnop".match(pattern!.pattern)).toBeTruthy();
      expect("pk_test_1234567890abcdefghijklmnop".match(pattern!.pattern)).toBeTruthy();
      expect("rk_live_1234567890abcdefghijklmnop".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Stripe keys", () => {
      expect("sk_live_short".match(pattern!.pattern)).toBeFalsy();
      expect("stripe_key_1234".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("JWT_TOKEN", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "JWT_TOKEN");

    it("should detect JWT tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid JWT tokens", () => {
      expect("eyJhbGciOiJ.short".match(pattern!.pattern)).toBeFalsy();
      expect("not-a-jwt-token".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("API_KEY_GENERIC", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "API_KEY_GENERIC");

    it("should detect generic API keys", () => {
      expect(pattern).toBeTruthy();
      expect("api_key: 1234567890abcdefghij".match(pattern!.pattern)).toBeTruthy();
      expect("apikey: 1234567890abcdefghijklmnop".match(pattern!.pattern)).toBeTruthy();
      expect("access_token: 1234567890abcdefghij".match(pattern!.pattern)).toBeTruthy();
      expect("bearer_token: 1234567890abcdefghij".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match short values", () => {
      expect("api_key: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("GOOGLE_API_KEY", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "GOOGLE_API_KEY");

    it("should detect Google API keys", () => {
      expect(pattern).toBeTruthy();
      expect("AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI".match(pattern!.pattern)).toBeTruthy();
      expect("AIzaSyAbcdefghijklmnopqrstuvwxyz1234567".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Google API keys", () => {
      expect("AIzaShort".match(pattern!.pattern)).toBeFalsy();
      expect("google-api-key".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SLACK_TOKEN", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "SLACK_TOKEN");

    it("should detect Slack tokens", () => {
      expect(pattern).toBeTruthy();
      expect("xoxb-123456789012-123456789012-abcdefghijklmnopqrstuvwx".match(pattern!.pattern)).toBeTruthy();
      expect("xoxp-123456789012-123456789012-abcdefghijklmnopqrstuvwx".match(pattern!.pattern)).toBeTruthy();
      expect("xoxa-123456789012-123456789012-abcdefghijklmnopqrstuvwx".match(pattern!.pattern)).toBeTruthy();
      expect("xoxr-123456789012-123456789012-abcdefghijklmnopqrstuvwx".match(pattern!.pattern)).toBeTruthy();
      expect("xoxs-123456789012-123456789012-abcdefghijklmnopqrstuvwx".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Slack tokens", () => {
      expect("xoxb-123-456-short".match(pattern!.pattern)).toBeFalsy();
      expect("slack-token".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PAYPAL_CLIENT_ID", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "PAYPAL_CLIENT_ID");

    it("should detect PayPal client IDs", () => {
      expect(pattern).toBeTruthy();
      expect(
        "AQkquBDf1zctJOWGKWUEtKXm6qVhueUEMvXO_-MCI4DQQ4-LWvkDLIN2fGsdabcdefghijklmnopqrstu".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid PayPal client IDs", () => {
      expect("AShort".match(pattern!.pattern)).toBeFalsy();
      expect("paypal-client-id".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("TWILIO_API_KEY", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "TWILIO_API_KEY");

    it("should detect Twilio API keys", () => {
      expect(pattern).toBeTruthy();
      expect("SK1234567890abcdef1234567890abcdef".match(pattern!.pattern)).toBeTruthy();
      expect("SKabcdefghijklmnopqrstuvwxyz123456".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Twilio API keys", () => {
      expect("SKshort".match(pattern!.pattern)).toBeFalsy();
      expect("twilio-key".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("SENDGRID_API_KEY", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "SENDGRID_API_KEY");

    it("should detect SendGrid API keys", () => {
      expect(pattern).toBeTruthy();
      expect(
        "SG.abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid SendGrid API keys", () => {
      expect("SG.short".match(pattern!.pattern)).toBeFalsy();
      expect("sendgrid-key".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PASSWORD_ASSIGNMENT", () => {
    const pattern = apiKeyPatterns.find((p) => p.name === "PASSWORD_ASSIGNMENT");

    it("should detect password assignments", () => {
      expect(pattern).toBeTruthy();
      expect('password = "P@ssw0rd123!"'.match(pattern!.pattern)).toBeTruthy();
      expect("password: 'MySecret123'".match(pattern!.pattern)).toBeTruthy();
      expect('passwd="SecretPass456"'.match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match short passwords", () => {
      expect('password = "short"'.match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const openaiPattern = apiKeyPatterns.find((p) => p.name === "OPENAI_API_KEY");
    const githubPattern = apiKeyPatterns.find((p) => p.name === "GITHUB_TOKEN");

    expect("regular text".match(openaiPattern!.pattern)).toBeFalsy();
    expect("regular text".match(githubPattern!.pattern)).toBeFalsy();
  });
});
