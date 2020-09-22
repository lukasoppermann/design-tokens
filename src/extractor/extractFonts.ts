import extractorInterface from '../../types/extractorInterface'
import { fontPropertyInterface, textDecorationType, letterSpacingUnitType, lineHeightUnitType, textCaseType } from '../../types/propertyObject'

const textDecorations = {
  'NONE': 'none',
  'UNDERLINE': 'underline',
  'STRIKETHROUGH': 'line-through'
}

const extractFonts: extractorInterface = (tokenNodes: TextStyle[]): fontPropertyInterface[] => {
  // get raw text styles
  return tokenNodes.map(node => ({
    name: node.name,
    description: node.description || null,
    values: {
      fontSize: {
        value: node.fontSize, 
        unit: 'pixels'
      },
      textDecoration: {
        value: textDecorations[node.textDecoration] as textDecorationType
      },
      fontFamily: {
        value: node.fontName.family
      },
      fontStyle: {
        value: node.fontName.style
      },
      letterSpacing: {
        value: node.letterSpacing.value,
        unit: node.letterSpacing.unit.toLowerCase() as letterSpacingUnitType
      },
      lineHeight: {
        // @ts-ignore
        value: node.lineHeight.value || 'normal',
        unit: node.lineHeight.unit.toLowerCase() as lineHeightUnitType
      },
      paragraphIndent: {
        value: node.paragraphIndent,
        unit: 'pixels'
      },
      paragraphSpacing: {
        value: node.paragraphSpacing,
        unit: 'pixels'
      },
      textCase: {
        value: node.textCase.toLowerCase() as textCaseType
      }
    }
  }))

}

export default extractFonts