import { colorRgbaType } from '../../types/propertyObject'

const convertPaintToRgba = (paint): colorRgbaType => {
  if (paint.type === 'SOLID' && paint.visible === true) {
    return {
      r: paint.color.r,
      g: paint.color.g,
      b: paint.color.b,
      a: paint.opacity
    }
  }
  return null
}

export default convertPaintToRgba