import writeJson from './writeJson'
import getColors from './getColors'
import getGrids from './getGrids'
import getFonts from './getFonts'
import getEffects from './getEffects'
import getCustomTokens from './getCustomTokens'


const tokenExport = () => {
  // get tokens
  const rawTokens = { 
    ...getCustomTokens(),
    ...getColors(),
    ...getGrids(),
    ...getFonts(),
    ...getEffects()
  }
  
  console.log('Raw Tokens', rawTokens)
  
  // write tokens to json file
  writeJson(rawTokens)
}

export default tokenExport