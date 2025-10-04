# Options

Reference for configuring Redactum and understanding its types.

## RedactumOptions

```typescript
interface RedactumOptions {
  policies?: PolicyName[];
  customPolicies?: Policy[];
  replacement?: string | ((match: string, category: PolicyCategory) => string);
  preserveLength?: boolean;
  excludePatterns?: { pattern: RegExp; policies?: PolicyName[] }[];
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `policies` | `PolicyName[]` | All policies | Which policies to enable |
| `customPolicies` | `Policy[]` | `[]` | Add custom patterns |
| `replacement` | `string` or `function` | `"[REDACTED]"` | How to replace matched PII |
| `preserveLength` | `boolean` | `false` | Match original text length |
| `excludePatterns` | `ExcludePattern[]` | `[]` | Whitelist specific values |


## RedactumResult

```typescript
interface RedactumResult {
  text: string;
  redactedText: string;
  findings: RedactumFinding[];
  stats: RedactumStats;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `text` | `string` | Original input |
| `redactedText` | `string` | Redacted output |
| `findings` | `RedactumFinding[]` | Detected PII details |
| `stats` | `RedactumStats` | Processing statistics |

## RedactumFinding

```typescript
interface RedactumFinding {
  category: PolicyCategory;
  policyName: PolicyName;
  value: string;
  match: string;
  start: number;
  end: number;
  replacement: string;
}
```

| Field | Description |
|-------|-------------|
| `category` | High-level category (EMAIL, PHONE, etc.) |
| `policyName` | Specific policy that matched |
| `value` | Original sensitive value |
| `match` | Matched text |
| `start` | Start position |
| `end` | End position |
| `replacement` | Replacement used |

## RedactumStats

```typescript
interface RedactumStats {
  totalFindings: number;
  findingsByCategory: Record<string, number>;
  processingTimeMs: number;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `totalFindings` | `number` | Total number of findings |
| `findingsByCategory` | `Record<string, number>` | Count by category |
| `processingTimeMs` | `number` | Processing time |

## Policy

```typescript
interface Policy {
  name: string;
  pattern: RegExp;
  category: PolicyCategory;
  replacement?: string;
}
```

| Field | Description |
|-------|-------------|
| `name` | Unique policy identifier |
| `pattern` | RegExp with global flag |
| `category` | Category classification |
| `replacement` | Optional custom replacement |

## Core Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `redactum(text, options?)` | `RedactumResult` | Main redaction function |
| `redactumBatch(texts[], options?)` | `RedactumResult[]` | Batch process multiple texts |
| `redactumFromConfig(text, configOptions?)` | `Promise<RedactumResult>` | Load from config file |
| `createRedactum(options?)` | `RedactumInstance` | Create stateful instance |


## Validation Functions

| Function | Description |
|----------|-------------|
| `redactumValidateOptions(options)` | Validate configuration |
| `redactumValidatePolicy(pattern)` | Validate custom policy |

## Utility Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `redactumCalculateEntropy(text)` | `number` | Shannon entropy (0-8) |
| `redactumLooksLikeSecret(text, minLength?, threshold?)` | `boolean` | Heuristic secret detection |
| `redactumGetAllPatterns()` | `Policy[]` | All built-in policies |
| `redactumGetPatterns(options?)` | `Policy[]` | Patterns for config |
| `redactumGetEnabledPolicies(options?)` | `PolicyName[]` | Enabled policy names |
| `redactumGetEnabledCategories(options?)` | `PolicyCategory[]` | Enabled categories |

## Constants

| Constant | Type | Value |
|----------|------|-------|
| `POLICIES` | `Policy[]` | All 180+ built-in policies |
| `DEFAULT_REPLACEMENT` | `string` | `"[REDACTED]"` |
| `DEFAULT_ENABLED_CATEGORIES` | `PolicyCategory[]` | All except CUSTOM |


