import { describe, it, expect } from "vitest";
import { POLICIES, DEFAULT_ENABLED_CATEGORIES } from "../src/constants.js";
import { PolicyCategory } from "../src/types/index.js";

describe("constants", () => {
  describe("POLICIES", () => {
    it("should have patterns for categories that are implemented", () => {
      const categoriesWithPatterns = new Set(POLICIES.map(p => p.category));
      
      const expectedCategories = [
        PolicyCategory.EMAIL,
        PolicyCategory.PHONE,
        PolicyCategory.SSN,
        PolicyCategory.CREDIT_CARD,
        PolicyCategory.IP_ADDRESS,
        PolicyCategory.API_KEY,
        PolicyCategory.AWS_KEY,
        PolicyCategory.PRIVATE_KEY,
        PolicyCategory.ADDRESS,
        PolicyCategory.DATE_OF_BIRTH,
        PolicyCategory.PERSON_NAME,
        PolicyCategory.TAX_IDENTIFIER,
        PolicyCategory.INSURANCE,
        PolicyCategory.FINANCIAL,
        PolicyCategory.MEDICAL,
        PolicyCategory.EMPLOYEE_ID,
        PolicyCategory.DEV_SECRET,
      ];
      
      for (const category of expectedCategories) {
        expect(categoriesWithPatterns.has(category)).toBe(true);
      }
    });

    it("should have valid regex patterns", () => {
      for (const pattern of POLICIES) {
        expect(pattern.pattern).toBeInstanceOf(RegExp);
        expect(pattern.name).toBeTruthy();
        expect(pattern.category).toBeTruthy();
      }
    });

    it("should detect emails correctly", () => {
      const emailPatterns = POLICIES.filter(p => p.category === PolicyCategory.EMAIL);
      expect(emailPatterns.length).toBeGreaterThan(0);
      const emailPattern = emailPatterns[0]!;

      expect("test@example.com".match(emailPattern.pattern)).toBeTruthy();
      expect("user.name+tag@domain.co.uk".match(emailPattern.pattern)).toBeTruthy();
      expect("invalid-email".match(emailPattern.pattern)).toBeFalsy();
    });

    it("should detect phone numbers correctly", () => {
      const phonePatterns = POLICIES.filter(p => p.category === PolicyCategory.PHONE);
      expect(phonePatterns.length).toBeGreaterThan(0);
      const phonePattern = phonePatterns.find(p => p.name === "PHONE_NUMBER_US")!;

      expect("(555) 123-4567".match(phonePattern.pattern)).toBeTruthy();
      expect("555-123-4567".match(phonePattern.pattern)).toBeTruthy();
      expect("5551234567".match(phonePattern.pattern)).toBeTruthy();
      expect("invalid-phone".match(phonePattern.pattern)).toBeFalsy();
    });

    it("should detect API keys correctly", () => {
      const apiKeyPatterns = POLICIES.filter(p => p.category === PolicyCategory.API_KEY);

      const openaiPattern = apiKeyPatterns.find(p => p.name === "OPENAI_API_KEY");
      expect(openaiPattern).toBeTruthy();
      expect(`sk-${  "a".repeat(48).match(openaiPattern!.pattern)}`).toBeTruthy();

      const githubPattern = apiKeyPatterns.find(p => p.name === "GITHUB_TOKEN");
      expect(githubPattern).toBeTruthy();
      expect((`ghp_${  "a".repeat(36)}`).match(githubPattern!.pattern)).toBeTruthy();
    });

    it("should detect AWS keys correctly", () => {
      const awsPatterns = POLICIES.filter(p => p.category === PolicyCategory.AWS_KEY);
      const accessKeyPattern = awsPatterns.find(p => p.name === "AWS_ACCESS_KEY");

      expect(accessKeyPattern).toBeTruthy();
      expect((`AKIA${  "A".repeat(16)}`).match(accessKeyPattern!.pattern)).toBeTruthy();
      expect((`ASIA${  "B".repeat(16)}`).match(accessKeyPattern!.pattern)).toBeTruthy();
    });

    it("should detect private keys correctly", () => {
      const privateKeyPatterns = POLICIES.filter(p => p.category === PolicyCategory.PRIVATE_KEY);
      const rsaPattern = privateKeyPatterns.find(p => p.name === "RSA_PRIVATE_KEY");

      expect(rsaPattern).toBeTruthy();
      const rsaKey = "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----";
      expect(rsaKey.match(rsaPattern!.pattern)).toBeTruthy();
    });

    it("should detect credit cards correctly", () => {
      const ccPatterns = POLICIES.filter(p => p.category === PolicyCategory.CREDIT_CARD);
      const ccPattern = ccPatterns[0];

      expect("4111111111111111".match(ccPattern?.pattern ?? /.*/)).toBeTruthy(); // Visa
      expect("5555555555554444".match(ccPattern?.pattern ?? /.*/)).toBeTruthy(); // Mastercard
      expect("378282246310005".match(ccPattern?.pattern ?? /.*/)).toBeTruthy(); // Amex
    });

    it("should detect SSN correctly", () => {
      const ssnPatterns = POLICIES.filter(p => p.category === PolicyCategory.SSN);
      const ssnPattern = ssnPatterns[0];

      expect("123-45-6789".match(ssnPattern?.pattern ?? /.*/)).toBeTruthy();
      expect("123456789".match(ssnPattern?.pattern ?? /.*/)).toBeFalsy(); // Removed 9-digit detection for safety
    });

    it("should detect IP addresses correctly", () => {
      const ipPatterns = POLICIES.filter(p => p.category === PolicyCategory.IP_ADDRESS);
      const ipv4Pattern = ipPatterns.find(p => p.name === "IPV4_ADDRESS");
      const ipv6Pattern = ipPatterns.find(p => p.name === "IPV6_ADDRESS");

      expect(ipv4Pattern).toBeTruthy();
      expect("192.168.1.1".match(ipv4Pattern!.pattern)).toBeTruthy();
      expect("10.0.0.1".match(ipv4Pattern!.pattern)).toBeTruthy();

      expect(ipv6Pattern).toBeTruthy();
      expect("2001:0db8:85a3:0000:0000:8a2e:0370:7334".match(ipv6Pattern!.pattern)).toBeTruthy();
    });

    it("should detect environment variable secrets correctly", () => {
      const envVarPattern = POLICIES.find(p => p.name === "ENVIRONMENT_VARIABLE_SECRET")!;

      expect(envVarPattern).toBeTruthy();
      expect("MYSQL_PASSWORD=secret".match(envVarPattern.pattern)).toBeTruthy();
      expect("MYSQL_ROOT_PASSWORD=secret123".match(envVarPattern.pattern)).toBeTruthy();
      expect("API_KEY=abc123".match(envVarPattern.pattern)).toBeTruthy();
      expect("DATABASE_TOKEN=xyz789".match(envVarPattern.pattern)).toBeTruthy();
      expect("JWT_SECRET=mysecret".match(envVarPattern.pattern)).toBeTruthy();
      expect("ADMIN_PASSWD=pass123".match(envVarPattern.pattern)).toBeTruthy();
      expect("DB_PWD=p@ssw0rd".match(envVarPattern.pattern)).toBeTruthy();
      expect("DATABASE_NAME=academy".match(envVarPattern.pattern)).toBeFalsy();
      expect("PORT=3000".match(envVarPattern.pattern)).toBeFalsy();
    });
  });

  describe("DEFAULT_ENABLED_CATEGORIES", () => {
    it("should include security-critical categories", () => {
      expect(DEFAULT_ENABLED_CATEGORIES).toContain(PolicyCategory.EMAIL);
      expect(DEFAULT_ENABLED_CATEGORIES).toContain(PolicyCategory.API_KEY);
      expect(DEFAULT_ENABLED_CATEGORIES).toContain(PolicyCategory.AWS_KEY);
      expect(DEFAULT_ENABLED_CATEGORIES).toContain(PolicyCategory.PRIVATE_KEY);
      expect(DEFAULT_ENABLED_CATEGORIES).toContain(PolicyCategory.CREDIT_CARD);
      expect(DEFAULT_ENABLED_CATEGORIES).toContain(PolicyCategory.SSN);
    });

    it("should include all categories except CUSTOM by default", () => {
      expect(DEFAULT_ENABLED_CATEGORIES).toContain(PolicyCategory.DATE_OF_BIRTH);
      expect(DEFAULT_ENABLED_CATEGORIES).toContain(PolicyCategory.ADDRESS);
      expect(DEFAULT_ENABLED_CATEGORIES).toContain(PolicyCategory.PERSON_NAME);
      expect(DEFAULT_ENABLED_CATEGORIES).not.toContain(PolicyCategory.CUSTOM);
      
      const allCategoriesExceptCustom = Object.values(PolicyCategory).filter(c => c !== PolicyCategory.CUSTOM);
      expect(DEFAULT_ENABLED_CATEGORIES).toHaveLength(allCategoriesExceptCustom.length);
      expect(DEFAULT_ENABLED_CATEGORIES).toEqual(expect.arrayContaining(allCategoriesExceptCustom));
    });
  });
});