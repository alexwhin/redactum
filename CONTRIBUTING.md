# Contributing to redactum

Thank you for your interest in contributing to redactum. This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, constructive, and professional in all interactions. We're here to build something useful together.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm 10.14.0 (specified in `package.json`)

### Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/alexwhin/redactum.git
cd redactum
```

2. Install dependencies:

```bash
pnpm install
```

3. Run tests to verify setup:

```bash
pnpm test
```

4. Start development mode:

```bash
pnpm run dev
```

This will start the build watcher, type checker, and documentation server concurrently.

## Development Workflow

### Making Changes

1. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes following our [code style guidelines](#code-style)

3. Run the validation suite:

```bash
pnpm run lint
pnpm run typecheck
pnpm test
```

4. Commit your changes:

```bash
git add .
git commit -m "feat: add new feature"
```

### Commit Messages

We use conventional commits for clear version history:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test updates
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements

Examples:

- `feat: add HIPAA compliance patterns`
- `fix: correct credit card Luhn validation`
- `docs: update API examples`
- `test: add edge cases for email detection`

## Adding New Patterns

This is one of the most common contributions! When adding a new redaction pattern:

### 1. Add the pattern to `src/constants.ts`

```typescript
{
  name: "MY_NEW_PATTERN",
  pattern: /my-regex-pattern/g,
  category: PolicyCategory.APPROPRIATE_CATEGORY,
  replacement: "[MY_REPLACEMENT]",
}
```

### 2. Add an example to `scripts/generate-documentation.ts`

In the `exampleMap` object:

```typescript
MY_NEW_PATTERN: "example-data-that-matches",
```

### 3. Add tests to the appropriate category test file

In `tests/categories/{category-name}.test.ts`:

```typescript
describe("MY_NEW_PATTERN", () => {
  testPolicySuite({
    policyName: "MY_NEW_PATTERN",
    replacement: "[MY_REPLACEMENT]",
    shouldMatch: ["example-that-should-match", "another-valid-example"],
    shouldNotMatch: [
      "example-that-should-not-match",
      "another-invalid-example",
    ],
  });
});
```

### 4. Run validation

```bash
pnpm run validate:examples
pnpm test
```

### Pattern Guidelines

- Use global flag (`/g`) for all patterns
- Avoid overly broad patterns that cause false positives
- Test for ReDoS vulnerabilities
- Use word boundaries (`\b`) where appropriate
- Include clear examples in tests
- Document why the pattern is structured the way it is (if complex)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
