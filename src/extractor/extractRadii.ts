import extractorInterface from "../../types/extractorInterface"
import { propertyType, radiusPropertyInterface } from '../../types/propertyObject'
import { customTokenNodes } from '../../types/tokenNodeTypes'
import { UnitTypePixel } from '../../types/valueTypes'
import roundWithDecimals from '../utilities/roundWithDecimals'

const extractRadii: extractorInterface = (tokenNodes: customTokenNodes[]): radiusPropertyInterface[] => {
  const nodeName = 'radii'
  // get the type of the corner radius
  const getRadiusType = radius => {
    if (typeof radius === 'number') {
      return 'single'
    }
    return 'mixed'
  }
  // get the individual radii
  const getRadii = (node) => {
    if (typeof node.cornerRadius !== 'number') {
      return {
        topLeft: {
          value: node.topLeftRadius || 0,
          unit: 'pixel' as UnitTypePixel,
          type: 'number' as propertyType
        },
        topRight: {
          value: node.topRightRadius || 0,
          unit: 'pixel' as UnitTypePixel,
          type: 'number' as propertyType
        },
        bottomRight: {
          value: node.bottomRightRadius || 0,
          unit: 'pixel' as UnitTypePixel,
          type: 'number' as propertyType
        },
        bottomLeft: {
          value: node.bottomLeftRadius || 0,
          unit: 'pixel' as UnitTypePixel,
          type: 'number' as propertyType
        }
      }
    }
    return {
      topLeft: {
        value: node.cornerRadius,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as propertyType
      },
      topRight: {
        value: node.cornerRadius,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as propertyType
      },
      bottomRight: {
        value: node.cornerRadius,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as propertyType
      },
      bottomLeft: {
        value: node.cornerRadius,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as propertyType
      }
    }
  }
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName ).map(node => ({
    name: node.name,
    // @ts-ignore
    description: node.description || null,
    values: {
      ...(typeof node.cornerRadius === "number" && {
        radius: {
          value: node.cornerRadius,
          unit: 'pixel' as UnitTypePixel,
          type: 'number' as propertyType
        }
      }),
      radiusType: {
        value: getRadiusType(node.cornerRadius),
        type: 'string' as propertyType
      },
      radii: getRadii(node),
      smoothing: {
        value: roundWithDecimals(node.cornerSmoothing),
        comment: "Percent as decimal from 0.0 - 1.0",
        type: 'number' as propertyType
      }
    }
  }))  

}

export default extractRadii