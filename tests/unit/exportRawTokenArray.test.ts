
import { exportRawTokenArray } from '../../src/utilities/getTokenJson'
import extractFonts from '../../src/extractor/extractFonts'
import extractEffects from '../../src/extractor/extractEffects'
import extractGrids from '../../src/extractor/extractGrids'
import extractColors from '../../src/extractor/extractColors'
import extractSizes from '../../src/extractor/extractSizes'
import extractSpacing from '../../src/extractor/extractSpacing'
import extractBorders from '../../src/extractor/extractBorders'
import extractRadii from '../../src/extractor/extractRadii'
import extractMotion from '../../src/extractor/extractMotion'
import extractBreakpoints from '../../src/extractor/extractBreakpoints'
import buildFigmaData from '../../src/utilities/buildFigmaData'
import { defaultSettings } from '../../src/config/defaultSettings'
jest.mock('../../src/extractor/extractFonts', () => jest.fn())
jest.mock('../../src/extractor/extractEffects', () => jest.fn())
jest.mock('../../src/extractor/extractGrids', () => jest.fn())
jest.mock('../../src/extractor/extractColors', () => jest.fn())
jest.mock('../../src/extractor/extractSizes', () => jest.fn())
jest.mock('../../src/extractor/extractSpacing', () => jest.fn())
jest.mock('../../src/extractor/extractBorders', () => jest.fn())
jest.mock('../../src/extractor/extractRadii', () => jest.fn())
jest.mock('../../src/extractor/extractMotion', () => jest.fn())
jest.mock('../../src/extractor/extractBreakpoints', () => jest.fn())
jest.mock('../../src/utilities/buildFigmaData', () => jest.fn())

describe('exportRawTokenArray', () => {
  test('empty input', () => {
    // @ts-ignore
    buildFigmaData.mockImplementation(() => [])
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
    extractSpacing.mockImplementation(() => [])
    // @ts-ignore
    extractBorders.mockImplementation(() => [])
    // @ts-ignore
    extractRadii.mockImplementation(() => [])
    // @ts-ignore
    extractMotion.mockImplementation(() => [])
    // @ts-ignore
    extractBreakpoints.mockImplementation(() => [])
    // @ts-ignore
    expect(exportRawTokenArray('', defaultSettings)).toStrictEqual([])
  })

  test('with input', () => {
    // @ts-ignore
    buildFigmaData.mockImplementation(() => [])
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
    extractSpacing.mockImplementation(() => [
      {
        name: 'spacing/basic',
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
    // @ts-ignore
    extractMotion.mockImplementation(() => [
      {
        name: 'motion/basic',
        values: 'this would be values'
      }
    ])

    const output = [
      {
        name: 'sizes/basic',
        values: 'this would be values'
      },
      {
        name: 'spacing/basic',
        values: 'this would be values'
      },
      {
        name: 'borders/basic',
        values: 'this would be values'
      },
      {
        name: 'radii/basic',
        values: 'this would be values'
      },
      {
        name: 'motion/basic',
        values: 'this would be values'
      },
      {
        name: 'color/basic',
        values: 'this would be values'
      },
      {
        name: 'grid/basic',
        values: 'this would be values'
      },
      {
        name: 'fonts/basic',
        values: 'this would be values'
      },
      {
        name: 'effect/basic',
        values: 'this would be values'
      }
    ]
    // @ts-ignore
    expect(exportRawTokenArray('', defaultSettings)).toStrictEqual(output)
  })
})
