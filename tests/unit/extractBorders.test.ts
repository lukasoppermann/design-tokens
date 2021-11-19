import extractBorders from '../../src/extractor/extractBorders'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting borders', () => {
  const nodeArray = [
    customTokenNode,
    {
      ...customTokenNode,
      ...{
        name: 'borders/mixed',
        exportKey: 'border'
      }
    },
    {
      ...customTokenNode,
      ...{
        name: 'borders/blue',
        exportKey: 'border',
        description: null,
        strokes: [
          { r: 0, g: 0, b: 255, a: 1 },
          { r: 255, g: 230, b: 0, a: 1 }
        ]
      }
    },
    {
      ...customTokenNode,
      ...{
        name: 'borders/red',
        exportKey: 'border',
        strokeCap: Symbol('mixed')
      }
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractBorders(nodeArray, ['borders'])).toStrictEqual([{
      category: 'border',
      exportKey: 'border',
      description: 'a description text',
      name: 'borders/mixed',
      values: {
        dashPattern: {
          type: 'string',
          value: [2, 5]
        },
        stroke: {
          type: 'color',
          value: {
            a: 1,
            b: 0,
            g: 230,
            r: 255
          }
        },
        strokeAlign: {
          type: 'string',
          value: undefined
        },
        strokeCap: {
          type: 'string',
          value: 'round'
        },
        strokeJoin: {
          type: 'string',
          value: 'miter'
        },
        strokeMiterLimit: {
          type: 'number',
          unit: 'degree',
          value: 25
        },
        strokeWeight: {
          type: 'number',
          unit: 'pixel',
          value: 2
        }
      },
      extensions: {
        'org.lukasoppermann.figmaDesignTokens': {
          exportKey: 'border'
        }
      }
    },
    {
      category: 'border',
      exportKey: 'border',
      description: null,
      name: 'borders/blue',
      values: {
        dashPattern: {
          type: 'string',
          value: [2, 5]
        },
        stroke: {
          type: 'color',
          value: {
            a: 1,
            b: 255,
            g: 0,
            r: 0
          }
        },
        strokeAlign: {
          type: 'string',
          value: undefined
        },
        strokeCap: {
          type: 'string',
          value: 'round'
        },
        strokeJoin: {
          type: 'string',
          value: 'miter'
        },
        strokeMiterLimit: {
          type: 'number',
          unit: 'degree',
          value: 25
        },
        strokeWeight: {
          type: 'number',
          unit: 'pixel',
          value: 2
        }
      },
      extensions: {
        'org.lukasoppermann.figmaDesignTokens': {
          exportKey: 'border'
        }
      }
    },
    {
      category: 'border',
      exportKey: 'border',
      description: 'a description text',
      name: 'borders/red',
      values: {
        dashPattern: {
          type: 'string',
          value: [2, 5]
        },
        stroke: {
          type: 'color',
          value: {
            a: 1,
            b: 0,
            g: 230,
            r: 255
          }
        },
        strokeAlign: {
          type: 'string',
          value: undefined
        },
        strokeCap: {
          type: 'string',
          value: 'mixed'
        },
        strokeJoin: {
          type: 'string',
          value: 'miter'
        },
        strokeMiterLimit: {
          type: 'number',
          unit: 'degree',
          value: 25
        },
        strokeWeight: {
          type: 'number',
          unit: 'pixel',
          value: 2
        }
      },
      extensions: {
        'org.lukasoppermann.figmaDesignTokens': {
          exportKey: 'border'
        }
      }
    }
    ])
  })
})
