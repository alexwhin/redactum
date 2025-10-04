import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("dev secret patterns", () => {
  const devSecretPatterns = POLICIES.filter(p => p.category === PolicyCategory.DEV_SECRET);

  it("should have dev secret patterns", () => {
    expect(devSecretPatterns.length).toBeGreaterThan(0);
  });

  it("should detect base64 URL parameters", () => {
    const pattern = devSecretPatterns.find(p => p.name === "BASE64_URL_PARAM");
    expect(pattern).toBeTruthy();

    expect("https://example.com?token=aGVsbG93b3JsZHNlY3JldGtleXZhbHVl".match(pattern!.pattern)).toBeTruthy();
    expect("https://api.com?auth=QWxhZGRpbjpvcGVuIHNlc2FtZQ==&foo=bar".match(pattern!.pattern)).toBeTruthy();
    expect("?key=dGVzdHNlY3JldGtleXZhbHVlMTIzNDU2Nzg5MA==".match(pattern!.pattern)).toBeTruthy();
  });

  it("should detect docker password flags", () => {
    const pattern = devSecretPatterns.find(p => p.name === "DOCKER_PASSWORD_FLAG");
    expect(pattern).toBeTruthy();

    expect("docker login -u user -p mysecretpass123".match(pattern!.pattern)).toBeTruthy();
    expect("docker login -u admin -p password123".match(pattern!.pattern)).toBeTruthy();
    expect("docker run -e VAR=value -p secret".match(pattern!.pattern)).toBeTruthy();
  });

  it("should preserve variable names in environment variables", () => {
    const pattern = devSecretPatterns.find(p => p.name === "ENVIRONMENT_VARIABLE_SECRET");
    expect(pattern).toBeTruthy();

    const match1 = "API_KEY=sk-1234567890abcdef".match(pattern!.pattern);
    expect(match1).toBeTruthy();
    expect(match1![0]).toBe("API_KEY=sk-1234567890abcdef");

    const match2 = "DATABASE_PASSWORD=secret123".match(pattern!.pattern);
    expect(match2).toBeTruthy();
    expect(match2![0]).toBe("DATABASE_PASSWORD=secret123");
  });

  it("should not have false positives for base64 URL params", () => {
    const pattern = devSecretPatterns.find(p => p.name === "BASE64_URL_PARAM");
    expect(pattern).toBeTruthy();

    expect("https://example.com?short=abc".match(pattern!.pattern)).toBeFalsy();
    expect("?id=123".match(pattern!.pattern)).toBeFalsy();
  });
});
