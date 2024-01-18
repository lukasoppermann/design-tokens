import  processAliasModes  from "../../src/utilities/processAliasModes";

describe("processAliasModes", () => {
  it("should return the same variables if they have no alias modes or only one mode", () => {
    const variables = [
      { values: "{color.black}" },
      { values: "{color.white}", aliasModes: ["mode1"] },
    ];
    const result = processAliasModes(variables);
    expect(result).toEqual(variables);
  });

  it("should process variables with multiple alias modes", () => {
    const variables = [
      {
        values: "{color.black}",
        aliasModes: [{ name: "mode1" }, { name: "mode2" }],
        aliasCollectionName: "color",
      },
    ];
    const result = processAliasModes(variables);
    expect(result).toEqual([
      {
        values: "{color.mode1.black}",
      },
      {
        values: "{color.mode2.black}",
      },
    ]);
  });

  it("should remove aliasModes and aliasCollectionName properties from the variables", () => {
    const variables = [
      {
        values: "{collection.}",
        aliasModes: [{ name: "mode1" }, { name: "mode2" }],
        aliasCollectionName: "collection",
      },
    ];
    const result = processAliasModes(variables);
    result.forEach((variable) => {
      expect(variable).not.toHaveProperty("aliasModes");
      expect(variable).not.toHaveProperty("aliasCollectionName");
    });
	});
	
	it('should match aliasCollectionName case-insensitively and return the alias collection name', () => {
  const variables = [
    {
      values: '{CollEctIon.}',
      aliasModes: [{ name: 'mode1' }, { name: 'mode2' }],
      aliasCollectionName: 'collection',
    },
  ];
  const result = processAliasModes(variables);
  expect(result).toEqual([
    {
      values: '{collection.mode1.}',
    },
    {
      values: '{collection.mode2.}',
    },
  ]);
});
});
