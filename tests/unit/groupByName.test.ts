import { groupByKeyAndName } from '../../src/utilities/groupByName'

describe('groupByName', () => {
  test('group tokens with name', () => {
    expect(groupByKeyAndName([
      // @ts-ignore
      {
        name: 'token/one/first',
        values: {
          token: 'one first'
        }
      },
      // @ts-ignore
      {
        name: 'token/one / second',
        values: {
          token: 'one second'
        }
      },
      // @ts-ignore
      {
        name: 'token/two /first',
        values: {
          token: 'two first'
        }
      }
    ], false)).toStrictEqual({
      token: {
        one: {
          first: {
            values: { token: 'one first' }
          },
          second: {
            values: { token: 'one second' }
          }
        },
        two: {
          first: {
            values: { token: 'two first' }
          }
        }
      }
    })
  })
  test('group tokens deep', () => {
    expect(groupByKeyAndName([
      {
        name: 'token/one/first',
        exportKey: 'color',
        values: {
          token: 'one first',
          deep: {
            value: 1
          }
        }
      },
      {
        name: 'token/one/first',
        exportKey: 'color',
        values: {
          token: 'one second',
          deep: {
            value: 2
          }
        }
      }
    ], false)).toStrictEqual({
      token: {
        one: {
          first: {
            exportKey: 'color',
            values: {
              token: 'one second',
              deep: {
                value: 2
              }
            }
          }
        }
      }
    })
  })

  test('group tokens & remove name', () => {
    expect(groupByKeyAndName([
      {
        name: 'token/one/first',
        exportKey: 'color',
        values: {
          token: 'one first'
        }
      },
      {
        name: 'token/one / second',
        exportKey: 'color',
        values: {
          token: 'one second'
        }
      },
      {
        name: 'token/two /first',
        exportKey: 'color',
        values: {
          token: 'two first'
        }
      }
    ])).toStrictEqual({
      color: {
        token: {
          one: {
            first: {
              exportKey: 'color',
              values: { token: 'one first' }
            },
            second: {
              exportKey: 'color',
              values: { token: 'one second' }
            }
          },
          two: {
            first: {
              exportKey: 'color',
              values: { token: 'two first' }
            }
          }
        }
      }
    })
  })

  test('no tokens', () => {
    expect(groupByKeyAndName([])).toStrictEqual([])
  })
})
