import { figmaDataType } from '../../types/figmaDataType'
import filterByNameProperty from './filterByNameProperty'
import getTokenFrames from './getTokenFrames'

const buildFigmaData = (figma: PluginAPI, options = {
  prefix: '_',
  excludePrefix: true
}): figmaDataType => {
  // use spread operator because the original is readOnly
  const tokenFrames = getTokenFrames([...figma.root.children])
  // get data from figma
  return {
    tokenFrames: tokenFrames,
    paintStyles: figma.getLocalPaintStyles().filter(filterByNameProperty(options.prefix, options.excludePrefix)),
    gridStyles: figma.getLocalGridStyles().filter(filterByNameProperty(options.prefix, options.excludePrefix)),
    textStyles: figma.getLocalTextStyles().filter(filterByNameProperty(options.prefix, options.excludePrefix)),
    effectStyles: figma.getLocalEffectStyles().filter(filterByNameProperty(options.prefix, options.excludePrefix)),
  }
}

export default buildFigmaData