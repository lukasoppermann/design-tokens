import fs from 'fs'
import cssOutputData from './data/cssOutput.data'
import cssStandardOutputData from './data/cssStandardOutput.data'

describe('Compare css converterd file to data set', () => {
  test('original css data', () => {
  // read files
    let originalCss = fs.readFileSync('./tests/integration/data/original.variables.css', 'utf8').replace(/^\s+|\s+$/g, '')
    // remove starting comment
    const lines = originalCss.split('\n')
    // remove comment from start
    lines.splice(0, lines.findIndex(line => line === ':root {'))
    // join the array back into a single string
    originalCss = lines.join('\n')
    // compare to data
    expect(originalCss).toStrictEqual(cssOutputData)
  })

  test('standard css data', () => {
    // read files
    const css = fs.readFileSync('./tests/integration/data/standard.variables.css', 'utf8').replace(/^\s+|\s+$/g, '')
    // remove starting comment
    const lines = css.split('\n')
    // remove comment from start
    lines.splice(0, lines.findIndex(line => line === ':root {'))
    // join the array back into a single string
    const convertedCss = lines.join('\n')
    // compare to data
    expect(convertedCss).toStrictEqual(cssStandardOutputData)
  })
})
