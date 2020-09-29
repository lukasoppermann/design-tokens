import extractorInterface from '../../types/extractorInterface'
import { colorPropertyInterface, fillValuesType, gradientTypeType, gradientValuesType, propertyType } from '../../types/propertyObject'
import { convertPaintToRgba, roundRgba } from '../utilities/convertColor'
import getTokenStyles from '../utilities/getTokenStyles'

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

const extractFill = (paint): fillValuesType | gradientValuesType => {
  if (paint.type === "SOLID") {
    return {
      fill: {
        value: convertPaintToRgba(paint),
        type: 'color' as propertyType
      }
    }
  }
  if (["GRADIENT_LINEAR", "GRADIENT_RADIAL", "GRADIENT_ANGULAR", "GRADIENT_DIAMOND"].includes(paint.type)) {
    return {
      gradientType: {
        value: gradientType[paint.type] as gradientTypeType,
        type: "string" as propertyType
      },
      stops: paint.gradientStops.map(stop => ({
        position: {
          value: stop.position,
          type: "number" as propertyType
        },
        color: {
          value: roundRgba(stop.color),
          type: "color" as propertyType
        }
      })),
      opacity: {
        value: paint.opacity,
        type: "number" as propertyType
      }
    }
  }

  return null
} 

const extractColors: extractorInterface = (tokenNodes: PaintStyle[]): colorPropertyInterface[] => {
  // get all paint styles
  return getTokenStyles(tokenNodes)
  // filter style
  // remove with no fill
  .filter(node => node.paints.length > 0)
  // remove image fills
  .filter(node => node.paints[0].type !== "IMAGE")
  // transform style
  .map(node => ({
    name: node.name,
    // id: node.id,
    description: node.description || null,
    category: paintCategory(node.paints[0]),
    values: extractFill(node.paints[0])
  }))

}

export default extractColors