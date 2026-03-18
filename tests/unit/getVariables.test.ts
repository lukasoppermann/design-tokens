
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
    ;(handleVariableAlias.default as jest.Mock).mockReset()
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

  it('should mark same-collection alias references with aliasSameMode before extraction', async () => {
    const mockCollections = [
      {
        id: '1',
        name: 'collection1',
        modes: [{ modeId: 'mode1', name: 'Mode 1' }],
        variableIds: ['aliasId']
      }
    ]
    const mockVariables = [
      {
        id: 'variable1-id',
        variableCollectionId: '1',
        name: 'variable1',
        valuesByMode: { mode1: { type: 'VARIABLE_ALIAS', id: 'aliasId' } }
      }
    ]

    mockFigma.variables.getLocalVariableCollectionsAsync = jest.fn().mockResolvedValue(mockCollections)
    mockFigma.variables.getLocalVariablesAsync = jest.fn().mockResolvedValue(mockVariables)
    mockFigma.variables.getVariableByIdAsync = jest.fn().mockResolvedValue({
      id: 'aliasId',
      variableCollectionId: '1',
      name: 'variable2'
    })
    ;(handleVariableAlias.default as jest.Mock).mockResolvedValue({
      exportKey: 'variables',
      category: 'string',
      values: '{collection1.alias}'
    })

    const result = await getVariables(mockFigma, {
      ...mockSettings,
      resolveSameCollectionOrModeReference: true
    })

    expect(result).toHaveLength(1)
    expect(handleVariableAlias.default).toHaveBeenCalledWith(
      expect.objectContaining({ aliasSameMode: true, name: 'variable1' }),
      { type: 'VARIABLE_ALIAS', id: 'aliasId' },
      { modeId: 'mode1', name: 'Mode 1' }
    )
  })

  it('should add the alias mode to same-collection references when experimental resolution is enabled', async () => {
    const mockCollections = [
      {
        id: '1',
        name: 'collection1',
        modes: [{ modeId: 'mode1', name: 'Mode1' }],
        variableIds: ['aliasId']
      }
    ]
    const mockVariables = [
      {
        id: 'variable1-id',
        variableCollectionId: '1',
        name: 'variable1',
        valuesByMode: { mode1: { type: 'VARIABLE_ALIAS', id: 'aliasId' } }
      }
    ]

    mockFigma.variables.getLocalVariableCollectionsAsync = jest.fn().mockResolvedValue(mockCollections)
    mockFigma.variables.getLocalVariablesAsync = jest.fn().mockResolvedValue(mockVariables)
    mockFigma.variables.getVariableByIdAsync = jest.fn().mockResolvedValue({
      id: 'aliasId',
      variableCollectionId: '1',
      name: 'variable2'
    })
    ;(handleVariableAlias.default as jest.Mock).mockImplementation(async (
      variable,
      _value,
      mode,
      aliasSameMode
    ) => ({
      description: variable.description,
      exportKey: 'variables',
      category: 'string',
      values: '{collection1.alias}',
      aliasCollectionName: 'collection1',
      aliasMode: mode,
      aliasSameMode: variable.aliasSameMode || aliasSameMode
    }))

    const result = await getVariables(mockFigma, {
      ...mockSettings,
      modeInTokenValue: false,
      resolveSameCollectionOrModeReference: true
    })

    expect(result).toHaveLength(1)
    expect(result[0].values).toBe('{collection1.mode1.alias}')
  })

  it('should skip alias variables that cannot be resolved', async () => {
    const mockCollections = [
      { id: '1', name: 'collection1', modes: [{ modeId: 'mode1', name: 'Mode 1' }] }
    ]
    const mockVariables = [
      {
        id: 'variable1-id',
        variableCollectionId: '1',
        name: 'variable1',
        valuesByMode: { mode1: { type: 'VARIABLE_ALIAS', id: 'missingAliasId' } }
      }
    ]

    mockFigma.variables.getLocalVariableCollectionsAsync = jest.fn().mockResolvedValue(mockCollections)
    mockFigma.variables.getLocalVariablesAsync = jest.fn().mockResolvedValue(mockVariables)
    ;(handleVariableAlias.default as jest.Mock).mockResolvedValue(null)

    const result = await getVariables(mockFigma, {
      ...mockSettings,
      modeInTokenValue: false
    })

    expect(result).toEqual([])
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
    mockFigma.variables.getLocalVariablesAsync = jest.fn().mockResolvedValue(mockVariables)

    mockSettings.modeInTokenValue = true

    const result = await getVariables(mockFigma, mockSettings)
    expect(result).toHaveLength(1)
    expect(result[0].name).toContain('collection1/variable1')
  })
})
