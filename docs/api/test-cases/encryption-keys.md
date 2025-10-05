---
prev: false
next: false
search: false
---

# Encryption Keys Test Cases

[← Back to Test Cases](/api/test-cases)

This page shows 29 test cases that validate Encryption Keys patterns.

| Policy | Test Case |
|--------|-----------|
| `SSH_KEY_FINGERPRINT` | `SHA256:1234567890abcdefghijklmnopqrstuvwxyz1234567` |
| `SSH_KEY_FINGERPRINT` | `SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8` |
| `SSH_KEY_FINGERPRINT` | `MD5:12:34:56:78:90:ab:cd:ef:12:34:56:78:90:ab:cd:ef` |
| `SSH_KEY_FINGERPRINT` | `MD5:aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99` |
| `PGP_KEY_ID` | `0x1234567890ABCDEF` |
| `PGP_KEY_ID` | `0xABCDEF1234567890` |
| `PGP_KEY_ID` | `1234567890ABCDEF` |
| `PGP_KEY_ID` | `0x1234567890ABCDEF1234567890ABCDEF12345678` |
| `PGP_KEY_ID` | `0x12345678` |
| `PGP_KEY_ID` | `ABCDEF12` |
| `AGE_SECRET_KEY` | `AGE-SECRET-KEY-1QYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQYQSZQGPQY` |
| `AGE_SECRET_KEY` | `AGE-SECRET-KEY-1ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUV` |
| `AGE_PUBLIC_KEY` | `age1abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuv` |
| `AGE_PUBLIC_KEY` | `age1qyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqy` |
| `AWS_KMS_KEY_ID` | `arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012` |
| `AWS_KMS_KEY_ID` | `arn:aws:kms:eu-west-1:999999999999:key/abcdef01-2345-6789-abcd-ef0123456789` |
| `AWS_KMS_KEY_ID` | `12345678-1234-1234-1234-123456789012` |
| `AWS_KMS_KEY_ID` | `abcdef01-2345-6789-abcd-ef0123456789` |
| `GCP_KMS_KEY` | `projects/my-project/locations/us-central1/keyRings/my-keyring/cryptoKeys/my-key` |
| `GCP_KMS_KEY` | `projects/test-123/locations/europe-west1/keyRings/prod-ring/cryptoKeys/encryption-key` |
| `AZURE_KEY_IDENTIFIER` | `https://myvault.vault.azure.net/keys/mykey/1234567890abcdef1234567890abcdef` |
| `AZURE_KEY_IDENTIFIER` | `https://prod-vault.vault.azure.net/keys/encryption-key/abcdef1234567890abcdef1234567890` |
| `MASTER_KEY` | `master_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=` |
| `MASTER_KEY` | `master-key: dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk` |
| `MASTER_KEY` | `master_key=YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkw` |
| `MASTER_KEY` | `encryption_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=` |
| `MASTER_KEY` | `encryption-key=dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk` |
| `MASTER_KEY` | `secret_key: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkwYWJjZGVmZ2g=` |
| `MASTER_KEY` | `secret-key=dGhpc2lzYXNlY3JldGtleXRoYXRzaG91bGRiZXJlZGFjdGVk` |
