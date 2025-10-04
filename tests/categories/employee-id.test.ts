import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("employee id patterns", () => {
  const employeeIdPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.EMPLOYEE_ID,
  );

  it("should have employee ID patterns", () => {
    expect(employeeIdPatterns.length).toBeGreaterThan(0);
  });

  describe("EMPLOYEE_ID", () => {
    const pattern = employeeIdPatterns.find((p) => p.name === "EMPLOYEE_ID");

    it("should detect employee IDs", () => {
      expect(pattern).toBeTruthy();
      expect("EMP 123456".match(pattern!.pattern)).toBeTruthy();
      expect("employee: ABC12345".match(pattern!.pattern)).toBeTruthy();
      expect("badge# 987654".match(pattern!.pattern)).toBeTruthy();
      expect("staff: XYZW1234".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid employee IDs", () => {
      expect("EMP 123".match(pattern!.pattern)).toBeFalsy();
      expect("employee".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const pattern = employeeIdPatterns.find((p) => p.name === "EMPLOYEE_ID");

    expect("regular text".match(pattern!.pattern)).toBeFalsy();
  });
});
