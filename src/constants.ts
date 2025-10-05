import type { Policy } from "./types/index.js";
import { PolicyCategory } from "./types/index.js";

export const DEFAULT_REPLACEMENT = "[REDACTED]";

export const POLICIES: Policy[] = [
  {
    name: "EMAIL_ADDRESS",
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    category: PolicyCategory.EMAIL,
    replacement: "[EMAIL]",
  },
  {
    name: "OPENAI_API_KEY",
    pattern: /\bsk-[a-zA-Z0-9]{20,}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[OPENAI_KEY]",
  },
  {
    name: "ANTHROPIC_API_KEY",
    pattern: /\bsk-ant-[a-zA-Z0-9-_]{95,}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[ANTHROPIC_KEY]",
  },
  {
    name: "UUID",
    pattern:
      /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi,
    category: PolicyCategory.DIGITAL_IDENTITY,
    replacement: "[UUID]",
  },
  {
    name: "PHONE_NUMBER_UK",
    pattern: /(?:\+44|0)[1-9]\d{8,9}\b/g,
    category: PolicyCategory.PHONE,
    replacement: "[PHONE]",
  },
  {
    name: "PHONE_NUMBER_CANADIAN",
    pattern:
      /\b(?:\+1|1)?[\s-]?\(?[2-9][0-8][0-9]\)?[\s-]?[2-9][0-9]{2}[\s-]?[0-9]{4}\b/g,
    category: PolicyCategory.PHONE,
    replacement: "[PHONE]",
  },
  {
    name: "PHONE_NUMBER_INTERNATIONAL",
    pattern: /(?:^|(?<=\s))\+[1-9]\d{1,14}\b/g,
    category: PolicyCategory.PHONE,
    replacement: "[PHONE]",
  },
  {
    name: "PHONE_NUMBER_US",
    pattern: /(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/g,
    category: PolicyCategory.PHONE,
    replacement: "[PHONE]",
  },
  {
    name: "SSN",
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    category: PolicyCategory.SSN,
    replacement: "[SSN]",
  },
  {
    name: "CREDIT_CARD",
    pattern:
      /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12})\b/g,
    category: PolicyCategory.CREDIT_CARD,
    replacement: "[CREDIT_CARD]",
  },
  {
    name: "CREDIT_CARD_WITH_SEPARATORS",
    pattern:
      /\b(?:4\d{3}[-\s]\d{4}[-\s]\d{4}[-\s]\d{4}|5[1-5]\d{2}[-\s]\d{4}[-\s]\d{4}[-\s]\d{4}|3[47]\d{2}[-\s]\d{6}[-\s]\d{5}|3(?:0[0-5]|[68]\d)\d[-\s]\d{6}[-\s]\d{5}|6(?:011|5\d{2})[-\s]\d{4}[-\s]\d{4}[-\s]\d{4})\b/g,
    category: PolicyCategory.CREDIT_CARD,
    replacement: "[CREDIT_CARD]",
  },
  {
    name: "IPV4_ADDRESS",
    pattern:
      /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    category: PolicyCategory.IP_ADDRESS,
    replacement: "[IP]",
  },
  {
    name: "IPV6_ADDRESS",
    pattern: /\b(?!fe80:|::1\b|::\b|2001:db8:)(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b/gi,
    category: PolicyCategory.IP_ADDRESS,
    replacement: "[IP]",
  },
  {
    name: "GITHUB_TOKEN",
    pattern: /\b(?:ghp_|gho_|ghu_|ghs_|ghr_)[a-zA-Z0-9]{36}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[GITHUB_TOKEN]",
  },
  {
    name: "GITHUB_FINE_GRAINED_TOKEN",
    pattern: /\bgithub_pat_[a-zA-Z0-9_]{82}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[GITHUB_PAT]",
  },
  {
    name: "STRIPE_KEY",
    pattern: /\b(?:sk|pk|rk)_(?:live|test)_[a-zA-Z0-9]{24,}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[STRIPE_KEY]",
  },
  {
    name: "JWT_TOKEN",
    pattern: /\beyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[JWT_TOKEN]",
  },
  {
    name: "BASE64_URL_PARAM",
    pattern: /([?&][a-zA-Z_]+=)([A-Za-z0-9+/]{20,}={0,2})/g,
    category: PolicyCategory.DEV_SECRET,
    replacement: "$1[BASE64]",
  },
  {
    name: "API_KEY_GENERIC",
    pattern:
      /\b(?:api[_-]?key|apikey|access[_-]?token|bearer[_-]?token)[\s]*[:=][\s]*["']?([a-zA-Z0-9_-]{20,})["']?\b/gi,
    category: PolicyCategory.API_KEY,
    replacement: "[API_KEY]",
  },
  {
    name: "AWS_ACCESS_KEY",
    pattern: /\b(?:AKIA|ASIA|ABIA|ACCA)[0-9A-Z]{16}\b/g,
    category: PolicyCategory.AWS_KEY,
    replacement: "[AWS_ACCESS_KEY]",
  },
  {
    name: "AWS_SECRET_KEY",
    pattern: /\b[A-Za-z0-9/+=]{40}\b/g,
    category: PolicyCategory.AWS_KEY,
    replacement: "[AWS_SECRET]",
  },
  {
    name: "AWS_SESSION_TOKEN",
    pattern: /\b[A-Za-z0-9/+=]{100,}\b/g,
    category: PolicyCategory.AWS_KEY,
    replacement: "[AWS_SESSION_TOKEN]",
  },
  {
    name: "RSA_PRIVATE_KEY",
    pattern:
      /-----BEGIN RSA PRIVATE KEY-----[\s\S]*?-----END RSA PRIVATE KEY-----/g,
    category: PolicyCategory.PRIVATE_KEY,
    replacement: "[RSA_PRIVATE_KEY]",
  },
  {
    name: "EC_PRIVATE_KEY",
    pattern:
      /-----BEGIN EC PRIVATE KEY-----[\s\S]*?-----END EC PRIVATE KEY-----/g,
    category: PolicyCategory.PRIVATE_KEY,
    replacement: "[EC_PRIVATE_KEY]",
  },
  {
    name: "OPENSSH_PRIVATE_KEY",
    pattern:
      /-----BEGIN OPENSSH PRIVATE KEY-----[\s\S]*?-----END OPENSSH PRIVATE KEY-----/g,
    category: PolicyCategory.PRIVATE_KEY,
    replacement: "[OPENSSH_PRIVATE_KEY]",
  },
  {
    name: "GENERIC_PRIVATE_KEY",
    pattern:
      /-----BEGIN (?:DSA |EC |RSA )?PRIVATE KEY-----[\s\S]*?-----END (?:DSA |EC |RSA )?PRIVATE KEY-----/g,
    category: PolicyCategory.PRIVATE_KEY,
    replacement: "[PRIVATE_KEY]",
  },
  {
    name: "DATABASE_URL",
    pattern:
      /\b((?:postgres|mysql|mongodb|redis):\/\/)([^:\s]+):(.+)@([^\s/@]+(?::\d+)?(?:\/[^\s]*)?)/g,
    category: PolicyCategory.DATABASE_CREDENTIALS,
    replacement: "$1[REDACTED]:[REDACTED]@$4",
  },
  {
    name: "DOCKER_REGISTRY_TOKEN",
    pattern: /\bdckr_pat_[a-zA-Z0-9_-]{36,}\b/g,
    category: PolicyCategory.CONTAINER_REGISTRY,
    replacement: "[DOCKER_TOKEN]",
  },
  {
    name: "PASSWORD_ASSIGNMENT",
    pattern: /(?:password|passwd|pwd)[\s]*[:=][\s]*["']([^"']{8,})["']/gi,
    category: PolicyCategory.API_KEY,
    replacement: "password=\"[PASSWORD]\"",
  },
  {
    name: "DOCKER_PASSWORD_FLAG",
    pattern: /(docker\s+\w+\s+.*?-p\s+)(\S+)/gi,
    category: PolicyCategory.DEV_SECRET,
    replacement: "$1[PASSWORD]",
  },
  {
    name: "DATE_OF_BIRTH",
    pattern:
      /\b(?:0?[1-9]|1[0-2])[-/](?:0?[1-9]|[12]\d|3[01])[-/](?:19[0-9]{2}|20[0-9]{2})\b/g,
    category: PolicyCategory.DATE_OF_BIRTH,
    replacement: "[DOB]",
  },
  {
    name: "US_STREET_ADDRESS",
    pattern:
      /\b\d{1,5}\s+[\w\s]{1,50}\s+(?:street|st|avenue|ave|road|rd|highway|hwy|boulevard|blvd|lane|ln|drive|dr|court|ct|circle|cir|plaza|pl)\b/gi,
    category: PolicyCategory.ADDRESS,
    replacement: "[ADDRESS]",
  },
  {
    name: "US_DRIVER_LICENSE",
    pattern: /\b[A-Z]{1,2}[0-9]{6,8}\b/g,
    category: PolicyCategory.GOVERNMENT_ID,
    replacement: "[DRIVER_LICENSE]",
  },
  {
    name: "US_PASSPORT_NUMBER",
    pattern:
      /\b(?:passport[\s#:-]*)?[0-9]{9}\b|\b(?:passport[\s#:-]*)?[A-Z][0-9]{8}\b/gi,
    category: PolicyCategory.GOVERNMENT_ID,
    replacement: "[PASSPORT]",
  },
  {
    name: "NATIONAL_ID",
    pattern:
      /\b(?:national[\s_-]?id|citizen[\s_-]?id)[\s\-_#:]*([A-Z0-9]{8,15})\b/gi,
    category: PolicyCategory.GOVERNMENT_ID,
    replacement: "[NATIONAL_ID]",
  },
  {
    name: "US_EIN_WITH_LABEL",
    pattern: /\b(?:EIN|ein):\s*\d{2}-\d{7}\b/gi,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[EIN]",
  },
  {
    name: "US_EIN_PREFIXED",
    pattern: /\b(?:EIN|ein)\s+\d{2}-\d{7}\b/gi,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[EIN]",
  },
  {
    name: "US_TIN_WITH_LABEL",
    pattern: /\b(?:TIN|tin)\s+\d{2}-\d{7}\b/gi,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[TIN]",
  },
  {
    name: "US_EIN",
    pattern: /(?<!\+)\b\d{2}-\d{7}\b/g,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[EIN]",
  },
  {
    name: "UK_VAT_NUMBER",
    pattern:
      /\bGB\s?(?:\d{3}\s?\d{4}\s?\d{2}|\d{3}\s?\d{4}\s?\d{2}\s?\d{3})\b/gi,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[UK_VAT]",
  },
  {
    name: "EU_VAT_NUMBER",
    pattern:
      /\b(?:AT|BE|BG|CY|CZ|DE|DK|EE|ES|FI|FR|GR|HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT|RO|SE|SI|SK)\s?[A-Z0-9]{8,12}\b/gi,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[EU_VAT]",
  },
  {
    name: "CANADIAN_BUSINESS_NUMBER",
    pattern: /\b\d{9}(?:\s?[A-Z]{2}\d{4})?\b/g,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[CA_BN]",
  },
  {
    name: "AUSTRALIAN_ABN",
    pattern: /\b\d{2}\s?\d{3}\s?\d{3}\s?\d{3}\b/g,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[AU_ABN]",
  },
  {
    name: "GERMAN_TAX_NUMBER",
    pattern: /\b\d{2}\/\d{3}\/\d{5}\b/g,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[DE_TAX_ID]",
  },
  {
    name: "FRENCH_SIRET_NUMBER",
    pattern: /\b\d{3}\s?\d{3}\s?\d{3}\s?\d{5}\b/g,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[FR_SIRET]",
  },
  {
    name: "FRENCH_SIREN_NUMBER",
    pattern: /\b\d{3}\s?\d{3}\s?\d{3}\b/g,
    category: PolicyCategory.TAX_IDENTIFIER,
    replacement: "[FR_SIREN]",
  },
  {
    name: "AUTO_INSURANCE_POLICY",
    pattern:
      /\b(?:auto|car|vehicle)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[AUTO_POLICY]",
  },
  {
    name: "HOME_INSURANCE_POLICY",
    pattern:
      /\b(?:home|house|property)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[HOME_POLICY]",
  },
  {
    name: "LIFE_INSURANCE_POLICY",
    pattern: /\b(?:life)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[LIFE_POLICY]",
  },
  {
    name: "TRAVEL_INSURANCE_POLICY",
    pattern: /\b(?:travel)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[TRAVEL_POLICY]",
  },
  {
    name: "WORKERS_COMPENSATION_CLAIM",
    pattern:
      /\b(?:workers?\s*comp|wc)\s*(?:claim|clm)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[WC_CLAIM]",
  },
  {
    name: "DISABILITY_INSURANCE_POLICY",
    pattern:
      /\b(?:disability|dis)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[DISABILITY_POLICY]",
  },
  {
    name: "DENTAL_INSURANCE_POLICY",
    pattern:
      /\b(?:dental|dent)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[DENTAL_POLICY]",
  },
  {
    name: "VISION_INSURANCE_POLICY",
    pattern:
      /\b(?:vision|vis)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[VISION_POLICY]",
  },
  {
    name: "US_HEALTH_INSURANCE_POLICY",
    pattern: /\b(?:policy|member)[#\s]*[:=]?\s*[A-Z]{1,3}[0-9]{6,12}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[INSURANCE_POLICY]",
  },
  {
    name: "US_INSURANCE_GROUP_NUMBER",
    pattern: /\b(?:group|grp)[#\s]*[:=]?\s*[A-Z0-9]{4,12}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[INSURANCE_GROUP]",
  },
  {
    name: "US_INSURANCE_CLAIM_NUMBER",
    pattern: /\b(?:claim|clm)[#\s]*[:=]?\s*[A-Z0-9]{8,16}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[INSURANCE_CLAIM]",
  },
  {
    name: "MEDICARE_NUMBER_US",
    pattern: /\b[0-9]{3}-[0-9]{2}-[0-9]{4}-[A-Z][0-9]?\b/g,
    category: PolicyCategory.INSURANCE,
    replacement: "[MEDICARE_NUMBER]",
  },
  {
    name: "MEDICAID_NUMBER_US",
    pattern: /\b(?:medicaid|mcd)[#\s]*[:=]?\s*[A-Z0-9]{8,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[MEDICAID_NUMBER]",
  },
  {
    name: "BCBS_MEMBER_ID",
    pattern: /\b(?:bcbs|blue\s*cross)[#\s]*[:=]?\s*[A-Z]{3}[0-9]{8,12}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[BCBS_MEMBER_ID]",
  },
  {
    name: "AETNA_MEMBER_ID",
    pattern: /\b(?:aetna)[#\s]*[:=]?\s*[A-Z]{1,2}[0-9]{8,11}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[AETNA_MEMBER_ID]",
  },
  {
    name: "UNITEDHEALTH_MEMBER_ID",
    pattern: /\b(?:united|uhc)[#\s]*[:=]?\s*[0-9]{9}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[UHC_MEMBER_ID]",
  },
  {
    name: "UK_NHS_NUMBER",
    pattern: /\b[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}\b/g,
    category: PolicyCategory.INSURANCE,
    replacement: "[NHS_NUMBER]",
  },
  {
    name: "CANADIAN_HEALTH_CARD",
    pattern: /\b[0-9]{4}\s?[0-9]{3}\s?[0-9]{3}\b/g,
    category: PolicyCategory.INSURANCE,
    replacement: "[CA_HEALTH_CARD]",
  },
  {
    name: "AUSTRALIAN_MEDICARE_NUMBER",
    pattern: /\b[0-9]{4}\s?[0-9]{5}\s?[0-9]\b/g,
    category: PolicyCategory.INSURANCE,
    replacement: "[AU_MEDICARE]",
  },
  {
    name: "GERMAN_HEALTH_INSURANCE_NUMBER",
    pattern: /\b[A-Z][0-9]{9}\b/g,
    category: PolicyCategory.INSURANCE,
    replacement: "[DE_HEALTH_INSURANCE]",
  },
  {
    name: "FRENCH_SOCIAL_SECURITY_NUMBER",
    pattern: /\b[12][0-9]{14}\b/g,
    category: PolicyCategory.INSURANCE,
    replacement: "[FR_SOCIAL_SECURITY]",
  },
  {
    name: "EUROPEAN_HEALTH_INSURANCE_CARD",
    pattern: /\b(?:EHIC|ehic)[#\s]*[:=]?\s*[0-9]{12,16}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[EHIC_NUMBER]",
  },
  {
    name: "WORKERS_COMPENSATION_CLAIM",
    pattern:
      /\b(?:workers?\s*comp|wc)\s*(?:claim|clm)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[WC_CLAIM]",
  },
  {
    name: "DISABILITY_INSURANCE_POLICY",
    pattern:
      /\b(?:disability|dis)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[DISABILITY_POLICY]",
  },
  {
    name: "DENTAL_INSURANCE_POLICY",
    pattern:
      /\b(?:dental|dent)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[DENTAL_POLICY]",
  },
  {
    name: "VISION_INSURANCE_POLICY",
    pattern:
      /\b(?:vision|vis)\s*(?:policy|pol)[#\s]*[:=]?\s*[A-Z0-9]{6,15}\b/gi,
    category: PolicyCategory.INSURANCE,
    replacement: "[VISION_POLICY]",
  },
  {
    name: "ROUTING_NUMBER_US",
    pattern: /\b[0-9]{9}\b/g,
    category: PolicyCategory.FINANCIAL,
    replacement: "[ROUTING_NUMBER]",
  },
  {
    name: "IBAN",
    pattern: /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}\b/g,
    category: PolicyCategory.FINANCIAL,
    replacement: "[IBAN]",
  },
  {
    name: "SWIFT_CODE",
    pattern: /\b[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?\b(?!=)/g,
    category: PolicyCategory.FINANCIAL,
    replacement: "[SWIFT]",
  },
  {
    name: "MEDICAL_RECORD_NUMBER",
    pattern: /\b(?:MRN|mrn)[\s\-_#:]*([A-Z0-9]{6,12})\b/gi,
    category: PolicyCategory.MEDICAL,
    replacement: "[MRN]",
  },
  {
    name: "HEALTH_INSURANCE_ID",
    pattern: /\b(?:insurance|policy)[\s\-_#:]*([A-Z0-9]{8,15})\b/gi,
    category: PolicyCategory.MEDICAL,
    replacement: "[INSURANCE_ID]",
  },
  {
    name: "BITCOIN_ADDRESS",
    pattern: /\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b|\bbc1[a-z0-9]{39,59}\b/g,
    category: PolicyCategory.DIGITAL_IDENTITY,
    replacement: "[BITCOIN_ADDRESS]",
  },
  {
    name: "ETHEREUM_ADDRESS",
    pattern: /\b0x[a-fA-F0-9]{40}\b/g,
    category: PolicyCategory.DIGITAL_IDENTITY,
    replacement: "[ETH_ADDRESS]",
  },
  {
    name: "MAC_ADDRESS",
    pattern: /\b(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}\b/g,
    category: PolicyCategory.DIGITAL_IDENTITY,
    replacement: "[MAC_ADDRESS]",
  },
  {
    name: "SHA_HASH",
    pattern: /\b[a-f0-9]{40}\b|\b[a-f0-9]{64}\b|\b[a-f0-9]{96}\b/gi,
    category: PolicyCategory.DIGITAL_IDENTITY,
    replacement: "[HASH]",
  },
  {
    name: "US_ZIP_CODE",
    pattern: /\b[0-9]{5}(?:-[0-9]{4})?\b/g,
    category: PolicyCategory.GEOGRAPHIC,
    replacement: "[ZIP]",
  },
  {
    name: "CANADIAN_POSTAL_CODE",
    pattern: /\b[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]\b/g,
    category: PolicyCategory.GEOGRAPHIC,
    replacement: "[POSTAL_CODE]",
  },
  {
    name: "UK_POSTCODE",
    pattern: /\b[A-Z]{1,2}[0-9R][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}\b/gi,
    category: PolicyCategory.GEOGRAPHIC,
    replacement: "[POSTCODE]",
  },
  {
    name: "GPS_COORDINATES",
    pattern: /\b-?[0-9]{1,3}\.[0-9]{4,}\s*,\s*-?[0-9]{1,3}\.[0-9]{4,}\b/g,
    category: PolicyCategory.GEOGRAPHIC,
    replacement: "[COORDINATES]",
  },
  {
    name: "EMPLOYEE_ID",
    pattern: /\b(?:emp|employee|badge|staff)[\s_#:]+([A-Z0-9]{4,12})\b/gi,
    category: PolicyCategory.EMPLOYEE_ID,
    replacement: "[EMPLOYEE_ID]",
  },
  {
    name: "VIN",
    pattern: /\b[A-HJ-NPR-Z0-9]{17}\b/g,
    category: PolicyCategory.VEHICLE,
    replacement: "[VIN]",
  },
  {
    name: "US_LICENSE_PLATE",
    pattern: /\b[A-Z]{1,3}[-\s]?[0-9]{3,4}\b|\b[0-9]{1,3}[-\s]?[A-Z]{2,4}\b/g,
    category: PolicyCategory.VEHICLE,
    replacement: "[LICENSE_PLATE]",
  },
  {
    name: "GOOGLE_API_KEY",
    pattern: /\bAIza[0-9A-Za-z\-_]{35}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[GOOGLE_API_KEY]",
  },
  {
    name: "SLACK_TOKEN",
    pattern: /\bxox[bpars]-[0-9]{10,12}-[0-9]{10,12}-[a-zA-Z0-9]{24}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[SLACK_TOKEN]",
  },
  {
    name: "PAYPAL_CLIENT_ID",
    pattern: /\bA[a-zA-Z0-9_-]{80}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[PAYPAL_CLIENT_ID]",
  },
  {
    name: "TWILIO_API_KEY",
    pattern: /\bSK[a-z0-9]{32}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[TWILIO_API_KEY]",
  },
  {
    name: "SENDGRID_API_KEY",
    pattern: /\bSG\.[a-zA-Z0-9_-]{66}\b/g,
    category: PolicyCategory.API_KEY,
    replacement: "[SENDGRID_API_KEY]",
  },
  {
    name: "PO_BOX",
    pattern: /\b(?:PO|P\.O\.|Post Office)\s+Box\s+[0-9]+\b/gi,
    category: PolicyCategory.ADDRESS,
    replacement: "[PO_BOX]",
  },
  {
    name: "APARTMENT_NUMBER",
    pattern: /\b(?:apt|apartment|unit|suite|ste)\s*\.?\s*[#]?[0-9A-Z]+\b/gi,
    category: PolicyCategory.ADDRESS,
    replacement: "[APT]",
  },
  {
    name: "INTERNATIONAL_ADDRESS",
    pattern:
      /\b[0-9]+[\s,]+[A-Za-z0-9\s,.-]{5,50}[\s,]+[A-Za-z\s]{2,30}[\s,]+[A-Z0-9]{2,10}\b/g,
    category: PolicyCategory.ADDRESS,
    replacement: "[ADDRESS]",
  },
  {
    name: "AZURE_SUBSCRIPTION_ID",
    pattern:
      /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
    category: PolicyCategory.CLOUD_CREDENTIALS,
    replacement: "[AZURE_SUBSCRIPTION_ID]",
  },
  {
    name: "GOOGLE_CLOUD_PROJECT_ID",
    pattern:
      /\bgcp[\s_-]?project[\s_-]?id[\s:#=-]*([a-z][-a-z0-9]{4,28}[a-z0-9])\b/gi,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[GCP_PROJECT_ID]",
  },
  {
    name: "DOCKER_HUB_TOKEN",
    pattern: /\bdckr_pat_[a-zA-Z0-9_-]{36}\b/g,
    category: PolicyCategory.CONTAINER_REGISTRY,
    replacement: "[DOCKER_HUB_TOKEN]",
  },
  {
    name: "NPM_TOKEN",
    pattern: /\bnpm_[a-zA-Z0-9]{36}\b/g,
    category: PolicyCategory.PACKAGE_REGISTRY,
    replacement: "[NPM_TOKEN]",
  },
  {
    name: "PYPI_TOKEN",
    pattern: /\bpypi-[a-zA-Z0-9_-]{59}\b/g,
    category: PolicyCategory.PACKAGE_REGISTRY,
    replacement: "[PYPI_TOKEN]",
  },
  {
    name: "TERRAFORM_CLOUD_TOKEN",
    pattern: /\b[a-zA-Z0-9]{14}\.[atlasv1]{7}\.[a-zA-Z0-9_-]{54}\b/g,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[TERRAFORM_TOKEN]",
  },
  {
    name: "HEROKU_API_KEY",
    pattern:
      /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
    category: PolicyCategory.CLOUD_CREDENTIALS,
    replacement: "[HEROKU_API_KEY]",
  },
  {
    name: "DIGITALOCEAN_TOKEN",
    pattern: /\bdop_v1_[a-f0-9]{64}\b/g,
    category: PolicyCategory.CLOUD_CREDENTIALS,
    replacement: "[DO_TOKEN]",
  },
  {
    name: "RAILWAY_TOKEN",
    pattern: /\b[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\b/gi,
    category: PolicyCategory.CLOUD_CREDENTIALS,
    replacement: "[RAILWAY_TOKEN]",
  },
  {
    name: "GCP_SERVICE_ACCOUNT_KEY",
    pattern:
      /\b[a-z0-9_-]+@[a-z0-9_-]+\.iam\.gserviceaccount\.com\b/gi,
    category: PolicyCategory.CLOUD_CREDENTIALS,
    replacement: "[GCP_SERVICE_ACCOUNT]",
  },
  {
    name: "MONGODB_CONNECTION_STRING",
    pattern:
      /\b(mongodb(?:\+srv)?:\/\/)([^:\s]+):(.+)@([^\s/@]+(?::\d+)?(?:\/[^\s]*)?)/g,
    category: PolicyCategory.DATABASE_CREDENTIALS,
    replacement: "$1[REDACTED]:[REDACTED]@$4",
  },
  {
    name: "REDIS_CONNECTION_STRING",
    pattern: /\b(rediss?:\/\/)([^:\s]+):(.+)@([^\s/@]+(?::\d+)?(?:\/[^\s]*)?)/g,
    category: PolicyCategory.DATABASE_CREDENTIALS,
    replacement: "$1[REDACTED]:[REDACTED]@$4",
  },
  {
    name: "ELASTICSEARCH_URL",
    pattern: /\bhttps?:\/\/[^\s]+:9200[^\s]*\b/g,
    category: PolicyCategory.DATABASE_CREDENTIALS,
    replacement: "[ELASTICSEARCH_URL]",
  },
  {
    name: "KAFKA_BOOTSTRAP_SERVER",
    pattern: /\b[a-zA-Z0-9.-]+:909[0-9]\b/g,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[KAFKA_BOOTSTRAP]",
  },
  {
    name: "CONTAINER_REGISTRY",
    pattern:
      /\b[a-zA-Z0-9.-]+\.(?:gcr\.io|azurecr\.io|amazonaws\.com)\/[a-zA-Z0-9/_-]+:[a-zA-Z0-9._-]+\b/g,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[CONTAINER_IMAGE]",
  },
  {
    name: "GIT_SSH_URL",
    pattern: /\bgit@[a-zA-Z0-9.-]+:[a-zA-Z0-9/_-]+\.git\b/g,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[GIT_SSH_URL]",
  },
  {
    name: "WEBHOOK_URL",
    pattern: /\bhttps?:\/\/hooks\.[a-zA-Z0-9.-]+\/[a-zA-Z0-9/_-]+\b/g,
    category: PolicyCategory.WEBHOOK_URLS,
    replacement: "[WEBHOOK_URL]",
  },
  {
    name: "API_ENDPOINT_URL",
    pattern: /\bhttps?:\/\/api\.[a-zA-Z0-9.-]+\/[a-zA-Z0-9/_-]+\b/g,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[API_ENDPOINT]",
  },
  {
    name: "ENVIRONMENT_VARIABLE_SECRET",
    pattern: /\b([A-Z_][A-Z0-9_]*(?:PASSWORD|PASSWD|PWD|SECRET|TOKEN|KEY)[A-Z0-9_]*)=(.+?)(?=\s+[A-Z_]|\s*$)/g,
    category: PolicyCategory.DEV_SECRET,
    replacement: "$1=[REDACTED]",
  },
  {
    name: "KUBERNETES_SECRET",
    pattern:
      /\bkubernetes[\s_-]?secret[\s:#=-]*([a-z0-9]([a-z0-9-]*[a-z0-9])?\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)\b/gi,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[K8S_SECRET]",
  },
  {
    name: "SERVICE_ACCOUNT_EMAIL",
    pattern: /\b[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.iam\.gserviceaccount\.com\b/g,
    category: PolicyCategory.DEV_SECRET,
    replacement: "[SERVICE_ACCOUNT]",
  },
  {
    name: "SSH_KEY_FINGERPRINT",
    pattern:
      /\bMD5:[a-f0-9]{2}(:[a-f0-9]{2}){15}\b|\bSHA256:[A-Za-z0-9+/]{43}=?\b/g,
    category: PolicyCategory.ENCRYPTION_KEYS,
    replacement: "[SSH_KEY_FINGERPRINT]",
  },
  {
    name: "PGP_KEY_ID",
    pattern: /\b(?:0x)?[A-F0-9]{8,40}\b/g,
    category: PolicyCategory.ENCRYPTION_KEYS,
    replacement: "[PGP_KEY_ID]",
  },
  {
    name: "AGE_SECRET_KEY",
    pattern: /\bAGE-SECRET-KEY-1[A-Z0-9]{58}\b/g,
    category: PolicyCategory.ENCRYPTION_KEYS,
    replacement: "[AGE_SECRET_KEY]",
  },
  {
    name: "AGE_PUBLIC_KEY",
    pattern: /\bage1[a-z0-9]{58}\b/g,
    category: PolicyCategory.ENCRYPTION_KEYS,
    replacement: "[AGE_PUBLIC_KEY]",
  },
  {
    name: "AWS_KMS_KEY_ID",
    pattern:
      /\b(?:arn:aws:kms:[a-z0-9-]+:\d{12}:key\/)?[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\b/g,
    category: PolicyCategory.ENCRYPTION_KEYS,
    replacement: "[KMS_KEY_ID]",
  },
  {
    name: "GCP_KMS_KEY",
    pattern:
      /\bprojects\/[^/]+\/locations\/[^/]+\/keyRings\/[^/]+\/cryptoKeys\/[^\s]+/g,
    category: PolicyCategory.ENCRYPTION_KEYS,
    replacement: "[GCP_KMS_KEY]",
  },
  {
    name: "AZURE_KEY_IDENTIFIER",
    pattern:
      /\bhttps:\/\/[a-zA-Z0-9-]+\.vault\.azure\.net\/keys\/[a-zA-Z0-9-]+\/[a-f0-9]{32}\b/g,
    category: PolicyCategory.ENCRYPTION_KEYS,
    replacement: "[AZURE_KEY_ID]",
  },
  {
    name: "MASTER_KEY",
    pattern:
      /\b(?:master[_-]?key|encryption[_-]?key|secret[_-]?key)[\s:=]+[A-Za-z0-9+/]{32,}={0,2}\b/gi,
    category: PolicyCategory.ENCRYPTION_KEYS,
    replacement: "[MASTER_KEY]",
  },
  {
    name: "BUILD_NUMBER",
    pattern: /\bbuild[\s#:-]+([0-9]{4,})\b/gi,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[BUILD_NUMBER]",
  },
  {
    name: "VERSION_TAG",
    pattern:
      /\b(?:version[\s:#=-]*)?v[0-9]+\.[0-9]+\.[0-9]+(?:-[a-zA-Z0-9._-]+)?(?:\+[a-zA-Z0-9._-]+)?\b/gi,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[VERSION]",
  },
  {
    name: "COMMIT_HASH",
    pattern: /\b(?:commit|sha)[\s:#=-]+([a-f0-9]{40}|[a-f0-9]{7,8})\b/gi,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[COMMIT_HASH]",
  },
  {
    name: "PR_ISSUE_NUMBER",
    pattern: /\b(?:PR|MR|Issue)[\s#:-]*([0-9]{1,6})\b/gi,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[TICKET_NUMBER]",
  },
  {
    name: "JIRA_TICKET",
    pattern:
      /\b(?:PROJ|TASK|BUG|EPIC|STORY|SUB|TECH|DEV|QA|TEST|DOC|REL)-[0-9]{1,6}\b/g,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[JIRA_TICKET]",
  },
  {
    name: "SENTRY_DSN",
    pattern:
      /\bhttps:\/\/[a-f0-9]{32}@[a-f0-9]+\.ingest\.sentry\.io\/[0-9]+\b/g,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[SENTRY_DSN]",
  },
  {
    name: "NEW_RELIC_LICENSE_KEY",
    pattern:
      /\bnewrelic[\s_-]?(?:license[\s_-]?)?key[\s:#=-]*([a-f0-9]{40})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[NEW_RELIC_KEY]",
  },
  {
    name: "DATADOG_API_KEY",
    pattern: /\bdatadog[\s_-]?(?:api[\s_-]?)?key[\s:#=-]*([a-f0-9]{32})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[DATADOG_API_KEY]",
  },
  {
    name: "PAGERDUTY_INTEGRATION_KEY",
    pattern:
      /\bpagerduty[\s_-]?(?:integration[\s_-]?)?key[\s:#=-]*([a-f0-9]{32})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[PAGERDUTY_KEY]",
  },
  {
    name: "SLACK_WEBHOOK",
    pattern:
      /\bhttps:\/\/hooks\.slack\.com\/services\/[A-Z0-9]{9}\/[A-Z0-9]{11}\/[a-zA-Z0-9]{24}\b/g,
    category: PolicyCategory.WEBHOOK_URLS,
    replacement: "[SLACK_WEBHOOK]",
  },
  {
    name: "DISCORD_WEBHOOK",
    pattern:
      /\bhttps:\/\/discord(?:app)?\.com\/api\/webhooks\/[0-9]{18,19}\/[a-zA-Z0-9_-]{68}\b/g,
    category: PolicyCategory.WEBHOOK_URLS,
    replacement: "[DISCORD_WEBHOOK]",
  },
  {
    name: "FIREBASE_CONFIG",
    pattern: /\b[a-zA-Z0-9._-]+-default-rtdb\.[a-z0-9.-]+\.firebaseio\.com\b/g,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[FIREBASE_URL]",
  },
  {
    name: "SUPABASE_URL",
    pattern: /\bhttps:\/\/[a-zA-Z0-9]{20}\.supabase\.co\b/g,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[SUPABASE_URL]",
  },
  {
    name: "AUTH0_DOMAIN",
    pattern: /\b[a-zA-Z0-9._-]+\.auth0\.com\b/g,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[AUTH0_DOMAIN]",
  },
  {
    name: "NETLIFY_SITE_ID",
    pattern:
      /\b[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\b/gi,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[NETLIFY_SITE_ID]",
  },
  {
    name: "VERCEL_DEPLOYMENT_URL",
    pattern: /\bhttps:\/\/[a-zA-Z0-9._-]+\.vercel\.app\b/g,
    category: PolicyCategory.DEV_IDENTIFIER,
    replacement: "[VERCEL_URL]",
  },
  {
    name: "JENKINS_TOKEN",
    pattern:
      /\b(?:jenkins|hudson)[\s_-]?(?:token|api[\s_-]?key)[\s:#=-]*([a-f0-9]{32,34})\b/gi,
    category: PolicyCategory.CI_CD_SECRETS,
    replacement: "[JENKINS_TOKEN]",
  },
  {
    name: "CIRCLECI_TOKEN",
    pattern:
      /\bcircleci[\s_-]?(?:token|api[\s_-]?key)[\s:#=-]*([a-f0-9]{40})\b/gi,
    category: PolicyCategory.CI_CD_SECRETS,
    replacement: "[CIRCLECI_TOKEN]",
  },
  {
    name: "TRAVIS_CI_TOKEN",
    pattern:
      /\btravis[\s_-]?(?:token|api[\s_-]?key)[\s:#=-]*([a-zA-Z0-9]{22})\b/gi,
    category: PolicyCategory.CI_CD_SECRETS,
    replacement: "[TRAVIS_TOKEN]",
  },
  {
    name: "GITLAB_TOKEN",
    pattern: /\b(?:gitlab[\s_-]?(?:token|pat)|glpat)-[a-zA-Z0-9_-]{20}\b/g,
    category: PolicyCategory.CI_CD_SECRETS,
    replacement: "[GITLAB_TOKEN]",
  },
  {
    name: "GITLAB_CI_TOKEN",
    pattern:
      /\b(?:CI_JOB_TOKEN|CI_DEPLOY_PASSWORD|CI_REGISTRY_PASSWORD)[\s:#=-]*([a-zA-Z0-9._-]+)\b/g,
    category: PolicyCategory.CI_CD_SECRETS,
    replacement: "[GITLAB_CI_TOKEN]",
  },
  {
    name: "AZURE_DEVOPS_TOKEN",
    pattern:
      /\b(?:azdo|azure[\s_-]?devops)[\s_-]?(?:pat|token)[\s:#=-]*([a-z0-9]{52})\b/gi,
    category: PolicyCategory.CI_CD_SECRETS,
    replacement: "[AZURE_DEVOPS_TOKEN]",
  },
  {
    name: "BITBUCKET_TOKEN",
    pattern:
      /\bbitbucket[\s_-]?(?:token|app[\s_-]?password)[\s:#=-]*([a-zA-Z0-9]{20,40})\b/gi,
    category: PolicyCategory.CI_CD_SECRETS,
    replacement: "[BITBUCKET_TOKEN]",
  },
  {
    name: "HASHICORP_VAULT_TOKEN",
    pattern:
      /\b(?:vault[\s_-]?token|VAULT_TOKEN)[\s:#=-]*([hsrb]\.[a-zA-Z0-9]{24,})\b/gi,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[VAULT_TOKEN]",
  },
  {
    name: "AWS_SECRETS_MANAGER_ARN",
    pattern:
      /\barn:aws:secretsmanager:[a-z0-9-]+:\d{12}:secret:[a-zA-Z0-9/_+=.@-]+-[a-zA-Z0-9]{6}\b/g,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[AWS_SECRET_ARN]",
  },
  {
    name: "AZURE_KEY_VAULT_SECRET",
    pattern:
      /\bhttps:\/\/[a-z0-9-]+\.vault\.azure\.net\/secrets\/[a-zA-Z0-9-]+\/[a-f0-9]{32}\b/g,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[AZURE_VAULT_SECRET]",
  },
  {
    name: "GCP_SECRET_MANAGER",
    pattern:
      /\bprojects\/[a-z0-9-]+\/secrets\/[a-zA-Z0-9_-]+\/versions\/(?:latest|\d+)\b/g,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[GCP_SECRET]",
  },
  {
    name: "OAUTH_CLIENT_ID",
    pattern:
      /\b(?:client[\s_-]?id|CLIENT_ID)[\s:#=-]*([a-zA-Z0-9._-]{20,})\b/gi,
    category: PolicyCategory.AUTH_SECRETS,
    replacement: "[OAUTH_CLIENT_ID]",
  },
  {
    name: "OAUTH_CLIENT_SECRET",
    pattern:
      /\b(?:client[\s_-]?secret|CLIENT_SECRET)[\s:#=-]*([a-zA-Z0-9._-]{20,})\b/gi,
    category: PolicyCategory.AUTH_SECRETS,
    replacement: "[OAUTH_CLIENT_SECRET]",
  },
  {
    name: "OAUTH_REFRESH_TOKEN",
    pattern:
      /\b(?:refresh[\s_-]?token|REFRESH_TOKEN)[\s:#=-]*([a-zA-Z0-9._/-]{30,})\b/gi,
    category: PolicyCategory.AUTH_SECRETS,
    replacement: "[OAUTH_REFRESH_TOKEN]",
  },
  {
    name: "OAUTH_ACCESS_TOKEN",
    pattern:
      /\b(?:access[\s_-]?token|ACCESS_TOKEN)[\s:#=-]*([a-zA-Z0-9._/-]{30,})\b/gi,
    category: PolicyCategory.AUTH_SECRETS,
    replacement: "[OAUTH_ACCESS_TOKEN]",
  },
  {
    name: "QUAY_IO_TOKEN",
    pattern:
      /\bquay\.io[\s_-]?(?:token|robot)[\s:#=-]*([a-zA-Z0-9+/=]{40,})\b/gi,
    category: PolicyCategory.PACKAGE_REGISTRY,
    replacement: "[QUAY_TOKEN]",
  },
  {
    name: "JFROG_ARTIFACTORY_TOKEN",
    pattern:
      /\b(?:artifactory[\s_-]?(?:token|api[\s_-]?key)|AKC[a-zA-Z0-9]{10,})\b/gi,
    category: PolicyCategory.PACKAGE_REGISTRY,
    replacement: "[ARTIFACTORY_TOKEN]",
  },
  {
    name: "NEXUS_REPOSITORY_TOKEN",
    pattern:
      /\bnexus[\s_-]?(?:token|password)[\s:#=-]*([a-zA-Z0-9._-]{20,})\b/gi,
    category: PolicyCategory.PACKAGE_REGISTRY,
    replacement: "[NEXUS_TOKEN]",
  },
  {
    name: "SONARQUBE_TOKEN",
    pattern: /\b(?:sonar[\s_-]?token|sqp_[a-f0-9]{40})\b/gi,
    category: PolicyCategory.DEV_SECRET,
    replacement: "[SONARQUBE_TOKEN]",
  },
  {
    name: "GRAFANA_API_KEY",
    pattern:
      /\b(?:grafana[\s_-]?api[\s_-]?key|glsa_[a-zA-Z0-9_-]{32}_[a-f0-9]{8})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[GRAFANA_API_KEY]",
  },
  {
    name: "PROMETHEUS_REMOTE_WRITE",
    pattern:
      /\b(?:remote_write_url|prometheus_url)[\s:#=-]*https?:\/\/[^\s]+\/api\/v1\/write\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[PROMETHEUS_REMOTE_WRITE]",
  },
  {
    name: "KUBERNETES_CONFIG",
    pattern: /\bapiVersion:\s*v1\s*\nkind:\s*Config\b/g,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[KUBECONFIG]",
  },
  {
    name: "HELM_REPOSITORY_CREDENTIALS",
    pattern:
      /\bhelm[\s_-]?repo[\s_-]?(?:username|password)[\s:#=-]*([a-zA-Z0-9._-]+)\b/gi,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[HELM_CREDENTIALS]",
  },
  {
    name: "ANSIBLE_VAULT_PASSWORD",
    pattern: /\bansible[\s_-]?vault[\s_-]?password[\s:#=-]*([^\s]+)\b/gi,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[ANSIBLE_VAULT_PASSWORD]",
  },
  {
    name: "CONSUL_TOKEN",
    pattern:
      /\b(?:consul[\s_-]?token|X-Consul-Token)[\s:#=-]*([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\b/gi,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[CONSUL_TOKEN]",
  },
  {
    name: "RANCHER_TOKEN",
    pattern: /\b(?:rancher[\s_-]?token|token-[a-z0-9]{5}:[a-z0-9]{5})\b/gi,
    category: PolicyCategory.INFRASTRUCTURE_SECRETS,
    replacement: "[RANCHER_TOKEN]",
  },
  {
    name: "OKTA_API_TOKEN",
    pattern: /\b(?:okta[\s_-]?(?:token|api[\s_-]?key)|00[a-zA-Z0-9_-]{40})\b/gi,
    category: PolicyCategory.AUTH_SECRETS,
    replacement: "[OKTA_TOKEN]",
  },
  {
    name: "AUTH0_API_TOKEN",
    pattern:
      /\bauth0[\s_-]?(?:token|api[\s_-]?key|secret)[\s:#=-]*([a-zA-Z0-9._-]{32,})\b/gi,
    category: PolicyCategory.AUTH_SECRETS,
    replacement: "[AUTH0_TOKEN]",
  },
  {
    name: "KEYCLOAK_CLIENT_SECRET",
    pattern:
      /\bkeycloak[\s_-]?client[\s_-]?secret[\s:#=-]*([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\b/gi,
    category: PolicyCategory.AUTH_SECRETS,
    replacement: "[KEYCLOAK_SECRET]",
  },
  {
    name: "RABBITMQ_CONNECTION_STRING",
    pattern: /\b(amqps?:\/\/)([^:\s]+):(.+)@([^\s/@]+(?::\d+)?(?:\/[^\s]*)?)/g,
    category: PolicyCategory.DATABASE_CREDENTIALS,
    replacement: "$1[REDACTED]:[REDACTED]@$4",
  },
  {
    name: "POSTGRESQL_CONNECTION_STRING",
    pattern:
      /\b(postgres(?:ql)?:\/\/)([^:\s]+):(.+)@([^\s/@]+(?::\d+)?(?:\/[^\s]*)?)/g,
    category: PolicyCategory.DATABASE_CREDENTIALS,
    replacement: "$1[REDACTED]:[REDACTED]@$4",
  },
  {
    name: "MYSQL_CONNECTION_STRING",
    pattern: /\b(mysql:\/\/)([^:\s]+):(.+)@([^\s/@]+(?::\d+)?(?:\/[^\s]*)?)/g,
    category: PolicyCategory.DATABASE_CREDENTIALS,
    replacement: "$1[REDACTED]:[REDACTED]@$4",
  },
  {
    name: "CASSANDRA_CONNECTION_STRING",
    pattern:
      /\b(cassandra:\/\/)([^:\s]+):(.+)@([^\s/@]+(?::\d+)?(?:\/[^\s]*)?)/g,
    category: PolicyCategory.DATABASE_CREDENTIALS,
    replacement: "$1[REDACTED]:[REDACTED]@$4",
  },
  {
    name: "SPLUNK_HEC_TOKEN",
    pattern:
      /\bSplunk\s+[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\b/g,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[SPLUNK_HEC_TOKEN]",
  },
  {
    name: "SUMO_LOGIC_COLLECTOR",
    pattern:
      /\bhttps:\/\/collectors\..*\.sumologic\.com\/receiver\/v1\/http\/[a-zA-Z0-9=]+\b/g,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[SUMOLOGIC_COLLECTOR]",
  },
  {
    name: "LAUNCHDARKLY_SDK_KEY",
    pattern:
      /\b(?:sdk-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|mob-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\b/g,
    category: PolicyCategory.DEV_SECRET,
    replacement: "[LAUNCHDARKLY_KEY]",
  },
  {
    name: "SEGMENT_WRITE_KEY",
    pattern:
      /\bsegment[\s_-]?(?:write[\s_-]?key|writekey)[\s:#=-]*([a-zA-Z0-9]{32})\b/gi,
    category: PolicyCategory.DEV_SECRET,
    replacement: "[SEGMENT_WRITE_KEY]",
  },
  {
    name: "MIXPANEL_API_SECRET",
    pattern:
      /\bmixpanel[\s_-]?(?:api[\s_-]?secret|secret)[\s:#=-]*([a-f0-9]{32})\b/gi,
    category: PolicyCategory.DEV_SECRET,
    replacement: "[MIXPANEL_SECRET]",
  },
  {
    name: "ALGOLIA_API_KEY",
    pattern:
      /\balgolia[\s_-]?(?:api[\s_-]?key|admin[\s_-]?key)[\s:#=-]*([a-f0-9]{32})\b/gi,
    category: PolicyCategory.DEV_SECRET,
    replacement: "[ALGOLIA_API_KEY]",
  },
  {
    name: "ELASTIC_CLOUD_ID",
    pattern: /\belastic[\s_-]?cloud[\s_-]?id[\s:#=-]*([a-zA-Z0-9+/=]{50,})\b/gi,
    category: PolicyCategory.DEV_SECRET,
    replacement: "[ELASTIC_CLOUD_ID]",
  },
  {
    name: "BUGSNAG_API_KEY",
    pattern: /\bbugsnag[\s_-]?api[\s_-]?key[\s:#=-]*([a-f0-9]{32})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[BUGSNAG_API_KEY]",
  },
  {
    name: "ROLLBAR_ACCESS_TOKEN",
    pattern:
      /\brollbar[\s_-]?(?:access[\s_-]?token|post[\s_-]?server[\s_-]?item)[\s:#=-]*([a-f0-9]{32})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[ROLLBAR_TOKEN]",
  },
  {
    name: "AIRBRAKE_API_KEY",
    pattern:
      /\bairbrake[\s_-]?(?:api[\s_-]?key|project[\s_-]?key)[\s:#=-]*([a-f0-9]{32})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[AIRBRAKE_KEY]",
  },
  {
    name: "LOGDNA_INGESTION_KEY",
    pattern:
      /\blogdna[\s_-]?(?:ingestion[\s_-]?key|api[\s_-]?key)[\s:#=-]*([a-f0-9]{32})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[LOGDNA_KEY]",
  },
  {
    name: "LOGGLY_TOKEN",
    pattern:
      /\bloggly[\s_-]?(?:token|customer[\s_-]?token)[\s:#=-]*([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[LOGGLY_TOKEN]",
  },
  {
    name: "PAPERTRAIL_TOKEN",
    pattern:
      /\bpapertrail[\s_-]?(?:token|api[\s_-]?token)[\s:#=-]*([a-zA-Z0-9]{32,})\b/gi,
    category: PolicyCategory.MONITORING_SECRETS,
    replacement: "[PAPERTRAIL_TOKEN]",
  },
];

export const DEFAULT_ENABLED_CATEGORIES = Object.values(
  PolicyCategory
).filter((category) => category !== PolicyCategory.CUSTOM);
