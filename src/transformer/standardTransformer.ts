import { internalTokenInterface, tokenCategoryTypes } from '@typings/propertyObject'
import { StandardTokenInterface } from '@typings/standardToken'
import { convertRgbaObjectToString } from '../utilities/convertColor'

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

const styleDictionaryFormat = (property) => ({
  value: convertValue(property.value, property.type),
  type: property.type,
  // optional properties
  ...(property.description !== undefined && { comment: property.description }),
  ...(property.unit !== undefined && { unit: property.unit })
})

const defaultValueTransformer = propertyGroupValues => {
  // turn array with only one item into normal object
  if (Array.isArray(propertyGroupValues) && propertyGroupValues.length === 1) {
    propertyGroupValues = propertyGroupValues[0]
  }
  // define object
  const transformedProperties = {}
  // transform proeprties
  Object.keys(propertyGroupValues).forEach(function (key) {
    // if this is the final level
    if (Object.prototype.hasOwnProperty.call(propertyGroupValues[key], 'value')) {
      transformedProperties[key] = styleDictionaryFormat(propertyGroupValues[key])
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

const valueTransformer: {} | undefined = {
  size: sizeValueTransformer,
  color: defaultValueTransformer,
  gradient: defaultValueTransformer,
  font: defaultValueTransformer,
  effect: defaultValueTransformer,
  grid: defaultValueTransformer,
  border: defaultValueTransformer,
  breakpoint: defaultValueTransformer,
  radius: defaultValueTransformer,
  spacing: defaultValueTransformer,
  motion: defaultValueTransformer
}

const transformer = (token: internalTokenInterface): StandardTokenInterface => {
  return {
    name: token.name,
    value: null,
    type: 'null',
    description: token.description,
    data: {
      category: token.category,
      exportKey: token.exportKey,
      unit: ''
    }
  //   ...(token.description && token.description.length > 0 && { comment: token.description }),
  //   ...(valueTransformer[token.category as tokenCategoryTypes](token.values) || {})
  }
}

export { transformer }
