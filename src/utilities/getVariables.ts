import config from '@config/config'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import { PropertyType } from '@typings/valueTypes'
import { roundRgba } from './convertColor'
import { changeNotation } from './changeNotation'
import { getVariableTypeByValue } from './getVariableTypeByValue'
import roundWithDecimals from './roundWithDecimals'

const extractVariable = (variable, value) => {
  let category: tokenCategoryType = 'color'
  let values = {}
  if (value.type === 'VARIABLE_ALIAS') {
    const resolvedAlias = figma.variables.getVariableById(value.id)
    const collection = figma.variables.getVariableCollectionById(resolvedAlias.variableCollectionId)

    return {
      name: variable.name,
      description: variable.description || undefined,
      exportKey: tokenTypes.variables.key as tokenExportKeyType,
      category: getVariableTypeByValue(Object.values(resolvedAlias.valuesByMode)[0]),
      values: `{${collection.name.toLowerCase()}.${changeNotation(resolvedAlias.name, '/', '.')}}`,

      // this is being stored so we can properly update the design tokens later to account for all 
      // modes when using aliases
      aliasName: collection.name,
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
    // nothing needs to be done to variables that have no alias modes
    if (!variable.aliasModes) {
      collector.push(variable)

      return collector
    }

    const { aliasModes, aliasName } = variable

    // this was only added for this function to process that data so before we return the variables, we can remove it
    delete variable.aliasModes
    delete variable.selfCollectionName

    for (let i = 0; i < aliasModes.length; i++) {
      const modeBasedVariable = { ...variable }
      const nameParts = modeBasedVariable.name.split('/');

      nameParts.splice(1, 0, aliasModes[i].name)

      modeBasedVariable.values = modeBasedVariable.values.replace(`{${aliasName}.`, `{${aliasName}.${aliasModes[i].name}.`)
      modeBasedVariable.name = nameParts.join('/')

      collector.push(modeBasedVariable)
    }

    return collector
  }, [])
}

export const getVariables = (figma: PluginAPI, modeReference: boolean) => {
  // get collections
  const collections = Object.fromEntries(figma.variables.getLocalVariableCollections().map((collection) => [collection.id, collection]))
  // get variables
  const variables = figma.variables.getLocalVariables().map((variable) => {
    // get collection name and modes
    const { variableCollectionId } = variable
    const { name: collection, modes } = collections[variableCollectionId]
    // return each mode value as a separate variable
    return Object.entries(variable.valuesByMode).map(([id, value]) => {
      return {
        ...extractVariable(variable, value),
        // name is contstructed from collection, mode and variable name
        name: modeReference ? `${collection}/${modes.find(({ modeId }) => modeId === id).name}/${variable.name}` : `${collection}/${variable.name}`,
        // add mnetadata to extensions
        extensions: {
          [config.key.extensionPluginData]: {
            mode: modeReference ? modes.find(({ modeId }) => modeId === id).name : undefined,
            collection: collection,
            scopes: variable.scopes,
            [config.key.extensionVariableStyleId]: variable.id,
            exportKey: tokenTypes.variables.key as tokenExportKeyType
          }
        }
      }
    })
  })

  return modeReference ? processAliasModes(variables.flat()) : variables.flat();
}



