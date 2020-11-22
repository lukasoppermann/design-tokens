import extractColors from '../../src/extractor/extractColors'
import { paintStyleObjects } from './data/paintStyleObjects.data'

describe('extracting color fills', () => {
  test('extract only valid colors', () => {
    expect(extractColors(paintStyleObjects)).toStrictEqual([{
      category: 'fill',
      description: 'a description text',
      name: 'colors/red',
      values: [{
        fill: {
          type: 'color',
          value: {
            a: 0.5,
            b: 186,
            g: 26,
            r: 255
          }
        },
      }]
    },
    {
      category: 'fill',
      description: null,
      name: 'colors/gradient and color',
      values: [
        {
          gradientType: {
            type: 'string',
            value: 'linear',
          },
          opacity: {
            type: 'number',
            value: 0.35,
          },
          stops: [
            {
              color: {
                type: 'color',
                value: {
                  a: 1,
                  b: 0,
                  g: 184,
                  r: 255
                }
              },
              position: {
                type: 'number',
                value: 0
              }
            },
            {
              color: {
                type: 'color',
                value: {
                  a: 1,
                  b: 77,
                  g: 51,
                  r: 255
                }
              },
              position: {
                type: 'number',
                value: 1
              }
            }
          ]
        },
        null,
        {
          fill: {
            type: 'color',
            value: {
              a: 0.11,
              b: 230,
              g: 128,
              r: 51
            }
          }
        }
      ]
    }
  ])
  })
})
