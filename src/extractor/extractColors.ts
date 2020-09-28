import extractorInterface from '../../types/extractorInterface'
import { colorPropertyInterface, colorRgbaType, propertyType } from '../../types/propertyObject'
import { convertPaintToRgba } from '../utilities/convertColor'
import getTokenStyles from '../utilities/getTokenStyles'

const extractColors: extractorInterface = (tokenNodes: PaintStyle[]): colorPropertyInterface[] => {
  // get all paint styles
  return getTokenStyles(tokenNodes).map(node => ({
    name: node.name,
    // id: node.id,
    description: node.description || null,
    category: 'color',
    values: {
      fill: {
        value: convertPaintToRgba(node.paints[0]),
        type: 'color' as propertyType
      }
    }
  }))

}

export default extractColors