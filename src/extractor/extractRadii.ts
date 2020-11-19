import extractorInterface from '../../types/extractorInterface'
import { radiusPropertyInterface } from '../../types/propertyObject'
import { customTokenNode } from '../../types/tokenNodeTypes'
import { UnitTypePixel, PropertyType } from '../../types/valueTypes'
import roundWithDecimals from '../utilities/roundWithDecimals'

const extractRadii: extractorInterface = (tokenNodes: customTokenNode[]): radiusPropertyInterface[] => {
  const nodeName = 'radii'
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
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName).map(node => ({
    name: node.name,
    // @ts-ignore
    description: node.description || null,
    category: 'radius',
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
