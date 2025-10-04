import { describe, it, expect } from "vitest";
import { POLICIES } from "../../src/constants.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("ip address patterns", () => {
  const ipPatterns = POLICIES.filter(
    (p) => p.category === PolicyCategory.IP_ADDRESS,
  );

  it("should have IP address patterns", () => {
    expect(ipPatterns.length).toBeGreaterThan(0);
  });

  describe("IPV4_ADDRESS", () => {
    const pattern = ipPatterns.find((p) => p.name === "IPV4_ADDRESS");

    it("should detect IPv4 addresses", () => {
      expect(pattern).toBeTruthy();
      expect("192.168.1.1".match(pattern!.pattern)).toBeTruthy();
      expect("10.0.0.1".match(pattern!.pattern)).toBeTruthy();
      expect("255.255.255.255".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match invalid IPv4 addresses", () => {
      expect("256.256.256.256".match(pattern!.pattern)).toBeFalsy();
      expect("192.168.1".match(pattern!.pattern)).toBeFalsy();
    });
  });

  describe("IPV6_ADDRESS", () => {
    const pattern = ipPatterns.find((p) => p.name === "IPV6_ADDRESS");

    it("should detect IPv6 addresses", () => {
      expect(pattern).toBeTruthy();
      expect("2001:0db8:85a3:0000:0000:8a2e:0370:7334".match(pattern!.pattern)).toBeTruthy();
      expect("2607:f8b0:4005:0805:0000:0000:0000:200e".match(pattern!.pattern)).toBeTruthy();
    });

    it("should not match reserved IPv6 addresses", () => {
      expect("fe80::1".match(pattern!.pattern)).toBeFalsy();
      expect("::1".match(pattern!.pattern)).toBeFalsy();
      expect("::".match(pattern!.pattern)).toBeFalsy();
      expect("2001:db8::1".match(pattern!.pattern)).toBeFalsy();
    });

    it("should not match invalid IPv6 addresses", () => {
      expect("not-an-ipv6".match(pattern!.pattern)).toBeFalsy();
      expect("2001:0db8:85a3".match(pattern!.pattern)).toBeFalsy();
    });
  });

  it("should not have false positives", () => {
    const ipv4Pattern = ipPatterns.find((p) => p.name === "IPV4_ADDRESS");
    const ipv6Pattern = ipPatterns.find((p) => p.name === "IPV6_ADDRESS");

    expect("regular text".match(ipv4Pattern!.pattern)).toBeFalsy();
    expect("regular text".match(ipv6Pattern!.pattern)).toBeFalsy();
  });
});
