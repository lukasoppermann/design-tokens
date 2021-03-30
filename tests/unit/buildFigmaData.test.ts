import buildFigmaData from '../../src/utilities/buildFigmaData'
import getTokenNodes from '../../src/utilities/getTokenNodes'
jest.mock('../../src/utilities/getTokenNodes', () => jest.fn())

const defaultOutput = {
  effectStyles: [{
    name: "EffectStyle",
    description: undefined,
    effects: undefined
  }],
  textStyles: [{
    name: "TextStyle",
    description: undefined,
    fontName: undefined,
    fontSize: undefined,
    letterSpacing: undefined,
    lineHeight: undefined,
    paragraphIndent: undefined,
    paragraphSpacing: undefined,
    textCase: undefined,
    textDecoration: undefined
  }],
  gridStyles: [{
    name: "GridStyle",
    description: undefined,
    layoutGrids: undefined
  }],
  paintStyles: [{
    name: "PaintStyle",
    description: undefined,
    paints: undefined
  }],
  tokenFrames: [
    'token'
  ]
}

beforeAll(() => {
  // @ts-ignore
  global.figma = {
    root: {
      children: [{
        findChildren: jest.fn()
      }]
    },
    getLocalPaintStyles: jest.fn(),
    getLocalGridStyles: jest.fn(),
    getLocalTextStyles: jest.fn(),
    getLocalEffectStyles: jest.fn()
  }

  // @ts-ignore
  global.figma.getLocalPaintStyles.mockReturnValue([{
    name: 'PaintStyle'
  },
  {
    name: '_HiddenPaintStyle'
  }])
  // @ts-ignore
  global.figma.getLocalGridStyles.mockReturnValue([{
    name: 'GridStyle'
  },
  {
    name: '_HiddenGridStyle'
  }])
  // @ts-ignore
  global.figma.getLocalTextStyles.mockReturnValue([{
    name: 'TextStyle'
  },
  {
    name: '_HiddenTextStyle'
  }])
  // @ts-ignore
  global.figma.getLocalEffectStyles.mockReturnValue([{
    name: 'EffectStyle'
  },
  {
    name: '_HiddenEffectStyle'
  }])
  // @ts-ignore
  getTokenNodes.mockImplementation(() => ['token'])
})

describe("Testing buildFigmaData", () => {
  test("with options", () => {
    // options
    const options = {
      prefix: '_',
      excludePrefix: true
    }
    // assert
    // @ts-ignore
    expect(buildFigmaData(global.figma, options)).toStrictEqual(defaultOutput)
  })
  test("without options", () => {
    // assert
    // @ts-ignore
    expect(buildFigmaData(global.figma)).toStrictEqual(defaultOutput)
  })
})
