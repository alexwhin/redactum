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
        "jenkins-token: 11a1234567890abcdef1234567890abcd", // Jenkins token with 11a prefix
        "jenkins_api_key: 1234567890abcdef1234567890abcdef12", // Jenkins API key alphanumeric
        "hudson-token: abcdef1234567890abcdef1234567890", // Hudson legacy token format
        "jenkins-token: 11aABCDEFGHIJKLMNOPQRSTUVWXYZ1234", // Jenkins token uppercase
        "jenkins_api_key: zyxwvutsrqponmlkjihgfedcba9876543210", // Jenkins long API key
        "hudson-token: 0000000000000000000000000000000000", // Hudson all zeros token
        "jenkins-token: 11a9876543210ZYXWVUTSRQPONMLKJIIHG", // Jenkins token numeric prefix
        "jenkins_api_key: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890", // Jenkins mixed case key
      ],
      shouldNotMatch: [
        "jenkins-token: short", // Too short to be valid token
        "regular text", // No Jenkins pattern present
        "jenkins-token:", // Missing value after label
        "jenkins_api_key: abc", // Too short to be valid key
        "hudson-token: tiny", // Too short to be valid token
        "jenkins-invalid", // Invalid Jenkins label format
      ],
    });
  });

  describe("CIRCLECI_TOKEN", () => {
    testPolicySuite({
      policyName: "CIRCLECI_TOKEN",
      replacement: "[CIRCLECI_TOKEN]",
      shouldMatch: [
        "circleci-token: 1234567890abcdef1234567890abcdef12345678", // CircleCI token alphanumeric
        "circleci_api_key: abcdef1234567890abcdef1234567890abcdef12", // CircleCI API key hex format
        "circleci-token: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCD", // CircleCI uppercase token
        "circleci-token: 0000000000000000000000000000000000000000", // CircleCI all zeros token
        "circleci_api_key: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBc", // CircleCI mixed case key
      ],
      shouldNotMatch: [
        "circleci-token: short", // Too short to be valid token
        "invalid", // No CircleCI pattern present
        "circleci-token:", // Missing value after label
        "circleci_api_key: abc", // Too short to be valid key
        "circleci-token: tooshort", // Below minimum length requirement
        "circleci-invalid", // Invalid CircleCI label format
      ],
    });
  });

  describe("TRAVIS_CI_TOKEN", () => {
    testPolicySuite({
      policyName: "TRAVIS_CI_TOKEN",
      replacement: "[TRAVIS_TOKEN]",
      shouldMatch: [
        "travis-token: 1234567890abcdefghijkl", // Travis CI token alphanumeric
        "travis_api_key: abcdefghijklmnopqrstuv", // Travis API key lowercase
        "travis-token: ABCDEFGHIJKLMNOPQRSTUV", // Travis token uppercase
        "travis_api_key: zyxwvutsrqponmlkjihgfe", // Travis API key reverse alpha
        "travis-token: 0000000000000000000000", // Travis token all zeros
        "travis_api_key: aBcDeFgHiJkLmNoPqRsTuV", // Travis API key mixed case
        "travis-token: 9876543210ZYXWVUTSRQPO", // Travis token numeric uppercase
      ],
      shouldNotMatch: [
        "travis-token: short", // Too short to be valid token
        "invalid", // No Travis pattern present
        "travis-token:", // Missing value after label
        "travis_api_key: abc", // Too short to be valid key
        "travis-token: tiny", // Below minimum length requirement
        "travis-invalid", // Invalid Travis label format
      ],
    });
  });

  describe("GITLAB_TOKEN", () => {
    testPolicySuite({
      policyName: "GITLAB_TOKEN",
      replacement: "[GITLAB_TOKEN]",
      shouldMatch: [
        "glpat-abcdefghijklmnopqrst", // GitLab personal access token format
        "gitlab-token-1234567890abcdefghij", // GitLab token with hyphen prefix
        "gitlab_pat-abcdefghijklmnopqrst", // GitLab PAT underscore format
        "glpat-ABCDEFGHIJKLMNOPQRST", // GitLab PAT uppercase
        "gitlab-token-ZYXWVUTSRQPONMLKJIHG", // GitLab token uppercase
        "glpat-aBcDeFgHiJkLmNoPqRsT", // GitLab PAT mixed case
        "gitlab-token-9876543210ZYXWVUTSRQ", // GitLab token numeric start
      ],
      shouldNotMatch: [
        "glpat-short", // Too short to be valid PAT
        "invalid", // No GitLab pattern present
        "glpat:", // Missing value after prefix
        "gitlab-token-abc", // Too short to be valid token
        "gitlab_pat-tiny", // Below minimum length requirement
        "gitlab-invalid", // Invalid GitLab label format
      ],
    });
  });

  describe("GITLAB_CI_TOKEN", () => {
    testPolicySuite({
      policyName: "GITLAB_CI_TOKEN",
      replacement: "[GITLAB_CI_TOKEN]",
      shouldMatch: [
        "CI_JOB_TOKEN: 1234567890abcdef", // GitLab CI job token
        "CI_DEPLOY_PASSWORD: secret123", // GitLab CI deploy password
        "CI_REGISTRY_PASSWORD: pass456", // GitLab CI registry password
        "CI_JOB_TOKEN: ABCDEFGHIJKLMNOP", // GitLab CI job token uppercase
        "CI_REGISTRY_PASSWORD: MyP@ssw0rd!", // GitLab CI password with special chars
        "CI_JOB_TOKEN: zyxwvutsrqponmlk", // GitLab CI job token lowercase
        "CI_DEPLOY_PASSWORD: C0mpl3x!Key", // GitLab CI complex deploy password
      ],
      shouldNotMatch: [
        "CI_JOB_ID: 123", // Job ID not a secret
        "invalid", // No GitLab CI pattern present
        "CI_JOB_TOKEN:", // Missing value after variable
        "CI_DEPLOY_PASSWORD:", // Missing password value
        "CI_REGISTRY_PASSWORD:", // Missing password value
        "CI_BUILD_ID: 456", // Build ID not a secret
      ],
    });
  });

  describe("AZURE_DEVOPS_TOKEN", () => {
    testPolicySuite({
      policyName: "AZURE_DEVOPS_TOKEN",
      replacement: "[AZURE_DEVOPS_TOKEN]",
      shouldMatch: [
        "azdo-token: 1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdef", // Azure DevOps PAT alphanumeric
        "azure_devops_pat: abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnop", // Azure DevOps long PAT
        "azdo-token: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOP", // Azure DevOps uppercase PAT
        "azdo-token: 0000000000000000000000000000000000000000000000000000", // Azure DevOps all zeros PAT
        "azdo-token: 9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210ZYXWVU", // Azure DevOps numeric uppercase PAT
      ],
      shouldNotMatch: [
        "azdo-token: short", // Too short to be valid token
        "invalid", // No Azure DevOps pattern present
        "azdo-token:", // Missing value after label
        "azure_devops_pat: abc", // Too short to be valid PAT
        "azdo-token: tooshort", // Below minimum length requirement
        "azure-devops-invalid", // Invalid Azure DevOps label format
      ],
    });
  });

  describe("BITBUCKET_TOKEN", () => {
    testPolicySuite({
      policyName: "BITBUCKET_TOKEN",
      replacement: "[BITBUCKET_TOKEN]",
      shouldMatch: [
        "bitbucket-token: 1234567890abcdefghij", // Bitbucket token alphanumeric
        "bitbucket_app_password: abcdefghijklmnopqrstuvwxyz1234", // Bitbucket app password
        "bitbucket-token: ABCDEFGHIJKLMNOPQRST", // Bitbucket token uppercase
        "bitbucket_app_password: ZYXWVUTSRQPONMLKJIHGFEDCBA9876", // Bitbucket long password
        "bitbucket-token: 0000000000000000000000", // Bitbucket all zeros token
        "bitbucket_app_password: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234", // Bitbucket mixed case password
        "bitbucket-token: 9876543210ZYXWVUTSRQ", // Bitbucket numeric token
      ],
      shouldNotMatch: [
        "bitbucket-token: abc", // Too short to be valid token
        "invalid", // No Bitbucket pattern present
        "bitbucket-token:", // Missing value after label
        "bitbucket_app_password: a", // Too short to be valid password
        "bitbucket-token: tiny", // Below minimum length requirement
        "bitbucket-invalid", // Invalid Bitbucket label format
      ],
    });
  });
});
