import { transformer } from '../../src/transformer/originalFormatTransformer'
import { extractedFigmaTokens } from './data/extractedFigmaTokens.data'
import { transformedOriginalTokens } from './data/transformedOriginalFormatTokens.data'

describe('originalFormatTransfomer', () => {
  test('size token', () => expect(transformer(extractedFigmaTokens.size)).toStrictEqual(transformedOriginalTokens.size))
  test('breakpoint token', () => expect(transformer(extractedFigmaTokens.breakpoint)).toStrictEqual(transformedOriginalTokens.breakpoint))
  test('spacing token', () => expect(transformer(extractedFigmaTokens.spacing)).toStrictEqual(transformedOriginalTokens.spacing))
  test('radius mixed token', () => expect(transformer(extractedFigmaTokens.radiusMixed)).toStrictEqual(transformedOriginalTokens.radiusMixed))
  test('radius single token', () => expect(transformer(extractedFigmaTokens.radiusSingle)).toStrictEqual(transformedOriginalTokens.radiusSingle))
  test('grid token', () => expect(transformer(extractedFigmaTokens.grid)).toStrictEqual(transformedOriginalTokens.grid))
  test('font token', () => expect(transformer(extractedFigmaTokens.font)).toStrictEqual(transformedOriginalTokens.font))
  test('border token', () => expect(transformer(extractedFigmaTokens.border)).toStrictEqual(transformedOriginalTokens.border))
  test('color token', () => expect(transformer(extractedFigmaTokens.color)).toStrictEqual(transformedOriginalTokens.color))
  test('effect token', () => expect(transformer(extractedFigmaTokens.effect)).toStrictEqual(transformedOriginalTokens.effect))
  test('motion token', () => expect(transformer(extractedFigmaTokens.motion)).toStrictEqual(transformedOriginalTokens.motion))
})
