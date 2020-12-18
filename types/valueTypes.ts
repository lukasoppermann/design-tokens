export type ColorRgba = {
  r: number,
  g: number,
  b: number,
  a: number
}

export type GradientType = "linear" | "radial" | "angular" | "diamond"

export type UnitTypeDegree = "degree"
export type UnitTypePixel = "pixel"
export type UnitTypePercent = "percent"
export type UnitTypeSeconds = "ms"
export type NumericUnitTypes = UnitTypeDegree | UnitTypePixel | UnitTypePercent

export type TextCase = "none" | "uppercase" | "lowercase" | "capitalize"
export type TextDecoration = "none" | "underline" | "line-through"

export type StrokeAlign = "center" | "inside" | "outside"
export type StrokeCap = "none" | "round" | "square" | "arrow_lines" | "arrow_equilateral" | "mixed"
export type StrokeJoin = "miter" | "bevel" | "round"

export type GridPattern = 'rows' | 'columns' | 'grid'
export type GridAlignment = 'stretch' | 'center' | 'min' | 'max'

export type EffectType = 'dropShadow' | 'innerShadow' | 'layerBlur' | 'backgroundBlur'

export type PropertyType = "number" | "color" | "string"