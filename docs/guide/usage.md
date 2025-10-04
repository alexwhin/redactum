# Usage

This guide covers the core functionality of Redactum, including basic redaction, working with findings, batch processing, and configuration options. You'll learn how to detect and redact PII, credentials, and other sensitive data from text.

## Quick Start

The `redactum()` function automatically detects and redacts sensitive data:

```typescript
import { redactum } from "redactum";

const result = redactum(`My email is sarah.johnson@company.io.`);
```

::: code-group

```text [Output]
My email is [EMAIL].
```

```json [Response Data]
{
  "text": "My email is sarah.johnson@company.io.",
  "redactedText": "My email is [EMAIL].",
  "findings": [
    {
      "category": "EMAIL",
      "policyName": "EMAIL_ADDRESS",
      "value": "sarah.johnson@company.io",
      "match": "sarah.johnson@company.io",
      "start": 59,
      "end": 84,
      "replacement": "[EMAIL]"
    }
  ],
  "stats": {
    "totalFindings": 1,
    "findingsByCategory": {
      "EMAIL": 1
    },
    "processingTimeMs": 3
  }
}
```

:::

## Custom Replacement

Customize how sensitive data is replaced:

```typescript
import { redactum } from "redactum";

const supportTicket = `User reported: API key sk-live-abc123 is not working.
Contact: admin@startup.io for follow-up.`;

const result = redactum(supportTicket, {
  replacement: "[PRIVATE]",
});
```

::: code-group

```text [Output]
User reported: API key [PRIVATE] is not working.
Contact: [PRIVATE] for follow-up.
```

```json [Response Data]
{
  "text": "User reported: API key sk-live-abc123 is not working.\nContact: admin@startup.io for follow-up.",
  "redactedText": "User reported: API key [PRIVATE] is not working.\nContact: [PRIVATE] for follow-up.",
  "findings": [
    {
      "category": "API_KEY",
      "policyName": "OPENAI_API_KEY",
      "value": "sk-live-abc123",
      "match": "sk-live-abc123",
      "start": 23,
      "end": 37,
      "replacement": "[PRIVATE]"
    },
    {
      "category": "EMAIL",
      "policyName": "EMAIL_ADDRESS",
      "value": "admin@startup.io",
      "match": "admin@startup.io",
      "start": 73,
      "end": 89,
      "replacement": "[PRIVATE]"
    }
  ],
  "stats": {
    "totalFindings": 2,
    "findingsByCategory": {
      "API_KEY": 1,
      "EMAIL": 1
    },
    "processingTimeMs": 3
  }
}
```

:::

You can also use category-specific replacements:

```typescript
import { redactum, PolicyCategory } from "redactum";

const message = "Contact support@company.io or call 020 7946 0958";

const result = redactum(message, {
  replacement: (match, category) => {
    if (category === PolicyCategory.EMAIL) {
      return "[CONTACT_EMAIL]";
    }
    if (category === PolicyCategory.PHONE) {
      return "[CONTACT_PHONE]";
    }
    return `[${category}]`;
  },
});
```

::: code-group

```text [Output]
Contact [CONTACT_EMAIL] or call [CONTACT_PHONE]
```

```json [Response Data]
{
  "text": "Contact support@company.io or call 020 7946 0958",
  "redactedText": "Contact [CONTACT_EMAIL] or call [CONTACT_PHONE]",
  "findings": [
    {
      "category": "EMAIL",
      "policyName": "EMAIL_ADDRESS",
      "value": "support@company.io",
      "match": "support@company.io",
      "start": 8,
      "end": 27,
      "replacement": "[CONTACT_EMAIL]"
    },
    {
      "category": "PHONE",
      "policyName": "PHONE_NUMBER_UK",
      "value": "020 7946 0958",
      "match": "020 7946 0958",
      "start": 37,
      "end": 50,
      "replacement": "[CONTACT_PHONE]"
    }
  ],
  "stats": {
    "totalFindings": 2,
    "findingsByCategory": {
      "EMAIL": 1,
      "PHONE": 1
    },
    "processingTimeMs": 2
  }
}
```

:::

## Selective Redaction

By default, Redactum redacts all PII types. Limit redaction to specific categories using the `policies` option. See [policies](/api/policies) for a complete list of available policy names.

```typescript
import { redactum } from "redactum";

const text =
  "Customer john@company.io reported issue. Payment card 4111-1111-1111-1111 was declined. Database: postgres://admin:secret@localhost:5432/db";

const result = redactum(text, {
  policies: ["CREDIT_CARD", "DATABASE_URL"],
});
```

::: code-group

```text [Output]
Customer john@company.io reported issue. Payment card [CREDIT_CARD] was declined. Database: postgres://[REDACTED]:[REDACTED]@localhost:5432/db
```

