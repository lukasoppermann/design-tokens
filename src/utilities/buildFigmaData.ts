import { figmaDataType } from '@typings/figmaDataType'
import filterByPropertyName from './filterByNameProperty'
import getPaintStyles from './getPaintStyles'
import getGridStyles from './getGridStyles'
import getTokenNodes from './getTokenNodes'
import getTextStyles from './getTextStyles'
import getEffectStyles from './getEffectStyles'

/**
 * @function buildFigmaData – return an object with all styles & frame to use for export
 * @param {PluginAPI} figma — the figma PluginAPI object
 * @param options – options object
 */
const buildFigmaData = (figma: PluginAPI): figmaDataType => {
  // use spread operator because the original is readOnly
  const tokenFrames = getTokenNodes([...figma.root.children])
  // get data from figma
  return {
    tokenFrames: tokenFrames,
    paintStyles: getPaintStyles(figma.getLocalPaintStyles()).filter(filterByPropertyName),
    gridStyles: getGridStyles(figma.getLocalGridStyles()).filter(filterByPropertyName),
    textStyles: getTextStyles(figma.getLocalTextStyles()).filter(filterByPropertyName),
    effectStyles: getEffectStyles(figma.getLocalEffectStyles()).filter(filterByPropertyName)
  }
}

export default buildFigmaData
