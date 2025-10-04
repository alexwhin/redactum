import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "coverage/**",
        "dist/**",
        "node_modules/**",
        "tests/test-helpers.ts",
        "**/*.d.ts",
        "**/*.config.*",
        "**/__mocks__/**",
        "src/cli.ts",
        "examples/**",
        "**/*.mjs",
        "**/demo/**",
        "src/providers/base/types.ts",
        "docs/**",
        "scripts/**"
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    setupFiles: ["./vitest.setup.ts"],
    reporters: process.env["CI"] ? ["default", "junit"] : ["default"],
    outputFile: {
      junit: "test-results.junit.xml",
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});