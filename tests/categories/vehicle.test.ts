import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("vehicle patterns", () => {
  const vehiclePatterns = POLICIES.filter(p => p.category === PolicyCategory.VEHICLE);

  it("should have vehicle patterns", () => {
    expect(vehiclePatterns.length).toBeGreaterThan(0);
  });

  it("should detect US license plates", () => {
    const pattern = vehiclePatterns.find(p => p.name === "US_LICENSE_PLATE");
    expect(pattern).toBeTruthy();

    expect("ABC-1234".match(pattern!.pattern)).toBeTruthy();
    expect("123-ABC".match(pattern!.pattern)).toBeTruthy();
    expect("XYZ123".match(pattern!.pattern)).toBeTruthy();
  });

  it("should detect VIN numbers", () => {
    const pattern = vehiclePatterns.find(p => p.name === "VIN");
    expect(pattern).toBeTruthy();

    expect("1HGBH41JXMN109186".match(pattern!.pattern)).toBeTruthy();
    expect("JH4KA7561PC008269".match(pattern!.pattern)).toBeTruthy();
    expect("WVWZZZ3CZHE051389".match(pattern!.pattern)).toBeTruthy();
  });
});
