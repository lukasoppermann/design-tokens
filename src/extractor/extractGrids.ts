import extractorInterface from '@typings/extractorInterface'
import { gridPropertyInterface } from '@typings/propertyObject'
import { GridAlignment, GridPattern, PropertyType, UnitTypePixel } from '@typings/valueTypes'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'

const gridValues = (grid: GridLayoutGrid) => ({
  pattern: {
    value: grid.pattern.toLowerCase() as GridPattern,
    type: 'string' as PropertyType
  },
  sectionSize: {
    value: grid.sectionSize,
    unit: 'pixel' as UnitTypePixel,
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
      unit: 'pixel' as UnitTypePixel,
      type: 'number' as PropertyType
    }
  }),
  gutterSize: {
    value: grid.gutterSize,
    unit: 'pixel' as UnitTypePixel,
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
      unit: 'pixel' as UnitTypePixel,
      type: 'number' as PropertyType
    }
  })
})

const extractGrids: extractorInterface = (tokenNodes: GridStyle[], prefixArray: string[]): gridPropertyInterface[] => {
  // get grid styles
  return tokenNodes
  // remove tokens with no grid
    .filter(node => node.layoutGrids.length > 0)
  // build
    .map(node => ({
      name: `${prefixArray[0]}/${node.name}`,
      category: 'grid' as tokenCategoryType,
      exportKey: tokenTypes.grid.key as tokenExportKeyType,
      description: node.description || null,
      values: node.layoutGrids.map((grid: LayoutGrid) => grid.pattern === 'GRID' ? gridValues(grid) : rowColumnValues(grid))
    }))
}

export default extractGrids
