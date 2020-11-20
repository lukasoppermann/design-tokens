import extractColors from '../../src/extractor/extractColors'
import { paintStyleObject } from './data/paintStyleObject.data'

describe('extracting color fills', () => {
  const nodeArray = [
    paintStyleObject,
    { 
      ...paintStyleObject,
      ...{ name: 'sizes/10' } 
    },
    { 
      ...paintStyleObject,
      ...{ 
        name: 'sizes/10 no desc',
        description: null,
        width: 10.2345,
        height: .567
      } 
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractColors(nodeArray)).toStrictEqual([{
      category: 'fill',
      description: 'a description text',
      name: 'sizes/10',
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
      category: 'size',
      description: null,
      name: 'sizes/10 no desc',
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
