import extractGrids from '../../src/extractor/extractGrids'
import { gridStyleObjects } from './data/gridStyleObjects.data'

describe('extracting grids', () => {
  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractGrids(gridStyleObjects, ['grid'])).toStrictEqual([{
      category: 'grid',
      exportKey: 'grid',
      description: 'a description grid',
      name: 'grid/rows & columns',
      values: [{
        pattern: {
          type: 'string',
          value: 'rows'
        },
        alignment: {
          type: 'string',
          value: 'center'
        },
        sectionSize: {
          type: 'number',
          unit: 'pixel',
          value: 10
        },
        gutterSize: {
          type: 'number',
          unit: 'pixel',
          value: 7
        },
        count: {
          type: 'number',
          value: 8
        }
      },
      {
        pattern: {
          type: 'string',
          value: 'columns'
        },
        alignment: {
          type: 'string',
          value: 'max'
        },
        sectionSize: {
          type: 'number',
          unit: 'pixel',
          value: 10
        },
        offset: {
          type: 'number',
          unit: 'pixel',
          value: 9
        },
        gutterSize: {
          type: 'number',
          unit: 'pixel',
          value: 7
        },
        count: {
          type: 'string',
          value: 'auto'
        }
      }]
    },
    {
      category: 'grid',
      exportKey: 'grid',
      description: null,
      name: 'grid/grid no description',
      values: [{
        pattern: {
          type: 'string',
          value: 'grid'
        },
        sectionSize: {
          type: 'number',
          unit: 'pixel',
          value: 5
        }
      }]
    }
    ])
  })
})
