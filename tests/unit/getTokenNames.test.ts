import getTokenNodes, { __testing } from '../../src/utilities/getTokenNodes'

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

describe("getTokenNodes", () => {
  test("empty input", () => {
    // @ts-ignore
    expect(getTokenNodes(pages)).toStrictEqual([])
  })

  test("page with input", () => {
    pages[0].findChildren.mockReturnValue([
      {
        parent: {
          type: 'PAGE'
        },
        name: '_tokens/sizes',
        type: 'FRAME',
        findAll: jest.fn().mockReturnValue([
          {
            parent: {
              type: 'FRAME'
            },
            type: 'COMPONENT_SET',
            name: 'spacers',
            children: [
              {
                type: 'COMPONENT',
                parent: {
                  type: 'COMPONENT_SET'
                },
                name: 'size=8, _visible=True, .colored=false',
                description: 'variant component',
                width: 8,
                height: 8,
                cornerRadius: 5,
                bottomLeftRadius: 5,
                bottomRightRadius: 5,
                topLeftRadius: 5,
                topRightRadius: 5,
                cornerSmoothing: 0.2,
                strokes: [],
                strokeWeight: 0,
                strokeMiterLimit: 0,
                strokeJoin: "MITER",
                strokeCap: "NONE",
                dashPattern: 0,
                strokeAlign: "CENTER",
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0
              }
            ]
          },
          {
            parent: {
              type: 'FRAME'
            },
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
        parent: {
          type: 'PAGE'
        },
        name: '_tokens/width',
        type: 'FRAME',
        findAll: jest.fn().mockReturnValue([
          {
            parent: {
              type: 'FRAME'
            },
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
            paddingTop: 20,
            paddingRight: 20,
            paddingBottom: 20,
            paddingLeft: 20
          }
        ])
      },
      {
        parent: {
          type: 'PAGE'
        },
        name: '_tokens/sizes',
        type: 'RECTANGLE',
        findAll: jest.fn().mockReturnValue([])
      }
    ])
    // @ts-ignore
    expect(getTokenNodes(pages)).toStrictEqual([
      {
        name: 'spacers/8',
        description: 'variant component',
        width: 8,
        height: 8,
        cornerRadius: 5,
        bottomLeftRadius: 5,
        bottomRightRadius: 5,
        topLeftRadius: 5,
        topRightRadius: 5,
        cornerSmoothing: .2,
        strokes: [],
        strokeStyleId: undefined,
        strokeWeight: 0,
        strokeMiterLimit: 0,
        strokeJoin: "MITER",
        strokeCap: "NONE",
        dashPattern: 0,
        strokeAlign: "CENTER",
        reactions: undefined,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0
      },
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
        }],
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0
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
        reactions: undefined,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20
      }
    ])
  })

  test('isTokenNode valid tokenNode', () => {
    expect(__testing.isTokenNode({
      // @ts-ignore
      parent: {
        type: 'FRAME'
      },
      // @ts-ignore
      type: 'FRAME'
    })).toStrictEqual(true)
    expect(__testing.isTokenNode({
      // @ts-ignore
      parent: {
        type: 'FRAME'
      },
      type: 'RECTANGLE'
    })).toStrictEqual(true)
    expect(__testing.isTokenNode({
      // @ts-ignore
      parent: {
        type: 'FRAME'
      },
      type: 'COMPONENT'
    })).toStrictEqual(true)
  })

  test('isTokenNode invalid tokenNode', () => {
    expect(__testing.isTokenNode({
      // @ts-ignore
      parent: {
        type: 'FRAME'
      },
      // @ts-ignore
      type: 'frame'
    })).toStrictEqual(false)
    // @ts-ignore
    expect(__testing.isTokenNode({
      // @ts-ignore
      parent: {
        type: 'FRAME'
      },
      type: 'LINE'
    })).toStrictEqual(false)
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