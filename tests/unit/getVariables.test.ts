
import { getVariables } from '@utils/getVariables'
import { Settings, nameConversionType, tokenFormatType } from '@typings/settings'

import * as handleVariableAlias from '@utils/handleVariableAlias'

jest.mock('@utils/handleVariableAlias')

describe('getVariables', () => {
  const mockFigma = {
    variables: {
      getLocalVariableCollectionsAsync: jest.fn(),
      getLocalVariablesAsync: jest.fn(),
      getVariableByIdAsync: jest.fn(),
      alias: '',
      authType: '',
      reference: '',
      keyInName: false,
      keyInValue: false,
      keyInReference: false
    }
  } as unknown as PluginAPI

  const mockSettings: Settings = {
    filename: 'myBaseFile',
    extension: '.json',
    nameConversion: 'default' as nameConversionType,
    tokenFormat: 'standard' as tokenFormatType,
    compression: false,
    urlJsonCompression: true,
    serverUrl: 'https://test.com',
    eventType: 'baseEvent',
    accessToken: 'test',
    acceptHeader: 'baseHeader',
    contentType: 'text',
    authType: 'baseAuthType',
    reference: 'main',
    exclusionPrefix: '',
    excludeExtensionProp: false,
    alias: 'alias, ref, reference',
    keyInName: false,
    prefixInName: true,
    modeInTokenValue: true,
    modeInTokenName: true,
    resolveSameCollectionOrModeReference: false,
    prefix: {
      color: 'color',
      gradient: 'gradient',
      font: 'font',
      typography: 'typography',
      effect: 'effect',
      grid: 'grid',
      border: 'border',
      breakpoint: 'breakpoint',
      radius: 'radius, radii',
      size: 'size',
      spacing: 'spacing',
      motion: 'motion',
      opacity: 'opacity'
    },
    exports: {
      color: true,
      gradient: true,
      font: true,
      typography: true,
      effect: true,
      grid: true,
      border: true,
      breakpoint: true,
      radius: true,
      size: true,
      spacing: true,
      motion: true,
      opacity: true,
      variables: true
    }
  }

  beforeAll(() => {
    // @ts-ignore
    global.figma = mockFigma
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return an empty array if there are no local variable collections', async () => {
    const result = await getVariables(mockFigma, mockSettings)
    expect(result).toEqual([])
  })

  it('should filter out excluded collections and return variables', async () => {
    const mockCollections = [
      { id: '1', name: 'collection1', modes: [{ modeId: 'mode1', name: 'Mode 1' }] },
      { id: '2', name: '_excludedCollection', modes: [{ modeId: 'mode1', name: 'Mode 1' }] }
    ]

    const mockVariables = [
      { variableCollectionId: '1', name: 'variable1', valuesByMode: { mode1: 'value1' } },
      { variableCollectionId: '2', name: 'variable3', valuesByMode: { mode1: 'value3' } }
    ]

    mockFigma.variables.getLocalVariableCollectionsAsync = jest.fn().mockResolvedValue(mockCollections)
    mockFigma.variables.getLocalVariablesAsync = jest.fn().mockResolvedValue(mockVariables)

    const result = await getVariables(mockFigma, mockSettings)
    expect(result).toHaveLength(1)
    expect(result[0].name).toContain('collection1/variable1')
  })

  it('should handle variable alias references within the same collection', async () => {
    const mockCollections = [
      {
        id: '1',
        name: 'collection1',
        modes: [{ modeId: 'mode1', name: 'Mode 1' }],
        variableIds: ['1']
      }
    ]
    const mockVariables = [
      {
        variableCollectionId: '1',
        name: 'variable1',
        valuesByMode: { mode1: { type: 'VARIABLE_ALIAS', id: 'aliasId' } }
      }
    ]

    mockFigma.variables.getLocalVariableCollectionsAsync = jest.fn().mockResolvedValue(mockCollections)
    mockFigma.variables.getLocalVariablesAsync = jest.fn().mockResolvedValue(mockVariables)

    mockSettings.resolveSameCollectionOrModeReference = true

    const result = await getVariables(mockFigma, mockSettings)
    expect(result).toHaveLength(1)
    expect(result[0].name).toContain('collection1/variable1')
  })

  it('should process alias modes if modeInTokenValue is true', async () => {
    const mockCollections = [
      { id: '1', name: 'collection1', modes: [{ modeId: 'mode1', name: 'Mode 1' }] }
    ]
    const mockVariables = [
      {
        variableCollectionId: '1',
        name: 'variable1',
        valuesByMode: { mode1: 'value1' }
      }
    ];

    (mockFigma.variables.getLocalVariableCollectionsAsync as jest.Mock).mockResolvedValue(mockCollections)

    mockSettings.modeInTokenValue = true

    const result = await getVariables(mockFigma, mockSettings)
    expect(result).toHaveLength(1)
    expect(result[0].name).toContain('collection1/variable1')
  })
})