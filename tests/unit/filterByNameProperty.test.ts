import filterByNameProperty from '../../src/utilities/filterByNameProperty'

describe('getTokenStyles', () => {
  test('exclude _ prefix', () => {
    expect([
      {
        id: 'valid',
        type: 'PAINT',
        name: 'valid',
        description: ''
      },
      {
        id: 'invalid',
        type: 'PAINT',
        name: '_invalid',
        description: ''
      }
    ].filter(filterByNameProperty)).toStrictEqual([
      {
        id: 'valid',
        type: 'PAINT',
        name: 'valid',
        description: ''
      }
    ])
  })
})
