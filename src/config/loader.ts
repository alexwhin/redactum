import { promises as fs } from "fs";
import { join, resolve, dirname } from "path";
import { pathToFileURL, fileURLToPath } from "url";
import { parse as parseYAML } from "yaml";
import type { 
  ConfigFile, 
  RedactionConfig, 
  ConfigLoaderOptions,
  ResolvedConfig,
  CategoryConfig
} from "./types.js";
import type { ConfigValidationError as ValidationError } from "./types.js";
import { getDefaultConfig, CONFIG_FILE_NAMES } from "./defaults.js";
import { validateConfig } from "./validator.js";
import { mergeConfigs } from "./merger.js";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PolicyCategory } from "../types/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class ConfigLoader {
  private cache = new Map<string, ConfigFile>();
  private searchPaths: string[];
  
  constructor(private options: ConfigLoaderOptions = {}) {
    this.searchPaths = options.searchPaths || [
      process.cwd(),
      join(process.cwd(), "config"),
      join(process.cwd(), ".config"),
      process.env["HOME"] || "",
      join(process.env["HOME"] || "", ".config", "redactum"),
    ].filter(Boolean);
  }

  async load(): Promise<ResolvedConfig> {
    const configFile = await this.findAndLoadConfig();

    const mergedConfig = await this.resolveExtends(configFile);
    const finalConfig = this.applyEnvironmentAndPresets(mergedConfig);

    const validation = validateConfig(finalConfig);
    if (validation.errors.length > 0) {
      throw new ConfigValidationError("Invalid configuration", validation.errors);
    }

    return this.createResolvedConfig(finalConfig);
  }

  private async findAndLoadConfig(): Promise<ConfigFile | undefined> {
    if (this.options.configPath) {
      return this.loadConfigFile(this.options.configPath);
    }

    for (const searchPath of this.searchPaths) {
      for (const filename of CONFIG_FILE_NAMES) {
        const filepath = join(searchPath, filename);
        try {
          await fs.access(filepath);
          const config = await this.loadConfigFile(filepath);
          if (this.options.stopOnFirstFound) {
            return config;
          }
        } catch {
          continue;
        }
      }
    }
    
    return undefined;
  }

  private async loadConfigFile(filepath: string): Promise<ConfigFile> {
    const cached = this.cache.get(filepath);
    if (cached) {
      return cached;
    }

    const absolutePath = resolve(filepath);
    const content = await fs.readFile(absolutePath, "utf-8");
    const ext = filepath.split(".").pop()?.toLowerCase();

    let config: ConfigFile;

    switch (ext) {
      case "json":
        config = JSON.parse(content);
        break;
        
      case "yaml":
      case "yml":
        config = parseYAML(content);
        break;
        
      case "js":
      case "mjs":
      case "cjs": {
        const fileUrl = pathToFileURL(absolutePath).href;
        const module = await import(/* @vite-ignore */ fileUrl);
        config = module.default || module;
        break;
      }
        
      default:
        throw new Error(`Unsupported config file format: ${ext}`);
    }

    this.cache.set(filepath, config);

    return config;
  }

  private loadEnvironmentConfig(): RedactionConfig | undefined {
    if (!this.options.allowEnvironmentOverrides) {
      return undefined;
    }

    const config: Partial<RedactionConfig> = {};
    
    if (process.env["REDACTUM_MASK"]) {
      config.mask = process.env["REDACTUM_MASK"];
    }
    
    if (process.env["REDACTUM_REPLACEMENT"]) {
      config.replacement = process.env["REDACTUM_REPLACEMENT"];
    }
    
    if (process.env["REDACTUM_CATEGORIES"]) {
      config.categories = process.env["REDACTUM_CATEGORIES"].split(",") as PolicyCategory[];
    }
    
    if (process.env["REDACTUM_MODE"]) {
      config.globalMode = process.env["REDACTUM_MODE"] as RedactionConfig["globalMode"];
    }
    
    if (process.env["REDACTUM_PRESERVE_LENGTH"]) {
      config.preserveLength = process.env["REDACTUM_PRESERVE_LENGTH"] === "true";
    }
    
    if (process.env["REDACTUM_PRESERVE_FORMAT"]) {
      config.preserveFormat = process.env["REDACTUM_PRESERVE_FORMAT"] === "true";
    }
    
    if (process.env["REDACTUM_LOCALE"]) {
      config.locale = process.env["REDACTUM_LOCALE"].split(",");
    }
    
    if (process.env["REDACTUM_DETECT_LANGUAGE"]) {
      config.detectLanguage = process.env["REDACTUM_DETECT_LANGUAGE"] === "true";
    }

    return Object.keys(config).length > 0 ? config as RedactionConfig : undefined;
  }

  private async resolveExtends(config?: ConfigFile): Promise<ConfigFile> {
    if (!config || !config.extends || !this.options.mergeExtends) {
      return config || {};
    }

    const extendsList = Array.isArray(config.extends) ? config.extends : [config.extends];
    let baseConfig: RedactionConfig = {};

    for (const extendPath of extendsList) {
      const resolvedPath = this.resolveExtendPath(extendPath);
      const extendConfig = await this.loadConfigFile(resolvedPath);
      const resolvedExtend = await this.resolveExtends(extendConfig);
      baseConfig = mergeConfigs(baseConfig, resolvedExtend as RedactionConfig);
    }

    const { extends: _, ...configWithoutExtends } = config;

    return mergeConfigs(baseConfig, configWithoutExtends) as ConfigFile;
  }

  private resolveExtendPath(extendPath: string): string {
    if (extendPath.startsWith("@redactum/")) {
      const presetName = extendPath.slice("@redactum/".length);

      return join(__dirname, "..", "presets", `${presetName}.json`);
    }

    if (!extendPath.includes("/") && !extendPath.startsWith(".")) {
      return join(process.cwd(), "node_modules", extendPath);
    }

    return resolve(process.cwd(), extendPath);
  }

  private applyEnvironmentAndPresets(config: ConfigFile): RedactionConfig {
    let result: RedactionConfig = config;

    if (this.options.preset && config.presets?.[this.options.preset]) {
      const presetConfig = config.presets[this.options.preset];
      if (presetConfig) {
        result = mergeConfigs(result, presetConfig) as RedactionConfig;
      }
    }

    if (this.options.env && config.env?.[this.options.env]) {
      const envConfig = config.env[this.options.env];
      if (envConfig) {
        result = mergeConfigs(result, envConfig) as RedactionConfig;
      }
    }

    const envConfig = this.loadEnvironmentConfig();
    if (envConfig) {
      result = mergeConfigs(result, envConfig) as RedactionConfig;
    }

    return result;
  }

  private createResolvedConfig(config: RedactionConfig): ResolvedConfig {
    const defaults = getDefaultConfig();
    const merged = mergeConfigs(defaults as unknown as RedactionConfig, config) as RedactionConfig;

    const categories = new Map<PolicyCategory, CategoryConfig & { enabled: boolean }>();

    if (Array.isArray(merged.categories)) {
      for (const [cat, defaultConfig] of defaults.categories.entries()) {
        categories.set(cat, { ...defaultConfig, enabled: false });
      }
      for (const category of merged.categories) {
        const defaultCat = defaults.categories.get(category);
        if (defaultCat) {
          categories.set(category, { ...defaultCat, enabled: true });
        }
      }
    } else if (merged.categories && typeof merged.categories === "object") {
      for (const [cat, defaultConfig] of defaults.categories.entries()) {
        categories.set(cat, defaultConfig);
      }
      for (const [cat, config] of Object.entries(merged.categories) as [PolicyCategory, boolean | CategoryConfig][]) {
        const defaultCat = defaults.categories.get(cat);
        if (defaultCat) {
          if (typeof config === "boolean") {
            categories.set(cat, { ...defaultCat, enabled: config });
          } else {
            categories.set(cat, { ...defaultCat, ...config, enabled: config.enabled ?? true });
          }
        }
      }
    } else {
      for (const [cat, defaultConfig] of defaults.categories.entries()) {
        categories.set(cat, defaultConfig);
      }
    }

    return {
      ...defaults,
      ...merged,
      categories,
      customPolicies: merged.customPolicies?.map(cp => ({
        name: cp.name,
        pattern: new RegExp(cp.pattern, cp.flags),
        replacement: cp.replacement ?? merged.replacement ?? defaults.replacement,
        mode: cp.mode ?? merged.globalMode ?? defaults.globalMode,
      })) ?? [],
    } as ResolvedConfig;
  }
}

export class ConfigValidationError extends Error {
  constructor(message: string, public errors: ValidationError[]) {
    super(message);
    this.name = "ConfigValidationError";
  }
}

export async function loadConfig(options?: ConfigLoaderOptions): Promise<ResolvedConfig> {
  const loader = new ConfigLoader(options);

  return loader.load();
}