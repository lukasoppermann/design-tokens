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
    transformedProperties[key] = amazonFormat(propertyGroupValues[key])
  })
  return transformedProperties
}

const sizeTransformer = propertyGroupValues => {
  return amazonFormat(propertyGroupValues['width'])
}

const colorTransformer = propertyGroupValues => {
  return amazonFormat(propertyGroupValues['fill'])
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
  grid: arrayTransformer,
  effect: arrayTransformer
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