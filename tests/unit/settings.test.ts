import { getSettings, setSettings, __testing } from '../../src/utilities/settings'

beforeAll(() => {
  // @ts-ignore
  global.figma = {
    clientStorage: {
      getAsync: jest.fn()
    }
  }

})

describe("Testing settingsPrepare", () => {
  test("add valid settings to empty array", () => {
    const newSettings = {
      filename: 'myFile',
      excludePrefix: true,
      prefix: '#',
      serverUrl: 'https://test.com',
      eventType: 'myEvent',
      acceptHeader: 'yo',
      authType: 'aType'
    }

    const output = {
      filename: 'myFile',
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

  test("send empty settings", () => {
    const newSettings = {
      filename: '',
      excludePrefix: false,
      prefix: '',
      eventType: '',
      authType: ''
    }

    const output = {
      filename: 'design-tokens',
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
