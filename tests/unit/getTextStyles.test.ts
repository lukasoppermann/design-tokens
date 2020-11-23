import getTextStyles from '../../src/utilities/getTextStyles'
import { textStyles, textStyleObjects } from './data/textStyleObjects.data'

describe("Testing getTextStyles", () => {
  test("Testing function", () => {
    // @ts-ignore
    expect(getTextStyles(textStyles)).toStrictEqual(textStyleObjects)
  })

})
