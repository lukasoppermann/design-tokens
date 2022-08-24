import { customTokenNode } from '@typings/tokenNodeTypes'
import extractTokenNodeValues from './extractTokenNodeValues'
import isTokenNode from './isTokenNode'

// the name that token frames have
const tokenFrameName = '_tokens'

// check if a frame is a _token frame
const isTokenFrame = (node): boolean => node.type === 'FRAME' && node.name.trim().toLowerCase().substr(0, tokenFrameName.length) === tokenFrameName

// return only nodes that are frames
const getFrameNodes = (nodes): FrameNode[] => [...nodes.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr])]
/**
 * getVariantName
 * creates the variant name of the parent and child name
 */
const getVariantName = (parentName: string, childName: string): string => {
  // split into array
  childName = childName.split(',')
    // remove hidden names
    .filter(part => !['_', '.'].includes(part.trim().substr(0, 1)))
    // cleanup names, only return value part
    .map(part => part.split('=')[1])
    // combine
    .join('/')

  // return full name
  return `${parentName}/${childName}`
}
/**
 * Returns all frames from the file that have a name that starts with _tokens or the user defined token specifier
 *
 * @param pages PageNodes
 */
const getTokenNodes = (pages: PageNode[]): customTokenNode[] => {
  // get token frames
  const tokenFrames = getFrameNodes(pages)
  // get all children of token frames
  return tokenFrames.map(frame => <ComponentSetNode[] | ComponentNode[] | RectangleNode[] | FrameNode[]>frame
    // check if children are of valid types
    .findAll(
      /* istanbul ignore next */
      node => isTokenNode(node)
    ))
    // merges all children into one array
    .reduce((flatten, arr) => [...flatten, ...arr], [])
    // unpack variants & warn about deprecated types
    .map((item): customTokenNode[] => {
      if (item.type === 'RECTANGLE' || item.type === 'FRAME') {
        console.warn('Please use only main components and variants, other types may be deprecated as tokens in the future')
      }
      // unpack variants
      if (item.type === 'COMPONENT_SET') {
        // TODO: Name is overwriting real object in figma
        // -> create clone and move to new array to return
        return item.children.map((child: ComponentNode) => ({
          ...extractTokenNodeValues(child),
          ...{ name: getVariantName(item.name, child.name) }
        }))
      }
      // return normal item as array to unpack later
      // @ts-ignore
      return [extractTokenNodeValues(item)]
    })
    // merges the variant children into one array
    .reduce((flatten, arr) => [...flatten, ...arr], [])
}

export default getTokenNodes
export const __testing = {
  isTokenNode: isTokenNode,
  isTokenFrame: isTokenFrame
}
