import extractorInterface from '../../types/extractorInterface'
import { gridPropertyInterface } from '../../types/propertyObject'
import { GridAlignment, GridPattern, PropertyType } from '../../types/valueTypes'
import config from '../utilities/config'

const gridValues = (grid: GridLayoutGrid) => ({
  pattern: {
    value: grid.pattern.toLowerCase() as GridPattern,
    type: 'string' as PropertyType
  },
  sectionSize: {
    value: grid.sectionSize,
    unit: 'pixel',
    type: 'number' as PropertyType
  }
})

const getCount = count => {
  if (count === Infinity) {
    return {
      value: 'auto',
      type: 'string' as PropertyType
    }
  }
  return {
    value: count,
    type: 'number' as PropertyType
  }
}

const rowColumnValues = (grid: RowsColsLayoutGrid) => ({
  pattern: {
    value: grid.pattern.toLowerCase() as GridPattern,
    type: 'string' as PropertyType
  },
  // undefined when aligment stretch
  ...(grid.sectionSize !== undefined && {
    sectionSize: {
      value: grid.sectionSize,
      unit: 'pixel',
      type: 'number' as PropertyType
    }
  }),
  gutterSize: {
    value: grid.gutterSize,
    unit: 'pixel',
    type: 'number' as PropertyType
  },
  alignment: {
    value: grid.alignment.toLowerCase() as GridAlignment,
    type: 'string' as PropertyType
  },
  count: getCount(grid.count),
  // undefined when aligment centred
  ...(grid.offset !== undefined && {
    offset: {
      value: grid.offset,
      unit: 'pixel',
      type: 'number' as PropertyType
    }
  })
})

const extractGrids: extractorInterface = (tokenNodes: GridStyle[]): gridPropertyInterface[] => {
  // get grid styles
  return tokenNodes.map(node => ({
    name: node.name,
    category: 'grid',
    exportKey: config.exports.grid.key,
    description: node.description || null,
    values: node.layoutGrids.map((grid: LayoutGrid) => grid.pattern === 'GRID' ? gridValues(grid) : rowColumnValues(grid))
  }))
}

export default extractGrids
