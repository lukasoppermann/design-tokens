import { getVariableTypeByValue } from '@utils/getVariableTypeByValue'

describe('getVariableTypeByValue', () => {
  it('should return "string" for boolean values', () => {
    expect(getVariableTypeByValue(true)).toBe('string')
    expect(getVariableTypeByValue(false)).toBe('string')
  })

  it('should return "dimension" for number values', () => {
    expect(getVariableTypeByValue(42)).toBe('dimension')
    expect(getVariableTypeByValue(3.14)).toBe('dimension')
  })

  it('should return "color" for object values', () => {
    expect(getVariableTypeByValue({})).toBe('color')
    expect(getVariableTypeByValue({ key: 'value' })).toBe('color')
  })

  it('should return "string" for string values', () => {
    expect(getVariableTypeByValue('hello')).toBe('string')
    expect(getVariableTypeByValue('')).toBe('string')
  })
})