import extractorInterface from '../../types/extractorInterface'
import { gridAlignmentType, gridPatternType, gridPropertyInterface, propertyType } from '../../types/propertyObject'
import getTokenStyles from '../utilities/getTokenStyles'

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

const getCount = count => {
  if (count === Infinity) {
    return {
      value: 'auto',
      type: 'string' as propertyType
    }
  }
  return {
    value: count,
    type: 'number' as propertyType
  }
}

const rowColumnValues = (grid: RowsColsLayoutGrid) => ({
  pattern: {
    value: grid.pattern.toLowerCase() as gridPatternType,
    type: 'string' as propertyType
  },
  // undefined when aligment stretch
  ...(grid.sectionSize !== undefined && {sectionSize: {
    value: grid.sectionSize,
    unit: 'pixel',
    type: 'number' as propertyType
  }}),
  gutterSize: {
    value: grid.gutterSize,
    unit: 'pixel',
    type: 'number' as propertyType
  },
  alignment: {
    value: grid.alignment.toLowerCase() as gridAlignmentType,
    type: 'string' as propertyType
  },
  count: getCount(grid.count),
  // undefined when aligment centred
  ...(grid.offset !== undefined && {offset: {
    value: grid.offset,
    unit: 'pixel',
    type: 'number' as propertyType
  }})
})

const extractGrids: extractorInterface = (tokenNodes: GridStyle[]): gridPropertyInterface[] => {
  // get grid styles
  return getTokenStyles(tokenNodes).map(node => ({
    name: node.name,
    description: node.description || null,
    category: 'grid',
    values: node.layoutGrids.map((grid: LayoutGrid) => grid.pattern === "GRID" ? gridValues(grid) : rowColumnValues(grid))
  }))
}

export default extractGrids