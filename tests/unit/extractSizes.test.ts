import extractSizes from '../../src/extractor/extractSizes'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting sizes', () => {
  const nodeArray = [
    customTokenNode,
    {
      ...customTokenNode,
      ...{ name: 'sizes/10' }
    },
    {
      ...customTokenNode,
      ...{
        name: 'sizes/10 no desc',
        description: null,
        width: 10.2345,
        height: 0.567
      }
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractSizes(nodeArray)).toStrictEqual([{
      category: 'size',
      exportKey: 'size',
      description: 'a description text',
      name: 'sizes/10',
      values: {
        height: {
          type: 'number',
          unit: 'pixel',
          value: 20
        },
        width: {
          type: 'number',
          unit: 'pixel',
          value: 10
        }
      }
    },
    {
      category: 'size',
      exportKey: 'size',
      description: null,
      name: 'sizes/10 no desc',
      values: {
        height: {
          type: 'number',
          unit: 'pixel',
          value: 0.57
        },
        width: {
          type: 'number',
          unit: 'pixel',
          value: 10.23
        }
      }
    }
    ])
  })
})
