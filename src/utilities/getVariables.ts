import config from '@config/config'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import { PropertyType } from '@typings/valueTypes'
import { roundRgba } from './convertColor'
import roundWithDecimals from './roundWithDecimals'
import processAliasModes from './processAliasModes'
import handleVariableAlias from './handleVariableAlias'
import { Settings } from '@typings/settings'

const extractVariable = (variable, value) => {
  let category: tokenCategoryType = 'color'
  let values = {}
  if (value.type === 'VARIABLE_ALIAS') {
    return handleVariableAlias(variable, value)
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
    // name is overridden anyways
    // name: variable.name,
    description: variable.description || undefined,
    exportKey: tokenTypes.variables.key as tokenExportKeyType,
    category,
    values
  }
}

export const getVariables = (figma: PluginAPI, settings: Settings) => {
  const excludedCollectionIds = figma.variables.getLocalVariableCollections().filter(collection => !['.', '_', ...settings.exclusionPrefix.split(',')].includes(collection.name.charAt(0))).map(collection => collection.id)
  // get collections
  const collections = Object.fromEntries(figma.variables.getLocalVariableCollections().map((collection) => [collection.id, collection]))
  // get variables
  const variables = figma.variables.getLocalVariables().filter(variable => excludedCollectionIds.includes(variable.variableCollectionId)).map((variable) => {
    // get collection name and modes
    const { variableCollectionId } = variable
    const { name: collection, modes } = collections[variableCollectionId]
    // return each mode value as a separate variable
    return Object.entries(variable.valuesByMode).map(([id, value]) => {
      // Only add mode if there's more than one
      const addMode = settings.modeReference && modes.length > 1
      return {
        ...extractVariable(variable, value),
        // name is constructed from collection, mode and variable name

        name: addMode ? `${collection}/${modes.find(({ modeId }) => modeId === id).name}/${variable.name}` : `${collection}/${variable.name}`,
        // add metadata to extensions
        extensions: {
          [config.key.extensionPluginData]: {
            mode: settings.modeReference ? modes.find(({ modeId }) => modeId === id).name : undefined,
            collection: collection,
            scopes: variable.scopes,
            [config.key.extensionVariableStyleId]: variable.id,
            exportKey: tokenTypes.variables.key as tokenExportKeyType
          }
        }
      }
    })
  })
  console.log(variables.flat())
  return settings.modeReference ? processAliasModes(variables.flat()) : variables.flat()
}
