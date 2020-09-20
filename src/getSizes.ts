const getSizes = tokenNodes => {
  const nodeName = 'sizes'
  // return as object
  const relevantTokenNodes = tokenNodes.filter(node => node.name.substr(0, nodeName.length) === nodeName ).map(node => ({
    name: node.name,
    description: node.description || null,
    width: node.width,
    height: node.height
  }))
  // return as object
  return {
    [nodeName]: relevantTokenNodes
  }
}

export default getSizes