import { getSettings, setSettings } from '../../src/utilities/settings'
import { stringifyJson } from '../../src/utilities/stringifyJson'
import { nameConversionType } from '../../types/settings'

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
  compression: false,
  urlJsonCompression: true,
  serverUrl: 'https://test.com',
  eventType: 'baseEvent',
  accessToken: 'test',
  acceptHeader: 'baseHeader',
  authType: 'baseAuthType',
  keyInName: false,
  prefix: {
    color: 'color',
    font: 'font',
    effect: 'effect',
    grid: 'grid',
    border: 'border',
    breakpoint: 'breakpoint',
    radius: 'radius, radii',
    size: 'size',
    spacing: 'spacing',
    motion: 'motion'
  },
  exports: {
    color: true,
    font: true,
    effect: true,
    grid: true,
    border: true,
    breakpoint: true,
    radius: true,
    size: true,
    spacing: true,
    motion: true
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
  test('get settings when valid settings are present', () => {
    const newSettings = {
      ...baseSettings,
      ...{
        filename: 'myFile',
        nameConversion: 'default',
        compression: true,
        serverUrl: 'https://test.com',
        eventType: 'myEvent',
        acceptHeader: 'yo',
        authType: 'aType'
      }
    }
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue(JSON.stringify(newSettings, null, 2))
    console.log(getSettings())
    // assert
    expect(getSettings()).toStrictEqual(newSettings)
  })
})
