import config from '@config/config'
import { tokenTypes } from '@config/tokenTypes'
import { StandardTokenTypes } from '@typings/standardToken'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'

export const getVariables = () => {
  return [{
    "name": 'variable',
    "values": [{
      fill: {
        value: {
          r: 0.5,
          g: 0.5,
          b: 0.2,
          a: 1
        },
        type: 'color',
        blendMode: 'normal'
      }
    }],
    category: 'color' as tokenCategoryType,
    type: 'color' as StandardTokenTypes,
    exportKey: 'variables',
    extensions: {
      [config.key.extensionPluginData]: {
        "mode": 'mode',
        "collection": 'collection',
        // [config.key.extensionFigmaStyleId]: node.id,
        exportKey: tokenTypes.variables.key as tokenExportKeyType
      }
    }
  }]
}