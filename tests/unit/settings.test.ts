import { getSettings, setSettings, __testing } from '../../src/utilities/settings'
import { nameConversionType } from '../../types/settings'
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
  compression: false,
  urlJsonCompression: true,
  excludePrefix: true,
  prefix: '#Base',
  serverUrl: 'https://test.com',
  eventType: 'baseEvent',
  acceptHeader: 'baseHeader',
  authType: 'baseAuthType',
  keyInName: false,
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

describe('Testing settingsPrepare', () => {
  test('add valid settings to empty array', () => {
    const newSettings = { ...baseSettings }
    newSettings.authType = 'aType'
    // assert
    // @ts-ignore
    expect(__testing.settingsPrepare(newSettings)).toStrictEqual(newSettings)
  })

  test('send empty settings', () => {
    const newSettings = {
      ...baseSettings,
      ...{
        filename: '',
        nameConversion: '',
        prefix: '',
        eventType: '',
        authType: ''
      }
    }

    const output = {
      ...baseSettings,
      ...{
        acceptHeader: 'baseHeader',
        authType: 'token',
        eventType: 'update-tokens',
        filename: 'design-tokens',
        prefix: '_'
      }
    }
    // assert
    // @ts-ignore
    expect(output).toStrictEqual(__testing.settingsPrepare(newSettings, {
      acceptHeader: 'test'
    }))
  })
})

describe('Testing setSettings', () => {
  test('setSettings function with valid data', () => {
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue(baseSettings)

    setSettings(baseSettings)
    // assert
    // @ts-ignore
    expect(figma.root.getPluginData).toHaveReturnedWith(baseSettings)
    // @ts-ignore
    expect(figma.root.setPluginData).toHaveBeenCalledWith('settings', JSON.stringify(baseSettings, null, 2))
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
        excludePrefix: true,
        prefix: '#',
        serverUrl: 'https://test.com',
        eventType: 'myEvent',
        acceptHeader: 'yo',
        authType: 'aType'
      }
    }
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue(JSON.stringify(newSettings, null, 2))

    // assert
    expect(getSettings()).toStrictEqual(newSettings)
  })

  test('get settings when novalid settings are present', () => {
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue('')
    const output = {
      ...defaultSettings,
      ...{
        serverUrl: '',
        accessToken: ''
      }
    }

    const getSettingsOutput = getSettings()
    getSettingsOutput.accessToken = ''
    // assert
    expect(output).toStrictEqual(getSettingsOutput)
  })
})
