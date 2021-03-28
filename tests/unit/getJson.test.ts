import getJson from '../../src/utilities/getJson'
jest.mock('../../src/utilities/getTokenJson', () => () => [{ test: 'test' }])
jest.mock('../../src/utilities/buildFigmaData', () => () => ({
  tokenFrames: [],
  paintStyles: [],
  gridStyles: [],
  textStyles: [],
  effectStyles: []
}))

const userSettings = {
  nameConversion: 'default',
  prefix: '_',
  excludePrefix: true
}

describe('getJson', () => {
  test('stringify true', () => {
    // @ts-ignore
    expect(getJson({}, userSettings)).toStrictEqual('[{"test":"test"}]')
  })
  test('stringify false', () => {
    // @ts-ignore
    expect(getJson({}, userSettings, false)).toStrictEqual([{ test: 'test' }])
  })
})