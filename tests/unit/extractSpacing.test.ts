import extractSpacing from '../../src/extractor/extractSpacing'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting spacing', () => {
  const nodeArray = [
    customTokenNode,
    { 
      ...customTokenNode,
      ...{ name: 'padding/10' } 
    },
    { 
      ...customTokenNode,
      ...{ 
        name: 'margin/mixed',
        description: null,
        width: 10.2345,
        height: .567
      } 
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractSpacing(nodeArray)).toStrictEqual([{
      category: 'spacing',
      description: 'a description text',
      name: 'spacing/10',
      values: {
        height: {
          type: 'number',
          unit: 'pixel',
          value: 20,
        },
        width: {
          type: 'number',
          unit: 'pixel',
          value: 10,
        }
      }
    },
    {
      category: 'spacing',
      description: null,
      name: 'spacing/10 no desc',
      values: {
        height: {
          type: 'number',
          unit: 'pixel',
          value: 0.57,
        },
        width: {
          type: 'number',
          unit: 'pixel',
          value: 10.23,
        }
      }
    }
  ])
  })
})
