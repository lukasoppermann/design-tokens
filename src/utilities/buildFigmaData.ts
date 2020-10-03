import { figmaDataType } from '../../types/figmaDataType'
import filterByNameProperty from './filterByNameProperty'
import getTokenFrames from './getTokenFrames'

const buildFigmaData = (figma: PluginAPI): figmaDataType => {
  // use spread operator because the original is readOnly
  const tokenFrames = getTokenFrames([...figma.root.children])
  // filter options
  const filterPrefix = '_'
  const filterExclude = true
  // get data from figma
  return {
    tokenFrames: tokenFrames,
    paintStyles: figma.getLocalPaintStyles().filter(filterByNameProperty(filterPrefix, filterExclude)),
    gridStyles: figma.getLocalGridStyles().filter(filterByNameProperty(filterPrefix, filterExclude)),
    textStyles: figma.getLocalTextStyles().filter(filterByNameProperty(filterPrefix, filterExclude)),
    effectStyles: figma.getLocalEffectStyles().filter(filterByNameProperty(filterPrefix, filterExclude)),
  }
}

export default buildFigmaData