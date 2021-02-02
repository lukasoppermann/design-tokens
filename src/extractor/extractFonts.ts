import extractorInterface from '../../types/extractorInterface'
import { fontPropertyInterface } from '../../types/propertyObject'
import { UnitTypePixel, FontStyle, TextCase, TextDecoration, NumericUnitTypes, PropertyType, FontStretch } from '../../types/valueTypes'
import roundWithDecimals from '../utilities/roundWithDecimals'

const textDecorations = {
  NONE: 'none',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'line-through'
}

const textCases = {
  ORIGINAL: 'none',
  UPPER: 'uppercase',
  LOWER: 'lowercase',
  TITLE: 'capitalize'
}

const fontWeights = {
  thin: 100,
  extralight: 200,
  ultralight: 200,
  light: 300,
  normal: 400,
  regular: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  extrabold: 800,
  ultabold: 800,
  black: 900,
  heavy: 900,
  super: 900
}

const fontStretch = {
  normal: 'normal',
  condensed: 'condensed',
  expanded: 'expanded',
  extended: 'expanded'
}

const fontStyles = {
  normal: 'normal',
  italic: 'italic',
  oblique: 'oblique'
}

const parseFontWeight = (fontStyle: string): number => {
  const parts = fontStyle.toLowerCase().split(' ')
  let weight = parts[0]
  // merge if space after extra
  if (['extra', 'ultra', 'semi', 'demi'].includes(parts[0]) && ['bold', 'light'].includes(parts[1])) {
    weight = `${parts[0]}${parts[1]}`
  }
  return fontWeights[weight] || 400
}

const parseFontStretch = (fontStyle: string): FontStretch => {
  const parts = fontStyle.toLowerCase().split(' ')
  return fontStretch[parts[parts.length - 1]] || fontStretch[parts[parts.length - 2]] || 'normal' as FontStretch
}

const parseFontStyle = (fontStyle: string): FontStyle => {
  const part = fontStyle.toLowerCase().split(' ').pop()
  return fontStyles[part] || 'normal' as FontStyle
}

const extractFonts: extractorInterface = (tokenNodes: TextStyle[]): fontPropertyInterface[] => {
  // get raw text styles
  return tokenNodes.map(node => ({
    name: node.name,
    description: node.description || undefined,
    category: 'font',
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
      fontWeight: {
        value: parseFontWeight(node.fontName.style),
        type: 'number' as PropertyType
      },
      fontStyle: {
        value: parseFontStyle(node.fontName.style),
        type: 'string' as PropertyType
      },
      fontStretch: {
        value: parseFontStretch(node.fontName.style),
        type: 'string' as PropertyType
      },
      _fontStyleOld: {
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
        type: (Object.prototype.hasOwnProperty.call(node.lineHeight, 'value') ? 'number' : 'string') as PropertyType
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
