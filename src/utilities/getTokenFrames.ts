// the node types that can be used for tokens
const tokenNodeTypes = [
  'COMPONENT',
  'RECTANGLE'
]
// the name that token frames have
const tokenFrameName = '_tokens'

// check if a frame is a _token frame
const isTokenFrame = (node): boolean => node.type === "FRAME" && node.name.trim().toLowerCase().substr(0,tokenFrameName.length) === tokenFrameName

// return only nodes that are frames
const getFrameNodes = (nodes): FrameNode[] => nodes.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr])

/**
 * check if a node is a valid token node type
 * Currently: 'COMPONENT' or 'RECTANGLE'
 * @param SceneNode node 
 */
const isTokenNode = (node: SceneNode): boolean => tokenNodeTypes.includes(node.type)
/**
 * Returns all frames from the file that have a name that starts with _tokens or the user defined token specifier
 * 
 * @param pages PageNodes
 */
const getTokenFrames = (pages: PageNode[]): SceneNode[] => {
  // get token frames
  const tokenFrames = getFrameNodes(pages)
  // get all children of token frames
  return tokenFrames.map(frame => frame
    // check if children are of valide types
    .findChildren(node => isTokenNode(node)))
    // merges all children into one array
    .reduce((flatten, arr) => [...flatten, ...arr], [])

}

export default getTokenFrames