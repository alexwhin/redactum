import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("container registry patterns", () => {
  const containerRegistryPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.CONTAINER_REGISTRY,
  );

  it("should have container registry patterns", () => {
    expect(containerRegistryPatterns.length).toBeGreaterThan(0);
  });

  describe("DOCKER_REGISTRY_TOKEN", () => {
    const pattern = containerRegistryPatterns.find(
      (p) => p.name === "DOCKER_REGISTRY_TOKEN",
    );

    it("should detect Docker registry tokens", () => {
      expect(pattern).toBeTruthy();
      expect("dckr_pat_abcd1234efgh5678ijkl9012mnop3456qrst".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Docker tokens", () => {
      expect("dckr_pat_short".match(pattern!.pattern)).toBeFalsy();
      expect("docker-token".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("DOCKER_HUB_TOKEN", () => {
    const pattern = containerRegistryPatterns.find(
      (p) => p.name === "DOCKER_HUB_TOKEN",
    );

    it("should detect Docker Hub tokens", () => {
      expect(pattern).toBeTruthy();
      expect("dckr_pat_abcd1234efgh5678ijkl9012mnop3456qrst".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Docker Hub tokens", () => {
      expect("dckr_pat_short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const dockerPattern = containerRegistryPatterns.find(
      (p) => p.name === "DOCKER_REGISTRY_TOKEN",
    );

    expect("regular text".match(dockerPattern!.pattern)).toBeFalsy();
  });
});
