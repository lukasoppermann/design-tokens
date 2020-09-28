import extractColors from './extractor/extractColors'
import extractGrids from './extractor/extractGrids'
import extractFonts from './extractor/extractFonts'
import extractEffects from './extractor/extractEffects'
import extractSizes from './extractor/extractSizes'
import extractBorders from './extractor/extractBorders'
import extractRadii from './extractor/extractRadii'
import getTokenFrames from './utilities/getTokenFrames'
import groupByName from './utilities/groupByName'
import amazonStyleDictionaryTransformer from './transformer/amazonStyleDictionaryTransformer'
import { convertedPropertyObject } from '../types/propertyObject'


const transformer = {
  amazon: amazonStyleDictionaryTransformer
}

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

const exportRawTokenArray = (figma: PluginAPI) => {
  // use spread operator because the original is readOnly
  const tokenFrames = getTokenFrames([...figma.root.children])
  // get tokens
  return [ 
    ...extractSizes(tokenFrames),
    ...extractBorders(tokenFrames),
    ...extractRadii(tokenFrames),
    ...extractColors(figma.getLocalPaintStyles()),
    ...extractGrids(figma.getLocalGridStyles()),
    ...extractFonts(figma.getLocalTextStyles()),
    ...extractEffects(figma.getLocalEffectStyles())
  ]
}

const tokenExport = (figma: PluginAPI, format: string = 'amazon') => {
  // get token array
  const tokenArray = exportRawTokenArray(figma)
  // format tokens
  const formattedTokens = tokenArray.map((token: convertedPropertyObject )=> transformer[format](token))
  // group tokens
  const groupedTokens = groupByName(formattedTokens)
  // write tokens to json file
  sendJsonToUi(groupedTokens)
}

export default tokenExport