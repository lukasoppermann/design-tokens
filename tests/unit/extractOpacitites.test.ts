import extractOpacities from '@src/extractor/extractOpacities'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting opacities', () => {
  const nodeArray = [
    {
      ...customTokenNode,
      ...{
        name: 'opacities/button-disabled',
        description: 'the opacity of disabled buttons',
        opacity: 0.3
      }
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractOpacities(nodeArray, ['opacities'])).toStrictEqual([{
      category: 'opacity',
      description: 'the opacity of disabled buttons',
      exportKey: 'opacity',
      name: 'opacities/button-disabled',
      values: {
        opacity: {
          type: 'number',
          value: 0.3
        }
      },
      extensions: {
        'org.lukasoppermann.figmaDesignTokens': {
          exportKey: 'opacity'
        }
      }
    }
    ])
  })
})
