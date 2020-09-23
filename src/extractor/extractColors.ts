import extractorInterface from '../../types/extractorInterface'
import convertPaint from '../utilities/convertPaint'

const extractColors: extractorInterface = (tokenNodes: PaintStyle[]) => {
  // get all paint styles
  return tokenNodes.map(node => ({
    name: node.name,
    description: node.description || null,
    values: convertPaint(node.paints[0])
  }))

}

export default extractColors