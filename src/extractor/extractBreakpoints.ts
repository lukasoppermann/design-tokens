import extractorInterface from '../../types/extractorInterface'
import { breakpointPropertyInterface } from '../../types/propertyObject'
import { customTokenNode } from '../../types/tokenNodeTypes'
import { UnitTypePixel, PropertyType } from '../../types/valueTypes'
import config from '../utilities/config'
import roundWithDecimals from '../utilities/roundWithDecimals'

const extractBreakpoints: extractorInterface = (tokenNodes: customTokenNode[]): breakpointPropertyInterface[] => {
  const nodeName = 'breakpoints'
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
    name: node.name,
    category: 'breakpoint',
    exportKey: config.exports.breakpoint.key,
    description: node.description || null,
    values: {
      width: {
        value: roundWithDecimals(node.width, 2),
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as PropertyType
      }
    }
  }))
}

export default extractBreakpoints
