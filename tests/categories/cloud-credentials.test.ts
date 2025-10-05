import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("cloud credentials patterns", () => {
  const cloudPatterns = POLICIES.filter(p => p.category === PolicyCategory.CLOUD_CREDENTIALS);

  it("should have cloud credentials patterns", () => {
    expect(cloudPatterns.length).toBeGreaterThan(0);
  });

  it("should detect Azure Subscription IDs", () => {
    const pattern = cloudPatterns.find(p => p.name === "AZURE_SUBSCRIPTION_ID");
    expect(pattern).toBeTruthy();

    expect("12345678-1234-1234-1234-123456789012".match(pattern!.pattern)).toBeTruthy();
    expect("abcdef01-2345-6789-abcd-ef0123456789".match(pattern!.pattern)).toBeTruthy();
  });

  it("should detect Heroku API Keys", () => {
    const pattern = cloudPatterns.find(p => p.name === "HEROKU_API_KEY");
    expect(pattern).toBeTruthy();

    expect("12345678-1234-1234-1234-123456789012".match(pattern!.pattern)).toBeTruthy();
  });

  it("should detect DigitalOcean tokens", () => {
    const pattern = cloudPatterns.find(p => p.name === "DIGITALOCEAN_TOKEN");
    expect(pattern).toBeTruthy();

    expect("dop_v1_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef".match(pattern!.pattern)).toBeTruthy();
  });

  it("should detect Railway tokens", () => {
    const pattern = cloudPatterns.find(p => p.name === "RAILWAY_TOKEN");
    expect(pattern).toBeTruthy();

    expect("12345678-1234-1234-1234-123456789012".match(pattern!.pattern)).toBeTruthy();
    expect("abcdef01-2345-6789-abcd-ef0123456789".match(pattern!.pattern)).toBeTruthy();
  });

  it("should detect GCP service account keys", () => {
    const pattern = cloudPatterns.find(p => p.name === "GCP_SERVICE_ACCOUNT_KEY");
    expect(pattern).toBeTruthy();

    expect("my-service-account@my-project.iam.gserviceaccount.com".match(pattern!.pattern)).toBeTruthy();
    expect("app-123@example-project-456.iam.gserviceaccount.com".match(pattern!.pattern)).toBeTruthy();
  });

  it("should not have false positives", () => {
    const railwayPattern = cloudPatterns.find(p => p.name === "RAILWAY_TOKEN");

    expect("railway.app".match(railwayPattern!.pattern)).toBeFalsy();
  });
});
