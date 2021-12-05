import { defaultSettings } from '../../src/config/defaultSettings'
import { prefixTokenName } from '../../src/utilities/prefixTokenName'

describe('prefixTokenName', () => {
  test('token with alias', () => {
    expect(prefixTokenName([
      // @ts-ignore
      {
        name: 'token/withAlias/red',
        category: 'color',
        values: '#000000',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            styleId: 31,
            alias: 'colors.red'
          }
        }
      }
    ], {
      ...defaultSettings,
      ...{ keyInName: true }
    })).toStrictEqual([{
      name: 'color/token/withAlias/red',
      category: 'color',
      values: '#000000',
      extensions: {
        'org.lukasoppermann.figmaDesignTokens': {
          exportKey: 'color',
          styleId: 31,
          alias: 'color.token.colors.red'
        }
      }
    }])
  })

  test('no tokens', () => {
    expect(prefixTokenName([], defaultSettings)).toStrictEqual([])
  })
})
