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
        "john@example.com",
        "user.name@domain.co.uk",
        "test+tag@example.org",
        "user123@test456.com",
        "user.name+tag@example.com",
        "first_last@company.co",
        "user+filter@subdomain.example.com",
        "123@example.co.jp",
        "test.user_name@my-domain.org",
        "info@company.museum",
        "admin@localhost.local",
      ],
      shouldNotMatch: [
        "not-an-email",
        "@example.com",
        "user@",
        "regular text",
        "user example.com",
        "user@.com",
        "user@domain",
        "user@@example.com",
        "@",
        "user@domain.",
        "a@b.c",
      ],
    });
  });
});
