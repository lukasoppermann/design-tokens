import extractorInterface from '../../types/extractorInterface'
import { gridAlignmentType, gridPatternType, gridPropertyInterface, propertyType } from '../../types/propertyObject'

const gridValues = (grid: GridLayoutGrid) => ({
  pattern: {
    value: grid.pattern.toLowerCase() as gridPatternType
  },
  sectionSize: {
    value: grid.sectionSize,
    unit: 'pixel',
    type: 'number' as propertyType
  }
})

const rowColumnValues = (grid: RowsColsLayoutGrid) => ({
  pattern: {
    value: grid.pattern.toLowerCase() as gridPatternType,
    type: 'string' as propertyType
  },
  sectionSize: {
    value: grid.sectionSize,
    unit: 'pixel',
    type: 'number' as propertyType
  },
  gutterSize: {
    value: grid.gutterSize,
    unit: 'pixel',
    type: 'number' as propertyType
  },
  alignment: {
    value: grid.alignment.toLowerCase() as gridAlignmentType,
    type: 'string' as propertyType
  },
  count: {
    value: grid.count,
    type: 'number' as propertyType
  },
  offset: {
    value: grid.offset,
    unit: 'pixel',
    type: 'number' as propertyType
  }
})

const extractGrids: extractorInterface = (tokenNodes: GridStyle[]): gridPropertyInterface[] => {
  // get grid styles
  return tokenNodes.map(node => ({
    name: node.name,
    description: node.description || null,
    values: {
      layouts: {
        value: node.layoutGrids.map((grid: LayoutGrid) => grid.pattern === "GRID" ? gridValues(grid) : rowColumnValues(grid))
      }
    }
  }))
}

export default extractGrids