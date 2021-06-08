import { getSettings, setSettings, __testing } from '../../src/utilities/settings'
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

describe('Testing settingsPrepare', () => {
  test('add valid settings to empty array', () => {
    const newSettings = {
      filename: 'myFile',
      nameConversion: 'default',
      excludePrefix: true,
      prefix: '#',
      serverUrl: 'https://test.com',
      eventType: 'myEvent',
      acceptHeader: 'yo',
      authType: 'aType'
    }

    const output = {
      filename: 'myFile',
      nameConversion: 'default',
      excludePrefix: true,
      prefix: '#',
      serverUrl: 'https://test.com',
      eventType: 'myEvent',
      acceptHeader: 'yo',
      authType: 'aType'
    }
    // assert
    // @ts-ignore
    expect(__testing.settingsPrepare(newSettings)).toStrictEqual(output)
  })

  test('send empty settings', () => {
    const newSettings = {
      filename: '',
      nameConversion: '',
      excludePrefix: false,
      prefix: '',
      eventType: '',
      authType: ''
    }

    const output = {
      filename: 'design-tokens',
      nameConversion: 'default',
      excludePrefix: false,
      prefix: '_',
      serverUrl: '',
      eventType: 'update-tokens',
      acceptHeader: 'test',
      authType: 'token'
    }
    // assert
    // @ts-ignore
    expect(__testing.settingsPrepare(newSettings, {
      acceptHeader: 'test'
    })).toStrictEqual(output)
  })
})

describe('Testing setSettings', () => {
  test('setSettings function with valid data', () => {
    const currentSettings = {
      filename: '',
      nameConversion: 'default',
      excludePrefix: false,
      prefix: '',
      serverUrl: '',
      eventType: '',
      acceptHeader: '',
      authType: ''
    }
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue(currentSettings)

    const newSettings = {
      filename: 'myFile',
      nameConversion: 'default' as nameConversionType,
      excludePrefix: true,
      prefix: '#',
      serverUrl: 'https://test.com',
      eventType: 'myEvent',
      acceptHeader: 'yo',
      authType: 'aType'
    }

    const output = {
      filename: 'myFile',
      nameConversion: 'default' as nameConversionType,
      excludePrefix: true,
      prefix: '#',
      serverUrl: 'https://test.com',
      eventType: 'myEvent',
      acceptHeader: 'yo',
      authType: 'aType'
    }

    setSettings(newSettings)
    // assert
    // @ts-ignore
    expect(figma.root.getPluginData).toHaveReturnedWith(currentSettings)
    // @ts-ignore
    expect(figma.root.setPluginData).toHaveBeenCalledWith('settings', JSON.stringify(output, null, 2))
  })
})

describe('Testing getSettings', () => {
  test('get settings when valid settings are present', () => {
    const currentSettings = {
      filename: 'myFile',
      nameConversion: 'default',
      excludePrefix: true,
      prefix: '#',
      serverUrl: 'https://test.com',
      eventType: 'myEvent',
      acceptHeader: 'yo',
      authType: 'aType'
    }
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue(JSON.stringify(currentSettings, null, 2))

    const output = {
      filename: 'myFile',
      nameConversion: 'default',
      excludePrefix: true,
      prefix: '#',
      serverUrl: 'https://test.com',
      eventType: 'myEvent',
      acceptHeader: 'yo',
      authType: 'aType'
    }

    // assert
    expect(getSettings()).toStrictEqual(output)
  })

  test('get settings when novalid settings are present', () => {
    // @ts-ignore
    figma.root.getPluginData.mockReturnValue('')

    const output = {
      filename: 'design-tokens',
      nameConversion: 'default',
      excludePrefix: true,
      prefix: '_',
      serverUrl: '',
      eventType: 'update-tokens',
      acceptHeader: 'application/vnd.github.everest-preview+json',
      authType: 'token'
    }

    // assert
    expect(getSettings()).toStrictEqual(output)
  })
})
