import type { ResolvedConfig, CategoryConfig } from "./types.js";
import { PolicyCategory } from "../types/index.js";

const DEFAULT_CATEGORIES: Record<
  PolicyCategory,
  CategoryConfig & { enabled: boolean }
> = {
  [PolicyCategory.EMAIL]: {
    enabled: true,
    mode: "replace",
    replacement: "[EMAIL]",
    preserveFormat: false,
  },
  [PolicyCategory.PHONE]: {
    enabled: true,
    mode: "replace",
    replacement: "[PHONE]",
    preserveFormat: false,
  },
  [PolicyCategory.SSN]: {
    enabled: true,
    mode: "replace",
    replacement: "[SSN]",
    preserveFormat: false,
  },
  [PolicyCategory.CREDIT_CARD]: {
    enabled: true,
    mode: "replace",
    replacement: "[CREDIT_CARD]",
    preserveFormat: false,
  },
  [PolicyCategory.IP_ADDRESS]: {
    enabled: true,
    mode: "replace",
    replacement: "[IP]",
    preserveFormat: false,
  },
  [PolicyCategory.API_KEY]: {
    enabled: true,
    mode: "replace",
    replacement: "[API_KEY]",
    preserveFormat: false,
  },
  [PolicyCategory.AWS_KEY]: {
    enabled: true,
    mode: "replace",
    replacement: "[AWS_KEY]",
    preserveFormat: false,
  },
  [PolicyCategory.PRIVATE_KEY]: {
    enabled: true,
    mode: "replace",
    replacement: "[PRIVATE_KEY]",
    preserveFormat: false,
  },
  [PolicyCategory.ADDRESS]: {
    enabled: false,
    mode: "replace",
    replacement: "[ADDRESS]",
    preserveFormat: false,
  },
  [PolicyCategory.DATE_OF_BIRTH]: {
    enabled: false,
    mode: "replace",
    replacement: "[DOB]",
    preserveFormat: false,
  },
  [PolicyCategory.PERSON_NAME]: {
    enabled: false,
    mode: "replace",
    replacement: "[NAME]",
    preserveFormat: false,
  },
  [PolicyCategory.GOVERNMENT_ID]: {
    enabled: true,
    mode: "replace",
    replacement: "[GOV_ID]",
    preserveFormat: false,
  },
  [PolicyCategory.TAX_IDENTIFIER]: {
    enabled: true,
    mode: "replace",
    replacement: "[TAX_ID]",
    preserveFormat: false,
  },
  [PolicyCategory.INSURANCE]: {
    enabled: true,
    mode: "replace",
    replacement: "[INSURANCE]",
    preserveFormat: false,
  },
  [PolicyCategory.FINANCIAL]: {
    enabled: true,
    mode: "replace",
    replacement: "[FINANCIAL]",
    preserveFormat: false,
  },
  [PolicyCategory.MEDICAL]: {
    enabled: false,
    mode: "replace",
    replacement: "[MEDICAL]",
    preserveFormat: false,
  },
  [PolicyCategory.DIGITAL_IDENTITY]: {
    enabled: true,
    mode: "replace",
    replacement: "[DIGITAL_ID]",
    preserveFormat: false,
  },
  [PolicyCategory.GEOGRAPHIC]: {
    enabled: false,
    mode: "replace",
    replacement: "[GEO]",
    preserveFormat: false,
  },
  [PolicyCategory.EMPLOYEE_ID]: {
    enabled: false,
    mode: "replace",
    replacement: "[EMPLOYEE_ID]",
    preserveFormat: false,
  },
  [PolicyCategory.VEHICLE]: {
    enabled: false,
    mode: "replace",
    replacement: "[VEHICLE]",
    preserveFormat: false,
  },
  [PolicyCategory.DEV_SECRET]: {
    enabled: true,
    mode: "replace",
    replacement: "[SECRET]",
    preserveFormat: false,
  },
  [PolicyCategory.DEV_IDENTIFIER]: {
    enabled: false,
    mode: "replace",
    replacement: "[DEV_ID]",
    preserveFormat: false,
  },
  [PolicyCategory.CLOUD_CREDENTIALS]: {
    enabled: true,
    mode: "replace",
    replacement: "[CLOUD_CRED]",
    preserveFormat: false,
  },
  [PolicyCategory.CI_CD_SECRETS]: {
    enabled: true,
    mode: "replace",
    replacement: "[CI_CD_SECRET]",
    preserveFormat: false,
  },
  [PolicyCategory.PACKAGE_REGISTRY]: {
    enabled: true,
    mode: "replace",
    replacement: "[REGISTRY_TOKEN]",
    preserveFormat: false,
  },
  [PolicyCategory.DATABASE_CREDENTIALS]: {
    enabled: true,
    mode: "replace",
    replacement: "[DB_CRED]",
    preserveFormat: false,
  },
  [PolicyCategory.MONITORING_SECRETS]: {
    enabled: true,
    mode: "replace",
    replacement: "[MONITORING_KEY]",
    preserveFormat: false,
  },
  [PolicyCategory.AUTH_SECRETS]: {
    enabled: true,
    mode: "replace",
    replacement: "[AUTH_SECRET]",
    preserveFormat: false,
  },
  [PolicyCategory.MESSAGING_SECRETS]: {
    enabled: true,
    mode: "replace",
    replacement: "[MESSAGING_CRED]",
    preserveFormat: false,
  },
  [PolicyCategory.WEBHOOK_URLS]: {
    enabled: true,
    mode: "replace",
    replacement: "[WEBHOOK]",
    preserveFormat: false,
  },
  [PolicyCategory.ENCRYPTION_KEYS]: {
    enabled: true,
    mode: "replace",
    replacement: "[ENCRYPTION_KEY]",
    preserveFormat: false,
  },
  [PolicyCategory.CONTAINER_REGISTRY]: {
    enabled: true,
    mode: "replace",
    replacement: "[CONTAINER_TOKEN]",
    preserveFormat: false,
  },
  [PolicyCategory.INFRASTRUCTURE_SECRETS]: {
    enabled: true,
    mode: "replace",
    replacement: "[INFRA_SECRET]",
    preserveFormat: false,
  },
  [PolicyCategory.CUSTOM]: {
    enabled: false,
    mode: "replace",
    replacement: "[CUSTOM]",
    preserveFormat: false,
  },
};

