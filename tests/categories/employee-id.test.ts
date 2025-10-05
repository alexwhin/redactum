import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("employee id patterns", () => {
  testCategoryCoverage(PolicyCategory.EMPLOYEE_ID, ["EMPLOYEE_ID"]);

  describe("EMPLOYEE_ID", () => {
    testPolicySuite({
      policyName: "EMPLOYEE_ID",
      replacement: "[EMPLOYEE_ID]",
      shouldMatch: [
        "EMP 123456",
        "employee: ABC12345",
        "badge# 987654",
        "staff: XYZW1234",
      ],
      shouldNotMatch: ["EMP 123", "employee", "regular text"],
    });
  });
});
