import extractColors from './extractor/extractColors'
import extractGrids from './extractor/extractGrids'
import extractFonts from './extractor/extractFonts'
import extractEffects from './extractor/extractEffects'
import extractSizes from './extractor/extractSizes'
import extractBorders from './extractor/extractBorders'
import extractRadii from './extractor/extractRadii'
import groupByName from './utilities/groupByName'
import amazonStyleDictionaryTransformer from './transformer/amazonStyleDictionaryTransformer'
import { propertyObject } from '../types/propertyObject'
import { figmaDataType } from '../types/figmaDataType'

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

const exportRawTokenArray = (figmaData: figmaDataType) => {
  // get tokens
  return [ 
    ...extractSizes(figmaData.tokenFrames),
    ...extractBorders(figmaData.tokenFrames),
    ...extractRadii(figmaData.tokenFrames),
    ...extractColors(figmaData.paintStyles),
    ...extractGrids(figmaData.gridStyles),
    ...extractFonts(figmaData.textStyles),
    ...extractEffects(figmaData.effectStyles)
  ]
}

const tokenExport = (figmaData: figmaDataType, format: string = 'amazon') => {
  // get token array
  const tokenArray = exportRawTokenArray(figmaData)
  // format tokens
  const formattedTokens = tokenArray.map((token: propertyObject )=> transformer[format](token))
  // group tokens
  const groupedTokens = groupByName(formattedTokens)
  // write tokens to json file
  sendJsonToUi(groupedTokens)
}

export default tokenExport