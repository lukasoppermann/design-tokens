import extractSpacing from '../../src/extractor/extractSpacing'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting spacing', () => {
  const nodeArray = [
    customTokenNode,
    {
      ...customTokenNode,
      ...{
        name: 'spacing/padding/0'
      }
    },
    {
      ...customTokenNode,
      ...{
        name: 'spacing/padding/10',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10
      }
    },
    {
      ...customTokenNode,
      ...{
        name: 'spacing/margin/mixed',
        description: null,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 30,
        paddingLeft: 40
      }
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractSpacing(nodeArray, ['spacing'])).toStrictEqual([{
      category: 'spacing',
      exportKey: 'spacing',
      description: 'a description text',
      name: 'spacing/padding/0',
      values: {
        top: {
          value: 0,
          unit: 'pixel',
          type: 'number'
        },
        right: {
          value: 0,
          unit: 'pixel',
          type: 'number'
        },
        bottom: {
          value: 0,
          unit: 'pixel',
          type: 'number'
        },
        left: {
          value: 0,
          unit: 'pixel',
          type: 'number'
        }
      }
    },
    {
      category: 'spacing',
      exportKey: 'spacing',
      description: 'a description text',
      name: 'spacing/padding/10',
      values: {
        top: {
          value: 10,
          unit: 'pixel',
          type: 'number'
        },
        right: {
          value: 10,
          unit: 'pixel',
          type: 'number'
        },
        bottom: {
          value: 10,
          unit: 'pixel',
          type: 'number'
        },
        left: {
          value: 10,
          unit: 'pixel',
          type: 'number'
        }
      }
    },
    {
      category: 'spacing',
      exportKey: 'spacing',
      description: null,
      name: 'spacing/margin/mixed',
      values: {
        top: {
          value: 10,
          unit: 'pixel',
          type: 'number'
        },
        right: {
          value: 20,
          unit: 'pixel',
          type: 'number'
        },
        bottom: {
          value: 30,
          unit: 'pixel',
          type: 'number'
        },
        left: {
          value: 40,
          unit: 'pixel',
          type: 'number'
        }
      }
    }
    ])
  })
})
