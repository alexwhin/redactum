# Release Process

This document outlines the release process for Redactum.

## Overview

Releases are automated using [release-it](https://github.com/release-it/release-it) with conventional changelog support. The process follows [Conventional Commits](https://www.conventionalcommits.org/) and [Semantic Versioning](https://semver.org/).

## Automated Releases

Releases are automatically triggered when commits are pushed to the `main` branch, unless the commit message contains `skip release` or `chore: release`.

### Workflow

1. **Quality Checks**: The pipeline workflow runs all tests, linting, and type checking
2. **Release Job**: If all checks pass and the commit doesn't skip release, the release workflow:
   - Builds the package
   - Runs tests again
   - Determines the version bump based on conventional commits
   - Updates CHANGELOG.md
   - Creates a git tag
   - Pushes the tag to GitHub
   - Creates a GitHub release
   - Publishes to npm with provenance

### Commit Types

Commits are categorized in the changelog based on their type:

- `feat`: Features (minor version bump)
- `fix`: Bug Fixes (patch version bump)
- `perf`: Performance Improvements (patch version bump)
- `refactor`: Code Refactoring
- `test`: Tests
- `docs`: Documentation
- `chore`: Maintenance

### Breaking Changes

- Add `BREAKING CHANGE:` in the commit footer for major version bumps
- Use `!` after the type/scope for breaking changes: `feat!: ...`

## Manual Releases

### Local Release (Dry Run)

To preview what a release would do:

```bash
pnpm release:dry
```

### Local Release

To create a release from your local machine:

```bash
pnpm release
```

### GitHub Actions Manual Release

1. Go to Actions tab in GitHub
2. Select "Release" workflow
3. Click "Run workflow"
4. Choose release type: `auto`, `patch`, `minor`, or `major`

## Skipping Releases

To push to main without triggering a release, include `skip release` in your commit message:

```bash
git commit -m "docs: update readme [skip release]"
```

## Prerequisites

### npm Token

The release workflow requires an `NPM_TOKEN` secret to be configured in GitHub repository settings:

1. Generate an npm token at https://www.npmjs.com/settings/[username]/tokens
2. Choose "Automation" token type
3. Add it as `NPM_TOKEN` in repository secrets

### GitHub Token

The `GITHUB_TOKEN` is automatically provided by GitHub Actions.

## Release Configuration

Release behavior is configured in [.release-it.json](.release-it.json):

- Commit message format
- Tag naming
- Changelog generation
- npm publish settings
- Pre-release hooks (lint, typecheck, test, build)

## Post-Release

After a successful release:

1. The package is published to npm with provenance
2. A GitHub release is created with the changelog
3. The version in package.json is updated
4. A git tag is created and pushed

## Troubleshooting

### Release Fails

- Check GitHub Actions logs for errors
- Verify npm token is valid and has publish permissions
- Ensure all tests pass locally: `pnpm test:ci`
- Verify the build succeeds: `pnpm build`

### Wrong Version Bump

- Ensure commit messages follow conventional commits
- Use `feat:` for minor bumps
- Use `fix:` for patch bumps
- Use `BREAKING CHANGE:` or `!` for major bumps

### Changelog Issues

- Changelog is auto-generated from conventional commits
- Only commits since the last tag are included
- Ensure commits follow the conventional format
