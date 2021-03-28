import getFileId from '../../src/utilities/getFileId'
import config from '../../src/utilities/config'

describe('getFileId', () => {
  const figmaMock = {
    root: {
      name: 'testFile',
      getPluginData: jest.fn(),
      setPluginData: jest.fn()
    }
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('no file id set', () => {
    figmaMock.root.getPluginData.mockReturnValue(undefined)
    // run module
    // @ts-ignore
    getFileId(figmaMock)
    // assert
    expect(figmaMock.root.getPluginData).toBeCalledTimes(2)
    expect(figmaMock.root.setPluginData.mock.calls[0][0]).toStrictEqual(config.key.fileId)
    expect(figmaMock.root.setPluginData.mock.calls[0][1].substr(0, 8)).toStrictEqual('testFile')
  })

  test('file id already set', () => {
    figmaMock.root.getPluginData.mockReturnValue('alreadySet 2345')
    // run module
    // @ts-ignore
    const value = getFileId(figmaMock)
    // assert
    expect(figmaMock.root.getPluginData).toBeCalledTimes(1)
    expect(figmaMock.root.setPluginData).not.toBeCalled()
    expect(value).toStrictEqual('alreadySet 2345')
  })
})