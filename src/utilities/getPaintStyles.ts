import { PaintStyleObject } from '../../types/styles'

/**
 * @function getPaintStyles
 * @param {Array} paintStyles – the paintStyles from the figma file (somehow still connected)
 */
const getPaintStyles = (paintStyles: PaintStyle[]): PaintStyleObject[] => {
  const paintStyleArray = []
  paintStyles.forEach(style => {
    paintStyleArray.push({
      name: style.name,
      description: style.description,
      paints: style.paints
    })
  })
  // return array
  return paintStyleArray
}

export default getPaintStyles