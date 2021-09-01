import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenInterface, StandardTokenTypes, StandardTokenValuesInterface } from '@typings/standardToken'
import { UnitTypePixel } from '@typings/valueTypes'
// import { convertRgbaObjectToString } from '../utilities/convertColor'

const widthToDimensionTransformer = ({ category, exportKey, values }): StandardTokenValuesInterface => ({
  value: values.width.value,
  type: 'dimension' as StandardTokenTypes,
  data: {
    exportKey: exportKey,
    category: category,
    unit: 'pixel' as UnitTypePixel
  }
})
//
const spacingValueTransformer = ({ category, exportKey, values }): {[key: string]: StandardTokenValuesInterface} => ({
  ...Object.fromEntries(
    Object.entries(values).map(
      ([name, { value }]: [string, {value: number}]) => {
        return [[name], {
          value: value,
          type: 'dimension' as StandardTokenTypes,
          data: {
            exportKey: exportKey,
            category: category,
            unit: 'pixel' as UnitTypePixel
          }
        }]
      }
    )
  )
})

const radiusValueTransformer = ({ category, exportKey, values }): {[key: string]: StandardTokenValuesInterface} => {
  const radiusValues = {}
  if (values.radiusType.value === 'mixed') {
    ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].forEach(corner => {
      radiusValues[`radius${corner[0].toUpperCase() + corner.substring(1)}`] = {
        value: values.radii[corner].value,
        type: 'dimension' as StandardTokenTypes,
        data: {
          exportKey: exportKey,
          category: category,
          unit: 'pixel' as UnitTypePixel
        }
      }
    })
  }
  else {
    // @ts-ignore
    radiusValues.radius = {
      value: values.radius.value,
      type: 'dimension' as StandardTokenTypes,
      data: {
        exportKey: exportKey,
        category: category,
        unit: 'pixel' as UnitTypePixel
      }
    }
  }
  // @ts-ignore
  radiusValues.smoothing = {
    value: values.smoothing.value,
    type: 'number' as StandardTokenTypes,
    data: {
      exportKey: exportKey,
      category: category
    }
  }
  // return values
  return radiusValues
}
// const convertValue = (value, type) => {
//   if (value !== undefined && value !== null) {
//     if (type === 'color') {
//       return convertRgbaObjectToString(value)
//     }
//     return value
//   }
// }

// const styleDictionaryFormat = (property) => ({
//   value: convertValue(property.value, property.type),
//   type: property.type,
//   // optional properties
//   ...(property.description !== undefined && { comment: property.description }),
//   ...(property.unit !== undefined && { unit: property.unit })
// })

// const defaultValueTransformer = propertyGroupValues => {
//   // turn array with only one item into normal object
//   if (Array.isArray(propertyGroupValues) && propertyGroupValues.length === 1) {
//     propertyGroupValues = propertyGroupValues[0]
//   }
//   // define object
//   const transformedProperties = {}
//   // transform proeprties
//   Object.keys(propertyGroupValues).forEach(function (key) {
//     // if this is the final level
//     if (Object.prototype.hasOwnProperty.call(propertyGroupValues[key], 'value')) {
//       transformedProperties[key] = styleDictionaryFormat(propertyGroupValues[key])
//     }
//     // if there is more nesting
//     else {
//       transformedProperties[key] = defaultValueTransformer(propertyGroupValues[key])
//     }
//   })
//   // if only one property is in object (e.g. only fill for color)
//   // return the value of this property directly (e.g. color-blue: #0000AA instead of color-blue-fill: #0000AA)
//   if (Object.keys(transformedProperties).length === 1) {
//     return Object.values(transformedProperties)[0]
//   }
//   // return transformed properties
//   return transformedProperties
// }

const valueTransformer = {
  size: widthToDimensionTransformer,
  // color: defaultValueTransformer,
  // gradient: defaultValueTransformer,
  // font: defaultValueTransformer,
  // effect: defaultValueTransformer,
  // grid: defaultValueTransformer,
  // border: defaultValueTransformer,
  breakpoint: widthToDimensionTransformer,
  radius: radiusValueTransformer,
  spacing: spacingValueTransformer
  // motion: defaultValueTransformer
}

const transformTokens = (token: internalTokenInterface): StandardTokenValuesInterface => valueTransformer[token.category](token)

const transformer = (token: internalTokenInterface): StandardTokenInterface => {
  return {
    [token.name]: {
      description: token.description,
      ...transformTokens(token)
    }
  }
}

export { transformer }
