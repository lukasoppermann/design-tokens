import fs from 'fs'
import cssOutputData from './data/cssOutput.data'

describe("Compare css converterd file to data set", () => {
  // read files
  let css = fs.readFileSync('./tests/integration/data/variables.css', 'utf8').replace(/^\s+|\s+$/g, '')
  // remove starting comment
  const lines = css.split('\n')
  // remove comment from start
  lines.splice(0, lines.findIndex(line => line === ':root {'))
  // join the array back into a single string
  css = lines.join('\n')
  // compare to data
  test("Compare data", () => {
    expect(css).toStrictEqual(cssOutputData)
  })
})