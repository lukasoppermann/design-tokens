import extractorInterface from '../../types/extractorInterface'
import { effectPropertyInterface, propertyType } from '../../types/propertyObject'
import { EffectType, UnitTypePixel } from '../../types/valueTypes'
import { roundRgba } from '../utilities/convertColor'
import getTokenStyles from '../utilities/getTokenStyles'

const effectType = {
  "LAYER_BLUR": 'layerBlur',
  "BACKGROUND_BLUR": 'backgroundBlur',
  "DROP_SHADOW": 'dropShadow',
  "INNER_SHADOW": 'innerShadow'
}

const blurValues = (effect) => ({
  type: {
    value: effectType[effect.type] as EffectType,
    type: 'string' as propertyType
  },
  radius: {
    value: effect.radius,
    unit: 'pixel' as UnitTypePixel,
    type: 'number' as propertyType
  }
})

const shadowValues = effect => ({
  type: {
    value: effectType[effect.type] as EffectType,
    type: 'string' as propertyType
  },
  radius: {
    value: effect.radius,
    unit: 'pixel' as UnitTypePixel,
    type: 'number' as propertyType
  },
  color: {
    value: roundRgba(effect.color),
    type: 'color' as propertyType
  },
  offset: {
    x: {
      value: effect.offset.x,
      unit: 'pixel' as UnitTypePixel,
      type: 'number' as propertyType
    },
    y: {
      value: effect.offset.y,
      unit: 'pixel' as UnitTypePixel,
      type: 'number' as propertyType
    }
  },
  spread: {
    value: effect.spread,
    unit: 'pixel' as UnitTypePixel,
    type: 'number' as propertyType
  }
})

const extractEffects: extractorInterface = (tokenNodes: EffectStyle[]): effectPropertyInterface[] => {
  // get effect styles
  return getTokenStyles(tokenNodes).map(node => ({
    name: node.name,
    description: node.description || null,
    category: 'effect',
    values: node.effects.map(
          (effect: Effect) => 
            effect.type === "LAYER_BLUR" || effect.type === "BACKGROUND_BLUR"
            ? blurValues(effect) 
            : shadowValues(effect)
          )
  }))
}

export default extractEffects