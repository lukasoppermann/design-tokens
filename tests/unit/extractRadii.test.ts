import extractRadii from '../../src/extractor/extractRadii'
import { tokenCategoryType } from '../../types/tokenCategory'
import { tokenExportKeyType } from '../../types/tokenExportKey'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting radii', () => {
  const nodeArray = [
    customTokenNode,
    {
      ...customTokenNode,
      ...{ name: 'radii/mixed' }
    },
    {
      ...customTokenNode,
      ...{
        name: 'radii/5 no desc',
        description: null,
        cornerRadius: 5,
        bottomLeftRadius: 5,
        bottomRightRadius: 5,
        topLeftRadius: 5,
        topRightRadius: 5,
        cornerSmoothing: 0
      }
    },
    {
      ...customTokenNode,
      ...{
        name: 'radii/0',
        cornerRadius: 0,
        bottomLeftRadius: null,
        bottomRightRadius: null,
        topLeftRadius: null,
        topRightRadius: null,
        cornerSmoothing: 0
      }
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractRadii(nodeArray, ['radii'])).toStrictEqual([{
      category: 'radius' as tokenCategoryType,
      exportKey: 'radius' as tokenExportKeyType,
      description: 'a description text',
      name: 'radii/mixed',
      values: {
        radii: {
          bottomLeft: {
            type: 'number',
            unit: 'pixel',
            value: 3
          },
          bottomRight: {
            type: 'number',
            unit: 'pixel',
            value: 4
          },
          topLeft: {
            type: 'number',
            unit: 'pixel',
            value: 5
          },
          topRight: {
            type: 'number',
            unit: 'pixel',
            value: 0
          }
        },
        radiusType: {
          type: 'string',
          value: 'mixed'
        },
        smoothing: {
          comment: 'Percent as decimal from 0.0 - 1.0',
          type: 'number',
          value: 0.35
        }
      }
    },
    {
      category: 'radius',
      exportKey: 'radius',
      description: null,
      name: 'radii/5 no desc',
      values: {
        radii: {
          bottomLeft: {
            type: 'number',
            unit: 'pixel',
            value: 5
          },
          bottomRight: {
            type: 'number',
            unit: 'pixel',
            value: 5
          },
          topLeft: {
            type: 'number',
            unit: 'pixel',
            value: 5
          },
          topRight: {
            type: 'number',
            unit: 'pixel',
            value: 5
          }
        },
        radius: {
          type: 'number',
          unit: 'pixel',
          value: 5
        },
        radiusType: {
          type: 'string',
          value: 'single'
        },
        smoothing: {
          comment: 'Percent as decimal from 0.0 - 1.0',
          type: 'number',
          value: 0
        }
      }
    },
    {
      category: 'radius',
      exportKey: 'radius',
      description: 'a description text',
      name: 'radii/0',
      values: {
        radii: {
          bottomLeft: {
            type: 'number',
            unit: 'pixel',
            value: 0
          },
          bottomRight: {
            type: 'number',
            unit: 'pixel',
            value: 0
          },
          topLeft: {
            type: 'number',
            unit: 'pixel',
            value: 0
          },
          topRight: {
            type: 'number',
            unit: 'pixel',
            value: 0
          }
        },
        radius: {
          type: 'number',
          unit: 'pixel',
          value: 0
        },
        radiusType: {
          type: 'string',
          value: 'single'
        },
        smoothing: {
          comment: 'Percent as decimal from 0.0 - 1.0',
          type: 'number',
          value: 0
        }
      }
    }
    ])
  })
})
