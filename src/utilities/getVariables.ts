import config from '@config/config'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import { PropertyType } from '@typings/valueTypes'
import { roundRgba } from './convertColor'

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
      category: 'alias',
      values: `{${collection.name}.${resolvedAlias.name}}`
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
      category = 'size'
      values = value
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

export const getVariables = (figma: PluginAPI) => {
  // get collections
  const collections = Object.fromEntries(figma.variables.getLocalVariableCollections().map((collection) => [collection.id, collection]))
  // get variables
  const variables = figma.variables.getLocalVariables().map((variable) => {
    const { variableCollectionId } = variable
    const { name: collection, modes } = collections[variableCollectionId]
    return Object.entries(variable.valuesByMode).map(([id, value]) => {
      return {
        ...extractVariable(variable, value),
        name: `${collection}/${modes.find(({ modeId }) => modeId === id).name}/${variable.name}`,
        extensions: {
          [config.key.extensionPluginData]: {
            mode: modes.find(({ modeId }) => modeId === id).name,
            collection: collection,
            scopes: variable.scopes,
            [config.key.extensionVariableStyleId]: variable.id,
            exportKey: tokenTypes.variables.key as tokenExportKeyType
          }
        }
      }
    })
  })
  return variables.flat()

  // return [{
  //   "name": 'variable',
  //   "values": [{
  //     fill: {
  //       value: {
  //         r: 0.5,
  //         g: 0.5,
  //         b: 0.2,
  //         a: 1
  //       },
  //       type: 'color',
  //       blendMode: 'normal'
  //     }
  //   }],
  //   category: 'color' as tokenCategoryType,
  //   type: 'color' as StandardTokenTypes,
  //   exportKey: 'variables',
  //   extensions: {
  //     [config.key.extensionPluginData]: {
  //       "mode": 'mode',
  //       "collection": 'collection',
  //       // [config.key.extensionFigmaStyleId]: node.id,
  //       exportKey: tokenTypes.variables.key as tokenExportKeyType
  //     }
  //   }
  // }]
}
