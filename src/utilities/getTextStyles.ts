import { TextStyleObject } from '@typings/styles'

/**
 * @function getTextStyles
 * @param {Array<TextStyle>} styles – the paintStyles from the figma file (somehow still connected)
 */
const getTextStyles = (styles: TextStyle[]): TextStyleObject[] => {
  // init styleArray
  const styleArray = []
  // loop through Figma styles and add to array
  styles.forEach(style => {
    styleArray.push({
      name: style.name,
      id: style.id,
      description: style.description,
      fontSize: style.fontSize,
      textDecoration: style.textDecoration,
      fontName: style.fontName,
      letterSpacing: style.letterSpacing,
      lineHeight: style.lineHeight,
      paragraphIndent: style.paragraphIndent,
      paragraphSpacing: style.paragraphSpacing,
      textCase: style.textCase,
      boundVariables: style.boundVariables
    })
  })
  // return array
  return styleArray
}

export default getTextStyles
