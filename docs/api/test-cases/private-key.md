---
prev: false
next: false
search: false
---

# Private Keys Test Cases

[← Back to Test Cases](/api/test-cases)

This page shows 20 test cases that validate Private Keys patterns.

| Policy | Test Case |
|--------|-----------|
| `RSA_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEA... -----END RSA PRIVATE KEY-----` |
| `RSA_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEA1234567890abcdef... -----END RSA PRIVATE KEY-----` |
| `RSA_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY----- ABCDEFGHIJKLMNOP... -----END RSA PRIVATE KEY-----` |
| `RSA_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY----- zyxwvutsrqponmlk... -----END RSA PRIVATE KEY-----` |
| `RSA_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY----- 0123456789ABCDEF... -----END RSA PRIVATE KEY-----` |
| `EC_PRIVATE_KEY` | `-----BEGIN EC PRIVATE KEY----- MHcCAQEEIA... -----END EC PRIVATE KEY-----` |
| `EC_PRIVATE_KEY` | `-----BEGIN EC PRIVATE KEY----- ABCDEFGHIJ... -----END EC PRIVATE KEY-----` |
| `EC_PRIVATE_KEY` | `-----BEGIN EC PRIVATE KEY----- 1234567890... -----END EC PRIVATE KEY-----` |
| `EC_PRIVATE_KEY` | `-----BEGIN EC PRIVATE KEY----- zyxwvutsrq... -----END EC PRIVATE KEY-----` |
| `EC_PRIVATE_KEY` | `-----BEGIN EC PRIVATE KEY----- 0000000000... -----END EC PRIVATE KEY-----` |
| `OPENSSH_PRIVATE_KEY` | `-----BEGIN OPENSSH PRIVATE KEY----- b3BlbnNzaC1rZXktdjEA... -----END OPENSSH PRIVATE KEY-----` |
| `OPENSSH_PRIVATE_KEY` | `-----BEGIN OPENSSH PRIVATE KEY----- ABCDEFGHIJKLMNOP... -----END OPENSSH PRIVATE KEY-----` |
| `OPENSSH_PRIVATE_KEY` | `-----BEGIN OPENSSH PRIVATE KEY----- 1234567890abcdef... -----END OPENSSH PRIVATE KEY-----` |
| `OPENSSH_PRIVATE_KEY` | `-----BEGIN OPENSSH PRIVATE KEY----- zyxwvutsrqponmlk... -----END OPENSSH PRIVATE KEY-----` |
| `OPENSSH_PRIVATE_KEY` | `-----BEGIN OPENSSH PRIVATE KEY----- 0000000000000000... -----END OPENSSH PRIVATE KEY-----` |
| `GENERIC_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY----- MIIEvQIBADANBgkqhkiG9w0BAQ... -----END PRIVATE KEY-----` |
| `GENERIC_PRIVATE_KEY` | `-----BEGIN DSA PRIVATE KEY----- content -----END DSA PRIVATE KEY-----` |
| `GENERIC_PRIVATE_KEY` | `-----BEGIN EC PRIVATE KEY----- content -----END EC PRIVATE KEY-----` |
| `GENERIC_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY----- content -----END RSA PRIVATE KEY-----` |
| `GENERIC_PRIVATE_KEY` | `-----BEGIN OPENSSH PRIVATE KEY----- b3BlbnNzaC... -----END OPENSSH PRIVATE KEY-----` |
