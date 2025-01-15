import { figmaDataType } from '@typings/figmaDataType'
import filterByPropertyName from '@utils/filterByNameProperty'
import getPaintStyles from '@utils/getPaintStyles'
import getGridStyles from '@utils/getGridStyles'
import getTokenNodes from '@utils/getTokenNodes'
import getTextStyles from '@utils/getTextStyles'
import getEffectStyles from '@utils/getEffectStyles'
import { Settings } from '@typings/settings'

/**
 * @function buildFigmaData – return an object with all styles & frame to use for export
 * @param {PluginAPI} figma — the figma PluginAPI object
 * @param options – options object
 */
const buildFigmaData = async (
  figma: PluginAPI,
  settings: Settings
): Promise<figmaDataType> => {
  // use spread operator because the original is readOnly
  const tokenFrames = await getTokenNodes([...figma.root.children])
  // get user exclusion prefixes
  const userExclusionPrefixes = settings.exclusionPrefix
    .split(',')
    .map((item) => item.replace(/\s+/g, ''))
  // get data from figma
  return {
    tokenFrames: tokenFrames,
    paintStyles: getPaintStyles(await figma.getLocalPaintStylesAsync()).filter(
      (item) => filterByPropertyName(item, userExclusionPrefixes)
    ),
    gridStyles: getGridStyles(await figma.getLocalGridStylesAsync()).filter(
      (item) => filterByPropertyName(item, userExclusionPrefixes)
    ),
    textStyles: getTextStyles(await figma.getLocalTextStylesAsync()).filter(
      (item) => filterByPropertyName(item, userExclusionPrefixes)
    ),
    effectStyles: getEffectStyles(
      await figma.getLocalEffectStylesAsync()
    ).filter((item) => filterByPropertyName(item, userExclusionPrefixes))
  }
}

export default buildFigmaData
