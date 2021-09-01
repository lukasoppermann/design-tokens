import { transformer } from '../../src/transformer/standardTransformer'
import { extractedFigmaTokens } from './data/extractedFigmaTokens.data'
import { transformedStandardTokens } from './data/transformedStandardTokens.data'

describe('standard Transfomer', () => {
  test('size token', () => expect(transformer(extractedFigmaTokens.size)).toStrictEqual(transformedStandardTokens.size))
  test('breakpoint token', () => expect(transformer(extractedFigmaTokens.breakpoint)).toStrictEqual(transformedStandardTokens.breakpoint))
  test('spacing token', () => expect(transformer(extractedFigmaTokens.spacing)).toStrictEqual(transformedStandardTokens.spacing))
  test('radius mixed token', () => expect(transformer(extractedFigmaTokens.radiusMixed)).toStrictEqual(transformedStandardTokens.radiusMixed))
  test('radius single token', () => expect(transformer(extractedFigmaTokens.radiusSingle)).toStrictEqual(transformedStandardTokens.radiusSingle))
  test('grid token', () => expect(transformer(extractedFigmaTokens.grid)).toStrictEqual(transformedStandardTokens.grid))
  test('font token', () => expect(transformer(extractedFigmaTokens.font)).toStrictEqual(transformedStandardTokens.font))
  test('color token', () => expect(transformer(extractedFigmaTokens.color)).toStrictEqual(transformedStandardTokens.color))
  test.skip('gradient token', () => expect(transformer(extractedFigmaTokens.color)).toStrictEqual(transformedStandardTokens.color))
  test('border token', () => expect(transformer(extractedFigmaTokens.border)).toStrictEqual(transformedStandardTokens.border))
  test('effect token', () => expect(transformer(extractedFigmaTokens.effect)).toStrictEqual(transformedStandardTokens.effect))
  test('motion token', () => expect(transformer(extractedFigmaTokens.motion)).toStrictEqual(transformedStandardTokens.motion))
})
