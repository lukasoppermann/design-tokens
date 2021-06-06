import getTokenJson from './getTokenJson'
import buildFigmaData from './buildFigmaData'
import { Settings as UserSettings } from '../../types/settings'
/**
 * @name getJson
 * @param {PluginAPI} figma
 * @param {boolean} stringify
 */
const getJson = (figma: PluginAPI, userSettings: UserSettings, stringify: boolean = true) => {
  // construct figma data object
  const figmaData = buildFigmaData(figma, {
    prefix: userSettings.prefix,
    excludePrefix: userSettings.excludePrefix
  })
  if (stringify === false) {
    return getTokenJson(figmaData, 'styleDictionary', userSettings.nameConversion)
  }
  // get tokens as stringified json
  return JSON.stringify(getTokenJson(figmaData, 'styleDictionary', userSettings.nameConversion))
}

export default getJson
