import { createRedactum } from "../core/redactum.js";
import type {
  UniversalRedactionConfig,
  UniversalRedactionResult,
} from "./base/types.js";
import type { RedactumFinding } from "../types/index.js";

export class UniversalProvider {
  private redactor: ReturnType<typeof createRedactum>;
  private config: UniversalRedactionConfig;

  constructor(config: UniversalRedactionConfig = {}) {
    this.config = this.normalizeConfig(config);
    this.redactor = createRedactum(this.config);
  }

  redact(input: unknown): UniversalRedactionResult {
    const startTime = Date.now();

    const { text, metadata } = this.extractContent(input);
    const textResult = this.redactor.redactum(text);
    const { redactedMetadata, metadataFindings } =
      this.redactMetadata(metadata);
    const allFindings: RedactumFinding[] = [
      ...textResult.findings,
      ...metadataFindings,
    ];

    const finalMetadata = this.transformMetadata(redactedMetadata, allFindings);

    return {
      content: textResult.redactedText,
      redactionResult: {
        ...textResult,
        findings: allFindings,
      },
      providerMetadata: finalMetadata,
      processingTime: Date.now() - startTime,
    };
  }

  async redactBatch(inputs: unknown[]): Promise<UniversalRedactionResult[]> {
    return Promise.all(inputs.map((input) => this.redact(input)));
  }

  updateConfig(newConfig: Partial<UniversalRedactionConfig>): void {
    this.config = this.normalizeConfig({ ...this.config, ...newConfig });
    this.redactor.updateOptions(this.config);
  }

  getConfig(): UniversalRedactionConfig {
    return { ...this.config };
  }

  private extractContent(input: unknown): {
    text: string;
    metadata: Record<string, unknown>;
  } {
    if (typeof input === "string") {
      return { text: input, metadata: {} };
    }

    if (input && typeof input === "object") {
      let text = "";
      let metadata: Record<string, unknown> = {};

      const textProps = ["text", "content", "pageContent", "data", "value"];
      for (const prop of textProps) {
        if (
          prop in input &&
          typeof (input as Record<string, unknown>)[prop] === "string"
        ) {
          text = (input as Record<string, unknown>)[prop] as string;
          break;
        }
      }

      if (
        !text &&
        "getText" in input &&
        typeof (input as { getText?: unknown }).getText === "function"
      ) {
        text = (input as { getText: () => string }).getText();
      }

      const metaProps = ["metadata", "meta", "properties", "attributes"];
      for (const prop of metaProps) {
        if (
          prop in input &&
          typeof (input as Record<string, unknown>)[prop] === "object"
        ) {
          metadata = (input as Record<string, unknown>)[prop] as Record<
            string,
            unknown
          >;
          break;
        }
      }

      if (
        Object.keys(metadata).length === 0 &&
        "getMetadata" in input &&
        typeof (input as { getMetadata?: unknown }).getMetadata === "function"
      ) {
        metadata = (
          input as { getMetadata: () => Record<string, unknown> }
        ).getMetadata();
      }

      if (
        !text &&
        "toString" in input &&
        typeof (input as { toString?: unknown }).toString === "function"
      ) {
        text = (input as object).toString();
      }

      return { text: text || String(input), metadata };
    }

    return { text: String(input), metadata: {} };
  }

  private redactMetadata(metadata: Record<string, unknown>): {
    redactedMetadata: Record<string, unknown>;
    metadataFindings: RedactumFinding[];
  } {
    if (!this.config.metadataKeys || this.config.metadataKeys.length === 0) {
      return { redactedMetadata: metadata, metadataFindings: [] };
    }

    const redactedMetadata = { ...metadata };
    const metadataFindings: RedactumFinding[] = [];

    for (const key of this.config.metadataKeys) {
      if (key in metadata && typeof metadata[key] === "string") {
        const result = this.redactor.redactum(metadata[key] as string);
        redactedMetadata[key] = result.redactedText;
        metadataFindings.push(...result.findings);
      }
    }

    return { redactedMetadata, metadataFindings };
  }

  private transformMetadata(
    metadata: Record<string, unknown>,
    findings: RedactumFinding[]
  ): Record<string, unknown> {
    if (this.config.metadataTransformer) {
      return this.config.metadataTransformer(metadata, findings);
    }

    if (this.config.includeFindings && findings.length > 0) {
      return {
        ...metadata,
        piiRedaction: {
          findings,
          redactedAt: new Date().toISOString(),
          totalFindings: findings.length,
        },
      };
    }

    return metadata;
  }

  private normalizeConfig(
    config: UniversalRedactionConfig
  ): UniversalRedactionConfig {
    return {
      includeFindings: false,
      metadataKeys: [],
      providerOptions: {},
      ...config,
    };
  }
}

export function createUniversalProvider(
  config?: UniversalRedactionConfig
): UniversalProvider {
  return new UniversalProvider(config);
}
