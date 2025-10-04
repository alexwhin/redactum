import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("ci cd secrets patterns", () => {
  const ciCdSecretsPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.CI_CD_SECRETS,
  );

  it("should have CI/CD secrets patterns", () => {
    expect(ciCdSecretsPatterns.length).toBeGreaterThan(0);
  });

  describe("JENKINS_TOKEN", () => {
    const pattern = ciCdSecretsPatterns.find((p) => p.name === "JENKINS_TOKEN");

    it("should detect Jenkins tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "jenkins-token: 11a1234567890abcdef1234567890abcd".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "jenkins_api_key: 1234567890abcdef1234567890abcdef12".match(pattern!.pattern),
      ).toBeTruthy();
      expect("hudson-token: abcdef1234567890abcdef1234567890".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Jenkins tokens", () => {
      expect("jenkins-token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("CIRCLECI_TOKEN", () => {
    const pattern = ciCdSecretsPatterns.find(
      (p) => p.name === "CIRCLECI_TOKEN",
    );

    it("should detect CircleCI tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "circleci-token: 1234567890abcdef1234567890abcdef12345678".match(pattern!.pattern),
      ).toBeTruthy();
      expect(
        "circleci_api_key: abcdef1234567890abcdef1234567890abcdef12".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid CircleCI tokens", () => {
      expect("circleci-token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("TRAVIS_CI_TOKEN", () => {
    const pattern = ciCdSecretsPatterns.find(
      (p) => p.name === "TRAVIS_CI_TOKEN",
    );

    it("should detect Travis CI tokens", () => {
      expect(pattern).toBeTruthy();
      expect("travis-token: 1234567890abcdefghijkl".match(pattern!.pattern)).toBeTruthy();
      expect("travis_api_key: abcdefghijklmnopqrstuv".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Travis CI tokens", () => {
      expect("travis-token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("GITLAB_TOKEN", () => {
    const pattern = ciCdSecretsPatterns.find((p) => p.name === "GITLAB_TOKEN");

    it("should detect GitLab tokens", () => {
      expect(pattern).toBeTruthy();
      expect("glpat-abcdefghijklmnopqrst".match(pattern!.pattern)).toBeTruthy();
      expect("gitlab-token-1234567890abcdefghij".match(pattern!.pattern)).toBeTruthy();
      expect("gitlab_pat-abcdefghijklmnopqrst".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid GitLab tokens", () => {
      expect("glpat-short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("GITLAB_CI_TOKEN", () => {
    const pattern = ciCdSecretsPatterns.find(
      (p) => p.name === "GITLAB_CI_TOKEN",
    );

    it("should detect GitLab CI tokens", () => {
      expect(pattern).toBeTruthy();
      expect("CI_JOB_TOKEN: 1234567890abcdef".match(pattern!.pattern)).toBeTruthy();
      expect("CI_DEPLOY_PASSWORD: secret123".match(pattern!.pattern)).toBeTruthy();
      expect("CI_REGISTRY_PASSWORD: pass456".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid GitLab CI tokens", () => {
      expect("CI_JOB_ID: 123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("AZURE_DEVOPS_TOKEN", () => {
    const pattern = ciCdSecretsPatterns.find(
      (p) => p.name === "AZURE_DEVOPS_TOKEN",
    );

    it("should detect Azure DevOps tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "azdo-token: 1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdef".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "azure_devops_pat: abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnop".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Azure DevOps tokens", () => {
      expect("azdo-token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("BITBUCKET_TOKEN", () => {
    const pattern = ciCdSecretsPatterns.find(
      (p) => p.name === "BITBUCKET_TOKEN",
    );

    it("should detect Bitbucket tokens", () => {
      expect(pattern).toBeTruthy();
      expect("bitbucket-token: 1234567890abcdefghij".match(pattern!.pattern)).toBeTruthy();
      expect(
        "bitbucket_app_password: abcdefghijklmnopqrstuvwxyz1234".match(pattern!.pattern),
      ).toBeTruthy();
    });

    it("should not match invalid Bitbucket tokens", () => {
      expect("bitbucket-token: abc".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const jenkinsPattern = ciCdSecretsPatterns.find(
      (p) => p.name === "JENKINS_TOKEN",
    );

    expect("regular text".match(jenkinsPattern!.pattern)).toBeFalsy();
  });
});
