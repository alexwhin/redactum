import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("ci cd secrets patterns", () => {
  testCategoryCoverage(PolicyCategory.CI_CD_SECRETS, [
    "JENKINS_TOKEN",
    "CIRCLECI_TOKEN",
    "TRAVIS_CI_TOKEN",
    "GITLAB_TOKEN",
    "GITLAB_CI_TOKEN",
    "AZURE_DEVOPS_TOKEN",
    "BITBUCKET_TOKEN",
  ]);

  describe("JENKINS_TOKEN", () => {
    testPolicySuite({
      policyName: "JENKINS_TOKEN",
      replacement: "[JENKINS_TOKEN]",
      shouldMatch: [
        "jenkins-token: 11a1234567890abcdef1234567890abcd",
        "jenkins_api_key: 1234567890abcdef1234567890abcdef12",
        "hudson-token: abcdef1234567890abcdef1234567890",
        "jenkins-token: 11aABCDEFGHIJKLMNOPQRSTUVWXYZ1234",
        "jenkins_api_key: zyxwvutsrqponmlkjihgfedcba9876543210",
        "hudson-token: 0000000000000000000000000000000000",
        "jenkins-token: 11a9876543210ZYXWVUTSRQPONMLKJIIHG",
        "jenkins_api_key: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890",
      ],
      shouldNotMatch: [
        "jenkins-token: short",
        "regular text",
        "jenkins-token:",
        "jenkins_api_key: abc",
        "hudson-token: tiny",
        "jenkins-invalid",
      ],
    });
  });

  describe("CIRCLECI_TOKEN", () => {
    testPolicySuite({
      policyName: "CIRCLECI_TOKEN",
      replacement: "[CIRCLECI_TOKEN]",
      shouldMatch: [
        "circleci-token: 1234567890abcdef1234567890abcdef12345678",
        "circleci_api_key: abcdef1234567890abcdef1234567890abcdef12",
        "circleci-token: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCD",
        "circleci-token: 0000000000000000000000000000000000000000",
        "circleci_api_key: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBc",
      ],
      shouldNotMatch: [
        "circleci-token: short",
        "invalid",
        "circleci-token:",
        "circleci_api_key: abc",
        "circleci-token: tooshort",
        "circleci-invalid",
      ],
    });
  });

  describe("TRAVIS_CI_TOKEN", () => {
    testPolicySuite({
      policyName: "TRAVIS_CI_TOKEN",
      replacement: "[TRAVIS_TOKEN]",
      shouldMatch: [
        "travis-token: 1234567890abcdefghijkl",
        "travis_api_key: abcdefghijklmnopqrstuv",
        "travis-token: ABCDEFGHIJKLMNOPQRSTUV",
        "travis_api_key: zyxwvutsrqponmlkjihgfe",
        "travis-token: 0000000000000000000000",
        "travis_api_key: aBcDeFgHiJkLmNoPqRsTuV",
        "travis-token: 9876543210ZYXWVUTSRQPO",
      ],
      shouldNotMatch: [
        "travis-token: short",
        "invalid",
        "travis-token:",
        "travis_api_key: abc",
        "travis-token: tiny",
        "travis-invalid",
      ],
    });
  });

  describe("GITLAB_TOKEN", () => {
    testPolicySuite({
      policyName: "GITLAB_TOKEN",
      replacement: "[GITLAB_TOKEN]",
      shouldMatch: [
        "glpat-abcdefghijklmnopqrst",
        "gitlab-token-1234567890abcdefghij",
        "gitlab_pat-abcdefghijklmnopqrst",
        "glpat-ABCDEFGHIJKLMNOPQRST",
        "gitlab-token-ZYXWVUTSRQPONMLKJIHG",
        "glpat-aBcDeFgHiJkLmNoPqRsT",
        "gitlab-token-9876543210ZYXWVUTSRQ",
      ],
      shouldNotMatch: [
        "glpat-short",
        "invalid",
        "glpat:",
        "gitlab-token-abc",
        "gitlab_pat-tiny",
        "gitlab-invalid",
      ],
    });
  });

  describe("GITLAB_CI_TOKEN", () => {
    testPolicySuite({
      policyName: "GITLAB_CI_TOKEN",
      replacement: "[GITLAB_CI_TOKEN]",
      shouldMatch: [
        "CI_JOB_TOKEN: 1234567890abcdef",
        "CI_DEPLOY_PASSWORD: secret123",
        "CI_REGISTRY_PASSWORD: pass456",
        "CI_JOB_TOKEN: ABCDEFGHIJKLMNOP",
        "CI_REGISTRY_PASSWORD: MyP@ssw0rd!",
        "CI_JOB_TOKEN: zyxwvutsrqponmlk",
        "CI_DEPLOY_PASSWORD: C0mpl3x!Key",
      ],
      shouldNotMatch: [
        "CI_JOB_ID: 123",
        "invalid",
        "CI_JOB_TOKEN:",
        "CI_DEPLOY_PASSWORD:",
        "CI_REGISTRY_PASSWORD:",
        "CI_BUILD_ID: 456",
      ],
    });
  });

  describe("AZURE_DEVOPS_TOKEN", () => {
    testPolicySuite({
      policyName: "AZURE_DEVOPS_TOKEN",
      replacement: "[AZURE_DEVOPS_TOKEN]",
      shouldMatch: [
        "azdo-token: 1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdef",
        "azure_devops_pat: abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnop",
        "azdo-token: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOP",
        "azdo-token: 0000000000000000000000000000000000000000000000000000",
        "azdo-token: 9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210ZYXWVU",
      ],
      shouldNotMatch: [
        "azdo-token: short",
        "invalid",
        "azdo-token:",
        "azure_devops_pat: abc",
        "azdo-token: tooshort",
        "azure-devops-invalid",
      ],
    });
  });

  describe("BITBUCKET_TOKEN", () => {
    testPolicySuite({
      policyName: "BITBUCKET_TOKEN",
      replacement: "[BITBUCKET_TOKEN]",
      shouldMatch: [
        "bitbucket-token: 1234567890abcdefghij",
        "bitbucket_app_password: abcdefghijklmnopqrstuvwxyz1234",
        "bitbucket-token: ABCDEFGHIJKLMNOPQRST",
        "bitbucket_app_password: ZYXWVUTSRQPONMLKJIHGFEDCBA9876",
        "bitbucket-token: 0000000000000000000000",
        "bitbucket_app_password: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234",
        "bitbucket-token: 9876543210ZYXWVUTSRQ",
      ],
      shouldNotMatch: [
        "bitbucket-token: abc",
        "invalid",
        "bitbucket-token:",
        "bitbucket_app_password: a",
        "bitbucket-token: tiny",
        "bitbucket-invalid",
      ],
    });
  });
});
