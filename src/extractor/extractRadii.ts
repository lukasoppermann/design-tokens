import groupByName from '../utilities/groupByName'

const extractRadii = tokenNodes => {
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
  const relevantTokenNodes = tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName ).map(node => ({
    name: node.name,
    description: node.description || null,
    radius: node.cornerRadius,
    radiusType: getRadiusType(node.cornerRadius),
    radii: getRadii(node),
    smoothing: node.cornerSmoothing
  }))  
  // return as object
  return groupByName(relevantTokenNodes)

}

export default extractRadii