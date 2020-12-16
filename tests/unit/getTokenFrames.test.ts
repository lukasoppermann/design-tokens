import getTokenFrames, { __testing } from '../../src/utilities/getTokenFrames'

const pages = [{
  findChildren: jest.fn().mockReturnValue([])
}]


beforeAll(() => {
  // @ts-ignore
  global.figma = {
    root: {
      children: [{
        findChildren: jest.fn()
      }]
    }
  }
})

describe("getTokenFrames", () => {
  test("empty input", () => {
    // @ts-ignore
    expect(getTokenFrames(pages)).toStrictEqual([])
  })

  test("page with input", () => {
    pages[0].findChildren.mockReturnValue([
      {
        name: '_tokens/sizes',
        type: 'FRAME',
        findChildren: jest.fn().mockReturnValue([
          {
            type: 'FRAME',
            name: '10',
            width: 10,
            height: 10,
            cornerRadius: 5,
            bottomLeftRadius: 5,
            bottomRightRadius: 5,
            topLeftRadius: 5,
            topRightRadius: 5,
            cornerSmoothing: .2,
            strokes: [{
              type: "SOLID",
              color: {
                r: .2,
                g: .3,
                b: .4,
              },
              visible: true
            }],
            strokeWeight: 0,
            strokeMiterLimit: 0,
            strokeJoin: "MITER",
            strokeCap: "NONE",
            dashPattern: 0,
            strokeAlign: "CENTER",
            reactions: [{
              action: {
                transition: {
                  duration: 0.0032234,
                  direction: 'LEFT',
                  type: 'MOVE_IN',
                  easing: {
                    type: 'EASE_IN'
                  }
                }
              }
            }]
          }
        ])
      },
      {
        name: '_tokens/width',
        type: 'FRAME',
        findChildren: jest.fn().mockReturnValue([
          {
            type: 'FRAME',
            name: '20',
            description: 'A frame',
            width: 20,
            height: 20,
            bottomLeftRadius: 1,
            bottomRightRadius: 2,
            topLeftRadius: 3,
            topRightRadius: 4,
            cornerSmoothing: 0,
            strokes: [],
            strokeWeight: 0,
            strokeMiterLimit: 0,
            strokeJoin: "MITER",
            strokeCap: "NONE",
            dashPattern: 0,
            strokeAlign: "CENTER",
          }
        ])
      },
      {
        name: '_tokens/sizes',
        type: 'RECTANGLE',
        findChildren: jest.fn().mockReturnValue([])
      }
    ])
    // @ts-ignore
    expect(getTokenFrames(pages)).toStrictEqual([
      {
        name: '10',
        description: undefined,
        width: 10,
        height: 10,
        cornerRadius: 5,
        bottomLeftRadius: 5,
        bottomRightRadius: 5,
        topLeftRadius: 5,
        topRightRadius: 5,
        cornerSmoothing: .2,
        strokes: [{
          a: 1,
          b: 102,
          g: 77,
          r: 51
        }],
        strokeStyleId: undefined,
        strokeWeight: 0,
        strokeMiterLimit: 0,
        strokeJoin: "MITER",
        strokeCap: "NONE",
        dashPattern: 0,
        strokeAlign: "CENTER",
        reactions: [{
          action: {
            transition: {
              duration: 0.0032234,
              direction: 'LEFT',
              type: 'MOVE_IN',
              easing: {
                type: 'EASE_IN'
              }
            }
          }
        }]
      },
      {
        name: '20',
        description: 'A frame',
        width: 20,
        height: 20,
        cornerRadius: undefined,
        bottomLeftRadius: 1,
        bottomRightRadius: 2,
        topLeftRadius: 3,
        topRightRadius: 4,
        cornerSmoothing: 0,
        strokes: [],
        strokeStyleId: undefined,
        strokeWeight: 0,
        strokeMiterLimit: 0,
        strokeJoin: "MITER",
        strokeCap: "NONE",
        dashPattern: 0,
        strokeAlign: "CENTER",
        reactions: undefined
      }
    ])
  })

  test("isTokenNode valid tokenNode", () => {
    // @ts-ignore
    expect(__testing.isTokenNode({ type: "FRAME" })).toStrictEqual(true)
    // @ts-ignore
    expect(__testing.isTokenNode({ type: "RECTANGLE" })).toStrictEqual(true)
    // @ts-ignore
    expect(__testing.isTokenNode({ type: "COMPONENT" })).toStrictEqual(true)
  })

  test("isTokenNode invalid tokenNode", () => {
    // @ts-ignore
    expect(__testing.isTokenNode({ type: "frame" })).toStrictEqual(false)
    // @ts-ignore
    expect(__testing.isTokenNode({ type: "LINE" })).toStrictEqual(false)
  })


  test("isTokenFrame valid tokenFrame", () => {
    // @ts-ignore
    expect(__testing.isTokenFrame({ name: '_tokens', type: "FRAME" })).toStrictEqual(true)
  })

  test("isTokenNode invalid tokenFrame", () => {
    // @ts-ignore
    expect(__testing.isTokenFrame({ name: '_tokens', type: "frame" })).toStrictEqual(false)
    // @ts-ignore
    expect(__testing.isTokenFrame({ name: '_tokens', type: "LINE" })).toStrictEqual(false)
    // @ts-ignore
    expect(__testing.isTokenFrame({ name: 'invalidTokens', type: "LINE" })).toStrictEqual(false)
  })
})