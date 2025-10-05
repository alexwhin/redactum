import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("email patterns", () => {
  testCategoryCoverage(PolicyCategory.EMAIL, ["EMAIL_ADDRESS"]);

  describe("EMAIL_ADDRESS", () => {
    testPolicySuite({
      policyName: "EMAIL_ADDRESS",
      replacement: "[EMAIL]",
      shouldMatch: [
        "john@example.com", // standard email address
        "user.name@domain.co.uk", // with dots in local part and country code TLD
        "test+tag@example.org", // with plus sign (Gmail-style tagging)
        "user123@test456.com", // with numbers in both parts
        "user.name+tag@example.com", // dots and plus sign combined
        "first_last@company.co", // underscore in local part
        "user+filter@subdomain.example.com", // subdomain with plus tagging
        "123@example.co.jp", // numeric local part, multi-level TLD
        "test.user_name@my-domain.org", // dots, underscores, and hyphens
        "info@company.museum", // uncommon but valid TLD
        "admin@localhost.local", // .local domain (common in dev/test)
        "Contact us at: support@example.com.", // in sentence with punctuation
        "Email: sales@company.co.uk", // with label prefix
        "feedback@site.example.io", // .io TLD
        "(notifications@alerts.net)", // parentheses wrapped
      ],
      shouldNotMatch: [
        "not-an-email", // plain text
        "@example.com", // missing local part
        "user@", // missing domain
        "regular text", // no @ symbol
        "user example.com", // space instead of @
        "user@.com", // domain starts with dot
        "user@domain", // missing TLD
        "user@@example.com", // double @ symbols
        "@", // just @ symbol
        "user@domain.", // trailing dot after domain
        "a@b.c", // TLD too short (minimum 2 chars)
      ],
    });
  });
});
