import { propertyObject, convertedPropertyObject, propertyType } from "../../types/propertyObject"
import convertSizeUnits from "../utilities/convertSizeUnits"

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

const defaultTransformer = propertyGroup => {
  const transformedProperties = {}
  Object.keys(propertyGroup.values).forEach(function (key) {
    transformedProperties[key] = amazonFormat(propertyGroup.values[key])
  })
  return transformedProperties
}

const sizeTransformer = propertyGroup => {
  return amazonFormat(propertyGroup.values['width'])
}

const categoryTransformer = {
  default: defaultTransformer,
  size: sizeTransformer
}

const amazonConvertValue = (value, type: string) => value

const amazonFormat = (property): amazonPropertyObject => ({
  value: amazonConvertValue(property.value, property.type),
  type: property.type,
  // optional properties
  ...(property.description != undefined && { comment: property.description }),
  ...(property.unit != undefined && { unit: property.unit }),
})

const amazonStyleDictionaryTransformer = (propertyGroup: propertyObject): amazonPropertyGroup => {
  // transform to amazon style Dictionary structure
  const transformedProperties = categoryTransformer[propertyGroup.category || 'default'](propertyGroup)
  // return values
  return {
    name: propertyGroup.name,
    ...(propertyGroup.description != undefined && { comment: propertyGroup.description }),
    ...transformedProperties
  }
}

export default amazonStyleDictionaryTransformer