import { GridAlignment, GridPattern } from './valueTypes'

export type extractedGridValues = {
  pattern: {
    value: GridPattern
  },
  sectionSize?: {
    value: number,
    unit: string
  },
  gutterSize?: {
    value: number,
    unit: string
  },
  alignment?: {
    value: GridAlignment
  },
  count?: {
    value: number
  },
  offset?: {
    value: number,
    unit: string
  }
}
