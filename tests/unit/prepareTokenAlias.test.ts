import { defaultSettings } from '../../src/config/defaultSettings'
import { prepareTokenAlias } from '../../src/utilities/prepareTokenAlias'

describe('prepareTokenAlias', () => {
  test('add value', () => {
    expect(prepareTokenAlias([
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
      name: 'token/withAlias/red',
      category: 'color',
      values: '#000000',
      extensions: {
        'org.lukasoppermann.figmaDesignTokens': {
          exportKey: 'color',
          styleId: 31,
          alias: 'colors.red.value'
        }
      }
    }])
  })

  test('no value added', () => {
    expect(prepareTokenAlias([
      // @ts-ignore
      {
        name: 'token/full',
        category: 'color',
        values: '#000000',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            styleId: 31,
            alias: 'color.token.colors.red'
          }
        }
      }
    ], {
      ...defaultSettings,
      ...{ aliasAddValue: false }
    })).toStrictEqual([{
      name: 'token/full',
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
    expect(prepareTokenAlias([], defaultSettings)).toStrictEqual([])
  })
})
