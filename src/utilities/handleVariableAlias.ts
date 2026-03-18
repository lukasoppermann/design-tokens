import { tokenExportKeyType } from '@typings/tokenExportKey'
import { tokenTypes } from '@config/tokenTypes'

import { getVariableTypeByValue } from '@utils/getVariableTypeByValue'
import { changeNotation } from '@utils/changeNotation'

async function handleVariableAlias (
  variable: Variable & { aliasSameMode?: boolean },
  value: { id: string },
  mode?: { modeId: string; name: string },
  aliasSameMode = false
) {
  const resolvedAlias = await figma.variables.getVariableByIdAsync(value.id)
  if (!resolvedAlias) {
    console.warn('[Design Tokens] Skipping variable alias with missing target', {
      variableName: variable.name,
      aliasId: value.id
    })
    return null
  }

  const collection = await figma.variables.getVariableCollectionByIdAsync(
    resolvedAlias.variableCollectionId
  )
  if (!collection) {
    console.warn('[Design Tokens] Skipping variable alias with missing collection', {
      variableName: variable.name,
      aliasId: value.id,
      collectionId: resolvedAlias.variableCollectionId
    })
    return null
  }

  const resolvedAliasValue = Object.values(resolvedAlias.valuesByMode)[0]
  if (resolvedAliasValue === undefined) {
    console.warn('[Design Tokens] Skipping variable alias with no resolved values', {
      variableName: variable.name,
      aliasId: value.id
    })
    return null
  }

  return {
    description: variable.description || '',
    exportKey: tokenTypes.variables.key as tokenExportKeyType,
    category: getVariableTypeByValue(
      resolvedAliasValue
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
