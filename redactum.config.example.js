// Redactum Configuration Example (JavaScript)
// This file demonstrates advanced configuration using JavaScript

import { RedactumCategory } from 'redactum';

// Dynamic configuration based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isCI = process.env.CI === 'true';

export default {
  // Basic settings
  mask: '*',
  replacement: isDevelopment ? '[REDACTED]' : '[***]',
  globalMode: 'replace',
  preserveLength: false,
  preserveFormat: false,

  // Categories with conditional logic
  categories: {
    [RedactumCategory.EMAIL]: {
      enabled: true,
      mode: isDevelopment ? 'mask' : 'hash',
      replacement: '[EMAIL]',
    },
    [RedactumCategory.PHONE]: {
      enabled: true,
      mode: 'replace',
      replacement: '[PHONE]',
      // Custom pattern for specific phone format
      customPattern: isDevelopment ? null : '\\+1\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}',
    },
    [RedactumCategory.SSN]: {
      enabled: true,
      mode: 'hash',
      replacement: '[SSN]',
    },
    [RedactumCategory.CREDIT_CARD]: {
      enabled: true,
      mode: 'mask',
      replacement: '[CARD]',
      preserveFormat: true, // Keep card format (e.g., ****-****-****-1234)
    },
    // Enable all security-related categories
    [RedactumCategory.API_KEY]: true,
    [RedactumCategory.AWS_KEY]: true,
    [RedactumCategory.PRIVATE_KEY]: true,
    [RedactumCategory.DEV_SECRET]: true,

    // Conditionally enable based on environment
    [RedactumCategory.ADDRESS]: !isDevelopment,
    [RedactumCategory.PERSON_NAME]: !isDevelopment,
    [RedactumCategory.MEDICAL]: process.env.ENABLE_MEDICAL_REDACTION === 'true',
  },

  // Dynamic custom patterns
  customPatterns: [
    {
      name: 'Employee ID',
      pattern: `EMP-${process.env.COMPANY_CODE || 'XX'}-\\d{6}`,
      replacement: '[EMPLOYEE]',
      mode: 'replace',
    },
    // Add patterns based on configuration
    ...(process.env.CUSTOM_PATTERNS ? JSON.parse(process.env.CUSTOM_PATTERNS) : []),
    // Add debug patterns in development
    ...(isDevelopment ? [
      {
        name: 'Debug Token',
        pattern: 'DEBUG-[A-Z0-9]{8}',
        replacement: '[DEBUG]',
        mode: 'replace',
      }
    ] : []),
  ],

  // Hash configuration with environment-based salt
  hashOptions: {
    algorithm: 'sha256',
    salt: process.env.REDACTUM_SALT || 'default-salt',
    encoding: 'hex',
  },

  // Performance settings based on environment
  performance: {
    maximumInputSize: isCI ? 5 * 1024 * 1024 : 20 * 1024 * 1024, // 5MB in CI, 20MB otherwise
    timeout: isDevelopment ? 60000 : 30000, // 60s in dev, 30s in prod
    cachePatterns: !isDevelopment, // Disable caching in development for hot reload
    streamThreshold: 1024 * 1024, // 1MB
  },

  // Security settings
  security: {
    preventRegexDos: true,
    maximumPatternLength: 1000,
    maximumCustomPatterns: isDevelopment ? 200 : 100,
    auditLog: process.env.ENABLE_AUDIT_LOG === 'true',
  },

  // Locale configuration
  locale: process.env.LOCALE?.split(',') || ['en'],
  detectLanguage: process.env.AUTO_DETECT_LANGUAGE === 'true',

  // Environment configurations
  env: {
    development: {
      security: {
        auditLog: false,
        preventRegexDos: false, // Faster startup in dev
      },
    },
    staging: {
      performance: {
        timeout: 45000,
      },
    },
    production: {
      security: {
        auditLog: true,
        preventRegexDos: true,
      },
      performance: {
        cachePatterns: true,
      },
    },
  },

  // Function to generate presets programmatically
  presets: {
    // PCI compliance preset
    pci: {
      categories: [
        RedactumCategory.CREDIT_CARD,
        RedactumCategory.FINANCIAL,
        RedactumCategory.SSN,
        RedactumCategory.API_KEY,
      ],
      security: {
        auditLog: true,
      },
    },

    // HIPAA compliance preset
    hipaa: {
      categories: {
        [RedactumCategory.SSN]: true,
        [RedactumCategory.MEDICAL]: true,
        [RedactumCategory.PERSON_NAME]: true,
        [RedactumCategory.ADDRESS]: true,
        [RedactumCategory.PHONE]: true,
        [RedactumCategory.EMAIL]: true,
        [RedactumCategory.DATE_OF_BIRTH]: true,
      },
      security: {
        auditLog: true,
        preventRegexDos: true,
      },
    },

    // GDPR compliance preset
    gdpr: {
      categories: Object.values(SensitiveDataCategory).reduce((acc, category) => {
        // Enable all personal data categories
        if (category !== RedactumCategory.CUSTOM) {
          acc[category] = true;
        }
        return acc;
      }, {}),
      preserveLength: false,
      security: {
        auditLog: true,
      },
    },
  },
};