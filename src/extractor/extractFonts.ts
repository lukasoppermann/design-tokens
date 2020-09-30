import extractorInterface from '../../types/extractorInterface'
import { fontPropertyInterface } from '../../types/propertyObject'
import { UnitTypePixel, TextCase, TextDecoration, NumericUnitTypes, PropertyType } from '../../types/valueTypes'
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
        type: 'number' as PropertyType
      },
      textDecoration: {
        value: textDecorations[node.textDecoration] as TextDecoration,
        type: 'string' as PropertyType
      },
      fontFamily: {
        value: node.fontName.family,
        type: 'string' as PropertyType
      },
      fontStyle: {
        value: node.fontName.style,
        type: 'string' as PropertyType
      },
      letterSpacing: {
        value: roundWithDecimals(node.letterSpacing.value),
        unit: <NumericUnitTypes>node.letterSpacing.unit.toLowerCase(),
        type: 'number' as PropertyType
      },
      lineHeight: {
        // @ts-ignore
        value: roundWithDecimals(node.lineHeight.value) || 'normal',
        unit: node.lineHeight.unit.toLowerCase(),
        type: (node.lineHeight.hasOwnProperty('value') ? 'number' : 'string') as PropertyType
      },
      paragraphIndent: {
        value: node.paragraphIndent,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as PropertyType
      },
      paragraphSpacing: {
        value: node.paragraphSpacing,
        unit: 'pixel' as UnitTypePixel,
        type: 'number' as PropertyType
      },
      textCase: {
        value: textCases[node.textCase] as TextCase,
        type: 'string' as PropertyType
      }
    }
  }))

}

export default extractFonts