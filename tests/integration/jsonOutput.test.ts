import fs from 'fs'
import jsonExpectedOutput from './data/jsonStyleDictionary.data'

describe('Verify json output for style dictionary', () => {
  // read files
  const json = JSON.parse(fs.readFileSync('./tests/files/design-tokens-example.json', 'utf8'))
  // compare to data
  test('Compare data', () => {
    expect(json).toStrictEqual(jsonExpectedOutput)
  })
})
