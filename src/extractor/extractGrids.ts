import extractorInterface from '../../types/extractorInterface'

const extractGrids: extractorInterface = (tokenNodes: GridStyle[]) => {
  // get grid styles
  return tokenNodes.map(node => ({
    name: node.name,
    description: node.description || null,
    values: {
      grids: node.layoutGrids
    }
  }))
}

export default extractGrids