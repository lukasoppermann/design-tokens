import extractorInterface from '../../types/extractorInterface'
import { gridAlignmentType, gridPatternType, gridPropertyInterface } from '../../types/propertyObject'

const gridValues = (grid: GridLayoutGrid) => ({
  pattern: {
    value: grid.pattern.toLowerCase() as gridPatternType
  },
  sectionSize: {
    value: grid.sectionSize,
    unit: 'pixels'
  }
})

const rowColumnValues = (grid: RowsColsLayoutGrid) => ({
  pattern: {
    value: grid.pattern.toLowerCase() as gridPatternType
  },
  sectionSize: {
    value: grid.sectionSize,
    unit: 'pixels'
  },
  gutterSize: {
    value: grid.gutterSize,
    unit: 'pixels'
  },
  alignment: {
    value: grid.alignment.toLowerCase() as gridAlignmentType
  },
  count: {
    value: grid.count
  },
  offset: {
    value: grid.offset,
    unit: 'pixels'
  }
})

const extractGrids: extractorInterface = (tokenNodes: GridStyle[]): gridPropertyInterface[] => {
  // get grid styles
  return tokenNodes.map(node => ({
    name: node.name,
    description: node.description || null,
    values: node.layoutGrids.map((grid: LayoutGrid) => grid.pattern === "GRID" ? gridValues(grid) : rowColumnValues(grid))
  }))
}

export default extractGrids

// "grids": [
//   {
//     "pattern": "COLUMNS",
//     "visible": true,
//     "color": {
//       "r": 1,
//       "g": 0,
//       "b": 0,
//       "a": 0.10000000149011612
//     },
//     "gutterSize": 20,
//     "alignment": "STRETCH",
//     "count": 5,
//     "offset": 10
//   },
//   {
//     "pattern": "ROWS",
//     "visible": true,
//     "color": {
//       "r": 1,
//       "g": 0,
//       "b": 0,
//       "a": 0.10000000149011612
//     },
//     "gutterSize": 10,
//     "alignment": "CENTER",
//     "count": 5,
//     "sectionSize": 8
//   },
//   {
//     "pattern": "COLUMNS",
//     "visible": true,
//     "color": {
//       "r": 1,
//       "g": 0,
//       "b": 0,
//       "a": 0.10000000149011612
//     },
//     "gutterSize": 20,
//     "alignment": "MAX",
//     "count": 5,
//     "sectionSize": 8,
//     "offset": 10
//   },
//   {
//     "pattern": "COLUMNS",
//     "visible": true,
//     "color": {
//       "r": 1,
//       "g": 0,
//       "b": 0,
//       "a": 0.10000000149011612
//     },
//     "gutterSize": 20,
//     "alignment": "MIN",
//     "count": 5,
//     "sectionSize": 34,
//     "offset": 13
//   },
//   {
//     "pattern": "ROWS",
//     "visible": true,
//     "color": {
//       "r": 1,
//       "g": 0,
//       "b": 0,
//       "a": 0.10000000149011612
//     },
//     "gutterSize": 20,
//     "alignment": "MIN",
//     "count": 5,
//     "sectionSize": 8,
//     "offset": 10
//   },
//   {
//     "pattern": "GRID",
//     "visible": true,
//     "color": {
//       "r": 1,
//       "g": 0,
//       "b": 0,
//       "a": 0.10000000149011612
//     },
//     "sectionSize": 8
//   }
// ]
//       }
//     }