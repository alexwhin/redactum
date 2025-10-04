# 🛡️ redactum - automated PII and secret redaction for AI applications

[![NPM Version](https://img.shields.io/npm/v/redactum?logo=npm&color=f11f7a)](https://www.npmjs.com/package/redactum)
[![Codecov](https://img.shields.io/codecov/c/github/alexwhin/redactum?logo=codecov&color=f11f7a)](https://codecov.io/gh/alexwhin/redactum)
[![Install Size](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fpackagephobia.com%2Fv2%2Fapi.json%3Fp%3Dredactum&query=$.install.pretty&label=size&color=2ea44f)](https://packagephobia.com/result?p=redactum)
![Build](https://img.shields.io/github/actions/workflow/status/alexwhin/redactum/pipeline.yml?branch=main&color=2ea44f)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## What It Does

Fast, zero-dependency PII redaction library for TypeScript and JavaScript that automatically removes sensitive data before it leaves your stack.

**Redactum protects you and your users by redacting:**

- 👤 Personal information (emails, phone numbers, SSNs)
- 💳 Financial data (credit cards, bank accounts)
- 🔑 Developer secrets (API keys, database URLs, JWT tokens)
- 🏗️ Infrastructure details (IP addresses, AWS credentials)

**180+ built-in patterns across 32 categories** for comprehensive detection of personal, financial, and technical sensitive data.

## Installation

```bash
npm install redactum
```

## Quick Start

```typescript
import { redactum } from "redactum";

const userMessage = `Errors found in cloudwatch
ERROR: Failed to connect to database
DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db`;

const result = redactum(userMessage);
```

```text
Errors found in cloudwatch
ERROR: Failed to connect to database
DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db
```

## Provider Integrations

Redactum works seamlessly with popular AI SDKs:

### OpenAI

```typescript
import { createOpenAIAdapter } from "redactum/providers";
import OpenAI from "openai";

const adapter = createOpenAIAdapter();
const openai = adapter.createClientWrapper(new OpenAI());

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "user",
      content: `Errors found in cloudwatch
                ERROR: Failed to connect to database
                DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db`,
    },
  ],
});
```

### Anthropic

```typescript
import { createAnthropicAdapter } from "redactum/providers";
import Anthropic from "@anthropic-ai/sdk";

const adapter = createAnthropicAdapter();
const anthropic = adapter.createClientWrapper(new Anthropic());

const message = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1000,
  messages: [
    {
      role: "user",
      content: "Process this: API_KEY=sk_live_4eC39HqLyjWDarjtT1zdp7dc",
    },
  ],
});
```

### LangChain

```typescript
import { createLangChainAdapter } from "redactum/providers";
import { Document } from "@langchain/core/documents";

const adapter = createLangChainAdapter();
const transformer = adapter.createDocumentTransformer();

const docs = await transformer([
  new Document({
    pageContent: "Contact: sarah.chen@company.io, Phone: +44 20 7946 0958",
  }),
]);
```

### Vercel AI

```typescript
import { createVercelAIAdapter } from "redactum/providers";
import { openai } from "@ai-sdk/openai";

const adapter = createVercelAIAdapter();
const { streamText } = adapter.createStreamingWrapper();

const result = await streamText({
  model: openai("gpt-4"),
  prompt: "Credit card: 4111-1111-1111-1111",
});
```

### LlamaIndex

```typescript
import { createLlamaIndexAdapter } from "redactum/providers";
import { TextNode } from "llamaindex";

const adapter = createLlamaIndexAdapter();
const transformer = adapter.createNodeTransformer();

const nodes = await transformer.transform([
  new TextNode({
    text: "SSN: 123-45-6789",
  }),
]);
```

## Usage

### Basic Redaction

```typescript
import { redactum } from "redactum";

const result = redactum("Email me at sarah.chen@company.io");
console.log(result.redactedText);
```

### Custom Replacement

```typescript
const result = redactum("Email: sarah.chen@company.io", {
  replacement: "***",
});

const result = redactum("Email: sarah.chen@company.io", {
  replacement: (match, category) => `[${category}]`,
});
```

### Selective Redaction

```typescript
const result = redactum("Email: sarah.chen@company.io, SSN: 123-45-6789", {
  policies: ["EMAIL_ADDRESS", "SSN"],
});
```

### Custom Patterns

```typescript
import { PolicyCategory } from "redactum";

const result = redactum("Employee: EMP-123456", {
  customPolicies: [
    {
      name: "EMPLOYEE_ID",
      pattern: /EMP-\d{6}/g,
      category: PolicyCategory.CUSTOM,
    },
  ],
});
```

### Length Preservation

```typescript
const result = redactum("Stripe: sk_live_4eC39HqLyjWDarjtT1zdp7dc", {
  preserveLength: true,
  replacement: "*",
});
```

### Batch Processing

```typescript
import { redactumBatch } from "redactum";

const messages = [
  "Support ticket from sarah.chen@company.io",
  "Customer callback: +44 20 7946 0958",
  "Payment failed: 4111-1111-1111-1111",
];

const results = await redactumBatch(messages);
const redactedMessages = results.map((result) => result.redactedText);
```

### Error Handling

```typescript
import { redactumValidateOptions, PolicyCategory } from "redactum";

try {
  redactumValidateOptions({
    policies: ["EMAIL_ADDRESS", "PHONE_NUMBER_UK"],
    customPolicies: [
      {
        name: "EMPLOYEE_ID",
        pattern: /EMP-\d{6}/g,
        category: PolicyCategory.CUSTOM,
      },
    ],
  });
} catch (error) {
  console.error("Invalid configuration:", error.message);
}
```

## API

### Core Functions

- `redactum(text, options?)` - Main redaction function
- `redactumBatch(texts[], options?)` - Batch process multiple texts
- `redactumFromConfig(text, configOptions?)` - Load from config file
- `createRedactum(options?)` - Create stateful instance

### Validation Functions

- `redactumValidateOptions(options)` - Validate configuration
- `redactumValidatePolicy(pattern)` - Validate custom policy

### Utility Functions

- `redactumCalculateEntropy(text)` - Shannon entropy (0-8)
- `redactumLooksLikeSecret(text, minLength?, threshold?)` - Heuristic secret detection
- `redactumGetAllPatterns()` - All built-in policies
- `redactumGetPatterns(options?)` - Patterns for config
- `redactumGetEnabledPolicies(options?)` - Enabled policy names
- `redactumGetEnabledCategories(options?)` - Enabled categories

## Contributing

Contributions, issues, and feature requests are welcome. If you would like to get involved, please open an issue or submit a pull request to help improve the project.

## License

This project is released under the MIT License.
Created and maintained by [Alex Whinfield](https://github.com/alexwhin).
