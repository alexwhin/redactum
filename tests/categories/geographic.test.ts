import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("geographic patterns", () => {
  const geographicPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.GEOGRAPHIC,
  );

  it("should have geographic patterns", () => {
    expect(geographicPatterns.length).toBeGreaterThan(0);
  });

  describe("US_ZIP_CODE", () => {
    const pattern = geographicPatterns.find((p) => p.name === "US_ZIP_CODE");

    it("should detect US ZIP codes", () => {
      expect(pattern).toBeTruthy();
      expect("12345".match(pattern!.pattern)).toBeTruthy();
      expect("12345-6789".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid ZIP codes", () => {
      expect("1234".match(pattern!.pattern)).toBeFalsy();
      expect("123456".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("CANADIAN_POSTAL_CODE", () => {
    const pattern = geographicPatterns.find(
      (p) => p.name === "CANADIAN_POSTAL_CODE",
    );

    it("should detect Canadian postal codes", () => {
      expect(pattern).toBeTruthy();
      expect("K1A 0B1".match(pattern!.pattern)).toBeTruthy();
      expect("K1A0B1".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid postal codes", () => {
      expect("K1A0B".match(pattern!.pattern)).toBeFalsy();
      expect("123456".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("UK_POSTCODE", () => {
    const pattern = geographicPatterns.find((p) => p.name === "UK_POSTCODE");

    it("should detect UK postcodes", () => {
      expect(pattern).toBeTruthy();
      expect("SW1A 1AA".match(pattern!.pattern)).toBeTruthy();
      expect("M1 1AE".match(pattern!.pattern)).toBeTruthy();
      expect("B33 8TH".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid postcodes", () => {
      expect("INVALID".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("GPS_COORDINATES", () => {
    const pattern = geographicPatterns.find((p) => p.name === "GPS_COORDINATES");

    it("should detect GPS coordinates", () => {
      expect(pattern).toBeTruthy();
      expect("40.7128,-74.0060".match(pattern!.pattern)).toBeTruthy();
      expect("-33.8688, 151.2093".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid coordinates", () => {
      expect("40.7,-74.0".match(pattern!.pattern)).toBeFalsy();
      expect("regular text".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const zipPattern = geographicPatterns.find((p) => p.name === "US_ZIP_CODE");

    expect("regular text".match(zipPattern!.pattern)).toBeFalsy();
  });
});
