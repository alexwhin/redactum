import { defineConfig } from "tsup";

export default defineConfig([
  // Main build
  {
    entry: {
      index: "src/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    shims: true,
    minify: false,
    treeshake: true,
    external: [],
    noExternal: [],
    platform: "node",
    target: "node18",
    esbuildOptions(options) {
      options.keepNames = true;
      options.metafile = true;
    },
    metafile: true,
  },
  // Provider builds - simplified architecture
  {
    entry: {
      "providers/base/index": "src/providers/base/index.ts",
      "providers/index": "src/providers/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    shims: true,
    minify: false,
    treeshake: true,
    external: [
      "@langchain/core",
      "llamaindex",
      "haystack-ai",
      "openai",
      "@anthropic-ai/sdk",
      "ai"
    ],
    noExternal: [],
    platform: "node",
    target: "node18",
    esbuildOptions(options) {
      options.keepNames = true;
    },
  },
]);