import extractorInterface from '@typings/extractorInterface'
import { sizePropertyInterface } from '@typings/propertyObject'
import { customTokenNode } from '@typings/tokenNodeTypes'
import { UnitTypePixel, PropertyType } from '@typings/valueTypes'
import { tokenTypes } from '@config/tokenTypes'
import roundWithDecimals from '../utilities/roundWithDecimals'
import { filterByPrefix } from './extractUtilities'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import { tokenCategoryType } from '@typings/tokenCategory'

const extractSizes: extractorInterface = (tokenNodes: customTokenNode[], prefixArray: string[]): sizePropertyInterface[] => {
  // return as object
  return tokenNodes.filter(filterByPrefix(prefixArray)).map(node => ({
    name: node.name,
    category: 'size' as tokenCategoryType,
    exportKey: tokenTypes.size.key as tokenExportKeyType,
    description: node.description || null,
    values: {
      width: {
        value: roundWithDecimals(node.width, 2),
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as PropertyType
      },
      height: {
        value: roundWithDecimals(node.height, 2),
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as PropertyType
      }
    }
  }))
}

export default extractSizes
