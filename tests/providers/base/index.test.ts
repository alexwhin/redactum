import { describe, it, expect } from "vitest";

describe("Base Provider Types", () => {
  it("should be able to import base provider types", async () => {
    const module = await import("../../../src/providers/base/index.js");
    expect(module).toBeDefined();
  });
});