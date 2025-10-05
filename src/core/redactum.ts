import type {
  RedactumOptions,
  RedactumResult,
  RedactumFinding,
  RedactumStats,
  Policy,
  PolicyName,
  ExcludePattern,
} from "../types/index.js";
import { PolicyCategory } from "../types/index.js";
import {
  POLICIES,
  DEFAULT_REPLACEMENT,
} from "../constants.js";
import type { ResolvedConfig, ConfigLoaderOptions } from "../config/types.js";
import { getConfig } from "../config/index.js";
import { redactumValidatePolicy } from "../utils/validation.js";

type RedactorState = {
  patterns: Policy[];
  options: Required<RedactumOptions>;
  config?: ResolvedConfig;
};

const PRIORITY_MAP: Record<PolicyCategory, number> = {
  [PolicyCategory.PRIVATE_KEY]: 1,
  [PolicyCategory.AWS_KEY]: 2,
  [PolicyCategory.API_KEY]: 3,
  [PolicyCategory.DATABASE_CREDENTIALS]: 4,
  [PolicyCategory.DEV_SECRET]: 5,
  [PolicyCategory.FINANCIAL]: 6,
  [PolicyCategory.DIGITAL_IDENTITY]: 7,
  [PolicyCategory.EMAIL]: 8,
  [PolicyCategory.PHONE]: 9,
  [PolicyCategory.SSN]: 10,
  [PolicyCategory.GOVERNMENT_ID]: 11,
  [PolicyCategory.TAX_IDENTIFIER]: 12,
  [PolicyCategory.INSURANCE]: 13,
  [PolicyCategory.MEDICAL]: 14,
  [PolicyCategory.DEV_IDENTIFIER]: 16,
  [PolicyCategory.IP_ADDRESS]: 17,
  [PolicyCategory.VEHICLE]: 18,
  [PolicyCategory.EMPLOYEE_ID]: 19,
  [PolicyCategory.ADDRESS]: 20,
  [PolicyCategory.GEOGRAPHIC]: 21,
  [PolicyCategory.CLOUD_CREDENTIALS]: 22,
  [PolicyCategory.CI_CD_SECRETS]: 23,
  [PolicyCategory.PACKAGE_REGISTRY]: 24,
  [PolicyCategory.MONITORING_SECRETS]: 25,
  [PolicyCategory.AUTH_SECRETS]: 26,
  [PolicyCategory.MESSAGING_SECRETS]: 27,
  [PolicyCategory.WEBHOOK_URLS]: 28,
  [PolicyCategory.ENCRYPTION_KEYS]: 29,
  [PolicyCategory.CONTAINER_REGISTRY]: 30,
  [PolicyCategory.INFRASTRUCTURE_SECRETS]: 31,
  [PolicyCategory.CUSTOM]: 32,
};

function normalizeOptions(options: RedactumOptions): Required<RedactumOptions> {
  return {
    policies: options.policies ?? (POLICIES.map(p => p.name) as PolicyName[]),
    customPolicies: options.customPolicies ?? [],
    replacement: options.replacement ?? DEFAULT_REPLACEMENT,
    preserveLength: options.preserveLength ?? false,
    excludePatterns: options.excludePatterns ?? [],
  };
}

function buildPatterns(options: Required<RedactumOptions>): Policy[] {
  const enabledPatterns = POLICIES.filter((pattern) =>
    (options.policies as readonly string[]).includes(pattern.name)
  );

  return [...enabledPatterns, ...options.customPolicies];
}

function createState(options: RedactumOptions = {}): RedactorState {
  const normalizedOptions = normalizeOptions(options);

  return {
    patterns: buildPatterns(normalizedOptions),
    options: normalizedOptions,
  };
}

async function createStateFromConfig(configOptions?: ConfigLoaderOptions): Promise<RedactorState> {
  const config = await getConfig(configOptions);

  return applyConfig(createState(), config);
}

