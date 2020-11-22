import extractorInterface from '../../types/extractorInterface'
import { colorPropertyInterface, fillValuesType, gradientValuesType } from '../../types/propertyObject'
import { PaintStyleObject } from '../../types/styles'
import { GradientType, PropertyType } from '../../types/valueTypes'
import { convertPaintToRgba, roundRgba } from '../utilities/convertColor'
import roundWithDecimals from '../utilities/roundWithDecimals'

const gradientType = {
  GRADIENT_LINEAR: 'linear',
  GRADIENT_RADIAL: 'radial',
  GRADIENT_ANGULAR: 'angular',
  GRADIENT_DIAMOND: 'diamond'
}
const extractFills = (paint): fillValuesType | gradientValuesType => {
  if (paint.type === 'SOLID') {
    return {
      fill: {
        value: convertPaintToRgba(paint),
        type: 'color' as PropertyType
      }
    }
  }
  if (['GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR', 'GRADIENT_DIAMOND'].includes(paint.type)) {
    return {
      gradientType: {
        value: gradientType[paint.type] as GradientType,
        type: 'string' as PropertyType
      },
      stops: paint.gradientStops.map(stop => ({
        position: {
          value: roundWithDecimals(stop.position),
          type: 'number' as PropertyType
        },
        color: {
          value: roundRgba(stop.color),
          type: 'color' as PropertyType
        }
      })),
      opacity: {
        value: roundWithDecimals(paint.opacity),
        type: 'number' as PropertyType
      }
    }
  }
  // return null if no matching type
  /* istanbul ignore next */
  return null
}

const extractColors: extractorInterface = (tokenNodes: PaintStyleObject[]): colorPropertyInterface[] => {
  // get all paint styles
  return tokenNodes
  // remove images fills from tokens
    .map(node => {
      node.paints = node.paints.filter(paint => paint.type !== 'IMAGE')
      return node
    })
    // remove tokens with no fill
    .filter(node => node.paints.length > 0)
    // transform style
    .map(node => ({
      name: node.name,
      // id: node.id,
      description: node.description || null,
      category: 'fill',
      values: node.paints.map(paint => extractFills(paint))
    }))
}

export default extractColors
