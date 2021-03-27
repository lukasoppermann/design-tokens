import getVersionDifference from '../../src/utilities/getVersionDifference'
jest.mock('../../src/utilities/version', () => '3.1.2')

describe('getVersionDifference', () => {
  const figmaMock = {
    clientStorage: {
      getAsync: jest.fn(),
      setAsync: jest.fn()
    }
  }

  test('same version', async () => {
    figmaMock.clientStorage.getAsync.mockReturnValue('3.1.2')
    // @ts-ignore
    const versionDifference = await getVersionDifference(figmaMock)
    // expect outcome
    expect(versionDifference).toStrictEqual(undefined)
  })

  test('major version', async () => {
    figmaMock.clientStorage.getAsync.mockReturnValue('2.0.0')
    // @ts-ignore
    const versionDifference = await getVersionDifference(figmaMock)
    // expect outcome
    expect(versionDifference).toStrictEqual('major')
  })

  test('minor version', async () => {
    figmaMock.clientStorage.getAsync.mockReturnValue('3.0.0')
    // @ts-ignore
    const versionDifference = await getVersionDifference(figmaMock)
    // expect outcome
    expect(versionDifference).toStrictEqual('minor')
  })

  test('patch version', async () => {
    figmaMock.clientStorage.getAsync.mockReturnValue('3.1.1')
    // @ts-ignore
    const versionDifference = await getVersionDifference(figmaMock)
    // expect outcome
    expect(versionDifference).toStrictEqual('patch')
  })

  test.skip('invers version difference', async () => {
    figmaMock.clientStorage.getAsync.mockReturnValue('4.1.1')
    // @ts-ignore
    const versionDifference = await getVersionDifference(figmaMock)
    // expect outcome
    expect(versionDifference).toStrictEqual('')
  })
})