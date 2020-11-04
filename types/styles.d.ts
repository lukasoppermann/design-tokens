type StyleType = "PAINT" | "TEXT" | "EFFECT" | "GRID"

export type BaseStyle = {
  readonly id: string,
  readonly type: StyleType,
  name: string,
  description: string
}

export type PaintStyleObject = {
  name: string,
  description: string,
  paints: any[]
}