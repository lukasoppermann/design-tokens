import extractorInterface from '../../types/extractorInterface'

const extractEffects: extractorInterface = (tokenNodes: EffectStyle[]) => {
  // get effect styles
  return tokenNodes.map(node => ({
    name: node.name,
    description: node.description || null,
    values: {
      effects: node.effects
    }
  }))
}

export default extractEffects