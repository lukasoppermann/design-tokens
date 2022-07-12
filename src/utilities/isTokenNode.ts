// the node types that can be used for tokens
const tokenNodeTypes = [
  'COMPONENT',
  'COMPONENT_SET', // => variant
  'RECTANGLE',
  'FRAME'
]
/**
 * check if a node is a valid token node type
 * Currently: 'COMPONENT', 'FRAME or 'RECTANGLE'
 * @param SceneNode node
 */
const isTokenNode = (node: SceneNode): boolean => {
  return node.parent.type !== 'COMPONENT_SET' && tokenNodeTypes.includes(node.type) && node.name.length > 0
}

export default isTokenNode
