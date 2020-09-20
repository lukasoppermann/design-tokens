const getBorders = tokenNodes => {
  const nodeName = 'borders'
  // return as object
  const relevantTokenNodes = tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName ).map(node => ({
    name: node.name,
    description: node.description || null,
    strokeAlign: node.strokeAlign.toLowerCase,
    strokeCap: node.strokeCap.toLowerCase,
    strokeJoin: node.strokeJoin.toLowerCase,
    strokeMiterLimit: node.strokeMiterLimit,
    strokeStyleId: node.strokeStyleId,
    strokeWeight: node.strokeWeight,
    strokes: node.strokes
  }))
  // return as object
  return {
    [nodeName]: relevantTokenNodes
  }
}

export default getBorders