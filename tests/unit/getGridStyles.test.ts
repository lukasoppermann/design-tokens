import getGridStyles from '@utils/getGridStyles'
import { gridStyles, gridStyleObjects } from './data/gridStyleObjects.data'

describe('Testing getGridStyles', () => {
  test('Testing function', () => {
    // @ts-ignore
    expect(getGridStyles(gridStyles)).toStrictEqual(gridStyleObjects)
  })
})
