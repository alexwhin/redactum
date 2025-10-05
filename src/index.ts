export {
  redactum,
  redactumBatch,
  redactumFromConfig,
  createRedactum,
  redactumGetEnabledCategories,
  redactumGetEnabledPolicies,
  redactumGetPatterns,
  redactumGetAllPatterns,
} from "./core/redactum.js";

export { PolicyCategory, Policies } from "./types/index.js";
export type {
  RedactumOptions,
  RedactumResult,
  RedactumFinding,
  RedactumStats,
  Policy,
  PolicyName,
  RedactumConfig,
} from "./types/index.js";
export {
  POLICIES,
  DEFAULT_REPLACEMENT,
  DEFAULT_ENABLED_CATEGORIES,
} from "./constants.js";
export {
  redactumCalculateEntropy,
  redactumLooksLikeSecret,
} from "./utils/entropy.js";
export {
  redactumValidateOptions,
  redactumValidatePolicy,
} from "./utils/validation.js";

export { loadConfig, getConfig, clearConfigCache } from "./config/index.js";
export type {
  RedactionConfig,
  ConfigFile,
  ResolvedConfig,
  ConfigLoaderOptions,
  RedactionMode,
  CategoryConfig,
  HashAlgorithm,
} from "./config/types.js";
export { validateConfig } from "./config/validator.js";
export { mergeConfigs } from "./config/merger.js";
export { getDefaultConfig, CONFIG_FILE_NAMES } from "./config/defaults.js";

export * from "./providers/index.js";
