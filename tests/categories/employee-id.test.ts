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
        "EMP 123456", // EMP prefix with space
        "employee: ABC12345", // employee label
        "badge# 987654", // badge number
        "staff: XYZW1234", // staff label
        "EMP 000001", // leading zeros
        "employee: 1234567890", // numeric employee ID
        "badge# DEF123456", // alpha-numeric badge
        "staff: 999999", // all nines
        "EMP 111111", // repeating ones
        "employee: GHI98765", // alpha prefix
        "badge# 123ABC456", // mixed format
        "staff: JKL000000", // zeros suffix
      ],
      shouldNotMatch: [
        "EMP 123", // too short
        "employee", // label only
        "regular text", // plain text
        "badge#", // missing number
        "staff:", // missing ID
        "employee ID", // text description
      ],
    });
  });
});
