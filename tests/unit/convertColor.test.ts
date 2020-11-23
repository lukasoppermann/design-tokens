import { roundRgba, convertPaintToRgba, convertRgbaObjectToString } from '../../src/utilities/convertColor'

describe("Testing convertRgbaObjectToString", () => {
  test("Valid Object", () => {
    const input = {
      a: .5,
      r: 100,
      g: 150,
      b: 200
    }
    const output = 'rgba(100, 150, 200, 0.5)'
    // assertion
    expect(convertRgbaObjectToString(input)).toStrictEqual(output)
  })

  test.skip("invalid Object", () => {
    const input = {
      r: 100,
      g: 150,
      b: 200
    }
    const output = 'rgba(100, 150, 200, 0.5)'
    // assertion
    // @ts-ignore
    expect(convertRgbaObjectToString(input)).toStrictEqual(output)
  })
})

describe("Testing roundRgba", () => {
  test("Valid input rgba", () => {
    const rgba = {
      a: .5,
      r: .12,
      g: .55,
      b: .7
    }
    const output = {
      a: .5,
      r: 31,
      g: 140,
      b: 179
    }
    // assertion
    expect(roundRgba(rgba)).toStrictEqual(output)
  })

  test("Valid input rgb with NO alpha or opacity", () => {
    const rgba = {
      r: .12,
      g: .55,
      b: .7
    }
    const output = {
      a: 1,
      r: 31,
      g: 140,
      b: 179
    }
    // assertion
    expect(roundRgba(rgba)).toStrictEqual(output)
  })

  test("Valid input rgb and opacity", () => {
    const rgba = {
      r: .12,
      g: .55,
      b: .7
    }
    const output = {
      a: .77,
      r: 31,
      g: 140,
      b: 179
    }
    // assertion
    expect(roundRgba(rgba, .77)).toStrictEqual(output)
  })
})

describe("Testing convertPaintToRgba", () => {
  test("Valid Paint object with opacity", () => {
    const input = {
      type: 'SOLID',
      visible: true,
      opacity: .65,
      color: {
        r: .12,
        g: .55,
        b: .7
      }
    }
    const output = {
      a: .65,
      r: 31,
      g: 140,
      b: 179
    }
    // assertion
    expect(convertPaintToRgba(input)).toStrictEqual(output)
  })

  test("Valid Paint object NO opacity", () => {
    const input = {
      type: 'SOLID',
      visible: true,
      color: {
        r: .2,
        g: .5,
        b: .1
      }
    }
    const output = {
      a: 1,
      r: 51,
      g: 128,
      b: 26
    }
    // assertion
    expect(convertPaintToRgba(input)).toStrictEqual(output)
  })

  test("Valid Paint object BUT visible false", () => {
    const input = {
      type: 'SOLID',
      visible: false,
      color: {
        r: .2,
        g: .5,
        b: .1
      }
    }
    const output = null
    // assertion
    expect(convertPaintToRgba(input)).toStrictEqual(output)
  })

  test("Type IMAGE object", () => {
    const input = {
      type: 'IMAGE',
      visible: true,
      color: {
        r: .2,
        g: .5,
        b: .1
      }
    }
    const output = null
    // assertion
    expect(convertPaintToRgba(input)).toStrictEqual(output)
  })
})