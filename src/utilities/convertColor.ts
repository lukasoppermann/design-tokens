import { ColorRgba } from '../../types/valueTypes'
import roundWithDecimals from './roundWithDecimals'

export const roundRgba = (rgba: {
    r: number,
    g: number,
    b: number,
    a?: number,
  }, opacity?: number): ColorRgba => ({
  r: roundWithDecimals(rgba.r),
  g: roundWithDecimals(rgba.g),
  b: roundWithDecimals(rgba.b),
  a: roundWithDecimals(opacity || rgba.a || 1)
})

export const convertPaintToRgba = (paint): ColorRgba => {
  if (paint.type === 'SOLID' && paint.visible === true) {
    return roundRgba(paint.color, paint.opacity || null)
  }
  return null
}

export const convertRgbaObjectToString = (rgbaObject: ColorRgba): string => `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`