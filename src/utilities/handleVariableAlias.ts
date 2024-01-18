import { tokenTypes } from "@config/tokenTypes";
import { tokenExportKeyType } from "@typings/tokenExportKey";
import { changeNotation } from "./changeNotation";
import { getVariableTypeByValue } from "./getVariableTypeByValue";

const handleVariableAlias = (variable, value) => {
	const resolvedAlias = figma.variables.getVariableById(value.id);
  const collection = figma.variables.getVariableCollectionById(
    resolvedAlias.variableCollectionId
  );
  return {
    // overridden anyways when extract variable is used
    // name: variable.name,
    description: variable.description || undefined,
    exportKey: tokenTypes.variables.key as tokenExportKeyType,
    category: getVariableTypeByValue(
      Object.values(resolvedAlias.valuesByMode)[0]
    ),
    values: `{${collection.name.toLowerCase()}.${changeNotation(
      resolvedAlias.name,
      "/",
      "."
    )}}`,

    // this is being stored so we can properly update the design tokens later to account for all
    // modes when using aliases
    aliasCollectionName: collection.name.toLowerCase(),
    aliasModes: collection.modes,
  };
};

export default handleVariableAlias;
