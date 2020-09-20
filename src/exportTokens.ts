import extractColors from './extractor/extractColors'
import extractGrids from './extractor/extractGrids'
import extractFonts from './extractor/extractFonts'
import extractEffects from './extractor/extractEffects'
import extractCustomTokens from './extractor/extractCustomTokens'
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
  // get tokens
  const rawTokens = { 
    ...extractCustomTokens(),
    ...extractColors(),
    ...extractGrids(),
    ...extractFonts(),
    ...extractEffects()
  }
  
  console.log('Raw Tokens', rawTokens)
  
  // write tokens to json file
  sendJsonToUi(rawTokens)
}

export default tokenExport