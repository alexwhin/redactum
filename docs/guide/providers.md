# Providers

Redactum provides native adapters for popular AI providers. Each adapter is designed to work seamlessly with the provider's patterns and conventions.

## <img src="/favicons/openai.png" width="20" height="20" style="display: inline; vertical-align: -0.15em; margin-right: 8px; border-radius: 50%; border: 1px solid black;" /> OpenAI

Protect data before sending to OpenAI. Learn more at [platform.openai.com](https://platform.openai.com/)

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

<!-- markdownlint-disable MD033 -->

::: code-group

```text [Output]
Errors found in cloudwatch
ERROR: Failed to connect to database
DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db
```

```json [Response Data]
{
  "text": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db",
  "redactedText": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db",
  "findings": [
    {
      "category": "DATABASE_CREDENTIALS",
      "policyName": "DATABASE_URL",
      "value": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "match": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "start": 82,
      "end": 136,
      "replacement": "postgres://[REDACTED]:[REDACTED]@db:5432/db"
    }
  ],
  "stats": {
    "totalFindings": 1,
    "findingsByCategory": {
      "DATABASE_CREDENTIALS": 1
    },
    "processingTimeMs": 2
  }
}
```

:::

## <img src="/favicons/anthropic.ico" width="20" height="20" style="display: inline; vertical-align: -0.15em; margin-right: 8px; border-radius: 50%; border: 1px solid black;" /> Anthropic

Integrate with Claude API. Learn more at [anthropic.com](https://www.anthropic.com/)

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
      content: `Errors found in cloudwatch
                ERROR: Failed to connect to database
                DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db`,
    },
  ],
});
```

::: code-group

```text [Output]
Errors found in cloudwatch
ERROR: Failed to connect to database
DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db
```

```json [Response Data]
{
  "text": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db",
  "redactedText": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db",
  "findings": [
    {
      "category": "DATABASE_CREDENTIALS",
      "policyName": "DATABASE_URL",
      "value": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "match": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "start": 82,
      "end": 136,
      "replacement": "postgres://[REDACTED]:[REDACTED]@db:5432/db"
    }
  ],
  "stats": {
    "totalFindings": 1,
    "findingsByCategory": {
      "DATABASE_CREDENTIALS": 1
    },
    "processingTimeMs": 2
  }
}
```

:::

## <img src="/favicons/langchain.ico" width="20" height="20" style="display: inline; vertical-align: -0.15em; margin-right: 8px; border-radius: 50%; border: 1px solid black;" /> LangChain

Transform documents and messages before sending. Learn more at [langchain.com](https://www.langchain.com/)

```typescript
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

::: code-group

```text [Output]
Errors found in cloudwatch
ERROR: Failed to connect to database
DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db
```

```json [Response Data]
{
  "text": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db",
  "redactedText": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db",
  "findings": [
    {
      "category": "DATABASE_CREDENTIALS",
      "policyName": "DATABASE_URL",
      "value": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "match": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "start": 82,
      "end": 136,
      "replacement": "postgres://[REDACTED]:[REDACTED]@db:5432/db"
    }
  ],
  "stats": {
    "totalFindings": 1,
    "findingsByCategory": {
      "DATABASE_CREDENTIALS": 1
    },
    "processingTimeMs": 2
  }
}
```

:::

### Use in Chains

```typescript
import { createLangChainAdapter } from "redactum/providers";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

const adapter = createLangChainAdapter();
const runnable = await adapter.createRunnable();
const model = new ChatOpenAI();

const chain = RunnableSequence.from([runnable, model]);
const result = await chain.invoke("My email is john@company.io");
```

## <img src="/favicons/vercel.ico" width="20" height="20" style="display: inline; vertical-align: -0.15em; margin-right: 8px; border-radius: 50%; border: 1px solid black;" /> Vercel AI SDK

Redact messages in AI SDK applications. Learn more at [sdk.vercel.ai](https://sdk.vercel.ai/)

```typescript
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

::: code-group

```text [Output]
Errors found in cloudwatch
ERROR: Failed to connect to database
DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db
```

```json [Response Data]
{
  "text": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db",
  "redactedText": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db",
  "findings": [
    {
      "category": "DATABASE_CREDENTIALS",
      "policyName": "DATABASE_URL",
      "value": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "match": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "start": 82,
      "end": 136,
      "replacement": "postgres://[REDACTED]:[REDACTED]@db:5432/db"
    }
  ],
  "stats": {
    "totalFindings": 1,
    "findingsByCategory": {
      "DATABASE_CREDENTIALS": 1
    },
    "processingTimeMs": 2
  }
}
```

:::

## <img src="/favicons/llamaindex.png" width="20" height="20" style="display: inline; vertical-align: -0.15em; margin-right: 8px; border-radius: 50%; border: 1px solid black;" /> LlamaIndex

Protect node content in your RAG pipelines. Learn more at [llamaindex.ai](https://www.llamaindex.ai/)

```typescript
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

::: code-group

```text [Output]
Errors found in cloudwatch
ERROR: Failed to connect to database
DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db
```

```json [Response Data]
{
  "text": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://admin:u$k9!fR2@qLx2@db:5432/db",
  "redactedText": "Errors found in cloudwatch ERROR: Failed to connect to database DEBUG: DATABASE=postgres://[REDACTED]:[REDACTED]@db:5432/db",
  "findings": [
    {
      "category": "DATABASE_CREDENTIALS",
      "policyName": "DATABASE_URL",
      "value": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "match": "postgres://admin:u$k9!fR2@qLx2@db:5432/db",
      "start": 82,
      "end": 136,
      "replacement": "postgres://[REDACTED]:[REDACTED]@db:5432/db"
    }
  ],
  "stats": {
    "totalFindings": 1,
    "findingsByCategory": {
      "DATABASE_CREDENTIALS": 1
    },
    "processingTimeMs": 2
  }
}
```

:::
