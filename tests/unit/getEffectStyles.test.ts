import getEffectStyles from '../../src/utilities/getEffectStyles'
import { effectStyles, effectStyleObjects } from './data/effectStyleObjects.data'

describe("Testing getEffectStyles function", () => {
  test("RGB and no opacity", () => {
    // @ts-ignore
    expect(getEffectStyles(effectStyles)).toStrictEqual(effectStyleObjects)
  })

})
