import { isArray } from "../../index";

describe("isArray", () => {
  it("should return true for an array of numbers", () => {
    const result = isArray([1, 2, 3]);
    expect(result).toBe(true);
  });

  it("should return true for an empty array", () => {
    const result = isArray([]);
    expect(result).toBe(true);
  });

  it("should return false for a string", () => {
    const result = isArray("hello");
    expect(result).toBe(false);
  });

  it("should return false for null", () => {
    const result = isArray(null);
    expect(result).toBe(false);
  });

  it("should return false for an object", () => {
    const result = isArray({ key: "value" });
    expect(result).toBe(false);
  });

  it("should return false for a number", () => {
    const result = isArray(42);
    expect(result).toBe(false);
  });

  it("should return false for undefined", () => {
    const result = isArray(undefined);
    expect(result).toBe(false);
  });

  it("should return true for an array of mixed types", () => {
    const result = isArray([1, "two", { three: 3 }]);
    expect(result).toBe(true);
  });
});
