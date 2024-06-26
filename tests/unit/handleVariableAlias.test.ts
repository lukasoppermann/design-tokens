import handleVariableAlias from "../../src/utilities/handleVariableAlias";

import { tokenExportKeyType } from "@typings/tokenExportKey";
import { tokenTypes } from "@config/tokenTypes";

import { getVariableTypeByValue } from "../../src/utilities/getVariableTypeByValue";
import { changeNotation } from "../../src/utilities/changeNotation";

jest.mock("../../src/utilities/getVariableTypeByValue", () => ({
  getVariableTypeByValue: jest.fn(),
}));

jest.mock("../../src/utilities/changeNotation", () => ({
  changeNotation: jest.fn(),
}));

describe("handleVariableAlias", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    // @ts-ignore
    global.figma = {
      variables: {
        getVariableById: jest.fn(),
        getVariableCollectionById: jest.fn(),
      },
    };
  });

  it("should return the correct object", () => {
    const variable = { description: "test description" };
    const value = { id: "test id" };
    const resolvedAlias = {
      variableCollectionId: "test collection id",
      name: "test name",
      valuesByMode: { mode1: "value1" },
    };
    const collection = {
      name: "test collection name",
      modes: "test modes",
    };

    // @ts-ignore
    global.figma.variables.getVariableById.mockReturnValue(resolvedAlias);

    // @ts-ignore
    getVariableTypeByValue.mockImplementation(() => "test category");

    // @ts-ignore
    changeNotation.mockImplementation(() => "test notation");

    // @ts-ignore
    global.figma.variables.getVariableCollectionById.mockReturnValue(
      collection
    );

    const result = handleVariableAlias(variable, value, 'passedInMode');

    expect(result).toEqual({
      description: "test description",
      exportKey: tokenTypes.variables.key as tokenExportKeyType,
      category: "test category",
      values: `{test collection name.test notation}`,
      aliasCollectionName: "test collection name",
      aliasMode: "passedInMode",
    });
  });
});
