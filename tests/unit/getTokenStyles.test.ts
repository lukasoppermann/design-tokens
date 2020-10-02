import getTokenStyles from '../../src/utilities/getTokenStyles'
import { BaseStyle, StyleType } from '../../types/styles'

describe("getTokenStyles", () => {
  test("exclude _ prefix", () => {
    expect(getTokenStyles([
      {
        id: "valid",
        type: "PAINT" as StyleType,
        name: 'valid',
        description: ''
      },
      {
        id: "invalid",
        type: "PAINT" as StyleType,
        name: '_invalid',
        description: ''
      }
    ])).toStrictEqual([
      {
        id: "valid",
        type: "PAINT" as StyleType,
        name: 'valid',
        description: ''
      }
    ])
  })
})