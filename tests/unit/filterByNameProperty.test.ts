import filterByNameProperty from '../../src/utilities/filterByNameProperty'

describe("getTokenStyles", () => {
  test("exclude _ prefix", () => {
    expect(filterByNameProperty([
      {
        id: "valid",
        type: "PAINT",
        name: 'valid',
        description: ''
      },
      {
        id: "invalid",
        type: "PAINT",
        name: '_invalid',
        description: ''
      }
    ])).toStrictEqual([
      {
        id: "valid",
        type: "PAINT",
        name: 'valid',
        description: ''
      }
    ])
  })
})