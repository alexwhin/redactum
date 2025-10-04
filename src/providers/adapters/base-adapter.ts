import { UniversalProvider } from "../universal-provider.js";
import type { UniversalRedactionConfig } from "../base/types.js";

export abstract class BaseAdapter<TInput = unknown, TOutput = unknown> {
  protected provider: UniversalProvider;

  abstract readonly providerName: string;
  abstract readonly version: string;

  constructor(config: UniversalRedactionConfig = {}) {
    this.provider = new UniversalProvider(config);
  }

  abstract transform(input: TInput): Promise<TOutput> | TOutput;

  updateConfig(newConfig: Partial<UniversalRedactionConfig>): void {
    this.provider.updateConfig(newConfig);
  }

  getConfig(): UniversalRedactionConfig {
    return this.provider.getConfig();
  }
}
