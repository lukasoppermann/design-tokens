import writeJson from './writeJson'
import getColors from './getColors'
import getGrids from './getGrids'
import getFonts from './getFonts'
import getEffects from './getEffects'

const tokenExport = () => {
  // writeJson(figma.getLocalPaintStyles())
  // console.log([0])
  // console.log(figma.getStyleById(figma.getLocalPaintStyles()[0].id).name)
  // console.log(figma.getLocalTextStyles())
  // console.log(figma.getLocalEffectStyles())
  // console.log(figma.getLocalGridStyles())
  // return figma.getLocalPaintStyles()
  const colors = getColors()
  const grids = getGrids()
  const fonts = getFonts()
  const effects = getEffects()
  writeJson({
    colors: colors,
    grids: grids,
    fonts: fonts,
    effects: effects
  })
}

export default tokenExport