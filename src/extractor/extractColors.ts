import extractorInterface from '../../types/extractorInterface'

const extractColors: extractorInterface = (tokenNodes: PaintStyle[]) => {
  // get all paint styles
  return tokenNodes.map(node => ({
    name: node.name,
    description: node.description || null,
    values: {
      paints: node.paints
    }
  }))

}

export default extractColors