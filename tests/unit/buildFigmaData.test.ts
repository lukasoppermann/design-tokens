import { defaultSettings } from '@config/defaultSettings'
import buildFigmaData from '@utils/buildFigmaData'
import getTokenNodes from '@utils/getTokenNodes'
jest.mock('@utils/getTokenNodes', () => jest.fn())

const defaultOutput = {
  effectStyles: [{
    name: 'EffectStyle',
    id: undefined,
    description: undefined,
    effects: undefined
  }],
  textStyles: [{
    name: 'TextStyle',
    id: undefined,
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
    name: 'GridStyle',
    id: undefined,
    description: undefined,
    layoutGrids: undefined
  }],
  paintStyles: [{
    name: 'PaintStyle',
    id: undefined,
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
    getLocalPaintStylesAsync: jest.fn(),
    getLocalGridStylesAsync: jest.fn(),
    getLocalTextStylesAsync: jest.fn(),
    getLocalEffectStylesAsync: jest.fn()
  }

  // @ts-ignore
  global.figma.getLocalPaintStylesAsync.mockReturnValue([{
    name: 'PaintStyle'
  },
  {
    name: '_HiddenPaintStyle'
  }])
  // @ts-ignore
  global.figma.getLocalGridStylesAsync.mockReturnValue([{
    name: 'GridStyle'
  },
  {
    name: '_HiddenGridStyle'
  }])
  // @ts-ignore
  global.figma.getLocalTextStylesAsync.mockReturnValue([{
    name: 'TextStyle'
  },
  {
    name: '_HiddenTextStyle'
  }])
  // @ts-ignore
  global.figma.getLocalEffectStylesAsync.mockReturnValue([{
    name: 'EffectStyle'
  },
  {
    name: '_HiddenEffectStyle'
  }])
  // @ts-ignore
  getTokenNodes.mockImplementation(() => ['token'])
})

describe('Testing buildFigmaData', () => {
  test('without options', async () => {
    // assert
    // @ts-ignore
    expect(await buildFigmaData(global.figma, defaultSettings)).toStrictEqual(defaultOutput)
  })
})
