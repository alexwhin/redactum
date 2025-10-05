import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { promises as fs } from "fs";
import { ConfigLoader, loadConfig } from "../../src/config/loader.js";
import type { ConfigFile } from "../../src/config/types.js";
import { PolicyCategory } from "../../src/types/index.js";

vi.mock("fs", () => ({
  promises: {
    readFile: vi.fn(),
    access: vi.fn(),
  },
}));

vi.mock("yaml", () => ({
  parse: vi.fn(),
}));

describe("ConfigLoader", () => {
  const mockFs = fs as unknown as {
    readFile: ReturnType<typeof vi.fn>;
    access: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {};
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("loadConfigFile", () => {
    it("should load JSON config files", async () => {
      const mockConfig: ConfigFile = {
        mask: "#",
        replacement: "[HIDDEN]",
        categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
      };

      mockFs.readFile.mockResolvedValue(JSON.stringify(mockConfig));

      const loader = new ConfigLoader();
      const config = await loader["loadConfigFile"]("config.json");

      expect(config).toEqual(mockConfig);
      expect(mockFs.readFile).toHaveBeenCalledWith(
        expect.stringContaining("config.json"),
        "utf-8"
      );
    });

    it("should load YAML config files", async () => {
      const mockYamlContent = `
mask: "#"
replacement: "[HIDDEN]"
categories:
  - EMAIL
  - PHONE
`;
      const mockConfig: ConfigFile = {
        mask: "#",
        replacement: "[HIDDEN]",
        categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
      };

      mockFs.readFile.mockResolvedValue(mockYamlContent);
      const { parse } = await import("yaml");
      (parse as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
        mockConfig
      );

      const loader = new ConfigLoader();
      const config = await loader["loadConfigFile"]("config.yaml");

      expect(config).toEqual(mockConfig);
      expect(mockFs.readFile).toHaveBeenCalledWith(
        expect.stringContaining("config.yaml"),
        "utf-8"
      );
    });

    it.skip("should load JavaScript config files", async () => {});

    it("should cache loaded configurations", async () => {
      const mockConfig: ConfigFile = {
        mask: "#",
      };

      mockFs.readFile.mockResolvedValue(JSON.stringify(mockConfig));

      const loader = new ConfigLoader();
      const config1 = await loader["loadConfigFile"]("config.json");
      const config2 = await loader["loadConfigFile"]("config.json");

      expect(config1).toBe(config2);
      expect(mockFs.readFile).toHaveBeenCalledTimes(1);
    });

    it("should throw error for unsupported file formats", async () => {
      const loader = new ConfigLoader();

      await expect(loader["loadConfigFile"]("config.txt")).rejects.toThrow(
        "Unsupported config file format: txt"
      );
    });
  });

  describe("loadEnvironmentConfig", () => {
    it("should load configuration from environment variables", () => {
      process.env["REDACTUM_MASK"] = "X";
      process.env["REDACTUM_REPLACEMENT"] = "[REMOVED]";
      process.env["REDACTUM_CATEGORIES"] = "EMAIL,PHONE,SSN";
      process.env["REDACTUM_MODE"] = "hash";
      process.env["REDACTUM_PRESERVE_LENGTH"] = "true";
      process.env["REDACTUM_PRESERVE_FORMAT"] = "false";
      process.env["REDACTUM_LOCALE"] = "en,es";
      process.env["REDACTUM_DETECT_LANGUAGE"] = "true";

      const loader = new ConfigLoader({ allowEnvironmentOverrides: true });
      const config = loader["loadEnvironmentConfig"]();

      expect(config).toEqual({
        mask: "X",
        replacement: "[REMOVED]",
        categories: ["EMAIL", "PHONE", "SSN"],
        globalMode: "hash",
        preserveLength: true,
        preserveFormat: false,
        locale: ["en", "es"],
        detectLanguage: true,
      });
    });

    it("should return undefined when environment overrides are disabled", () => {
      process.env["REDACTUM_MASK"] = "X";

      const loader = new ConfigLoader({ allowEnvironmentOverrides: false });
      const config = loader["loadEnvironmentConfig"]();

      expect(config).toBeUndefined();
    });

    it("should return undefined when no environment variables are set", () => {
      const loader = new ConfigLoader({ allowEnvironmentOverrides: true });
      const config = loader["loadEnvironmentConfig"]();

      expect(config).toBeUndefined();
    });
  });

  describe("findAndLoadConfig", () => {
    it("should find config file in search paths", async () => {
      const mockConfig: ConfigFile = { mask: "#" };

      mockFs.access.mockImplementation((path) => {
        if ((path as string).includes("/path1/")) {
          return Promise.reject(new Error("Not found"));
        }

        return Promise.resolve(undefined);
      });
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockConfig));

      const loader = new ConfigLoader({
        searchPaths: ["/path1", "/path2"],
        stopOnFirstFound: true,
      });

      const config = await loader["findAndLoadConfig"]();

      expect(config).toEqual(mockConfig);
    });

    it("should use custom config path if provided", async () => {
      const mockConfig: ConfigFile = { mask: "#" };
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockConfig));

      const loader = new ConfigLoader({
        configPath: "/custom/config.json",
      });

      const config = await loader["findAndLoadConfig"]();

      expect(config).toEqual(mockConfig);
      expect(mockFs.readFile).toHaveBeenCalledWith(
        expect.stringContaining("/custom/config.json"),
        "utf-8"
      );
    });

    it("should stop on first found config when stopOnFirstFound is true", async () => {
      const mockConfig: ConfigFile = { mask: "#" };

      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockConfig));

      const loader = new ConfigLoader({
        searchPaths: ["/path1", "/path2"],
        stopOnFirstFound: true,
      });

      await loader["findAndLoadConfig"]();

      expect(mockFs.access).toHaveBeenCalledTimes(1);
    });

    it("should return undefined when no config file is found", async () => {
      mockFs.access.mockRejectedValue(new Error("Not found"));

      const loader = new ConfigLoader({
        searchPaths: ["/path1"],
      });

      const config = await loader["findAndLoadConfig"]();

      expect(config).toBeUndefined();
    });
  });

  describe("resolveExtends", () => {
    it("should resolve single extends", async () => {
      const baseConfig: ConfigFile = {
        mask: "*",
        replacement: "[BASE]",
      };

      const childConfig: ConfigFile = {
        extends: "./base.json",
        replacement: "[CHILD]",
      };

      mockFs.readFile
        .mockResolvedValueOnce(JSON.stringify(baseConfig))
        .mockResolvedValueOnce(JSON.stringify(childConfig));

      const loader = new ConfigLoader({ mergeExtends: true });

      vi.spyOn(loader as any, "loadConfigFile").mockImplementation((path) => {
        if ((path as string).includes("base.json")) {
          return Promise.resolve(baseConfig);
        }

        return Promise.resolve(childConfig);
      });

      const resolved = await loader["resolveExtends"](childConfig);

      expect(resolved).toEqual({
        mask: "*",
        replacement: "[CHILD]",
      });
    });

    it("should resolve multiple extends in order", async () => {
      const base1: ConfigFile = {
        mask: "*",
        replacement: "[BASE1]",
        preserveLength: true,
      };

      const base2: ConfigFile = {
        replacement: "[BASE2]",
        preserveFormat: true,
      };

      const childConfig: ConfigFile = {
        extends: ["./base1.json", "./base2.json"],
        replacement: "[CHILD]",
      };

      const loader = new ConfigLoader({ mergeExtends: true });

      vi.spyOn(loader as any, "loadConfigFile").mockImplementation((path) => {
        if ((path as string).includes("base1.json")) {
          return Promise.resolve(base1);
        }
        if ((path as string).includes("base2.json")) {
          return Promise.resolve(base2);
        }

        return Promise.resolve(childConfig);
      });

      const resolved = await loader["resolveExtends"](childConfig);

      expect(resolved).toEqual({
        mask: "*",
        replacement: "[CHILD]",
        preserveLength: true,
        preserveFormat: true,
      });
    });

    it("should handle preset extends", async () => {
      const childConfig: ConfigFile = {
        extends: "@redactum/strict",
      };

      const presetConfig: ConfigFile = {
        categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
        preserveLength: false,
      };

      const loader = new ConfigLoader({ mergeExtends: true });

      vi.spyOn(loader as any, "loadConfigFile").mockImplementation((path) => {
        if ((path as string).includes("presets/strict.json")) {
          return Promise.resolve(presetConfig);
        }

        return Promise.resolve(childConfig);
      });

      const resolved = await loader["resolveExtends"](childConfig);

      expect(resolved).toEqual({
        categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
        preserveLength: false,
      });
    });

    it("should return config as-is when mergeExtends is false", async () => {
      const config: ConfigFile = {
        extends: "./base.json",
        mask: "#",
      };

      const loader = new ConfigLoader({ mergeExtends: false });
      const resolved = await loader["resolveExtends"](config);

      expect(resolved).toEqual(config);
    });
  });

  describe("applyEnvironmentAndPresets", () => {
    it("should apply preset configuration", () => {
      const config: ConfigFile = {
        mask: "*",
        presets: {
          strict: {
            categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
            preserveLength: false,
          },
          moderate: {
            categories: [PolicyCategory.EMAIL],
            preserveLength: true,
          },
        },
      };

      const loader = new ConfigLoader({ preset: "strict" });
      const result = loader["applyEnvironmentAndPresets"](config);

      expect(result).toEqual({
        mask: "*",
        categories: [PolicyCategory.EMAIL, PolicyCategory.PHONE],
        preserveLength: false,
        presets: config.presets,
      });
    });

    it("should apply environment-specific configuration", () => {
      const config: ConfigFile = {
        mask: "*",
        env: {
          production: {
            preserveLength: false,
            security: {
              auditLog: true,
            },
          },
          development: {
            preserveLength: true,
            security: {
              auditLog: false,
            },
          },
        },
      };

      const loader = new ConfigLoader({ env: "production" });
      const result = loader["applyEnvironmentAndPresets"](config);

      expect(result).toEqual({
        mask: "*",
        preserveLength: false,
        security: {
          auditLog: true,
        },
        env: config.env,
      });
    });

    it("should apply environment variables last", () => {
      process.env["REDACTUM_MASK"] = "ENV";

      const config: ConfigFile = {
        mask: "CONFIG",
        presets: {
          test: {
            mask: "PRESET",
          },
        },
      };

      const loader = new ConfigLoader({
        preset: "test",
        allowEnvironmentOverrides: true,
      });
      const result = loader["applyEnvironmentAndPresets"](config);

      expect(result.mask).toBe("ENV");
    });
  });

  describe("load", () => {
    it("should return fully resolved configuration", async () => {
      const mockConfig: ConfigFile = {
        categories: [PolicyCategory.EMAIL],
      };

      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(JSON.stringify(mockConfig));

      const config = await loadConfig();

      expect(config).toMatchObject({
        mask: "*",
        replacement: "[REDACTED]",
        globalMode: "replace",
        preserveLength: false,
        preserveFormat: false,
        locale: "en",
        detectLanguage: false,
      });

      expect(config.categories).toBeInstanceOf(Map);
      const emailCategory = config.categories.get(PolicyCategory.EMAIL);
      expect(emailCategory).toBeDefined();
      expect(emailCategory?.enabled).toBe(true);
    });

    it("should handle missing config file gracefully", async () => {
      mockFs.access.mockRejectedValue(new Error("Not found"));

      const config = await loadConfig();

      expect(config).toMatchObject({
        mask: "*",
        replacement: "[REDACTED]",
        globalMode: "replace",
      });
    });
  });
});
