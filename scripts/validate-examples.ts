#!/usr/bin/env tsx
import { redactum } from "../src/index.js";
import { POLICIES } from "../src/constants.js";
import { exampleMap } from "./generate-documentation.js";

interface ValidationResult {
  policyName: string;
  example: string;
  status: "✓" | "✗";
  redactedText: string;
  expected: string;
  actual: string;
}

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) {
    return str;
  }

  return `${str.substring(0, maxLen - 3)  }...`;
}

function validateExamples(): ValidationResult[] {
  const results: ValidationResult[] = [];
  const policyNames = POLICIES.map((p) => p.name);

  for (const [policyName, example] of Object.entries(exampleMap)) {
    if (!policyNames.includes(policyName)) {
      continue;
    }

    const policy = POLICIES.find((p) => p.name === policyName);
    if (!policy) {
      continue;
    }

    const result = redactum(example, {
      policies: [policyName as never],
    });

    const wasRedacted = result.redactedText !== example;
    const containsRedaction =
      result.redactedText.includes("[") && result.redactedText.includes("]");

    results.push({
      policyName,
      example: truncate(example, 40),
      status: wasRedacted && containsRedaction ? "✓" : "✗",
      redactedText: truncate(result.redactedText, 40),
      expected: policy.replacement || "[REDACTED]",
      actual: wasRedacted ? "REDACTED" : "NOT REDACTED",
    });
  }

  return results;
}

function printResults(results: ValidationResult[]): void {
  const passed = results.filter((r) => r.status === "✓").length;
  const failed = results.filter((r) => r.status === "✗").length;
  const total = results.length;

  console.log(
    `\n${colors.bright}${colors.cyan}Example Validation Results${colors.reset}\n`
  );
  console.log("─".repeat(120));
  console.log(
    `${colors.bright}Status${colors.reset} │ ${ 
      `${colors.bright}Policy Name${colors.reset}`.padEnd(45) 
      } │ ${ 
      `${colors.bright}Example${colors.reset}`.padEnd(50) 
      } │ ` +
      `${colors.bright}Result${colors.reset}`
  );
  console.log("─".repeat(120));

  for (const result of results) {
    const statusColor = result.status === "✓" ? colors.green : colors.red;
    const status = `${statusColor}${result.status}${colors.reset}`;
    const policyName = result.policyName.padEnd(40);
    const example = result.example.padEnd(45);
    const resultText =
      result.status === "✓"
        ? `${colors.green}${result.actual}${colors.reset}`
        : `${colors.red}${result.actual}${colors.reset}`;

    console.log(`  ${status}    │ ${policyName} │ ${example} │ ${resultText}`);
  }

  console.log("─".repeat(120));
  console.log(
    `\n${colors.bright}Summary:${colors.reset} ` +
      `${colors.green}${passed} passed${colors.reset}, ` +
      `${failed > 0 ? colors.red : colors.gray}${failed} failed${
        colors.reset
      }, ` +
      `${total} total\n`
  );

  if (failed > 0) {
    console.log(
      `${colors.red}${colors.bright}✗ Validation failed!${colors.reset}\n`
    );
    console.log(`${colors.yellow}Failed examples:${colors.reset}`);

    results
      .filter((r) => r.status === "✗")
      .forEach((r) => {
        console.log(
          `  ${colors.red}•${colors.reset} ${r.policyName}: "${r.example}"`
        );
      });

    console.log("");
    process.exit(1);
  } else {
    console.log(
      `${colors.green}${colors.bright} All examples validated successfully ${colors.reset}\n`
    );
  }
}

const results = validateExamples();
printResults(results);
