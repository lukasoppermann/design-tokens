import extractorInterface from '../../types/extractorInterface'
import { colorPropertyInterface, fillValuesType, gradientValuesType } from '../../types/propertyObject'
import { GradientType, PropertyType } from '../../types/valueTypes'
import { convertPaintToRgba, roundRgba } from '../utilities/convertColor'
import getTokenStyles from '../utilities/getTokenStyles'
import roundWithDecimals from '../utilities/roundWithDecimals'

const gradientType = {
  "GRADIENT_LINEAR": "linear",
  "GRADIENT_RADIAL": "radial",
  "GRADIENT_ANGULAR": "angular",
  "GRADIENT_DIAMOND": "diamond"
}

const paintCategory = (paint: Paint) => {
  if (paint.type === "SOLID") {
    return "color"
  }
  if (["GRADIENT_LINEAR", "GRADIENT_RADIAL", "GRADIENT_ANGULAR", "GRADIENT_DIAMOND"].includes(paint.type)) {
    return "gradient"
  }
}

// const extractFill = (paint): fillValuesType | gradientValuesType => {
//   if (paint.type === "SOLID") {
//     return {
//       fill: {
//         value: convertPaintToRgba(paint),
//         type: 'color' as PropertyType
//       }
//     }
//   }
//   if (["GRADIENT_LINEAR", "GRADIENT_RADIAL", "GRADIENT_ANGULAR", "GRADIENT_DIAMOND"].includes(paint.type)) {
//     return {
//       gradientType: {
//         value: gradientType[paint.type] as GradientType,
//         type: "string" as PropertyType
//       },
//       stops: paint.gradientStops.map(stop => ({
//         position: {
//           value: stop.position,
//           type: "number" as PropertyType
//         },
//         color: {
//           value: roundRgba(stop.color),
//           type: "color" as PropertyType
//         }
//       })),
//       opacity: {
//         value: paint.opacity,
//         type: "number" as PropertyType
//       }
//     }
//   }

//   return null
// } 

const extractFills = (paint): fillValuesType | gradientValuesType => {
  if (paint.type === "SOLID") {
    return {
      fill: {
        value: convertPaintToRgba(paint),
        type: 'color' as PropertyType
      }
    }
  }
  if (["GRADIENT_LINEAR", "GRADIENT_RADIAL", "GRADIENT_ANGULAR", "GRADIENT_DIAMOND"].includes(paint.type)) {
    return {
      gradientType: {
        value: gradientType[paint.type] as GradientType,
        type: "string" as PropertyType
      },
      stops: paint.gradientStops.map(stop => ({
        position: {
          value: roundWithDecimals(stop.position),
          type: "number" as PropertyType
        },
        color: {
          value: roundRgba(stop.color),
          type: "color" as PropertyType
        }
      })),
      opacity: {
        value: roundWithDecimals(paint.opacity),
        type: "number" as PropertyType
      }
    }
  }

  return null
} 

const extractColors: extractorInterface = (tokenNodes: PaintStyle[]): colorPropertyInterface[] => {
  // get all paint styles
  return getTokenStyles(tokenNodes)
  // remove images fills from tokens
  .map(node => {
    node.paints = node.paints.filter(paint => paint.type !== "IMAGE")
    return node
  })
  // remove tokens with no fill
  .filter(node => node.paints.length > 0)
  // transform style
  .map(node => ({
    name: node.name,
    // id: node.id,
    description: node.description || null,
    category: 'fill', //paintCategory(node.paints[0]),
    values: node.paints.map(paint => extractFills(paint)) // extractFill(node.paints[0])
  }))

}

export default extractColors