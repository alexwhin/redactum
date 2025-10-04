import type { RedactumOptions, RedactumResult } from "../../types/index.js";

export interface ProviderAdapter<TInput, TOutput, TConfig = RedactumOptions> {
  readonly providerName: string;
  readonly version: string;
  transform(input: TInput, config?: TConfig): Promise<TOutput> | TOutput;
  validateInput?(input: TInput): boolean;
  supportsStreaming?: boolean;
  supportsBatch?: boolean;
}

export interface DocumentProvider<TDoc>
  extends ProviderAdapter<TDoc[], TDoc[]> {
  transformDocument(document: TDoc): Promise<TDoc> | TDoc;
  extractText(document: TDoc): string;
  updateText(
    document: TDoc,
    redactedText: string,
    metadata?: Record<string, unknown>
  ): TDoc;
  extractMetadata?(document: TDoc): Record<string, unknown>;
  updateMetadata?(document: TDoc, metadata: Record<string, unknown>): TDoc;
}

export interface ComponentProvider<TComponent>
  extends ProviderAdapter<unknown, TComponent> {
  createComponent(options?: RedactumOptions): TComponent;
  integrate?(pipeline: unknown, component: TComponent): unknown;
}

export interface RunnableProvider<TRunnable>
  extends ProviderAdapter<string | unknown, TRunnable> {
  createRunnable(options?: RedactumOptions): TRunnable;
  createRunnableWithMetadata?(options?: RedactumOptions): TRunnable;
  createPreprocessingChain?(options?: RedactumOptions): TRunnable;
}

export interface FrameworkDetection {
  name: string;
  detectPackage: string;
  version?: string;
  loader: () => Promise<ProviderAdapter<unknown, unknown>>;
  dependencies?: string[];
}

export interface ProviderMetadata {
  name: string;
  displayName: string;
  description: string;
  category: "document" | "component" | "runnable" | "multi-agent" | "other";
  supportedVersions: string[];
  experimental?: boolean;
  docUrl?: string;
}

export interface ProviderRegistryResult<T = unknown> {
  success: boolean;
  provider?: T;
  error?: string;
  metadata?: ProviderMetadata;
}

export interface UniversalRedactionConfig extends RedactumOptions {
  includeFindings?: boolean;
  metadataKeys?: string[];
  metadataTransformer?: (
    metadata: Record<string, unknown>,
    findings: unknown[]
  ) => Record<string, unknown>;
  providerOptions?: Record<string, unknown>;
}

export interface UniversalRedactionResult<T = unknown> {
  content: T;
  redactionResult: RedactumResult;
  providerMetadata?: Record<string, unknown>;
  processingTime: number;
}
