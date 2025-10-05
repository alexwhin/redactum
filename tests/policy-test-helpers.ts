import { expect, it } from "vitest";
import { redactum } from "../src/core/redactum.js";
import { POLICIES } from "../src/constants.js";
import { exampleMap } from "../scripts/generate-documentation.js";
import type {
  PolicyName,
  RedactumOptions,
  PolicyCategory,
} from "../src/types/index.js";

/**
 * Configuration for testing a policy's pattern matching and redaction behavior.
 *
 * @public
 */
export interface PolicyTestSuite {
  policyName: PolicyName;
  replacement: string;
  shouldMatch: string[];
  shouldNotMatch: string[];
}

/**
 * Generates comprehensive tests for a policy's pattern matching and redaction behavior.
 *
 * This function creates four types of tests for each test case:
 * 1. Pattern matching tests for strings that should match
 * 2. Redaction tests for strings that should be redacted
 * 3. Pattern matching tests for strings that should not match
 * 4. Redaction tests for strings that should not be redacted
 *
 * @param suite - The test suite configuration
 *
 * @example
 * ```ts
 * testPolicySuite({
 *   policyName: "EMAIL_ADDRESS",
 *   replacement: "[EMAIL]",
 *   shouldMatch: ["john@example.com"],
 *   shouldNotMatch: ["not-an-email"]
 * });
 * ```
 *
 * @public
 */
export function testPolicySuite(suite: PolicyTestSuite): void {
  const policy = POLICIES.find((p) => p.name === suite.policyName);

  if (!policy) {
    throw new Error(`Policy ${suite.policyName} not found`);
  }

  const config: RedactumOptions = { policies: [suite.policyName] };

  suite.shouldMatch.forEach((text) => {
    const truncated = text.substring(0, 50);
    const ellipsis = text.length > 50 ? "..." : "";
    const testLabel = `${truncated}${ellipsis}`;

    it(`should match "${testLabel}"`, () => {
      expect(
        text.match(policy.pattern),
        `Expected pattern to match "${text}"`
      ).toBeTruthy();
    });

    it(`should redact "${testLabel}"`, () => {
      const result = redactum(text, config);

      expect(
        result.redactedText.includes(suite.replacement),
        `Expected "${text}" to be redacted to include "${suite.replacement}". Got: "${result.redactedText}"`
      ).toBe(true);
      expect(
        result.findings.some((f) => f.policyName === suite.policyName),
        `Expected policy ${suite.policyName} to be found in findings`
      ).toBe(true);
    });
  });

  suite.shouldNotMatch.forEach((text) => {
    const truncated = text.substring(0, 50);
    const ellipsis = text.length > 50 ? "..." : "";
    const testLabel = `${truncated}${ellipsis}`;

    it(`should not match "${testLabel}"`, () => {
      expect(
        text.match(policy.pattern),
        `Expected pattern to NOT match "${text}"`
      ).toBeFalsy();
    });

    it(`should not redact "${testLabel}"`, () => {
      const result = redactum(text, config);

      expect(
        result.redactedText,
        `Expected "${text}" to NOT be redacted. Got: "${result.redactedText}"`
      ).toBe(text);
    });
  });
}

/**
 * Validates that all policies in a category are tested and have examples.
 *
 * This ensures complete test coverage and documentation for all policies within a category.
 * It performs two validations:
 * 1. All policies in the category are tested in the test file
 * 2. All policies in the category have examples in the exampleMap
 *
 * @param category - The policy category to validate
 * @param testedPolicies - Array of policy names that are tested in this file
 *
 * @example
 * ```ts
 * testCategoryCoverage(PolicyCategory.WEBHOOK_URLS, [
 *   "WEBHOOK_URL",
 *   "SLACK_WEBHOOK",
 *   "DISCORD_WEBHOOK"
 * ]);
 * ```
 *
 * @public
 */
export function testCategoryCoverage(
  category: PolicyCategory,
  testedPolicies: PolicyName[]
): void {
  it("should test all policies in category", () => {
    const categoryPolicies = POLICIES.filter((p) => p.category === category);
    const categoryPolicyNames = categoryPolicies.map(
      (p) => p.name as PolicyName
    );
    const missingPolicies = categoryPolicyNames.filter(
      (name) => !testedPolicies.includes(name)
    );

    expect(
      missingPolicies,
      `Missing tests for policies: ${missingPolicies.join(", ")}`
    ).toHaveLength(0);
  });

  it("should have examples for all policies in category", () => {
    const categoryPolicies = POLICIES.filter((p) => p.category === category);
    const policiesWithoutExamples = categoryPolicies.filter(
      (p) => !exampleMap[p.name]
    );

    expect(
      policiesWithoutExamples.map((p) => p.name),
      `Missing examples in scripts/generate-documentation.ts for: ${policiesWithoutExamples
        .map((p) => p.name)
        .join(", ")}`
    ).toHaveLength(0);
  });
}
