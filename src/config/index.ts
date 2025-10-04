export type {
  RedactionConfig,
  ConfigFile,
  ResolvedConfig,
  ConfigLoaderOptions,
  RedactionMode,
  CategoryConfig,
  HashAlgorithm,
  ConfigValidationError,
  ConfigSource,
} from "./types.js";
export { ConfigValidationError as ConfigValidationException } from "./loader.js";
export { loadConfig } from "./loader.js";
export * from "./defaults.js";
export * from "./validator.js";
export * from "./merger.js";

import type { ConfigLoaderOptions, ResolvedConfig } from "./types.js";

let cachedConfig: ResolvedConfig | null = null;

/**
 * Loads and caches Redactum configuration from files or defaults.
 *
 * @public
 * @param options - Options for loading configuration
 * @returns Promise resolving to the resolved configuration
 * @example
 * ```typescript
 * const config = await getConfig({
 *   configPath: "./redactum.config.json"
 * });
 * ```
 */
export async function getConfig(
  options?: ConfigLoaderOptions
): Promise<ResolvedConfig> {
  if (!cachedConfig || options) {
    const { loadConfig: load } = await import("./loader.js");
    cachedConfig = await load(options);
  }

  return cachedConfig;
}

/**
 * Clears the cached configuration, forcing a reload on next access.
 *
 * @public
 * @example
 * ```typescript
 * clearConfigCache();
 * const newConfig = await getConfig();
 * ```
 */
export function clearConfigCache(): void {
  cachedConfig = null;
}
