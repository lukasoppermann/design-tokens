import filterByNameProperty from '@utils/filterByNameProperty'

describe('getTokenStyles', () => {
  test('exclude _ . and * prefix', () => {
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
      },
      {
        id: 'invalid',
        type: 'PAINT',
        name: '.invalid',
        description: ''
      },
      {
        id: 'invalid',
        type: 'PAINT',
        name: '*invalid',
        description: ''
      }
    ].filter(item => filterByNameProperty(item, ['*']))).toStrictEqual([
      {
        id: 'valid',
        type: 'PAINT',
        name: 'valid',
        description: ''
      }
    ])
  })
})
