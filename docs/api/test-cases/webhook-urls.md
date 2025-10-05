---
prev: false
next: false
search: false
---

# Webhook URLs Test Cases

[← Back to Test Cases](/api/test-cases)

This page shows 17 test cases that validate Webhook URLs patterns.

| Policy | Test Case |
|--------|-----------|
| `WEBHOOK_URL` | `https://hooks.example.com/webhook/1234567890abcdef` |
| `WEBHOOK_URL` | `http://hooks.test.com/api/webhook/abc123` |
| `WEBHOOK_URL` | `http://hooks.internal.net/webhook/secret456` |
| `WEBHOOK_URL` | `http://hooks.example.org/api/webhook/integration-key` |
| `WEBHOOK_URL` | `https://hooks.service.io/webhook/data-sync-123` |
| `WEBHOOK_URL` | `https://hooks.company.com/v1/webhook/callback` |
| `WEBHOOK_URL` | `http://hooks.dev.local/incoming/data` |
| `SLACK_WEBHOOK` | `https://hooks.slack.com/services/T12345678/B1234567890/ABCDEFGHIJKLMNOPQRSTUVWX` |
| `SLACK_WEBHOOK` | `https://hooks.slack.com/services/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` |
| `SLACK_WEBHOOK` | `https://hooks.slack.com/services/TABCDEFGH/B1234ABCD56/1234567890ABCDEFGHIJKLMN` |
| `SLACK_WEBHOOK` | `https://hooks.slack.com/services/T00000000/B0000000000/000000000000000000000000` |
| `SLACK_WEBHOOK` | `https://hooks.slack.com/services/TDEADBEEF/BCAFEBABE12/DEADBEEFCAFEBABEDEADBE00` |
| `DISCORD_WEBHOOK` | `https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz123456` |
| `DISCORD_WEBHOOK` | `https://discordapp.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz123456` |
| `DISCORD_WEBHOOK` | `https://discord.com/api/webhooks/987654321098765432/zyxwvutsrqponmlkjihgfedcba9876543210zyxwvutsrqponmlkjihgfedcba987654` |
| `DISCORD_WEBHOOK` | `https://discordapp.com/api/webhooks/999999999999999999/abcdefABCDEF123456abcdefABCDEF123456abcdefABCDEF123456abcdefABCDEF12` |
| `DISCORD_WEBHOOK` | `https://discord.com/api/webhooks/123456789012345678/abc-def_123ABC-xyz_789DEF-ghi_012JKL-mno_345PQR-stu_678VWX-yza_bcd12` |
