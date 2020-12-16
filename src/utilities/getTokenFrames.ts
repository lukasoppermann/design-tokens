import { customTokenNode } from '../../types/tokenNodeTypes'
import { ColorRgba } from '../../types/valueTypes'
import { convertPaintToRgba } from './convertColor'

// the node types that can be used for tokens
const tokenNodeTypes = [
  'COMPONENT',
  'RECTANGLE',
  'FRAME'
]
// the name that token frames have
const tokenFrameName = '_tokens'

// check if a frame is a _token frame
const isTokenFrame = (node): boolean => node.type === 'FRAME' && node.name.trim().toLowerCase().substr(0, tokenFrameName.length) === tokenFrameName

// return only nodes that are frames
const getFrameNodes = (nodes): FrameNode[] => nodes.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr])

/**
 * Return an array of solid stroke colors
 */
const getSolidStrokes = (paints: readonly Paint[]): ColorRgba[] => {
  // clone without reference
  return [...paints]
    .map(paint => convertPaintToRgba(paint))
}

/**
 * check if a node is a valid token node type
 * Currently: 'COMPONENT' or 'RECTANGLE'
 * @param SceneNode node
 */
const isTokenNode = (node: SceneNode): boolean => {
  return tokenNodeTypes.includes(node.type)
}
/**
 * Returns all frames from the file that have a name that starts with _tokens or the user defined token specifier
 *
 * @param pages PageNodes
 */
const getTokenFrames = (pages: PageNode[]): customTokenNode[] => {
  // get token frames
  const tokenFrames = getFrameNodes(pages)

  // get all children of token frames
  return tokenFrames.map(frame => <RectangleNode[] | ComponentNode[] | FrameNode[]>frame
    // check if children are of valide types
    .findChildren(
      /* istanbul ignore next */
      node => isTokenNode(node)
    )
  )
    // merges all children into one array
    .reduce((flatten, arr) => [...flatten, ...arr], [])
    // export
    .map(node => {
      console.log(node)
      return node
    })
    .map(node => ({
      name: node.name,
      // @ts-ignore
      description: node.description || undefined,
      bottomLeftRadius: node.bottomLeftRadius,
      bottomRightRadius: node.bottomRightRadius,
      topLeftRadius: node.topLeftRadius,
      topRightRadius: node.topRightRadius,
      cornerRadius: node.cornerRadius || undefined,
      cornerSmoothing: node.cornerSmoothing,
      strokes: getSolidStrokes(node.strokes),
      strokeWeight: node.strokeWeight,
      strokeStyleId: node.strokeStyleId,
      strokeMiterLimit: node.strokeMiterLimit,
      strokeJoin: node.strokeJoin,
      strokeCap: node.strokeCap,
      dashPattern: node.dashPattern,
      strokeAlign: node.strokeAlign,
      width: node.width,
      height: node.height,
      reactions: node.reactions
    }))
}

export default getTokenFrames
export const __testing = {
  isTokenNode: isTokenNode,
  isTokenFrame: isTokenFrame
}
