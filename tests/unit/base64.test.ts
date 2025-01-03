import { utf8ToBase64 } from '@utils/base64'

describe('utf8ToBase64', () => {
  it('should convert a simple string to base64', () => {
    const input = 'hello'
    const expectedOutput = 'aGVsbG8='
    expect(utf8ToBase64(input)).toBe(expectedOutput)
  })

  it('should convert a string with special characters to base64', () => {
    const input = 'hello world!'
    const expectedOutput = 'aGVsbG8gd29ybGQh'
    expect(utf8ToBase64(input)).toBe(expectedOutput)
  })

  it('should convert an empty string to base64', () => {
    const input = ''
    const expectedOutput = ''
    expect(utf8ToBase64(input)).toBe(expectedOutput)
  })

  it('should convert a string with unicode characters to base64', () => {
    const input = 'こんにちは'
    const expectedOutput = '44GT44KT44Gr44Gh44Gv'
    expect(utf8ToBase64(input)).toBe(expectedOutput)
  })
})