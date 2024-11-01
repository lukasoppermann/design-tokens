import processAliasModes from "../../src/utilities/processAliasModes";

describe("processAliasModes", () => {
  it("should return the same variables if they have no alias modes", () => {
    const variables = [
      { values: "{color.black}" },
    ];
    const result = processAliasModes(variables);
    expect(result).toEqual(variables);
  });

  it("should match aliasCollectionName case-insensitively and return the alias collection name", () => {
    const variables = [
      {
        values: "{CollEctIon.}",
        aliasMode: {name: "mode1"},
        aliasCollectionName: "collection",
      },
    ];
    const result = processAliasModes(variables);
    expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "aliasCollectionName": "collection",
    "aliasMode": Object {
      "name": "mode1",
    },
    "values": "{CollEctIon.}",
  },
]
`)
  });
});
