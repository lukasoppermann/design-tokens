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
import { figmaDataType } from '@typings/figmaDataType'
import buildFigmaData from './buildFigmaData'

export const exportRawTokenArray = (figma: PluginAPI) => {
  const figmaData: figmaDataType = buildFigmaData(figma)
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
