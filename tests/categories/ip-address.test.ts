import { describe } from "vitest";
import {
  testPolicySuite,
  testCategoryCoverage,
} from "../policy-test-helpers.js";
import { PolicyCategory } from "../../src/types/index.js";

describe("ip address patterns", () => {
  testCategoryCoverage(PolicyCategory.IP_ADDRESS, [
    "IPV4_ADDRESS",
    "IPV6_ADDRESS",
  ]);

  describe("IPV4_ADDRESS", () => {
    testPolicySuite({
      policyName: "IPV4_ADDRESS",
      replacement: "[IP]",
      shouldMatch: [
        "192.168.1.1",
        "10.0.0.1",
        "255.255.255.255",
        "172.16.0.1",
        "8.8.8.8",
        "127.0.0.1",
        "0.0.0.0",
        "203.0.113.0",
        "198.51.100.42",
      ],
      shouldNotMatch: [
        "256.256.256.256",
        "192.168.1",
        "regular text",
        "192.168.1.256",
        "999.999.999.999",
        "192.168",
        "abc.def.ghi.jkl",
        "ip-address",
      ],
    });
  });

  describe("IPV6_ADDRESS", () => {
    testPolicySuite({
      policyName: "IPV6_ADDRESS",
      replacement: "[IP]",
      shouldMatch: [
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        "2607:f8b0:4005:0805:0000:0000:0000:200e",
        "2001:0db8:0000:0000:0000:0000:0000:0001",
        "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
        "0000:0000:0000:0000:0000:0000:0000:0000",
        "2001:4860:4860:0000:0000:0000:0000:8888",
        "abcd:ef01:2345:6789:abcd:ef01:2345:6789",
      ],
      shouldNotMatch: [
        "fe80::1",
        "::1",
        "::",
        "2001:db8::1",
        "not-an-ipv6",
        "2001:0db8:85a3",
        "2001:db8",
        "gggg:0000:0000:0000:0000:0000:0000:0001",
      ],
    });
  });
});
