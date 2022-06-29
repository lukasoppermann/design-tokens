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

const transparentFill: fillValuesType = {
  fill: {
    value: { r: 0, g: 0, b: 0, a: 0 },
    type: 'color',
    blendMode: 'normal'
  }
}

const parseDescription = (description: string = '', aliasArray: string[]) => {
  aliasArray = !aliasArray || aliasArray.filter(i => i).length === 0 ? ['Ref:'] : aliasArray
  const regex = new RegExp('(' + aliasArray.join('|').toLowerCase() + ')' + ':?\\s')
  // split description in lines
  let alias: string
  const descriptionLines = description.split(/\r?\n/)
    // find match
    .filter(line => {
      if (line.toLowerCase().match(regex)) {
        alias = line.toLowerCase().replace(regex, '').trim()
        return false
      }
      return true
    })
  // return object
  return {
    alias: alias,
    description: descriptionLines.join('\n')
  }
}

const addAlias = (alias: string) => alias ? ({ [config.key.extensionAlias]: alias }) : ({})

const gradientType = {
  GRADIENT_LINEAR: 'linear',
  GRADIENT_RADIAL: 'radial',
  GRADIENT_ANGULAR: 'angular',
  GRADIENT_DIAMOND: 'diamond'
}

const isGradient = (paint): boolean => ['GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR', 'GRADIENT_DIAMOND'].includes(paint?.type)

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
        type: 'color' as PropertyType,
        blendMode: paint.blendMode?.toLowerCase() || 'normal'
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
    .reduce((previousValue, node) => {
      // ignore image-only fills
      const paintsAfterImageFilter = node.paints.filter(paint => paint.type !== 'IMAGE')
      if (node.paints.length && paintsAfterImageFilter.length === 0) {
        return previousValue
      }
      // remove images fills from tokens
      node.paints = paintsAfterImageFilter

      const { alias, description } = parseDescription(node.description, prefixArray.alias)
      const nodeIsGradient = isGradient(node.paints[0])
      const values = node.paints.length ? node.paints.map(paint => extractFills(paint)) : [transparentFill]

      return [
        ...previousValue,
        {
          name: `${nodeIsGradient ? prefixArray.gradient[0] : prefixArray.color[0]}/${node.name}`,
          category: nodeIsGradient ? 'gradient' : 'color' as tokenCategoryType,
          exportKey: (nodeIsGradient ? tokenTypes.gradient.key : tokenTypes.color.key) as tokenExportKeyType,
          description: description,
          values,
          extensions: {
            [config.key.extensionPluginData]: {
              [config.key.extensionFigmaStyleId]: node.id,
              exportKey: (nodeIsGradient ? tokenTypes.gradient.key : tokenTypes.color.key) as tokenExportKeyType,
              ...(addAlias(alias))
            }
          }
        }
      ]
    }, [])
}

export default extractColors
