export type BaseStyle = {
  readonly id: string,
  readonly type: StyleType,
  name: string,
  description: string
}

type GenericStyleObject = {
  name: string,
  description: string
}

export type PaintStyleObject = GenericStyleObject & {
  id: string,
  paints: any[]
}

type GridType = 'GRID' | 'ROWS' | 'COLUMNS'
type layoutGrid = {
  pattern: GridType,
  sectionSize?: number,
  gutterSize?: number,
  alignment?: string,
  count?: any,
  offset?: number
}

export type GridStyleObject = GenericStyleObject & {
  layoutGrids: layoutGrid[]
}

export type TextStyleObject = GenericStyleObject & {
  fontSize: number,
  textDecoration: TextDecoration,
  fontName: FontName,
  letterSpacing: LetterSpacing,
  lineHeight: LineHeight,
  paragraphIndent: number,
  paragraphSpacing: number,
  textCase: TextCase
}

export type EffectStyleObject = GenericStyleObject & {
  effects: Effect[]
}
