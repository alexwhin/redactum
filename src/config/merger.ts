import type { RedactionConfig, CategoryConfig, ConfigFile } from "./types.js";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PolicyCategory } from "../types/index.js";

type MergeableConfig = RedactionConfig & Partial<ConfigFile>;

export function mergeConfigs(
  base: MergeableConfig,
  override: MergeableConfig
): MergeableConfig {
  const result: MergeableConfig = { ...base };

  if (override.mask !== undefined) {
    result.mask = override.mask;
  }

  if (override.replacement !== undefined) {
    result.replacement = override.replacement;
  }

  if (override.categories !== undefined) {
    result.categories = mergeCategories(base.categories, override.categories);
  }

  if (override.customPolicies !== undefined) {
    result.customPolicies = mergeCustomPatterns(
      base.customPolicies,
      override.customPolicies
    );
  }

  if (override.globalMode !== undefined) {
    result.globalMode = override.globalMode;
  }

  if (override.preserveLength !== undefined) {
    result.preserveLength = override.preserveLength;
  }

  if (override.preserveFormat !== undefined) {
    result.preserveFormat = override.preserveFormat;
  }

  if (override.hashOptions !== undefined) {
    result.hashOptions = {
      ...(base.hashOptions || {}),
      ...override.hashOptions,
    };
  }

  if (override.encryptOptions !== undefined) {
    result.encryptOptions = {
      ...(base.encryptOptions || {}),
      ...override.encryptOptions,
    };
  }

  if (override.performance !== undefined) {
    result.performance = {
      ...(base.performance || {}),
      ...override.performance,
    };
  }

  if (override.security !== undefined) {
    result.security = {
      ...(base.security || {}),
      ...override.security,
    };
  }

  if (override.locale !== undefined) {
    result.locale = override.locale;
  }

  if (override.detectLanguage !== undefined) {
    result.detectLanguage = override.detectLanguage;
  }

  if (override.env !== undefined) {
    result.env = {
      ...(base.env || {}),
      ...override.env,
    };
  }

  if (override.presets !== undefined) {
    result.presets = {
      ...(base.presets || {}),
      ...override.presets,
    };
  }

  return result;
}

function mergeCategories(
  base?: RedactionConfig["categories"],
  override?: RedactionConfig["categories"]
): RedactionConfig["categories"] {
  if (!override) {
    return base;
  }
  if (!base) {
    return override;
  }

  if (Array.isArray(override)) {
    return override;
  }

  if (Array.isArray(base)) {
    const baseMap: Record<string, boolean> = {};
    for (const category of base) {
      baseMap[category] = true;
    }

    return { ...baseMap, ...override } as Record<
      PolicyCategory,
      boolean | CategoryConfig
    >;
  }

  const result: Record<PolicyCategory, boolean | CategoryConfig> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const category = key as PolicyCategory;

    if (typeof value === "boolean") {
      result[category] = value;
    } else if (typeof value === "object" && value !== null) {
      const baseValue = base[category];

      if (typeof baseValue === "object" && baseValue !== null) {
        result[category] = {
          ...baseValue,
          ...value,
        };
      } else {
        result[category] = value;
      }
    }
  }

  return result;
}

function mergeCustomPatterns(
  base?: RedactionConfig["customPolicies"],
  override?: RedactionConfig["customPolicies"]
): RedactionConfig["customPolicies"] {
  if (!override) {
    return base;
  }
  if (!base) {
    return override;
  }

  if (override.length === 0) {
    return [];
  }

  const patternMap = new Map<string, (typeof base)[0]>();

  for (const pattern of base) {
    patternMap.set(pattern.name, pattern);
  }

  for (const pattern of override) {
    patternMap.set(pattern.name, pattern);
  }

  return Array.from(patternMap.values());
}
