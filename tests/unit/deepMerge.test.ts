import deepMerge from '../../src/utilities/deepMerge'

describe("deepMerge", () => {
  test("merge objects", () => {
    expect(deepMerge(
      {
        id: 'not visible',
        type: 'unique',
        nested: {
          stay: 'still here',
          override: 'not here',
          merged: [2]
        }
      },
      {
        id: "visible",
        nested: {
          override: 'new value',
          merged: ['test']
        },
        description: 'from second'
      }
    )).toStrictEqual(
      {
        id: "visible",
        type: 'unique',
        nested: {
          stay: 'still here',
          override: 'new value',
          merged: [2, 'test']
        },
        description: 'from second'
      }
    )
  })

  test("argument 1 is string, return source", () => {
    expect(deepMerge('test', { 'value': 1 })).toStrictEqual({ 'value': 1 })
  })

  test("argument 2 is string, return source", () => {
    expect(deepMerge({ 'value': 1 }, 'test')).toStrictEqual("test")
  })

})