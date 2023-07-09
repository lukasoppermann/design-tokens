import { transformer } from '../../src/transformer/standardTransformer'
import { extractedFigmaTokens } from './data/extractedFigmaTokens.data'
import { transformedStandardTokens } from './data/transformedStandardTokens.data'

describe('standard Transfomer', () => {
  const settingsMock = {
    excludeExtensionProp: false,
  }
  test('size token', () => expect(transformer(extractedFigmaTokens.size, settingsMock)).toStrictEqual(transformedStandardTokens.size))
  test('breakpoint token', () => expect(transformer(extractedFigmaTokens.breakpoint, settingsMock)).toStrictEqual(transformedStandardTokens.breakpoint))
  test('spacing token', () => expect(transformer(extractedFigmaTokens.spacing, settingsMock)).toStrictEqual(transformedStandardTokens.spacing))
  test('radius mixed token', () => expect(transformer(extractedFigmaTokens.radiusMixed, settingsMock)).toStrictEqual(transformedStandardTokens.radiusMixed))
  test('radius single token', () => expect(transformer(extractedFigmaTokens.radiusSingle, settingsMock)).toStrictEqual(transformedStandardTokens.radiusSingle))
  test('grid token', () => expect(transformer(extractedFigmaTokens.grid, settingsMock)).toStrictEqual(transformedStandardTokens.grid))
  test('multi grid token', () => expect(transformer(extractedFigmaTokens.multiGrid, settingsMock)).toStrictEqual(transformedStandardTokens.multiGrid))
  test('font token', () => expect(transformer(extractedFigmaTokens.font, settingsMock)).toStrictEqual(transformedStandardTokens.font))
  test('typography token', () => expect(transformer(extractedFigmaTokens.typography, settingsMock)).toStrictEqual(transformedStandardTokens.typography))
  test('font with lineheight percent', () => expect(transformer(extractedFigmaTokens.fontLhPercent, settingsMock)).toStrictEqual(transformedStandardTokens.fontLhPercent))
  test('color token', () => expect(transformer(extractedFigmaTokens.color, settingsMock)).toStrictEqual(transformedStandardTokens.color))
  test('alias color token', () => expect(transformer(extractedFigmaTokens.aliasColor, settingsMock)).toStrictEqual(transformedStandardTokens.aliasColor))
  test('multi color token', () => expect(transformer(extractedFigmaTokens.multiColor, settingsMock)).toStrictEqual(transformedStandardTokens.multiColor))
  test('gradient token', () => expect(transformer(extractedFigmaTokens.gradient, settingsMock)).toStrictEqual(transformedStandardTokens.gradient))
  test('color and gradient token', () => expect(transformer(extractedFigmaTokens.colorAndGradient, settingsMock)).toStrictEqual(transformedStandardTokens.colorAndGradient))
  test('gradient and color', () => expect(transformer(extractedFigmaTokens.gradientAndColor, settingsMock)).toStrictEqual(transformedStandardTokens.gradientAndColor))
  test('border token', () => expect(transformer(extractedFigmaTokens.border, settingsMock)).toStrictEqual(transformedStandardTokens.border))
  test('effect token', () => expect(transformer(extractedFigmaTokens.effect, settingsMock)).toStrictEqual(transformedStandardTokens.effect))
  test('blur effect token', () => expect(transformer(extractedFigmaTokens.blurEffect, settingsMock)).toStrictEqual(transformedStandardTokens.blurEffect))
  test('multi effect token', () => expect(transformer(extractedFigmaTokens.multiEffect, settingsMock)).toStrictEqual(transformedStandardTokens.multiEffect))
  test('motion token', () => expect(transformer(extractedFigmaTokens.motion, settingsMock)).toStrictEqual(transformedStandardTokens.motion))
  test('motion token', () => expect(transformer(extractedFigmaTokens.springMotion, settingsMock)).toStrictEqual(transformedStandardTokens.springMotion))
  test('opacity token', () => expect(transformer(extractedFigmaTokens.opacity, settingsMock)).toStrictEqual(transformedStandardTokens.opacity))
})
