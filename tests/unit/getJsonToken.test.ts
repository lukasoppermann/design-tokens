import getTokenJson from '../../src/utilities/getTokenJson'
import extractFonts from '../../src/extractor/extractFonts'
import extractEffects from '../../src/extractor/extractEffects'
import extractGrids from '../../src/extractor/extractGrids'
import extractColors from '../../src/extractor/extractColors'
import extractSizes from '../../src/extractor/extractSizes'
import extractBorders from '../../src/extractor/extractBorders'
import extractRadii from '../../src/extractor/extractRadii'
import styleDictionaryTransformer from '../../src/transformer/styleDictionaryTransformer'
jest.mock('../../src/extractor/extractFonts', () => jest.fn())
jest.mock('../../src/extractor/extractEffects', () => jest.fn())
jest.mock('../../src/extractor/extractGrids', () => jest.fn())
jest.mock('../../src/extractor/extractColors', () => jest.fn())
jest.mock('../../src/extractor/extractSizes', () => jest.fn())
jest.mock('../../src/extractor/extractBorders', () => jest.fn())
jest.mock('../../src/extractor/extractRadii', () => jest.fn())
jest.mock('../../src/transformer/styleDictionaryTransformer', () => jest.fn())

describe("getJsonToken", () => {
  test("empty input", () => {
    // @ts-ignore
    extractFonts.mockImplementation(() => [])
    // @ts-ignore
    extractEffects.mockImplementation(() => [])
    // @ts-ignore
    extractGrids.mockImplementation(() => [])
    // @ts-ignore
    extractColors.mockImplementation(() => [])
    // @ts-ignore
    extractSizes.mockImplementation(() => [])
    // @ts-ignore
    extractBorders.mockImplementation(() => [])
    // @ts-ignore
    extractRadii.mockImplementation(() => [])
    // @ts-ignore
    expect(getTokenJson({})).toStrictEqual([])
  })

  test("with input", () => {
    // @ts-ignore
    styleDictionaryTransformer.mockImplementation((input) => input)
    // @ts-ignore
    extractFonts.mockImplementation(() => [
      {
        name: 'fonts/basic',
        values: 'this would be values'
      }
    ])
    // @ts-ignore
    extractEffects.mockImplementation(() => [
      {
        name: 'effect/basic',
        values: 'this would be values'
      }
    ])
    // @ts-ignore
    extractGrids.mockImplementation(() => [
      {
        name: 'grid/basic',
        values: 'this would be values'
      }
    ])
    // @ts-ignore
    extractColors.mockImplementation(() => [
      {
        name: 'color/basic',
        values: 'this would be values'
      }
    ])
    // @ts-ignore
    extractBorders.mockImplementation(() => [
      {
        name: 'borders/basic',
        values: 'this would be values'
      }
    ])
    // @ts-ignore
    extractSizes.mockImplementation(() => [
      {
        name: 'sizes/basic',
        values: 'this would be values'
      }
    ])
    // @ts-ignore
    extractRadii.mockImplementation(() => [
      {
        name: 'radii/basic',
        values: 'this would be values'
      }
    ])

    const output = { 
      "color": { "basic": { "values": "this would be values" } },
      "effect": { "basic": { "values": "this would be values" } },
      "fonts": { "basic": { "values": "this would be values" } },
      "grid": { "basic": { "values": "this would be values" } },
      "sizes": { "basic": { "values": "this would be values" } },
      "borders": { "basic": { "values": "this would be values" } },
      "radii": { "basic": { "values": "this would be values" } }
    }
    // @ts-ignore
    expect(getTokenJson({})).toStrictEqual(output)
  })
})