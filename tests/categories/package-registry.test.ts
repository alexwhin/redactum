import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("package registry patterns", () => {
  testCategoryCoverage(PolicyCategory.PACKAGE_REGISTRY, [
    "NPM_TOKEN",
    "PYPI_TOKEN",
    "QUAY_IO_TOKEN",
    "JFROG_ARTIFACTORY_TOKEN",
    "NEXUS_REPOSITORY_TOKEN",
  ]);

  describe("NPM_TOKEN", () => {
    testPolicySuite({
      policyName: "NPM_TOKEN",
      replacement: "[NPM_TOKEN]",
      shouldMatch: ["npm_abcd1234efgh5678ijkl9012mnop3456qrst"],
      shouldNotMatch: ["npm_short", "npm-token", "regular text"],
    });
  });

  describe("PYPI_TOKEN", () => {
    testPolicySuite({
      policyName: "PYPI_TOKEN",
      replacement: "[PYPI_TOKEN]",
      shouldMatch: [
        "pypi-abcd1234efgh5678ijkl9012mnop3456qrstuvwx7890yzab1234cdef567",
      ],
      shouldNotMatch: ["pypi-short", "invalid token"],
    });
  });

  describe("QUAY_IO_TOKEN", () => {
    testPolicySuite({
      policyName: "QUAY_IO_TOKEN",
      replacement: "[QUAY_TOKEN]",
      shouldMatch: [
        "quay.io-token: 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456",
        "quay.io-robot: abcdefghijklmnopqrstuvwxyz1234567890ABCD",
      ],
      shouldNotMatch: ["quay.io-token: short", "invalid"],
    });
  });

  describe("JFROG_ARTIFACTORY_TOKEN", () => {
    testPolicySuite({
      policyName: "JFROG_ARTIFACTORY_TOKEN",
      replacement: "[ARTIFACTORY_TOKEN]",
      shouldMatch: [
        "AKCp1234567890abcdefghijklmnopqrstuvwxyz",
        "artifactory-token: AKC1234567890abcdef",
      ],
      shouldNotMatch: ["AKC123", "invalid token"],
    });
  });

  describe("NEXUS_REPOSITORY_TOKEN", () => {
    testPolicySuite({
      policyName: "NEXUS_REPOSITORY_TOKEN",
      replacement: "[NEXUS_TOKEN]",
      shouldMatch: [
        "nexus-token: 1234567890abcdef-1234-1234-1234",
        "nexus-password: secretpassword123456",
      ],
      shouldNotMatch: ["nexus-token: abc", "invalid"],
    });
  });
});
