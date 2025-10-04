import type { RedactionConfig, ConfigValidationError, RedactionMode, HashAlgorithm, CategoryConfig } from "./types.js";
import { PolicyCategory } from "../types/index.js";

export interface ValidationResult {
  valid: boolean;
  errors: ConfigValidationError[];
}

const VALID_MODES: RedactionMode[] = ["mask", "replace", "remove", "hash", "encrypt"];
const VALID_HASH_ALGORITHMS: HashAlgorithm[] = ["sha256", "sha512", "md5", "blake2b"];
const VALID_CATEGORIES = Object.values(PolicyCategory);
const MAX_PATTERN_LENGTH = 1000;
const MAX_CUSTOM_PATTERNS = 100;
const MAX_INPUT_SIZE = 100 * 1024 * 1024;

export function validateConfig(config: RedactionConfig): ValidationResult {
  const errors: ConfigValidationError[] = [];

  if (config.mask !== undefined && typeof config.mask !== "string") {
    errors.push({
      path: "mask",
      message: "Mask must be a string",
      value: config.mask,
    });
  }

  if (config.replacement !== undefined && typeof config.replacement !== "string") {
    errors.push({
      path: "replacement",
      message: "Replacement must be a string",
      value: config.replacement,
    });
  }

  if (config.categories !== undefined) {
    validateCategories(config.categories, errors);
  }

  if (config.customPolicies !== undefined) {
    validateCustomPatterns(config.customPolicies, errors);
  }

  if (config.globalMode !== undefined && !VALID_MODES.includes(config.globalMode)) {
    errors.push({
      path: "globalMode",
      message: `Global mode must be one of: ${VALID_MODES.join(", ")}`,
      value: config.globalMode,
    });
  }

  if (config.preserveLength !== undefined && typeof config.preserveLength !== "boolean") {
    errors.push({
      path: "preserveLength",
      message: "Preserve length must be a boolean",
      value: config.preserveLength,
    });
  }

  if (config.preserveFormat !== undefined && typeof config.preserveFormat !== "boolean") {
    errors.push({
      path: "preserveFormat",
      message: "Preserve format must be a boolean",
      value: config.preserveFormat,
    });
  }

  if (config.hashOptions !== undefined) {
    validateHashOptions(config.hashOptions, errors);
  }

  if (config.encryptOptions !== undefined) {
    validateEncryptOptions(config.encryptOptions, errors);
  }

  if (config.performance !== undefined) {
    validatePerformanceOptions(config.performance, errors);
  }

  if (config.security !== undefined) {
    validateSecurityOptions(config.security, errors);
  }

  if (config.locale !== undefined) {
    validateLocale(config.locale, errors);
  }

  if (config.detectLanguage !== undefined && typeof config.detectLanguage !== "boolean") {
    errors.push({
      path: "detectLanguage",
      message: "Detect language must be a boolean",
      value: config.detectLanguage,
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateCategories(
  categories: RedactionConfig["categories"],
  errors: ConfigValidationError[]
): void {
  if (Array.isArray(categories)) {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      if (category && !VALID_CATEGORIES.includes(category)) {
        errors.push({
          path: `categories[${i}]`,
          message: `Invalid category: ${categories[i]}`,
          value: categories[i],
        });
      }
    }
  } else if (typeof categories === "object") {
    for (const [key, value] of Object.entries(categories) as [string, boolean | CategoryConfig][]) {
      const category = key as PolicyCategory;
      if (!VALID_CATEGORIES.includes(category)) {
        errors.push({
          path: `categories.${key}`,
          message: `Invalid category: ${key}`,
          value: key,
        });
        continue;
      }

      if (typeof value === "object" && value !== null) {
        if (value.enabled !== undefined && typeof value.enabled !== "boolean") {
          errors.push({
            path: `categories.${key}.enabled`,
            message: "Enabled must be a boolean",
            value: value.enabled,
          });
        }

        if (value.mode !== undefined && !VALID_MODES.includes(value.mode)) {
          errors.push({
            path: `categories.${key}.mode`,
            message: `Mode must be one of: ${VALID_MODES.join(", ")}`,
            value: value.mode,
          });
        }

        if (value.replacement !== undefined && typeof value.replacement !== "string") {
          errors.push({
            path: `categories.${key}.replacement`,
            message: "Replacement must be a string",
            value: value.replacement,
          });
        }

        if (value.preserveLength !== undefined && typeof value.preserveLength !== "boolean") {
          errors.push({
            path: `categories.${key}.preserveLength`,
            message: "Preserve length must be a boolean",
            value: value.preserveLength,
          });
        }

        if (value.preserveFormat !== undefined && typeof value.preserveFormat !== "boolean") {
          errors.push({
            path: `categories.${key}.preserveFormat`,
            message: "Preserve format must be a boolean",
            value: value.preserveFormat,
          });
        }

        if (value.customPattern !== undefined) {
          validateRegexPattern(value.customPattern, `categories.${key}.customPattern`, errors);
        }
      } else if (typeof value !== "boolean") {
        errors.push({
          path: `categories.${key}`,
          message: "Category value must be a boolean or configuration object",
          value,
        });
      }
    }
  } else {
    errors.push({
      path: "categories",
      message: "Categories must be an array or object",
      value: categories,
    });
  }
}

function validateCustomPatterns(
  patterns: NonNullable<RedactionConfig["customPolicies"]>,
  errors: ConfigValidationError[]
): void {
  if (!Array.isArray(patterns)) {
    errors.push({
      path: "customPolicies",
      message: "Custom patterns must be an array",
      value: patterns,
    });

    return;
  }

  if (patterns.length > MAX_CUSTOM_PATTERNS) {
    errors.push({
      path: "customPolicies",
      message: `Too many custom patterns. Maximum allowed: ${MAX_CUSTOM_PATTERNS}`,
      value: patterns.length,
    });
  }

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];

    if (!pattern?.name || typeof pattern.name !== "string") {
      errors.push({
        path: `customPolicies[${i}].name`,
        message: "Pattern name is required and must be a string",
        value: pattern?.name,
      });
    }

    if (!pattern?.pattern || typeof pattern.pattern !== "string") {
      errors.push({
        path: `customPolicies[${i}].pattern`,
        message: "Pattern is required and must be a string",
        value: pattern?.pattern,
      });
      continue;
    }
    
    validateRegexPattern(pattern.pattern, `customPolicies[${i}].pattern`, errors);

    if (pattern.flags !== undefined && typeof pattern.flags !== "string") {
      errors.push({
        path: `customPolicies[${i}].flags`,
        message: "Flags must be a string",
        value: pattern.flags,
      });
    }

    if (pattern.replacement !== undefined && typeof pattern.replacement !== "string") {
      errors.push({
        path: `customPolicies[${i}].replacement`,
        message: "Replacement must be a string",
        value: pattern.replacement,
      });
    }

    if (pattern.mode !== undefined && !VALID_MODES.includes(pattern.mode)) {
      errors.push({
        path: `customPolicies[${i}].mode`,
        message: `Mode must be one of: ${VALID_MODES.join(", ")}`,
        value: pattern.mode,
      });
    }
  }
}

function validateHashOptions(
  options: NonNullable<RedactionConfig["hashOptions"]>,
  errors: ConfigValidationError[]
): void {
  if (options.algorithm !== undefined && !VALID_HASH_ALGORITHMS.includes(options.algorithm)) {
    errors.push({
      path: "hashOptions.algorithm",
      message: `Hash algorithm must be one of: ${VALID_HASH_ALGORITHMS.join(", ")}`,
      value: options.algorithm,
    });
  }

  if (options.salt !== undefined && typeof options.salt !== "string") {
    errors.push({
      path: "hashOptions.salt",
      message: "Salt must be a string",
      value: options.salt,
    });
  }

  if (
    options.encoding !== undefined &&
    !["hex", "base64", "base64url"].includes(options.encoding)
  ) {
    errors.push({
      path: "hashOptions.encoding",
      message: "Encoding must be one of: hex, base64, base64url",
      value: options.encoding,
    });
  }
}

function validateEncryptOptions(
  options: NonNullable<RedactionConfig["encryptOptions"]>,
  errors: ConfigValidationError[]
): void {
  if (options.algorithm !== undefined && typeof options.algorithm !== "string") {
    errors.push({
      path: "encryptOptions.algorithm",
      message: "Algorithm must be a string",
      value: options.algorithm,
    });
  }

  if (options.key !== undefined && typeof options.key !== "string") {
    errors.push({
      path: "encryptOptions.key",
      message: "Key must be a string",
      value: options.key,
    });
  }

  if (options.iv !== undefined && typeof options.iv !== "string") {
    errors.push({
      path: "encryptOptions.iv",
      message: "IV must be a string",
      value: options.iv,
    });
  }
}

function validatePerformanceOptions(
  options: NonNullable<RedactionConfig["performance"]>,
  errors: ConfigValidationError[]
): void {
  if (options.maximumInputSize !== undefined) {
    if (typeof options.maximumInputSize !== "number" || options.maximumInputSize <= 0) {
      errors.push({
        path: "performance.maximumInputSize",
        message: "Maximum input size must be a positive number",
        value: options.maximumInputSize,
      });
    } else if (options.maximumInputSize > MAX_INPUT_SIZE) {
      errors.push({
        path: "performance.maximumInputSize",
        message: `Maximum input size cannot exceed ${MAX_INPUT_SIZE} bytes`,
        value: options.maximumInputSize,
      });
    }
  }

  if (options.timeout !== undefined) {
    if (typeof options.timeout !== "number" || options.timeout <= 0) {
      errors.push({
        path: "performance.timeout",
        message: "Timeout must be a positive number",
        value: options.timeout,
      });
    }
  }

  if (options.cachePatterns !== undefined && typeof options.cachePatterns !== "boolean") {
    errors.push({
      path: "performance.cachePatterns",
      message: "Cache patterns must be a boolean",
      value: options.cachePatterns,
    });
  }

  if (options.streamThreshold !== undefined) {
    if (typeof options.streamThreshold !== "number" || options.streamThreshold <= 0) {
      errors.push({
        path: "performance.streamThreshold",
        message: "Stream threshold must be a positive number",
        value: options.streamThreshold,
      });
    }
  }
}

function validateSecurityOptions(
  options: NonNullable<RedactionConfig["security"]>,
  errors: ConfigValidationError[]
): void {
  if (options.preventRegexDos !== undefined && typeof options.preventRegexDos !== "boolean") {
    errors.push({
      path: "security.preventRegexDos",
      message: "Prevent regex DOS must be a boolean",
      value: options.preventRegexDos,
    });
  }

  if (options.maximumPatternLength !== undefined) {
    if (typeof options.maximumPatternLength !== "number" || options.maximumPatternLength <= 0) {
      errors.push({
        path: "security.maximumPatternLength",
        message: "Maximum pattern length must be a positive number",
        value: options.maximumPatternLength,
      });
    } else if (options.maximumPatternLength > MAX_PATTERN_LENGTH) {
      errors.push({
        path: "security.maximumPatternLength",
        message: `Maximum pattern length cannot exceed ${MAX_PATTERN_LENGTH}`,
        value: options.maximumPatternLength,
      });
    }
  }

  if (options.maximumCustomPatterns !== undefined) {
    if (typeof options.maximumCustomPatterns !== "number" || options.maximumCustomPatterns <= 0) {
      errors.push({
        path: "security.maximumCustomPatterns",
        message: "Maximum custom patterns must be a positive number",
        value: options.maximumCustomPatterns,
      });
    } else if (options.maximumCustomPatterns > MAX_CUSTOM_PATTERNS) {
      errors.push({
        path: "security.maximumCustomPatterns",
        message: `Maximum custom patterns cannot exceed ${MAX_CUSTOM_PATTERNS}`,
        value: options.maximumCustomPatterns,
      });
    }
  }

  if (options.auditLog !== undefined && typeof options.auditLog !== "boolean") {
    errors.push({
      path: "security.auditLog",
      message: "Audit log must be a boolean",
      value: options.auditLog,
    });
  }
}

function validateLocale(
  locale: NonNullable<RedactionConfig["locale"]>,
  errors: ConfigValidationError[]
): void {
  const locales = Array.isArray(locale) ? locale : [locale];
  
  for (let i = 0; i < locales.length; i++) {
    const loc = locales[i];
    if (typeof loc !== "string") {
      errors.push({
        path: Array.isArray(locale) ? `locale[${i}]` : "locale",
        message: "Locale must be a string",
        value: loc,
      });
    } else if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(loc)) {
      errors.push({
        path: Array.isArray(locale) ? `locale[${i}]` : "locale",
        message: "Invalid locale format. Expected format: \"en\" or \"en-US\"",
        value: loc,
      });
    }
  }
}

function validateRegexPattern(
  pattern: string,
  path: string,
  errors: ConfigValidationError[]
): void {
  if (pattern.length > MAX_PATTERN_LENGTH) {
    errors.push({
      path,
      message: `Pattern length exceeds maximum of ${MAX_PATTERN_LENGTH} characters`,
      value: pattern.length,
    });

    return;
  }

  try {
    new RegExp(pattern);
  } catch (error) {
    errors.push({
      path,
      message: `Invalid regex pattern: ${error instanceof Error ? error.message : "Unknown error"}`,
      value: pattern,
    });
  }

  const catastrophicPatterns = [
    /(\w+\+)+/,
    /(\w+\*)+/,
    /(\w+){2,}\1+/,
    /(\w+\?)+/,
  ];

  for (const catastrophic of catastrophicPatterns) {
    if (catastrophic.test(pattern)) {
      errors.push({
        path,
        message: "Pattern may cause catastrophic backtracking (ReDoS vulnerability)",
        value: pattern,
      });
      break;
    }
  }
}