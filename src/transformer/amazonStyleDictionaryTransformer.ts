import { propertyObject, convertedPropertyObject } from "../../types/propertyObject"
import convertSizeUnits from "../utilities/convertSizeUnits"

const convertPropertyValue = valueObject => {
  if (typeof valueObject === 'object' && typeof valueObject.value === 'number') {
    return convertSizeUnits(valueObject)
  }
  return valueObject
}

const amazonStyleDictionaryTransformer = (property: propertyObject): convertedPropertyObject => {
  // transform to amazon style Dictionary structure
  Object.keys(property.values).map(function(key) {
    // define value
    property.values[key] = {
      ...(property.description != null && {description: property.description}),
      ...{ value: convertPropertyValue(property.values[key]) }
    }
  })
  // delete the description property
  if (property.description !== undefined) {
    delete property.description
  }
  // return values
  return {
    ...{ name: property.name },
    ...property.values
  }
}

export default amazonStyleDictionaryTransformer