import extractorInterface from '../../types/extractorInterface'
import { fontPropertyInterface, propertyType } from '../../types/propertyObject'
import { UnitTypePixel, TextCase, TextDecoration, NumericUnitTypes } from '../../types/valueTypes'
import getTokenStyles from '../utilities/getTokenStyles'
import roundWithDecimals from '../utilities/roundWithDecimals'

const textDecorations = {
  'NONE': 'none',
  'UNDERLINE': 'underline',
  'STRIKETHROUGH': 'line-through'
}

const textCases = {
  "ORIGINAL": "none",
  "UPPER": "uppercase",
  "LOWER": "lowercase",
  "TITLE": "capitalize"
}

const extractFonts: extractorInterface = (tokenNodes: TextStyle[]): fontPropertyInterface[] => {
  // get raw text styles
  return getTokenStyles(tokenNodes).map(node => ({
    name: node.name,
    description: node.description || undefined,
    values: {
      fontSize: {
        value: node.fontSize, 
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as propertyType
      },
      textDecoration: {
        value: textDecorations[node.textDecoration] as TextDecoration,
        type: 'string' as propertyType
      },
      fontFamily: {
        value: node.fontName.family,
        type: 'string' as propertyType
      },
      fontStyle: {
        value: node.fontName.style,
        type: 'string' as propertyType
      },
      letterSpacing: {
        value: roundWithDecimals(node.letterSpacing.value),
        unit: <NumericUnitTypes>node.letterSpacing.unit.toLowerCase(),
        type: 'number' as propertyType
      },
      lineHeight: {
        // @ts-ignore
        value: roundWithDecimals(node.lineHeight.value) || 'normal',
        unit: node.lineHeight.unit.toLowerCase(),
        type: (node.lineHeight.hasOwnProperty('value') ? 'number' : 'string') as propertyType
      },
      paragraphIndent: {
        value: node.paragraphIndent,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as propertyType
      },
      paragraphSpacing: {
        value: node.paragraphSpacing,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as propertyType
      },
      textCase: {
        value: textCases[node.textCase] as TextCase,
        type: 'string' as propertyType
      }
    }
  }))

}

export default extractFonts