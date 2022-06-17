import { filterByPrefix } from '../../src/extractor/extractUtilities'

describe('filterByPrefix', () => {
  const nodeList = [{
    name: 'rect 19'
  },
  {
    name: 'color/red'
  }]
  test('invalid: undefined', () => {
    // @ts-ignore
    expect(nodeList.filter(filterByPrefix(undefined))).toStrictEqual([])
  })

  test('invalid: string', () => {
    // @ts-ignore
    expect(nodeList.filter(filterByPrefix('color'))).toStrictEqual([])
  })

  test('valid: array with multiple strings', () => {
    expect(nodeList.filter(filterByPrefix(['color', 'colors']))).toStrictEqual([{
      name: 'color/red'
    }])
  })

  test('valid: array with string', () => {
    expect(nodeList.filter(filterByPrefix(['color']))).toStrictEqual([{
      name: 'color/red'
    }])
  })

  test('valid: array with empty string', () => {
    expect(nodeList.filter(filterByPrefix(['']))).toStrictEqual([])
  })
})
