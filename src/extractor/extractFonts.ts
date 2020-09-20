import groupByName from '../utilities/groupByName'
import amazonTransformer from '../transformer/amazonStyleDirectory'

const getFonts = () => {
  // get raw text styles
  const textStyles = figma.getLocalTextStyles().map(item => (amazonTransformer({
    id: item.id,
    name: item.name,
    description: item.description || null,
    values: {
      fontSize: item.fontSize,
      textDecoration: item.textDecoration,
      fontName: item.fontName,
      letterSpacing: item.letterSpacing,
      lineHeight: item.lineHeight,
      paragraphIndent: item.paragraphIndent,
      paragraphSpacing: item.paragraphSpacing,
      textCase: item.textCase
    }
  })))
  // return as object
  return groupByName(textStyles)

}

export default getFonts