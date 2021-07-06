import extractorInterface from '@typings/extractorInterface'
import { borderPropertyInterface } from '@typings/propertyObject'
import { StrokeCap, StrokeAlign, PropertyType } from '@typings/valueTypes'
import { customTokenNode } from '@typings/tokenNodeTypes'
import roundWithDecimals from '../utilities/roundWithDecimals'
import { tokenTypes } from '@config/tokenTypes'
import { filterByPrefix } from './extractUtilities'

const strokeJoins = {
  MITER: 'miter',
  BEVEL: 'bevel',
  ROUND: 'round'
}

const strokeAligns = {
  CENTER: 'center',
  INSIDE: 'inside',
  OUTSIDE: 'outside'
}

const extractBorders: extractorInterface = (tokenNodes: customTokenNode[], prefixArray: string[]): borderPropertyInterface[] => {
  // return as object
  return tokenNodes.filter(filterByPrefix(prefixArray))
    // remove nodes with no border property
    .filter(node => node.strokes.length > 0)
    // convert borders
    .map(node => ({
      name: node.name,
      category: 'border',
      exportKey: tokenTypes.border.key,
      description: node.description || null,
      values: {
        strokeAlign: {
          value: strokeAligns[node.strokeAlign] as StrokeAlign,
          type: 'string' as PropertyType
        },
        dashPattern: {
          value: node.dashPattern.toString(),
          type: 'string' as PropertyType
        },
        strokeCap: {
          value: ((typeof node.strokeCap === 'string') ? node.strokeCap.toLowerCase() : 'mixed') as StrokeCap,
          type: 'string' as PropertyType
        },
        strokeJoin: {
          value: strokeJoins[node.strokeJoin],
          type: 'string' as PropertyType
        },
        strokeMiterLimit: {
          value: roundWithDecimals(node.strokeMiterLimit),
          unit: 'degree',
          type: 'number' as PropertyType
        },
        // strokeStyleId: {
        //   value: node.strokeStyleId
        // },
        strokeWeight: {
          value: node.strokeWeight,
          unit: 'pixel',
          type: 'number' as PropertyType
        },
        stroke: {
          value: node.strokes[0],
          type: 'color' as PropertyType
        }
      }
    }))
}

export default extractBorders
