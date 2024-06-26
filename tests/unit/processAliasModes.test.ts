import processAliasModes from "../../src/utilities/processAliasModes";

describe("processAliasModes", () => {
  it("should return the same variables if they have no alias modes", () => {
    const variables = [
      { values: "{color.black}" },
    ];
    const result = processAliasModes(variables);
    expect(result).toEqual(variables);
  });

  it("should remove aliasModes and aliasCollectionName properties from the variables", () => {
    const variables = [
      {
        values: "{collection.}",
        aliasMode: "mode1",
        aliasCollectionName: "collection",
      },
    ];
    const result = processAliasModes(variables);
    result.forEach((variable) => {
      expect(variable).not.toHaveProperty("aliasMode");
      expect(variable).not.toHaveProperty("aliasCollectionName");
    });
  });

  it("should match aliasCollectionName case-insensitively and return the alias collection name", () => {
    const variables = [
      {
        values: "{CollEctIon.}",
        aliasMode: "mode1",
        aliasCollectionName: "collection",
      },
    ];
    const result = processAliasModes(variables);
    expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "values": "{CollEctIon.}",
  },
]
`)
  });
});