```json [Response Data]
{
  "text": "Customer john@company.io reported issue. Payment card 4111-1111-1111-1111 was declined. Database: postgres://admin:secret@localhost:5432/db",
  "redactedText": "Customer john@company.io reported issue. Payment card [CREDIT_CARD] was declined. Database: postgres://[REDACTED]:[REDACTED]@localhost:5432/db",
  "findings": [
    {
      "category": "CREDIT_CARD",
      "policyName": "CREDIT_CARD_VISA",
      "value": "4111-1111-1111-1111",
      "match": "4111-1111-1111-1111",
      "start": 73,
      "end": 92,
      "replacement": "[CREDIT_CARD]"
    },
    {
      "category": "DATABASE_CREDENTIALS",
      "policyName": "DATABASE_URL",
      "value": "postgres://admin:secret@localhost:5432/db",
      "match": "postgres://admin:secret@localhost:5432/db",
      "start": 116,
      "end": 157,
      "replacement": "postgres://[REDACTED]:[REDACTED]@localhost:5432/db"
    }
  ],
  "stats": {
    "totalFindings": 2,
    "findingsByCategory": {
      "CREDIT_CARD": 1,
      "DATABASE_CREDENTIALS": 1
    },
    "processingTimeMs": 4
  }
}
```

:::

## Custom Patterns

Add custom patterns to redact specific identifiers that aren't covered by policies:

```typescript
import { redactum, PolicyCategory } from "redactum";

const text = "Employee EMP-847392 assigned to ticket TICK-2024-1547";

const result = redactum(text, {
  customPolicies: [
    {
      name: "Employee ID",
      pattern: /EMP-\d{6}/g,
      category: PolicyCategory.CUSTOM,
      replacement: "[EMPLOYEE_ID]",
    },
    {
      name: "Ticket Reference",
      pattern: /TICK-\d{4}-\d{4}/g,
      category: PolicyCategory.CUSTOM,
      replacement: "[TICKET_ID]",
    },
  ],
});
```

::: code-group

```text [Output]
Employee [EMPLOYEE_ID] assigned to ticket [TICKET_ID]
```

```json [Response Data]
{
  "text": "Employee EMP-847392 assigned to ticket TICK-2024-1547",
  "redactedText": "Employee [EMPLOYEE_ID] assigned to ticket [TICKET_ID]",
  "findings": [
    {
      "category": "CUSTOM",
      "policyName": "Employee ID",
      "value": "EMP-847392",
      "match": "EMP-847392",
      "start": 9,
      "end": 19,
      "replacement": "[EMPLOYEE_ID]"
    },
    {
      "category": "CUSTOM",
      "policyName": "Ticket Reference",
      "value": "TICK-2024-1547",
      "match": "TICK-2024-1547",
      "start": 40,
      "end": 54,
      "replacement": "[TICKET_ID]"
    }
  ],
  "stats": {
    "totalFindings": 2,
    "findingsByCategory": {
      "CUSTOM": 2
    },
    "processingTimeMs": 2
  }
}
```

:::

## Excluding Patterns

Prevent specific values from being redacted using exclude patterns. This is useful for whitelisting known safe addresses or system identifiers:

```typescript
import { redactum } from "redactum";

const text = "Contact: support@company.io or noreply@company.io for assistance";

const result = redactum(text, {
  policies: ["EMAIL_ADDRESS"],
  excludePatterns: [
    { pattern: /noreply@company\.io/ },
    { pattern: /support@company\.io/ },
  ],
});
```

::: code-group

```text [Output]
Contact: support@company.io or noreply@company.io for assistance
```

```json [Response Data]
{
  "text": "Contact: support@company.io or noreply@company.io for assistance",
  "redactedText": "Contact: support@company.io or noreply@company.io for assistance",
  "findings": [],
  "stats": {
    "totalFindings": 0,
    "findingsByCategory": {},
    "processingTimeMs": 1
  }
}
```

:::

## Length Preservation

Preserve original text length by repeating replacement characters:

```typescript
import { redactum } from "redactum";

const result = redactum("Stripe: sk_live_4eC39HqLyjWDarjtT1zdp7dc", {
  preserveLength: true,
  replacement: "*",
});
```

::: code-group

```text [Output]
Stripe: ********************************
```

```json [Response Data]
{
  "text": "Stripe: sk_live_4eC39HqLyjWDarjtT1zdp7dc",
  "redactedText": "Stripe: ********************************",
  "findings": [
    {
      "category": "API_KEY",
      "policyName": "STRIPE_KEY",
      "value": "sk_live_4eC39HqLyjWDarjtT1zdp7dc",
      "match": "sk_live_4eC39HqLyjWDarjtT1zdp7dc",
      "start": 8,
      "end": 40,
      "replacement": "********************************"
    }
  ],
  "stats": {
    "totalFindings": 1,
    "findingsByCategory": {
      "API_KEY": 1
    },
    "processingTimeMs": 1
  }
}
```

:::

## Batch Processing

Process multiple texts with consistent options using `redactumBatch()`. This is especially useful when you may need to perform the following:

- Apply the same redaction rules across multiple messages or documents
- Maintain consistent configuration without repeating options
- Process arrays of user inputs, log entries, or chat messages

