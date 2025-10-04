# Redactum

Redactum is a fast, zero-dependency PII redaction library for TypeScript and JavaScript that automatically removes sensitive data before it leaves your stack.

**Redactum protects you and your users by redacting:**

- <EmojiTitle emoji="👤" title="Personal information (emails, phone numbers, SSNs)" />
- <EmojiTitle emoji="💳" title="Financial data (credit cards, bank accounts)" />
- <EmojiTitle emoji="🔑" title="Developer secrets (API keys, database URLs, JWT tokens)" />
- <EmojiTitle emoji="🏗️" title="Infrastructure details (IP addresses, AWS credentials)" />

<PatternStats />

## Quick Guide

::: code-group

```typescript [Standalone]
import { redactum } from "redactum";

const userMessage = `Errors found in cloudwatch
ERROR: Failed to connect to database
DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db`;

const result = redactum(userMessage);
```

```typescript [OpenAI]
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

```typescript [Anthropic]
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
      content: `Errors found in cloudwatch
                ERROR: Failed to connect to database
                DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db`,
    },
  ],
});
```

```typescript [LangChain]
import { createLangChainAdapter } from "redactum/providers";
import { Document } from "@langchain/core/documents";

const adapter = createLangChainAdapter();
const transformer = adapter.createDocumentTransformer();

const docs = await transformer([
  new Document({
    pageContent: `Errors found in cloudwatch
                  ERROR: Failed to connect to database
                  DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db`,
  }),
]);
```

```typescript [Vercel AI]
import { createVercelAIAdapter } from "redactum/providers";
import { openai } from "@ai-sdk/openai";

const adapter = createVercelAIAdapter();
const { streamText } = adapter.createStreamingWrapper();

const result = await streamText({
  model: openai("gpt-4"),
  prompt: `Errors found in cloudwatch
           ERROR: Failed to connect to database
           DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db`,
});
```

```typescript [LlamaIndex]
import { createLlamaIndexAdapter } from "redactum/providers";
import { TextNode } from "llamaindex";

const adapter = createLlamaIndexAdapter();
const transformer = adapter.createNodeTransformer();

const nodes = await transformer.transform([
  new TextNode({
    text: `Errors found in cloudwatch
           ERROR: Failed to connect to database
           DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db`,
  }),
]);
```

:::

::: code-group

```text [Output]
Errors found in cloudwatch
ERROR: Failed to connect to database
DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db
```

```json [Response Data]
{
  "text": "Errors found in cloudwatch\nERROR: Failed to connect to database\nDEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db",
  "redactedText": "Errors found in cloudwatch\nERROR: Failed to connect to database\nDEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db",
  "findings": [
    {
      "category": "DATABASE_CREDENTIALS",
      "policyName": "DATABASE_URL",
      "value": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "match": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "start": 80,
      "end": 130,
      "replacement": "postgres://[REDACTED]:[REDACTED]@db:5432/db"
    }
  ],
  "stats": {
    "totalFindings": 1,
    "findingsByCategory": {
      "DATABASE_CREDENTIALS": 1
    },
    "processingTimeMs": 6
  }
}
```

:::

## Use Cases

### AI Development

The wrapper automatically redacts sensitive data from all messages before they reach the LLM provider. Wrap your client and all message content is automatically sanitized:

```typescript
import { createOpenAIAdapter } from "redactum/providers";
import OpenAI from "openai";

const adapter = createOpenAIAdapter();
const openai = adapter.createClientWrapper(new OpenAI());

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "You are a helpful support assistant." },
    { role: "user", content: supportTicket.description },
  ],
});
```

### Log Processing

Sanitize application logs before sending to monitoring services like Datadog:

```typescript
import { redactumBatch } from "redactum";

async function sanitizeLogs(logEntries: LogEntry[]): Promise<string[]> {
  const messages = logEntries.map((log) => log.message);
  const results = await redactumBatch(messages);
  return results.map((result) => result.redactedText);
}
```

### Document Pipelines

Clean sensitive data from documents before ingestion into RAG systems:

```typescript
import { createLangChainAdapter } from "redactum/providers";
import { Document } from "@langchain/core/documents";

const adapter = createLangChainAdapter();
const transformer = adapter.createDocumentTransformer();

const documents = await loadDocuments();
const sanitizedDocs = await transformer(documents);
```

### API Gateway

Add redaction middleware to protect sensitive data in API requests:

```typescript
import { redactum } from "redactum";
import type { Request, Response, NextFunction } from "express";

async function redactionMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  if (request.body && typeof request.body === "object") {
    const body = JSON.stringify(request.body);
    const result = redactum(body);
    request.body = JSON.parse(result.redactedText);
  }
  next();
}
```

### Error Tracking

Sanitize error messages and stack traces before sending to services like Sentry:

```typescript
import { redactum } from "redactum";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  beforeSend(event) {
    if (event.message) {
      event.message = redactum(event.message).redactedText;
    }
    if (event.exception?.values) {
      event.exception.values = event.exception.values.map((exception) => ({
        ...exception,
        value: exception.value
          ? redactum(exception.value).redactedText
          : exception.value,
      }));
    }
    return event;
  },
});
```

### Customer Analytics

Clean user feedback and survey responses before analytics processing:

```typescript
import { redactumBatch } from "redactum";

async function processFeedback(responses: SurveyResponse[]): Promise<void> {
  const comments = responses.map((r) => r.openEndedComment);
  const redacted = await redactumBatch(comments);

  const cleanResponses = responses.map((response, index) => ({
    ...response,
    openEndedComment: redacted[index].redactedText,
    containedPII: redacted[index].findings.length > 0,
  }));

  await analytics.track(cleanResponses);
}
```
