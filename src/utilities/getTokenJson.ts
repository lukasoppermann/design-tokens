import extractColors from '../extractor/extractColors'
import extractGrids from '../extractor/extractGrids'
import extractFonts from '../extractor/extractFonts'
import extractEffects from '../extractor/extractEffects'
import extractMotion from '../extractor/extractMotion'
import extractSizes from '../extractor/extractSizes'
import extractSpacing from '../extractor/extractSpacing'
import extractBorders from '../extractor/extractBorders'
import extractRadii from '../extractor/extractRadii'
import extractBreakpoints from '../extractor/extractBreakpoints'
import groupByName from './groupByName'
import styleDictionaryTransformer from '../transformer/styleDictionaryTransformer'
import { propertyObject } from '../../types/propertyObject'
import { figmaDataType } from '../../types/figmaDataType'

const transformer = {
  styleDictionary: styleDictionaryTransformer
}

export const exportRawTokenArray = (figmaData: figmaDataType) => {
  // get tokens
  return [
    ...extractSizes(figmaData.tokenFrames),
    ...extractBreakpoints(figmaData.tokenFrames),
    ...extractSpacing(figmaData.tokenFrames),
    ...extractBorders(figmaData.tokenFrames),
    ...extractRadii(figmaData.tokenFrames),
    ...extractMotion(figmaData.tokenFrames),
    ...extractColors(figmaData.paintStyles),
    ...extractGrids(figmaData.gridStyles),
    ...extractFonts(figmaData.textStyles),
    ...extractEffects(figmaData.effectStyles)
  ]
}

const getTokenJson = (figmaData: figmaDataType, format: string = 'styleDictionary', nameConversion: string = 'default') => {
  // get token array
  const tokenArray = exportRawTokenArray(figmaData)
  // format tokens
  const formattedTokens = tokenArray.map((token: propertyObject) => transformer[format](token))
  // group tokens
  const groupedTokens = groupByName(formattedTokens, true, nameConversion)
  // return group tokens
  return groupedTokens
}

export default getTokenJson
