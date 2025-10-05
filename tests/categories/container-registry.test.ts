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
      shouldMatch: [
        "dckr_pat_abc123abc123abc123abc123abc123abc123", // standard Docker PAT (exactly 36 chars)
        "dckr_pat_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // all A's (36 chars)
        "dckr_pat_000000000000000000000000000000000000", // all zeros (36 chars)
        "dckr_pat_abcdefghijklmnopqrstuvwxyz1234567890", // alphabet (38 chars, tests 36+)
        "dckr_pat_abc-def_123-ghi_456-jkl_789-mno_0123", // with dashes/underscores (41 chars)
        "dckr_pat_zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", // all z's (42 chars, tests 36+)
      ],
      shouldNotMatch: [
        "dckr_pat_short", // too short
        "docker-token", // wrong format
        "regular text", // plain text
        "dckr_pat_", // missing token value
        "dckr_abc123", // missing _pat_
        "dockertoken1234567890", // missing prefix
      ],
    });
  });

  describe("DOCKER_HUB_TOKEN", () => {
    testPolicySuite({
      policyName: "DOCKER_HUB_TOKEN",
      replacement: "[DOCKER_HUB_TOKEN]",
      shouldMatch: [
        "dckr_pat_abc123abc123abc123abc123abc123abc123", // standard Docker Hub token (exactly 36 chars)
        "dckr_pat_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // all A's (36 chars)
        "dckr_pat_000000000000000000000000000000000000", // all zeros (36 chars)
        "dckr_pat_ABC-DEF_GHI-JKL_MNO-PQR_STU-VWX_Y012", // with dashes/underscores (36 chars)
        "dckr_pat_zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", // all z's (36 chars)
        "dckr_pat_123456789012345678901234567890123456", // all digits (36 chars)
      ],
      shouldNotMatch: [
        "dckr_pat_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // 37 chars (too long, need exactly 36)
        "dckr_pat_0000000000000000000000000000000000000", // 37 chars (too long)
        "dckr_pat_abcdefghijklmnopqrstuvwxyz1234567890a", // 39 chars (too long)
        "dckr_pat_deadbeefcafebabedeadbeefcafebabe12", // 34 chars (too short)
        "dckr_pat_short", // too short
        "docker-hub-token", // wrong format
        "dckr_pat_", // missing token value
        "regular text", // plain text
        "dckr_abc", // too short
        "dockerhub123", // missing prefix
      ],
    });
  });
});
