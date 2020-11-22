import { propertyObject } from '../../types/propertyObject'
import { StyleDictionaryPropertyGroup, StyleDictionaryPropertyObject } from '../../types/styleDictionaryProperties'
import { convertRgbaObjectToString } from '../utilities/convertColor'

const defaultTransformer = propertyGroupValues => {
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
      transformedProperties[key] = defaultTransformer(propertyGroupValues[key])
    }
  })
  // if only one property is in object (e.g. only fill for color)
  // return teh value of this property directly (e.g. color-blue: #0000AA instead of color-blue-fill: #0000AA)
  if (Object.keys(transformedProperties).length === 1) {
    return Object.values(transformedProperties)[0]
  }
  // return transformed properties
  return transformedProperties
}

const sizeTransformer = propertyGroupValues => {
  return styleDictionaryFormat(propertyGroupValues.width)
}

const categoryTransformer = {
  default: defaultTransformer,
  font: defaultTransformer,
  border: defaultTransformer,
  size: sizeTransformer,
  grid: defaultTransformer,
  effect: defaultTransformer,
  radius: defaultTransformer,
  fill: defaultTransformer
}

const styleDictionaryConvertValue = (value, type: string) => {
  if (value === undefined || value === null) {
    return
  }
  if (type === 'color') {
    return convertRgbaObjectToString(value)
  }
  return value
}

const styleDictionaryFormat = (property): StyleDictionaryPropertyObject => ({
  value: styleDictionaryConvertValue(property.value, property.type),
  type: property.type,
  // optional properties
  ...(property.description !== undefined && { comment: property.description }),
  ...(property.unit !== undefined && { unit: property.unit })
})

const styleDictionaryTransformer = (propertyGroup: propertyObject): StyleDictionaryPropertyGroup => {
  // transform to amazon style Dictionary structure
  // THIS SHOULD BE FIXED TO CHECK IF categoryTransformer[propertyGroup.category] exsist ant otherwise use default!!!
  const transformedProperties = categoryTransformer[propertyGroup.category || 'default'](propertyGroup.values)
  // return values
  return {
    name: propertyGroup.name,
    category: propertyGroup.category,
    ...(propertyGroup.description !== undefined && { comment: propertyGroup.description }),
    ...transformedProperties
  }
}

export default styleDictionaryTransformer
