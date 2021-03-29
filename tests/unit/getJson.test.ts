const getJsonTokenMock = jest.fn()
jest.mock('../../src/utilities/getTokenJson', () => getJsonTokenMock)
// eslint-disable-next-line
import getJson from '../../src/utilities/getJson'
// jest.mock('../../src/utilities/getTokenJson', () => () => [{ test: 'test' }])

jest.mock('../../src/utilities/buildFigmaData', () => () => ({
  tokenFrames: [],
  paintStyles: [],
  gridStyles: [],
  textStyles: [],
  effectStyles: []
}))

let userSettings = {
  nameConversion: 'default',
  prefix: '_',
  excludePrefix: true
}

describe('getJson', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('stringify true', () => {
    getJsonTokenMock.mockReturnValue([{ test: 'test' }])
    // @ts-ignore
    expect(getJson({}, userSettings)).toStrictEqual('[{"test":"test"}]')
    expect(getJsonTokenMock.mock.calls[0][2]).toStrictEqual('default')
  })
  test('stringify false', () => {
    userSettings.nameConversion = 'camelCase'
    getJsonTokenMock.mockReturnValue([{ test: 'test' }])
    // @ts-ignore
    expect(getJson({}, userSettings, false)).toStrictEqual([{ test: 'test' }])
    expect(getJsonTokenMock.mock.calls[0][2]).toStrictEqual('camelCase')
  })
})