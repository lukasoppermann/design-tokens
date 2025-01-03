import config from '@config/config'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import { PropertyType } from '@typings/valueTypes'
import { roundRgba } from '@utils/convertColor'
import roundWithDecimals from '@utils/roundWithDecimals'
import handleVariableAlias from '@utils/handleVariableAlias'
import processAliasModes from '@utils/processAliasModes'
import { Settings } from '@typings/settings'
import deepMerge from '@utils/deepMerge'

const extractVariable = (
  variable: Variable & { aliasSameMode?: boolean },
  value: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  mode: { modeId: string; name: string }
) => {
  let category: tokenCategoryType = 'color'
  let values = {}
  if (value.type === 'VARIABLE_ALIAS') {
    return handleVariableAlias(variable, value, mode)
  }
  switch (variable.resolvedType) {
    case 'COLOR':
      category = 'color'
      values = {
        fill: {
          value: roundRgba(value),
          type: 'color' as PropertyType,
          blendMode: 'normal'
        }
      }
      break
    case 'FLOAT':
      category = 'dimension'
      values = roundWithDecimals(value, 2)
      break
    case 'STRING':
      category = 'string'
      values = value
      break
    case 'BOOLEAN':
      category = 'boolean'
      values = value
      break
  }
  return {
    name: variable.name,
    description: variable.description || undefined,
    exportKey: tokenTypes.variables.key as tokenExportKeyType,
    category,
    values
  }
}

const detectVariableReferencesInCollection = (collection, variable) => {
  let tmpVariable = {}
  if (variable) {
    collection?.modes?.forEach((mode) => {
      const modeValue = variable.valuesByMode[mode.modeId]

      // Loop through other variables in the same collection to check for references
      collection.variableIds?.forEach(async (otherVariableId) => {
        const otherVariable = await figma.variables.getVariableByIdAsync(
          otherVariableId
        )

        if (
          otherVariable &&
          modeValue &&
          typeof modeValue === 'object' &&
          variable.name !== otherVariable.name && // Avoid self-reference
          modeValue.id === otherVariable.id
        ) {
          const aliasSameMode = true
          tmpVariable = handleVariableAlias(
            variable,
            modeValue,
            mode,
            aliasSameMode
          )
        }
      })
    })
  }
  return deepMerge(variable, tmpVariable)
}

export const getVariables = async (figma: PluginAPI, settings: Settings) => {
  const localVariableCollections =
    await figma.variables.getLocalVariableCollectionsAsync()
  const localVariables = await figma.variables.getLocalVariablesAsync()
  const excludedCollectionIds = localVariableCollections?.filter(
    (collection) =>
      !['.', '_', ...settings.exclusionPrefix.split(',')].includes(
        collection.name.charAt(0)
      )
  )
    .map((collection) => collection.id)
  // get collections
  const collections = localVariableCollections
    ? Object.fromEntries(
        localVariableCollections?.map((collection) => [collection.id, collection])
      )
    : []
  // get variables
  const variables = localVariables?.filter((variable) =>
    excludedCollectionIds.includes(variable.variableCollectionId)
  )?.map((variable) => {
    // get collection name and modes
    const { variableCollectionId } = variable
    const { name: collection, modes } = collections[variableCollectionId]

    if (settings.resolveSameCollectionOrModeReference) {
      variable = detectVariableReferencesInCollection(
        collections[variableCollectionId],
        variable
      )
    }

    // return each mode value as a separate variable
    return Object.entries(variable.valuesByMode)?.map(([id, value]) => {
      // Only add mode if there's more than one
      // and if modeInTokenName is set to true
      const addModeInTokenName = settings.modeInTokenName && modes.length > 1
      const mode = modes.find(({ modeId }) => modeId === id)
      const variableName = `${collection}/${variable.name}`
      const variableNameWithMode = `${collection}/${mode.name}/${variable.name}`

      return {
        ...extractVariable(variable, value, mode),
        // name is constructed from collection, mode and variable name
        name: addModeInTokenName ? variableNameWithMode : variableName,
        // add metadata to extensions
        extensions: {
          [config.key.extensionPluginData]: {
            mode: settings.modeInTokenValue ? mode.name : undefined,
            collection: collection,
            scopes: variable.scopes,
            [config.key.extensionVariableStyleId]: variable.id,
            exportKey: tokenTypes.variables.key as tokenExportKeyType
          }
        }
      }
    })
  }) || []

  // add the mode name to the variable values value in order
  // to be able to reference to it correctly:
  // values: collection.value becomes collection.[mode name].value
  //
  // `variablesWithAliasInTheSameCollection` is not used when `settings.modeInTokenValue`
  // is set to `true` to avoid values in the form of: collection.[mode name].[mode name].value
  const variablesWithAliasInTheSameCollection = () =>
    variables
      .flat()
      // @ts-ignore
      .map((v) => (v?.aliasSameMode ? processAliasModes([v]) : v))
      .flat()

  return settings.modeInTokenValue
    ? processAliasModes(variables.flat())
    : variablesWithAliasInTheSameCollection()
}
