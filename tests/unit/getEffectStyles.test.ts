import getEffectStyles from '@utils/getEffectStyles'
import { effectStyles, effectStyleObjects } from './data/effectStyleObjects.data'

describe('Testing getEffectStyles', () => {
  test('Testing function', () => {
    // @ts-ignore
    expect(getEffectStyles(effectStyles)).toStrictEqual(effectStyleObjects)
  })
})
