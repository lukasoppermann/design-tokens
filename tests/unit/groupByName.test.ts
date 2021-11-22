import { groupByKeyAndName } from '../../src/utilities/groupByName'
import { defaultSettings } from '../../src/config/defaultSettings'

describe('groupByName', () => {
  test('group tokens with name', () => {
    expect(groupByKeyAndName([
      // @ts-ignore
      {
        name: 'token/one/first',
        category: 'color',
        values: {
          token: 'one first'
        },
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            styleId: 31
          }
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
            category: 'color',
            values: { token: 'one first' },
            extensions: {
              'org.lukasoppermann.figmaDesignTokens': {
                exportKey: 'color',
                styleId: 31
              }
            }
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
        category: 'color',
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
        category: 'color',
        values: {
          token: 'one second',
          deep: {
            value: 2
          }
        }
      }
    ], defaultSettings)).toStrictEqual({
      token: {
        one: {
          first: {
            category: 'color',
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

  test('token extensions', () => {
    expect(groupByKeyAndName([
      // @ts-ignore
      {
        name: 'token/none',
        category: 'color',
        values: '#000000'
      },
      // @ts-ignore
      {
        name: 'token/noOrg',
        category: 'color',
        values: '#000000',
        extensions: {}
      },
      // @ts-ignore
      {
        name: 'token/noExport',
        category: 'color',
        values: '#000000',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {}
        }
      },
      // @ts-ignore
      {
        name: 'token/full',
        category: 'color',
        values: '#000000',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            styleId: 31
          }
        }
      }
    ], defaultSettings)).toStrictEqual({
      token: {
        none: {
          category: 'color',
          values: '#000000'
        },
        noorg: {
          category: 'color',
          values: '#000000',
          extensions: {
          }
        },
        noexport: {
          category: 'color',
          values: '#000000',
          extensions: {
            'org.lukasoppermann.figmaDesignTokens': {
            }
          }
        },
        full: {
          category: 'color',
          values: '#000000',
          extensions: {
            'org.lukasoppermann.figmaDesignTokens': {
              exportKey: 'color',
              styleId: 31
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
        category: 'color',
        values: {
          token: 'one first'
        }
      },
      {
        name: 'token/one / second',
        exportKey: 'color',
        category: 'color',
        values: {
          token: 'one second'
        }
      },
      {
        name: 'token/two /first',
        exportKey: 'color',
        category: 'color',
        values: {
          token: 'two first'
        }
      }
    ], defaultSettings)).toStrictEqual({
      token: {
        one: {
          first: {
            exportKey: 'color',
            category: 'color',
            values: { token: 'one first' }
          },
          second: {
            exportKey: 'color',
            category: 'color',
            values: { token: 'one second' }
          }
        },
        two: {
          first: {
            exportKey: 'color',
            category: 'color',
            values: { token: 'two first' }
          }
        }
      }
    })
  })

  test('no tokens', () => {
    expect(groupByKeyAndName([], defaultSettings)).toStrictEqual([])
  })
})
