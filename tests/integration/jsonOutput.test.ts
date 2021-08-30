import fs from 'fs'
import jsonExpectedOutput from './data/jsonOriginalFormat.data'

describe('Verify json output for style dictionary', () => {
  // read files
  const json = JSON.parse(fs.readFileSync('./tests/files/design-tokens-example.json', 'utf8'))

  test('Top level names available', () => {
    expect('color' in json).toBeTruthy()
    expect('gradient' in json).toBeTruthy()
    expect('sizes' in json).toBeTruthy()
    expect('breakpoints' in json).toBeTruthy()
    expect('spacing' in json).toBeTruthy()
    expect('motion' in json).toBeTruthy()
    expect('grid' in json).toBeTruthy()
    expect('font' in json).toBeTruthy()
    expect('effect' in json).toBeTruthy()
    expect('borders' in json).toBeTruthy()
    expect('radius' in json).toBeTruthy()
    expect('invalid' in json).toBeFalsy()
  })

  test('Compare color', () => {
    expect(json.color).toStrictEqual(jsonExpectedOutput.color)
  })

  test('Compare gradient', () => {
    expect(json.gradient).toStrictEqual(jsonExpectedOutput.gradient)
  })

  test('Compare sizes', () => {
    expect(json.sizes).toStrictEqual(jsonExpectedOutput.sizes)
  })

  test('Compare breakpoints', () => {
    expect(json.breakpoints).toStrictEqual(jsonExpectedOutput.breakpoints)
  })

  test('Compare spacing', () => {
    expect(json.spacing).toStrictEqual(jsonExpectedOutput.spacing)
  })

  test('Compare motion', () => {
    expect(json.motion).toStrictEqual(jsonExpectedOutput.motion)
  })

  test('Compare grid', () => {
    expect(json.grid).toStrictEqual(jsonExpectedOutput.grid)
  })

  test('Compare effect', () => {
    expect(json.effect).toStrictEqual(jsonExpectedOutput.effect)
  })

  test('Compare borders', () => {
    expect(json.borders).toStrictEqual(jsonExpectedOutput.borders)
  })

  test('Compare fonts', () => {
    expect(json.font).toStrictEqual(jsonExpectedOutput.font)
  })

  test('Compare radius', () => {
    expect(json.radii).toStrictEqual(jsonExpectedOutput.radii)
    expect(json.radius).toStrictEqual(jsonExpectedOutput.radius)
  })
})
