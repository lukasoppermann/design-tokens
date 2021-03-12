import { getAccessToken } from '../../src/utilities/accessToken'

beforeAll(() => {
  // @ts-ignore
  global.figma = {
    clientStorage: {
      getAsync: jest.fn()
    }
  }
})

describe('Testing getAccessToken', () => {
  test('return correct token object', () => {
    // @ts-ignore
    global.figma.clientStorage.getAsync.mockReturnValue(Promise.resolve({
      '125454sdaf': 'test'
    }))

    return getAccessToken('125454sdaf').then(data => {
      expect(data).toBe('test')
    })
  })

  test('return string instead of token object', () => {
    // @ts-ignore
    global.figma.clientStorage.getAsync.mockReturnValue(Promise.resolve('wrong'))

    return getAccessToken('125454sdaf').then(data => {
      expect(data).toBe('')
    })
  })

  test('token does not exist', () => {
    // @ts-ignore
    global.figma.clientStorage.getAsync.mockReturnValue(Promise.resolve({
      '125454sdaf': 'test'
    }))

    return getAccessToken('N25454sdaf').then(data => {
      expect(data).toBe('')
    })
  })
})
