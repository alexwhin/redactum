import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("package registry patterns", () => {
  const packageRegistryPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.PACKAGE_REGISTRY,
  );

  it("should have package registry patterns", () => {
    expect(packageRegistryPatterns.length).toBeGreaterThan(0);
  });

  describe("NPM_TOKEN", () => {
    const pattern = packageRegistryPatterns.find((p) => p.name === "NPM_TOKEN");

    it("should detect npm tokens", () => {
      expect(pattern).toBeTruthy();
      expect("npm_abcd1234efgh5678ijkl9012mnop3456qrst".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid npm tokens", () => {
      expect("npm_short".match(pattern!.pattern)).toBeFalsy();
      expect("npm-token".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("PYPI_TOKEN", () => {
    const pattern = packageRegistryPatterns.find((p) => p.name === "PYPI_TOKEN");

    it("should detect PyPI tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "pypi-abcd1234efgh5678ijkl9012mnop3456qrstuvwx7890yzab1234cdef567".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid PyPI tokens", () => {
      expect("pypi-short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("QUAY_IO_TOKEN", () => {
    const pattern = packageRegistryPatterns.find(
      (p) => p.name === "QUAY_IO_TOKEN",
    );

    it("should detect Quay.io tokens", () => {
      expect(pattern).toBeTruthy();
      expect(
        "quay.io-token: 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ123456".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
      expect(
        "quay.io-robot: abcdefghijklmnopqrstuvwxyz1234567890ABCD".match(
          pattern!.pattern,
        ),
      ).toBeTruthy();
    });

    it("should not match invalid Quay.io tokens", () => {
      expect("quay.io-token: short".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("JFROG_ARTIFACTORY_TOKEN", () => {
    const pattern = packageRegistryPatterns.find(
      (p) => p.name === "JFROG_ARTIFACTORY_TOKEN",
    );

    it("should detect JFrog Artifactory tokens", () => {
      expect(pattern).toBeTruthy();
      expect("AKCp1234567890abcdefghijklmnopqrstuvwxyz".match(pattern!.pattern)).toBeTruthy();
      expect("artifactory-token: AKC1234567890abcdef".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Artifactory tokens", () => {
      expect("AKC123".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("NEXUS_REPOSITORY_TOKEN", () => {
    const pattern = packageRegistryPatterns.find(
      (p) => p.name === "NEXUS_REPOSITORY_TOKEN",
    );

    it("should detect Nexus repository tokens", () => {
      expect(pattern).toBeTruthy();
      expect("nexus-token: 1234567890abcdef-1234-1234-1234".match(pattern!.pattern)).toBeTruthy();
      expect("nexus-password: secretpassword123456".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid Nexus tokens", () => {
      expect("nexus-token: abc".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const npmPattern = packageRegistryPatterns.find(
      (p) => p.name === "NPM_TOKEN",
    );

    expect("regular text".match(npmPattern!.pattern)).toBeFalsy();
  });
});
