import extractColors from '../../src/extractor/extractColors'
import { paintStyleObjects } from './data/paintStyleObjects.data'

describe('extracting color fills', () => {
  test('extract only valid colors', () => {
    expect(extractColors(paintStyleObjects, { color: ['colors'], gradient: ['gradient'], alias: [] })).toStrictEqual([
      {
        category: 'color',
        exportKey: 'color',
        description: 'a description text',
        name: 'colors/red',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            styleId: 1
          }
        },
        values: [{
          fill: {
            type: 'color',
            value: {
              a: 0.5,
              b: 186,
              g: 26,
              r: 255
            },
            blendMode: 'normal'
          }
        }]
      },
      {
        category: 'color',
        exportKey: 'color',
        description: 'a description text',
        name: 'colors/red ref',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            alias: 'colors.red',
            styleId: 1
          }
        },
        values: [{
          fill: {
            type: 'color',
            value: {
              a: 0.5,
              b: 186,
              g: 26,
              r: 255
            },
            blendMode: 'normal'
          }
        }]
      },
      {
        category: 'color',
        exportKey: 'color',
        description: 'i have no paints',
        name: 'colors/transparent1',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            styleId: 1
          }
        },
        values: [{
          fill: {
            type: 'color',
            value: {
              a: 0,
              b: 0,
              g: 0,
              r: 0
            },
            blendMode: 'normal'
          }
        }]
      },
      {
        category: 'color',
        exportKey: 'color',
        description: 'i have opacity 0',
        name: 'colors/transparent2',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            styleId: 1
          }
        },
        values: [{
          fill: {
            type: 'color',
            value: {
              a: 0,
              b: 255,
              g: 255,
              r: 255
            },
            blendMode: 'normal'
          }
        }]
      },
      {
        category: 'color',
        exportKey: 'color',
        description: 'multiple fills',
        name: 'colors/multi',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            styleId: 2
          }
        },
        values: [{
          fill: {
            type: 'color',
            value: {
              a: 0.5,
              b: 186,
              g: 26,
              r: 255
            },
            blendMode: 'normal'
          }
        }, {
          gradientType: {
            type: 'string',
            value: 'linear'
          },
          opacity: {
            type: 'number',
            value: 0.35
          },
          rotation: {
            type: 'number',
            unit: 'degree',
            value: 135
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
        }]
      },
      {
        category: 'gradient',
        exportKey: 'gradient',
        description: '',
        name: 'gradient/gradient and color',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'gradient',
            styleId: 3
          }
        },
        values: [
          {
            gradientType: {
              type: 'string',
              value: 'linear'
            },
            rotation: {
              type: 'number',
              unit: 'degree',
              value: 135
            },
            opacity: {
              type: 'number',
              value: 0.35
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
              },
              blendMode: 'normal'
            }
          }
        ]
      }
    ])
  })
  test('missing alias Array', () => {
    expect(extractColors(paintStyleObjects.slice(0, 2), { color: ['colors'], gradient: [''] })).toStrictEqual([
      {
        category: 'color',
        exportKey: 'color',
        description: 'a description text',
        name: 'colors/red',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            styleId: 1
          }
        },
        values: [{
          fill: {
            type: 'color',
            value: {
              a: 0.5,
              b: 186,
              g: 26,
              r: 255
            },
            blendMode: 'normal'
          }
        }]
      },
      {
        category: 'color',
        exportKey: 'color',
        description: 'a description text',
        name: 'colors/red ref',
        extensions: {
          'org.lukasoppermann.figmaDesignTokens': {
            exportKey: 'color',
            alias: 'colors.red',
            styleId: 1
          }
        },
        values: [{
          fill: {
            type: 'color',
            value: {
              a: 0.5,
              b: 186,
              g: 26,
              r: 255
            },
            blendMode: 'normal'
          }
        }]
      }
    ])
  })
})
