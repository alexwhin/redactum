# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in Redactum, please send an email to:

**alexwhin@gmail.com**

Please include the following information:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability, including how an attacker might exploit it

### What to Expect

- You will receive a response within 48 hours acknowledging your report
- We will investigate and validate the vulnerability
- We will work on a fix and coordinate disclosure timing with you
- Once the vulnerability is fixed, we will release a security advisory and give you credit (unless you prefer to remain anonymous)

## Security Best Practices

When using Redactum:

1. **Keep dependencies updated**: Regularly update Redactum and its peer dependencies
2. **Validate custom patterns**: Always test custom regex patterns for ReDoS vulnerabilities
3. **Review redacted output**: Verify that sensitive data is being properly redacted
4. **Use presets cautiously**: Understand what each preset enables/disables
5. **Monitor findings**: Review the `findings` array to understand what was redacted

## Known Security Considerations

### Regular Expression Denial of Service (ReDoS)

Redactum includes built-in patterns that are tested for ReDoS vulnerabilities. However:

- Custom patterns provided by users are not automatically validated
- Use the `redactumValidatePolicy()` function to test custom patterns
- Consider setting `security.preventRegexDos: true` in your config (enabled by default)

### False Negatives

No PII detection system is 100% accurate. Redactum should be used as part of a defense-in-depth strategy:

- Review logs and outputs periodically
- Combine with other security measures
- Test thoroughly with your specific data patterns

### Performance

Processing extremely large inputs with many patterns can impact performance:

- Use the `performance.maximumInputSize` config to set limits
- Consider the `performance.timeout` setting for long-running operations
- Use selective patterns rather than enabling all categories

## Disclosure Policy

We follow responsible disclosure practices:

1. Security issues are fixed privately
2. Fixes are released as soon as possible
3. Security advisories are published after fixes are available
4. CVEs are requested for critical vulnerabilities

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.x) and announced via:

- GitHub Security Advisories
- Release notes in CHANGELOG.md
- NPM package updates

Subscribe to releases on GitHub to be notified of security updates.