```typescript
import { redactumBatch } from "redactum";

const messages = [
  "Support ticket from sarah.chen@company.io - Issue with login",
  "Customer callback requested: +44 20 7946 0958",
  "Payment failed for card ending in 1111 (full: 4111-1111-1111-1111)",
];

const results = redactumBatch(messages, {
  policies: ["EMAIL_ADDRESS", "PHONE_NUMBER_UK", "CREDIT_CARD"],
  replacement: "[REDACTED]",
});

const redactedTexts = results.map((result) => result.redactedText);
```

::: code-group

```text [Output]
Support ticket from [REDACTED] - Issue with login
Customer callback requested: [REDACTED]
Payment failed for card ending in 1111 (full: [REDACTED])
```

```json [Response Data]
[
  {
    "text": "Support ticket from sarah.chen@company.io - Issue with login",
    "redactedText": "Support ticket from [REDACTED] - Issue with login",
    "findings": [
      {
        "category": "EMAIL",
        "policyName": "EMAIL_ADDRESS",
        "value": "sarah.chen@company.io",
        "match": "sarah.chen@company.io",
        "start": 20,
        "end": 41,
        "replacement": "[REDACTED]"
      }
    ],
    "stats": {
      "totalFindings": 1,
      "findingsByCategory": {
        "EMAIL": 1
      },
      "processingTimeMs": 1
    }
  },
  {
    "text": "Customer callback requested: +44 20 7946 0958",
    "redactedText": "Customer callback requested: [REDACTED]",
    "findings": [
      {
        "category": "PHONE",
        "policyName": "PHONE_NUMBER_UK",
        "value": "+44 20 7946 0958",
        "match": "+44 20 7946 0958",
        "start": 29,
        "end": 45,
        "replacement": "[REDACTED]"
      }
    ],
    "stats": {
      "totalFindings": 1,
      "findingsByCategory": {
        "PHONE": 1
      },
      "processingTimeMs": 1
    }
  },
  {
    "text": "Payment failed for card ending in 1111 (full: 4111-1111-1111-1111)",
    "redactedText": "Payment failed for card ending in 1111 (full: [REDACTED])",
    "findings": [
      {
        "category": "CREDIT_CARD",
        "policyName": "CREDIT_CARD",
        "value": "4111-1111-1111-1111",
        "match": "4111-1111-1111-1111",
        "start": 47,
        "end": 66,
        "replacement": "[REDACTED]"
      }
    ],
    "stats": {
      "totalFindings": 1,
      "findingsByCategory": {
        "CREDIT_CARD": 1
      },
      "processingTimeMs": 1
    }
  }
]
```

:::

## Configuration Files

Redactum can load configuration from files, allowing you to manage settings separately from your code.

### Supported File Names

Redactum automatically searches for these files (in order):

- `.redactumrc.json`, `.redactumrc.js`, `.redactumrc.cjs`, `.redactumrc.mjs`
- `.redactumrc.yaml`, `.redactumrc.yml`
- `redactum.config.json`, `redactum.config.js`, `redactum.config.cjs`, `redactum.config.mjs`
- `redactum.config.yaml`, `redactum.config.yml`

### Example Configuration

Create a `.redactumrc.json` file in your project root:

```json
{
  "replacement": "[REDACTED]",
  "categories": {
    "EMAIL": true,
    "PHONE": true,
    "SSN": true,
    "CREDIT_CARD": true,
    "API_KEY": true,
    "PRIVATE_KEY": true,
    "PERSON_NAME": false,
    "ADDRESS": false
  },
  "customPatterns": [
    {
      "name": "Employee ID",
      "pattern": "EMP-\\d{6}",
      "replacement": "[EMPLOYEE_ID]",
      "mode": "replace"
    }
  ]
}
```

### Using Config Files

```typescript
import { redactumFromConfig } from "redactum";

const result = await redactumFromConfig("Email: john@company.io, EMP-123456");
```

Or specify a custom config path:

```typescript
const result = await redactumFromConfig("Sensitive text", {
  configPath: "./custom-config.json"
});
```

## Error Handling

Redactum is designed to never throw errors during redaction, making it safe for production use without extensive error handling.

### Safe by Default

The `redactum()` function handles edge cases gracefully:

```typescript
import { redactum } from "redactum";

const result1 = redactum("");
const result2 = redactum(null as any);
const result3 = redactum(undefined as any);
```

All return valid results with empty findings instead of throwing errors.

### Validating Options

Use `redactumValidateOptions()` to validate configuration before use:

```typescript
import { redactumValidateOptions, PolicyCategory } from "redactum";

try {
  redactumValidateOptions({
    policies: ["EMAIL_ADDRESS", "PHONE_NUMBER_UK"],
    customPolicies: [
      {
        name: "Employee ID",
        pattern: /EMP-\d{6}/g,
        category: PolicyCategory.CUSTOM,
      },
    ],
  });
} catch (error) {
  console.error("Invalid configuration:", error.message);
}
```
