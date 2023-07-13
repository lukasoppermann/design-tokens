import { internalTokenInterface, tokenCategoryTypes } from '@typings/propertyObject'
import { OriginalFormatTokenInterface } from '@typings/originalFormatProperties'
import { convertRgbaObjectToString } from '../utilities/convertColor'
import { PropertyType, UnitTypePixel } from '@typings/valueTypes'
import config from '@config/config'

const sizeValueTransformer = ({ width }) => ({
  value: width.value,
  type: width.type,
  ...(width.unit !== undefined && { unit: width.unit })
})

const convertValue = (value, type) => {
  if (value !== undefined && value !== null) {
    if (type === 'color') {
      return convertRgbaObjectToString(value)
    }
    return value
  }
}

const originalFormat = (property) => {
  return {
    value: convertValue(property.value, property.type),
    type: property.type,
    // optional properties
    ...(property.description !== undefined && { comment: property.description }),
    ...(property.unit !== undefined && { unit: property.unit })
  }
}

const defaultValueTransformer = propertyGroupValues => {
  // turn array with only one item into normal object
  if (Array.isArray(propertyGroupValues) && propertyGroupValues.length === 1) {
    propertyGroupValues = propertyGroupValues[0]
  }
  // define object
  const transformedProperties = {}
  // transform properties
  Object.keys(propertyGroupValues).forEach(function (key) {
    // if this is the final level
    if (Object.prototype.hasOwnProperty.call(propertyGroupValues[key], 'value')) {
      transformedProperties[key] = originalFormat(propertyGroupValues[key])
    }
    // if there is more nesting
    else {
      transformedProperties[key] = defaultValueTransformer(propertyGroupValues[key])
    }
  })
  // if only one property is in object (e.g. only fill for color)
  // return the value of this property directly (e.g. color-blue: #0000AA instead of color-blue-fill: #0000AA)
  if (Object.keys(transformedProperties).length === 1) {
    return Object.values(transformedProperties)[0]
  }
  // return transformed properties
  return transformedProperties
}

const borderValueTransformer = (extractedValues) => {
  return Object.fromEntries(Object.entries(extractedValues).map(([key, value]) => {
    if (key === 'dashPattern') {
      const val = originalFormat(value)
      val.value = val.value.join(', ')
      return [key, val]
    }
    return [key, originalFormat(value)]
  }))
}

const effectShadowValueTransformer = effect => ({
  type: {
    value: effect.effectType.value,
    type: 'string' as PropertyType
  },
  radius: {
    value: effect.radius.value,
    type: 'number' as PropertyType,
    unit: 'pixel' as UnitTypePixel
  },
  color: {
    value: convertRgbaObjectToString(effect.color.value),
    type: 'color' as PropertyType
  },
  offset: {
    x: {
      value: effect.offset.x.value,
      type: 'number' as PropertyType,
      unit: 'pixel' as UnitTypePixel
    },
    y: {
      value: effect.offset.y.value,
      type: 'number' as PropertyType,
      unit: 'pixel' as UnitTypePixel
    }
  },
  spread: {
    value: effect.spread.value,
    type: 'number' as PropertyType,
    unit: 'pixel' as UnitTypePixel
  }
})
const effectBlurValueTransformer = effect => ({
  type: {
    value: effect.effectType.value,
    type: 'string' as PropertyType
  },
  radius: {
    value: effect.radius.value,
    type: 'number' as PropertyType,
    unit: 'pixel' as UnitTypePixel
  }
})

const effectValueTransformer = (extractedValues) => {
  const values = extractedValues.map(effect => ['dropShadow', 'innerShadow'].includes(effect.effectType.value) ? effectShadowValueTransformer(effect) : effectBlurValueTransformer(effect))
  // turn array with only one item into normal object
  if (Array.isArray(values) && values.length === 1) {
    return values[0]
  }

  return values
}

const motionValueTransformer = (values) => {
  return {
    type: {
      value: values.transitionType.value,
      type: 'string' as PropertyType
    },
    duration: {
      value: values.duration.value,
      type: 'number' as PropertyType,
      unit: 's'
    },
    ...(values.direction
      ? {
          direction: {
            value: values.direction.value,
            type: 'string' as PropertyType
          }
        }
      : {}
    ),
    easing: {
      value: values.easingType.value.replace('cubicBezier', 'cubic-bezier'),
      type: 'string' as PropertyType
    },
    easingFunction: values.easingFunction
  }
}

const opacityValueTransformer = ({ opacity }) => ({
  value: opacity.value,
  type: opacity.type
})

const valueTransformer: {} | undefined = {
  size: sizeValueTransformer,
  color: defaultValueTransformer,
  gradient: defaultValueTransformer,
  font: defaultValueTransformer,
  effect: effectValueTransformer,
  grid: defaultValueTransformer,
  border: borderValueTransformer,
  breakpoint: sizeValueTransformer,
  radius: defaultValueTransformer,
  spacing: defaultValueTransformer,
  motion: motionValueTransformer,
  opacity: opacityValueTransformer
}

const transformer = (token: internalTokenInterface, _settings): OriginalFormatTokenInterface => {
  return {
    name: token.name,
    category: token.category,
    exportKey: token.extensions[config.key.extensionPluginData].exportKey,
    ...(token.description && token.description.length > 0 && { comment: token.description }),
    ...(valueTransformer[token.category as tokenCategoryTypes](token.values) || {})
  }
}

export { transformer }
