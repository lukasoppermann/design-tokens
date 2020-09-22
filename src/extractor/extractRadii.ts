import extractorInterface from "../../types/extractorInterface"
import { customTokenNodes } from '../../types/tokenNodeTypes'

const extractRadii: extractorInterface = (tokenNodes: customTokenNodes[]) => {
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
        topLeft: node.topLeftRadius || 0,
        topRight: node.topRightRadius || 0,
        bottomRight: node.bottomRightRadius || 0,
        bottomLeft: node.bottomLeftRadius || 0
      }
    }
    return {
      topLeft: node.cornerRadius,
      topRight: node.cornerRadius,
      bottomRight: node.cornerRadius,
      bottomLeft: node.cornerRadius
    }
  }
  // return as object
  return tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName ).map(node => ({
    name: node.name,
    // @ts-ignore
    description: node.description || null,
    values: {
      radius: node.cornerRadius,
      radiusType: getRadiusType(node.cornerRadius),
      radii: getRadii(node),
      smoothing: node.cornerSmoothing
    }
  }))  

}

export default extractRadii