import extractorInterface from '@typings/extractorInterface'
import { opacityPropertyInterface } from '@typings/propertyObject'
import { customTokenNode } from '@typings/tokenNodeTypes'
import { PropertyType } from '@typings/valueTypes'
import { tokenTypes } from '@config/tokenTypes'
import roundWithDecimals from '@utils/roundWithDecimals'
import { filterByPrefix } from './extractUtilities'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import { tokenCategoryType } from '@typings/tokenCategory'
import config from '@config/config'

const extractOpacities: extractorInterface = (tokenNodes: customTokenNode[], prefixArray: string[]): opacityPropertyInterface[] => {
  // return as object
  return tokenNodes.filter(filterByPrefix(prefixArray)).map(node => ({
    name: node.name,
    category: 'opacity' as tokenCategoryType,
    exportKey: tokenTypes.opacity.key as tokenExportKeyType,
    description: node.description || null,
    values: {
      opacity: {
        value: roundWithDecimals(node.opacity, 2),
        type: 'number' as PropertyType
      }
    },
    extensions: {
      [config.key.extensionPluginData]: {
        exportKey: tokenTypes.opacity.key as tokenExportKeyType
      }
    }
  }))
}

export default extractOpacities
