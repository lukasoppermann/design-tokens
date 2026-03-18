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
  const initialChildren = [{
    findChildren: jest.fn()
  }]
  const loadedChildren = [{
    findChildren: jest.fn()
  }]
  const figmaMock = {
    root: {
      children: initialChildren
    },
    loadAllPagesAsync: jest.fn().mockImplementation(async () => {
      figmaMock.root.children = loadedChildren
      return loadedChildren
    }),
    getLocalPaintStylesAsync: jest.fn(),
    getLocalGridStylesAsync: jest.fn(),
    getLocalTextStylesAsync: jest.fn(),
    getLocalEffectStylesAsync: jest.fn()
  }
  // @ts-ignore
  global.figma = figmaMock

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
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('without options', async () => {
    // assert
    // @ts-ignore
    expect(await buildFigmaData(global.figma, defaultSettings)).toStrictEqual(defaultOutput)
  })

  test('loads all pages before reading token frames', async () => {
    // @ts-ignore
    await buildFigmaData(global.figma, defaultSettings)

    // @ts-ignore
    expect(global.figma.loadAllPagesAsync).toHaveBeenCalled()
    // @ts-ignore
    expect(getTokenNodes).toHaveBeenCalledWith(global.figma.root.children)
  })
})
