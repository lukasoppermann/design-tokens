import extractorInterface from '@typings/extractorInterface'
import { radiusPropertyInterface } from '@typings/propertyObject'
import { customTokenNode } from '@typings/tokenNodeTypes'
import { UnitTypePixel, PropertyType } from '@typings/valueTypes'
import { tokenTypes } from '@config/tokenTypes'
import roundWithDecimals from '../utilities/roundWithDecimals'
import { filterByPrefix } from './extractUtilities'

const extractRadii: extractorInterface = (tokenNodes: customTokenNode[], prefixArray: string[]): radiusPropertyInterface[] => {
  // get the type of the corner radius
  const getRadiusType = radius => {
    if (typeof radius === 'number') {
      return 'single'
    }
    return 'mixed'
  }
  // get the individual radii
  const getRadii = (node) => ({
    topLeft: {
      value: node.topLeftRadius || 0,
      unit: 'pixel' as UnitTypePixel,
      type: 'number' as PropertyType
    },
    topRight: {
      value: node.topRightRadius || 0,
      unit: 'pixel' as UnitTypePixel,
      type: 'number' as PropertyType
    },
    bottomRight: {
      value: node.bottomRightRadius || 0,
      unit: 'pixel' as UnitTypePixel,
      type: 'number' as PropertyType
    },
    bottomLeft: {
      value: node.bottomLeftRadius || 0,
      unit: 'pixel' as UnitTypePixel,
      type: 'number' as PropertyType
    }
  })
  // return as object
  return tokenNodes.filter(filterByPrefix(prefixArray))
    .map(node => ({
      name: node.name,
      category: 'radius',
      exportKey: tokenTypes.radius.key,
      description: node.description || null,
      values: {
        ...(typeof node.cornerRadius === 'number' && {
          radius: {
            value: node.cornerRadius,
            unit: 'pixel' as UnitTypePixel,
            type: 'number' as PropertyType
          }
        }),
        radiusType: {
          value: getRadiusType(node.cornerRadius),
          type: 'string' as PropertyType
        },
        radii: getRadii(node),
        smoothing: {
          value: roundWithDecimals(node.cornerSmoothing, 2),
          comment: 'Percent as decimal from 0.0 - 1.0',
          type: 'number' as PropertyType
        }
      }
    }))
}

export default extractRadii
