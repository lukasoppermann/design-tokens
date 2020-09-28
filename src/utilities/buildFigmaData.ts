import { figmaDataType } from '../../types/figmaDataType'
import getTokenFrames from './getTokenFrames'

const buildFigmaData = (figma: PluginAPI): figmaDataType => {
  // use spread operator because the original is readOnly
  const tokenFrames = getTokenFrames([...figma.root.children])
  // get data from figma
  return {
    tokenFrames: tokenFrames,
    paintStyles: figma.getLocalPaintStyles(),
    gridStyles: figma.getLocalGridStyles(),
    textStyles: figma.getLocalTextStyles(),
    effectStyles: figma.getLocalEffectStyles()
  }
}

export default buildFigmaData