function applyConfig(_state: RedactorState, config: ResolvedConfig): RedactorState {
  const enabledPolicies: PolicyName[] = [];
  config.categories.forEach((categoryConfig, category) => {
    if (categoryConfig.enabled) {
      const policiesInCategory = POLICIES.filter(p => p.category === category).map(p => p.name as PolicyName);
      enabledPolicies.push(...policiesInCategory);
    }
  });

  const customPolicies: Policy[] = config.customPolicies.map(cp => ({
    name: cp.name,
    pattern: cp.pattern,
    replacement: cp.replacement,
    category: PolicyCategory.CUSTOM,
  }));

  const newOptions: Required<RedactumOptions> = {
    policies: enabledPolicies.length > 0 ? enabledPolicies : POLICIES.map(p => p.name) as PolicyName[],
    customPolicies,
    replacement: config.replacement,
    preserveLength: config.preserveLength,
    excludePatterns: [],
  };

  return {
    patterns: buildPatterns(newOptions),
    options: newOptions,
    config,
  };
}

function expandBackreferences(replacement: string, match: RegExpMatchArray): string {
  return replacement.replace(/\$(\d+)/g, (_, groupNum) => {
    const index = parseInt(groupNum, 10);

    return match[index] ?? "";
  });
}

function isExcluded(
  text: string,
  policyName: PolicyName,
  excludePatterns: ExcludePattern[]
): boolean {
  return excludePatterns.some((excludePattern: ExcludePattern) => {
    if (!excludePattern.policies || excludePattern.policies.length === 0) {
      return excludePattern.pattern.test(text);
    }

    if (excludePattern.policies.includes(policyName)) {
      return excludePattern.pattern.test(text);
    }

    return false;
  });
}

function getReplacement(
  match: RegExpMatchArray,
  pattern: Policy,
  options: Required<RedactumOptions>,
  config?: ResolvedConfig
): string {
  const matchedText = match[0];

  if (config) {
    const categoryConfig = config.categories.get(pattern.category);
    if (categoryConfig?.replacement) {
      if (categoryConfig.mode === "mask") {
        return config.mask.repeat(matchedText.length);
      }

      return expandBackreferences(categoryConfig.replacement, match);
    }
  }

  if (typeof options.replacement === "function") {
    return options.replacement(matchedText, pattern.category);
  }

  let baseReplacement: string;
  if (options.replacement !== DEFAULT_REPLACEMENT) {
    baseReplacement = options.replacement;
  } else {
    baseReplacement = pattern.replacement ?? options.replacement;
  }

  baseReplacement = expandBackreferences(baseReplacement, match);

  if (options.preserveLength) {
    const targetLength = matchedText.length;
    const baseLength = baseReplacement.length;

    if (targetLength <= baseLength) {
      return baseReplacement.substring(0, targetLength);
    }

    return baseReplacement + "*".repeat(targetLength - baseLength);
  }

  return baseReplacement;
}

function calculateStats(
  findings: RedactumFinding[],
  startTime: number
): RedactumStats {
  const findingsByCategory = findings.reduce((acc, finding) => {
    acc[finding.category] = (acc[finding.category] ?? 0) + 1;

    return acc;
  }, {} as Record<PolicyCategory, number>);

  return {
    totalFindings: findings.length,
    findingsByCategory,
    processingTimeMs: Date.now() - startTime,
  };
}

/**
 * Redacts sensitive information from text using built-in and custom policies.
 *
 * @public
 * @param text - The input text to redact
 * @param options - Configuration options for redaction behavior
 * @returns Result object containing the redacted text, findings, and statistics
 * @example
 * ```typescript
 * const result = redactum("Email: john@example.com");
 * console.log(result.redactedText);
 * ```
 * @example
 * ```typescript
 * const result = redactum("SSN: 123-45-6789", {
 *   replacement: "***",
 *   preserveLength: true
 * });
 * ```
 */
export function redactum(text: string, options: RedactumOptions = {}): RedactumResult {
  const state = createState(options);

  return redactWithState(text, state);
}

