import extractFonts from '@src/extractor/extractFonts'
import { textStyleObjects, extractFontsOutput } from './data/textStyleObjects.data'

describe('extracting fonts', () => {
  test('extract only valid fonts', () => {
    expect(extractFonts(textStyleObjects, ['font'])).toStrictEqual(extractFontsOutput)
  })
})
