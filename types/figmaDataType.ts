import { EffectStyleObject, GridStyleObject, PaintStyleObject, TextStyleObject } from './styles'
import { customTokenNode } from './tokenNodeTypes'

export type figmaDataType = {
  tokenFrames: customTokenNode[],
  paintStyles: PaintStyleObject[],
  gridStyles: GridStyleObject[],
  textStyles: TextStyleObject[],
  effectStyles: EffectStyleObject[]
}
