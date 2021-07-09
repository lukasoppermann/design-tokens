import styleDictionaryTransformer, { __testing } from '../../src/transformer/styleDictionaryTransformer'

__testing.styleDictionaryConvertValue

describe('Testing styleDictionaryConvertValue', () => {
  test('nullable value', () => {
    // assert
    // @ts-ignore
    expect(__testing.styleDictionaryConvertValue(null, 'string')).toStrictEqual(undefined)
    expect(__testing.styleDictionaryConvertValue(undefined, 'string')).toStrictEqual(undefined)
  })

  test('valid numeric value', () => {
    // assert
    // @ts-ignore
    expect(__testing.styleDictionaryConvertValue(12, 'number')).toStrictEqual(12)
  })

  test('valid string value', () => {
    // assert
    // @ts-ignore
    expect(__testing.styleDictionaryConvertValue('center', 'string')).toStrictEqual('center')
  })

  test('valid color value', () => {
    // assert
    // @ts-ignore
    expect(__testing.styleDictionaryConvertValue({
      a: 0.5,
      r: 120,
      b: 140,
      g: 130
    }, 'color')).toStrictEqual('rgba(120, 130, 140, 0.5)')
  })
})

describe('sizeTransformer', () => {
  test('valid size', () => {
    // assert
    expect(__testing.sizeTransformer({
      width: {
        value: 10,
        unit: 'pixel',
        type: 'number'
      },
      height: {
        value: 10,
        unit: 'pixel',
        type: 'number'
      }
    })).toStrictEqual({
      type: 'number',
      unit: 'pixel',
      value: 10
 })
  })
})
