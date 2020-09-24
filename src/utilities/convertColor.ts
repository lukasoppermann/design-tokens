import { colorRgbaType } from '../../types/propertyObject'
import roundWithDecimals from './roundWithDecimals'

export const roundRgba = (rgba: {
  r: number,
  g: number,
  b: number,
  a?: number,
  opacity?: number
}): colorRgbaType => ({
  r: roundWithDecimals(rgba.r),
  g: roundWithDecimals(rgba.g),
  b: roundWithDecimals(rgba.b),
  a: roundWithDecimals(rgba.opacity || rgba.a || 1)
})

export const convertPaintToRgba = (paint): colorRgbaType => {
  if (paint.type === 'SOLID' && paint.visible === true) {
    return roundRgba(paint.color)
  }
  return null
}