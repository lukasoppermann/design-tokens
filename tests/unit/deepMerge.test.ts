// deepMerge.test.ts
import deepMerge from '@utils/deepMerge'

describe('deepMerge', () => {
  it('should merge two objects', () => {
    const target = { a: 1, b: 2 }
    const source = { b: 3, c: 4 }
    const result = deepMerge(target, source)
    expect(result).toEqual({ a: 1, b: 3, c: 4 })
  })

  it('should merge nested objects', () => {
    const target = { a: { b: 1 } }
    const source = { a: { c: 2 } }
    const result = deepMerge(target, source)
    expect(result).toEqual({ a: { b: 1, c: 2 } })
  })

  it('should merge arrays without duplicates', () => {
    const target = { a: [1, 2] }
    const source = { a: [2, 3] }
    const result = deepMerge(target, source)
    expect(result).toEqual({ a: [1, 2, 3] })
  })

  it('should overwrite non-object values', () => {
    const target = { a: 1 }
    const source = { a: 2 }
    const result = deepMerge(target, source)
    expect(result).toEqual({ a: 2 })
  })

  it('should return source if target is not an object', () => {
    const target = null
    const source = { a: 1 }
    const result = deepMerge(target, source)
    expect(result).toEqual({ a: 1 })
  })

  it('should return source if source is not an object', () => {
    const target = { a: 1 }
    const source = null
    const result = deepMerge(target, source)
    expect(result).toEqual(null)
  })

  it('should handle empty objects', () => {
    const target = {}
    const source = {}
    const result = deepMerge(target, source)
    expect(result).toEqual({})
  })

  it('should handle empty arrays', () => {
    const target = { a: [] }
    const source = { a: [] }
    const result = deepMerge(target, source)
    expect(result).toEqual({ a: [] })
  })
})
