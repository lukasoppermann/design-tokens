import extractEffects from '../../src/extractor/extractEffects'
import { effectStyleObjects } from './data/effectStyleObjects.data'

describe('extracting effects', () => {
  test('extract only valid effects', () => {
    expect(extractEffects(effectStyleObjects, ['effect'])).toStrictEqual([{
      category: 'effect',
      exportKey: 'effect',
      description: 'an effect style',
      extensions: {
        'org.lukasoppermann.figmaDesignTokens': {
          exportKey: 'effect',
          styleId: 30
        }
      },
      name: 'effect/shadow',
      values: [{
        color: {
          type: 'color',
          value: {
            a: 0.4,
            b: 77,
            g: 51,
            r: 26
          }
        },
        radius: {
          value: 30,
          type: 'number',
          unit: 'pixel'
        },
        offset: {
          x: {
            value: 5,
            type: 'number',
            unit: 'pixel'
          },
          y: {
            value: 3,
            type: 'number',
            unit: 'pixel'
          }
        },
        spread: {
          value: undefined,
          type: 'number',
          unit: 'pixel'
        },
        effectType: {
          value: 'dropShadow',
          type: 'string'
        }
      },
      {
        radius: {
          value: 2,
          type: 'number',
          unit: 'pixel'
        },
        effectType: {
          value: 'backgroundBlur',
          type: 'string'
        }
      }]
    },
    {
      category: 'effect',
      exportKey: 'effect',
      description: null,
      extensions: {
        'org.lukasoppermann.figmaDesignTokens': {
          exportKey: 'effect',
          styleId: 31
        }
      },
      name: 'effect/blur no description',
      values: [{
        radius: {
          value: 7,
          type: 'number',
          unit: 'pixel'
        },
        effectType: {
          value: 'layerBlur',
          type: 'string'
        }
      }]
    }
    ])
  })
})