function redactWithState(text: string, state: RedactorState): RedactumResult {
  const startTime = Date.now();
  const findings: RedactumFinding[] = [];
  let redactedText = text;

  const sortedPatterns = [...state.patterns].sort(
    (a, b) =>
      (PRIORITY_MAP[a.category] ?? 99) -
      (PRIORITY_MAP[b.category] ?? 99)
  );

  const redactedRanges: Array<{ start: number; end: number }> = [];

  for (const pattern of sortedPatterns) {
    const matches = [...text.matchAll(pattern.pattern)];

    for (const match of matches) {
      if (match.index === undefined) {
        continue;
      }

      const start = match.index;
      const end = start + match[0].length;

      const overlaps = redactedRanges.some(
        (range) =>
          (start >= range.start && start < range.end) ||
          (end > range.start && end <= range.end) ||
          (start <= range.start && end >= range.end)
      );

      if (overlaps || isExcluded(match[0], pattern.name as PolicyName, state.options.excludePatterns)) {
        continue;
      }

      const replacement = getReplacement(match, pattern, state.options, state.config);

      findings.push({
        category: pattern.category,
        policyName: pattern.name,
        value: match[0],
        match: match[0],
        start,
        end,
        replacement,
      });

      redactedRanges.push({ start, end });
    }
  }

  findings.sort((a, b) => b.start - a.start);

  for (const finding of findings) {
    redactedText =
      redactedText.substring(0, finding.start) +
      finding.replacement +
      redactedText.substring(finding.end);
  }

  const stats = calculateStats(findings, startTime);

  return {
    text,
    redactedText,
    findings: findings.reverse(),
    stats,
  };
}

/**
 * Returns the list of enabled policy names based on the provided options.
 *
 * @public
 * @param options - Configuration options to determine which policies are enabled
 * @returns Array of enabled policy names
 * @example
 * ```typescript
 * const policies = redactumGetEnabledPolicies({
 *   policies: ["EMAIL_ADDRESS", "PHONE_NUMBER_US"]
 * });
 * console.log(policies);
 * ```
 */
export function redactumGetEnabledPolicies(options: RedactumOptions = {}): PolicyName[] {
  const state = createState(options);

  return [...state.options.policies];
}

/**
 * Returns the list of enabled policy categories based on the provided options.
 *
 * @public
 * @param options - Configuration options to determine which categories are enabled
 * @returns Array of enabled policy categories
 * @example
 * ```typescript
 * const categories = redactumGetEnabledCategories({
 *   policies: ["EMAIL_ADDRESS", "PHONE_NUMBER_US", "PHONE_NUMBER_UK"]
 * });
 * console.log(categories);
 * ```
 */
export function redactumGetEnabledCategories(options: RedactumOptions = {}): PolicyCategory[] {
  const state = createState(options);
  const enabledCategories = new Set<PolicyCategory>();
  for (const policyName of state.options.policies) {
    const policy = POLICIES.find(p => p.name === policyName);
    if (policy) {
      enabledCategories.add(policy.category);
    }
  }

  return Array.from(enabledCategories);
}

/**
 * Returns the complete list of patterns (built-in and custom) that will be used for redaction.
 *
 * @public
 * @param options - Configuration options to determine which patterns are included
 * @returns Array of policy patterns
 * @example
 * ```typescript
 * const patterns = redactumGetPatterns({
 *   policies: ["EMAIL_ADDRESS"],
 *   customPolicies: [{
 *     name: "EMPLOYEE_ID",
 *     pattern: /EMP-\d{6}/g,
 *     category: PolicyCategory.CUSTOM
 *   }]
 * });
 * ```
 */
export function redactumGetPatterns(options: RedactumOptions = {}): Policy[] {
  const state = createState(options);

  return [...state.patterns];
}

/**
 * Redacts text using configuration loaded from a file.
 *
 * @public
 * @param text - The input text to redact
 * @param configOptions - Options for loading the configuration file
 * @returns Promise resolving to result object with redacted text, findings, and statistics
 * @example
 * ```typescript
 * const result = await redactumFromConfig("Email: john@example.com", {
 *   configPath: "./redactum.config.json"
 * });
 * ```
 */
export async function redactumFromConfig(
  text: string,
  configOptions?: ConfigLoaderOptions
): Promise<RedactumResult> {
  const state = await createStateFromConfig(configOptions);

  return redactWithState(text, state);
}

