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
        "192.168.1.1", // private network address
        "10.0.0.1", // class A private network
        "255.255.255.255", // broadcast address
        "172.16.0.1", // class B private network
        "8.8.8.8", // Google DNS public IP
        "127.0.0.1", // localhost loopback
        "0.0.0.0", // all interfaces wildcard
        "203.0.113.0", // documentation IP range
        "198.51.100.42", // documentation IP range
        "1.1.1.1", // Cloudflare DNS
        "169.254.1.1", // link-local address
        "224.0.0.1", // multicast address
        "192.0.2.146", // TEST-NET-1 documentation
        "100.64.0.1", // shared address space
      ],
      shouldNotMatch: [
        "256.256.256.256", // octet exceeds 255
        "192.168.1", // missing fourth octet
        "regular text", // plain text
        "192.168.1.256", // fourth octet exceeds 255
        "999.999.999.999", // all octets exceed 255
        "192.168", // missing two octets
        "abc.def.ghi.jkl", // letters instead of numbers
        "ip-address", // text label
      ],
    });
  });

  describe("IPV6_ADDRESS", () => {
    testPolicySuite({
      policyName: "IPV6_ADDRESS",
      replacement: "[IP]",
      shouldMatch: [
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334", // documentation IPv6 full format
        "2607:f8b0:4005:0805:0000:0000:0000:200e", // Google IPv6 full format
        "2001:0db8:0000:0000:0000:0000:0000:0001", // documentation with zeros
        "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", // maximum IPv6 value
        "0000:0000:0000:0000:0000:0000:0000:0000", // minimum IPv6 value (all zeros)
        "2001:4860:4860:0000:0000:0000:0000:8888", // Google DNS IPv6
        "abcd:ef01:2345:6789:abcd:ef01:2345:6789", // hexadecimal characters
        "2001:0db8:aaaa:bbbb:cccc:dddd:eeee:ffff", // mixed hex values
        "fd00:0000:0000:0000:0000:0000:0000:0001", // unique local address
        "2001:0000:4136:e378:8000:63bf:3fff:fdd2", // Teredo tunneling
        "3ffe:1900:4545:0003:0200:f8ff:fe21:67cf", // old 6bone format
      ],
      shouldNotMatch: [
        "fe80::1", // compressed format with double colon
        "fe80:0000:0000:0000:0202:b3ff:fe1e:8329", // link-local (excluded by pattern)
        "::1", // loopback compressed format
        "::", // all zeros compressed
        "2001:db8::1", // documentation compressed
        "not-an-ipv6", // plain text
        "2001:0db8:85a3", // incomplete address
        "2001:db8", // too short
        "gggg:0000:0000:0000:0000:0000:0000:0001", // invalid hex character
      ],
    });
  });
});
