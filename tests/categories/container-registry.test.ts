import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("container registry patterns", () => {
  testCategoryCoverage(PolicyCategory.CONTAINER_REGISTRY, [
    "DOCKER_REGISTRY_TOKEN",
    "DOCKER_HUB_TOKEN",
  ]);

  describe("DOCKER_REGISTRY_TOKEN", () => {
    testPolicySuite({
      policyName: "DOCKER_REGISTRY_TOKEN",
      replacement: "[DOCKER_TOKEN]",
      shouldMatch: ["dckr_pat_abcd1234efgh5678ijkl9012mnop3456qrst"],
      shouldNotMatch: ["dckr_pat_short", "docker-token", "regular text"],
    });
  });

  describe("DOCKER_HUB_TOKEN", () => {
    testPolicySuite({
      policyName: "DOCKER_HUB_TOKEN",
      replacement: "[DOCKER_HUB_TOKEN]",
      shouldMatch: ["dckr_pat_abcd1234efgh5678ijkl9012mnop3456qrst"],
      shouldNotMatch: ["dckr_pat_short"],
    });
  });
});
