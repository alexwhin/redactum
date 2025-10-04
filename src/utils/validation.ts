import type { Policy, RedactumOptions } from "../types/index.js";
import { PolicyCategory } from "../types/index.js";
import { POLICIES } from "../constants.js";

/**
 * Validates Redactum configuration options.
 *
 * @public
 * @param options - The options object to validate
 * @throws Error if options are invalid
 * @example
 * ```typescript
 * redactumValidateOptions({
 *   policies: ["EMAIL_ADDRESS", "SSN"],
 *   replacement: "***"
 * });
 * ```
 */
export function redactumValidateOptions(options: RedactumOptions): void {
  if (options.policies) {
    const validPolicyNames = POLICIES.map(p => p.name);
    for (const policyName of options.policies) {
      if (!validPolicyNames.includes(policyName as string)) {
        throw new Error(`Invalid policy name: ${policyName}`);
      }
    }
  }

  if (options.customPolicies) {
    for (const pattern of options.customPolicies) {
      redactumValidatePolicy(pattern);
    }
  }

  if (options.replacement !== undefined) {
    if (
      typeof options.replacement !== "string" &&
      typeof options.replacement !== "function"
    ) {
      throw new Error("Replacement must be a string or function");
    }
  }

  if (options.excludePatterns) {
    const validPolicyNames = POLICIES.map(p => p.name);
    for (const excludePattern of options.excludePatterns) {
      if (!(excludePattern.pattern instanceof RegExp)) {
        throw new Error("Exclude pattern must have a valid RegExp pattern");
      }

      if (excludePattern.policies) {
        if (!Array.isArray(excludePattern.policies)) {
          throw new Error("Exclude pattern policies must be an array");
        }

        for (const policyName of excludePattern.policies) {
          if (!validPolicyNames.includes(policyName as string)) {
            throw new Error(`Invalid policy name in exclude pattern: ${policyName}`);
          }
        }
      }
    }
  }
}

/**
 * Validates a custom policy pattern.
 *
 * @public
 * @param pattern - The policy pattern to validate
 * @throws Error if the pattern is invalid
 * @example
 * ```typescript
 * redactumValidatePolicy({
 *   name: "EMPLOYEE_ID",
 *   pattern: /EMP-\d{6}/g,
 *   category: PolicyCategory.CUSTOM
 * });
 * ```
 */
export function redactumValidatePolicy(pattern: Policy): void {
  if (!pattern.name || typeof pattern.name !== "string") {
    throw new Error("Pattern must have a valid name");
  }

  if (!(pattern.pattern instanceof RegExp)) {
    throw new Error(
      `Pattern "${pattern.name}" must have a valid RegExp pattern`
    );
  }

  if (!Object.values(PolicyCategory).includes(pattern.category)) {
    throw new Error(
      `Pattern "${pattern.name}" has invalid category: ${pattern.category}`
    );
  }

  if (
    pattern.replacement !== undefined &&
    typeof pattern.replacement !== "string"
  ) {
    throw new Error(`Pattern "${pattern.name}" replacement must be a string`);
  }
}
