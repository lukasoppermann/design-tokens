import extractEffects from '../../src/extractor/extractEffects'
import { effectStyleObjects } from './data/effectStyleObjects.data'

describe('extracting effects', () => {
  test('extract only valid effects', () => {
    expect(extractEffects(effectStyleObjects)).toStrictEqual([{
      category: 'effect',
      description: 'an effect style',
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
        type: {
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
        type: {
          value: 'backgroundBlur',
          type: 'string'
        },
      }]
    },
    {
      category: 'effect',
      description: null,
      name: 'effect/blur no description',
      values: [{
        radius: {
          value: 7,
          type: 'number',
          unit: 'pixel'
        },
        type: {
          value: 'layerBlur',
          type: 'string'
        },
      }]
    }
  ])
  })
})
