import { prepareExport } from '@utils/prepareExport'
import { internalTokenInterface } from '@typings/propertyObject'
import { Settings, tokenFormatType } from '@typings/settings'
import { transformer as originalFormatTransformer } from '@src/transformer/originalFormatTransformer'
import { transformer as standardTransformer } from '@src/transformer/standardTransformer'
import { groupByKeyAndName } from '@utils/groupByName'
import { prefixTokenName } from '@utils/prefixTokenName'

jest.mock('@src/transformer/originalFormatTransformer')
jest.mock('@src/transformer/standardTransformer')
jest.mock('@utils/groupByName')
jest.mock('@utils/prefixTokenName')

describe('prepareExport', () => {
  const mockTokens: internalTokenInterface[] = [
    { name: 'font/primary', category: 'font', exportKey: 'font', extensions: {} } as internalTokenInterface,
    { name: 'color/primary', category: 'color', exportKey: 'color', extensions: {} } as internalTokenInterface
  ]

  const mockSettings: Settings = {
    tokenFormat: 'standard',
    exports: {
      font: true,
      color: true,
      gradient: false,
      typography: false,
      effect: false,
      grid: false,
      border: false,
      breakpoint: false,
      radius: false,
      size: false,
      spacing: false,
      motion: false,
      opacity: false,
      variables: false
    },
    excludeExtensionProp: false,
    filename: '',
    extension: '',
    nameConversion: 'default',
    compression: false,
    urlJsonCompression: false,
    eventType: '',
    exclusionPrefix: '',
    alias: '',
    authType: '',
    reference: '',
    keyInName: false,
    prefixInName: false,
    modeInTokenValue: false,
    modeInTokenName: false,
    resolveSameCollectionOrModeReference: false,
    prefix: {
      color: '',
      gradient: '',
      font: '',
      typography: '',
      effect: '',
      grid: '',
      border: '',
      breakpoint: '',
      radius: '',
      size: '',
      spacing: '',
      motion: '',
      opacity: ''
    }
  }

  beforeEach(() => {
    (originalFormatTransformer as jest.Mock).mockImplementation(token => token)
      (standardTransformer as jest.Mock).mockImplementation(token => token)
      (groupByKeyAndName as jest.Mock).mockImplementation(tokens => tokens)
      (prefixTokenName as jest.Mock).mockImplementation(tokens => tokens)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return grouped tokens', () => {
    const result = prepareExport(JSON.stringify(mockTokens), mockSettings)
    expect(result).toEqual(expect.any(Array))
    expect(groupByKeyAndName).toHaveBeenCalled()
  })

  it('should handle empty tokens string', () => {
    const result = prepareExport('', mockSettings)
    expect(result).toEqual(expect.any(Array))
    expect(groupByKeyAndName).toHaveBeenCalled()
  })

  it('should filter tokens based on settings', () => {
    const settings = {
      ...mockSettings,
      exports: {
        ...mockSettings.exports,
        font: true,
        color: false
      }
    }
    const result = prepareExport(JSON.stringify(mockTokens), settings)
    expect(result).toEqual(expect.any(Array))
    expect(result.some(token => token.exportKey === 'color')).toBe(false)
  })

  it('should create typography tokens if format is standard', () => {
    const tokens = [
      { name: 'font/primary', category: 'font', exportKey: 'font', extensions: {} } as internalTokenInterface
    ]
    const result = prepareExport(JSON.stringify(tokens), mockSettings)
    expect(result.some(token => token.category === 'font')).toBe(true)
  })

  it('should not create typography tokens if format is not standard', () => {
    const settings = { ...mockSettings, tokenFormat: 'customFormat' as tokenFormatType }
    const tokens = [
      { name: 'font/primary', category: 'font', exportKey: 'font', extensions: {} } as internalTokenInterface
    ]
    const result = prepareExport(JSON.stringify(tokens), settings)
    expect(result.some(token => token.category === 'typography')).toBe(false)
  })
})