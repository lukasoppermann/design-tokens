import extractBreakpoints from '../../src/extractor/extractBreakpoints'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting breakpoints', () => {
  const nodeArray = [
    {
      ...customTokenNode,
      ...{
        name: 'breakpoints/desktop',
        description: 'the width will be set as a max-width for desktop',
        width: 1440
      }
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractBreakpoints(nodeArray, ['breakpoints'])).toStrictEqual([{
      category: 'breakpoint',
      description: 'the width will be set as a max-width for desktop',
      exportKey: 'breakpoint',
      name: 'breakpoints/desktop',
      values: {
        height: {
          type: 'number',
          unit: 'pixel',
          value: 20
        },
        width: {
          type: 'number',
          unit: 'pixel',
          value: 1440
        }
      },
      extensions: {
        'org.lukasoppermann.figmaDesignTokens': {
          exportKey: 'breakpoint'
        }
      }
    }
    ])
  })
})
