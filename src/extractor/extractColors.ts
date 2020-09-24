import extractorInterface from '../../types/extractorInterface'
import { colorPropertyInterface, colorRgbaType } from '../../types/propertyObject'
import { convertPaintToRgba } from '../utilities/convertColor'

const extractColors: extractorInterface = (tokenNodes: PaintStyle[]): colorPropertyInterface[] => {
  // get all paint styles
  return tokenNodes.map(node => ({
    name: node.name,
    // id: node.id,
    description: node.description || null,
    values: {
      fill: {
        value: convertPaintToRgba(node.paints[0])
      }
    }
  }))

}

export default extractColors