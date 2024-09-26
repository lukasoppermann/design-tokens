import { tokenExportKeyType } from '@typings/tokenExportKey'
import { tokenTypes } from '@config/tokenTypes'

import { getVariableTypeByValue } from '@src/utilities/getVariableTypeByValue'
import { changeNotation } from '@src/utilities/changeNotation'

function handleVariableAlias (variable, value, mode) {
  const resolvedAlias = figma.variables.getVariableById(value.id)
  const collection = figma.variables.getVariableCollectionById(
    resolvedAlias.variableCollectionId
  )
  return {
    description: variable.description || undefined,
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
    aliasMode: mode
  }
}

export default handleVariableAlias
