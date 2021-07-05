import extractorInterface from '@typings/extractorInterface'
import { spacingPropertyInterface } from '@typings/propertyObject'
import { customTokenNode } from '@typings/tokenNodeTypes'
import { UnitTypePixel, PropertyType } from '@typings/valueTypes'
import { tokenTypes } from '@config/tokenTypes'
import roundWithDecimals from '../utilities/roundWithDecimals'
import { filterByPrefix } from './extractUtilities'

const extractSpacing: extractorInterface = (tokenNodes: customTokenNode[], prefixArray: string[]): spacingPropertyInterface[] => {
  // return as object
  return tokenNodes.filter(filterByPrefix(prefixArray))
    .map(node => ({
      name: node.name,
      category: 'spacing',
      exportKey: tokenTypes.spacing.key,
      description: node.description || null,
      values: {
        top: {
          value: roundWithDecimals(node.paddingTop, 2),
          unit: 'pixel' as UnitTypePixel,
          type: 'number' as PropertyType
        },
        right: {
          value: roundWithDecimals(node.paddingRight, 2),
          unit: 'pixel' as UnitTypePixel,
          type: 'number' as PropertyType
        },
        bottom: {
          value: roundWithDecimals(node.paddingBottom, 2),
          unit: 'pixel' as UnitTypePixel,
          type: 'number' as PropertyType
        },
        left: {
          value: roundWithDecimals(node.paddingLeft, 2),
          unit: 'pixel' as UnitTypePixel,
          type: 'number' as PropertyType
        }
      }
    })
    )
}

export default extractSpacing