export function getDefaultConfig(): ResolvedConfig {
  return {
    mask: "*",
    replacement: "[REDACTED]",
    globalMode: "replace",
    preserveLength: false,
    preserveFormat: false,
    locale: "en",
    detectLanguage: false,
    categories: new Map(
      Object.entries(DEFAULT_CATEGORIES) as [
        PolicyCategory,
        CategoryConfig & { enabled: boolean }
      ][]
    ),
    customPolicies: [],
    hashOptions: {
      algorithm: "sha256",
      salt: "",
      encoding: "hex",
    },
    encryptOptions: {
      algorithm: "aes-256-gcm",
      key: undefined,
      iv: undefined,
    },
    performance: {
      maximumInputSize: 10 * 1024 * 1024,
      timeout: 30000,
      cachePatterns: true,
      streamThreshold: 1024 * 1024,
    },
    security: {
      preventRegexDos: true,
      maximumPatternLength: 1000,
      maximumCustomPatterns: 100,
      auditLog: false,
    },
  };
}

export const CONFIG_FILE_NAMES = [
  ".redactumrc.json",
  ".redactumrc.js",
  ".redactumrc.cjs",
  ".redactumrc.mjs",
  ".redactumrc.yaml",
  ".redactumrc.yml",
  "redactum.config.json",
  "redactum.config.js",
  "redactum.config.cjs",
  "redactum.config.mjs",
  "redactum.config.yaml",
  "redactum.config.yml",
];

export const CONFIG_SCHEMA_URL =
  "https://raw.githubusercontent.com/your-org/redactum/main/schema/config-schema.json";
