import { roundRgba } from '../../src/utilities/convertColor'
import { rgb, rgba } from './data/color.data'

describe("Testing roundRgba function", () => {
  test("RGB and no opacity", () => {
    expect(roundRgba(rgb.raw)).toStrictEqual({
      ...rgb.converted,
      ...{a: 1}
    })
  })

  test("RGBA", () => {
    expect(roundRgba(rgba.raw)).toStrictEqual(rgba.converted)
  })

  test("RGB with opacity", () => {
    expect(roundRgba(rgb.raw, .34)).toStrictEqual({
      ...rgb.converted,
      ...{ a: .34 }
    })
  })
})
