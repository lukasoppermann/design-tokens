import getTokenJson, { exportRawTokenArray } from './getTokenJson'
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
  if (userSettings.compression === true) {
    return JSON.stringify(getTokenJson(figmaData, 'styleDictionary', userSettings.nameConversion))
  }
  // return uncompressed
  return JSON.stringify(getTokenJson(figmaData, 'styleDictionary', userSettings.nameConversion), null, 2)
}

/**
 * @name getJsonString
 * @param {PluginAPI} figma
 * @param {UserSettings} userSettings
 */
export const getJsonString = (figma: PluginAPI, userSettings: UserSettings) => {
  // construct figma data object
  const figmaData = buildFigmaData(figma, {
    prefix: userSettings.prefix,
    excludePrefix: userSettings.excludePrefix
  })

  return JSON.stringify(exportRawTokenArray(figmaData))
}

export default getJson
