import extractMotion from '../../src/extractor/extractMotion'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting motion tokens', () => {
  const nodeArray = [
    customTokenNode,
    { 
      ...customTokenNode,
      ...{ name: 'motion/linear' } 
    },
    { 
      ...customTokenNode,
      ...{ 
        name: 'motion/instant',
        reactions: [{
          action: {
            type: 'NODE',
            transition: null
          }
        }]
      } 
    },
    { 
      ...customTokenNode,
      ...{ 
        name: 'motion/ease_in',
        description: undefined,
        reactions: [{
          action: {
            type: 'NODE',
            transition: {
              type: 'DISSOLVE',
              duration: 0.52124124,
              easing: {
                type: 'EASE_IN'
              }
            }
          }
        }]
      } 
    },
    { 
      ...customTokenNode,
      ...{ 
        name: 'motion/smart',
        reactions: [{
          action: {
            type: 'NODE',
            transition: {
              type: 'SMART_ANIMATE',
              duration: 0.600,
              easing: {
                easingFunctionCubicBezier: {
                  x1: .345,
                  y1: .234,
                  x2: .334,
                  y2: .9744
                }
              }
            }
          }
        }]
      } 
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractMotion(nodeArray)).toStrictEqual([
      {
        category: 'motion',
        description: 'a description text',
        name: 'motion/linear',
        values: {
          type: {
            value: 'MOVE_IN',
            type: 'string'
          },
          duration: {
            value: 321,
            unit: 'ms',
            type: 'number'
          },
          easing: {
            value: 'LINEAR',
            type: 'string'
          },
          direction: {
            value: 'LEFT',
            type: 'string'
          }
        }
      },
      {
        category: 'motion',
        description: undefined,
        name: 'motion/ease_in',
        values: {
          type: {
            value: 'DISSOLVE',
            type: 'string'
          },
          duration: {
            value: 521,
            unit: 'ms',
            type: 'number'
          },
          easing: {
            value: 'EASE_IN',
            type: 'string'
          }
        }
      },
      {
        category: 'motion',
        description: 'a description text',
        name: 'motion/smart',
        values: {
          type: {
            value: 'SMART_ANIMATE',
            type: 'string'
          },
          duration: {
            value: 600,
            unit: 'ms',
            type: 'number'
          },
          easing: {
            value: 'cubic_bezier',
            type: 'string'
          },
          easingFunction: {
            x1: {
              value: 0.345,
              type: 'number'
            },
            x2: {
              value: 0.334,
              type: 'number'
            },
            y1: {
              value: 0.234,
              type: 'number'
            },
            y2: {
              value: 0.9744,
              type: 'number'
            }
          }
        }
      }
    ])
  })
})
