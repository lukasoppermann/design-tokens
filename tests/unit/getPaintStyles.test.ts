import getPaintStyles from '../../src/utilities/getPaintStyles'
import { paintStyles, paintStyleObjects } from './data/paintStyleObjects.data'

describe('Testing getPaintStyles', () => {
  test('Testing function', () => {
    // @ts-ignore
    expect(getPaintStyles(paintStyles)).toStrictEqual(paintStyleObjects)
  })
})
