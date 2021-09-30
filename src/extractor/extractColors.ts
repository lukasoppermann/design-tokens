import extractorInterface from '@typings/extractorInterface'
import { colorPropertyInterface, fillValuesType, gradientValuesType } from '@typings/propertyObject'
import { PaintStyleObject } from '@typings/styles'
import { GradientType, PropertyType } from '@typings/valueTypes'
import { tokenTypes } from '@config/tokenTypes'
import { convertPaintToRgba, roundRgba } from '../utilities/convertColor'
import roundWithDecimals from '../utilities/roundWithDecimals'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import config from '@config/config'

const getAlias = (description: string, aliasArray: string[]) => {
  const regex = new RegExp('(' + aliasArray.join('|').toLowerCase() + ')' + ':?\\s')
  // split description into lines
  const alias = description.split(/\r?\n/)
    .map(line => line.toLowerCase())
    // find match
    .filter(line => line.match(regex))[0]
  // return if alias
  if (alias && alias.length > 0) {
    return { [config.key.extensionAlias]: alias.replace(regex, '') }
  }
  return {}
}

const gradientType = {
  GRADIENT_LINEAR: 'linear',
  GRADIENT_RADIAL: 'radial',
  GRADIENT_ANGULAR: 'angular',
  GRADIENT_DIAMOND: 'diamond'
}

const isGradient = (paint): boolean => ['GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR', 'GRADIENT_DIAMOND'].includes(paint.type)

const rotationFromMatrix = ([[x1, y1], [x2, y2]]) => {
  // https://stackoverflow.com/questions/24909586/find-rotation-angle-for-affine-transform
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180.0 / Math.PI) + 315
  return angle > 360 ? angle - 360 : angle
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
      rotation: {
        // https://stackoverflow.com/questions/24909586/find-rotation-angle-for-affine-transform
        value: rotationFromMatrix(paint.gradientTransform),
        type: 'number' as PropertyType,
        unit: 'degree'
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

const extractColors: extractorInterface = (tokenNodes: PaintStyleObject[], prefixArray: {color: string[], gradient: string[], alias: string[]}): colorPropertyInterface[] => {
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
      name: `${isGradient(node.paints[0]) ? prefixArray.gradient[0] : prefixArray.color[0]}/${node.name}`,
      category: isGradient(node.paints[0]) ? 'gradient' : 'color' as tokenCategoryType,
      exportKey: (isGradient(node.paints[0]) ? tokenTypes.gradient.key : tokenTypes.color.key) as tokenExportKeyType,
      description: node.description || null,
      values: node.paints.map(paint => extractFills(paint)),
      extensions: {
        [config.key.extensionPluginData]: {
          [config.key.extensionFigmaStyleId]: node.id,
          exportKey: (isGradient(node.paints[0]) ? tokenTypes.gradient.key : tokenTypes.color.key) as tokenExportKeyType,
          ...(getAlias(node.description, prefixArray.alias))
        }
      }
    }))
}

export default extractColors
