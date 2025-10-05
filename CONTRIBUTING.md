# Contributing to Redactum

Thank you for your interest in contributing to Redactum! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, constructive, and professional in all interactions. We're here to build something useful together.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm 10.14.0 (specified in `package.json`)

### Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/redactum.git
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
    shouldMatch: [
      "example-that-should-match",
      "another-valid-example",
    ],
    shouldNotMatch: [
      "example-that-should-not-match",
      "another-invalid-example",
    ],
  });
});
```

Don't forget to add your pattern to the `testCategoryCoverage` array at the top of the test file!

### 4. Run validation

```bash
pnpm run validate:examples  # Ensures your example matches the pattern
pnpm test                    # Runs all tests
```

### Pattern Guidelines

- Use global flag (`/g`) for all patterns
- Avoid overly broad patterns that cause false positives
- Test for ReDoS vulnerabilities
- Use word boundaries (`\b`) where appropriate
- Include clear examples in tests
- Document why the pattern is structured the way it is (if complex)

## Code Style

We enforce code style through ESLint and TypeScript. Key points:

- **No nested ternary operators** - Always forbidden
- **Use curly braces** - For all control structures
- **Double quotes** - For strings
- **Explicit return types** - For public methods
- **No inline if statements** - Use full if/else blocks
- **Blank line before return** - Always add a blank line before `return`
- **No `any` type** - Use `unknown` or proper types
- **Import extensions** - Always use `.js` for relative imports

See [CLAUDE.md](CLAUDE.md) for complete coding standards.

## Testing

### Test Requirements

- All new patterns must have tests
- Test both positive matches and negative cases
- Use the `testPolicySuite` helper for consistency
- Ensure 100% code coverage for new code

### Running Tests

```bash
pnpm test              # Run tests in watch mode
pnpm run test:ci       # Run tests once
pnpm run test:coverage # Generate coverage report
```

### Test File Structure

- One test file per source file
- Use `describe()` blocks to group related tests
- Include edge cases and boundary conditions
- Test error scenarios

## Documentation

### When to Update Documentation

- Adding new patterns or features
- Changing public APIs
- Adding new examples or use cases

### Documentation Files

- **README.md** - Getting started, quick examples
- **docs/** - Full documentation site (VitePress)
- **TSDoc comments** - Required for all public exports

### Building Documentation

```bash
pnpm run docs         # Start docs dev server
pnpm run docs:build   # Build static docs
```

## Pull Request Process

1. **Update tests** - Add or update tests for your changes
2. **Update documentation** - Update relevant docs
3. **Run validation** - Ensure all checks pass:
   ```bash
   pnpm run lint
   pnpm run typecheck
   pnpm test
   pnpm run validate:examples
   ```
4. **Create PR** - Push to your fork and create a pull request
5. **Describe changes** - Provide clear description of what and why
6. **Link issues** - Reference any related issues

### PR Title Format

Use conventional commit format:
- `feat: add GDPR compliance patterns`
- `fix: resolve issue with IPv6 detection`
- `docs: improve setup instructions`

### What to Include

- Clear description of the change
- Why the change is needed
- Test cases demonstrating the fix/feature
- Screenshots (if UI/docs changes)
- Breaking changes highlighted

## Project Structure

```
redactum/
├── src/
│   ├── core/           # Core redaction logic
│   ├── config/         # Configuration system
│   ├── providers/      # Framework adapters
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── constants.ts    # Pattern definitions
├── tests/
│   ├── categories/     # Pattern tests by category
│   ├── core/           # Core functionality tests
│   ├── providers/      # Provider adapter tests
│   └── utils/          # Utility tests
├── scripts/            # Build and documentation scripts
├── docs/               # VitePress documentation
└── config/             # Example configurations
```

## Need Help?

- **Questions?** Open a discussion on GitHub
- **Bug?** Open an issue with reproduction steps
- **Feature idea?** Open an issue to discuss before coding
- **Security issue?** See [SECURITY.md](SECURITY.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
