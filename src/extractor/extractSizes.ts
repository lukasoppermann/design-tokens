import extractorInterface from "../../types/extractorInterface"
import { propertyType, sizePropertyInterface } from "../../types/propertyObject"
import { customTokenNodes } from '../../types/tokenNodeTypes'
import { UnitTypePixel } from '../../types/valueTypes'

const extractSizes: extractorInterface = (tokenNodes: customTokenNodes[]): sizePropertyInterface[] => {
  const nodeName = 'sizes'
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName ).map(node => ({
    name: node.name,
    // @ts-ignore
    description: node.description || null,
    category: 'size',
    values: {
      width: {
        value: node.width,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as propertyType
      },
      height: {
        value: node.height,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as propertyType
      }
    }
  }))
}

export default extractSizes