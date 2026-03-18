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

const extractVariable = async (
  variable: Variable & { aliasSameMode?: boolean },
  value: any,
  mode: { modeId: string; name: string }
) => {
  let category: tokenCategoryType = 'color'
  let values = {}
  if (value.type === 'VARIABLE_ALIAS') {
    return await handleVariableAlias(variable, value, mode)
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

// Used only when `resolveSameCollectionOrModeReference` is enabled.
// For alias values, this checks whether the referenced variable lives in the
// same collection so later export can inject the current mode into the alias path.
const detectVariableReferencesInCollection = async (
  figma: PluginAPI,
  collection,
  variable
) => {
  if (!collection || !variable) {
    return variable
  }

  for (const mode of collection.modes || []) {
    const modeValue = variable.valuesByMode?.[mode.modeId]

    if (
      !modeValue ||
      typeof modeValue !== 'object' ||
      modeValue.type !== 'VARIABLE_ALIAS'
    ) {
      continue
    }

    const otherVariable = await figma.variables.getVariableByIdAsync(modeValue.id)
    const isSameVariable = variable.id
      ? variable.id === otherVariable?.id
      : variable.name === otherVariable?.name

    if (
      otherVariable &&
      !isSameVariable &&
      otherVariable.variableCollectionId === collection.id
    ) {
      return deepMerge(variable, { aliasSameMode: true })
    }
  }

  return variable
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
  const variables = await Promise.all(localVariables?.filter((variable) =>
    excludedCollectionIds.includes(variable.variableCollectionId)
  )?.map(async (variable) => {
    // get collection name and modes
    const { variableCollectionId } = variable
    const { name: collection, modes } = collections[variableCollectionId]

    if (settings.resolveSameCollectionOrModeReference) {
      variable = await detectVariableReferencesInCollection(
        figma,
        collections[variableCollectionId],
        variable
      )
    }

    // return each mode value as a separate variable
    return await Promise.all(Object.entries(variable.valuesByMode)?.map(async ([id, value]) => {
      // Only add mode if there's more than one
      // and if modeInTokenName is set to true
      const addModeInTokenName = settings.modeInTokenName && modes.length > 1
      const mode = modes.find(({ modeId }) => modeId === id)

      if (!mode) {
        console.warn(`cannot find mode with id ${id} for variable ${variable.name}`)
      }

      const variableName = `${collection}/${variable.name}`
      const variableNameWithMode = mode ? `${collection}/${mode?.name}/${variable?.name}` : variableName
      const extractedVariable = await extractVariable(variable, value, mode)
      if (!extractedVariable) {
        return null
      }

      return {
        ...extractedVariable,
        // name is constructed from collection, mode and variable name
        name: mode && addModeInTokenName ? variableNameWithMode : variableName,
        // add metadata to extensions
        extensions: {
          [config.key.extensionPluginData]: {
            mode: mode && addModeInTokenName ? mode.name : undefined,
            modeId: mode && addModeInTokenName ? mode.modeId : undefined,
            collection: collection,
            scopes: variable.scopes,
            [config.key.extensionVariableStyleId]: variable.id,
            exportKey: tokenTypes.variables.key as tokenExportKeyType
          }
        }
      }
    }))
  }) || [])

  const flattenedVariables = variables.flat().filter(Boolean)

  // add the mode name to the variable values value in order
  // to be able to reference to it correctly:
  // values: collection.value becomes collection.[mode name].value
  //
  // `variablesWithAliasInTheSameCollection` is not used when `settings.modeInTokenValue`
  // is set to `true` to avoid values in the form of: collection.[mode name].[mode name].value
  const variablesWithAliasInTheSameCollection = () =>
    flattenedVariables
      // @ts-ignore
      .map((v) => (v?.aliasSameMode ? processAliasModes([v]) : v))
      .flat()

  return settings.modeInTokenValue
    ? processAliasModes(flattenedVariables)
    : variablesWithAliasInTheSameCollection()
}
