import type { PolicyCategory } from "../types/index.js";

export type RedactionMode = "mask" | "replace" | "remove" | "hash" | "encrypt";

export type HashAlgorithm = "sha256" | "sha512" | "md5" | "blake2b";

export interface CategoryConfig {
  enabled?: boolean;
  mode?: RedactionMode;
  replacement?: string;
  preserveLength?: boolean;
  preserveFormat?: boolean;
  customPattern?: string;
}

export interface RedactionConfig {
  mask?: string;
  replacement?: string;
  categories?: PolicyCategory[] | Record<PolicyCategory, boolean | CategoryConfig>;
  customPolicies?: Array<{
    name: string;
    pattern: string;
    flags?: string;
    replacement?: string;
    mode?: RedactionMode;
  }>;
  globalMode?: RedactionMode;
  preserveLength?: boolean;
  preserveFormat?: boolean;
  hashOptions?: {
    algorithm?: HashAlgorithm;
    salt?: string;
    encoding?: "hex" | "base64" | "base64url";
  };
  encryptOptions?: {
    algorithm?: string;
    key?: string;
    iv?: string;
  };
  performance?: {
    maximumInputSize?: number;
    timeout?: number;
    cachePatterns?: boolean;
    streamThreshold?: number;
  };
  security?: {
    preventRegexDos?: boolean;
    maximumPatternLength?: number;
    maximumCustomPatterns?: number;
    auditLog?: boolean;
  };
  locale?: string | string[];
  detectLanguage?: boolean;
}

export interface ConfigFile {
  $schema?: string;
  extends?: string | string[];
  env?: Record<string, RedactionConfig>;
  presets?: Record<string, RedactionConfig>;
  mask?: string;
  replacement?: string;
  categories?: PolicyCategory[] | Record<PolicyCategory, boolean | CategoryConfig>;
  customPolicies?: Array<{
    name: string;
    pattern: string;
    flags?: string;
    replacement?: string;
    mode?: RedactionMode;
  }>;
  globalMode?: RedactionMode;
  preserveLength?: boolean;
  preserveFormat?: boolean;
  hashOptions?: {
    algorithm?: HashAlgorithm;
    salt?: string;
    encoding?: "hex" | "base64" | "base64url";
  };
  encryptOptions?: {
    algorithm?: string;
    key?: string;
    iv?: string;
  };
  performance?: {
    maximumInputSize?: number;
    timeout?: number;
    cachePatterns?: boolean;
    streamThreshold?: number;
  };
  security?: {
    preventRegexDos?: boolean;
    maximumPatternLength?: number;
    maximumCustomPatterns?: number;
    auditLog?: boolean;
  };
  locale?: string | string[];
  detectLanguage?: boolean;
}

export interface ResolvedConfig extends Required<Omit<RedactionConfig, "categories" | "customPolicies" | "hashOptions" | "encryptOptions" | "performance" | "security">> {
  categories: Map<PolicyCategory, CategoryConfig & { enabled: boolean }>;
  customPolicies: Array<{
    name: string;
    pattern: RegExp;
    replacement: string;
    mode: RedactionMode;
  }>;
  hashOptions: Required<NonNullable<RedactionConfig["hashOptions"]>>;
  encryptOptions: NonNullable<RedactionConfig["encryptOptions"]>;
  performance: Required<NonNullable<RedactionConfig["performance"]>>;
  security: Required<NonNullable<RedactionConfig["security"]>>;
}

export interface ConfigLoaderOptions {
  configPath?: string;
  searchPaths?: string[];
  env?: string;
  preset?: string;
  stopOnFirstFound?: boolean;
  mergeExtends?: boolean;
  allowEnvironmentOverrides?: boolean;
}

export interface ConfigValidationError {
  path: string;
  message: string;
  value?: unknown;
}

export interface ConfigSource {
  type: "file" | "env" | "default" | "cli";
  path?: string;
  priority: number;
}