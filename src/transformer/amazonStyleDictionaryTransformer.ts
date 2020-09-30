import { propertyObject, propertyType } from "../../types/propertyObject"
import { convertRgbaObjectToString } from '../utilities/convertColor'

type amazonPropertyObject = {
  value: string | number,
  type: propertyType,
  unit?: string
  comment?: string,
}

type amazonPropertyGroup = {
  name: string,
  comment?: string,
} & {
  [key: string]: amazonPropertyObject | any
}

const defaultTransformer = propertyGroupValues => {
  const transformedProperties = {}
  Object.keys(propertyGroupValues).forEach(function (key) {
    if (propertyGroupValues[key].hasOwnProperty('value')) {
      transformedProperties[key] = amazonFormat(propertyGroupValues[key])
    }
    else {
      transformedProperties[key] = defaultTransformer(propertyGroupValues[key])
    }
  })
  return transformedProperties
}

const sizeTransformer = propertyGroupValues => {
  return amazonFormat(propertyGroupValues['width'])
}

const colorTransformer = propertyGroupValues => {
  return amazonFormat(propertyGroupValues['fill'])
}

const gradientTransformer = propertyGroupValues => {
  const transformedProperties = {
    gradientType: amazonFormat(propertyGroupValues.gradientType),
    opacity: amazonFormat(propertyGroupValues.opacity),
  }
  // prepare stops
  propertyGroupValues.stops.forEach((stop, index) => {
    transformedProperties[`stop-${index + 1}-position`] = amazonFormat(stop.position)
    transformedProperties[`stop-${index + 1}-color`] = amazonFormat(stop.color)
  })

  return transformedProperties
}

const radiusTransformer = propertyGroupValues => {
  const transformedProperties = {}
  // prepare radii
  Object.entries(propertyGroupValues.radii).forEach(entry => {
    const [key, value] = entry
    transformedProperties[`radius-${key}`] = amazonFormat(value)
  });
  delete propertyGroupValues.radii
  // transform rest of properties
  Object.keys(propertyGroupValues).forEach(function (key) {
    transformedProperties[key] = amazonFormat(propertyGroupValues[key])
  })

  return transformedProperties
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
  gradient: gradientTransformer,
  grid: arrayTransformer,
  effect: arrayTransformer,
  radius: radiusTransformer
}

const amazonConvertValue = (value, type: string) => {
  if (value === undefined || value === null) {
    return
  }
  if (type === 'color') {
    return convertRgbaObjectToString(value)
  }
  return value
}

const amazonFormat = (property): amazonPropertyObject => ({
  value: amazonConvertValue(property.value, property.type),
  type: property.type,
  // optional properties
  ...(property.description != undefined && { comment: property.description }),
  ...(property.unit != undefined && { unit: property.unit }),
})

const amazonStyleDictionaryTransformer = (propertyGroup: propertyObject): amazonPropertyGroup => {
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

export default amazonStyleDictionaryTransformer