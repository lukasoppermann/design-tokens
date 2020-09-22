import extractColors from './extractor/extractColors'
import extractGrids from './extractor/extractGrids'
import extractFonts from './extractor/extractFonts'
import extractEffects from './extractor/extractEffects'
import extractSizes from './extractor/extractSizes'
import extractBorders from './extractor/extractBorders'
import extractRadii from './extractor/extractRadii'
import getTokenFrames from './utilities/getTokenFrames'
import groupByName from './utilities/groupByName'
/**
 * Sending json string to ui
 * @param json object
 */
const sendJsonToUi = (json) => {
  // convert json to string
  const jsonString = JSON.stringify(json, null, 2)
  // send json string to ui to prompt download
  figma.ui.postMessage({
    command: "export",
    data: {
      filename: "design-tokens.json",
      data: jsonString
    }  
  })
}

const tokenExport = () => {
  console.log('exporting')
  // use spread operator because the original is readOnly
  const tokenFrames = getTokenFrames([...figma.root.children])
  // get tokens
  const tokens = groupByName([ 
    ...extractSizes(tokenFrames),
    ...extractBorders(tokenFrames),
    ...extractRadii(tokenFrames),
    ...extractColors(figma.getLocalPaintStyles()),
    ...extractGrids(figma.getLocalGridStyles()),
    ...extractFonts(figma.getLocalTextStyles()),
    ...extractEffects(figma.getLocalEffectStyles())
  ])
  console.log('Raw Tokens', tokens)
  
  // write tokens to json file
  sendJsonToUi(tokens)
}

export default tokenExport