import { figmaDataType } from '@typings/figmaDataType'
import filterByPropertyName from './filterByNameProperty'
import getPaintStyles from './getPaintStyles'
import getGridStyles from './getGridStyles'
import getTokenNodes from './getTokenNodes'
import getTextStyles from './getTextStyles'
import getEffectStyles from './getEffectStyles'
import { Settings } from '@typings/settings'

/**
 * @function buildFigmaData – return an object with all styles & frame to use for export
 * @param {PluginAPI} figma — the figma PluginAPI object
 * @param options – options object
 */
const buildFigmaData = (figma: PluginAPI, settings: Settings): figmaDataType => {
  // use spread operator because the original is readOnly
  const tokenFrames = getTokenNodes([...figma.root.children])
  // get user exclusion prefixes
  const userExclusionPrefixes = settings.exclusionPrefix.split(',').map(item => item.replace(/\s+/g, ''))
  // get data from figma
  return {
    tokenFrames: tokenFrames,
    paintStyles: getPaintStyles(figma.getLocalPaintStyles()).filter(item => filterByPropertyName(item, userExclusionPrefixes)),
    gridStyles: getGridStyles(figma.getLocalGridStyles()).filter(item => filterByPropertyName(item, userExclusionPrefixes)),
    textStyles: getTextStyles(figma.getLocalTextStyles()).filter(item => filterByPropertyName(item, userExclusionPrefixes)),
    effectStyles: getEffectStyles(figma.getLocalEffectStyles()).filter(item => filterByPropertyName(item, userExclusionPrefixes))
  }
}

export default buildFigmaData
