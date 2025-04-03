import createResponsiveClasses from "../createResponsiveClasses";

describe("createResponsiveClasses", () => {
  it("throws an error if no value is provided", () => {
    expect(() => createResponsiveClasses("margin", null)).toThrow("No value provided for margin");
  });

  it("returns a single class for string value", () => {
    expect(createResponsiveClasses("padding", "small")).toEqual(["padding-small"]);
  });

  it("returns a single class for number value", () => {
    expect(createResponsiveClasses("gap", 10)).toEqual(["gap-10"]);
  });

  it("returns multiple classes for responsive object", () => {
    const values = { sm: "small", md: "medium", lg: "large" };
    expect(createResponsiveClasses("margin", values)).toEqual([
      "margin-sm-small",
      "margin-md-medium",
      "margin-lg-large"
    ]);
  });

  it("returns an empty array if an empty object is provided", () => {
    expect(createResponsiveClasses("width", {})).toEqual([]);
  });
});