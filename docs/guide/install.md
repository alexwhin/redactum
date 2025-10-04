# Install

## Installation

Install Redactum using your preferred package manager. Requires Node.js 18+ and TypeScript 4.5+ (for TypeScript users).

::: code-group

```bash [pnpm]
pnpm add redactum
```

```bash [yarn]
yarn add redactum
```

```bash [npm]
npm install redactum
```

:::

## Providers

Redactum includes native adapters for popular AI/ML frameworks and SDKs. These adapters automatically redact sensitive data before it reaches external services.

| Provider                                   | Package             | Documentation                                           |
| ------------------------------------------ | ------------------- | ------------------------------------------------------- |
| [OpenAI](./providers#openai)               | `openai`            | [platform.openai.com](https://platform.openai.com/docs) |
| [Anthropic](./providers#anthropic)         | `@anthropic-ai/sdk` | [docs.anthropic.com](https://docs.anthropic.com)        |
| [LangChain](./providers#langchain)         | `@langchain/core`   | [js.langchain.com](https://js.langchain.com/docs)       |
| [LlamaIndex](./providers#llamaindex)       | `llamaindex`        | [ts.llamaindex.ai](https://ts.llamaindex.ai)            |
| [Vercel AI SDK](./providers#vercel-ai-sdk) | `ai`                | [sdk.vercel.ai](https://sdk.vercel.ai/docs)             |

::: tip Zero Dependencies
The core `redactum` package has zero runtime dependencies. Provider packages are optional peer dependencies that are only loaded when you use the specific integrations.
:::

## Module Systems

Redactum supports ESM and CommonJS with TypeScript definitions included.

::: code-group

```typescript [ESM (Recommended)]
import { redactum } from "redactum";
```

```javascript [CommonJS]
const { redactum } = require("redactum");
```

:::