/**
 * Redacts multiple texts efficiently using the same configuration.
 *
 * @public
 * @param texts - Array of input texts to redact
 * @param options - Configuration options for redaction behavior
 * @returns Array of result objects, one for each input text
 * @example
 * ```typescript
 * const messages = [
 *   "Support ticket from sarah.chen@company.io",
 *   "Customer callback: +44 20 7946 0958"
 * ];
 * const results = redactumBatch(messages);
 * const redactedMessages = results.map(r => r.redactedText);
 * ```
 */
export function redactumBatch(texts: string[], options?: RedactumOptions): RedactumResult[] {
  return texts.map(text => redactum(text, options));
}

/**
 * Returns all 180+ built-in policies available in Redactum.
 *
 * @public
 * @returns Array of all built-in policy patterns
 * @example
 * ```typescript
 * const allPatterns = redactumGetAllPatterns();
 * console.log(`Total patterns: ${allPatterns.length}`);
 * ```
 */
export function redactumGetAllPatterns(): Policy[] {
  return [...POLICIES];
}

/**
 * Stateful redactor instance with methods for managing custom patterns and options.
 *
 * @public
 */
export type RedactumInstance = {
  /**
   * Redact text using the instance's configuration.
   * @param text - The input text to redact
   * @returns Result object containing the redacted text, findings, and statistics
   */
  redactum: (text: string) => RedactumResult;

  /**
   * Add a custom pattern to the instance.
   * @param pattern - The custom policy pattern to add
   */
  addCustomPattern: (pattern: Policy) => void;

  /**
   * Remove a custom pattern from the instance.
   * @param name - The name of the pattern to remove
   * @returns True if the pattern was removed, false if it didn't exist
   */
  removeCustomPattern: (name: string) => boolean;

  /**
   * Update the instance's options.
   * @param options - Partial options to merge with current configuration
   */
  updateOptions: (options: Partial<RedactumOptions>) => void;

  /**
   * Get all patterns (built-in and custom) for the instance.
   * @returns Array of policy patterns
   */
  getPatterns: () => Policy[];

  /**
   * Get enabled categories for the instance.
   * @returns Array of enabled policy categories
   */
  getEnabledCategories: () => PolicyCategory[];
};

/**
 * Creates a stateful redactor instance with methods for managing custom patterns and options.
 *
 * @public
 * @param options - Initial configuration options
 * @returns Redactor instance with methods for redaction and configuration management
 * @example
 * ```typescript
 * const redactor = createRedactum({
 *   policies: ["EMAIL_ADDRESS", "PHONE_NUMBER_US"]
 * });
 *
 * redactor.addCustomPattern({
 *   name: "EMPLOYEE_ID",
 *   pattern: /EMP-\d{6}/g,
 *   category: PolicyCategory.CUSTOM
 * });
 *
 * const result = redactor.redactum("Employee EMP-123456 email: john@example.com");
 * ```
 */
export function createRedactum(options?: RedactumOptions): RedactumInstance {
  let currentOptions = options || {};
  const localCustomPatterns: Map<string, Policy> = new Map();

  const getMergedOptions = (): RedactumOptions => {
    const allCustomPatterns = [
      ...(currentOptions.customPolicies || []),
      ...Array.from(localCustomPatterns.values())
    ];

    return {
      ...currentOptions,
      customPolicies: allCustomPatterns
    };
  };

  return {
    redactum: (text: string) => redactum(text, getMergedOptions()),
    addCustomPattern: (pattern: Policy) => {
      redactumValidatePolicy(pattern);
      localCustomPatterns.set(pattern.name, pattern);
    },
    removeCustomPattern: (name: string) => localCustomPatterns.delete(name),
    updateOptions: (newOptions: Partial<RedactumOptions>) => {
      currentOptions = { ...currentOptions, ...newOptions };
    },
    getPatterns: () => redactumGetPatterns(getMergedOptions()),
    getEnabledCategories: () => redactumGetEnabledCategories(getMergedOptions())
  };
}
