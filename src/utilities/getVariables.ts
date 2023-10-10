import config from '@config/config'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import { PropertyType } from '@typings/valueTypes'
import { roundRgba } from './convertColor'
import { changeNotation } from './changeNotation'
import { getVariableTypeByValue } from './getVariableTypeByValue'
import roundWithDecimals from './roundWithDecimals'
import { Settings } from '@typings/settings'

const extractVariable = (variable, value) => {
  let category: tokenCategoryType = 'color'
  let values = {}
  if (value.type === 'VARIABLE_ALIAS') {
    const resolvedAlias = figma.variables.getVariableById(value.id)
    const collection = figma.variables.getVariableCollectionById(resolvedAlias.variableCollectionId)
    console.log(variable)
    return {
      name: variable.name,
      description: variable.description || undefined,
      exportKey: tokenTypes.variables.key as tokenExportKeyType,
      category: getVariableTypeByValue(Object.values(resolvedAlias.valuesByMode)[0]),
      values: `{${collection.name.toLowerCase()}.${changeNotation(resolvedAlias.name, '/', '.')}}`,

      // this is being stored so we can properly update the design tokens later to account for all 
      // modes when using aliases
      aliasCollectionName: collection.name,
      aliasModes: collection.modes
    }
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

const processAliasModes = (variables) => {
  return variables.reduce((collector, variable) => {
    // nothing needs to be done to variables that have no alias modes, or only one mode
    if (!variable.aliasModes || variable.aliasModes.length < 2) {
      collector.push(variable)

      return collector
    }

    const { aliasModes, aliasCollectionName } = variable

    // this was only added for this function to process that data so before we return the variables, we can remove it
    delete variable.aliasModes
    delete variable.aliasCollectionName

    for (let i = 0; i < aliasModes.length; i++) {
      const modeBasedVariable = { ...variable }
      modeBasedVariable.values = modeBasedVariable.values.replace(`{${aliasCollectionName}.`, `{${aliasCollectionName}.${aliasModes[i].name}.`)

      collector.push(modeBasedVariable)
    }

    return collector
  }, [])
}

export const getVariables = (figma: PluginAPI, settings: Settings) => {
  const excludedCollectionIds = figma.variables.getLocalVariableCollections().filter(collection => !['.', '_', ...settings.exclusionPrefix.split(',')].includes(collection.name.charAt(0))).map(collection => collection.id);
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
      let addMode = settings.modeReference && modes.length > 1
      return {
        ...extractVariable(variable, value),
        // name is contstructed from collection, mode and variable name

        name: addMode ? `${collection}/${modes.find(({ modeId }) => modeId === id).name}/${variable.name}` : `${collection}/${variable.name}`,
        // add mnetadata to extensions
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
  return settings.modeReference ? processAliasModes(variables.flat()) : variables.flat();
}