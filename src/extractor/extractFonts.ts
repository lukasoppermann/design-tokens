import extractorInterface from '@typings/extractorInterface'
import { fontPropertyInterface } from '@typings/propertyObject'
import { UnitTypePixel, FontStyle, TextCase, TextDecoration, NumericUnitTypes, PropertyType, FontStretch } from '@typings/valueTypes'
import { tokenTypes } from '@config/tokenTypes'
import roundWithDecimals from '../utilities/roundWithDecimals'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import config from '@config/config'

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
  100: 100,
  thin: 100,
  200: 200,
  extralight: 200,
  ultralight: 200,
  extraleicht: 200,
  300: 300,
  light: 300,
  leicht: 300,
  400: 400,
  normal: 400,
  regular: 400,
  buch: 400,
  500: 500,
  medium: 500,
  kraeftig: 500,
  kräftig: 500,
  600: 600,
  semibold: 600,
  demibold: 600,
  halbfett: 600,
  700: 700,
  bold: 700,
  dreiviertelfett: 700,
  800: 800,
  extrabold: 800,
  ultabold: 800,
  fett: 800,
  900: 900,
  black: 900,
  heavy: 900,
  super: 900,
  extrafett: 900
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
  kursiv: 'italic',
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

const lineHeightToRatio = (node): number => {
  if (node.lineHeight.unit === 'pixel') {
    return roundWithDecimals(node.fontSize.value / node.lineHeight.value, 3)
  }
  if (node.lineHeight.unit === 'percent') {
    return roundWithDecimals(node.lineHeight.value / 100, 3)
  }
  return 1.2
}

const parseLetterSpacingToPixel = (node): number => {
  if (node.letterSpacing.unit === 'PIXELS') {
    return roundWithDecimals(node.letterSpacing.value)
  }
  //
  return roundWithDecimals(node.fontSize * (node.letterSpacing.value / 100), 3)
}

const extractFonts: extractorInterface = (tokenNodes: TextStyle[], prefixArray: string[]): fontPropertyInterface[] => {
  // get raw text styles
  return tokenNodes.map(node => ({
    name: `${prefixArray[0]}/${node.name}`,
    category: 'font' as tokenCategoryType,
    exportKey: tokenTypes.font.key as tokenExportKeyType,
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
        value: parseLetterSpacingToPixel(node),
        unit: 'pixels' as UnitTypePixel,
        type: 'number' as PropertyType
      },
      lineHeightRatio: {
        // @ts-ignore
        value: lineHeightToRatio(node),
        type: 'number' as PropertyType
      },
      lineHeight: {
        // @ts-ignore
        value: roundWithDecimals(node.lineHeight.value) || 'normal',
        unit: node.lineHeight.unit.toLowerCase() === 'pixels' ? 'pixel' : node.lineHeight.unit.toLowerCase(),
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
    },
    extensions: {
      [config.key.extensionPluginData]: {
        [config.key.extensionFigmaStyleId]: node.id,
        exportKey: tokenTypes.font.key as tokenExportKeyType
      }
    }
  }))
}

export default extractFonts
