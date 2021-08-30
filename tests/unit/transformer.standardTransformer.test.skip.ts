import { transformer as standardTransformer } from '../../src/transformer/standardTransformer'

describe('w3c desigv token standard transfomer', () => {
  test('size token', () => {
    // assert
    expect(standardTransformer({
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
