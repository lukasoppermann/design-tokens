import extractorInterface from "../../types/extractorInterface"
import { radiusPropertyInterface } from '../../types/propertyObject'
import { customTokenNodes } from '../../types/tokenNodeTypes'

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
          unit: 'pixels'
        },
        topRight: {
          value: node.topRightRadius || 0,
          unit: 'pixels'
        },
        bottomRight: {
          value: node.bottomRightRadius || 0,
          unit: 'pixels'
        },
        bottomLeft: {
          value: node.bottomLeftRadius || 0,
          unit: 'pixels'
        }
      }
    }
    return {
      topLeft: {
        value: node.cornerRadius,
        unit: 'pixels'
      },
      topRight: {
        value: node.cornerRadius,
        unit: 'pixels'
      },
      bottomRight: {
        value: node.cornerRadius,
        unit: 'pixels'
      },
      bottomLeft: {
        value: node.cornerRadius,
        unit: 'pixels'
      }
    }
  }
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName ).map(node => ({
    name: node.name,
    // @ts-ignore
    description: node.description || null,
    values: {
      radius: {
        value: (typeof node.cornerRadius === 'number' ? node.cornerRadius : 'mixed'),
        unit: 'pixels'
      },
      radiusType: {
        value: getRadiusType(node.cornerRadius)
      },
      radii: getRadii(node),
      smoothing: {
        value: node.cornerSmoothing,
        comment: "Percent of as decimal from 0.0 - 1.0"
      }
    }
  }))  

}

export default extractRadii