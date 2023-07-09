import { getSettings, setSettings } from '../../src/utilities/settings'
import { stringifyJson } from '../../src/utilities/stringifyJson'
import { nameConversionType, tokenFormatType } from '../../types/settings'
import { defaultSettings } from '../../src/config/defaultSettings'

beforeAll(() => {
  // @ts-ignore
  global.figma = {
    root: {
      getPluginData: jest.fn(),
      setPluginData: jest.fn()
    },
    clientStorage: {
      getAsync: jest.fn()
    }
  }
})

const baseSettings = {
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
describe('Testing setSettings', () => {
  test('setSettings function with valid data', () => {
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue(baseSettings)
    setSettings(baseSettings)
    // assert
    // @ts-ignore
    expect(figma.root.setPluginData).toHaveBeenCalledWith('settings', stringifyJson(baseSettings, true))
  })
})

describe('Testing getSettings', () => {
  test('valid settings are present', () => {
    const newSettings = {
      ...baseSettings,
      ...{
        filename: 'myFile',
        nameConversion: 'default',
        compression: true,
        serverUrl: 'https://test.com',
        eventType: 'myEvent',
        acceptHeader: 'yo',
        contentType: 'text',
        authType: 'aType',
        reference: 'review'
      }
    }
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue(JSON.stringify(newSettings, null, 2))
    // assert
    expect(getSettings()).toStrictEqual(newSettings)
  })

  test('no settings are present', () => {
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue('')
    // assert
    expect(getSettings()).toStrictEqual(defaultSettings)
  })

  test('one setting property is missing', () => {
    const userSettings = JSON.parse(JSON.stringify(defaultSettings))
    // remove property
    delete userSettings.prefix.color
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue(JSON.stringify(userSettings, null, 2))
    // assert
    expect(getSettings()).toStrictEqual(defaultSettings)
  })
})
