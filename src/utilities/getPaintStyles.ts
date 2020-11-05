import { PaintStyleObject } from '../../types/styles'

/**
 * @function getPaintStyles
 * @param {Array} paintStyles – the paintStyles from the figma file (somehow still connected)
 */
const getPaintStyles = (styles: PaintStyle[]): PaintStyleObject[] => {
  // init styleArray
  const styleArray = []
  // loop through Figma styles and add to array
  styles.forEach(style => {
    styleArray.push({
      name: style.name,
      description: style.description,
      paints: style.paints
    })
  })
  // return array
  return styleArray
}

export default getPaintStyles
