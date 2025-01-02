import getTextStyles from '@utils/getTextStyles'
import { textStyles, textStyleObjects } from './data/textStyleObjects.data'

describe('Testing getTextStyles', () => {
  test('Testing function', () => {
    // @ts-ignore
    expect(getTextStyles(textStyles)).toStrictEqual(textStyleObjects)
  })
})
