import { propertyObject } from "../../types/propertyObject"
import { StyleDictionaryPropertyGroup, StyleDictionaryPropertyObject } from "../../types/styleDictionaryProperties"
import { convertRgbaObjectToString } from '../utilities/convertColor'

const defaultTransformer = propertyGroupValues => {
  const transformedProperties = {}
  Object.keys(propertyGroupValues).forEach(function (key) {
    if (propertyGroupValues[key].hasOwnProperty('value')) {
      transformedProperties[key] = styleDictionaryFormat(propertyGroupValues[key])
    }
    else {
      transformedProperties[key] = defaultTransformer(propertyGroupValues[key])
    }
  })
  return transformedProperties
}

const sizeTransformer = propertyGroupValues => {
  return styleDictionaryFormat(propertyGroupValues['width'])
}

const colorTransformer = propertyGroupValues => {
  return styleDictionaryFormat(propertyGroupValues['fill'])
}

const arrayTransformer = propertyGroupValueGroups => {
  if (propertyGroupValueGroups.length === 1) {
    return defaultTransformer(propertyGroupValueGroups[0])
  }
  return propertyGroupValueGroups.map(propertyGroupValues => defaultTransformer(propertyGroupValues))
}


const categoryTransformer = {
  default: defaultTransformer,
  size: sizeTransformer,
  color: colorTransformer,
  gradient: defaultTransformer,
  grid: arrayTransformer,
  effect: arrayTransformer,
  radius: defaultTransformer
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
  ...(property.description != undefined && { comment: property.description }),
  ...(property.unit != undefined && { unit: property.unit }),
})

const styleDictionaryTransformer = (propertyGroup: propertyObject): StyleDictionaryPropertyGroup => {
  // transform to amazon style Dictionary structure
  const transformedProperties = categoryTransformer[propertyGroup.category || 'default'](propertyGroup.values)
  // return values
  return {
    name: propertyGroup.name,
    category: propertyGroup.category,
    ...(propertyGroup.description != undefined && { comment: propertyGroup.description }),
    ...transformedProperties
  }
}

export default styleDictionaryTransformer