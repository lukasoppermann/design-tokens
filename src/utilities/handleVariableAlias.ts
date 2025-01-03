import { tokenExportKeyType } from '@typings/tokenExportKey'
import { tokenTypes } from '@config/tokenTypes'

import { getVariableTypeByValue } from '@utils/getVariableTypeByValue'
import { changeNotation } from '@utils/changeNotation'

async function handleVariableAlias (variable, value, mode, aliasSameMode = false) {
  const resolvedAlias = await figma.variables.getVariableByIdAsync(value.id)
  const collection = await figma.variables.getVariableCollectionByIdAsync(resolvedAlias.variableCollectionId)
  return {
    description: variable.description || '',
    exportKey: tokenTypes.variables.key as tokenExportKeyType,
    category: getVariableTypeByValue(
      Object.values(resolvedAlias.valuesByMode)[0]
    ),
    values: `{${collection.name.toLowerCase()}.${changeNotation(
      resolvedAlias.name,
      '/',
      '.'
    )}}`,

    // this is being stored so we can properly update the design tokens later to account for all
    // modes when using aliases
    aliasCollectionName: collection.name.toLowerCase(),
    aliasMode: mode,
    aliasSameMode: variable.aliasSameMode || aliasSameMode
  }
}

export default handleVariableAlias
