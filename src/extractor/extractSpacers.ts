import extractorInterface from "../../types/extractorInterface"
import { sizePropertyInterface } from "../../types/propertyObject"
import { customTokenNodes } from '../../types/tokenNodeTypes'

const extractSpacers: extractorInterface = (tokenNodes: customTokenNodes[]): sizePropertyInterface[] => {
  const nodeName = 'spacers'
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
    name: node.name,
    // @ts-ignore
    description: node.description || null,
    values: {
      width: {
        value: node.width,
        unit: "pixels"
      },
      height: {
        value: node.height,
        unit: "pixels"
      }
    }
  }))
}

export default extractSpacers