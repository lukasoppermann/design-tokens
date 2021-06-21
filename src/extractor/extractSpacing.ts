import extractorInterface from '@typings/extractorInterface'
import { spacingPropertyInterface } from '@typings/propertyObject'
import { customTokenNode } from '@typings/tokenNodeTypes'
import { UnitTypePixel, PropertyType } from '@typings/valueTypes'
import config from '@config/config'
import roundWithDecimals from '../utilities/roundWithDecimals'

const extractSpacing: extractorInterface = (tokenNodes: customTokenNode[]): spacingPropertyInterface[] => {
  const nodeName = 'spacing'
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName)
    .map(node => ({
      name: node.name,
      category: 'spacing',
      exportKey: config.exports.spacing.key,
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
