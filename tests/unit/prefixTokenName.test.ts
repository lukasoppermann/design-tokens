import { defaultSettings } from '../../src/config/defaultSettings'
import { prefixTokenName } from '@utils/prefixTokenName'

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

  test('token no prefix', () => {
    expect(prefixTokenName([
      // @ts-ignore
      {
        name: 'token/full',
        category: 'color',
        values: '#000000'
      }
    ], {
      ...defaultSettings,
      ...{ prefixInName: false }
    })).toStrictEqual([{
      name: 'full',
      category: 'color',
      values: '#000000'
    }])
  })

  test('no tokens', () => {
    expect(prefixTokenName([], defaultSettings)).toStrictEqual([])
  })
})
