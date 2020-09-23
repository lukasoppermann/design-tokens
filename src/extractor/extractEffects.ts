import extractorInterface from '../../types/extractorInterface'
import { effectPropertyInterface } from '../../types/propertyObject'

const effectType = {
  "LAYER_BLUR": 'layerBlur',
  "BACKGROUND_BLUR": 'backgroundBlur',
  "DROP_SHADOW": 'dropShadow',
  "INNER_SHADOW": 'innerShadow'
}

const blurValues = (effect) => ({
  type: {
    value: effectType[effect.type]
  },
  radius: {
    value: effect.radius,
    unit: 'pixels'
  }
})

const shadowValues = (effect) => ({
  type: {
    value: effectType[effect.type]
  },
  radius: {
    value: effect.radius,
    unit: 'pixels'
  },
  color: {
    value: effect.color
  },
  offset: {
    x: {
      value: effect.offset.x,
      unit: 'pixels'
    },
    y: {
      value: effect.offset.y,
      unit: 'pixels'
    }
  },
  spread: {
    value: effect.spread,
    unit: 'pixels'
  }
})

const extractEffects: extractorInterface = (tokenNodes: EffectStyle[]): effectPropertyInterface[] => {
  // get effect styles
  return tokenNodes.map(node => ({
    name: node.name,
    description: node.description || null,
    values: node.effects.map(
      (effect: Effect) => 
        effect.type === "LAYER_BLUR" || effect.type === "BACKGROUND_BLUR"
          ? blurValues(effect) 
          : shadowValues(effect))
  }))
}

export default extractEffects