import { customTokenNode } from '@typings/tokenNodeTypes'
import { ColorRgba } from '@typings/valueTypes'
import { convertPaintToRgba } from './convertColor'
/**
 * Return an array of solid stroke colors
 */
const getSolidStrokes = (paints: readonly Paint[]): ColorRgba[] => {
  // clone without reference
  return [...paints]
    .map(paint => convertPaintToRgba(paint))
}
/**
 * extractTokenNodeValues
 * @param node: SceneNode
 * @returns node object
 */
const extractTokenNodeValues = (node: ComponentNode | RectangleNode | FrameNode): customTokenNode => ({
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
  reactions: node.reactions || undefined,
  // @ts-ignore
  paddingTop: node.paddingTop || 0,
  // @ts-ignore
  paddingRight: node.paddingRight || 0,
  // @ts-ignore
  paddingBottom: node.paddingBottom || 0,
  // @ts-ignore
  paddingLeft: node.paddingLeft || 0
})

export default extractTokenNodeValues
