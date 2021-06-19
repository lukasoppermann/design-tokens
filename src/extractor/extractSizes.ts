import extractorInterface from '../../types/extractorInterface'
import { sizePropertyInterface } from '../../types/propertyObject'
import { customTokenNode } from '../../types/tokenNodeTypes'
import { UnitTypePixel, PropertyType } from '../../types/valueTypes'
import config from '../utilities/config'
import roundWithDecimals from '../utilities/roundWithDecimals'

const extractSizes: extractorInterface = (tokenNodes: customTokenNode[]): sizePropertyInterface[] => {
  const nodeName = 'sizes'
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
    name: node.name,
    category: 'size',
    exportKey: config.exports.size.key,
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
